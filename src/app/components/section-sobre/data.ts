import imgPalestra from "@/assets/a375c45d2716fbbea43385fdee4485566a41cfa6.png";
import imgScrubsGreen from "@/assets/1237b2795956579d89da3b7db4b78c58db67e687.png";

// Fotos reais do cliente (public/v4/photos), referenciadas por path.
// As antigas e25b (Dr. em escritório, gerada) e 6c18 (cirurgião de banco de
// imagens) foram trocadas por fotografias reais do Dr.
const imgAtuacao = "/v4/photos/retrato-sentado.jpg";
const imgConsultorio = "/v4/photos/contato-portrait.jpg";

// Canvas do trilho horizontal. 4 colunas (foto grande + legenda), fotos e
// textos ampliados. Altura mantida para preservar a escala.
export const CANVAS_W = 3520;
export const CANVAS_H = 1299;

// Valores agora são CHAVES i18n (namespace "home") — o texto vive em
// locales/<locale>/home.json e é resolvido com t() no render (parts.tsx),
// porque este módulo roda fora do React (sem acesso a hook).
export const texts = {
  hospitals: "home.sobre.texts.hospitals",
  coordination: "home.sobre.texts.coordination",
  publications: "home.sobre.texts.publications",
  // Legenda PROVISÓRIA — confirmar/ajustar com o cliente.
  surgery: "home.sobre.texts.surgery",
};

// ── Geometria do grid ──────────────────────────────────────────────
// Cada coluna = uma foto grande (em cima) + uma legenda (embaixo).
const COL_W = 640;
const COL_GAP = 72;
const PHOTO_Y = 140;
const PHOTO_H = 720;
const TEXT_Y = PHOTO_Y + PHOTO_H + 44; // 904
const GRID_X0 = 620; // depois do header

const cols = [
  GRID_X0,
  GRID_X0 + (COL_W + COL_GAP) * 1,
  GRID_X0 + (COL_W + COL_GAP) * 2,
  GRID_X0 + (COL_W + COL_GAP) * 3,
];

export const HEADER = { x: 84, eyebrowY: 440, titleY: 480, w: 460 };

export type ImageCell = {
  kind: "image";
  x: number;
  y: number;
  w: number;
  h: number;
  src: string;
  alt: string;
  objectPosition?: string;
};

export type CaptionCell = {
  kind: "caption";
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  text: string;
};

export type Cell = ImageCell | CaptionCell;

const TEXT_H = CANVAS_H - TEXT_Y - 60; // altura disponível p/ a legenda

// Cada coluna é um par foto + texto. label/alt/text guardam CHAVES i18n
// (namespace "home"); parts.tsx resolve com t() no render.
export const cells: Cell[] = [
  // Col 1 — Retrato profissional / Atuação Profissional
  { kind: "image", x: cols[0], y: PHOTO_Y, w: COL_W, h: PHOTO_H, src: imgAtuacao, alt: "home.sobre.alts.retrato", objectPosition: "50% 8%" },
  { kind: "caption", x: cols[0], y: TEXT_Y, w: COL_W, h: TEXT_H, label: "home.sobre.labels.atuacao", text: texts.hospitals },

  // Col 2 — Palestra / Coordenação
  { kind: "image", x: cols[1], y: PHOTO_Y, w: COL_W, h: PHOTO_H, src: imgPalestra, alt: "home.sobre.alts.palestra" },
  { kind: "caption", x: cols[1], y: TEXT_Y, w: COL_W, h: TEXT_H, label: "home.sobre.labels.coordenacao", text: texts.coordination },

  // Col 3 — Centro cirúrgico / Atuação cirúrgica
  { kind: "image", x: cols[2], y: PHOTO_Y, w: COL_W, h: PHOTO_H, src: imgScrubsGreen, alt: "home.sobre.alts.cirurgia" },
  { kind: "caption", x: cols[2], y: TEXT_Y, w: COL_W, h: TEXT_H, label: "home.sobre.labels.cirurgica", text: texts.surgery },

  // Col 4 — Consultório / Publicações
  { kind: "image", x: cols[3], y: PHOTO_Y, w: COL_W, h: PHOTO_H, src: imgConsultorio, alt: "home.sobre.alts.consultorio" },
  { kind: "caption", x: cols[3], y: TEXT_Y, w: COL_W, h: TEXT_H, label: "home.sobre.labels.publicacoes", text: texts.publications },
];
