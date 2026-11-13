import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { projects } from '../../content/projects';
import { section } from '../../app/sections';
import { SectionHeading } from '../../components/plate/SectionHeading';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { StarChart } from './StarChart';
import { Catalog } from './Catalog';
import { ProjectSheet } from './ProjectSheet';
import { useProjectHash } from './useProjectHash';

type View = 'chart' | 'catalog';

export function Projects() {
  const s = section('projetos');
  const [view, setView] = useState<View>('chart');
  const { openId, open, close } = useProjectHash();
  const isDesktop = useMediaQuery('(min-width: 900px)');
  const showChart = isDesktop && view === 'chart';
  const index = projects.findIndex((p) => p.id === openId);
  const current = projects[index];

  return (
    <section id="projetos" aria-labelledby="proj-title" className="mx-auto max-w-[88rem] px-4 py-24 md:px-10 md:py-36">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading id="proj-title" numeral={s.numeral} term={s.term} plain={s.plain} />
        {isDesktop && (
          <div role="group" aria-label="Forma de visualizar" className="label flex gap-4">
            {(
              [
                ['chart', 'como carta'],
                ['catalog', 'como lista'],
              ] as const
            ).map(([v, label]) => (
              <button
                key={v}
                type="button"
                aria-pressed={view === v}
                onClick={() => setView(v)}
                className={`border-b pb-0.5 ${view === v ? 'border-sodium text-ink' : 'border-transparent hover:border-ink/40'}`}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {showChart ? (
        <>
          <StarChart items={projects} onOpen={open} />
          <p className="label mt-12">
            tamanho do ponto = importância do projeto · passe o mouse para ampliar · clique para abrir a ficha
          </p>
        </>
      ) : (
        <Catalog items={projects} onOpen={open} />
      )}

      <AnimatePresence>
        {current && <ProjectSheet key={current.id} project={current} index={index} onClose={close} />}
      </AnimatePresence>
    </section>
  );
}
