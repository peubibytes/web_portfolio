# Plano de design — portfólio "Sonda"

> Redesign do portfólio de Pedro Barretto com estética inspirada em *Cyberpunk: Edgerunners*.
> Fase 1 (plano) e Fase 2 (protótipo). Nada em `src/`, `index.html` ou `public/` foi alterado.
> Protótipo (Fase 2, arquivo de design privado): https://claude.ai/artifact/ChFUDeGm8TiA2GzbfEWftQ — abas Capa · Design System · Telas · Motion.
> Itens que dependem de Pedro estão marcados com **[A VALIDAR]** e reunidos na seção 9.

---

## 1. Tese e narrativa

### A tese, em uma frase

> **Você está levantando a ficha de Pedro, e ele quer ser encontrado: toda trava que você rompe já estava aberta.**

É a mesma disciplina do "Placa": se um elemento não cabe nessa frase, ele sai. A frase resolve três coisas de uma vez:

1. **O tema serve à informação.** Um recrutador já faz um levantamento de ficha. O site só dá cara de deck a esse trabalho. Como o alvo coopera, nenhuma "camada de proteção" esconde conteúdo. A quebra é encenação, e a informação aparece desde o primeiro frame.
2. **Toda animação revela alguma coisa.** Decodificar, travar e romper existem para mostrar dado real. Movimento puramente decorativo não cabe na tese.
3. **Tom.** Nada de "ameaça", "alvo perigoso" ou "recompensa". O clima é de um operador competente fazendo um levantamento consentido, com um alvo que deixou a porta destrancada. É confiante sem ser hostil, o que é melhor para alguém procurando estágio ou emprego.

### Nome interno: "Sonda"

**Sonda** é o software do visitante: o deck com que ele perfila Pedro. Todo o vocabulário fica em português. Isso dá identidade própria e evita a gíria da franquia (ver seção 2.1).

### Narrativa, do primeiro frame ao contato

| t | O que o visitante vê | Informação real na tela |
|---|---|---|
| 0 ms | Tela preta com a barra da Sonda no topo e o nome **PEDRO BARRETTO** já desenhado (LCP). | nome, papel, botão de contato |
| 0–1,4 s | **Conexão.** O log de boot corre na lateral, a mira trava no nome, o bloco amarelo de identificação "carimba" e o retrato aparece por varredura de linhas. | base Fortaleza 3°44′S 38°32′O, UTC−3, hora local, fonte `github.com/peubibytes` |
| scroll | **Camada 1/5, Varredura.** A linha de scan desce uma vez pela ficha e os campos aparecem. | formação, base, idiomas, disponibilidade, bio |
| scroll | **Camada 2/5, Implantes.** Os módulos encaixam no rack, cada um com a **evidência** de onde foi usado. | stack, com o lugar onde cada item aparece no currículo |
| scroll | **Camada 3/5, Registro de serviços.** Log cronológico, com o serviço atual em destaque. | cargos, empresas, datas, atividades |
| scroll / clique | **Camada 4/5, Arquivos extraídos.** Três arquivos. Abrir um = descriptografar (hex → texto em 420 ms). | problema, solução, resultado e stack de cada projeto |
| scroll / clique | **Camada 5/5, Canal aberto.** Terminal de transmissão: escrever, transmitir e o app de email abre. | email, GitHub, currículo, prazo de resposta |
| fim | "Canal mantido aberto pelo alvo." Rodapé com a data de compilação. | © ano, data do build, código-fonte |

**Regra dos 10 segundos:** o primeiro viewport mostra nome, papel atual ("Estudante de Engenharia da Computação · Estagiário de E-commerce (TI) na 3corações"), a tagline e dois atalhos de contato (Abrir canal → `#contato`, email direto). Isso vale com a intro rodando, pulada ou sem animação nenhuma.

---

## 2. Mapa de seções → metáfora

Mantém o formato de `src/app/sections.ts` (`term` temático + `plain` comum, sempre exibidos juntos).

