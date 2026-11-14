import type { Project } from './types';

export const projects: Project[] = [
  {
    id: 'acompanhamento-diario',
    title: 'Acompanhamento diário',
    year: 2026,
    source: 'github',
    summary: 'Gestor de tempo e atividades para colaboradores, com apontamento de horas e relatório para a daily. Roda na própria máquina, sem login e sem nuvem.',
    problem:
      'Registrar as demandas do dia (chamados, reuniões, treinamentos, atividades e ciclos) e as horas gastas em cada uma, em um só lugar.',
    solution:
      'Aplicação React com API Node e banco SQLite, rodando local. As regras de negócio ficam em um pacote TypeScript compartilhado e testado; o banco tem backup diário automático e o CI roda uma verificação contra vazamento de dados reais.',
    result:
      'Apontamento de horas, linha do tempo dos ciclos, painel com rendimento e relatório para a daily ou o 1:1, com exportação e importação dos dados.',
    stack: ['React', 'Node.js', 'SQLite', 'TypeScript', 'Tailwind'],
    cover: { src: '/projects/acompanhamento-diario.svg', alt: 'Ilustração de uma linha do tempo com blocos de horas' },
    links: { repo: 'https://github.com/peubibytes/acompanhamento_diario' },
  },
  {
    id: 'banking-dashboard',
    title: 'Dashboard de extrato bancário',
    year: 2026,
    source: 'github',
    summary: 'Dashboard que lê extratos em CSV e mostra balanço, gastos por categoria e metas mensais, com os dados cifrados e só na máquina.',
    problem: 'Entender para onde o dinheiro vai a partir do CSV do extrato, sem enviar dados pessoais para fora da máquina.',
    solution:
      'Front-end React com API Fastify e SQLite nativo do Node. A leitura e o resumo do extrato ficam em um pacote TypeScript puro, testado com Vitest; os dados pessoais são gravados com AES-256-GCM e a API só escuta em 127.0.0.1. O projeto partiu de um script Python.',
    result:
      'Balanço, saldo diário, entradas e saídas por mês e gastos por categoria contra a meta mensal, mais uma tabela de lançamentos com busca e filtros e categorização automática por termos.',
    stack: ['React', 'Node.js', 'Fastify', 'SQLite', 'TypeScript'],
    cover: { src: '/projects/banking-dashboard.svg', alt: 'Ilustração de um gráfico de barras com uma linha de tendência' },
    links: { repo: 'https://github.com/peubibytes/banking_dashboard' },
  },
];
