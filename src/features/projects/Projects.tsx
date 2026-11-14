import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-m';
import { projects } from '../../content/projects';
import { inViewOnce, lockIn, lockSequence } from '../../lib/motion';
import { SectionHeading } from '../../components/hud/SectionHeading';
import { FilePanel, sourceLabel } from './FilePanel';
import { useProjectHash } from './useProjectHash';

export function Projects() {
  const { openId, open, close } = useProjectHash();
  const index = projects.findIndex((p) => p.id === openId);
  const active = index >= 0 ? projects[index] : undefined;

  return (
    <section id="projetos" aria-labelledby="proj-title" className="mx-auto max-w-[90rem] px-4 py-16 md:px-16 md:py-24">
      <SectionHeading id="proj-title" sectionId="projetos" />

      <motion.ul
        variants={lockSequence(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={inViewOnce}
        className="mt-10 grid gap-5 md:mt-14 md:grid-cols-3 md:gap-6"
      >
        {projects.map((p) => (
          <motion.li key={p.id} variants={lockIn}>
            <button
              type="button"
              data-scan
              onClick={() => open(p.id)}
              aria-label={`Ver detalhes: ${p.title}`}
              className="brackets group relative block w-full cursor-pointer text-left"
            >
              <span className="cut block bg-panel group-hover:bg-raised group-focus-visible:bg-raised">
                <span className="flex justify-between border-b border-line px-4 py-3">
                  <span className="hud">{sourceLabel[p.source]}</span>
                  <span className="hud text-text-2">{p.year}</span>
                </span>
                <img
                  src={p.cover.src}
                  alt=""
                  width={480}
                  height={300}
                  loading="lazy"
                  className="block aspect-[8/5] w-full border-b border-line bg-void object-cover"
                />
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
                  <span className="hud text-data">Ver detalhes →</span>
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
