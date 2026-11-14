import { useEffect, useRef, useState } from 'react';
import { section, type SectionId } from '../../app/sections';
import { useMotion } from '../../hooks/useMotion';
import { DecodeText } from './DecodeText';

/** No máximo um ROMPER por segundo (WCAG 2.3.1): rolagem rápida só decodifica. */
let lastBreach = 0;

interface Props {
  id: string;
  sectionId: SectionId;
}

/** Cabeçalho de seção: título decodificado, termo comum ao lado e entrada ROMPER. */
export function SectionHeading({ id, sectionId }: Props) {
  const s = section(sectionId);
  const { animate } = useMotion();
  const host = useRef<HTMLDivElement>(null);
  const [breaking, setBreaking] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!animate || !el || typeof IntersectionObserver === 'undefined') return;
    let timer = 0;
    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        obs.disconnect();
        const now = performance.now();
        if (now - lastBreach < 1000) return;
        lastBreach = now;
        setBreaking(true);
        timer = window.setTimeout(() => setBreaking(false), 340);
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      window.clearTimeout(timer);
    };
  }, [animate]);

  return (
    <div>
      <div ref={host} className={`breach-host ${breaking ? 'breaking' : ''}`}>
        <h2 id={id} className="display text-[clamp(3.25rem,9vw,6rem)] leading-[0.88]">
          <DecodeText text={s.term} />
          <span className="mt-2 block font-sans text-lg font-normal normal-case tracking-normal text-text-2 md:ml-4 md:mt-0 md:inline md:text-2xl">
            <span aria-hidden="true" className="hidden md:inline">— </span>
            {s.plain}
          </span>
        </h2>
        <span className="breach-slice slice-a" aria-hidden="true" />
        <span className="breach-slice slice-b" aria-hidden="true" />
        <span className="breach-slice slice-c" aria-hidden="true" />
      </div>
    </div>
  );
}
