export interface Proposal {
  name: string;
  subject: string;
  message: string;
}

/** Monta um link mailto: — nada é enviado nem armazenado pelo site. */
export function buildMailto(to: string, p: Proposal) {
  const subject = p.subject.trim() || 'Proposta de observação';
  const body = `${p.message.trim()}\n\n— ${p.name.trim()}`;
  const address = to.replace(/^mailto:/, '');
  return `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
