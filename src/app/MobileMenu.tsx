import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { SECTIONS, type SectionId } from './sections';
import { profile } from '../content/profile';
import { expose, exposeSequence, slew } from '../lib/motion';

interface Props {
  open: boolean;
  active: SectionId;
  onClose: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled])';

/** Índice em tela cheia para telas pequenas, como o sumário de um catálogo. */
export function MobileMenu({ open, active, onClose }: Props) {
  const panel = useRef<HTMLDivElement>(null);

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

  const links = profile.links.filter((l) => l.kind !== 'cv');

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panel}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Índice"
          className="fixed inset-0 z-[45] flex flex-col bg-plate px-5 pt-20 pb-10 text-ink md:hidden"
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={slew}
        >
          <p className="label border-b border-ink/20 pb-3">ÍNDICE</p>
          <nav aria-label="Seções">
            <motion.ul variants={exposeSequence(0.06, 0.25)} initial="hidden" animate="show">
              {SECTIONS.map((s) => (
                <motion.li key={s.id} variants={expose}>
                  <a
                    href={`#${s.id}`}
                    aria-current={active === s.id ? 'true' : undefined}
                    onClick={onClose}
                    className="grid grid-cols-[2.5rem_1fr] items-baseline border-b border-ink/15 py-4"
                  >
                    <span className="label">{s.numeral}</span>
                    <span>
                      <span className={`font-display text-2xl font-light ${active === s.id ? 'underline decoration-sodium decoration-2 underline-offset-6' : ''}`}>
                        {s.term}
                      </span>
                      <span className="block font-serif italic text-ink-soft">{s.plain}</span>
                    </span>
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </nav>

          <ul className="mt-auto flex flex-wrap gap-x-6 gap-y-2 font-serif text-lg">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target={l.kind === 'email' ? undefined : '_blank'}
                  rel={l.kind === 'email' ? undefined : 'noopener noreferrer'}
                  className="note-link"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
