import { bayer8, ditherCells, plateMask } from '../lib/dither';
import { catalogCode, formatDec, formatLat, formatLon, formatRA } from '../lib/coords';
import { formatMonth, toYear } from '../lib/period';
import { sketchEllipse } from '../lib/sketch';
import { buildMailto } from '../features/contact/mailto';
import { buildCurve } from '../features/experience/lightCurve';
import { chartX, chartY } from '../features/projects/StarChart';
import { projects } from '../content/projects';
import { experiences } from '../content/experiences';
import { profile } from '../content/profile';

describe('dither', () => {
  it('bayer8 cobre os 64 limiares distintos em [0,1)', () => {
    const values = new Set<number>();
    for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) values.add(bayer8(x, y));
    expect(values.size).toBe(64);
    for (const v of values) {
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });
  it('preto vira tinta no centro, branco nunca, borda da placa nunca', () => {
    const n = 16;
    expect(ditherCells(new Float32Array(n * n).fill(0), n, n)[8 * n + 8]).toBe(true);
    expect(ditherCells(new Float32Array(n * n).fill(1), n, n).some(Boolean)).toBe(false);
    expect(plateMask(0, 0)).toBe(0);
    expect(plateMask(0.5, 0.5)).toBe(1);
  });
});

describe('coordenadas', () => {
  it('formata lat/lon de São Paulo', () => {
    expect(formatLat(-23.5505)).toBe('23°33′S');
    expect(formatLon(-46.6333)).toBe('46°38′O');
  });
  it('formata AR, Dec e códigos de catálogo', () => {
    expect(formatRA(19.4)).toBe('19h 24m');
    expect(formatRA(23.999)).toBe('00h 00m');
    expect(formatDec(-18)).toBe('−18°');
    expect(formatDec(5)).toBe('+05°');
    expect(catalogCode('P', 0)).toBe('P-01');
  });
  it('AR cresce para a esquerda na carta', () => {
    expect(chartX(2)).toBeGreaterThan(chartX(20));
    expect(chartY(60)).toBe(0);
    expect(chartY(-60)).toBe(100);
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

describe('curva de luz', () => {
  it('ordena por data e gera medições dentro de cada período', () => {
    const m = buildCurve(experiences, new Date(2026, 10, 1));
    expect(m.jobs.map((j) => j.code)).toEqual(['E1', 'E2', 'E3']);
    expect(m.jobs[0]!.start).toBeLessThan(m.jobs[2]!.start);
    for (const o of m.observations) {
      const job = m.jobs.find((j) => j.id === o.id)!;
      expect(o.year).toBeGreaterThanOrEqual(job.start);
      expect(o.year).toBeLessThan(job.end);
    }
    // determinístico: mesmo resultado em toda renderização
    expect(buildCurve(experiences, new Date(2026, 10, 1)).observations).toEqual(m.observations);
  });
});

describe('traço a lápis', () => {
  it('é determinístico pela semente', () => {
    expect(sketchEllipse(50, 50, 40, 40, 7)).toBe(sketchEllipse(50, 50, 40, 40, 7));
    expect(sketchEllipse(50, 50, 40, 40, 7)).not.toBe(sketchEllipse(50, 50, 40, 40, 8));
  });
});

describe('mailto', () => {
  it('monta assunto e corpo codificados', () => {
    const url = buildMailto('mailto:a@b.co', { name: 'Ana', subject: '', message: 'Olá & tchau' });
    expect(url.startsWith('mailto:a@b.co?subject=Proposta%20de%20observa%C3%A7%C3%A3o')).toBe(true);
    expect(decodeURIComponent(url.split('body=')[1]!)).toBe('Olá & tchau\n\n— Ana');
  });
});

describe('conteúdo', () => {
  it('ids únicos, coordenadas válidas e lição preenchida', () => {
    expect(new Set(projects.map((p) => p.id)).size).toBe(projects.length);
    expect(new Set(experiences.map((e) => e.id)).size).toBe(experiences.length);
    for (const p of projects) {
      expect(p.ra).toBeGreaterThanOrEqual(0);
      expect(p.ra).toBeLessThan(24);
      expect(Math.abs(p.dec)).toBeLessThanOrEqual(55);
      if (p.lesson !== undefined) expect(p.lesson.length).toBeGreaterThan(20);
    }
    for (const e of experiences) {
      expect(e.scope).toBeGreaterThanOrEqual(1);
      expect(e.scope).toBeLessThanOrEqual(10);
    }
  });
  it('texto livre de clichês', () => {
    const all = JSON.stringify({ profile, experiences, projects }).toLowerCase();
    for (const banned of ['apaixonado', 'transformo', 'inovador', 'soluções inovadoras', 'cafés', 'sinergia']) {
      expect(all).not.toContain(banned);
    }
  });
});