| # | id | Rótulo temático (`term`) | Rótulo simples (`plain`) | Metáfora | Mudança em relação ao briefing |
|---|---|---|---|---|---|
| 00 | `inicio` | **Conexão** | apresentação | Jack-in: a Sonda se conecta e trava no alvo | igual |
| 01 | `sobre` | **Varredura** | quem sou eu | Scan do alvo: ficha de identificação | igual |
| 02 | `implantes` | **Implantes** | tecnologias | Rack de módulos instalados, cada um com evidência de uso | "cyberware" vira "Implantes" (2.1) e a seção é nova no site |
| 03 | `experiencias` | **Registro de serviços** | experiência profissional, de 2024 até hoje | Log de contratos anteriores | igual. O `plain` atual diz "de 2019", o que está **errado** (ver 9) |
| 04 | `projetos` | **Arquivos extraídos** | projetos selecionados | Abrir arquivo = descriptografar | igual |
| 05 | `contato` | **Canal aberto** | contato | Compor e transmitir uma mensagem | igual |

**Camadas.** As seções 01–05 são as "camadas" da ficha. O indicador `CAMADA 3/5` acompanha o scroll. É **progresso, não portão**: nada fica trancado.

**Onde eu contesto o briefing:**

- **"Nível de ameaça": proponho não usar.** Seria um número inventado, e "ameaça" é a palavra errada para quem está sendo contratado. No lugar entra um campo **STATUS** que já existe nos dados: `openTo` ("Oportunidades em Desenvolvimento de Software, Automação ou Dados"). Se Pedro quiser um campo de tom mais lúdico, a sugestão é `sinal: 'aberto a contato'`, que é verdadeiro. **[A VALIDAR]**
- **Barras de proficiência (ex.: "React 80%"): proponho não usar.** São números inventados e são o clichê número 1 de template de portfólio. No lugar entra a **evidência derivada**: "React · em uso em 1 serviço (3corações)". O dado é real, calculado de `experiences` e `projects`, e não precisa de campo novo.
- **Silhueta de corpo com slots de implante: fica fora.** É exatamente o tipo de tela de inventário de cyberware que identifica o jogo. O rack de módulos é linguagem própria.

### Campos propostos (não existem hoje)

| Campo | Onde | Para quê | Status |
|---|---|---|---|
| `implantes` (`skills.ts`): agrupamento de `profile.instruments` em Linguagens / Web e plataformas / Ferramentas | `src/content` | rack em bancos | **[A VALIDAR]**: o agrupamento é meu. Existe um rascunho `skills.ts` num stash `redesign-hud`, com grupos e itens a mais ("Automação (IoT)", "Modelagem 3D"…) que **não** usei por não estar confirmado |
| `origem: 'formação'` para Python, Java e C | derivado | esses três não aparecem em nenhum serviço ou projeto. Sem esse campo, mostrariam "sem evidência" | **[A VALIDAR]**: confirmar que vieram do curso |
| `status` do projeto (`em andamento` / `concluído`) | `projects.ts` | selo no arquivo | derivável do `summary` ("atual" / "jan – jul/2026"). Confirmar |
| Prazo de resposta "até dois dias úteis" | `profile.ts` (hoje está fixo em `Contact.tsx`) | exibido no canal | **[A VALIDAR]**: confirmar o compromisso |

### 2.1 Nota de vocabulário e propriedade intelectual

Ficam **fora da UI:** "netrunner", "ICE", "chrome", "braindance", "fixer", "edgerunner", nomes de corporações, gangues e personagens. Esses termos ou são da franquia, ou estão fortemente ligados a ela. "Netrunner" é usado só como conceito neste documento. No site, o visitante é o **operador**, o software é a **Sonda** e o resto do vocabulário é: alvo, varredura, trava, camada, romper, implante, arquivo, canal, transmissão.

---

## 3. Arquitetura de informação e navegação

```
Barra da Sonda (fixa)
├─ marca PB · relógio Fortaleza · CAMADA n/5 · [movimento: on/off] · [ABRIR CANAL]
└─ <main>
   00 Conexão   — nome · papel · tagline · CTAs · retrato · log de boot
   01 Varredura — ficha (campos) · bio (3 parágrafos) · notas do operador (marginNotes)
   02 Implantes — 3 bancos de módulos · evidência por módulo
   03 Registro  — 3 serviços (atual expandido, anteriores recolhidos) 
   04 Arquivos  — 3 cartões de arquivo → painel descriptografado (#projeto-<id>)
   05 Canal     — links diretos · terminal de transmissão (mailto)
   rodapé       — © · data do build · código-fonte
```

