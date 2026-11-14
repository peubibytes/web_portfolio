import type { Experience, Profile, Project } from '../content/types';

export interface Evidence {
  kind: 'serviço' | 'projeto';
  label: string;
  /** Serviço atual (período em aberto). */
  current?: boolean;
}

export interface Skill {
  name: string;
  /** Onde aparece no currículo (serviços e projetos); vazio quando só está listada. */
  evidence: Evidence[];
  current: boolean;
}

export interface Group {
  id: string;
  label: string;
  skills: Skill[];
}

/** Agrupamento das habilidades. [A VALIDAR] com Pedro. */
const GROUPS: { id: string; label: string; names: string[] }[] = [
  { id: 'A', label: 'Linguagens', names: ['Python', 'C#', 'Java', 'C', 'JavaScript', 'TypeScript'] },
  { id: 'B', label: 'Web e plataformas', names: ['React', 'Next.js', 'VTEX', 'Unity'] },
  { id: 'C', label: 'Ferramentas', names: ['Git'] },
];

const same = (a: string, b: string) => a.toLowerCase() === b.toLowerCase();

/** Evidência derivada do currículo: onde cada tecnologia aparece. Nada é inventado. */
export function buildGroups(
  instruments: Profile['instruments'],
  experiences: Experience[],
  projects: Project[],
): Group[] {
  const evidenceOf = (name: string): Evidence[] => {
    const out: Evidence[] = [];
    for (const e of experiences) {
      if (e.stack.some((s) => same(s, name))) {
        out.push({ kind: 'serviço', label: e.company.split('·')[0]!.trim(), current: e.period.end === 'present' });
      }
    }
    for (const p of projects) {
      if (p.stack.some((s) => same(s, name))) {
        out.push({ kind: 'projeto', label: p.title });
      }
    }
    return out;
  };
  const make = (name: string): Skill => {
    const evidence = evidenceOf(name);
    return { name, evidence, current: evidence.some((e) => e.current) };
  };

  const known = new Set(GROUPS.flatMap((g) => g.names));
  const groups = GROUPS.map((g) => ({
    id: g.id,
    label: g.label,
    skills: g.names.filter((n) => instruments.some((i) => same(i, n))).map(make),
  }));
  // itens novos no profile.ts que ainda não têm grupo: entram em Ferramentas
  const last = groups[groups.length - 1]!;
  for (const name of instruments.filter((i) => !known.has(i))) last.skills.push(make(name));
  return groups.filter((g) => g.skills.length > 0);
}
