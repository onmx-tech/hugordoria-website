import { useEffect, useRef, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { gsap } from "../../lib/gsap";
import Footer from "./Footer";

// Layout compartilhado das páginas institucionais (réplica 1:1 do site
// original no design novo): top bar de retorno + hero compacto + conteúdo.
export default function SubPage({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
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
      const heroItems = root.querySelectorAll("[data-hero-reveal]");
      gsap.set(heroItems, { y: 24, autoAlpha: 0 });
      gsap.to(heroItems, {
        y: 0,
        autoAlpha: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.15,
      });

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
    <div ref={rootRef} className="w-full overflow-hidden">
      <section
        className="relative w-full"
        style={{ background: "var(--color-bg-darkest)" }}
      >
        {/* Top bar */}
        <div
          className="flex items-center justify-between px-6 md:px-12 lg:px-16"
          style={{ height: 72 }}
        >
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-3 font-['Geist',sans-serif] text-cream/50 transition-colors duration-300 hover:text-cream"
            style={{ fontSize: 14, background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            <span aria-hidden>←</span>
            Dr. Hugo Doria
          </button>
        </div>

        {/* Hero compacto */}
        <div
          className="px-6 md:px-12 lg:px-16"
          style={{
            paddingTop: "clamp(48px, 9vh, 110px)",
            paddingBottom: "clamp(56px, 10vh, 120px)",
          }}
        >
          <span
            data-hero-reveal
            className="inline-block font-['Geist_Mono',sans-serif] uppercase tracking-[0.22em] text-gold-light/70"
            style={{ fontSize: 11 }}
          >
            {eyebrow}
          </span>
          <h1
            data-hero-reveal
            className="font-['Arimo',sans-serif] text-cream"
            style={{
              margin: 0,
              marginTop: 20,
              fontWeight: 400,
              fontSize: "clamp(40px, 6vw, 88px)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: 900,
            }}
          >
            {title}
          </h1>
          {lead && (
            <p
              data-hero-reveal
              className="font-['Geist',sans-serif] text-cream/55"
              style={{
                margin: 0,
                marginTop: 28,
                fontSize: "clamp(16px, 1.3vw, 20px)",
                lineHeight: 1.6,
                maxWidth: 640,
              }}
            >
              {lead}
            </p>
          )}
        </div>
      </section>

      {children}

      <Footer />
    </div>
  );
}
