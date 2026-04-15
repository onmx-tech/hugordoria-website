import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";

import imgMedicalRoom from "@/assets/e25bc4f66b4a426ccf342bc9c87ec2d3e73f4b1a.png";
import imgVideo from "@/assets/a375c45d2716fbbea43385fdee4485566a41cfa6.png";
import imgConference from "@/assets/b07dcf44e39fe46f52ddf687bc20067c3cbe5ad0.png";
import imgScrubsBlue from "@/assets/6c18cf7f306c9df025d6a7f74b408d318276b82c.png";
import imgScrubsGreen from "@/assets/1237b2795956579d89da3b7db4b78c58db67e687.png";

const CANVAS_W = 3366;
const CANVAS_H = 1299;

const HOSPITALS =
  "Neurocirurgião em hospitais renomados como BP, Santa Catarina, Albert Einstein e Sírio Libanês.";
const PUBLICATIONS_A =
  "Extensa lista de publicações em revistas renomadas internacionais e nacionais, revisor de periódicos importantes e formador de opnião pela vasta experiência de 20 anos na área neurocirurgica.";
const PUBLICATIONS_B =
  "Extensa lista de publicações em revistas renomadas internacionais e nacionais, revisor de periódicos importantes e formador vasta experiência de 20 anos na área neurocirurgica.";
const COORDINATION =
  "Coordenador do Departamento de Neurocirurgia Vascular da Sociedade Brasileira de Neurocirurgia.";

