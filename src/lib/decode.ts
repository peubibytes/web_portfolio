const POOL = '#%&*@$<>/0123456789ABCDEF';

/** Gerador determinístico (mulberry32): mesma semente, mesma sequência. */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Quadro da decodificação. `progress` 0→1 revela da esquerda para a direita.
 * Espaços e pontuação nunca embaralham: a forma da palavra aparece cedo.
 * Em progress ≥ 1 devolve exatamente `target`.
 */
export function decodeFrame(target: string, progress: number, seed = 1): string {
  if (progress >= 1) return target;
  const chars = Array.from(target);
  const letters = chars.filter((c) => /[\p{L}\p{N}]/u.test(c)).length;
  const reveal = Math.floor(Math.max(0, progress) * letters);
  const next = rng(seed);
  let seen = 0;
  return chars
    .map((c) => {
      if (!/[\p{L}\p{N}]/u.test(c)) return c;
      const pick = POOL[Math.floor(next() * POOL.length)]!;
      return seen++ < reveal ? c : pick;
    })
    .join('');
}

/** Progresso em degraus discretos (steps(n)). */
export const stepProgress = (t: number, steps: number) => Math.min(1, Math.ceil(Math.max(0, t) * steps) / steps);
