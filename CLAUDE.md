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

Servidos estáticos (referenciar por path string, ex.: `image="/v4/photos/sobre-portrait.jpg"`):
- `videos/` — `sobre.mp4` (32MB) e `doutorado.mp4` (11MB), 720p H.264 + posters. `VideoFeature` toca `.mp4` local (`<video>`) ou embed (iframe) conforme o `src`. **Vídeos foram comprimidos com um ffmpeg estático** (brew/ffmpeg ausentes na máquina); baixar de evermeet.cx se precisar reprocessar. Considerar Git LFS/CDN se crescerem.
- `photos/` — retratos e fotos de palestra do cliente (heroes das institucionais + galeria da Sobre).
- `procedimentos/<slug>.jpg` — 11 imagens 3D médicas geradas no **Magnific** (navy full-bleed + luz dourada, clínico/não-gráfico). Usadas nos heroes de especialidade **e** nos cards "Minhas Especialidades" da home. Ao gerar novas, pedir **full-bleed navy** (sem borda creme/círculo/vinheta).
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

## Verificação

- **Não existe `tsconfig.json` nem TypeScript instalado neste projeto** — o Vite transpila com esbuild, sem checagem de tipos. A verificação real é `npm run build` (deve terminar com `✓ built`). Ignore instruções antigas mandando rodar `npx tsc --noEmit`.
- Validar visualmente com puppeteer-core (a home é scroll-pinado; subpáginas têm hero + corpo). Confirmar a porta certa pelo `<title>`.
- Ao mexer em SEO, conferir no navegador o `<head>` **depois** do React montar (o `index.html` cru não reflete a rota).
