import { motion } from 'motion/react';
import { profile } from '../../content/profile';
import { expose, exposeSequence, inViewOnce } from '../../lib/motion';
import { formatLat, formatLon } from '../../lib/coords';
import { section } from '../../app/sections';
import { SectionHeading } from '../../components/plate/SectionHeading';
import { RegMarks } from '../../components/plate/RegMarks';

export function About() {
  const s = section('sobre');
  const years = new Date().getFullYear() - profile.observedSince;
  const rows = [
    { k: 'Base', v: `${profile.base.city} · ${formatLat(profile.base.lat)} ${formatLon(profile.base.lon)} · ${profile.base.utcOffset}` },
    { k: 'Em atividade', v: `desde ${profile.observedSince} (${years} anos)` },
    { k: 'Idiomas', v: profile.languages.join(' · ') },
    { k: 'Instrumentos', v: profile.instruments.join(' · ') },
    { k: 'Aberto a', v: profile.openTo },
  ];

  return (
    <section id="sobre" aria-labelledby="sobre-title" className="mx-auto max-w-[88rem] px-4 py-24 md:px-10 md:py-36">
      <SectionHeading id="sobre-title" numeral={s.numeral} term={s.term} plain={s.plain} />

      <motion.div
        variants={exposeSequence(0.15)}
        initial="hidden"
        whileInView="show"
        viewport={inViewOnce}
        className="mt-14 space-y-8 md:mt-20"
      >
        {profile.bio.map((p, i) => (
          <motion.div key={p} variants={expose} className="grid gap-2 md:grid-cols-12 md:gap-8">
            <p className="hand text-2xl md:col-span-3 md:pt-1 md:text-right md:text-[1.7rem]" aria-hidden={!profile.marginNotes[i]}>
              {profile.marginNotes[i] ?? ''}
            </p>
            <p
              className={`font-serif md:col-span-7 ${
                i === 0 ? 'text-2xl leading-snug md:text-[2.1rem]' : 'text-lg leading-relaxed md:text-xl'
              }`}
            >
              {p}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* a ficha: dados reais, em mono */}
      <motion.div
        variants={expose}
        initial="hidden"
        whileInView="show"
        viewport={inViewOnce}
        className="relative mt-16 bg-plate-2/70 px-5 py-6 md:mt-24 md:ml-[25%] md:w-[58%] md:px-8 md:py-8"
      >
        <RegMarks />
        <p className="label mb-4">FICHA · objeto nº 1</p>
        <dl className="divide-y divide-ink/15 border-y border-ink/15">
          {rows.map((r) => (
            <div key={r.k} className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr] sm:gap-4">
              <dt className="label pt-0.5">{r.k}</dt>
              <dd className="font-serif text-lg">{r.v}</dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </section>
  );
}
