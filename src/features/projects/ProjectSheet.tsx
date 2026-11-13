import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import type { Project } from '../../content/types';
import { catalogCode, formatDec, formatRA } from '../../lib/coords';
import { slew, stepped } from '../../lib/motion';
import { RegMarks } from '../../components/plate/RegMarks';

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface Props {
  project: Project;
  index: number;
  onClose: () => void;
}

/** Ficha do projeto: desliza da direita como um telescópio apontando (movimento tipo 3). */
export function ProjectSheet({ project, index, onClose }: Props) {
  const sheet = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const returnTo = document.activeElement as HTMLElement | null;
    sheet.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus();
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key !== 'Tab' || !sheet.current) return;
      const nodes = Array.from(sheet.current.querySelectorAll<HTMLElement>(FOCUSABLE));
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
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      html.style.overflow = prev;
      returnTo?.focus?.();
    };
  }, [onClose]);

  const entries = [
    { k: 'Problema', v: project.problem },
    { k: 'Solução', v: project.solution },
    { k: 'Resultado', v: project.result },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex justify-end bg-ink/35"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: stepped(3) }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        ref={sheet}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
        className="relative h-full w-full max-w-2xl overflow-y-auto border-l border-ink bg-plate"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={slew}
      >
        <div className="px-6 py-8 md:px-12 md:py-12">
          <div className="flex items-start justify-between gap-6">
            <p className="label">
              {catalogCode('P', index)} · AR {formatRA(project.ra)} · Dec {formatDec(project.dec)} · mag {project.magnitude} · {project.year}
            </p>
            <button type="button" data-autofocus onClick={onClose} className="note-link label shrink-0 text-ink">
              fechar (esc)
            </button>
          </div>

          <h3 id="sheet-title" className="font-display mt-6 text-4xl leading-tight font-light md:text-5xl">
            {project.title}
          </h3>
          <p className="mt-4 font-serif text-xl leading-snug">{project.summary}</p>

          <figure className="relative mt-10">
            <RegMarks />
            <img src={project.cover.src} alt={project.cover.alt} className="block w-full grayscale" />
          </figure>

          <dl className="mt-12 space-y-8">
            {entries.map((e) => (
              <div key={e.k} className="grid gap-2 md:grid-cols-[8rem_1fr] md:gap-6">
                <dt className="label pt-1">{e.k}</dt>
                <dd className="font-serif text-lg leading-relaxed">{e.v}</dd>
              </div>
            ))}
            {project.lesson && (
              <div className="relative grid gap-2 border-t border-ink/25 pt-8 md:grid-cols-[8rem_1fr] md:gap-6">
                <dt className="label pt-1">O que eu faria diferente</dt>
                <dd className="font-serif text-lg leading-relaxed">
                  {project.lesson}
                  <span className="hand mt-2 block -rotate-1 text-2xl">↑ a parte mais útil desta ficha</span>
                </dd>
              </div>
            )}
          </dl>

          <p className="label mt-12">{project.stack.join(' · ')}</p>
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2 font-serif text-lg">
            {project.links.demo && (
              <li>
                <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="note-link">
                  Ver funcionando
                </a>
              </li>
            )}
            {project.links.repo && (
              <li>
                <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="note-link">
                  Ler o código
                </a>
              </li>
            )}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}
