import type { Experience } from './types';

export const experiences: Experience[] = [
  {
    id: '3coracoes',
    role: 'Estagiário de E-commerce (TI)',
    company: '3corações · Sistemas Especialistas',
    period: { start: '2026-09', end: 'present' },
    scope: 7,
    highlights: [
      'Atendo chamados de usuários internos, do diagnóstico à resolução de incidentes e demandas da plataforma de e-commerce.',
      'Faço cadastros, parametrizações e manutenção na VTEX: catálogo, produtos, preços e configurações da loja.',
      'Dou suporte, manutenção e parametrização a sistemas internos e de terceiros integrados ao e-commerce.',
      'Desenvolvo e ajusto funcionalidades com JavaScript, TypeScript, React, Next.js, HTML e CSS.',
      'Acompanho testes individuais e integrados e participo da implantação de novos sistemas.',
      'Trato e analiso dados para encontrar oportunidades de melhoria na operação digital.',
    ],
    stack: ['VTEX', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'HTML', 'CSS'],
  },
  {
    id: 'portal-tabacaria',
    role: 'Atendente',
    company: 'Portal Tabacaria',
    period: { start: '2025-02', end: '2025-12' },
    scope: 3,
    highlights: [
      'Atendimento focado na experiência do cliente, identificando e resolvendo necessidades específicas com agilidade.',
      'Gestão de fluxo de caixa e processamento de transações financeiras com rigor de precisão.',
      'Organização e controle de estoque com métodos sistemáticos de reposição.',
    ],
    stack: ['Atendimento', 'Caixa', 'Estoque'],
  },
  {
    id: 'mcdonalds',
    role: 'Atendente',
    company: "McDonald's",
    period: { start: '2024-01', end: '2024-04' },
    scope: 2,
    highlights: [
      'Atendimento direto ao público em ambiente de alto volume, com comunicação assertiva e resolução ágil de conflitos.',
      'Trabalho em equipe sob alta pressão, seguindo protocolos e padrões de qualidade internacionais.',
      'Operação de sistemas de PDV e apoio na organização de estoque.',
    ],
    stack: ['Atendimento', 'PDV', 'Trabalho em equipe'],
  },
];
