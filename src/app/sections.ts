export const SECTIONS = [
  { id: 'inicio', numeral: '00', nav: 'Conexão', term: 'Conexão', plain: 'apresentação' },
  { id: 'sobre', numeral: '01', nav: 'Varredura', term: 'Varredura', plain: 'quem sou eu' },
  { id: 'implantes', numeral: '02', nav: 'Implantes', term: 'Implantes', plain: 'tecnologias' },
  { id: 'experiencias', numeral: '03', nav: 'Registro', term: 'Registro de serviços', plain: 'experiência profissional, de 2024 até hoje' },
  { id: 'projetos', numeral: '04', nav: 'Arquivos', term: 'Arquivos extraídos', plain: 'projetos selecionados' },
  { id: 'contato', numeral: '05', nav: 'Canal', term: 'Canal aberto', plain: 'contato' },
] as const;

export type SectionId = (typeof SECTIONS)[number]['id'];

export const section = (id: SectionId) => SECTIONS.find((s) => s.id === id)!;
export const layerOf = (id: SectionId) => SECTIONS.findIndex((s) => s.id === id);
export const LAYERS = SECTIONS.length - 1;
