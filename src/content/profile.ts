import type { Profile } from './types';

export const profile: Profile = {
  name: 'Pedro Barretto',
  handle: 'barretto',
  role: 'Estudante de Engenharia da Computação',
  tagline:
    'Construo sistemas, aplicações web e modelos de dados com Python, C#, Java e JavaScript — hoje, no e-commerce da 3corações.',
  bio: [
    'Estudo Engenharia da Computação na Unifor (2025–2029) e estagio em TI no e-commerce da 3corações, no time de Sistemas Especialistas.',
    'No estágio cuido da plataforma VTEX — catálogo, preços e configurações da loja —, atendo chamados do diagnóstico à resolução e desenvolvo funcionalidades com JavaScript, TypeScript, React e Next.js.',
    'Antes da TI, trabalhei com atendimento ao público em ambientes de alto volume. Foi ali que aprendi a resolver problema sob pressão e a pensar primeiro em quem está do outro lado do balcão — ou da tela.',
  ],
  marginNotes: ['Unifor, turma de 2029', 'VTEX + React + Next.js', 'o usuário vem primeiro'],
  photo: { src: '/avatar.svg', alt: 'Retrato de Pedro Barretto' },
  base: { city: 'Fortaleza', lat: -3.7319, lon: -38.5267, utcOffset: 'UTC−3' },
  observedSince: 2025,
  languages: ['Português (nativo)', 'Inglês (avançado)'],
  instruments: ['Python', 'C#', 'Java', 'C', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'VTEX', 'Unity', 'Git'],
  openTo: 'Oportunidades em Desenvolvimento de Software, Automação ou Dados',
  links: [
    { label: 'Email', href: 'mailto:pv.barretto07@gmail.com', kind: 'email' },
    { label: 'GitHub', href: 'https://github.com/peubibytes', kind: 'github' },
    { label: 'Currículo (PDF)', href: '/cv.pdf', kind: 'cv' },
  ],
};
