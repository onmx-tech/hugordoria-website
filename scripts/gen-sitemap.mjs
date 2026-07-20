// Gera public/sitemap.xml e public/robots.txt a partir das rotas reais do
// site. Roda no `prebuild` — nenhuma rota entra no sitemap "na mão".
//
// Fonte das especialidades: src/app/components/section-especialidades/data.ts
// (lido como texto para não precisar de runtime TS neste script).

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

// Domínio vem de site.config.json — mesma fonte do index.html e do app.
const SITE_URL = JSON.parse(
  fs.readFileSync(path.join(root, "site.config.json"), "utf8"),
).siteUrl.replace(/\/$/, "");

/** Rotas fixas com prioridade e frequência de mudança. */
const STATIC_ROUTES = [
  { path: "/", priority: "1.0", changefreq: "monthly" },
  { path: "/especialidades", priority: "0.9", changefreq: "monthly" },
  { path: "/sobre-mim", priority: "0.8", changefreq: "yearly" },
  { path: "/contato", priority: "0.8", changefreq: "yearly" },
  { path: "/localizacao", priority: "0.7", changefreq: "yearly" },
  { path: "/depoimentos", priority: "0.7", changefreq: "monthly" },
  { path: "/doutorado", priority: "0.6", changefreq: "yearly" },
  { path: "/publicacoes", priority: "0.6", changefreq: "yearly" },
  { path: "/eventos", priority: "0.5", changefreq: "yearly" },
  { path: "/midia", priority: "0.5", changefreq: "monthly" },
];

function readSpecialtySlugs() {
  const file = path.join(
    root,
    "src/app/components/section-especialidades/data.ts",
  );
  const src = fs.readFileSync(file, "utf8");
  const slugs = [...src.matchAll(/^\s{4}slug:\s*"([a-z0-9-]+)"/gm)].map(
    (m) => m[1],
  );
  const unique = [...new Set(slugs)];
  if (unique.length === 0) {
    throw new Error("gen-sitemap: nenhuma especialidade encontrada em data.ts");
  }

  // Só entra no sitemap a especialidade que tem artigo clínico. Sem o texto,
  // a página é hero + CTA (thin content) — indexar isso derruba a autoridade
  // do domínio. Assim que o arquivo de conteúdo existir, ela entra sozinha.
  const comArtigo = unique.filter((slug) =>
    fs.existsSync(path.join(root, `src/app/content/especialidades/${slug}.ts`)),
  );
  const semArtigo = unique.filter((s) => !comArtigo.includes(s));
  if (semArtigo.length) {
    console.warn(
      `  ⚠ fora do sitemap (sem artigo clínico): ${semArtigo.join(", ")}`,
    );
  }
  return comArtigo;
}

const today = new Date().toISOString().slice(0, 10);

const urls = [
  ...STATIC_ROUTES,
  ...readSpecialtySlugs().map((slug) => ({
    path: `/especialidade/${slug}`,
    priority: "0.8",
    changefreq: "yearly",
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${SITE_URL}${u.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

const robots = `# ${SITE_URL}
User-agent: *
Allow: /

# Ferramenta interna de aprovação de imagens — fora do índice.
Disallow: /aprovacao/

Sitemap: ${SITE_URL}/sitemap.xml
`;

fs.writeFileSync(path.join(root, "public/sitemap.xml"), xml);
fs.writeFileSync(path.join(root, "public/robots.txt"), robots);
console.log(`sitemap.xml: ${urls.length} URLs · robots.txt gerado`);
