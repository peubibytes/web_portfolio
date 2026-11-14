import { useState } from 'react';
import { profile } from '../../content/profile';
import { SectionHeading } from '../../components/hud/SectionHeading';
import { buildMailto } from './mailto';

const field =
  'w-full border-0 bg-transparent px-0 py-2 text-[17px] text-text outline-none placeholder:text-text-3 focus-visible:outline-none';
const wrap = 'mt-1 flex gap-2.5 border-b border-edge focus-within:border-b-2 focus-within:border-data';

export function Contact() {
  const email = profile.links.find((l) => l.kind === 'email');
  const others = profile.links.filter((l) => l.kind !== 'email' && l.kind !== 'cv');
  const cv = profile.links.find((l) => l.kind === 'cv');
  const [form, setForm] = useState({ name: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSending(true);
    // N9: barra 0→100% e o app de email abre. Nada é enviado ou guardado por este site.
    window.setTimeout(() => {
      window.location.href = buildMailto(email.href, form);
      setSending(false);
    }, 600);
  };

  return (
    <section id="contato" aria-labelledby="contact-title" className="mx-auto max-w-[90rem] px-4 py-16 md:px-16 md:py-24">
      <SectionHeading id="contact-title" sectionId="contato" />

      <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:gap-x-6">
        <div className="flex flex-col gap-7 md:col-span-5">
          <p className="text-2xl leading-snug font-medium md:text-[30px]">
            Vaga, projeto ou uma pergunta sobre algo daqui? Escreva. Respondo em até dois dias úteis.
          </p>
          <dl className="border-t border-line">
            {email && (
              <div className="flex flex-col gap-0.5 border-b border-line py-3 md:grid md:grid-cols-[8.75rem_1fr] md:gap-4 md:py-4">
                <dt className="hud text-text-3">Email</dt>
                <dd>
                  <a href={email.href} className="link flex min-h-8 items-center font-mono text-sm md:text-[15px]">
                    {email.href.replace('mailto:', '')}
                  </a>
                </dd>
              </div>
            )}
            {others.map((l) => (
              <div key={l.href} className="flex flex-col gap-0.5 border-b border-line py-3 md:grid md:grid-cols-[8.75rem_1fr] md:gap-4 md:py-4">
                <dt className="hud text-text-3">{l.label}</dt>
                <dd>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="link flex min-h-8 items-center font-mono text-sm md:text-[15px]">
                    {l.href.replace(/^https?:\/\/(www\.)?/, '')} ↗
                  </a>
                </dd>
              </div>
            ))}
            {cv && (
              <div className="flex flex-col gap-0.5 border-b border-line py-3 md:grid md:grid-cols-[8.75rem_1fr] md:gap-4 md:py-4">
                <dt className="hud text-text-3">Currículo</dt>
                <dd>
                  <a href={cv.href} className="link flex min-h-8 items-center font-mono text-sm md:text-[15px]">
                    cv.pdf ↓
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </div>

        <form onSubmit={submit} aria-describedby="form-note" className="cut bg-line p-px md:col-span-6 md:col-start-7">
          <div className="cut flex flex-col gap-5 bg-panel px-4 pt-5 pb-6 md:gap-6 md:px-8 md:pt-7 md:pb-8">
            <div className="flex justify-between border-b border-edge pb-3">
              <h3 className="hud">Compor transmissão</h3>
              {email && <span className="hud hidden text-text-3 md:inline">destino · {email.href.replace('mailto:', '')}</span>}
            </div>
            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
              <label className="block">
                <span className="hud text-text-2">Seu nome *</span>
                <span className={wrap}>
                  <span aria-hidden="true" className="hud pt-2.5 text-text-3">&gt;</span>
                  <input
                    required
                    autoComplete="name"
                    aria-label="Seu nome"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={field}
                  />
                </span>
              </label>
              <label className="block">
                <span className="hud text-text-2">Assunto</span>
                <span className={wrap}>
                  <span aria-hidden="true" className="hud pt-2.5 text-text-3">&gt;</span>
                  <input
                    aria-label="Assunto"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Contato pelo portfólio"
                    className={field}
                  />
                </span>
              </label>
            </div>
            <label className="block">
              <span className="hud text-text-2">Mensagem *</span>
              <span className={`${wrap} items-start`}>
                <span aria-hidden="true" className="hud pt-2.5 text-text-3">&gt;</span>
                <textarea
                  required
                  rows={5}
                  aria-label="Mensagem"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${field} resize-y`}
                />
              </span>
            </label>

            {sending && (
              <div role="status" className="hud text-data">
                Transmitindo…
                <span className="mt-2 block h-1.5 w-full bg-line" aria-hidden="true">
                  <span className="block h-full animate-[fill_0.6s_steps(12)_forwards] bg-data" />
                </span>
              </div>
            )}

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
              <p id="form-note" className="max-w-xs text-[13px] leading-relaxed text-text-3">
                Abre o seu app de email com a mensagem pronta. Nada é enviado ou guardado por este site.
              </p>
              <button type="submit" disabled={sending} className="btn !min-h-12 justify-center disabled:cursor-wait disabled:bg-line disabled:text-text-3">
                Transmitir · escrever email →
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
