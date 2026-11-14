import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-m';
import { projects } from '../../content/projects';
import { inViewOnce, lockIn, lockSequence } from '../../lib/motion';
import { SectionHeading } from '../../components/hud/SectionHeading';
import { FilePanel } from './FilePanel';
import { useProjectHash } from './useProjectHash';

const utf8Hex = (s: string) =>
  Array.from(new TextEncoder().encode(s), (b) => b.toString(16).toUpperCase().padStart(2, '0')).join(' ');

export function Projects() {
  const { openId, open, close } = useProjectHash();
  const index = projects.findIndex((p) => p.id === openId);
  const active = index >= 0 ? projects[index] : undefined;

  return (
    <section id="projetos" aria-labelledby="proj-title" className="mx-auto max-w-[90rem] px-4 py-16 md:px-16 md:py-24">
      <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-x-6">
        <div className="md:col-span-8">
          <SectionHeading id="proj-title" sectionId="projetos" />
        </div>
        <p className="text-[15px] leading-relaxed text-text-2 md:col-span-4 md:pb-2 md:text-base">
          {projects.length} arquivos. Abrir um = descriptografar: problema, solução e resultado. A prévia hex é o título real em UTF-8.
        </p>
      </div>

      <motion.ul
        variants={lockSequence(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={inViewOnce}
        className="mt-10 grid gap-5 md:mt-14 md:grid-cols-3 md:gap-6"
      >
        {projects.map((p, i) => (
          <motion.li key={p.id} variants={lockIn}>
            <button
              type="button"
              data-scan
              onClick={() => open(p.id)}
              aria-label={`Abrir arquivo: ${p.title}`}
              className="brackets group relative block w-full cursor-pointer text-left"
            >
              <span className="cut block bg-panel group-hover:bg-raised group-focus-visible:bg-raised">
                <span className="flex justify-between border-b border-line px-4 py-3">
                  <span className="hud">ARQ-{String(i + 1).padStart(2, '0')} · {p.year}</span>
                  <span className={`hud ${p.status === 'em andamento' ? 'text-signal' : 'text-text-2'}`}>{p.status}</span>
                </span>
                <span
                  aria-hidden="true"
                  className="block h-20 overflow-hidden border-b border-line bg-void px-4 py-3 font-mono text-[11px] leading-[1.7] tracking-[0.08em] break-words text-edge group-hover:text-data md:h-[9.5rem] md:text-xs"
                >
                  {utf8Hex(p.title)}
                  <span className="block text-line">▒▒ ▒▒ ▒▒ ▒▒ ▒▒ ▒▒ ▒▒ ▒▒</span>
                </span>
                <span className="flex flex-col gap-3 p-4">
                  <span className="display text-3xl md:text-[2.5rem]">{p.title}</span>
                  <span className="text-[15px] leading-relaxed text-text-2">{p.summary}</span>
                  <span className="flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span key={s} className="tag">
                        {s}
                      </span>
                    ))}
                  </span>
                  <span className="hud text-data">Descriptografar →</span>
                </span>
              </span>
              <i aria-hidden="true" />
              <i aria-hidden="true" />
              <i aria-hidden="true" />
              <i aria-hidden="true" />
            </button>
          </motion.li>
        ))}
      </motion.ul>

      <AnimatePresence>
        {active && <FilePanel key={active.id} project={active} index={index} onClose={close} onNavigate={open} />}
      </AnimatePresence>
    </section>
  );
}
