import { useNavigate } from "react-router";
import { CardArrow } from "./icons";
import { CARD_H, CARD_W, HEADER_W, CANVAS_H, type CardData } from "./data";

const IMAGE_H = 260;

export function Card({ x, y, card }: { x: number; y: number; card: CardData }) {
  const Icon = card.icon;
  const hasImage = !!card.image;
  const navigate = useNavigate();

  const handleOpen = () => {
    navigate(`/especialidade/${card.slug}`);
  };

  return (
    <article
      className="absolute flex flex-col items-start overflow-hidden cursor-pointer"
      data-card
      role="button"
      tabIndex={0}
      onClick={handleOpen}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleOpen(); } }}
      style={{
        left: x,
        top: y,
        width: CARD_W,
        height: CARD_H,
        backgroundColor: "rgba(255, 255, 255, 0.07)",
        transition:
          "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.45s ease",
        willChange: "transform",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-10px)";
        (e.currentTarget as HTMLElement).style.backgroundColor =
          "rgba(255, 255, 255, 0.1)";
        const img = e.currentTarget.querySelector<HTMLElement>("[data-card-img]");
        if (img) img.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.backgroundColor =
          "rgba(255, 255, 255, 0.07)";
        const img = e.currentTarget.querySelector<HTMLElement>("[data-card-img]");
        if (img) img.style.transform = "scale(1)";
      }}
    >
      {hasImage ? (
        <>
          <div
            className="relative w-full shrink-0 overflow-hidden"
            style={{ height: IMAGE_H }}
          >
            <img
              data-card-img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 h-full w-full object-cover"
              style={{
                transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(26, 41, 63, 0.85) 0%, transparent 60%)",
              }}
            />
            <div
              className="absolute"
              style={{ left: 20, top: 20, width: 28, height: 28, opacity: 0.85 }}
            >
              <Icon />
            </div>
          </div>

          <div
            className="flex flex-1 flex-col justify-between"
            style={{ padding: "20px 32px 32px", width: "100%" }}
          >
            <div className="flex flex-col" style={{ gap: 8 }}>
              <p
                className="font-['Geist',sans-serif]"
                style={{ margin: 0, fontWeight: 400, fontSize: 20, lineHeight: 1.5, color: "#ffffff" }}
              >
                {card.title}
              </p>
              <p
                className="font-['Geist',sans-serif]"
                style={{ margin: 0, fontWeight: 400, fontSize: 16, lineHeight: 1.5, color: "rgba(255, 255, 255, 0.7)" }}
              >
                {card.description}
              </p>
            </div>

            <button
              type="button"
              className="flex items-center"
              style={{ gap: 8, padding: 0, marginTop: 24, background: "none", border: "none", cursor: "pointer" }}
            >
              <span
                className="font-['Geist',sans-serif]"
                style={{ fontWeight: 600, fontSize: 14, lineHeight: "18px", color: "#ffffff" }}
              >
                Saiba mais
              </span>
              <CardArrow />
            </button>
          </div>
        </>
      ) : (
        <>
          <div style={{ padding: "32px 32px 0", width: 48 + 64, height: 48 + 32 }}>
            <Icon />
          </div>

          <div
            className="flex flex-1 flex-col justify-between"
            style={{ padding: "0 32px 32px", width: "100%" }}
          >
            <div className="flex flex-col" style={{ width: 449, gap: 8 }}>
              <p
                className="font-['Geist',sans-serif]"
                style={{ margin: 0, fontWeight: 400, fontSize: 20, lineHeight: 1.5, color: "#ffffff" }}
              >
                {card.title}
              </p>
              <p
                className="font-['Geist',sans-serif]"
                style={{ margin: 0, fontWeight: 400, fontSize: 16, lineHeight: 1.5, color: "rgba(255, 255, 255, 0.7)" }}
              >
                {card.description}
              </p>
            </div>

            <button
              type="button"
              className="flex items-center"
              style={{ gap: 8, padding: 0, background: "none", border: "none", cursor: "pointer" }}
            >
              <span
                className="font-['Geist',sans-serif]"
                style={{ fontWeight: 600, fontSize: 14, lineHeight: "18px", color: "#ffffff" }}
              >
                Saiba mais
              </span>
              <CardArrow />
            </button>
          </div>
        </>
      )}
    </article>
  );
}

export function Header() {
  return (
    <div
      className="pointer-events-none absolute left-0 top-0 z-10"
      style={{ width: HEADER_W, height: CANVAS_H }}
    >
      <div
        className="absolute"
        style={{ left: 64, top: 32, width: 1766, height: 1, backgroundColor: "rgba(255, 255, 255, 0.24)" }}
      />
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
      <h2
        className="absolute font-['Arimo',sans-serif]"
        style={{
          left: 72,
          top: 130,
          width: 355,
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
        Dr. Hugo Doria oferece tratamentos avançados em neurocirurgia,
        incluindo aneurismas cerebrais, malformações arteriovenosas, tumores
        cerebrais e medulares, doença de Moyamoya, neuralgia do trigêmeo,
        espasmo hemifacial e revascularização cerebral.
      </p>
    </div>
  );
}