### Desktop (≥ 1024 px)

- **Barra superior fixa, 56 px.** À esquerda, a marca. No centro, o índice de seções em dois níveis (`02 IMPLANTES` + "tecnologias" menor). À direita, o relógio, o toggle de movimento e o CTA amarelo **ABRIR CANAL** (contato a um clique de qualquer ponto).
- **Trilho lateral direito** com 5 marcas de camada. Herda o papel do `PlateScale`: mostra posição e é clicável.
- **Mira** (cursor) com `pointer: fine`. Trava em elementos `[data-scan]` e mostra a dica de scan.
- **Projetos:** o painel abre à direita (72 % da largura), com foco preso, ESC e `#projeto-<id>`. Mesma mecânica do `ProjectSheet` atual.

### Celular (390 px)

- **Barra superior, 48 px:** marca, `CAMADA n/5`, botão **ÍNDICE** (abre `MobileMenu`, diálogo em tela cheia com `term` + `plain` + `aria-current`).
- **CTA fixo inferior** "ABRIR CANAL" (44 px de altura, safe-area). Some quando a seção Contato está visível.
- **Sem mira de cursor.** No lugar dela, a **trava de centro**: o elemento `[data-scan]` que cruza o centro do viewport recebe os brackets. É a mesma assinatura, levada para o toque, e dispara uma vez por elemento.
- **Projetos:** o painel vira folha em tela cheia, deslizando de baixo.
- **Registro:** o serviço atual vem aberto e os outros abrem com toque ("ver registro completo · 3").

### Teclado e leitor de tela (as duas plataformas)

Link "Pular para o conteúdo" antes da barra. Ordem de foco = ordem visual. `h1` = nome. Cada seção é um `<section aria-labelledby>`, e o `h2` lê "Implantes — tecnologias". Elementos de HUD puramente decorativos levam `aria-hidden`. Hora e coordenadas ficam como texto real.

---

## 4. Design system

### 4.1 Princípios (as regras que tiram a cara de template)

1. **Nada brilha.** Sem glow, bloom ou neon borrado. Cor chapada, bordas duras, sombreamento em retícula (halftone), como na animação 2D que inspira o projeto. Isso, sozinho, já separa o site do template synthwave.
2. **Glitch é evento, não textura.** Aberração cromática e deslocamento de fatias só aparecem nas transições narrativas. Nunca em texto parado.
3. **Todo microtexto de HUD é dado real** (data, coordenada, contagem, hora). "SYS_OK 0x00FF" decorativo sai. É o item 4 do checklist do README atual, mantido.
4. **Cada cor tem um único papel** (abaixo). São três acentos, cada um com um significado só.
5. **Forma própria:** o **corte diagonal**. Painéis com chanfro de 45° em dois cantos opostos (sup-esq e inf-dir), nunca nos quatro.

### 4.2 Cor (contraste WCAG verificado; ver nota no fim)

| Token | Hex | Papel |
|---|---|---|
| `void` | `#0B0B0F` | fundo |
| `panel` | `#14141B` | painel |
| `raised` | `#1D1D27` | painel elevado, hover |
| `line` | `#34343F` | divisória decorativa (não é UI) |
| `edge` | `#6A6A7C` | borda de componente de UI (inputs, cartões focáveis) |
| `text` | `#EEEDE6` | texto principal |
| `text-2` | `#A9A8B6` | texto secundário |
| `text-3` | `#8A8998` | rótulos HUD, metadados |
| `signal` (amarelo) | `#F3E600` | **o alvo**: identidade de Pedro, CTA primário, bloco de nome. Texto *sobre* amarelo é sempre `void` |
| `data` (ciano) | `#38E1EC` | **interação**: links, foco, dica de scan, mira |
| `breach` (magenta) | `#FF3B6B` | **o operador**: transições de quebra, notas do operador, erro de formulário |

Contrastes medidos (relação WCAG 2.x):

