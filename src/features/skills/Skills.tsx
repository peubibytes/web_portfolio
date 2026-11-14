import * as motion from 'motion/react-m';
import { profile } from '../../content/profile';
import { experiences } from '../../content/experiences';
import { projects } from '../../content/projects';
import { buildGroups } from '../../lib/skills';
import { inViewOnce, lockIn, lockSequence } from '../../lib/motion';
import { SectionHeading } from '../../components/hud/SectionHeading';

const groups = buildGroups(profile.instruments, experiences, projects);

export function Skills() {
  return (
    <section id="habilidades" aria-labelledby="habilidades-title" className="mx-auto max-w-[90rem] px-4 py-16 md:px-16 md:py-24">
      <SectionHeading id="habilidades-title" sectionId="habilidades" />

      <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-3 md:gap-x-6">
        {groups.map((g) => (
          <div key={g.id}>
            <div className="mb-2 flex justify-between border-b border-edge pb-2">
              <h3 className="hud">{g.label}</h3>
              <span className="hud text-text-3">{g.skills.length}</span>
            </div>
            <motion.ul
              variants={lockSequence(0.04)}
              initial="hidden"
              whileInView="show"
              viewport={inViewOnce}
              className="flex flex-col gap-3"
            >
              {g.skills.map((sk) => (
                <motion.li
                  key={sk.name}
                  variants={lockIn}
                  data-scan
                  tabIndex={0}
                  className={`brackets relative flex min-h-[60px] flex-wrap items-center gap-x-3 gap-y-1 border border-line bg-panel py-2 pr-3 pl-5 hover:bg-raised focus-visible:bg-raised ${
                    sk.current ? 'shadow-[inset_4px_0_0_var(--color-signal)]' : ''
                  }`}
                >
                  <i aria-hidden="true" />
                  <i aria-hidden="true" />
                  <i aria-hidden="true" />
                  <i aria-hidden="true" />
                  <span className="display text-[1.65rem] font-extrabold">{sk.name}</span>
                  <span className="ml-auto flex flex-wrap justify-end gap-1.5">
                    {sk.evidence.map((e) => (
                      <span key={`${e.kind}-${e.label}`} className="tag tag-data">
                        {`${e.kind} · ${e.label}`}
                      </span>
                    ))}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        ))}
      </div>
      <p className="mt-8 flex items-center gap-2.5 text-sm text-text-2">
        <span aria-hidden="true" className="inline-block h-5 w-1 bg-signal" />
        faixa amarela = em uso no serviço atual
      </p>
    </section>
  );
}
