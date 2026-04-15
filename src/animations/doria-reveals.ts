import { gsap, ScrollTrigger } from "../lib/gsap";
import { createLineReveal } from "./scroll/line-reveal";
import { createParallax } from "./scroll/parallax";

type Cleanup = () => void;

const REVEAL_FROM = { y: 60, opacity: 0 };
const REVEAL_TO = { y: 0, opacity: 1, duration: 1, ease: "power3.out" as const };

function fadeUp(targets: Element | Element[] | NodeListOf<Element>, opts: gsap.TweenVars = {}) {
  return gsap.fromTo(
    targets,
    { ...REVEAL_FROM },
    {
      ...REVEAL_TO,
      ...opts,
      scrollTrigger: {
        trigger: opts.scrollTrigger ? undefined : (Array.isArray(targets) ? targets[0] : targets) as Element,
        start: "top 85%",
        once: true,
        ...(typeof opts.scrollTrigger === "object" ? opts.scrollTrigger : {}),
      },
    }
  );
}

export function initDoriaReveals(root: HTMLElement): Cleanup {
  const triggers: ScrollTrigger[] = [];

  const register = (tween: gsap.core.Tween) => {
    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
  };

  // Hero — top section, animate on first paint (no scroll trigger)
  const heroH1 = root.querySelector('p.leading-\\[0\\.92\\]') || root.querySelector('[data-name="Doria"]');
  // Massive Hugo Doria title (font 313.058px in original)
  const massiveTitles = Array.from(root.querySelectorAll("p")).filter((el) => {
    const cs = window.getComputedStyle(el);
    const fontSize = parseFloat(cs.fontSize);
    return fontSize > 200;
  });
  if (massiveTitles.length) {
    const tween = gsap.from(massiveTitles, {
      yPercent: 100,
      opacity: 0,
      duration: 1.4,
      stagger: 0.12,
      ease: "expo.out",
      delay: 0.1,
    });
  }

  // Big quote section (>=120px text)
  const bigQuotes = Array.from(root.querySelectorAll("p")).filter((el) => {
    const cs = window.getComputedStyle(el);
    const fontSize = parseFloat(cs.fontSize);
    return fontSize > 100 && fontSize < 200;
  });
  bigQuotes.forEach((el) => {
    const tween = gsap.fromTo(
      el,
      { yPercent: 50, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
      }
    );
    register(tween);
  });

  // Section headings (Arimo 30-50px) — premium line reveal via SplitText
  const sectionHeadings = Array.from(root.querySelectorAll<HTMLElement>("p")).filter((el) => {
    const cs = window.getComputedStyle(el);
    const fontSize = parseFloat(cs.fontSize);
    const family = cs.fontFamily;
    return fontSize >= 30 && fontSize <= 50 && family.includes("Arimo");
  });
  sectionHeadings.forEach((el) => {
    const reveal = createLineReveal(el, {
      start: "top 85%",
      end: "top 45%",
      scrub: 1,
      stagger: 0.1,
    });
    if (reveal) register(reveal.tween);
  });

  // Body paragraphs (Arimo 20px)
  const bodyParas = Array.from(root.querySelectorAll("p")).filter((el) => {
    const cs = window.getComputedStyle(el);
    const fontSize = parseFloat(cs.fontSize);
    const family = cs.fontFamily;
    return fontSize >= 18 && fontSize <= 22 && family.includes("Arimo");
  });
  bodyParas.forEach((el, i) => {
    const tween = gsap.fromTo(
      el,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        delay: (i % 4) * 0.05,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      }
    );
    register(tween);
  });

  // Images: subtle fade + scale on enter, plus scroll parallax for depth
  const images = Array.from(root.querySelectorAll<HTMLImageElement>("img"));
  images.forEach((img) => {
    const tween = gsap.fromTo(
      img,
      { opacity: 0, scale: 0.96 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: { trigger: img, start: "top 85%", once: true },
      }
    );
    register(tween);

    // Apply parallax to the frame wrapper so the img overflow doesn't
    // clip — walk up to the nearest positioned ancestor that has
    // overflow-clip/hidden (matches the Doria Frame* cards).
    const frame = img.closest<HTMLElement>('[class*="overflow-clip"], [class*="overflow-hidden"]');
    if (frame) {
      const parallax = createParallax(img, { distance: 80 });
      if (parallax) register(parallax);
    }
  });

  // Background image elements (divs with bg-position styling)
  const bgImages = root.querySelectorAll('[style*="background-image"]');
  bgImages.forEach((el) => {
    const tween = gsap.fromTo(
      el,
      { opacity: 0, scale: 0.96 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      }
    );
    register(tween);
  });

  // ─── Quote signature SVG draw-in ───────────────────────────────────
  const signatureContainers = Array.from(
    root.querySelectorAll('[data-name="Quote Icon Container"]')
  );
  signatureContainers.forEach((container) => {
    const paths = Array.from(
      container.querySelectorAll("path")
    ) as SVGPathElement[];
    if (!paths.length) return;

    paths.forEach((path) => {
      try {
        const length = path.getTotalLength();
        if (!Number.isFinite(length) || length === 0) return;
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          strokeWidth: 1.2,
          autoRound: false,
        });
      } catch {
        /* path without geometry */
      }
    });

    const tween = gsap.to(paths, {
      strokeDashoffset: 0,
      ease: "none",
      stagger: { each: 0.08, from: "start" },
      scrollTrigger: {
        trigger: container,
        start: "top 85%",
        end: "bottom 40%",
        scrub: 1.2,
      },
    });
    register(tween);

    // Subtle entry fade for the whole signature container
    const entry = gsap.fromTo(
      container,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: container, start: "top 88%", once: true },
      }
    );
    register(entry);
  });

  // Quote text reveal moved to SectionQuote component

  // Horizontal rules (line dividers)
  const lines = root.querySelectorAll("svg line");
  lines.forEach((line) => {
    const parent = (line.closest("svg") as SVGElement) || (line as unknown as Element);
    const tween = gsap.fromTo(
      parent,
      { scaleX: 0, transformOrigin: "left center" },
      {
        scaleX: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: parent, start: "top 90%", once: true },
      }
    );
    register(tween);
  });

  ScrollTrigger.refresh();

  return () => {
    triggers.forEach((t) => t.kill());
  };
}
