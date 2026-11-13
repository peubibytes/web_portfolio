import type { Experience } from '../../content/types';
import { toYear } from '../../lib/period';

export interface Observation {
  id: string;
  year: number;
  value: number;
  err: number;
}

export interface CurveModel {
  minYear: number;
  maxYear: number;
  observations: Observation[];
  /** pontos da curva ajustada (ano, escopo) em ordem cronológica */
  fit: [number, number][];
  jobs: { id: string; code: string; start: number; end: number; scope: number }[];
}

function rng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/**
 * Converte experiências numa "curva de luz": medições trimestrais com ruído
 * determinístico em torno do escopo de cada período, e uma curva ajustada.
 */
export function buildCurve(experiences: Experience[], now = new Date()): CurveModel {
  const jobs = [...experiences]
    .map((e) => ({ id: e.id, start: toYear(e.period.start, now), end: toYear(e.period.end, now), scope: e.scope }))
    .sort((a, b) => a.start - b.start)
    .map((j, i) => ({ ...j, code: `E${i + 1}` }));

  const minYear = Math.floor(jobs[0]?.start ?? now.getFullYear());
  const maxYear = Math.ceil(jobs.reduce((m, j) => Math.max(m, j.end), minYear + 1));

  const r = rng(42);
  const observations: Observation[] = [];
  for (const j of jobs) {
    for (let y = j.start + 0.08; y < j.end; y += 0.25) {
      observations.push({ id: j.id, year: y, value: j.scope + (r() - 0.5) * 0.9, err: 0.2 + r() * 0.35 });
    }
  }

  const fit: [number, number][] = [];
  for (const j of jobs) {
    fit.push([j.start, j.scope], [j.end, j.scope]);
  }

  return { minYear, maxYear, observations, fit, jobs };
}
