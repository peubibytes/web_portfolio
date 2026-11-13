export interface Profile {
  name: string;
  handle: string;
  role: string;
  /** Uma frase que só você poderia dizer. */
  tagline: string;
  /** Primeiro parágrafo é o destaque (maior). */
  bio: string[];
  /** Notas curtas a lápis na margem da ficha (máx. ~5 palavras cada). */
  marginNotes: string[];
  photo: { src: string; alt: string };
  base: { city: string; lat: number; lon: number; utcOffset: string };
  /** Ano em que começou a programar profissionalmente. */
  observedSince: number;
  languages: string[];
  instruments: string[];
  openTo: string;
  links: { label: string; href: string; kind: 'email' | 'linkedin' | 'github' | 'cv' | 'other' }[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  /** 'YYYY' ou 'YYYY-MM' */
  period: { start: string; end: string | 'present' };
  /** 1–10: tamanho do escopo/responsabilidade — vira a altura na curva de luz. */
  scope: number;
  highlights: string[];
  stack: string[];
}

export interface Project {
  id: string;
  title: string;
  year: number;
  summary: string;
  problem: string;
  solution: string;
  result: string;
  /** O que deu errado ou o que você faria diferente. Honestidade vende. */
  lesson?: string;
  stack: string[];
  cover: { src: string; alt: string };
  links: { demo?: string; repo?: string };
  /** Posição na carta. ra: 0–24 (horas), dec: −60 a +60 (graus). */
  ra: number;
  dec: number;
  /** 1 (mais brilhante / mais importante) a 5. */
  magnitude: 1 | 2 | 3 | 4 | 5;
}
