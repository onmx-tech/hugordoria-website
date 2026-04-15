import type { ReactNode, CSSProperties } from "react";
import { imageFrames, lineSpecs, texts } from "./data";

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
  x, y, w, h, src, alt, imgLeft, imgTop, imgWidth, imgHeight,
}: {
  x: number; y: number; w: number; h: number;
  src: string; alt: string;
  imgLeft: number; imgTop: number; imgWidth: number; imgHeight: number;
}) {
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
        className="absolute block max-w-none select-none object-cover"
        style={{ left: imgLeft, top: imgTop, width: imgWidth, height: imgHeight }}
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
          color: "#FFFFFF",
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
          color: "rgba(255, 255, 255, 0.7)",
          margin: 0,
        }}
      >
        {children}
      </p>
    </Box>
  );
}

export function SobreContent() {
  return (
    <>
      {/* Eyebrow top-left */}
      <Box x={84} y={124} w={160} h={18}>
        <span
          className="absolute inset-0 flex items-center whitespace-nowrap"
          style={{
            fontFamily: "'Geist', sans-serif",
            fontWeight: 400,
            fontSize: 14,
            lineHeight: 1.3,
            color: "#D9D3CA",
          }}
        >
          MD PhD - Neurocirurgião
        </span>
      </Box>

      {/* Title */}
      <Box x={84} y={175} w={353} h={80}>
        <h2
          style={{
            fontFamily: "'Arimo', sans-serif",
            fontWeight: 400,
            fontSize: 36,
            lineHeight: 1.18,
            letterSpacing: "-0.02em",
            color: "#FFFFFF",
            margin: 0,
          }}
        >
          Especialista em Neurocirurgia Vascular
        </h2>
      </Box>

      {imageFrames.map((frame, i) => (
        <ImageFrame key={i} {...frame} />
      ))}

      {lineSpecs.map((line, i) => (
        <Line key={i} {...line} />
      ))}

      {/* Col 1 bottom labels */}
      <Label x={72} y={1060} w={175} h={15}>Atuação Profissional</Label>
      <Caption x={387} y={1060} w={374} h={78}>{texts.hospitals}</Caption>

      {/* Col 2 mid Coord */}
      <Label x={1144} y={412} w={227} h={15}>Coordenação e Liderança:</Label>
      <Caption x={1144} y={456} w={352} h={78}>{texts.coordination}</Caption>

      {/* Col 3 mid Coord */}
      <Label x={2417} y={412} w={226} h={15}>Coordenação e Liderança:</Label>
      <Caption x={2417} y={456} w={352} h={78}>{texts.coordination}</Caption>

      {/* Col 2 bottom Atuação */}
      <Label x={1593} y={1072} w={175} h={15}>Atuação Profissional</Label>
      <Caption x={1593} y={1116} w={500} h={104}>{texts.publicationsA}</Caption>

      {/* Col 3 bottom Atuação */}
      <Label x={2866} y={1072} w={175} h={15}>Atuação Profissional</Label>
      <Caption x={2866} y={1116} w={500} h={104}>{texts.publicationsB}</Caption>
    </>
  );
}