| Par | `void` | `panel` | `raised` | Uso permitido |
|---|---|---|---|---|
| `text` | 16,74 | 15,62 | 14,23 | qualquer texto |
| `text-2` | 8,39 | 7,82 | 7,13 | qualquer texto |
| `text-3` | 5,72 | 5,34 | 4,86 | texto ≥ 12 px (AA normal ✔) |
| `signal` | 15,09 | 14,08 | 12,83 | qualquer texto |
| `data` | 12,30 | 11,48 | 10,46 | qualquer texto |
| `breach` | 5,70 | 5,32 | 4,84 | qualquer texto (AA ✔) |
| `edge` (UI) | 3,71 | 3,46 | 3,15 | bordas, ≥ 3:1 (1.4.11 ✔) |
| `void` sobre `signal` | 15,09 | — | — | texto no bloco amarelo |
| `line` | 1,60 | — | — | **só decoração**, nunca borda de controle |

Proibido: texto `text-2/3`, `data` ou `breach` sobre `signal`, porque nenhum passa de 3,2:1.

### 4.3 Tipografia (somente Google Fonts, OFL)

| Papel | Família | Pesos/eixos | Uso |
|---|---|---|---|
| Display | **Big Shoulders** (eixo `opsz` em 72) | 800–900 | nome, títulos de seção, números grandes. Condensada, industrial, legível em caixa alta |
| Texto | **Archivo** | 400, 500, 600 (wdth 100) | bio, atividades, corpo de projetos. Neutra e muito legível em fundo escuro |
| Dados / HUD | **Martian Mono** | 400, 500 (wdth 87,5) | rótulos, coordenadas, datas, códigos, hora |

Escala (desktop / mobile): Display XL 152/72 · Display L 72/44 · Display M 40/30 · Texto L 21/18 · Texto 17/16 · Mono 13/12 · Mono S 11/11 (mínimo absoluto). Altura de linha: display 0,88, texto 1,55, mono 1,4. Mono sempre em caixa alta com `letter-spacing: 0.06em`, salvo valores (emails, URLs).

### 4.4 Grid

- **Desktop 1440:** 12 colunas, margem 64, gutter 24, conteúdo máximo 1312. Baseline de 8 px.
- **Tablet 768:** 8 colunas, margem 32, gutter 20.
- **Mobile 390:** 4 colunas, margem 16, gutter 12.
- O HUD (barra, trilho) fica fora do grid de conteúdo e nunca cobre texto.

### 4.5 Iconografia

Conjunto próprio, grade de 16 px, traço de 1,5 px, terminais quadrados, curvas só em 45°/90°. Ícones: `alvo`, `camada`, `arquivo`, `trava-aberta`, `canal`, `relógio`, `base`, `idioma`, `externo`, `fechar`. **Marca:** monograma "PB" dentro de um colchete de mira com corte diagonal. Nenhum ícone imita o logo ou a UI da franquia.

### 4.6 Componentes de HUD e estados

| Componente | Anatomia | Estados |
|---|---|---|
| **Brackets de mira** | 4 cantos em L (12 px, traço 2 px) | `repouso` (afastados 8 px, `text-3`) · `travando` (convergem, `data`) · `travado` (encostados + rótulo) · `foco` (= travado + outline ciano) |
| **Painel** | fundo `panel`, borda `line`, corte diagonal 16 px, cabeçalho mono | `padrão` · `hover` (`raised`, corte vira `data`) · `ativo/aberto` (borda `signal`) · `rompendo` (fatias deslocadas, só durante a transição) |
| **Barra de progresso** | trilho `line` 4 px, preenchimento segmentado em blocos de 8 px | `0–100 %` · `concluído` (vira `signal`) · `indeterminado` (só no boot, ≤ 1,4 s) |
| **Tag** | mono S, borda 1 px, padding 4×8 | `neutra` (`text-2`/`edge`) · `evidência` (`data`) · `nota do operador` (`breach`) · `atual` (fundo `signal`, texto `void`) |
| **Dica de scan** | caixa mono, seta em ângulo, até 3 linhas de dado real | `oculta` · `entrando` (decodifica, 180 ms) · `visível` · com teclado: aparece no `:focus-visible` |
| **Botão primário** | bloco `signal`, texto `void` caixa alta, corte diagonal | `hover` (sombra deslocada de 4 px em `breach`, *sem* blur) · `foco` (outline `data` 2 px + offset 3) · `pressionado` (sombra 0) · `desabilitado` (`edge`, texto `text-3`) |
| **Botão secundário / link** | texto `data` sublinhado 1 px | `hover` (sublinhado engrossa para 2 px) · `foco` · `visitado` (igual: sem roxo) |
| **Campo de terminal** | prompt `>`, borda inferior `edge`, caret em bloco | `vazio` · `foco` (borda `data`, caret pisca 1 Hz) · `preenchido` · `erro` (borda + mensagem `breach`, `aria-invalid`) |
| **Indicador de camada** | `CAMADA 03/05` + 5 segmentos | segmento atual em `signal`, já vistos em `text-2`, futuros em `line` |

