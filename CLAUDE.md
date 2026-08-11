# CLAUDE.md — Dr. Hugo Doria (site institucional)

Site institucional do Dr. Hugo Doria, neurocirurgião vascular. **Vite 6 + React 18 + Tailwind v4 + Radix + GSAP/Lenis/Motion** (export do Figma Make). **Não é Next.js** — ignore sugestões de Next/cache que casam pelo path `app/`.

- **Dev:** `npm run dev` → `localhost:5173`. (Pegadinha: a 5173 às vezes é tomada por outro projeto; suba isolado com `npm run dev -- --port 5180 --strictPort` e confirme pelo `<title> Dr. Hugo Doria`.)
- **Repo/identidade git:** `onmx-tech/hugordoria-website`. Commits deste repo usam a identidade **onmx-tech** (já no config local). Sempre confirme antes de commit/push.
- **Harness de screenshot:** `scripts/shoot.mjs` (puppeteer-core + Chrome). `puppeteer-core` consta no package.json mas some do node_modules — reinstale com `npm i puppeteer-core --no-save` quando faltar. Scripts ad-hoc de captura devem ser temporários (criar em `scripts/_xxx.mjs`, rodar, e **apagar** — não commitar).

## Duas zonas: HOME vs SUBPÁGINAS

**A HOME é intocável por padrão.** Só mexa nela se o pedido for explícito. Componentes da home: `Hero`, `Section*`, `SectionSobreMim`, `SectionEspecialidades`, `SectionBrain`, `Footer`, `FloatingNav` (em `src/app/components/`). A home é toda scroll pinado (GSAP ScrollTrigger) — efeitos só dão pra avaliar ao vivo/screenshot, não em código estático.

**As SUBPÁGINAS usam o "Design System Doria"** (kit aprovado, ex-"Design System for Homepage"): mesmo navy/gold/cream da home, fontes **Geist** (display) / **Arimo** (corpo) / **Geist Mono** (labels), **sem gradientes radiais/glows**, **sem sombras**. Componentes em `src/app/components/sub/` (PageHero, primitives — Eyebrow/SectionHeading/Divider/Button/Stat/Container —, VideoFeature, ScrollRevealManifesto, etc.).

## Cantos RETOS em todo o site

O site inteiro usa **cantos retos** (cards/frames/imagens). No `theme.css` o `--radius` e TODAS as escalas (`--radius-xs/sm/md/lg/xl/2xl/3xl`) estão **zeradas** — isso mata as classes `rounded-*` de bloco de uma vez (telas + UI kit shadcn), sem caçar classe por classe. **NÃO reintroduzir** radius nesses tokens. Raios arbitrários (`rounded-[Npx]`) não passam pelo token — se aparecerem em bloco, usar `rounded-none`. **`rounded-full` é preservado de propósito** (pills de CTA, avatares, dots, botões de play, badges) — são formas, não "cantos", e existem inclusive na home.

## Hero da home (`Hero.tsx`) = foto recortada sobre o navy

O hero do topo (`Hero.tsx`, ≠ `SectionBrain`) mostra um **retrato do Dr. recortado** (PNG transparente, `@/assets/hero-doria-*.png`) que "flutua"/funde no gradiente navy. Trocar a foto = pegar uma real de `public/v4/photos/*.jpg`, **recortar o fundo** (Magnific `images_remove_background`: `creations_request_upload` → `curl PUT` do arquivo → `creations_finalize_upload` → `images_remove_background` → `creations_wait` → baixar o `render.png`), salvar em `src/assets/hero-doria-<pose>.png` e trocar o `import imgHeroDoria`. As fotos de `public/v4/photos` são JPGs COM fundo (usadas direto nas seções/subpáginas dentro de frames); só o hero precisa do recorte. ⚠️ A foto **`retrato-casual` foi rejeitada pelo cliente e ELIMINADA** — não reutilizar.

## `FloatingNav` some ao rolar para baixo — é de propósito

A nav flutuante **não** aparece só por passar do threshold de 480px: ela esconde enquanto o usuário rola **para baixo** (para não cobrir a leitura) e reaparece ao rolar **para cima** (intenção de agir). Um teste automatizado que só faz `mouse.wheel({deltaY: +N})` vai encontrar `opacity: 0` e parecer um bug — role para cima antes de medir. Em **`/contato`** o componente retorna `null` de propósito: a página inteira já é o CTA.

