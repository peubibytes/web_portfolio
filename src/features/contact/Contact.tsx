import { useState } from 'react';
import { motion } from 'motion/react';
import { profile } from '../../content/profile';
import { section } from '../../app/sections';
import { SectionHeading } from '../../components/plate/SectionHeading';
import { RegMarks } from '../../components/plate/RegMarks';
import { expose, inViewOnce } from '../../lib/motion';
import { buildMailto } from './mailto';

const field =
  'mt-1 w-full border-0 border-b border-ink/40 bg-transparent px-0 py-2 font-serif text-lg outline-none transition-colors focus:border-sodium-ink focus-visible:outline-none';

export function Contact() {
  const s = section('contato');
  const email = profile.links.find((l) => l.kind === 'email');
  const others = profile.links.filter((l) => l.kind !== 'email' && l.kind !== 'cv');
  const [form, setForm] = useState({ name: '', subject: '', message: '' });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) window.location.href = buildMailto(email.href, form);
  };

  return (
    <section id="contato" aria-labelledby="contact-title" className="mx-auto max-w-[88rem] px-4 py-24 md:px-10 md:py-36">
      <SectionHeading id="contact-title" numeral={s.numeral} term={s.term} plain={s.plain} />

      <div className="mt-14 grid gap-14 md:mt-20 md:grid-cols-12 md:gap-8">
        <motion.div variants={expose} initial="hidden" whileInView="show" viewport={inViewOnce} className="md:col-span-4 md:col-start-2">
          <p className="font-serif text-2xl leading-snug">
            Vaga, projeto ou uma pergunta sobre algo daqui? Escreva. Respondo em até dois dias úteis.
          </p>
          <dl className="mt-10 space-y-4">
            {email && (
              <div>
                <dt className="label">Email</dt>
                <dd>
                  <a href={email.href} className="note-link font-serif text-lg">
                    {email.href.replace('mailto:', '')}
                  </a>
                </dd>
              </div>
            )}
            {others.map((l) => (
              <div key={l.href}>
                <dt className="label">{l.label}</dt>
                <dd>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="note-link font-serif text-lg">
                    {l.href.replace(/^https?:\/\/(www\.)?/, '')}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.form
          variants={expose}
          initial="hidden"
          whileInView="show"
          viewport={inViewOnce}
          onSubmit={submit}
          className="relative bg-plate-2/70 px-5 py-7 md:col-span-6 md:px-10 md:py-10"
          aria-describedby="form-note"
        >
          <RegMarks />
          <p className="label mb-6">FORMULÁRIO DE PROPOSTA</p>
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="label">Seu nome</span>
              <input
                required
                autoComplete="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={field}
              />
            </label>
            <label className="block">
              <span className="label">Assunto</span>
              <input
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="Proposta de observação"
                className={`${field} placeholder:text-ink/35`}
              />
            </label>
          </div>
          <label className="mt-6 block">
            <span className="label">Mensagem</span>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={`${field} resize-y`}
            />
          </label>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <p id="form-note" className="label max-w-xs">
              abre o seu app de email com a mensagem pronta — nada é enviado ou guardado por este site
            </p>
            <button
              type="submit"
              className="border border-ink px-6 py-3 font-mono text-sm transition-colors hover:bg-ink hover:text-plate"
            >
              Escrever email
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