function Box({
  x,
  y,
  w,
  h,
  children,
  className,
  style,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
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

function ImageFrame({
  x,
  y,
  w,
  h,
  src,
  alt,
  imgLeft,
  imgTop,
  imgWidth,
  imgHeight,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  src: string;
  alt: string;
  imgLeft: number;
  imgTop: number;
  imgWidth: number;
  imgHeight: number;
}) {
  return (
    <div
      className="absolute overflow-hidden"
      style={{
        left: x,
        top: y,
        width: w,
        height: h,
        backgroundColor: "rgba(255, 255, 255, 0.09)",
      }}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="absolute block max-w-none select-none object-cover"
        style={{
          left: imgLeft,
          top: imgTop,
          width: imgWidth,
          height: imgHeight,
        }}
      />
    </div>
  );
}

function Line({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <div
      className="absolute"
      style={{
        left: x,
        top: y,
        width: w,
        height: 1,
        backgroundColor: "rgba(255, 255, 255, 0.24)",
      }}
    />
  );
}

function Eyebrow({
  x,
  y,
  w,
  h,
  children,
  family = "Arimo",
  fontSize = 20,
  lineHeight = 0.73,
  color = "#FFFFFF",
  letterSpacing = "-0.02em",
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  children: React.ReactNode;
  family?: string;
  fontSize?: number;
  lineHeight?: number;
  color?: string;
  letterSpacing?: string;
}) {
  return (
    <Box x={x} y={y} w={w} h={h}>
      <span
        className="absolute inset-0 flex items-center whitespace-nowrap"
        style={{
          fontFamily: `'${family}', sans-serif`,
          fontWeight: 400,
          fontSize,
          lineHeight,
          letterSpacing,
          color,
        }}
      >
        {children}
      </span>
    </Box>
  );
}

function Caption({
  x,
  y,
  w,
  h,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  children: React.ReactNode;
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

export default function SectionSobre() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const getScale = () => window.innerHeight / CANVAS_H;
    const applyScale = () => {
      gsap.set(track, { scale: getScale(), transformOrigin: "top left" });
    };
    applyScale();

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const getDistance = () =>
        Math.max(0, CANVAS_W * getScale() - window.innerWidth);

      gsap.to(track, {
        x: () => `-${getDistance()}`,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    });

    window.addEventListener("resize", applyScale);
    return () => {
      window.removeEventListener("resize", applyScale);
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full lg:overflow-hidden overflow-x-auto overflow-y-hidden"
      style={{ height: "100vh", backgroundColor: "#1A293F" }}
      data-section="sobre"
    >
      <div
        ref={trackRef}
        className="absolute left-0 top-0 will-change-transform"
        style={{ width: CANVAS_W, height: CANVAS_H }}
      >
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

          {/* ── Col 1: Big medical room image ───────────────────── */}
          <ImageFrame
            x={72}
            y={378}
            w={689}
            h={621}
            src={imgMedicalRoom}
            alt="Consultório"
            imgLeft={(689 - 822) / 2 - 47.5}
            imgTop={-224}
            imgWidth={822}
            imgHeight={1031}
          />

          {/* ── Col 2 top: Lecture image ─────────────────────────── */}
          <ImageFrame
            x={1144}
            y={107}
            w={352}
            h={252}
            src={imgVideo}
            alt="Palestra"
            imgLeft={(352 - 409) / 2 + 0.5}
            imgTop={(252 - 294) / 2}
            imgWidth={409}
            imgHeight={294}
          />

          {/* ── Col 3 top: Lecture image (repeat) ────────────────── */}
          <ImageFrame
            x={2417}
            y={107}
            w={352}
            h={252}
            src={imgVideo}
            alt="Palestra"
            imgLeft={(352 - 409) / 2 + 0.5}
            imgTop={(252 - 294) / 2}
            imgWidth={409}
            imgHeight={294}
          />

          {/* ── Col 2 mid: Conference square ─────────────────────── */}
          <ImageFrame
            x={1744}
            y={269}
            w={239}
            h={218}
            src={imgConference}
            alt="Congresso"
            imgLeft={-42}
            imgTop={109 - 181 - 27}
            imgWidth={239 + 42 + 78}
            imgHeight={362}
          />

          {/* ── Col 3 mid: Conference square (repeat) ────────────── */}
          <ImageFrame
            x={3017}
            y={269}
            w={239}
            h={218}
            src={imgConference}
            alt="Congresso"
            imgLeft={-42}
            imgTop={109 - 181 - 27}
            imgWidth={239 + 42 + 78}
            imgHeight={362}
          />

          {/* ── Col 2 bottom: Scrubs blue ───────────────────────── */}
          <ImageFrame
            x={917}
            y={716}
            w={500}
            h={422}
            src={imgScrubsBlue}
            alt="Dr. Hugo Doria em ambiente cirúrgico"
            imgLeft={-284}
            imgTop={0}
            imgWidth={1068}
            imgHeight={611}
          />

          {/* ── Col 3 bottom: Scrubs blue (repeat) ──────────────── */}
          <ImageFrame
            x={2233}
            y={670}
            w={401}
            h={468}
            src={imgScrubsBlue}
            alt="Dr. Hugo Doria em ambiente cirúrgico"
            imgLeft={-227.77}
            imgTop={0}
            imgWidth={856.54}
            imgHeight={489.54}
          />

          {/* ── Image 10 (green scrubs) frames ──────────────────── */}
          <ImageFrame
            x={1593}
            y={693}
            w={375}
            h={306}
            src={imgScrubsGreen}
            alt="Dr. Hugo Doria"
            imgLeft={(375 - 404) / 2 - 14.5}
            imgTop={-23}
            imgWidth={404}
            imgHeight={488}
          />
          <ImageFrame
            x={2866}
            y={693}
            w={375}
            h={306}
            src={imgScrubsGreen}
            alt="Dr. Hugo Doria"
            imgLeft={(375 - 404) / 2 - 14.5}
            imgTop={-23}
            imgWidth={404}
            imgHeight={488}
          />

          {/* ── Dividers ─────────────────────────────────────────── */}
          {/* Line 98 — col 1 */}
          <Line x={72} y={1031} w={689} />
          {/* Line 101 — col 2 bottom */}
          <Line x={1593} y={1043} w={500} />
          {/* Line 103 — col 3 bottom */}
          <Line x={2866} y={1043} w={500} />
          {/* Line 102 — col 2 mid (Coord) */}
          <Line x={1144} y={383} w={352} />
          {/* Line 104 — col 3 mid (Coord) */}
          <Line x={2417} y={383} w={352} />

          {/* ── Col 1 bottom labels ──────────────────────────────── */}
          <Eyebrow x={72} y={1060} w={175} h={15}>
            Atuação Profissional
          </Eyebrow>
          <Caption x={387} y={1060} w={374} h={78}>
            {HOSPITALS}
          </Caption>

          {/* ── Col 2 mid (Coord) ────────────────────────────────── */}
          <Eyebrow x={1144} y={412} w={227} h={15}>
            Coordenação e Liderança:
          </Eyebrow>
          <Caption x={1144} y={456} w={352} h={78}>
            {COORDINATION}
          </Caption>

          {/* ── Col 3 mid (Coord) ────────────────────────────────── */}
          <Eyebrow x={2417} y={412} w={226} h={15}>
            Coordenação e Liderança:
          </Eyebrow>
          <Caption x={2417} y={456} w={352} h={78}>
            {COORDINATION}
          </Caption>

          {/* ── Col 2 bottom (Atuação Profissional) ──────────────── */}
          <Eyebrow x={1593} y={1072} w={175} h={15}>
            Atuação Profissional
          </Eyebrow>
          <Caption x={1593} y={1116} w={500} h={104}>
            {PUBLICATIONS_A}
          </Caption>

          {/* ── Col 3 bottom (Atuação Profissional) ──────────────── */}
          <Eyebrow x={2866} y={1072} w={175} h={15}>
            Atuação Profissional
          </Eyebrow>
          <Caption x={2866} y={1116} w={500} h={104}>
            {PUBLICATIONS_B}
          </Caption>
      </div>
    </section>
  );
}
