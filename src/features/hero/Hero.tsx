import { motion } from 'motion/react';
import { profile } from '../../content/profile';
import { projects } from '../../content/projects';
import { expose, exposeSequence } from '../../lib/motion';
import { formatLat, formatLon } from '../../lib/coords';
import { sketchArrow, sketchEllipse } from '../../lib/sketch';
import { RegMarks } from '../../components/plate/RegMarks';
import { PencilPath } from '../../components/plate/Pencil';
import { ExposurePortrait } from './ExposurePortrait';

const EXPOSURE_S = 1.6;

export function Hero() {
  const cv = profile.links.find((l) => l.kind === 'cv');
  const years = new Date().getFullYear() - profile.observedSince;
  const coords = `${formatLat(profile.base.lat)} ${formatLon(profile.base.lon)}`;

  return (
    <section id="inicio" aria-label="Apresentação" className="mx-auto max-w-[88rem] px-4 pt-24 pb-20 md:px-10 md:pt-28">
      {/* rótulo da placa: só informação real */}
      <p className="label flex flex-wrap gap-x-6 gap-y-1 border-b border-ink/20 pb-3">
        <span>PLACA {profile.handle.toUpperCase()}-{new Date().getFullYear()}</span>
        <span>{profile.base.city} · {coords}</span>
        <span>exposição {EXPOSURE_S.toString().replace('.', ',')} s</span>
      </p>

      <div className="mt-10 grid items-center gap-12 md:mt-14 md:grid-cols-12 md:gap-8">
        {/* a placa com o objeto */}
        <div className="relative mx-auto w-full max-w-[34rem] md:col-span-6 md:mx-0">
          <div className="relative aspect-square">
            <RegMarks />
            <ExposurePortrait src={profile.photo.src} alt={profile.photo.alt} exposure={EXPOSURE_S} />
            <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
              <PencilPath d={sketchEllipse(50, 50, 45.5, 45.5, 7)} delay={EXPOSURE_S * 0.75} duration={1.1} />
              {/* marcas de identificação do objeto, como nas placas reais */}
              <PencilPath d="M50 -1 L50 3.5 M-1 50 L3.5 50" delay={EXPOSURE_S * 0.75 + 0.9} duration={0.3} />
              <PencilPath d={sketchArrow(93, 7, 84.5, 15.5, 3)} delay={EXPOSURE_S + 0.6} duration={0.5} width={1.2} />
              <PencilPath d={sketchArrow(8, 93, 16, 84.5, 5)} delay={EXPOSURE_S + 0.9} duration={0.5} width={1.2} />
            </svg>
            <motion.p
              className="hand absolute -top-3 right-8 rotate-[-3deg] text-2xl md:-top-5 md:text-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: EXPOSURE_S + 0.9, duration: 0.3 }}
            >
              objeto nº 1
            </motion.p>
            <motion.p
              className="hand absolute -bottom-3 left-0 rotate-[2deg] text-2xl md:-bottom-5 md:text-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: EXPOSURE_S + 1.2, duration: 0.3 }}
            >
              visível desde {profile.observedSince}
            </motion.p>
          </div>
        </div>

        {/* identificação */}
        <motion.div variants={exposeSequence(0.14, 0.35)} initial="hidden" animate="show" className="md:col-span-6 md:pl-6">
          <motion.p variants={expose} className="label">
            {profile.role.toLowerCase()} · {years} anos em atividade
          </motion.p>
          <motion.h1 variants={expose} className="font-display mt-4 text-5xl leading-[0.95] font-light tracking-tight sm:text-6xl lg:text-8xl">
            {profile.name}
          </motion.h1>
          <motion.p variants={expose} className="mt-8 max-w-xl font-serif text-2xl leading-snug md:text-[1.7rem]">
            {profile.tagline}
          </motion.p>
          <motion.ul variants={expose} className="mt-10 space-y-2 font-serif text-lg">
            <li>
              <a href="#projetos" className="note-link">
                Ver os {projects.length} projetos catalogados
              </a>
            </li>
            {cv && (
              <li>
                <a href={cv.href} className="note-link" download>
                  Baixar o currículo (PDF)
                </a>
              </li>
            )}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
