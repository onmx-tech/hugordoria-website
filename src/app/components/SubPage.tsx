import { useEffect, useRef, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { gsap } from "../../lib/gsap";
import Footer from "./Footer";

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// Layout compartilhado das páginas institucionais — hero editorial com
// reveal tipográfico, grain e watermark fantasma, no idioma visual da home.
export default function SubPage({
  eyebrow,
  title,
  em,
  lead,
  meta,
  watermark,
  children,
}: {
  eyebrow: string;
  title: string;
  /** Palavras do título que recebem itálico dourado (assinatura editorial das subpáginas) */
  em?: string;
  lead?: string;
  meta?: string;
  watermark?: string;
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
      // Título: reveal palavra a palavra com clip (mesmo gesto da página de especialidade)
      const titleEl = root.querySelector<HTMLElement>("[data-sub-title]");
      if (titleEl) {
        const text = titleEl.textContent ?? "";
        const emSet = new Set(
          (titleEl.dataset.em ?? "")
            .toLowerCase()
            .split(/\s+/)
            .filter(Boolean),
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
            inner.style.color = "var(--color-accent-gold-light)";
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
        delay: 0.45,
      });

      const mark = root.querySelector("[data-watermark]");
      if (mark) {
        gsap.set(mark, { autoAlpha: 0, scale: 0.94 });
        gsap.to(mark, {
          autoAlpha: 1,
          scale: 1,
          duration: 1.4,
          ease: "power2.out",
          delay: 0.1,
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
    <div ref={rootRef} className="w-full overflow-x-clip">
      <section
        className="relative w-full overflow-hidden"
        style={{ background: "var(--color-bg-darkest)" }}
      >
        {/* Atmosfera: glow dourado + grain */}
        <div
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            top: "-30%",
            right: "-12%",
            width: "55vw",
            height: "55vw",
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--color-accent-gold-light) 7%, transparent) 0%, transparent 65%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: 0.03,
            backgroundImage: GRAIN,
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
          }}
        />

        {/* Watermark fantasma */}
        {watermark && (
          <span
            data-watermark
            aria-hidden
            className="pointer-events-none absolute select-none font-['Arimo',sans-serif]"
            style={{
              right: "-1vw",
              bottom: "-6vh",
              fontSize: "clamp(160px, 26vw, 420px)",
              lineHeight: 0.8,
              letterSpacing: "-0.05em",
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,255,255,0.05)",
            }}
          >
            {watermark}
          </span>
        )}

        {/* Top bar */}
        <div className="relative z-10">
          <div
            className="flex items-center justify-between px-6 md:px-12 lg:px-16"
            style={{ height: 72 }}
          >
            <button
              type="button"
              onClick={() => navigate("/")}
              className="group/back flex items-center gap-3 font-['Geist',sans-serif] text-cream/50 transition-colors duration-300 hover:text-cream"
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
              className="hidden md:inline font-['Geist_Mono',sans-serif] uppercase tracking-[0.22em] text-cream/30"
              style={{ fontSize: 10 }}
            >
              MD PhD — Neurocirurgião
            </span>
          </div>
          <div
            className="mx-6 md:mx-12 lg:mx-16"
            style={{ height: 1, background: "rgba(255,255,255,0.1)" }}
          />
        </div>

        {/* Hero editorial */}
        <div
          className="relative z-10 px-6 md:px-12 lg:px-16"
          style={{
            paddingTop: "clamp(56px, 11vh, 130px)",
            paddingBottom: "clamp(64px, 12vh, 140px)",
          }}
        >
          <span
            data-hero-reveal
            className="inline-block font-['Geist_Mono',sans-serif] uppercase tracking-[0.24em] text-gold-light/80"
            style={{ fontSize: 11 }}
          >
            [&nbsp;&nbsp;{eyebrow}&nbsp;&nbsp;]
          </span>

          <h1
            data-sub-title
            data-em={em}
            className="font-['Arimo',sans-serif] text-cream"
            style={{
              margin: 0,
              marginTop: 28,
              fontWeight: 400,
              fontSize: "clamp(42px, 6.5vw, 96px)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              maxWidth: 980,
            }}
          >
            {title}
          </h1>

          {(lead || meta) && (
            <div
              className="grid grid-cols-1 lg:grid-cols-[minmax(0,640px)_1fr] gap-8 items-end"
              style={{ marginTop: "clamp(32px, 5vh, 56px)" }}
            >
              {lead ? (
                <p
                  data-hero-reveal
                  className="font-['Geist',sans-serif] text-cream/55"
                  style={{
                    margin: 0,
                    fontSize: "clamp(16px, 1.3vw, 20px)",
                    lineHeight: 1.6,
                  }}
                >
                  {lead}
                </p>
              ) : (
                <span />
              )}
              {meta && (
                <span
                  data-hero-reveal
                  className="hidden lg:block font-['Geist_Mono',sans-serif] uppercase tracking-[0.18em] text-cream/30 lg:text-right"
                  style={{ fontSize: 11 }}
                >
                  {meta}
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {children}

      <Footer />
    </div>
  );
}
