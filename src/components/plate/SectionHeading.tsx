import { motion } from 'motion/react';
import { expose, inViewOnce } from '../../lib/motion';

interface Props {
  id: string;
  /** algarismo romano, como nas seções de um catálogo impresso */
  numeral: string;
  /** o termo do tema */
  term: string;
  /** o termo comum — sempre presente, para nunca atrapalhar a leitura */
  plain: string;
  className?: string;
}

export function SectionHeading({ id, numeral, term, plain, className = '' }: Props) {
  return (
    <motion.header
      variants={expose}
      initial="hidden"
      whileInView="show"
      viewport={inViewOnce}
      className={`grid grid-cols-[3rem_1fr] items-baseline gap-x-4 md:grid-cols-[5rem_1fr] ${className}`}
    >
      <span className="label pt-2 text-right">{numeral}.</span>
      <div>
        <h2 id={id} className="font-display text-3xl font-light tracking-tight md:text-5xl">
          {term}
        </h2>
        <p className="mt-2 font-serif text-lg italic opacity-70">{plain}</p>
      </div>
    </motion.header>
  );
}
