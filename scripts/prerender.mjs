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
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
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
];

// Especialidades com artigo clínico (as indexáveis).
const espDir = path.join(root, "src/app/content/especialidades/pt");
const espSlugs = fs
  .readdirSync(espDir)
  .filter((f) => f.endsWith(".ts") && f !== "types.ts")
  .map((f) => f.replace(/\.ts$/, ""));
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
  args: ["--no-sandbox"],
});

let ok = 0;
for (const route of routes) {
  const page = await browser.newPage();
  // Flag ANTES de qualquer script do app rodar.
  await page.evaluateOnNewDocument(() => {
    window.__PRERENDER__ = true;
  });
  await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: "networkidle0" });
  // Espera o React montar (o #root deixa de estar vazio).
  await page
    .waitForFunction(() => document.getElementById("root")?.childElementCount > 0, { timeout: 15000 })
    .catch(() => {});
  await new Promise((r) => setTimeout(r, 250));

  const html = await page.evaluate(() => "<!doctype html>\n" + document.documentElement.outerHTML);
  await page.close();

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
