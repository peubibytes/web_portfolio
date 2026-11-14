import { useEffect, useRef, useState } from 'react';
import { decodeFrame, stepProgress } from '../../lib/decode';
import { useMotion } from '../../hooks/useMotion';

interface Props {
  text: string;
  className?: string;
  steps?: number;
  /** ms */
  duration?: number;
}

/**
 * DECODIFICAR: o texto final ocupa o espaço desde o frame 0 (sem CLS) e o leitor de tela
 * recebe só o valor real; os caracteres embaralhados são aria-hidden.
 */
export function DecodeText({ text, className, steps = 8, duration = 450 }: Props) {
  const { animate } = useMotion();
  const host = useRef<HTMLSpanElement>(null);
  const [frame, setFrame] = useState(text);

  useEffect(() => {
    setFrame(text);
    const el = host.current;
    if (!animate || !el || typeof IntersectionObserver === 'undefined') return;
    let raf = 0;
    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        obs.disconnect();
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = stepProgress((now - t0) / duration, steps);
          setFrame(decodeFrame(text, p, 7));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        setFrame(decodeFrame(text, 0, 7));
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [text, animate, steps, duration]);

  return (
    <span ref={host} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-grid">
        <span className="invisible col-start-1 row-start-1">{text}</span>
        <span className="col-start-1 row-start-1">{frame}</span>
      </span>
    </span>
  );
}
