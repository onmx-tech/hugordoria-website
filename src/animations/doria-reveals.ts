import { gsap, ScrollTrigger } from "../lib/gsap";

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

  // Section headings (Arimo 36px)
  const sectionHeadings = Array.from(root.querySelectorAll("p")).filter((el) => {
    const cs = window.getComputedStyle(el);
    const fontSize = parseFloat(cs.fontSize);
    const family = cs.fontFamily;
    return fontSize >= 30 && fontSize <= 50 && family.includes("Arimo");
  });
  sectionHeadings.forEach((el) => {
    const tween = fadeUp(el);
    register(tween);
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

  // Images: subtle fade + scale on enter
  const images = root.querySelectorAll("img");
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
