# Placa — portfólio

> **Tese:** eu sou um objeto catalogado num levantamento do céu. O site é uma placa
> fotográfica de observatório, digitalizada, com as anotações a lápis de quem a estudou.
> O "cyberpunk" é a luz de sódio da cidade vazando para dentro da placa.

Toda decisão de design passa por essa frase. Se um elemento não cabe nela, ele sai.

React 19 + TypeScript + Vite + Tailwind v4 + Motion.

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

- `profile.ts` — nome, bio, coordenadas da sua cidade, notas de margem, links
- `experiences.ts` — experiências; `scope` (1–10) é a altura do ponto na curva de luz
- `projects.ts` — projetos; `ra`/`dec` posicionam o objeto na carta, `magnitude` define o tamanho

Troque `public/avatar.svg` pela sua foto (de preferência um JPG com bom contraste:
o retrato é convertido em pontos, então luz lateral funciona muito bem).
Capas em `public/projects/`. Atualize as meta tags em `index.html`, `robots.txt`, `sitemap.xml`,
e adicione `public/og.png` (1200×630) e `public/cv.pdf`.

## Sistema de design

**Vocabulário (um só):** astronomia observacional — objeto, placa, exposição, ficha,
curva de luz, carta, catálogo, anotação. Sempre acompanhado do termo comum
("Curva de luz — experiência"), para nunca atrapalhar a leitura.

**Cor:** placa (prata envelhecida), tinta, e **um** acento — laranja sódio.
O sódio marca só anotações e interação, nunca decoração. Nada brilha (sem glow).

**Tipografia:**
- *Unbounded* (leve) — nomes e títulos
- *Newsreader* — texto corrido, tom de publicação científica
- *Fragment Mono* — só dados reais (coordenadas, datas, códigos de catálogo)
- *Reenie Beanie* — anotações a lápis, sempre curtas

**Movimento — só três tipos** (`src/lib/motion.ts`):
1. **Exposição** — aparecer por acúmulo, em degraus (`steps`)
2. **Traço** — linhas desenhadas como lápis (`pathLength`)
3. **Apontamento** — deslocamento mecânico de telescópio (acelera, trava)

**Interação marca:** o retrato em exposição longa (`ExposurePortrait`) — começa como ruído,
acumula luz em 1,6 s e o cursor aumenta a resolução onde passa. Sem WebGL ou com
`prefers-reduced-motion`, vira uma imagem pontilhada estática.

## Checklist anti-slop (aplicar a todo elemento novo)

1. Isso existiria igual em outro portfólio?
2. Consigo explicar em uma frase por que está aqui, ligado à tese?
3. Se eu remover, alguém sente falta?
4. Todo microtexto contém **informação real** (data, local, código)? Se não, sai.
5. Mais de três tipos de animação? Corte um.

## Acessibilidade e performance

- Contraste AA: texto de anotação usa `sodium-ink` (#9e300a), não o sódio puro.
- `prefers-reduced-motion`: sem exposição animada, sem traços; tudo aparece direto.
- Painel de projeto com foco preso, ESC, e link direto `#projeto-<id>`.
- Sem bibliotecas 3D: o retrato é um shader WebGL de ~80 linhas.