## Pegadinhas de screenshot (puppeteer)

- **Lenis intercepta `scrollIntoView`/`window.scrollTo`** — o scroll programático "cai" no hero e nunca chega na seção. Alternativas: `page.mouse.wheel()` (o Lenis respeita o wheel real), ou `elementHandle.screenshot()` mirando o elemento por seletor (ex.: `[data-component="sobre-mobile"]`) — captura o elemento independente do scroll.
- `isMobile: true` **desabilita o wheel**. Para testar o layout mobile com wheel, use viewport de **largura estreita SEM `isMobile`** (o breakpoint `lg` decide o layout pela largura, não por `isMobile`).
- **`SectionSobre` (desktop):** o frame é ~quadrado (640×720) mas os retratos são verticais (1000×1500); o `object-cover` central corta o topo (decapita). A `ImageFrame` aceita `objectPosition` **por célula** (`data.ts`) — retratos com a cabeça no alto usam `"50% ~8%"`.

Páginas:
- `EspecialidadePage.tsx` (`/especialidade/:slug`) — hero PageHero + corpo navy + "Outras especialidades".
- `pages/Especialidades.tsx` (`/especialidades`) — listagem em grid.
- `pages/InstitucionalPages.tsx` — Sobre, Doutorado, Publicações, Eventos, Mídia, Depoimentos, Contato (com **formulário** → WhatsApp), Localização. Casca compartilhada `Shell` (Navbar + main navy + Footer + FloatingNav).
- `SubPage.tsx` foi **removido** (era o template v3 antigo). Não recriar.

## Convenções importantes

- **Header/footer/FloatingNav são ÚNICOS e compartilhados** entre home e subpáginas:
  - `components/SiteHeader.tsx` — header full-width (`px-8`), transparente sobre o hero, rola junto (não fixo). Navegação por **rotas** (não âncoras), item ativo por rota. `sub/Navbar.tsx` apenas re-exporta o SiteHeader.
  - `sub/Footer.tsx` re-exporta o `Footer` da home.
  - `FloatingNav.tsx` — nav fixa embaixo, aparece ao rolar, por rotas, em todas as páginas.
