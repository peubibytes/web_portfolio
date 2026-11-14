export interface Profile {
  name: string;
  handle: string;
  role: string;
  /** Uma frase que só você poderia dizer. */
  tagline: string;
  /** Primeiro parágrafo é o destaque (maior). */
  bio: string[];
  /** Notas curtas do operador na ficha (máx. ~5 palavras cada). */
  marginNotes: string[];
  photo: { src: string; alt: string };
  base: { city: string; lat: number; lon: number; utcOffset: string; timeZone: string };
  /** Formação, em uma linha. */
  education: string;
  /** Ano em que começou a programar profissionalmente. */
  observedSince: number;
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
  /** Derivado do resumo de cada projeto. */
  status: 'em andamento' | 'concluído';
  summary: string;
  problem: string;
  solution: string;
  result: string;
  /** O que deu errado ou o que você faria diferente. Honestidade vende. */
  lesson?: string;
  stack: string[];
  cover: { src: string; alt: string };
  links: { demo?: string; repo?: string };
}