---

## 5. Sistema de motion

Assim como o "Placa" tinha só três tipos de movimento, aqui são **quatro verbos**. Um quinto não entra.

1. **DECODIFICAR:** texto passa de caracteres aleatórios ao valor real, em degraus.
2. **TRAVAR:** brackets convergem num elemento e ele "trava". Aceleração seca, sem mola elástica.
3. **ROMPER:** a seção entra com fatias horizontais deslocadas e um split RGB de 2 frames.
4. **VARRER:** uma linha de scan percorre uma área e revela o que está embaixo.

### Easings (tokens)

| Token | Curva | Sensação |
|---|---|---|
| `snap` | `cubic-bezier(0.2, 0, 0, 1)` | travamento seco (TRAVAR, painéis) |
| `slam` | `cubic-bezier(0.7, 0, 0.84, 0)` → `steps(1)` no final | carimbo (bloco amarelo) |
| `sweep` | `cubic-bezier(0.45, 0, 0.55, 1)` | varredura |
| `steps(n)` | `steps(8)` / `steps(12)` | decodificação, boot |

### Catálogo

**Narrativo (acontece uma vez só; `once: true`; no máximo uma vez por sessão para o boot)**

| ID | Animação | Verbo | Gatilho | Duração | Easing | Prioridade |
|---|---|---|---|---|---|---|
| N1 | Sequência de boot (log de 6 linhas + barra) | DECODIFICAR | load | 1 400 ms total (log 6×120 ms) | `steps(12)` | P0 |
| N2 | Trava no nome + carimbo do bloco amarelo | TRAVAR | load, t = 600 ms | 240 ms + 160 ms | `snap` / `slam` | P0 |
| N3 | Retrato por varredura de linhas (halftone) | VARRER | load, t = 400 ms | 900 ms | `sweep` | P1 |
| N4 | Título de seção decodifica | DECODIFICAR | scroll (entra 15 % no viewport) | 450 ms | `steps(8)` | P0 |
| N5 | Entrada de camada (fatias + split RGB) | ROMPER | scroll, 1º contato com a seção | 320 ms (split só nos frames 2–3) | `snap` | P1 |
| N6 | Scan da ficha (campos aparecem quando a linha passa) | VARRER | scroll, Varredura | 800 ms | `sweep` | P1 |
| N7 | Módulos encaixam no rack (stagger) | TRAVAR | scroll, Implantes | 40 ms × 11 + 200 ms | `snap` | P2 |
| N8 | Abrir arquivo: hex → texto + painel desliza | DECODIFICAR + TRAVAR | clique / Enter | 420 ms | `steps(10)` + `snap` | P0 |
| N9 | Transmitir: barra 0→100 % e o mailto abre | VARRER | submit | 600 ms | `steps(12)` | P2 |

**Ambiente (contínuo, sutil, sempre pausável)**

| ID | Animação | Gatilho | Duração | Implementação | Prioridade |
|---|---|---|---|---|---|
| A1 | Scanlines estáticas (2 px, 4 % de opacidade) | sempre | sem animação | CSS `repeating-linear-gradient` | P0 |
| A2 | Mira segue o cursor e trava em `[data-scan]` | pointermove | lag de 80 ms, trava em 180 ms | Motion `useSpring` (stiffness 600, damping 50) | P1 |
| A3 | Barra de scan lenta sobre o retrato | a cada 8 s | 1 200 ms | CSS keyframes, opacidade 0,12 | P2 |
| A4 | Relógio de Fortaleza na barra | 1 Hz | — | `setInterval` + `Intl.DateTimeFormat` | P1 |
| A5 | Caret do terminal piscando | foco no campo | 1 Hz (0,5 s on / 0,5 s off) | CSS `steps(1)` | P2 |

