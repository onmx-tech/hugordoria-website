import { useEffect, useRef, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { gsap } from "../../lib/gsap";
import Footer from "./Footer";

// Subpáginas = "miolo da revista": base cream clara (a home é a capa navy).
// Hero split texto+imagem com o título display atravessando a foto.
export default function SubPage({
  eyebrow,
  title,
  em,
  lead,
  meta,
  image,
  imageCaption,
  children,
}: {
  eyebrow: string;
  title: string;
  /** Palavras do título em itálico dourado (assinatura editorial) */
  em?: string;
  lead?: string;
  meta?: string;
  /** Imagem do hero (coluna direita); sem ela o hero é tipográfico puro */
  image?: string;
  imageCaption?: string;
  children: ReactNode;
}) {
  const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const titleEl = root.querySelector<HTMLElement>("[data-sub-title]");
      if (titleEl) {
        const text = titleEl.textContent ?? "";
        const emSet = new Set(
          (titleEl.dataset.em ?? "").toLowerCase().split(/\s+/).filter(Boolean),
        );
        titleEl.innerHTML = "";
        const wordSpans: HTMLSpanElement[] = [];
        text.split(/(\s+)/).forEach((token) => {
          if (!token) return;
          if (/^\s+$/.test(token)) {
            titleEl.appendChild(document.createTextNode(token));
            return;
          }
          const outer = document.createElement("span");
          outer.style.display = "inline-block";
          outer.style.overflow = "hidden";
          outer.style.verticalAlign = "top";
          outer.style.lineHeight = "inherit";
          const inner = document.createElement("span");
          inner.style.display = "inline-block";
          inner.textContent = token;
          const clean = token.toLowerCase().replace(/[^\p{L}\p{N}-]/gu, "");
          if (emSet.has(clean)) {
            inner.style.fontStyle = "italic";
            inner.style.color = "var(--color-accent-gold)";
            // folga p/ o glyph inclinado não ser clipado pelo overflow do reveal
            outer.style.paddingRight = "0.1em";
            outer.style.marginRight = "-0.1em";
          }
          outer.appendChild(inner);
          titleEl.appendChild(outer);
          wordSpans.push(inner);
        });
        gsap.set(wordSpans, { yPercent: 110 });
        gsap.to(wordSpans, {
          yPercent: 0,
          stagger: 0.05,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.25,
        });
      }

      const heroItems = root.querySelectorAll("[data-hero-reveal]");
      gsap.set(heroItems, { y: 24, autoAlpha: 0 });
      gsap.to(heroItems, {
        y: 0,
        autoAlpha: 1,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.4,
      });

      const heroImg = root.querySelector("[data-hero-img]");
      if (heroImg) {
        gsap.set(heroImg, { clipPath: "inset(0 0 100% 0)" });
        gsap.to(heroImg, {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.2,
          ease: "power3.inOut",
          delay: 0.2,
        });
      }

      root.querySelectorAll("[data-section-reveal]").forEach((section) => {
        const items = section.querySelectorAll("[data-reveal]");
        if (!items.length) return;
        gsap.set(items, { y: 40, autoAlpha: 0 });
        gsap.to(items, {
          y: 0,
          autoAlpha: 1,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 35%",
            scrub: 0.6,
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    // overflow-x-clip preserva o position:sticky interno (hidden quebraria)
    <div
      ref={rootRef}
      className="w-full overflow-x-clip"
      style={{ background: "var(--color-bg-cream)" }}
    >
      <section className="relative w-full">
        {/* Top bar */}
        <div
          className="flex items-center justify-between mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-16"
          style={{ height: 72 }}
        >
          <button
            type="button"
            onClick={() => navigate("/")}
            className="group/back flex items-center gap-3 font-['Geist',sans-serif] text-navy/50 transition-colors duration-300 hover:text-navy"
            style={{ fontSize: 14, background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            <span
              aria-hidden
              className="inline-block transition-transform duration-300 group-hover/back:-translate-x-1"
            >
              ←
            </span>
            Dr. Hugo Doria
          </button>
          <span
            className="hidden md:inline font-['Geist_Mono',sans-serif] uppercase tracking-[0.22em] text-navy/35"
            style={{ fontSize: 10 }}
          >
            MD PhD — Neurocirurgião
          </span>
        </div>
        <div
          className="mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-16">
          <div style={{ height: 1, background: "rgba(26,41,63,0.15)" }} />
        </div>

        {/* Hero split: texto à esquerda, imagem alta à direita; o título
            display avança sobre a coluna da imagem (overlap de revista) */}
        <div className="relative mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            <div
              className="lg:col-span-7 flex flex-col justify-center"
              style={{
                paddingTop: "clamp(56px, 10vh, 120px)",
                paddingBottom: "clamp(56px, 10vh, 120px)",
              }}
            >
              <div className="flex items-baseline justify-between" style={{ maxWidth: 720 }}>
                <span
                  data-hero-reveal
                  className="inline-block font-['Geist_Mono',sans-serif] uppercase tracking-[0.24em] text-navy/45"
                  style={{ fontSize: 11 }}
                >
                  [&nbsp;&nbsp;{eyebrow}&nbsp;&nbsp;]
                </span>
                {meta && (
                  <span
                    data-hero-reveal
                    className="hidden sm:inline font-['Geist_Mono',sans-serif] uppercase tracking-[0.18em] text-navy/35"
                    style={{ fontSize: 10 }}
                  >
                    {meta}
                  </span>
                )}
              </div>

              <h1
                data-sub-title
                data-em={em}
                className="relative z-10 font-['Geist',sans-serif] text-navy"
                style={{
                  margin: 0,
                  marginTop: 32,
                  fontWeight: 400,
                  fontSize: "clamp(44px, 6.5vw, 96px)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.03em",
                  // avança sobre a coluna da imagem no desktop
                  maxWidth: "120%",
                  width: image ? "120%" : "100%",
                }}
              >
                {title}
              </h1>

              {lead && (
                <p
                  data-hero-reveal
                  className="font-['Arimo',sans-serif] text-navy/60"
                  style={{
                    margin: 0,
                    marginTop: "clamp(28px, 4vh, 44px)",
                    fontSize: "clamp(16px, 1.25vw, 19px)",
                    lineHeight: 1.65,
                    maxWidth: 520,
                  }}
                >
                  {lead}
                </p>
              )}
            </div>

            {image ? (
              <div className="relative lg:col-span-5 hidden lg:block">
                <div
                  data-hero-img
                  className="absolute overflow-hidden"
                  style={{ inset: "0 0 0 clamp(24px, 3vw, 64px)" }}
                >
                  <img
                    src={image}
                    alt=""
                    aria-hidden
                    className="h-full w-full object-cover"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 55%, rgba(26,41,63,0.45) 100%)",
                    }}
                  />
                  {imageCaption && (
                    <span
                      className="absolute font-['Geist_Mono',sans-serif] uppercase tracking-[0.2em] text-cream/80"
                      style={{ left: 22, bottom: 18, fontSize: 10 }}
                    >
                      [&nbsp;&nbsp;{imageCaption}&nbsp;&nbsp;]
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="hidden lg:block lg:col-span-5" />
            )}
          </div>
        </div>
        <div
          className="mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-16">
          <div style={{ height: 1, background: "rgba(26,41,63,0.15)" }} />
        </div>
      </section>

      {children}

      <Footer />
    </div>
  );
}
