// Pré-renderização por snapshot (SSG para SPA).
//
// Roda DEPOIS do `vite build`. Sobe um preview do dist, e com puppeteer visita
// cada rota injetando window.__PRERENDER__=true ANTES do app carregar (os inits
// de animação/scroll leem essa flag e não rodam → o DOM capturado fica estático
// e idêntico ao primeiro render do React no cliente). Salva o HTML resultante
// em dist/<rota>/index.html — o Vercel serve esse arquivo direto (first paint
// instantâneo), e o cliente hidrata por cima.
//
// Uso: node scripts/prerender.mjs   (usado no script npm "prerender")

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "node:http";
import puppeteer from "puppeteer-core";

const root = process.cwd();
const dist = path.join(root, "dist");
// O binário do Chrome vem por env (o container do deploy instala o chromium do
// apt e exporta PUPPETEER_EXECUTABLE_PATH); o fallback é o Chrome do Mac, para
// quem roda `npm run build:ssg` local. Path fixo travava o build em qualquer
// máquina que não fosse a do Thalyson — era o que obrigava o deploy prebuilt.
const CHROME =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 4199;

// ── Locales (espelha src/app/i18n/config.ts) ──────────────────────────────
const LOCALES = ["pt", "en", "es"];
const DEFAULT_LOCALE = "pt";
const prefix = (loc) => (loc === DEFAULT_LOCALE ? "" : `/${loc}`);

// ── Rotas base (as mesmas do gen-sitemap) ─────────────────────────────────
const STATIC_ROUTES = [
  "/",
  "/especialidades",
  "/sobre-mim",
  "/doutorado",
  "/publicacoes",
  "/eventos",
  "/midia",
  "/depoimentos",
  "/contato",
  "/localizacao",
  "/segunda-opiniao",
  "/privacidade",
];

// TODAS as especialidades que têm CARD — não só as que têm artigo clínico.
// Antes a lista vinha da pasta de artigos, e a especialidade sem artigo ficava
// sem HTML próprio: o rewrite de SPA devolvia o index.html, ou seja, a página
// respondia 200 servindo a HOME byte a byte. Passava em qualquer teste de link
// quebrado e continuava linkada na home e no rodapé.
// Sem artigo a página renderiza hero + CTA + "outras especialidades", e o
// módulo de SEO já a marca noindex por thin content — o que é correto. O que
// não podia era ela não existir.
const dataTs = fs.readFileSync(
  path.join(root, "src/app/components/section-especialidades/data.ts"),
  "utf8",
);
const espSlugs = [...dataTs.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
const baseRoutes = [
  ...STATIC_ROUTES,
  ...espSlugs.map((s) => `/especialidade/${s}`),
];

// Todas as rotas × locales.
const routes = [];
for (const loc of LOCALES)
  for (const r of baseRoutes) {
    const routePath = r === "/" ? prefix(loc) || "/" : `${prefix(loc)}${r}`;
    routes.push(routePath);
  }

// ── Static file server sobre o dist (com fallback SPA para index.html) ────
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
  ".xml": "application/xml",
  ".txt": "text/plain",
};
const server = createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split("?")[0]);
  let filePath = path.join(dist, urlPath);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    res.writeHead(200, { "Content-Type": MIME[path.extname(filePath)] || "application/octet-stream" });
    fs.createReadStream(filePath).pipe(res);
    return;
  }
  // fallback SPA — serve o index.html original (ainda com <div id=root> vazio)
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  fs.createReadStream(path.join(dist, "index.html")).pipe(res);
});

await new Promise((r) => server.listen(PORT, r));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  // --disable-dev-shm-usage: dentro do container o /dev/shm padrão é de 64 MB e
  // o Chrome morre no meio das 63 rotas sem dizer por quê.
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

let ok = 0;
for (const route of routes) {
  const page = await browser.newPage();
  // Flag ANTES de qualquer script do app rodar.
  await page.evaluateOnNewDocument(() => {
    window.__PRERENDER__ = true;
  });
  // `networkidle0` exige ZERO conexão por 500ms e passou a estourar os 30s
  // (basta uma requisição que nunca fecha para travar a build inteira). O que
  // define o snapshot é o React ter montado — e isso o waitForFunction abaixo
  // mede direto. O HTML capturado é o DOM, não depende de asset baixado.
  await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: "domcontentloaded" });
  // Espera o React montar (o #root deixa de estar vazio).
  const montou = await page
    .waitForFunction(() => document.getElementById("root")?.childElementCount > 0, { timeout: 15000 })
    .then(() => true)
    .catch(() => false);
  await new Promise((r) => setTimeout(r, 250));

  const html = await page.evaluate(() => "<!doctype html>\n" + document.documentElement.outerHTML);
  await page.close();

  // TRAVA: sem esta checagem a rota que não montou era salva como <div id="root">
  // vazio e o build terminava VERDE — publicando um SPA oco que só pinta depois
  // do JS. Já custou o PageSpeed (100 → 66) uma vez, quando o deploy saiu de uma
  // máquina sem Chrome. Num deploy automático isso vai ao ar sozinho: melhor o
  // build falhar alto do que o site subir vazio.
  if (!montou) {
    console.error(`\n✗ prerender: a rota ${route} não montou em 15s — HTML sairia vazio.`);
    await browser.close();
    server.close();
    process.exit(1);
  }

  // dist/<route>/index.html  ("/" → dist/index.html)
  const outDir = route === "/" ? dist : path.join(dist, route);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), html);
  ok++;
}

await browser.close();
server.close();
console.log(`prerender: ${ok}/${routes.length} rotas → dist/**/index.html`);

// silencia lint de import não usado em alguns ambientes
void fileURLToPath;
