import * as motion from 'motion/react-m';
import { profile } from '../../content/profile';
import { experiences } from '../../content/experiences';
import { projects } from '../../content/projects';
import { buildBanks } from '../../lib/implantes';
import { inViewOnce, lockIn, lockSequence } from '../../lib/motion';
import { SectionHeading } from '../../components/hud/SectionHeading';

const banks = buildBanks(profile.instruments, experiences, projects);
const total = banks.reduce((n, b) => n + b.implants.length, 0);

export function Implants() {
  return (
    <section id="implantes" aria-labelledby="implantes-title" className="mx-auto max-w-[90rem] px-4 py-16 md:px-16 md:py-24">
      <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-x-6">
        <div className="md:col-span-8">
          <SectionHeading id="implantes-title" sectionId="implantes" />
        </div>
        <p className="text-[15px] leading-relaxed text-text-2 md:col-span-4 md:pb-2 md:text-base">
          {total} módulos instalados. Ao lado de cada um, a evidência tirada do próprio currículo:{' '}
          <b className="font-medium text-text">onde ele foi usado</b>. Nenhuma porcentagem inventada.
        </p>
      </div>

      <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-3 md:gap-x-6">
        {banks.map((b) => (
          <div key={b.id}>
            <div className="mb-2 flex justify-between border-b border-edge pb-2">
              <h3 className="hud">
                Banco {b.id} · {b.label}
              </h3>
              <span className="hud text-text-3">{b.implants.length}</span>
            </div>
            <motion.ul
              variants={lockSequence(0.04)}
              initial="hidden"
              whileInView="show"
              viewport={inViewOnce}
              className="flex flex-col gap-3"
            >
              {b.implants.map((im) => (
                <motion.li
                  key={im.name}
                  variants={lockIn}
                  data-scan
                  tabIndex={0}
                  className={`brackets relative flex min-h-[60px] flex-wrap items-center gap-x-3 gap-y-1 border border-line bg-panel py-2 pr-3 pl-5 hover:bg-raised focus-visible:bg-raised ${
                    im.current ? 'shadow-[inset_4px_0_0_var(--color-signal)]' : ''
                  }`}
                >
                  <i aria-hidden="true" />
                  <i aria-hidden="true" />
                  <i aria-hidden="true" />
                  <i aria-hidden="true" />
                  <span className="display text-[1.65rem] font-extrabold">{im.name}</span>
                  <span className="ml-auto flex flex-wrap justify-end gap-1.5">
                    {im.evidence.map((e) => (
                      <span key={`${e.kind}-${e.label}`} className={`tag ${e.kind === 'currículo' ? 'tag-ghost' : 'tag-data'}`}>
                        {e.kind === 'currículo' ? e.label : `${e.kind} · ${e.label}`}
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