**Micro (hover/foco, ≤ 180 ms):** brackets de cartão se afastam 4 px (120 ms `snap`), botão primário ganha sombra deslocada (120 ms), link engrossa o sublinhado (80 ms).

### Segurança de flashes (WCAG 2.3.1)

- O split RGB do ROMPER dura **2 frames** e ocorre **uma vez** por seção. Não há variação de luminância de tela cheia: só as fatias se deslocam, e o fundo continua `void`.
- **Nenhuma alternância** acima de 1 Hz (caret e relógio). Nenhum "strobe".
- No máximo **um evento ROMPER por segundo**: se o visitante rolar rápido e passar por duas seções, a segunda entra só com DECODIFICAR.
- Área de qualquer mudança brusca < 25 % do viewport (bem abaixo do limite de 341×256 px por 10° de campo visual).

### `prefers-reduced-motion` (e o toggle manual)

A versão estática **não é a animada com animação desligada**. É uma ficha impressa, completa desde o primeiro frame:

- Sem boot. O log aparece como bloco de texto estático.
- DECODIFICAR → texto final direto. TRAVAR → brackets já travados. ROMPER → nada. VARRER → nada.
- Sem mira (cursor nativo), sem barra de scan, sem split RGB.
- Painel de projeto: aparece com fade de 120 ms, sem deslizar.
- **Toggle "MOVIMENTO on/off"** na barra, salvo em `localStorage`, para quem não conhece a configuração do sistema. Ele liga ou desliga o mesmo `MotionConfig reducedMotion`.

---

## 6. Acessibilidade e segurança

- **Pular a intro:** o botão "pular conexão [Esc]" aparece no frame 0, é o primeiro elemento focável e a tecla Esc também pula. O boot roda **uma vez por sessão** (`sessionStorage`). Nas visitas seguintes, o site abre no estado final.
- **A intro não bloqueia:** o conteúdo do hero está no DOM e visível desde o início. O boot é uma camada `aria-hidden` sobre ele, sem `pointer-events`.
- **Texto que decodifica:** o leitor de tela recebe **só o texto final** (`aria-label` / texto visualmente oculto). Os caracteres aleatórios ficam num `span aria-hidden`. O tamanho é reservado para evitar CLS.
- **Teclado:** todos os cartões de arquivo são `<button>`. O painel de projeto é `role="dialog"` com `aria-modal`, foco preso, ESC e retorno do foco (lógica atual do `ProjectSheet`, mantida). A dica de scan aparece também no `:focus-visible`. A mira nunca substitui o outline de foco.
- **Contraste:** tabela 4.2. Foco sempre em `data` (12:1 sobre `void`), 2 px, offset 3 px.
- **Sem WebGL:** o site não usa WebGL. O retrato em halftone é canvas 2D (reaproveita `lib/dither.ts`) e cai para `<img>` estático pré-gerado se o canvas falhar ou demorar.
- **Sem JS:** HTML semântico com todo o conteúdo (no build, renderizar o conteúdo estático é desejável, ver 8).
- **Idioma:** `lang="pt-BR"`, e termos em inglês (React, Next.js) ficam como estão.
- **Alvo de toque** ≥ 44×44 px no celular.

---

## 7. Performance

### Orçamentos

| Métrica | Meta | Como |
|---|---|---|
| LCP (4G, celular médio) | **≤ 1,8 s** | o LCP é o `h1` de texto: sem depender de imagem, fonte display com `preload` e `font-display: swap` |
| CLS | ≤ 0,02 | decodificação com largura reservada; retrato com `aspect-ratio` fixo |
| INP | ≤ 150 ms | mira em `requestAnimationFrame` + `transform`; nada de layout em `pointermove` |
| JS inicial (gzip) | **≤ 95 KB** | React + ReactDOM (~60 KB) + Motion via `LazyMotion` + `m` + `domAnimation` (~18 KB) + app (~15 KB) |
| CSS (gzip) | ≤ 14 KB | Tailwind v4 com purge |
| Fontes | ≤ 110 KB | 3 famílias, subset `latin`, só os pesos listados; Martian Mono com `wdth` fixo |
| Imagens | ≤ 120 KB | retrato em AVIF/WebP ~40 KB; capas de projeto SVG (já existem) |

