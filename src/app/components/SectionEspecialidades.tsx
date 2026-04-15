import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "../../lib/gsap";
import svgPaths from "../../imports/svg-nx92b0rij3";

const CANVAS_H = 1052;
const HEADER_W = 1896;

// Card footprint + stagger
const CARD_W = 513;
const CARD_H = 509;
const CARD_START_X = 64;
const CARD_STEP_X = 547;
const CARD_Y_UP = 354;
const CARD_Y_DOWN = 464;
const END_PADDING = 80;

type CardData = {
  title: string;
  description: string;
  icon: ReactNode;
};

const stroke = {
  stroke: "#B78E30",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  strokeWidth: 2,
  fill: "none",
};
const strokeThin = { ...stroke, strokeWidth: 1.5 };

function IconSchwannoma() {
  return (
    <svg viewBox="0 0 48 48" width={48} height={48} fill="none" aria-hidden="true">
      <path d={svgPaths.p35d2d4c0} {...stroke} />
      <path d={svgPaths.p1888b00} {...stroke} />
    </svg>
  );
}

function IconAneurisma() {
  return (
    <svg viewBox="0 0 48 48" width={48} height={48} fill="none" aria-hidden="true">
      <path d={svgPaths.p11260970} {...strokeThin} />
    </svg>
  );
}

function IconMAV() {
  return (
    <svg viewBox="0 0 48 48" width={48} height={48} fill="none" aria-hidden="true">
      <path d="M12 6V30" {...stroke} />
      <path d={svgPaths.p3790d380} {...stroke} />
      <path d={svgPaths.p211045b0} {...stroke} />
      <path d={svgPaths.p100365c0} {...stroke} />
    </svg>
  );
}

function IconTumor() {
  return (
    <svg viewBox="0 0 48 48" width={48} height={48} fill="none" aria-hidden="true">
      <path d={svgPaths.p14c86900} {...stroke} />
      <path d={svgPaths.p342dea00} {...stroke} />
      <path d={svgPaths.p178ef400} {...stroke} />
      <path d={svgPaths.p33923780} {...stroke} />
      <path d={svgPaths.p31a60900} {...stroke} />
      <path d={svgPaths.pd7f3b40} {...stroke} />
      <path d={svgPaths.p2c0983c0} {...stroke} />
      <path d={svgPaths.pcd66900} {...stroke} />
      <path d={svgPaths.p246e8ba0} {...stroke} />
    </svg>
  );
}

const cards: CardData[] = [
  {
    icon: <IconSchwannoma />,
    title: "Schwannoma Vestibular",
    description:
      "O schwannoma vestibular (SV) é um tumor benigno do nervo vestibulococlear.",
  },
  {
    icon: <IconAneurisma />,
    title: "Aneurisma Cerebral",
    description:
      "Os aneurismas cerebrais são dilatações anormais nas paredes das artérias cerebrais.",
  },
  {
    icon: <IconMAV />,
    title: "MAVs",
    description:
      "As malformações arteriovenosas (MAVs) são conexões anormais entre artérias e veias cerebrais.",
  },
  {
    icon: <IconTumor />,
    title: "Tumores Cerebrais",
    description:
      "A neuralgia do trigêmio é uma dor intensa e episódica em um lado da face.",
  },
  {
    icon: <IconSchwannoma />,
    title: "Doença de Moyamoya",
    description:
      "Tratamento da doença rara com estreitamento progressivo das artérias cerebrais via revascularização.",
  },
  {
    icon: <IconAneurisma />,
    title: "Neuralgia do Trigêmeo",
    description:
      "Dor facial episódica tratada por descompressão microvascular ou radiocirurgia estereotáxica.",
  },
  {
    icon: <IconMAV />,
    title: "Espasmo Hemifacial",
    description:
      "Contrações involuntárias da musculatura facial tratadas por descompressão microvascular do nervo facial.",
  },
  {
    icon: <IconTumor />,
    title: "Revascularização Cerebral",
    description:
      "Bypass cerebral para restaurar o fluxo sanguíneo em casos de isquemia crônica e doenças oclusivas.",
  },
  {
    icon: <IconAneurisma />,
    title: "Tumores Hipofisários",
    description:
      "Remoção de adenomas hipofisários por via endoscópica endonasal, preservando a função glandular.",
  },
];

const TRACK_W =
  CARD_START_X + (cards.length - 1) * CARD_STEP_X + CARD_W + END_PADDING;

function CardArrow() {
  return (
    <svg viewBox="0 0 24 24" width={24} height={24} fill="none" aria-hidden="true">
      <path d="M19 12H5" stroke="#C5A471" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
      <path d="M14 17L19 12" stroke="#C5A471" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
      <path d="M14 7L19 12" stroke="#C5A471" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
    </svg>
  );
}

