import * as motion from 'motion/react-m';
import { profile } from '../../content/profile';
import { experiences } from '../../content/experiences';
import { snap } from '../../lib/motion';
import { useMotion } from '../../hooks/useMotion';

export function Hero() {
  const { animate } = useMotion();
  const [first, ...rest] = profile.name.split(' ');
  const current = experiences.find((e) => e.period.end === 'present');
  const email = profile.links.find((l) => l.kind === 'email');
  const github = profile.links.find((l) => l.kind === 'github');

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="mx-auto grid min-h-dvh max-w-[90rem] items-center gap-10 px-4 py-10 md:grid-cols-12 md:gap-x-6 md:px-16 md:py-12"
    >
      <div className="flex flex-col gap-6 md:col-span-7 md:gap-7">
        <h1 id="hero-title" className="display text-[clamp(5.25rem,13vw,10.5rem)] leading-[0.86]">
          <span className="block">{first}</span>{' '}
          <motion.span
            className="mt-2 inline-block"
            initial={animate ? { clipPath: 'inset(0 100% 0 0)' } : false}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            transition={{ ...snap, delay: 0.2, duration: 0.16 }}
          >
            <span className="cut inline-block bg-signal px-[0.15em] pt-[0.08em] text-void">{rest.join(' ')}</span>
          </motion.span>
        </h1>

        <div className="flex max-w-[40rem] flex-col gap-3">
          <p className="text-xl leading-snug font-medium md:text-[22px]">
            {profile.role}
            {current && ` · ${current.role} · ${current.company.split('·')[0]!.trim()}`}
          </p>
          <p className="text-base leading-relaxed text-text-2 md:text-lg">{profile.tagline}</p>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-7">
          <a href="#contato" className="btn !min-h-12 justify-between md:justify-start">
            <span>Abrir canal</span>
            <span aria-hidden="true">→</span>
          </a>
          <div className="flex gap-5">
            {email && (
              <a href={email.href} className="link flex min-h-11 items-center font-mono text-[13px] md:min-h-0">
                {email.href.replace('mailto:', '')}
              </a>
            )}
            {github && (
              <a href={github.href} target="_blank" rel="noopener noreferrer" className="link flex min-h-11 items-center font-mono text-[13px] md:min-h-0">
                GitHub ↗
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="md:col-span-5">
        <div data-scan className="brackets relative mx-2 aspect-[5/6] max-h-[30rem] bg-panel">
          <i aria-hidden="true" />
          <i aria-hidden="true" />
          <i aria-hidden="true" />
          <i aria-hidden="true" />
          <div aria-hidden="true" className="absolute bottom-0 left-0 h-[42%] w-[56%] bg-signal" />
          <img
            src={profile.photo.src}
            alt={profile.photo.alt}
            width={400}
            height={480}
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover mix-blend-luminosity"
            style={{ filter: 'grayscale(1) contrast(1.25)' }}
          />
          <div aria-hidden="true" className="halftone absolute inset-0 text-void/70" />
          <div aria-hidden="true" className="portrait-scan absolute inset-x-0 top-0 h-1/6 bg-data/40" />
          <p className="hud absolute right-3 bottom-3 text-right text-[11px] text-text">{profile.base.city}</p>
        </div>
      </div>
    </section>
  );
}
