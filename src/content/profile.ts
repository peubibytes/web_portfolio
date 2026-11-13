import type { Profile } from './types';

/*
 * TODO(conteúdo): o texto abaixo é um EXEMPLO de tom — direto, primeira pessoa,
 * com detalhes concretos. Substitua por fatos seus. Regras:
 *  - nada de "apaixonado por", "transformo", "soluções inovadoras"
 *  - números reais (irregulares), não redondos
 *  - uma opinião ou uma história, não uma lista de adjetivos
 */
export const profile: Profile = {
  name: 'Seu Nome',
  handle: 'seunome',
  role: 'Engenheiro de software',
  tagline: 'Faço interfaces web que carregam antes de você perder a paciência — e explico o porquê em português claro.',
  bio: [
    'Escrevo front-end há sete anos, quase sempre no lugar onde o produto fica lento, confuso ou as duas coisas.',
    'Meu trabalho favorito até hoje foi apagar 41 mil linhas de um checkout que ninguém tinha coragem de mexer. O novo tem 6 mil, carrega em 1,4 s e não teve um incidente em 11 meses.',
    'Fora do editor, fotografo o céu com uma câmera emprestada e um tripé torto — daí o tema deste site.',
  ],
  marginNotes: ['leia o 2º parágrafo', 'sim, 41 mil linhas', 'tripé ainda torto'],
  photo: { src: '/avatar.svg', alt: 'Retrato de Seu Nome' },
  base: { city: 'São Paulo', lat: -23.5505, lon: -46.6333, utcOffset: 'UTC−3' },
  observedSince: 2019,
  languages: ['Português (nativo)', 'Inglês (trabalho diário)'],
  instruments: ['TypeScript', 'React', 'Node.js', 'WebGL', 'PostgreSQL'],
  openTo: 'Vagas sênior de front-end e projetos de performance',
  links: [
    { label: 'Email', href: 'mailto:voce@exemplo.com', kind: 'email' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/seunome', kind: 'linkedin' },
    { label: 'GitHub', href: 'https://github.com/seunome', kind: 'github' },
    { label: 'Currículo (PDF)', href: '/cv.pdf', kind: 'cv' },
  ],
};
