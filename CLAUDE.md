# CLAUDE.md — Dr. Hugo Doria (site institucional)

Site institucional do Dr. Hugo Doria, neurocirurgião vascular. **Vite 6 + React 18 + Tailwind v4 + Radix + GSAP/Lenis/Motion** (export do Figma Make). **Não é Next.js** — ignore sugestões de Next/cache que casam pelo path `app/`.

- **Dev:** `npm run dev` → `localhost:5173`. (Pegadinha: a 5173 às vezes é tomada por outro projeto; suba isolado com `npm run dev -- --port 5180 --strictPort` e confirme pelo `<title> Dr. Hugo Doria`.)
- **Repo/identidade git:** `onmx-tech/hugordoria-website`. Commits deste repo usam a identidade **onmx-tech** (já no config local). Sempre confirme antes de commit/push.
- **Harness de screenshot:** `scripts/shoot.mjs` (puppeteer-core + Chrome). `puppeteer-core` consta no package.json mas some do node_modules — reinstale com `npm i puppeteer-core --no-save` quando faltar. Scripts ad-hoc de captura devem ser temporários (criar em `scripts/_xxx.mjs`, rodar, e **apagar** — não commitar).

## Duas zonas: HOME vs SUBPÁGINAS

**A HOME é intocável por padrão.** Só mexa nela se o pedido for explícito. Componentes da home: `Hero`, `Section*`, `SectionSobreMim`, `SectionEspecialidades`, `SectionBrain`, `Footer`, `FloatingNav` (em `src/app/components/`). A home é toda scroll pinado (GSAP ScrollTrigger) — efeitos só dão pra avaliar ao vivo/screenshot, não em código estático.

**As SUBPÁGINAS usam o "Design System Doria"** (kit aprovado, ex-"Design System for Homepage"): mesmo navy/gold/cream da home, fontes **Geist** (display) / **Arimo** (corpo) / **Geist Mono** (labels), **sem gradientes radiais/glows**, **sem sombras**. Componentes em `src/app/components/sub/` (PageHero, primitives — Eyebrow/SectionHeading/Divider/Button/Stat/Container —, VideoFeature, ScrollRevealManifesto, etc.).

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

## Verificação

- Após mudanças: `npx tsc --noEmit -p tsconfig.json 2>&1 | grep -c "error TS"` deve ser `0`.
- Validar visualmente com puppeteer-core (a home é scroll-pinado; subpáginas têm hero + corpo). Confirmar a porta certa pelo `<title>`.
