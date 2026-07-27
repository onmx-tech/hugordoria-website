/**
 * Deriva WebP responsivos dos assets pesados de public/v4.
 *
 * Os originais (jpg/png 1100-1600px, 200-500KB) continuam no repo — só que
 * ninguém os serve mais: os componentes pedem `<nome>-{480,960}.webp` via
 * `src/lib/img.ts`. Rodando no prebuild, é impossível o site apontar para um
 * derivado que não existe.
 *
 * Idempotente: pula o que já está gerado e mais novo que a origem.
 */
import sharp from "sharp";
import { readdir, stat, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIRS = [
  "public/v4/procedimentos",
  "public/v4/photos",
  "public/v4/depoimentos",
  "public/v4/figuras",
  "public/v4/videos", // só os posters .jpg; os .mp4 são ignorados pelo filtro
];
const WIDTHS = [480, 960];
const SOURCE_RE = /\.(jpe?g|png)$/i;

async function newerThan(a, b) {
  if (!existsSync(b)) return true;
  const [sa, sb] = await Promise.all([stat(a), stat(b)]);
  return sa.mtimeMs > sb.mtimeMs;
}

let made = 0;
let skipped = 0;
let savedBytes = 0;

for (const dir of DIRS) {
  const abs = path.join(ROOT, dir);
  if (!existsSync(abs)) continue;
  await mkdir(abs, { recursive: true });

  const files = (await readdir(abs)).filter((f) => SOURCE_RE.test(f));
  for (const file of files) {
    const src = path.join(abs, file);
    const base = file.replace(SOURCE_RE, "");
    const meta = await sharp(src).metadata();

    for (const w of WIDTHS) {
      const out = path.join(abs, `${base}-${w}.webp`);
      if (!(await newerThan(src, out))) {
        skipped++;
        continue;
      }
      // Nunca upscale: se a origem é menor que o alvo, gera no tamanho dela
      // (o srcset segue válido — só não inventa pixel).
      const width = Math.min(w, meta.width ?? w);
      const info = await sharp(src).resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(out);
      made++;
      if (w === WIDTHS.at(-1)) savedBytes += (await stat(src)).size - info.size;
    }
  }
}

console.log(
  `[images] ${made} webp gerados, ${skipped} em dia. ` +
    `Economia na maior largura: ${(savedBytes / 1024 / 1024).toFixed(1)} MB`,
);
