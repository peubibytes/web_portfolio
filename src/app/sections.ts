export const SECTIONS = [
  { id: 'inicio', numeral: '0', nav: 'Início', term: 'Objeto', plain: 'apresentação' },
  { id: 'sobre', numeral: 'I', nav: 'Sobre', term: 'Ficha do objeto', plain: 'quem sou eu' },
  { id: 'experiencias', numeral: 'II', nav: 'Experiência', term: 'Curva de luz', plain: 'experiência profissional, de 2019 até hoje' },
  { id: 'projetos', numeral: 'III', nav: 'Projetos', term: 'Carta de objetos', plain: 'projetos selecionados' },
  { id: 'contato', numeral: 'IV', nav: 'Contato', term: 'Proposta de observação', plain: 'contato' },
] as const;

export type SectionId = (typeof SECTIONS)[number]['id'];

export const section = (id: SectionId) => SECTIONS.find((s) => s.id === id)!;
