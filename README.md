# Sonda — portfólio

> **Tese:** você está levantando a ficha de Pedro, e ele quer ser encontrado: toda trava que você rompe já estava aberta.
> O visitante é o operador de uma Sonda; o site é a ficha que ela vai abrindo, camada por camada.
> O tema nunca esconde a informação: nome, papel e contato estão na tela desde o primeiro frame.

Toda decisão de design passa por essa frase. Se um elemento não cabe nela, ele sai.
O plano completo (decisões, contrastes medidos, catálogo de motion, riscos) está em [`docs/plano-netrunner.md`](docs/plano-netrunner.md).

React 19 + TypeScript + Vite + Tailwind v4 + Motion (LazyMotion).

## Rodar

```bash
npm install
npm run dev
```

| Script | O que faz |
|---|---|
| `npm run dev` | servidor local |
| `npm run build` | typecheck + build de produção |
| `npm test` | testes (Vitest + Testing Library) |
| `npm run lint` | ESLint |

## Onde editar o conteúdo

Todo o texto fica em `src/content/` (nenhum componente precisa mudar):

- `profile.ts` — nome, bio, cidade, formação, tecnologias, links
- `experiences.ts` — experiências (o item com `end: 'present'` vira "Atual")
- `projects.ts` — projetos (`source`: `github` com `links.repo`, ou `roblox` com `links.demo`)

As **habilidades** (stack) não têm arquivo próprio: `lib/skills.ts` cruza `profile.instruments`
com as `experiences` e os `projects` e mostra onde cada tecnologia aparece.
Sem porcentagens: a evidência vem do currículo.

Troque `public/avatar.svg` por uma foto (de preferência com bom contraste). Adicione `public/cv.pdf`
e `public/og.png` (1200×630) e atualize as meta tags em `index.html`, `robots.txt` e `sitemap.xml`.

## Sistema de design

**Vocabulário:** seções em linguagem comum (Perfil, Habilidades, Projetos), com Conexão, Registro e Canal
como nomes de apoio. Termos e marcas da franquia que inspirou o clima não são usados.

**Cor** (tokens em `src/styles/globals.css`, contraste AA verificado): `void`/`panel`/`raised` de fundo,
e três acentos com um papel cada — `signal` (amarelo) = destaque e CTA, `data` (ciano) = interação,
`breach` (magenta) = quebras e erros. Nada brilha: cor chapada, contorno duro.

**Tipografia:** Big Shoulders (títulos) · Archivo (texto) · Martian Mono (dados). Todas OFL, Google Fonts.

**Movimento — só quatro verbos** (`src/lib/motion.ts`, `src/lib/decode.ts`):
1. **Decodificar** — texto passa de ruído ao valor real, em degraus
2. **Travar** — brackets convergem no alvo (mira, módulos, cartões)
3. **Romper** — o título entra em fatias deslocadas, split RGB de 2 frames, no máx. 1 por segundo
4. **Varrer** — a mira que acompanha o cursor

Sem `prefers-reduced-motion` ou com o toggle "Mov · off", nenhum desses roda e a página já nasce no estado final.

## Acessibilidade e performance

- Texto decodificado: o leitor de tela recebe só o valor real; o ruído é `aria-hidden`.
- Painel de projeto com foco preso, ESC e link direto `#projeto-<id>`.
- Sem WebGL. O retrato é uma imagem com halftone em CSS.
- Mira (cursor) só com ponteiro fino e movimento ligado; o cursor nativo permanece.
