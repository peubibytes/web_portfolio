import { formatLat, formatLon } from '../lib/geo';
import { decodeFrame, stepProgress } from '../lib/decode';
import { buildBanks } from '../lib/implantes';
import { bootLines } from '../features/boot/useBoot';
import { SECTIONS } from '../app/sections';
import { formatMonth, toYear } from '../lib/period';
import { buildMailto } from '../features/contact/mailto';
import { projects } from '../content/projects';
import { experiences } from '../content/experiences';
import { profile } from '../content/profile';

describe('coordenadas', () => {
  it('formata lat/lon de São Paulo', () => {
    expect(formatLat(-23.5505)).toBe('23°33′S');
    expect(formatLon(-46.6333)).toBe('46°38′O');
  });
  it('formata a base de Fortaleza', () => {
    expect(formatLat(profile.base.lat)).toBe('3°44′S');
    expect(formatLon(profile.base.lon)).toBe('38°32′O');
  });
});

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
    expect(decodeFrame('Varredura', 0.5, 3)).toBe(decodeFrame('Varredura', 0.5, 3));
    expect(decodeFrame('Varredura', 1)).toBe('Varredura');
    expect(decodeFrame('Varredura', 0).length).toBe('Varredura'.length);
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

describe('implantes', () => {
  const banks = buildBanks(profile.instruments, experiences, projects);
  const find = (n: string) => banks.flatMap((b) => b.implants).find((i) => i.name === n)!;
  it('cobre todos os instrumentos do perfil, sem inventar nenhum', () => {
    const names = banks.flatMap((b) => b.implants.map((i) => i.name)).sort();
    expect(names).toEqual([...profile.instruments].sort());
  });
  it('deriva a evidência do currículo', () => {
    expect(find('React').evidence[0]).toMatchObject({ kind: 'serviço', label: '3corações', current: true });
    expect(find('React').current).toBe(true);
    expect(find('C#').evidence[0]).toMatchObject({ kind: 'projeto' });
    expect(find('Python').evidence[0]!.kind).toBe('currículo');
  });
});

describe('seções e log de boot', () => {
  it('têm termo temático e termo comum, ids únicos', () => {
    expect(new Set(SECTIONS.map((s) => s.id)).size).toBe(SECTIONS.length);
    for (const s of SECTIONS) expect(s.plain.length).toBeGreaterThan(3);
  });
  it('o log só contém dados reais do perfil', () => {
    const lines = bootLines(new Date(2026, 10, 13));
    expect(lines).toHaveLength(6);
    expect(lines.join(' ')).toContain(profile.base.city);
    expect(lines.join(' ')).toContain(profile.handle);
    expect(lines[5]).toBe('> alvo travado.');
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
  it('ids únicos, coordenadas válidas e lição preenchida', () => {
    expect(new Set(projects.map((p) => p.id)).size).toBe(projects.length);
    expect(new Set(experiences.map((e) => e.id)).size).toBe(experiences.length);
    for (const p of projects) {
      expect(['em andamento', 'concluído']).toContain(p.status);
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
