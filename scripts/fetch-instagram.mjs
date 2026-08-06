// Puxa as últimas postagens do Instagram NA BUILD, não no navegador.
//
// Por que assim: o carrossel pedido na reunião de 06/08 existia no WordPress
// através de um script de terceiro. Aqui isso não pode: a home é
// pré-renderizada e serve 1 MB com PageSpeed 100 — um widget externo traz
// script, iframe e requisições a outro domínio, e devolve o desempenho ao
// patamar de antes. Buscando na build, a página recebe imagem local e nada
// mais. E a API oficial (Basic Display) foi desligada em dez/2024: o caminho
// vivo é a Graph API com conta Business/Creator vinculada a uma página.
//
// COMO LIGAR:
//   1. conta do Dr. como Business/Creator, vinculada a uma página do Facebook;
//   2. gerar um token de longa duração (60 dias) no app do Meta;
//   3. exportar antes da build:
//        IG_TOKEN=... IG_USER_ID=... npm run build
//
// ⚠️ O token EXPIRA em 60 dias. Sem renovação a build não quebra — o script
// apenas não atualiza e a seção continua mostrando as últimas fotos baixadas.
// Falhar silencioso é de propósito: publicação de site não pode depender de
// um token de rede social estar vivo.
//
// Sem IG_TOKEN o script não faz nada, e a seção não aparece no site.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DESTINO_JSON = path.join(raiz, "src/app/content/instagram.json");
const DESTINO_IMG = path.join(raiz, "public/instagram");
const LIMITE = 8;

const token = process.env.IG_TOKEN;
const userId = process.env.IG_USER_ID;

if (!token || !userId) {
  console.log("[instagram] IG_TOKEN/IG_USER_ID ausentes — mantendo o que já está no JSON.");
  process.exit(0);
}

const campos = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
const url = `https://graph.facebook.com/v21.0/${userId}/media?fields=${campos}&limit=${LIMITE}&access_token=${token}`;

try {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${r.status} ${await r.text()}`);
  const { data } = await r.json();

  fs.mkdirSync(DESTINO_IMG, { recursive: true });
  const posts = [];

  for (const p of data) {
    // Vídeo do Instagram entra pela thumbnail: o arquivo de vídeo tem URL
    // assinada que expira, então baixá-lo não adiantaria.
    const origem = p.media_type === "VIDEO" ? p.thumbnail_url : p.media_url;
    if (!origem) continue;
    const arquivo = `${p.id}.jpg`;
    const bytes = Buffer.from(await (await fetch(origem)).arrayBuffer());
    fs.writeFileSync(path.join(DESTINO_IMG, arquivo), bytes);
    posts.push({
      id: p.id,
      imagem: `/instagram/${arquivo}`,
      permalink: p.permalink,
      // Legenda entra só como texto alternativo, cortada: no card ela seria
      // ruído, e sem alt a imagem fica muda para leitor de tela.
      legenda: (p.caption || "").split("\n")[0].slice(0, 120),
      video: p.media_type === "VIDEO",
    });
  }

  fs.writeFileSync(
    DESTINO_JSON,
    JSON.stringify({ atualizadoEm: new Date().toISOString().slice(0, 10), posts }, null, 2) + "\n",
  );
  console.log(`[instagram] ${posts.length} postagens salvas.`);
} catch (e) {
  console.warn("[instagram] falhou, seguindo com o JSON atual:", e.message);
}