### Onde cada coisa vive

| Camada | O quê |
|---|---|
| **CSS** | scanlines, corte diagonal (`clip-path`), estados de hover/foco, caret, barra de scan do retrato, ROMPER (fatias via `clip-path` + `translate` em 3 variáveis) |
| **Motion** | sequência de boot, stagger de módulos, painel de projeto (`AnimatePresence`), spring da mira, `whileInView` |
| **JS puro** | DECODIFICAR (função pura e determinística por semente, `rAF`, 8–12 degraus), relógio |
| **Canvas 2D** | retrato halftone (uma vez, depois vira bitmap estático) |
| **WebGL** | **nenhum.** O shader atual sai. Não há nada aqui que precise de GPU |

### Fallback para aparelhos fracos ("modo leve")

Ativado se `navigator.hardwareConcurrency ≤ 4`, `deviceMemory ≤ 4` ou `connection.saveData`: sem spring na mira (posição direta), sem canvas (usa `<img>` pré-gerado), sem barra de scan, sem ROMPER. DECODIFICAR e TRAVAR continuam, porque são baratos.

---

## 8. Plano técnico

### Reaproveitar

- `src/content/*`: os dados ficam iguais, só mudam os tipos (abaixo).
- `hooks/useReducedMotion`, `useMediaQuery`, `useActiveSection`.
- `features/projects/useProjectHash` (`#projeto-<id>`), a lógica de foco preso do `ProjectSheet`, `MobileMenu` (diálogo).
- `features/contact/mailto.ts`: só muda o assunto padrão para "Contato pelo portfólio" (o assunto temático no email do recrutador seria ruído).
- `lib/period.ts` (datas), `lib/coords.ts` (`formatLat`/`formatLon` para a base), `lib/dither.ts` (halftone do retrato).
- `MotionConfig reducedMotion="user"` em `App.tsx`.

### Sai

`components/plate/*`, `app/PlateScale.tsx`, `features/hero/ExposurePortrait.tsx` + `exposureShader.ts`, `features/projects/StarChart.tsx` + `Catalog.tsx`, `features/experience/lightCurve.ts`, `lib/sketch.ts`, `lib/coords.formatRA/formatDec/catalogCode`. As fontes Unbounded, Newsreader, Fragment Mono e Reenie Beanie também saem.

### Tipos

- `Project`: removem-se `ra`, `dec` e `magnitude`, e entra `status` (**[A VALIDAR]**).
- `Experience`: `scope` deixa de ser usado. Proponho remover, porque um número de autoavaliação não aparece na nova UI.
- `Profile`: `instruments` vira o insumo de `lib/implantes.ts`, e `marginNotes` vira "notas do operador". `responseTime` é novo (**[A VALIDAR]**).

### Novo

```
src/
  app/            App.tsx · SondaBar.tsx · LayerRail.tsx · MobileMenu.tsx · sections.ts
  components/hud/ Brackets · Panel · Tag · Progress · ScanTip · Reticle · DecodeText · Button
  features/
    boot/         Boot.tsx · bootLog.ts (linhas montadas a partir de profile)
    hero/  about/  implants/  experience/  projects/  contact/
  lib/            motion.ts (4 verbos + tokens) · decode.ts · implantes.ts · lite.ts
  styles/         globals.css (tokens da seção 4)
```

### Dependências novas

**Nenhuma** em runtime. Opcional: `@fontsource-variable/archivo`, `big-shoulders-display` e `martian-mono` para servir as fontes do próprio domínio (sem requisição a terceiros, melhor LCP). São as mesmas fontes OFL do Google Fonts. Decidir na Fase 3.

### Ordem das etapas (Fase 3)

1. Tokens + fontes + `globals.css`, tipos em `src/content`, `lib/decode.ts` e `lib/implantes.ts` com testes.
2. Componentes de HUD (estáticos, todos os estados).
3. Seções em versão **estática** (é exatamente a versão reduced-motion): Conexão → Canal.
4. Navegação: barra, trilho, `MobileMenu`, CTA fixo no celular.
5. Motion narrativo (N1–N9), depois ambiente (A1–A5), depois modo leve.
6. Acessibilidade (axe + teclado + VoiceOver/TalkBack) e orçamento (Lighthouse mobile).
7. `lint`, `typecheck`, `test`, `build` e demonstração no navegador.

