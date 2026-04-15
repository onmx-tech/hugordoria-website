import { gsap, ScrollTrigger } from "../lib/gsap";
import { createLineReveal } from "./scroll/line-reveal";
import { createParallax } from "./scroll/parallax";
import { createFadeUp } from "./scroll/fade-up";
import { createFadeScale } from "./scroll/fade-scale";
import { createSignatureDraw } from "./scroll/signature-draw";
import { createLineDraw } from "./scroll/line-draw";

type Cleanup = () => void;

const fontSizeOf = (el: Element) =>
  parseFloat(window.getComputedStyle(el).fontSize);

const fontFamilyOf = (el: Element) =>
  window.getComputedStyle(el).fontFamily;

function queryParagraphs(
  root: HTMLElement,
  predicate: (el: HTMLElement) => boolean
) {
  return Array.from(root.querySelectorAll<HTMLElement>("p")).filter(predicate);
}

export function initDoriaReveals(root: HTMLElement): Cleanup {
  const triggers: ScrollTrigger[] = [];

  const register = (tween: gsap.core.Tween | null | undefined) => {
    if (tween?.scrollTrigger) triggers.push(tween.scrollTrigger);
  };

  // Massive titles (> 200px) — load animation, no scroll trigger
  const massiveTitles = queryParagraphs(root, (el) => fontSizeOf(el) > 200);
  if (massiveTitles.length) {
    gsap.from(massiveTitles, {
      yPercent: 100,
      opacity: 0,
      duration: 1.4,
      stagger: 0.12,
      ease: "expo.out",
      delay: 0.1,
    });
  }

  // Big quotes (100–200px) — scrubbed rise on enter
  queryParagraphs(root, (el) => {
    const size = fontSizeOf(el);
    return size > 100 && size < 200;
  }).forEach((el) => {
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

  // Section headings (30–50px Arimo) — premium SplitText line reveal
  queryParagraphs(root, (el) => {
    const size = fontSizeOf(el);
    return size >= 30 && size <= 50 && fontFamilyOf(el).includes("Arimo");
  }).forEach((el) => {
    const reveal = createLineReveal(el, {
      start: "top 85%",
      end: "top 45%",
      scrub: 1,
      stagger: 0.1,
    });
    if (reveal) register(reveal.tween);
  });

  // Body paragraphs (18–22px Arimo) — simple fadeUp with batched stagger
  queryParagraphs(root, (el) => {
    const size = fontSizeOf(el);
    return size >= 18 && size <= 22 && fontFamilyOf(el).includes("Arimo");
  }).forEach((el, i) => {
    register(createFadeUp(el, { delay: (i % 4) * 0.05 }));
  });

  // Images — enter fade+scale plus subtle scroll parallax
  Array.from(root.querySelectorAll<HTMLImageElement>("img")).forEach((img) => {
    register(createFadeScale(img));

    const frame = img.closest<HTMLElement>(
      '[class*="overflow-clip"], [class*="overflow-hidden"]'
    );
    if (frame) register(createParallax(img, { distance: 80 }));
  });

  // Background-image divs — enter fade+scale
  root.querySelectorAll<HTMLElement>('[style*="background-image"]').forEach(
    (el) => register(createFadeScale(el))
  );

  // Quote signature draw-on
  root
    .querySelectorAll<HTMLElement>('[data-name="Quote Icon Container"]')
    .forEach((container) => {
      const sig = createSignatureDraw(container);
      if (sig) {
        register(sig.draw);
        register(sig.entry);
      }
    });

  // SVG horizontal dividers — scaleX draw-in
  root.querySelectorAll<SVGLineElement>("svg line").forEach((line) => {
    const parent = line.closest("svg") as SVGElement | null;
    if (parent) register(createLineDraw(parent));
  });

  ScrollTrigger.refresh();

  return () => triggers.forEach((t) => t.kill());
}
