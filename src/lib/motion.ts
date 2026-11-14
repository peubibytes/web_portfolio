import type { Transition, Variants } from 'motion/react';

/**
 * A Sonda usa SÓ quatro verbos de movimento. Não adicione um quinto.
 *
 * 1. DECODIFICAR — texto passa de ruído ao valor real, em degraus (lib/decode.ts).
 * 2. TRAVAR      — brackets convergem e o alvo trava: aceleração seca, sem mola elástica.
 * 3. ROMPER      — a camada entra em fatias deslocadas + split RGB de 2 frames (CSS .breach).
 * 4. VARRER      — uma linha percorre uma área e revela o que está embaixo.
 */

export const EASE_SNAP = [0.2, 0, 0, 1] as const;
export const EASE_SWEEP = [0.45, 0, 0.55, 1] as const;

export const snap: Transition = { duration: 0.26, ease: EASE_SNAP };

export const stepped =
  (n = 8) =>
  (t: number) =>
    Math.min(1, Math.ceil(t * n) / n);

/** TRAVAR em lista: módulos encaixam em sequência. */
export const lockIn: Variants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: snap },
};

export const lockSequence = (step = 0.04, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren: delay } },
});

export const inViewOnce = { once: true, margin: '-12% 0px' } as const;