- **Larguras:** o **header é full-width**; o **conteúdo das subpáginas é contido** (`Container` = `max-w-[1440px] mx-auto px-6 md:px-8`). Não deixar o conteúdo das subpáginas full-bleed.
- **Tokens Doria** estão em `src/styles/theme.css` (bloco `@theme`): escala `navy-900..400`, `gold-700/600/500`, `sand`, `ink`, `mist` → classes Tailwind `bg-navy-800`, `text-gold-600`, etc. `gold-700` (#b78e30) = eyebrows/ícones; `gold-600` (#c5a471) = CTAs/ativo. **Não** redefinir `--color-cream` (a home depende dele). Schibsted/v3 antigos foram removidos.

## Conteúdo (data-driven)

- Especialidades: `src/app/content/especialidades/<slug>.ts` (tipo em `types.ts`). Todas as 11 estão no **formato rico**: `category`, `readingTime`, `lead`, `heroMeta[]`, e por seção `tocLabel`/`heading`/`emphasis`/`figureCaption`/`bullets[]` (sintomas)/`options[]` (tratamento) + 1 `quote`. Texto clínico é migrado do site original — **não inventar afirmações médicas**.
- Institucional: `src/app/content/institucional.ts` (SOBRE_MIM, DOUTORADO, PUBLICACOES, EVENTOS, MIDIA_VIDEOS, DEPOIMENTOS_GALERIA, CONTATO, SOCIAL).

## Assets reais do cliente — `public/v4/`

Servidos estáticos (referenciar por path string, ex.: `image="/v4/photos/sobre-portrait.jpg"`).

⚠️ **Nenhum `<img>` serve o JPG/PNG original.** `scripts/optimize-images.mjs` (roda no `prebuild`, ou `npm run images`) deriva `<nome>-{480,960}.webp` de todas as pastas de `public/v4`, e `responsiveImg()` (`src/lib/img.ts`) troca o path no ponto do `<img>` + monta o `srcSet`. **Asset novo em `public/v4` = só soltar o arquivo; o prebuild gera os derivados.** Regra que não pode voltar a ser quebrada: **imagem below-fold é `loading="lazy"`** — a home é pré-renderizada, então o preload scanner enxerga TODAS as imagens do HTML e as baixa de uma vez, afogando a banda do hero (foi isso que derrubou o PageSpeed de 88 para 68 em jul/26; com WebP+lazy foi a 100).


- `videos/` — `sobre.mp4` (32MB) e `doutorado.mp4` (11MB), 720p H.264 + posters. `VideoFeature` toca `.mp4` local (`<video>`) ou embed (iframe) conforme o `src`. **Vídeos foram comprimidos com um ffmpeg estático** (brew/ffmpeg ausentes na máquina); baixar de evermeet.cx se precisar reprocessar. Considerar Git LFS/CDN se crescerem.
- `photos/` — retratos e fotos de palestra do cliente (heroes das institucionais + galeria da Sobre).
- `procedimentos/<slug>.jpg` — 11 imagens 3D médicas geradas no **Magnific**, 1100×1100. Usadas nos heroes de especialidade **e** nos cards "Minhas Especialidades" da home. **Direção de arte da série (medido, não "navy"):** anatomia **orgânica/carnal FOTORREALISTA** (tecido cerebral real, vasos vermelhos carnudos, superfície úmida), **fundo preto**, luz/**glow dourado-âmbar no ponto focal** (o aneurisma, o tumor, a anastomose). Macro no assunto. **NÃO** é escultura de vidro/cristal, **NÃO** tem borda creme/círculo/vinheta, e **NÃO** pode ter aquele *outline dourado neon contornando* (vira cara de cartoon/CGI — pedir luz difusa natural + negativar `glowing outline/neon rim/cartoon edges/plastic`). Ao gerar/refinar uma: **ler 3-4 irmãs primeiro** e usar como `style`-ref (a `revascularizacao-cerebral` já foi retrabalhada assim, jul/2026, com o desenho aprovado pelo Dr. via WhatsApp = cabeça de perfil translúcida + craniotomia + árvore vascular + glow central).
- `depoimentos/depo-01..24.png` — 24 screenshots reais de avaliações (galeria masonry).

⚠️ A foto antiga `aneurisma.jpg` (e similares genéricas) era um **coração/asset errado** — nunca usar. `brain.png` do kit, apesar do nome, é o **retrato do Dr.**.

## SEO — o site é uma SPA, o `<head>` é escrito em runtime

São **21 rotas** servindo o mesmo `index.html`. Sem intervenção, todas compartilham um único título/descrição — o Google e o WhatsApp leem o site inteiro como uma página só. O módulo `src/app/seo/` resolve isso:

- **`site.config.json` (raiz)** — o domínio canônico mora aqui e **em nenhum outro lugar**. O `index.html` usa o marcador `%SITE_URL%` (injetado na build pelo `vite.config.ts`), o app lê via `seo/site.ts` e o sitemap via `scripts/gen-sitemap.mjs`. ⚠️ O domínio de produção **ainda não foi confirmado pelo cliente** — quando for, trocar essa única linha. Canonical apontando para o endereço errado divide o ranqueamento entre dois sites.
- **`site.ts`** — nome, endereço estruturado e imagem OG padrão, além de reexportar o `SITE_URL`. Não espalhar essas strings pelo código.
- **`useSeo.ts`** — hook chamado **uma vez por página**, no topo do componente de rota. Escreve title, description, canonical, Open Graph, Twitter Card e injeta o JSON-LD da rota (removido no cleanup, para não acumular entre navegações).
- **`schema.ts`** — builders de schema.org: `physicianSchema` (perfil + consultório), `websiteSchema`, `breadcrumbSchema`, `medicalPageSchema` (páginas de especialidade).

Regras:
- **`Physician` só existe no `index.html` estático** — crawlers sem JS (WhatsApp, LinkedIn) leem de lá. Não repetir o bloco nas rotas; o `@id` (`/#physician`) é referenciado pelos outros schemas.
- **Página nova = `useSeo` obrigatório**, com título e descrição próprios. Título duplicado entre rotas é regressão.
- **Especialidade sem artigo clínico** (`content/especialidades/<slug>.ts`) é hero + CTA = *thin content*: recebe `noindex` automático e fica fora do sitemap. Não é hard-code — quando o arquivo de conteúdo existir, ela entra sozinha. Hoje falta a de **`revascularizacao-cerebral`**.
- **`sitemap.xml` e `robots.txt` são gerados**, nunca editados à mão: `npm run sitemap` (roda sozinho no `prebuild`). O script lê os slugs de `section-especialidades/data.ts` e avisa no console o que ficou de fora.
- **Imagem de compartilhamento**: `public/og/og-default.jpg` (1200×630, navy + retrato + Geist). Ícones: `favicon-32.png`, `icon-512.png`, `apple-touch-icon.png` na raiz de `public/`.

## Retune fica fora do bundle de produção

O overlay de edição visual é importado com `lazy()` sob `import.meta.env.DEV` no `main.tsx`. Ele não faz nada em produção, mas ia inteiro no bundle — o import dinâmico cortou **1.204 kB → 680 kB** (375 → 233 kB gzip). **Não voltar para o import estático.**

## Números públicos não voltam sem base documental

O site não exibe mais "+20 anos", "+100 artigos" nem "+9.500 pacientes". Não foi preferência editorial: em publicidade médica (CFM 2.336/2023, Art. 11, XVI) número sem metodologia de contagem auditável é tratado como promocional, e nenhum dos três tinha — "9.500" não definia se contava pessoas, consultas ou cirurgias. No lugar ficaram credenciais que um terceiro consegue conferir: **MD PhD** e **RQE 48918** (registro de especialista, CREMESP, emitido em 16/12/2014; CRM/SP 118350).

**Não reintroduzir número público sem que o cliente entregue a base documental por escrito** — e, quando entregar, o critério de contagem tem de caber no rótulo. Vale para stats, selos de `PageHero` e texto corrido.

⚠️ Pegadinha ao auditar isso: `grep -rn "\+20"` **não acha** `"+20"` — em regex básica o `\+` vira quantificador e a varredura devolve um falso "limpo". Use `grep -rF` para string literal. Foi assim que um selo passou batido.

## PWA — instalável, e de propósito sem cache

`public/manifest.webmanifest` + `public/sw.js`, registrado no fim do `main.tsx`. No iPhone o "Adicionar à Tela de Início" precisa só do manifest e das metatags `apple-mobile-web-app-*`; o service worker existe porque o **Chrome no Android exige um listener de `fetch`** para oferecer a instalação.

**O service worker é intencionalmente vazio e não deve ganhar cache.** O site é pré-renderizado e servido pela CDN — um cache aqui competiria com esse fluxo e poderia servir texto clínico desatualizado depois de uma publicação. O `activate` inclusive limpa qualquer cache que apareça. Ícone maskable (`icon-512-maskable.png`) é derivado do `icon-512.png` com zona segura de 72px por lado.

## Sequência de frames da home é WebP

`public/sequence/*.jpg` são os originais; **ninguém os serve** — o `SectionBrain` pede `.webp`, derivados no prebuild pelo `optimize-images.mjs` (4,8 MB → 2,7 MB). O gargalo relatado no celular é de **decode durante o scroll**, não de banda: o mobile já baixa 31 dos 122 frames (`MOBILE_STEP = 4`). Por isso a resposta não é trocar por `<video>` — scrub de vídeo no Safari do iPhone é pior, e fugir disso é a razão de a sequência existir.

## Dimensões de imagem são geradas, não digitadas

`src/lib/img-dimensions.json` mapeia cada asset de `public/v4` para `[largura, altura]` e é **gerado pelo prebuild** (o sharp já abre todo arquivo para derivar os WebP). O `responsiveImg()` devolve `width`/`height` a partir dele, o que reserva o espaço da imagem e zera o salto de layout das `loading="lazy"`. Asset novo entra sozinho; asset sem medida apenas volta ao comportamento antigo. Não editar o JSON à mão.

## Deploy — produção é SEMPRE prebuilt local

⚠️ **PRODUÇÃO MUDOU DE CASA EM 10/08/2026. `hugodoria.com.br` é o site REAL, e ele NÃO está na Vercel.**

O domínio do cliente foi virado para a **VPS do cliente** (CDN Gestão, Hostinger, `179.198.121.44`, Docker Swarm + Easypanel + Traefik). Medido: `dig +short A hugodoria.com.br` → `179.198.121.44`. O WordPress antigo saiu do caminho; a linha que dizia "`hugodoria.com.br` ainda é o WordPress antigo" ficou obsoleta no dia do cutover e mandava deployar no lugar errado — por isso este aviso.

- **Produção hoje:** `https://hugodoria.com.br` — servida pela VPS. Deploy exige token da API do Easypanel + acesso root à VPS, que **não ficam guardados na máquina**: pedir ao Thalyson a cada sessão.
- **`hugodoria.merinno.com`** (projeto Vercel `hugordoria-website`, scope `onmx-techs-projects`) continua existindo como **staging/preview**. O procedimento Vercel abaixo vale para ele — não para a produção.
- Os sites irmãos do mesmo cliente moram na mesma VPS (`centrodorianeuro.com.br`, `pilotohugonetto.com.br`).

O prerender (`scripts/prerender.mjs`) usa puppeteer, e **o build server do Vercel não tem Chrome** — se o deploy sair de lá, o site vai ao ar como SPA vazio (`<div id="root"></div>`), o que já derrubou o PageSpeed de 100 para 66. Por isso:

```bash
vercel build --prod --scope onmx-techs-projects        # roda build:ssg LOCAL, com Chrome
vercel deploy --prebuilt --prod --scope onmx-techs-projects
```

O `--prod` tem que estar nos **dois** comandos (build e deploy precisam do mesmo target, senão dá `prebuilt-environment-mismatch`).

**Auto-deploy do `main` está DESLIGADO** via `git.deploymentEnabled` no `vercel.json` — é o que impede um `git push` de sobrescrever a produção com uma versão sem prerender. Não reativar enquanto o prerender depender de Chrome local (a saída definitiva é `@sparticuz/chromium` no build, ou migrar para `vite-react-ssg`).

**Verificar o que está no ar por identidade, nunca pelo "deploy ok":**

```bash
curl -s https://hugodoria.merinno.com/ | grep -cE 'id="root"><(header|div|main)'   # 1 = prerenderizado, 0 = SPA vazio
curl -s https://hugodoria.merinno.com/ | grep -o 'CRM-SP 118350'                   # rodapé CFM Art. 4º/6º
```

O HTML da home tem ~129 KB quando prerenderizado, ~5,5 KB quando não.

## Verificação

⚠️⚠️ **`✓ built` NÃO prova que a página abre. A verificação é ABRIR AS ROTAS.**

- **Não existe `tsconfig.json` nem TypeScript instalado neste projeto** — o Vite transpila com esbuild, **sem checagem de tipos**. Ignore instruções antigas mandando rodar `npx tsc --noEmit`: aqui isso baixa um compilador avulso e checa ZERO arquivo, devolvendo um "limpo" que reforça a falsa confiança.
- **O que isso custa, medido em 11/08/2026:** apaguei o campo `icon` do `CardData` e deixei um `<Icon />` órfão em `EspecialidadePage.tsx`. `npm run build` terminou com `✓ built` — e **as 11 páginas de especialidade renderizavam EM BRANCO** (React error #130: `undefined` usado como componente). Ficou assim por horas. Uma versão anterior desta seção dizia "a verificação real é `npm run build`"; foi exatamente essa frase que não pegou o defeito.
- **Portanto, antes de considerar qualquer mudança verificada:** abrir com `puppeteer-core` (já está no `node_modules`; se sumir, `npm i puppeteer-core --no-save`) **uma rota de cada família de página** — home, uma `/especialidade/:slug`, uma institucional — escutando `pageerror` e confirmando que existe `<h1>`:

```js
p.on('pageerror', e => erros++);
await p.goto(rota, { waitUntil: 'networkidle0' });
const vivo = await p.evaluate(() => !!document.querySelector('h1'));
```

- ⚠️ **Ao remover um campo de dado ou um componente, o grep do CONSUMIDOR vem ANTES de apagar a definição** — e tem que voltar vazio: `grep -rn "\.icon\b\|<Icon" src/ | grep -v "icon:"`. Verificar a tela que USA o campo, não só a tela que você está editando (o erro acima passou porque eu conferi a listagem, onde mexi, e não a página de detalhe, onde quebrou).
- Validação visual com puppeteer-core (a home é scroll-pinado; subpáginas têm hero + corpo). Confirmar a porta certa pelo `<title>`. Para layout, medir `getBoundingClientRect()` em 390 / 834 / 1440 — screenshot de aba oculta não pinta imagem e já produziu diagnóstico errado aqui.
- Ao mexer em SEO, conferir no navegador o `<head>` **depois** do React montar (o `index.html` cru não reflete a rota).
