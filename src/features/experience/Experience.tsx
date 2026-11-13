import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { experiences } from '../../content/experiences';
import { section } from '../../app/sections';
import { SectionHeading } from '../../components/plate/SectionHeading';
import { PencilPath } from '../../components/plate/Pencil';
import { expose, exposeSequence, inViewOnce } from '../../lib/motion';
import { formatMonth } from '../../lib/period';
import { buildCurve } from './lightCurve';

const W = 1000;
const H = 340;
const M = { l: 56, r: 24, t: 36, b: 44 };

function LightCurve({ active, onActive }: { active: string | null; onActive: (id: string | null) => void }) {
  const model = useMemo(() => buildCurve(experiences), []);
  const x = (year: number) => M.l + ((year - model.minYear) / (model.maxYear - model.minYear)) * (W - M.l - M.r);
  const y = (v: number) => H - M.b - (v / 10) * (H - M.t - M.b);
  const years = Array.from({ length: model.maxYear - model.minYear + 1 }, (_, i) => model.minYear + i);
  const fitD = model.fit.map(([yr, v], i) => `${i ? 'L' : 'M'}${x(yr).toFixed(1)} ${y(v).toFixed(1)}`).join(' ');

  return (
    <figure className="-mx-4 mt-14 overflow-x-auto px-4 md:mx-0 md:mt-20 md:px-0">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full min-w-[640px]"
        role="img"
        aria-label={`Curva de luz: escopo de responsabilidade ao longo do tempo, de ${model.minYear} a ${model.maxYear}. Os detalhes estão na lista abaixo.`}
      >
        {/* eixos */}
        <g className="text-paper-soft" stroke="currentColor" strokeWidth="1">
          <line x1={M.l} y1={H - M.b} x2={W - M.r} y2={H - M.b} />
          <line x1={M.l} y1={M.t} x2={M.l} y2={H - M.b} />
          {years.map((yr) => (
            <line key={yr} x1={x(yr)} y1={H - M.b} x2={x(yr)} y2={H - M.b + 6} />
          ))}
          {[0, 5, 10].map((v) => (
            <line key={v} x1={M.l - 6} y1={y(v)} x2={M.l} y2={y(v)} />
          ))}
        </g>
        <g className="fill-paper-soft font-mono" fontSize="12">
          {years.map((yr) => (
            <text key={yr} x={x(yr)} y={H - M.b + 22} textAnchor="middle">
              {yr}
            </text>
          ))}
          {[0, 5, 10].map((v) => (
            <text key={v} x={M.l - 12} y={y(v) + 4} textAnchor="end">
              {v}
            </text>
          ))}
          <text x={M.l} y={M.t - 14} textAnchor="start">
            escopo ↑
          </text>
        </g>

        {/* medições: aparecem por exposição */}
        <motion.g variants={expose} initial="hidden" whileInView="show" viewport={inViewOnce}>
          {model.observations.map((o, i) => {
            const hot = active === o.id;
            return (
              <g key={i} className={hot ? 'text-sodium' : 'text-paper'} opacity={active && !hot ? 0.35 : 0.9}>
                <line x1={x(o.year)} x2={x(o.year)} y1={y(o.value - o.err)} y2={y(o.value + o.err)} stroke="currentColor" strokeWidth="1" />
                <circle cx={x(o.year)} cy={y(o.value)} r={hot ? 3.4 : 2.6} fill="currentColor" />
              </g>
            );
          })}
        </motion.g>

        {/* curva ajustada: traço a lápis */}
        <PencilPath d={fitD} delay={0.4} duration={1.6} width={1.6} className="text-sodium" />

        {/* identificação dos períodos */}
        {model.jobs.map((j) => (
          <g
            key={j.id}
            onMouseEnter={() => onActive(j.id)}
            onMouseLeave={() => onActive(null)}
            className="cursor-default"
          >
            <rect x={x(j.start)} y={M.t} width={x(j.end) - x(j.start)} height={H - M.t - M.b} fill="transparent" />
            <text x={x(j.start) + 4} y={y(j.scope) - 16} className="fill-paper font-mono" fontSize="13">
              {j.code}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

export function Experience() {
  const s = section('experiencias');
  const [active, setActive] = useState<string | null>(null);
  const ordered = [...experiences].sort((a, b) => b.period.start.localeCompare(a.period.start));
  const codeOf = (id: string) => `E${experiences.length - ordered.findIndex((e) => e.id === id)}`;

  return (
    <section
      id="experiencias"
      aria-labelledby="exp-title"
      className="on-dark bg-plate-dark text-paper"
    >
      <div className="mx-auto max-w-[88rem] px-4 py-24 md:px-10 md:py-36">
        <SectionHeading id="exp-title" numeral={s.numeral} term={s.term} plain={s.plain} />
        <LightCurve active={active} onActive={setActive} />
        <p className="label mt-3 md:pl-[56px]">
          cada ponto é um trimestre · a linha laranja é a tendência · passe o mouse num período para destacar
        </p>

        <motion.ol
          variants={exposeSequence(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={inViewOnce}
          className="mt-16 border-t border-paper/15"
        >
          {ordered.map((e) => (
            <motion.li
              key={e.id}
              variants={expose}
              onMouseEnter={() => setActive(e.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(e.id)}
              onBlur={() => setActive(null)}
              tabIndex={0}
              className={`grid gap-3 border-b border-paper/15 py-8 transition-colors outline-none md:grid-cols-12 md:gap-8 ${
                active === e.id ? 'bg-plate-dark-2' : ''
              }`}
            >
              <div className="label md:col-span-3">
                <span className={active === e.id ? 'text-sodium' : ''}>{codeOf(e.id)}</span> · {formatMonth(e.period.start)} — {formatMonth(e.period.end)}
              </div>
              <div className="md:col-span-4">
                <h3 className="font-display text-xl font-light md:text-2xl">{e.role}</h3>
                <p className="mt-1 font-serif text-lg italic text-paper-soft">{e.company}</p>
              </div>
              <div className="md:col-span-5">
                <ul className="space-y-2 font-serif text-lg leading-relaxed">
                  {e.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <p className="label mt-4">{e.stack.join(' · ')}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
