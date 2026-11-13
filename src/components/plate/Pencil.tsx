import { motion } from 'motion/react';
import { drawTransition, inViewOnce } from '../../lib/motion';

interface PathProps {
  d: string;
  delay?: number;
  duration?: number;
  className?: string;
  width?: number;
}

/** Um traço a lápis que se desenha ao entrar na tela (movimento tipo 2: traço). */
export function PencilPath({ d, delay = 0, duration = 0.9, className = 'text-sodium', width = 1.5 }: PathProps) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="currentColor"
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
      className={className}
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={inViewOnce}
      transition={drawTransition(delay, duration)}
    />
  );
}
