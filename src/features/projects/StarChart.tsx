import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { Project } from '../../content/types';
import { catalogCode, formatDec, formatRA } from '../../lib/coords';
import { expose, inViewOnce, slew, stepped } from '../../lib/motion';
import { RegMarks } from '../../components/plate/RegMarks';

/** AR cresce para a esquerda, como em qualquer carta celeste de verdade. */
export const chartX = (ra: number) => ((24 - ra) / 24) * 100;
export const chartY = (dec: number) => ((60 - dec) / 120) * 100;

const DOT: Record<Project['magnitude'], number> = { 1: 15, 2: 12, 3: 9, 4: 7, 5: 5 };
const RA_LINES = Array.from({ length: 11 }, (_, i) => (i + 1) * 2);
const DEC_LINES = [-45, -30, -15, 0, 15, 30, 45];

interface Props {
  items: Project[];
  onOpen: (id: string) => void;
}

export function StarChart({ items, onOpen }: Props) {
  const [focus, setFocus] = useState<string | null>(null);
  const target = items.find((p) => p.id === focus);
  // a lupa fica além do rótulo do objeto, para não cobrir nem o ponto nem o nome
  const loupe = target && {
    left: Math.min(88, Math.max(12, chartX(target.ra) + (chartX(target.ra) > 70 ? -26 : 26))),
    top: Math.min(66, Math.max(34, chartY(target.dec))),
  };

  return (
    <motion.div
      variants={expose}
      initial="hidden"
      whileInView="show"
      viewport={inViewOnce}
      className="relative mt-14 aspect-[2/1] w-full bg-plate-2/70 md:mt-20"
    >
      <RegMarks />
      {/* retícula de coordenadas */}
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full text-ink/20" viewBox="0 0 100 100" preserveAspectRatio="none">
        {RA_LINES.map((ra) => (
          <line key={ra} x1={chartX(ra)} x2={chartX(ra)} y1={0} y2={100} stroke="currentColor" vectorEffect="non-scaling-stroke" />
        ))}
        {DEC_LINES.map((dec) => (
          <line
            key={dec}
            x1={0}
            x2={100}
            y1={chartY(dec)}
            y2={chartY(dec)}
            stroke="currentColor"
            strokeDasharray={dec === 0 ? undefined : '2 3'}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      {RA_LINES.filter((ra) => ra % 4 === 0).map((ra) => (
        <span key={ra} className="label absolute -bottom-6 -translate-x-1/2" style={{ left: `${chartX(ra)}%` }}>
          {ra}h
        </span>
      ))}
      {DEC_LINES.filter((d) => d % 30 === 0).map((dec) => (
        <span key={dec} className="label absolute -left-2 -translate-x-full -translate-y-1/2" style={{ top: `${chartY(dec)}%` }}>
          {formatDec(dec)}
        </span>
      ))}

      {/* a lupa: aponta (movimento tipo 3) de objeto em objeto */}
      <AnimatePresence>
        {target && loupe && (
          <motion.div
            key="loupe"
            aria-hidden="true"
            className="pointer-events-none absolute z-10 w-[19%] -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, left: `${loupe.left}%`, top: `${loupe.top}%` }}
            animate={{ opacity: 1, left: `${loupe.left}%`, top: `${loupe.top}%` }}
            exit={{ opacity: 0 }}
            transition={{ ...slew, opacity: { duration: 0.25, ease: stepped(3) } }}
          >
            <div className="relative aspect-square overflow-hidden rounded-full border border-ink bg-plate">
              <img src={target.cover.src} alt="" className="h-full w-full object-cover grayscale" />
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full text-sodium">
                <path d="M50 8v18M50 74v18M8 50h18M74 50h18" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </div>
            <p className="label mt-2 text-center">
              {target.year} · {target.stack.slice(0, 2).join(' · ')}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <ul>
        {items.map((p, i) => {
          const size = DOT[p.magnitude];
          const right = chartX(p.ra) > 70;
          return (
            <li key={p.id} className="absolute" style={{ left: `${chartX(p.ra)}%`, top: `${chartY(p.dec)}%` }}>
              <button
                type="button"
                onClick={() => onOpen(p.id)}
                onMouseEnter={() => setFocus(p.id)}
                onMouseLeave={() => setFocus(null)}
                onFocus={() => setFocus(p.id)}
                onBlur={() => setFocus(null)}
                aria-label={`${p.title}, ${p.year}. Abrir ficha do projeto.`}
                className="group absolute top-0 left-0 block"
              >
                {/* o ponto fica exatamente na coordenada */}
                <span
                  className="absolute block -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink transition-colors group-hover:bg-sodium group-focus-visible:bg-sodium"
                  style={{ width: size, height: size }}
                />
                <span
                  className={`absolute top-0 block -translate-y-1/2 whitespace-nowrap ${right ? 'text-right' : 'text-left'}`}
                  style={right ? { right: size / 2 + 10 } : { left: size / 2 + 10 }}
                >
                  <span className="label block">
                    {catalogCode('P', i)} · {formatRA(p.ra)} {formatDec(p.dec)}
                  </span>
                  <span className="font-serif text-lg underline-offset-4 group-hover:underline">{p.title}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}
