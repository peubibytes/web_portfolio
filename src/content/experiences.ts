import type { Experience } from './types';

// TODO(conteúdo): exemplos. Resultados com números reais, verbos no passado, sem jargão de RH.
export const experiences: Experience[] = [
  {
    id: 'empresa-a',
    role: 'Engenheiro front-end sênior',
    company: 'Empresa A',
    period: { start: '2023-02', end: 'present' },
    scope: 8,
    highlights: [
      'Reescrevi o checkout: LCP de 2,7 s para 1,4 s e 37% menos abandono no mobile.',
      'Montei o design system que hoje 6 times usam — e o guia de quando não usá-lo.',
    ],
    stack: ['React', 'TypeScript', 'Next.js'],
  },
  {
    id: 'empresa-b',
    role: 'Engenheiro front-end',
    company: 'Empresa B',
    period: { start: '2021-04', end: '2023-01' },
    scope: 5,
    highlights: [
      'Construí o painel de operações em tempo real (≈ 48 mil eventos/min via WebSocket).',
      'Levei a cobertura de testes de 18% para 74% sem congelar entregas.',
    ],
    stack: ['React', 'Redux', 'Jest'],
  },
  {
    id: 'empresa-c',
    role: 'Desenvolvedor júnior',
    company: 'Empresa C',
    period: { start: '2019-03', end: '2021-03' },
    scope: 2,
    highlights: ['Migrei 140 telas de jQuery para React, uma por vez, sem big bang.'],
    stack: ['JavaScript', 'React', 'Sass'],
  },
];
