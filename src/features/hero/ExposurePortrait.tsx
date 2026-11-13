import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { ditherCells, luminance } from '../../lib/dither';
import { FRAGMENT, VERTEX } from './exposureShader';

interface Props {
  src: string;
  alt: string;
  /** duração da exposição em segundos (também aparece no rótulo da placa) */
  exposure?: number;
  className?: string;
}

const INK: [number, number, number] = [0x1b / 255, 0x1a / 255, 0x17 / 255];
const SOURCE_SIZE = 512;

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/** Recorta a imagem em quadrado (object-fit: cover) num canvas de origem. */
function toSource(img: HTMLImageElement) {
  const c = document.createElement('canvas');
  c.width = c.height = SOURCE_SIZE;
  const ctx = c.getContext('2d')!;
  const w = img.naturalWidth || img.width;
  const h = img.naturalHeight || img.height;
  const s = Math.min(w, h);
  ctx.drawImage(img, (w - s) / 2, (h - s) / 2, s, s, 0, 0, SOURCE_SIZE, SOURCE_SIZE);
  return c;
}

/** Fallback estático: mesmo pontilhado, sem animação, em canvas 2D. */
function drawStatic(canvas: HTMLCanvasElement, source: HTMLCanvasElement) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const size = canvas.clientWidth;
  canvas.width = canvas.height = Math.round(size * dpr);
  const cell = 3 * dpr;
  const cols = Math.ceil(canvas.width / cell);
  const sample = document.createElement('canvas');
  sample.width = sample.height = cols;
  const sctx = sample.getContext('2d')!;
  sctx.drawImage(source, 0, 0, cols, cols);
  const data = sctx.getImageData(0, 0, cols, cols).data;
  const lum = new Float32Array(cols * cols);
  for (let i = 0; i < lum.length; i++) lum[i] = luminance(data[i * 4]!, data[i * 4 + 1]!, data[i * 4 + 2]!);
  const on = ditherCells(lum, cols, cols);
  const ctx = canvas.getContext('2d');
  if (!ctx) return; // o canvas já tem contexto WebGL; nesse caso a placa fica vazia
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#1b1a17';
  for (let y = 0; y < cols; y++)
    for (let x = 0; x < cols; x++) if (on[y * cols + x]) ctx.fillRect(x * cell, y * cell, cell, cell);
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? 'shader');
  return s;
}

/**
 * A interação marca do site: o retrato "acumula luz" como uma placa fotográfica
 * e o cursor aumenta a resolução por onde passa.
 */
export function ExposurePortrait({ src, alt, exposure = 1.6, className = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let disposed = false;
    let cleanup = () => {};

    loadImage(src)
      .then((img) => {
        if (disposed) return;
        const source = toSource(img);

        const gl = reduced
          ? null
          : (canvas.getContext('webgl', { premultipliedAlpha: true, antialias: false }) as WebGLRenderingContext | null);

        if (!gl) {
          drawStatic(canvas, source);
          const ro = new ResizeObserver(() => drawStatic(canvas, source));
          ro.observe(canvas);
          cleanup = () => ro.disconnect();
          return;
        }

        let program: WebGLProgram;
        try {
          program = gl.createProgram()!;
          gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
          gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT));
          gl.linkProgram(program);
          if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('link');
        } catch {
          drawStatic(canvas, source);
          return;
        }
        gl.useProgram(program);

        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
        const aPos = gl.getAttribLocation(program, 'aPos');
        gl.enableVertexAttribArray(aPos);
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

        const tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);

        const u = (n: string) => gl.getUniformLocation(program, n);
        const uRes = u('uRes');
        const uMouse = u('uMouse');
        const uExposure = u('uExposure');
        const uTime = u('uTime');
        const uDpr = u('uDpr');
        gl.uniform3f(u('uInk'), ...INK);

        let dpr = 1;
        const resize = () => {
          dpr = Math.min(window.devicePixelRatio || 1, 2);
          canvas.width = Math.round(canvas.clientWidth * dpr);
          canvas.height = Math.round(canvas.clientHeight * dpr);
          gl.viewport(0, 0, canvas.width, canvas.height);
          request();
        };

        const mouse = { x: -1e4, y: -1e4 };
        let start = 0;
        let raf = 0;
        let visible = true;

        const frame = (now: number) => {
          raf = 0;
          if (!start) start = now;
          const t = (now - start) / 1000;
          // curva de acúmulo de luz: rápido no início, satura no fim
          const e = t >= exposure ? 1 : 1 - Math.exp((-4.2 * t) / exposure);
          gl.uniform2f(uRes, canvas.width, canvas.height);
          gl.uniform2f(uMouse, mouse.x, mouse.y);
          gl.uniform1f(uExposure, e);
          gl.uniform1f(uTime, t);
          gl.uniform1f(uDpr, dpr);
          gl.clearColor(0, 0, 0, 0);
          gl.clear(gl.COLOR_BUFFER_BIT);
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
          if (e < 1) request(); // continua só enquanto expõe
        };
        function request() {
          if (!raf && visible) raf = requestAnimationFrame(frame);
        }

        const onMove = (ev: PointerEvent) => {
          if (ev.pointerType !== 'mouse') return;
          const r = canvas.getBoundingClientRect();
          mouse.x = (ev.clientX - r.left) * dpr;
          mouse.y = (r.bottom - ev.clientY) * dpr;
          request();
        };
        const onLeave = () => {
          mouse.x = mouse.y = -1e4;
          request();
        };

        const ro = new ResizeObserver(resize);
        ro.observe(canvas);
        const io = new IntersectionObserver(([entry]) => {
          visible = !!entry?.isIntersecting;
          if (visible) request();
        });
        io.observe(canvas);
        canvas.addEventListener('pointermove', onMove);
        canvas.addEventListener('pointerleave', onLeave);
        resize();

        cleanup = () => {
          cancelAnimationFrame(raf);
          ro.disconnect();
          io.disconnect();
          canvas.removeEventListener('pointermove', onMove);
          canvas.removeEventListener('pointerleave', onLeave);
          gl.getExtension('WEBGL_lose_context')?.loseContext();
        };
      })
      .catch(() => {
        /* sem imagem: a placa fica vazia, o texto alternativo continua disponível */
      });

    return () => {
      disposed = true;
      cleanup();
    };
  }, [src, reduced, exposure]);

  // key: trocar entre WebGL e 2D exige um canvas novo
  return <canvas key={reduced ? '2d' : 'gl'} ref={canvasRef} role="img" aria-label={alt} className={`block h-full w-full ${className}`} />;
}
