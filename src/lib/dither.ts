/**
 * Dithering ordenado (Bayer). A mesma fórmula roda no shader do retrato
 * (src/features/hero/exposureShader.ts), então o fallback estático é idêntico.
 */
const fract = (x: number) => x - Math.floor(x);

function bayer2(x: number, y: number) {
  const fx = Math.floor(x);
  const fy = Math.floor(y);
  return fract(0.5 * fx + 0.75 * fy * fy);
}

function bayer4(x: number, y: number) {
  return bayer2(0.5 * x, 0.5 * y) * 0.25 + bayer2(x, y);
}

/** Limiar 8×8 em [0, 1). */
export function bayer8(x: number, y: number) {
  return bayer4(0.5 * x, 0.5 * y) * 0.25 + bayer2(x, y);
}

export function luminance(r: number, g: number, b: number) {
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

/** Contraste em torno de 0.5 — fotos reais costumam precisar de um empurrão. */
export function contrast(l: number, amount = 1.25) {
  return Math.min(1, Math.max(0, (l - 0.5) * amount + 0.5));
}

/** Máscara elíptica suave: o "objeto" fica dentro do círculo da placa. */
export function plateMask(u: number, v: number) {
  const dx = (u - 0.5) / 0.5;
  const dy = (v - 0.5) / 0.5;
  const d = Math.sqrt(dx * dx + dy * dy);
  const t = Math.min(1, Math.max(0, (d - 0.78) / (0.98 - 0.78)));
  return 1 - t * t * (3 - 2 * t);
}

/**
 * Retorna, para uma grade de células, se cada célula leva tinta.
 * lum: luminância por célula (0 = preto, 1 = branco), em ordem linha a linha.
 */
export function ditherCells(lum: ArrayLike<number>, cols: number, rows: number): boolean[] {
  const out: boolean[] = new Array(cols * rows);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const i = y * cols + x;
      const ink = (1 - contrast(lum[i] ?? 1)) * plateMask((x + 0.5) / cols, (y + 0.5) / rows);
      out[i] = ink > bayer8(x, y);
    }
  }
  return out;
}
