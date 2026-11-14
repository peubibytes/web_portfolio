import { useEffect, useRef } from 'react';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-m';
import { SECTIONS, type SectionId } from './sections';
import { profile } from '../content/profile';
import { snap } from '../lib/motion';
import { useMotion } from '../hooks/useMotion';

interface Props {
  open: boolean;
  active: SectionId;
  onClose: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled])';

/** Índice em tela cheia para o celular: rótulo temático + termo comum, seção ativa marcada. */
export function MobileMenu({ open, active, onClose }: Props) {
  const panel = useRef<HTMLDivElement>(null);
  const { animate, toggle } = useMotion();

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';
    requestAnimationFrame(() => panel.current?.querySelector<HTMLElement>('[aria-current="true"], a')?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key !== 'Tab' || !panel.current) return;
      const nodes = Array.from(panel.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const mql = window.matchMedia('(min-width: 768px)');
    const onResize = () => mql.matches && onClose();
    window.addEventListener('keydown', onKey);
    mql.addEventListener('change', onResize);
    return () => {
      html.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
      mql.removeEventListener('change', onResize);
    };
  }, [open, onClose]);

  const email = profile.links.find((l) => l.kind === 'email');

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panel}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Índice"
          className="fixed inset-0 z-[60] flex flex-col bg-void px-4 pt-16 pb-6 md:hidden"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={snap}
        >
          <button
            type="button"
            onClick={onClose}
            className="hud absolute top-1.5 right-4 min-h-9 border border-data px-3 text-data"
          >
            Fechar
          </button>
          <nav aria-label="Seções">
            <ul>
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={active === s.id ? 'true' : undefined}
                    onClick={onClose}
                    className={`grid min-h-[76px] grid-cols-[2.5rem_1fr] items-center gap-2 border-b border-line px-1 ${
                      active === s.id ? 'bg-panel shadow-[inset_4px_0_0_var(--color-signal)]' : ''
                    }`}
                  >
                    <span className={`hud ${active === s.id ? 'text-signal' : 'text-text-3'}`}>{s.numeral}</span>
                    <span>
                      <span className={`display block text-3xl ${active === s.id ? 'text-signal' : ''}`}>{s.term}</span>
                      <span className="text-[15px] leading-snug text-text-2">{s.plain}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto flex flex-col gap-3 border-t border-line pt-4">
            <button
              type="button"
              role="switch"
              aria-checked={animate}
              onClick={toggle}
              className="hud flex min-h-12 items-center justify-between border border-edge px-3.5"
            >
              <span>Movimento</span>
              <span className={animate ? 'text-signal' : 'text-text-3'}>{animate ? 'on' : 'off'}</span>
            </button>
            {email && (
              <a href={email.href} className="link min-h-11 py-2 font-mono text-[13px]">
                {email.href.replace('mailto:', '')}
              </a>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