### Testes

| Teste atual | Destino |
|---|---|
| `ProjectSheet` (diálogo, ESC, foco) | **mantido**, renomeado para `FilePanel`, mesmas asserções |
| `MobileMenu` (term/plain, `aria-current`, ESC) | **mantido**, com novo `term` ("Arquivos extraídos") |
| `Contact` (campos obrigatórios, botão) | **mantido**. O botão passa a dizer "Transmitir · escrever email": o texto visível contém o nome que o teste busca (`/Escrever email/i`), o que também atende a WCAG 2.5.3 |
| `dither` | mantido |
| `coordenadas` (RA/Dec, carta) | parte de lat/lon mantida, RA/Dec/`chartX` saem |
| `períodos`, `mailto`, `conteúdo/clichês` | mantidos (`mailto` com o novo assunto padrão) |
| `curva de luz`, `traço a lápis` | saem junto com o código |
| **novos** | `decode` (determinístico, termina no texto real, respeita espaços), `implantes` (evidência derivada correta: React → 3corações), reduced-motion renderiza o texto final sem boot, botão "pular conexão" e Esc |

---

## 9. Riscos e perguntas em aberto

1. **Foto real.** `public/avatar.svg` é um placeholder. O halftone do retrato depende de uma foto com bom contraste (luz lateral). Sem foto, o hero usa o monograma e um bloco de dados. **[A VALIDAR]**
2. **`/cv.pdf` não existe** em `public/`, então o link "Currículo (PDF)" hoje está quebrado.
3. **Placeholders de domínio:** `seunome.dev` em `index.html` (canonical, og:url, og:image). Também falta `og.png`.
4. **Bug de conteúdo:** `sections.ts` diz "experiência profissional, de 2019 até hoje", mas o primeiro registro é de 2024-01.
5. **Python, Java e C** não aparecem em nenhum serviço ou projeto. Posso marcar como "formação"? **[A VALIDAR]**
6. **Agrupamento dos implantes** (Linguagens / Web e plataformas / Ferramentas) é proposta minha. Existe um rascunho `skills.ts` e `education.ts` no stash `redesign-hud` (não aplicado), com cursos e habilidades a mais. Esses dados são reais e devem entrar? **[A VALIDAR]**
7. **Prazo de resposta** "até dois dias úteis" (texto atual do Contato): ainda vale? **[A VALIDAR]**
8. **LinkedIn:** `links` não tem LinkedIn, e para recrutador ele costuma ser o primeiro clique. Adicionar? **[A VALIDAR]**
9. **Só tema escuro.** O deck é escuro por natureza, e eu não proponho tema claro. Risco: leitura longa em fundo escuro cansa um pouco, mitigado com `text` a 16,7:1 e Archivo 17 px.
10. **Status dos projetos** (`em andamento` / `concluído`): derivado dos textos. Confirmar.
11. **Intro uma vez por sessão** vs. a cada visita: proponho por sessão. Confirmar.
12. **Idioma:** só pt-BR. Uma versão em inglês dobra o trabalho de conteúdo. Fica para depois?
13. **PI:** a paleta amarelo/ciano/magenta é *associada* à franquia, mas não é proprietária. O risco está em reproduzir telas. Mitigação: sem silhueta de implantes, sem fonte oficial, sem termos da franquia (2.1), marca e ícones próprios. O amarelo usado (`#F3E600`) é escolhido por contraste, não copiado.
14. **"Altamente animado" vs. performance no celular:** o orçamento de 95 KB e o modo leve são o contrapeso. Se o Lighthouse mobile ficar abaixo de 90, o ROMPER é o primeiro corte.
15. **Projetos sem link** (`links: {}` nos três): o painel mostra "sem link público" em vez de esconder a área. Há repositórios públicos para linkar? **[A VALIDAR]**

> Nota de contraste: os valores da tabela 4.2 foram calculados com a fórmula de luminância relativa do WCAG 2.x (script descartável na sessão, reproduzível em qualquer verificador).
