import { useEffect, useRef } from 'react';
import * as motion from 'motion/react-m';
import type { Project } from '../../content/types';
import { projects } from '../../content/projects';
import { snap } from '../../lib/motion';
import { DecodeText } from '../../components/hud/DecodeText';

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface Props {
  project: Project;
  index: number;
  onClose: () => void;
  onNavigate?: (id: string) => void;
}

/** Arquivo descriptografado: painel que desliza e trava (N8). Foco preso, ESC e retorno do foco. */
export function FilePanel({ project, index, onClose, onNavigate }: Props) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const returnTo = document.activeElement as HTMLElement | null;
    panel.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus();
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';

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
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      html.style.overflow = prev;
      returnTo?.focus?.();
    };
  }, [onClose]);

  const entries = [
    { k: 'Problema', v: project.problem, c: 'text-breach' },
    { k: 'Solução', v: project.solution, c: 'text-data' },
    { k: 'Resultado', v: project.result, c: 'text-signal' },
    ...(project.lesson ? [{ k: 'O que eu faria diferente', v: project.lesson, c: 'text-text-2' }] : []),
  ];
  const code = `ARQ-${String(index + 1).padStart(2, '0')}`;
  const prevP = projects[(index - 1 + projects.length) % projects.length]!;
  const nextP = projects[(index + 1) % projects.length]!;
  const { demo, repo } = project.links;

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex justify-end bg-void/70"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.12 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="file-title"
        className="flex h-full w-full flex-col overflow-y-auto border-l-2 border-signal bg-panel md:w-[72%] md:max-w-[1036px]"
        initial={{ x: '8%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '8%', opacity: 0 }}
        transition={snap}
      >
        <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-line bg-panel px-4 py-3 md:px-10">
          <span className="hud text-signal">{code} · descriptografado</span>
          <span className="hud hidden text-text-3 md:inline">#projeto-{project.id}</span>
          <nav aria-label="Outros arquivos" className="ml-auto hidden gap-2 md:flex">
            {onNavigate && (
              <>
                <button type="button" onClick={() => onNavigate(prevP.id)} className="hud min-h-9 border border-edge px-2.5 text-text-2">
                  ‹ {prevP.title}
                </button>
                <button type="button" onClick={() => onNavigate(nextP.id)} className="hud min-h-9 border border-edge px-2.5 text-text-2">
                  {nextP.title} ›
                </button>
              </>
            )}
          </nav>
          <button
            type="button"
            data-autofocus
            onClick={onClose}
            className="hud ml-auto min-h-9 border border-data px-3 text-data md:ml-0"
          >
            fechar (esc)
          </button>
        </div>

        <div className="grid gap-8 px-4 py-8 md:grid-cols-9 md:gap-x-6 md:px-10 md:py-11">
          <div className="md:col-span-6">
            <p className="hud text-text-3">
              {project.year} · {project.status}
            </p>
            <h2 id="file-title" className="display mt-3 text-5xl md:text-[5.25rem]">
              <DecodeText text={project.title} />
            </h2>
            <p className="mt-5 mb-7 text-lg leading-relaxed text-text-2 md:text-xl">{project.summary}</p>
            {entries.map((e) => (
              <div key={e.k} className="grid gap-1.5 border-t border-line py-4 md:grid-cols-[9.5rem_1fr] md:gap-5 md:py-[18px]">
                <h3 className={`hud ${e.c}`}>{e.k}</h3>
                <p className="text-base leading-relaxed md:text-lg">{e.v}</p>
              </div>
            ))}
          </div>

          <aside className="flex flex-col gap-5 md:col-span-3 md:pt-8">
            <img
              src={project.cover.src}
              alt={project.cover.alt}
              width={480}
              height={300}
              className="w-full border border-line bg-void"
              style={{ filter: 'grayscale(0.6) contrast(1.1)' }}
            />
            <div>
              <h3 className="hud mb-2 text-text-3">Stack</h3>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <span key={s} className="tag tag-data">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="hud mb-2 text-text-3">Links</h3>
              {demo || repo ? (
                <ul className="flex flex-col gap-1">
                  {demo && (
                    <li>
                      <a href={demo} target="_blank" rel="noopener noreferrer" className="link">
                        demo ↗
                      </a>
                    </li>
                  )}
                  {repo && (
                    <li>
                      <a href={repo} target="_blank" rel="noopener noreferrer" className="link">
                        repositório ↗
                      </a>
                    </li>
                  )}
                </ul>
              ) : (
                <p className="border border-dashed border-edge px-3 py-2.5 text-sm text-text-2">Sem link público ainda.</p>
              )}
            </div>
          </aside>
        </div>
      </motion.div>
    </motion.div>
  );
}
