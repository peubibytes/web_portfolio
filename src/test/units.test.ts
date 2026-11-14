import { decodeFrame, stepProgress } from '../lib/decode';
import { buildGroups } from '../lib/skills';
import { SECTIONS } from '../app/sections';
import { formatMonth, toYear } from '../lib/period';
import { buildMailto } from '../features/contact/mailto';
import { projects } from '../content/projects';
import { experiences } from '../content/experiences';
import { profile } from '../content/profile';

describe('períodos', () => {
  it('converte datas para ano decimal e texto', () => {
    expect(toYear('2023-07')).toBe(2023.5);
    expect(toYear('2020')).toBe(2020);
    expect(toYear('present', new Date(2026, 0, 1))).toBe(2026);
    expect(formatMonth('2023-02')).toBe('fev 2023');
    expect(formatMonth('present')).toBe('hoje');
  });
});

describe('decodificar', () => {
  it('é determinístico e termina exatamente no texto real', () => {
    expect(decodeFrame('Habilidades', 0.5, 3)).toBe(decodeFrame('Habilidades', 0.5, 3));
    expect(decodeFrame('Habilidades', 1)).toBe('Habilidades');
    expect(decodeFrame('Habilidades', 0).length).toBe('Habilidades'.length);
  });
  it('revela da esquerda para a direita e preserva espaços e pontuação', () => {
    const f = decodeFrame('Registro de serviços', 0.4, 5);
    expect(f.startsWith('Regis')).toBe(true);
    expect(f[8]).toBe(' ');
    expect(decodeFrame('A — B', 0, 1)[1]).toBe(' ');
  });
  it('avança em degraus discretos', () => {
    expect(stepProgress(0.3, 8)).toBe(0.375);
    expect(stepProgress(5, 8)).toBe(1);
  });
});

describe('habilidades', () => {
  const groups = buildGroups(profile.instruments, experiences, projects);
  const find = (n: string) => groups.flatMap((g) => g.skills).find((s) => s.name === n)!;
  it('cobre todos os instrumentos do perfil, sem inventar nenhum', () => {
    const names = groups.flatMap((g) => g.skills.map((s) => s.name)).sort();
    expect(names).toEqual([...profile.instruments].sort());
  });
  it('deriva a evidência do currículo', () => {
    expect(find('React').evidence[0]).toMatchObject({ kind: 'serviço', label: '3corações', current: true });
    expect(find('React').current).toBe(true);
    expect(find('TypeScript').evidence.map((e) => e.kind)).toEqual(['serviço', 'projeto', 'projeto']);
    expect(find('Python').evidence).toEqual([]);
  });
});

describe('seções', () => {
  it('têm termo temático e termo comum, ids únicos', () => {
    expect(new Set(SECTIONS.map((s) => s.id)).size).toBe(SECTIONS.length);
    for (const s of SECTIONS) expect(s.plain.length).toBeGreaterThan(3);
  });
  it('usa os nomes de seção em linguagem comum', () => {
    const terms = SECTIONS.map((s) => s.term);
    expect(terms).toContain('Perfil');
    expect(terms).toContain('Habilidades');
    expect(terms).toContain('Projetos');
  });
});

describe('mailto', () => {
  it('monta assunto e corpo codificados', () => {
    const url = buildMailto('mailto:a@b.co', { name: 'Ana', subject: '', message: 'Olá & tchau' });
    expect(url.startsWith('mailto:a@b.co?subject=Contato%20pelo%20portf%C3%B3lio')).toBe(true);
    expect(decodeURIComponent(url.split('body=')[1]!)).toBe('Olá & tchau\n\n— Ana');
  });
});

describe('conteúdo', () => {
  it('ids únicos, origem válida e lição preenchida', () => {
    expect(new Set(projects.map((p) => p.id)).size).toBe(projects.length);
    expect(new Set(experiences.map((e) => e.id)).size).toBe(experiences.length);
    for (const p of projects) {
      expect(['github', 'roblox']).toContain(p.source);
      if (p.source === 'github') expect(p.links.repo).toMatch(/^https:\/\/github\.com\//);
      if (p.lesson !== undefined) expect(p.lesson.length).toBeGreaterThan(20);
    }
  });
  it('texto livre de clichês', () => {
    const all = JSON.stringify({ profile, experiences, projects }).toLowerCase();
    for (const banned of ['apaixonado', 'transformo', 'inovador', 'soluções inovadoras', 'cafés', 'sinergia']) {
      expect(all).not.toContain(banned);
    }
  });
});
