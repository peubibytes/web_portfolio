import type { Project } from './types';

export const projects: Project[] = [
  {
    id: 'jogo-unity',
    title: 'Jogo 2D em Unity',
    year: 2026,
    summary: 'Projeto acadêmico de desenvolvimento de jogo 2D com C# e Unity (abril/2026 – atual).',
    problem: 'Construir um jogo 2D do zero, em equipe, com mecânicas próprias e boa performance.',
    solution:
      'Mecânicas e lógica em C# — algoritmos de movimentação, colisão e gerenciamento de estados —, sistemas de UI e integração de assets audiovisuais.',
    result:
      'Projeto em andamento, versionado com Git em trabalho colaborativo, com depuração e otimização de desempenho no ambiente 2D.',
    stack: ['C#', 'Unity', 'Git'],
    cover: { src: '/projects/jogo-unity.svg', alt: 'Ilustração de uma fase de jogo de plataforma 2D' },
    links: {},
    ra: 19.4,
    dec: 28,
    magnitude: 1,
  },
  {
    id: 'analise-dados',
    title: 'Análise estatística de dados',
    year: 2026,
    summary: 'Projeto acadêmico de análise de dados e modelagem estatística (jan – jul/2026).',
    problem: 'Extrair insights acionáveis de bases de dados complexas, ligadas a problemas de impacto real.',
    solution:
      'Tratamento e limpeza das bases no LibreOffice Calc; estatística descritiva e inferencial (testes de hipótese, ANOVA, correlação), regressão linear e séries temporais.',
    result:
      'Dashboards dinâmicos e relatórios técnicos com os indicadores-chave, traduzindo os números em recomendações para problemas operacionais.',
    stack: ['LibreOffice Calc', 'Estatística', 'Regressão', 'Séries temporais'],
    cover: { src: '/projects/analise-dados.svg', alt: 'Gráfico de linha e barras de uma análise estatística' },
    links: {},
    ra: 13.2,
    dec: -18,
    magnitude: 2,
  },
  {
    id: 'dashboard-web',
    title: 'Landing page + dashboard',
    year: 2026,
    summary: 'Aplicação web que apresenta os resultados do projeto de análise estatística (jan – jul/2026).',
    problem: 'Mostrar resultados estatísticos complexos de um jeito claro para quem não é da área.',
    solution:
      'Landing page de apresentação integrada a um dashboard interativo, feita com HTML, CSS e JavaScript, com a arquitetura da informação pensada para uma navegação fluida.',
    result: 'Interface responsiva que conecta o raciocínio quantitativo a uma experiência de uso acessível.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    cover: { src: '/projects/dashboard-web.svg', alt: 'Esboço de uma página com painel de indicadores' },
    links: {},
    ra: 7.6,
    dec: 34,
    magnitude: 3,
  },
];
