export const SECTIONS = [
  { id: 'inicio', numeral: '00', nav: 'Conexão', term: 'Conexão', plain: 'apresentação' },
  { id: 'sobre', numeral: '01', nav: 'Perfil', term: 'Perfil', plain: 'quem sou eu' },
  { id: 'habilidades', numeral: '02', nav: 'Habilidades', term: 'Habilidades', plain: 'tecnologias' },
  { id: 'experiencias', numeral: '03', nav: 'Registro', term: 'Registro de serviços', plain: 'experiência profissional, de 2024 até hoje' },
  { id: 'projetos', numeral: '04', nav: 'Projetos', term: 'Projetos', plain: 'projetos no GitHub' },
  { id: 'contato', numeral: '05', nav: 'Canal', term: 'Canal aberto', plain: 'contato' },
] as const;

export type SectionId = (typeof SECTIONS)[number]['id'];

export const section = (id: SectionId) => SECTIONS.find((s) => s.id === id)!;
