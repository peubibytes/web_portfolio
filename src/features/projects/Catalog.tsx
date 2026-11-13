import { motion } from 'motion/react';
import type { Project } from '../../content/types';
import { catalogCode, formatDec, formatRA } from '../../lib/coords';
import { expose, exposeSequence, inViewOnce } from '../../lib/motion';

/** A mesma carta, como página de catálogo impresso. Padrão no mobile. */
export function Catalog({ items, onOpen }: { items: Project[]; onOpen: (id: string) => void }) {
  return (
    <motion.ol
      variants={exposeSequence(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={inViewOnce}
      className="mt-14 border-t border-ink/25 md:mt-20"
    >
      {items.map((p, i) => (
        <motion.li key={p.id} variants={expose} className="border-b border-ink/25">
          <button
            type="button"
            onClick={() => onOpen(p.id)}
            className="group grid w-full gap-2 py-6 text-left md:grid-cols-12 md:items-baseline md:gap-8"
          >
            <span className="label md:col-span-2">
              {catalogCode('P', i)} · {p.year}
            </span>
            <span className="md:col-span-6">
              <span className="font-display text-2xl font-light group-hover:text-sodium-ink md:text-3xl">{p.title}</span>
              <span className="mt-1 block font-serif text-lg text-ink-soft">{p.summary}</span>
            </span>
            <span className="label md:col-span-3">{p.stack.slice(0, 3).join(' · ')}</span>
            <span className="label md:col-span-1 md:text-right">
              {formatRA(p.ra)}
              <br className="hidden md:block" /> {formatDec(p.dec)}
            </span>
          </button>
        </motion.li>
      ))}
    </motion.ol>
  );
}
