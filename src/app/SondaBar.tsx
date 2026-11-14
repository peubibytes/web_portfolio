import { useEffect, useState } from 'react';
import { LAYERS, layerOf, SECTIONS, type SectionId } from './sections';
import { profile } from '../content/profile';
import { useMotion } from '../hooks/useMotion';

function useClock(timeZone: string) {
  const fmt = () =>
    new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone }).format(new Date());
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = window.setInterval(() => setTime(fmt()), 1000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeZone]);
  return time;
}

interface Props {
  active: SectionId;
  menuOpen: boolean;
  onMenu: () => void;
}

/** Barra da Sonda: marca, índice, relógio de Fortaleza, toggle de movimento e CTA sempre visível. */
export function SondaBar({ active, menuOpen, onMenu }: Props) {
  const { animate, toggle } = useMotion();
  const time = useClock(profile.base.timeZone);
  const layer = String(layerOf(active)).padStart(2, '0');

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-12 items-center gap-3 border-b border-line bg-void px-4 md:h-14 md:gap-6 md:px-8">
      <a href="#inicio" aria-label="Sonda, voltar ao início" className="flex items-center gap-2.5">
        <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
          <path d="M2 9V2h7M19 2h7v7M26 19v7h-7M9 26H2v-7" fill="none" stroke="#F3E600" strokeWidth="2" />
          <text x="14" y="18.5" textAnchor="middle" fontFamily="Big Shoulders, Impact, sans-serif" fontWeight="900" fontSize="12" fill="#EEEDE6">
            PB
          </text>
          <path d="M20 26 26 20" stroke="#FF3B6B" strokeWidth="2" />
        </svg>
        <span className="hud hidden font-medium sm:inline">Sonda</span>
      </a>

      {/* mobile: indicador de camada */}
      <p className="hud text-text-3 md:hidden" aria-label={`Camada ${layer} de 0${LAYERS}`}>
        Camada <span className="text-signal">{layer}</span>/0{LAYERS}
      </p>

      <nav aria-label="Seções" className="mx-auto hidden gap-0 md:flex lg:gap-0.5">
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-current={active === s.id ? 'true' : undefined}
            className={`flex flex-col border-b-2 px-2.5 pt-2 pb-1.5 transition-colors ${
              active === s.id ? 'border-signal text-signal' : 'border-transparent text-text-2 hover:text-text'
            }`}
          >
            <span className="hud">
              {s.numeral} {s.nav}
            </span>
            <span className="text-[11px] leading-tight font-normal text-text-3 normal-case">{s.plain.split(',')[0]}</span>
          </a>
        ))}
      </nav>

      <p className="hud hidden text-text-3 xl:block">
        {profile.base.city} <time className="text-text">{time}</time>
      </p>
      <button
        type="button"
        onClick={toggle}
        aria-pressed={animate}
        aria-label="Movimento"
        className="hud ml-auto hidden min-h-9 whitespace-nowrap border border-edge px-2.5 text-text-2 hover:text-text md:ml-0 md:block"
      >
        Mov · {animate ? 'on' : 'off'}
      </button>
      <a href="#contato" className="btn !min-h-9 hidden whitespace-nowrap md:inline-flex">
        Abrir canal →
      </a>
      <button
        type="button"
        onClick={onMenu}
        aria-haspopup="dialog"
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        className="hud ml-auto min-h-9 border border-edge px-3 md:hidden"
      >
        Índice
      </button>
    </header>
  );
}
