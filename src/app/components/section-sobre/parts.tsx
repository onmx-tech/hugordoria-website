import type { ReactNode, CSSProperties } from "react";
import { cells, texts, HEADER } from "./data";
import imgVideo from "@/assets/a375c45d2716fbbea43385fdee4485566a41cfa6.png";
import imgScrubsGreen from "@/assets/1237b2795956579d89da3b7db4b78c58db67e687.png";

// Fotos reais do cliente (public/v4/photos) — substituem as imagens geradas.
const imgAtuacao = "/v4/photos/retrato-casual.jpg";
const imgConsultorio = "/v4/photos/contato-portrait.jpg";

export function Box({
  x, y, w, h, children, className, style,
}: {
  x: number; y: number; w: number; h: number;
  children?: ReactNode; className?: string; style?: CSSProperties;
}) {
  return (
    <div
      className={`absolute ${className ?? ""}`}
      style={{ left: x, top: y, width: w, height: h, ...style }}
    >
      {children}
    </div>
  );
}

export function ImageFrame({
  x, y, w, h, src, alt,
}: {
  x: number; y: number; w: number; h: number;
  src: string; alt: string;
}) {
  // object-cover centralizado. A imagem interna tem overscan (120% de largura,
  // left -10%) para que o parallax horizontal (±6%) nunca exponha as bordas.
  return (
    <div
      className="absolute overflow-hidden"
      style={{
        left: x, top: y, width: w, height: h,
        backgroundColor: "rgba(255, 255, 255, 0.09)",
      }}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="absolute top-0 block max-w-none select-none object-cover"
        style={{ left: "-10%", width: "120%", height: "100%" }}
      />
    </div>
  );
}

export function Line({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <div
      className="absolute"
      style={{
        left: x, top: y, width: w, height: 1,
        backgroundColor: "rgba(255, 255, 255, 0.24)",
      }}
    />
  );
}

export function Label({
  x, y, w, h, children,
}: {
  x: number; y: number; w: number; h: number; children: ReactNode;
}) {
  return (
    <Box x={x} y={y} w={w} h={h}>
      <span
        className="absolute inset-0 flex items-center whitespace-nowrap"
        style={{
          fontFamily: "'Arimo', sans-serif",
          fontWeight: 400,
          fontSize: 20,
          lineHeight: 0.73,
          letterSpacing: "-0.02em",
          color: "var(--color-accent-gold-light)",
        }}
      >
        {children}
      </span>
    </Box>
  );
}

export function Caption({
  x, y, w, h, children,
}: {
  x: number; y: number; w: number; h: number; children: ReactNode;
}) {
  return (
    <Box x={x} y={y} w={w} h={h}>
      <p
        style={{
          fontFamily: "'Arimo', sans-serif",
          fontWeight: 400,
          fontSize: 20,
          lineHeight: 1.32,
          color: "color-mix(in srgb, var(--color-bg-cream) 70%, transparent)",
          margin: 0,
        }}
      >
        {children}
      </p>
    </Box>
  );
}

function CaptionCell({
  x, y, w, h, label, text,
}: {
  x: number; y: number; w: number; h: number; label: string; text: string;
}) {
  // Legenda alinhada ao topo da célula (logo abaixo da foto da linha de cima),
  // com uma linha dourada de divisão para amarrar ao grid.
  return (
    <Box x={x} y={y} w={w} h={h}>
      <div className="flex flex-col gap-5 pt-1">
        <div
          style={{ height: 1, width: "100%", backgroundColor: "rgba(255, 255, 255, 0.24)" }}
        />
        <span
          className="whitespace-nowrap"
          style={{
            fontFamily: "'Arimo', sans-serif",
            fontWeight: 400,
            fontSize: 24,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: "var(--color-accent-gold-light)",
          }}
        >
          {label}
        </span>
        <p
          style={{
            fontFamily: "'Arimo', sans-serif",
            fontWeight: 400,
            fontSize: 26,
            lineHeight: 1.38,
            color: "color-mix(in srgb, var(--color-bg-cream) 72%, transparent)",
            margin: 0,
          }}
        >
          {text}
        </p>
      </div>
    </Box>
  );
}