function Card({ x, y, card }: { x: number; y: number; card: CardData }) {
  return (
    <article
      className="absolute flex flex-col items-start justify-between"
      data-card
      style={{
        left: x,
        top: y,
        width: CARD_W,
        height: CARD_H,
        padding: 32,
        gap: 24,
        backgroundColor: "rgba(255, 255, 255, 0.07)",
        transition:
          "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.45s ease",
        willChange: "transform",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-10px)";
        (e.currentTarget as HTMLElement).style.backgroundColor =
          "rgba(255, 255, 255, 0.1)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.backgroundColor =
          "rgba(255, 255, 255, 0.07)";
      }}
    >
      <div style={{ width: 48, height: 48 }}>{card.icon}</div>

      <div
        className="flex flex-col"
        style={{ width: 449, height: 174, gap: 64 }}
      >
        <div className="flex flex-col" style={{ width: 449, gap: 8 }}>
          <p
            className="font-['Geist',sans-serif]"
            style={{
              margin: 0,
              fontWeight: 400,
              fontSize: 20,
              lineHeight: 1.5,
              color: "#ffffff",
            }}
          >
            {card.title}
          </p>
          <p
            className="font-['Geist',sans-serif]"
            style={{
              margin: 0,
              fontWeight: 400,
              fontSize: 16,
              lineHeight: 1.5,
              color: "rgba(255, 255, 255, 0.7)",
            }}
          >
            {card.description}
          </p>
        </div>

        <button
          type="button"
          className="flex items-center"
          style={{
            gap: 8,
            padding: 0,
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <span
            className="font-['Geist',sans-serif]"
            style={{
              fontWeight: 600,
              fontSize: 14,
              lineHeight: "18px",
              color: "#ffffff",
            }}
          >
            Saiba mais
          </span>
          <CardArrow />
        </button>
      </div>
    </article>
  );
}

function Header() {
  return (
    <div
      className="pointer-events-none absolute left-0 top-0 z-10"
      style={{ width: HEADER_W, height: CANVAS_H }}
    >
      {/* Top divider — Line 103 */}
      <div
        className="absolute"
        style={{
          left: 64,
          top: 32,
          width: 1766,
          height: 1,
          backgroundColor: "rgba(255, 255, 255, 0.24)",
        }}
      />

      {/* Eyebrow */}
      <span
        className="absolute font-['Geist',sans-serif] flex items-center"
        style={{
          left: 72,
          top: 79,
          width: 165,
          height: 18,
          fontWeight: 400,
          fontSize: 14,
          lineHeight: 1.3,
          color: "#D9D3CA",
        }}
      >
        Serviços de Neurocirurgia
      </span>

      {/* Title */}
      <h2
        className="absolute font-['Arimo',sans-serif]"
        style={{
          left: 72,
          top: 130,
          width: 427 - 72,
          margin: 0,
          fontWeight: 400,
          fontSize: 36,
          lineHeight: 1.18,
          letterSpacing: "-0.02em",
          color: "#ffffff",
        }}
      >
        Minhas Especialidades
      </h2>

      {/* Description — right side */}
      <p
        className="absolute font-['Arimo',sans-serif]"
        style={{
          left: 1155,
          top: 97,
          width: 671,
          margin: 0,
          fontWeight: 400,
          fontSize: 20,
          lineHeight: 1.32,
          color: "rgba(255, 255, 255, 0.7)",
        }}
      >
        Dr. Hugo Doria oferece tratamentos avançados em neurocirurgia, incluindo
        aneurismas cerebrais, malformações arteriovenosas, tumores cerebrais e
        medulares, doença de Moyamoya, neuralgia do trigêmeo, espasmo
        hemifacial e revascularização cerebral.
      </p>
    </div>
  );
}

export default function SectionEspecialidades() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const headerWrap = headerWrapRef.current;
    if (!section || !track || !headerWrap) return;

    const ctx = gsap.context(() => {
      const getScale = () => window.innerHeight / CANVAS_H;
      const getDistance = () =>
        Math.max(0, TRACK_W * getScale() - window.innerWidth);

      const applyScale = () => {
        const s = getScale();
        gsap.set(headerWrap, { scale: s, transformOrigin: "top left" });
        gsap.set(track, { scale: s, transformOrigin: "top left" });
      };
      applyScale();

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

      window.addEventListener("resize", applyScale);
      return () => window.removeEventListener("resize", applyScale);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#1a293f]"
      style={{ height: "100vh" }}
      data-section="especialidades"
    >
      {/* Static header layer — scaled, does not translate */}
      <div
        ref={headerWrapRef}
        className="absolute left-0 top-0 z-10"
        style={{ width: HEADER_W, height: CANVAS_H }}
      >
        <Header />
      </div>

      {/* Card track — scaled and translated */}
      <div
        ref={trackRef}
        className="absolute left-0 top-0 will-change-transform"
        style={{ width: TRACK_W, height: CANVAS_H }}
      >
        {cards.map((card, i) => (
          <Card
            key={i}
            x={CARD_START_X + i * CARD_STEP_X}
            y={i % 2 === 0 ? CARD_Y_UP : CARD_Y_DOWN}
            card={card}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute bottom-[28px] right-[40px] z-20 flex items-center gap-[10px] font-['Geist_Mono',sans-serif] text-[11px] uppercase tracking-[0.22em] text-white/50">
        <span>Scroll</span>
        <span className="h-px w-[48px] bg-white/30" />
        <span>→</span>
      </div>
    </section>
  );
}
