import type { Experience, Profile, Project } from '../content/types';

export interface Evidence {
  kind: 'serviço' | 'projeto' | 'currículo';
  label: string;
  /** Serviço atual (período em aberto). */
  current?: boolean;
}

export interface Implant {
  name: string;
  evidence: Evidence[];
  current: boolean;
}

export interface Bank {
  id: string;
  label: string;
  implants: Implant[];
}

/** Agrupamento dos módulos. [A VALIDAR] com Pedro. */
const BANKS: { id: string; label: string; names: string[] }[] = [
  { id: 'A', label: 'Linguagens', names: ['Python', 'C#', 'Java', 'C', 'JavaScript', 'TypeScript'] },
  { id: 'B', label: 'Web e plataformas', names: ['React', 'Next.js', 'VTEX', 'Unity'] },
  { id: 'C', label: 'Ferramentas', names: ['Git'] },
];

const same = (a: string, b: string) => a.toLowerCase() === b.toLowerCase();

/** Evidência derivada do currículo: onde cada tecnologia aparece. Nada é inventado. */
export function buildBanks(
  instruments: Profile['instruments'],
  experiences: Experience[],
  projects: Project[],
): Bank[] {
  const evidenceOf = (name: string): Evidence[] => {
    const out: Evidence[] = [];
    for (const e of experiences) {
      if (e.stack.some((s) => same(s, name))) {
        out.push({ kind: 'serviço', label: e.company.split('·')[0]!.trim(), current: e.period.end === 'present' });
      }
    }
    for (const p of projects) {
      if (p.stack.some((s) => same(s, name) || (name === 'Unity' && same(s, 'Unity')))) {
        out.push({ kind: 'projeto', label: p.title });
      }
    }
    return out.length ? out : [{ kind: 'currículo', label: 'listado no currículo' }];
  };

  const known = new Set(BANKS.flatMap((b) => b.names));
  const banks = BANKS.map((b) => ({
    id: b.id,
    label: b.label,
    implants: b.names
      .filter((n) => instruments.some((i) => same(i, n)))
      .map((name) => {
        const evidence = evidenceOf(name);
        return { name, evidence, current: evidence.some((e) => e.current) };
      }),
  }));
  // instrumentos novos no profile.ts que ainda não têm banco: entram em Ferramentas
  const extra = instruments.filter((i) => !known.has(i));
  const last = banks[banks.length - 1]!;
  for (const name of extra) {
    const evidence = evidenceOf(name);
    last.implants.push({ name, evidence, current: evidence.some((e) => e.current) });
  }
  return banks.filter((b) => b.implants.length > 0);
}
