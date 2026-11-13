import type { Transition, Variants } from 'motion/react';

/**
 * O site usa SÓ três tipos de movimento. Não adicione um quarto.
 *
 * 1. EXPOSIÇÃO   — algo aparece por acúmulo de luz, em degraus.
 * 2. TRAÇO       — uma linha é desenhada como lápis (pathLength).
 * 3. APONTAMENTO — deslocamento mecânico de telescópio: acelera, trava.
 */

/** easing em degraus: a placa "recebe luz" em 6 etapas */
export const stepped =
  (n = 6) =>
  (t: number) =>
    Math.min(1, Math.ceil(t * n) / n);

export const EASE_SLEW = [0.7, 0, 0.2, 1] as const;

// 1. Exposição
export const expose: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: stepped(6) } },
};

export const exposeSequence = (step = 0.12, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren: delay } },
});

// 2. Traço
export const drawTransition = (delay = 0, duration = 0.9): Transition => ({
  pathLength: { delay, duration, ease: [0.45, 0, 0.25, 1] },
  opacity: { delay, duration: 0.01 },
});

// 3. Apontamento
export const slew: Transition = { duration: 0.55, ease: EASE_SLEW };

export const inViewOnce = { once: true, margin: '-12% 0px' } as const;
