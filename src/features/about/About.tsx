import { profile } from '../../content/profile';
import { experiences } from '../../content/experiences';
import { formatLat, formatLon } from '../../lib/geo';
import { SectionHeading } from '../../components/hud/SectionHeading';

export function About() {
  const current = experiences.find((e) => e.period.end === 'present');
  const [lead, ...more] = profile.bio;

  const rows: { k: string; v: React.ReactNode }[] = [
    { k: 'Nome', v: profile.name },
    { k: 'Formação', v: profile.education },
    ...(current ? [{ k: 'Atual', v: `${current.role} · ${current.company.split('·')[0]!.trim()}` }] : []),
    {
      k: 'Base',
      v: (
        <>
          {profile.base.city}{' '}
          <span className="font-mono text-[13px] text-text-2">
            · {formatLat(profile.base.lat)} {formatLon(profile.base.lon)} · {profile.base.utcOffset}
          </span>
        </>
      ),
    },
    { k: 'Idiomas', v: profile.languages.join(' · ') },
    { k: 'Na área desde', v: <span className="font-mono text-[15px]">{profile.observedSince}</span> },
    {
      k: 'Atuação',
      v: (
        <ul className="flex flex-col gap-1">
          {profile.focus.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <section id="sobre" aria-labelledby="sobre-title" className="mx-auto max-w-[90rem] px-4 py-16 md:px-16 md:py-24">
      <SectionHeading id="sobre-title" sectionId="sobre" />

      <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:gap-x-6">
        <div className="cut bg-line p-px md:col-span-5 md:self-start">
          <div className="cut relative overflow-hidden bg-panel px-4 pt-4 pb-1.5 md:px-6 md:pt-5">
            <div className="flex justify-between border-b border-edge pb-2.5">
              <h3 className="hud">Ficha do alvo</h3>
              <span className="hud text-text-3">{rows.length} campos</span>
            </div>
            <dl>
              {rows.map((r, i) => (
                <div
                  key={r.k}
                  className={`grid gap-1 py-3 md:grid-cols-[9rem_1fr] md:gap-4 ${i < rows.length - 1 ? 'border-b border-line' : ''}`}
                >
                  <dt className="hud text-text-3">{r.k}</dt>
                  <dd className="text-base leading-snug">{r.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="flex flex-col gap-5 md:col-span-6 md:col-start-7">
          <p className="text-2xl leading-snug font-medium md:text-[28px]">{lead}</p>
          {more.map((p) => (
            <p key={p} className="text-base leading-relaxed text-text-2 md:text-lg">
              {p}
            </p>
          ))}
          <div className="border-t border-line pt-4">
            <h3 className="hud mb-3 text-text-3">Notas do operador</h3>
            <ul className="flex flex-wrap gap-2.5">
              {profile.marginNotes.map((n) => (
                <li key={n} className="hud border border-breach px-2.5 py-1.5 text-breach">
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