export function SobreContent() {
  return (
    <>
      {/* Header fixo à esquerda */}
      <Box x={HEADER.x} y={HEADER.eyebrowY} w={HEADER.w} h={18}>
        <span
          className="absolute inset-0 flex items-center whitespace-nowrap"
          style={{
            fontFamily: "'Geist', sans-serif",
            fontWeight: 400,
            fontSize: 14,
            lineHeight: 1.3,
            color: "var(--color-text-muted)",
          }}
        >
          MD PhD - Neurocirurgião
        </span>
      </Box>

      <Box x={HEADER.x} y={HEADER.titleY} w={HEADER.w} h={160}>
        <h2
          style={{
            fontFamily: "'Arimo', sans-serif",
            fontWeight: 400,
            fontSize: 46,
            lineHeight: 1.16,
            letterSpacing: "-0.02em",
            color: "var(--color-bg-cream)",
            margin: 0,
          }}
        >
          Especialista em Neurocirurgia Vascular
        </h2>
      </Box>

      {/* Grid de fotos + legendas (2 linhas × 4 colunas, alinhado) */}
      {cells.map((cell, i) =>
        cell.kind === "image" ? (
          <ImageFrame key={i} x={cell.x} y={cell.y} w={cell.w} h={cell.h} src={cell.src} alt={cell.alt} />
        ) : (
          <CaptionCell key={i} x={cell.x} y={cell.y} w={cell.w} h={cell.h} label={cell.label} text={cell.text} />
        )
      )}
    </>
  );
}

function MobileLabel({ children }: { children: ReactNode }) {
  return (
    <span
      className="block uppercase tracking-[0.04em]"
      style={{
        fontFamily: "'Arimo', sans-serif",
        fontWeight: 400,
        fontSize: 14,
        lineHeight: 1.2,
        letterSpacing: "-0.01em",
        color: "var(--color-accent-gold-light)",
      }}
    >
      {children}
    </span>
  );
}

function MobileCaption({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "'Arimo', sans-serif",
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 1.4,
        color: "color-mix(in srgb, var(--color-bg-cream) 75%, transparent)",
        margin: 0,
      }}
    >
      {children}
    </p>
  );
}

function MobileFrame({
  src,
  alt,
  ratio = "4 / 3",
  objectPosition = "center",
}: {
  src: string;
  alt: string;
  ratio?: string;
  objectPosition?: string;
}) {
  return (
    <div
      className="w-full overflow-hidden"
      style={{ aspectRatio: ratio, backgroundColor: "rgba(255, 255, 255, 0.06)" }}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="block h-full w-full select-none object-cover"
        style={{ objectPosition }}
      />
    </div>
  );
}

export function SobreContentMobile() {
  return (
    <div className="flex flex-col gap-10 px-6 py-16">
      <header className="flex flex-col gap-4">
        <span
          className="uppercase tracking-[0.06em]"
          style={{
            fontFamily: "'Geist', sans-serif",
            fontWeight: 400,
            fontSize: 12,
            lineHeight: 1.3,
            color: "var(--color-text-muted)",
          }}
        >
          MD PhD — Neurocirurgião
        </span>
        <h2
          style={{
            fontFamily: "'Arimo', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(28px, 8vw, 36px)",
            lineHeight: 1.18,
            letterSpacing: "-0.02em",
            color: "var(--color-bg-cream)",
            margin: 0,
          }}
        >
          Especialista em Neurocirurgia Vascular
        </h2>
      </header>

      <MobileFrame
        src={imgAtuacao}
        alt="Dr. Hugo Doria"
        ratio="4 / 5"
        objectPosition="50% 12%"
      />

      <section className="flex flex-col gap-3">
        <MobileLabel>Atuação Profissional</MobileLabel>
        <MobileCaption>{texts.hospitals}</MobileCaption>
      </section>

      <MobileFrame src={imgVideo} alt="Palestra" ratio="16 / 11" />

      <section className="flex flex-col gap-3">
        <MobileLabel>Coordenação e Liderança</MobileLabel>
        <MobileCaption>{texts.coordination}</MobileCaption>
      </section>

      <MobileFrame
        src={imgConsultorio}
        alt="Dr. Hugo Doria em seu consultório"
        ratio="4 / 5"
      />

      <section className="flex flex-col gap-3">
        <MobileLabel>Publicações & Pesquisa</MobileLabel>
        <MobileCaption>{texts.publicationsA}</MobileCaption>
      </section>

      <MobileFrame src={imgScrubsGreen} alt="Dr. Hugo Doria" ratio="4 / 5" />
    </div>
  );
}
