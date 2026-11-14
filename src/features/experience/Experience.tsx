import { useState } from 'react';
import { experiences } from '../../content/experiences';
import type { Experience as Job } from '../../content/types';
import { formatMonth } from '../../lib/period';
import { SectionHeading } from '../../components/hud/SectionHeading';

function Period({ job }: { job: Job }) {
  return (
    <span className="font-mono text-[13px] text-text">
      {formatMonth(job.period.start)} → {formatMonth(job.period.end)}
    </span>
  );
}

function Log({ items, small }: { items: string[]; small?: boolean }) {
  return (
    <ul className={`grid gap-x-8 gap-y-2.5 ${small ? 'text-[15px] text-text-2' : 'text-base md:text-[17px] md:grid-cols-2'}`}>
      {items.map((h) => (
        <li key={h} className="grid grid-cols-[1.25rem_1fr] leading-relaxed">
          <span aria-hidden="true" className="font-mono text-data">
            ›
          </span>
          <span>{h}</span>
        </li>
      ))}
    </ul>
  );
}

function Entry({ job, current }: { job: Job; current: boolean }) {
  const [open, setOpen] = useState(false);
  const company = job.company.split('·');
  const shown = current || open ? job.highlights : job.highlights.slice(0, 1);

  return (
    <li className="grid gap-3 md:grid-cols-[10rem_1fr] md:gap-x-6">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-1 md:flex-col md:items-start">
        <Period job={job} />
        {current && <span className="hud cut-s bg-signal px-2 py-1 font-medium text-void">Atual</span>}
      </div>
      <article className={`relative border-l pl-5 md:pl-7 ${current ? 'border-line' : 'border-line'}`}>
        <span
          aria-hidden="true"
          className={`absolute top-2 -left-[6px] size-[11px] border ${current ? 'border-signal bg-signal' : 'border-edge bg-void'}`}
        />
        <h3 className={`display ${current ? 'text-4xl md:text-6xl' : 'text-3xl md:text-4xl'}`}>{job.role}</h3>
        <p className="mt-2.5 mb-4 text-lg font-medium">
          {company[0]!.trim()}
          {company[1] && <span className="font-normal text-text-2"> · {company[1].trim()}</span>}
        </p>
        <Log items={shown} small={!current} />
        {!current && job.highlights.length > 1 && (
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="hud mt-3 min-h-11 border border-edge px-3 text-data"
          >
            {open ? 'Recolher ↑' : `Ver registro completo · ${job.highlights.length} ↓`}
          </button>
        )}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {job.stack.map((s) => (
            <span key={s} className={`tag ${current ? 'tag-data' : ''}`}>
              {s}
            </span>
          ))}
        </div>
      </article>
    </li>
  );
}

export function Experience() {
  return (
    <section id="experiencias" aria-labelledby="exp-title" className="mx-auto max-w-[90rem] px-4 py-16 md:px-16 md:py-24">
      <SectionHeading id="exp-title" sectionId="experiencias" />
      <ol className="mt-10 flex flex-col gap-9 md:mt-14 md:gap-10">
        {experiences.map((job) => (
          <Entry key={job.id} job={job} current={job.period.end === 'present'} />
        ))}
      </ol>
    </section>
  );
}
