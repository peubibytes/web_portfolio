import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { SECTIONS } from './sections';
import type { SectionId } from './sections';

/**
 * Escala na borda direita da placa (só em telas largas).
 * Funciona como mapa da página: marcas das seções + ponteiro de sódio na posição atual.
 */
export function PlateScale({ active }: { active: SectionId }) {
  const { scrollYProgress } = useScroll();
  const top = useTransform(scrollYProgress, (v) => `${v * 100}%`);
  const [marks, setMarks] = useState<{ id: SectionId; numeral: string; at: number }[]>([]);

  useEffect(() => {
    const measure = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setMarks(
        SECTIONS.map((s) => {
          const el = document.getElementById(s.id);
          return { id: s.id, numeral: s.numeral, at: Math.min(1, (el?.offsetTop ?? 0) / max) };
        }),
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    return () => ro.disconnect();
  }, []);

  const onDark = active === 'experiencias';

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed top-[22vh] right-4 bottom-[22vh] z-40 hidden w-8 xl:block ${onDark ? 'text-paper-soft' : 'text-ink-soft'}`}
    >
      <div className="absolute inset-y-0 right-0 w-px bg-current opacity-50" />
      {Array.from({ length: 41 }, (_, i) => (
        <div
          key={i}
          className="absolute right-0 h-px bg-current opacity-50"
          style={{ top: `${i * 2.5}%`, width: i % 10 === 0 ? 12 : i % 5 === 0 ? 8 : 4 }}
        />
      ))}
      {marks.map((m) => (
        <span
          key={m.id}
          className={`absolute right-4 -translate-y-1/2 font-mono text-[10px] ${active === m.id ? 'text-sodium-ink' : ''} ${onDark && active === m.id ? '!text-sodium' : ''}`}
          style={{ top: `${m.at * 100}%` }}
        >
          {m.numeral}
        </span>
      ))}
      <motion.div className="absolute right-0 h-0 w-0" style={{ top }}>
        <span className="absolute top-0 right-0 block h-0 w-0 -translate-y-1/2 border-y-[5px] border-r-[8px] border-y-transparent border-r-sodium" />
      </motion.div>
    </div>
  );
}
