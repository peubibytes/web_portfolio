export interface Profile {
  name: string;
  handle: string;
  role: string;
  /** Uma frase que só você poderia dizer. */
  tagline: string;
  /** Primeiro parágrafo é o destaque (maior). */
  bio: string[];
  photo: { src: string; alt: string };
  base: { city: string };
  /** Formação, em uma linha. */
  education: string;
  languages: string[];
  instruments: string[];
  /** O que faz hoje no trabalho atual, uma frente por item. */
  focus: string[];
  links: { label: string; href: string; kind: 'email' | 'linkedin' | 'github' | 'cv' | 'other' }[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  /** 'YYYY' ou 'YYYY-MM' */
  period: { start: string; end: string | 'present' };
  highlights: string[];
  stack: string[];
}

export interface Project {
  id: string;
  title: string;
  year: number;
  /** Onde o projeto vive: repositório no GitHub ou experiência no Roblox. */
  source: 'github' | 'roblox';
  summary: string;
  problem: string;
  solution: string;
  result: string;
  /** O que deu errado ou o que você faria diferente. Honestidade vende. */
  lesson?: string;
  stack: string[];
  cover: { src: string; alt: string };
  /** repo: GitHub · demo: experiência no Roblox (ou outra demonstração). */
  links: { demo?: string; repo?: string };
}
