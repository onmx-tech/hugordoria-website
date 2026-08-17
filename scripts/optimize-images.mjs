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
import { readdir, stat, mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIRS = [
  "public/v4/procedimentos",
  "public/v4/photos",
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
// Proporção de cada asset, para o <img> reservar o espaço antes de a imagem
// chegar. Sem isso o conteúdo abaixo salta quando cada foto carrega — que é o
// que gera CLS. O sharp já abre todo arquivo aqui para gerar os WebP, então a
// medida sai de graça; deduzir dimensão à mão em ~20 componentes é que seria
// caro e ficaria errado no primeiro asset trocado.
const dimensoes = {};

for (const dir of DIRS) {
  const abs = path.join(ROOT, dir);
  if (!existsSync(abs)) continue;
  await mkdir(abs, { recursive: true });

  const files = (await readdir(abs)).filter((f) => SOURCE_RE.test(f));
  for (const file of files) {
    const src = path.join(abs, file);
    const base = file.replace(SOURCE_RE, "");
    const meta = await sharp(src).metadata();

    if (meta.width && meta.height) {
      // Chave = path público do original, igual ao que os componentes passam
      // para responsiveImg(). Ex.: "/v4/photos/sobre-portrait.jpg".
      const chave = "/" + path.relative(path.join(ROOT, "public"), src).split(path.sep).join("/");
      dimensoes[chave] = [meta.width, meta.height];
    }

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

// A sequência de frames da home (public/sequence) é outro bicho: são 122 JPGs
// que o GSAP troca durante o scroll, e o navegador precisa DECODIFICAR cada um
// em tempo de rolagem. O gargalo relatado ("travando um pouco" no celular) é de
// decode, não de banda — por isso a saída não é vídeo (scrub de <video> no
// Safari do iPhone é pior, e foi para fugir disso que a sequência existe), e sim
// um formato mais leve para decodificar. Mesmos pixels, arquivo menor.
{
  const dir = path.join(ROOT, "public/sequence");
  if (existsSync(dir)) {
    const frames = (await readdir(dir)).filter((f) => /\.jpe?g$/i.test(f));
    let convertidos = 0;
    let antes = 0;
    let depois = 0;
    for (const file of frames) {
      const src = path.join(dir, file);
      const out = path.join(dir, file.replace(/\.jpe?g$/i, ".webp"));
      antes += (await stat(src)).size;
      if (!(await newerThan(src, out))) {
        depois += (await stat(out)).size;
        continue;
      }
      const info = await sharp(src).webp({ quality: 80 }).toFile(out);
      depois += info.size;
      convertidos++;
    }
    if (frames.length) {
      console.log(
        `[sequence] ${frames.length} frames, ${convertidos} convertidos agora. ` +
          `${(antes / 1048576).toFixed(1)} MB → ${(depois / 1048576).toFixed(1)} MB`,
      );
    }
  }
}

// Gerado, nunca editado à mão — mesma regra do sitemap.
await writeFile(
  path.join(ROOT, "src/lib/img-dimensions.json"),
  JSON.stringify(dimensoes, null, 2) + "\n",
);

console.log(
  `[images] ${made} webp gerados, ${skipped} em dia, ` +
    `${Object.keys(dimensoes).length} dimensões mapeadas. ` +
    `Economia na maior largura: ${(savedBytes / 1024 / 1024).toFixed(1)} MB`,
);
