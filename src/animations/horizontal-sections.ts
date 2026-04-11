import { gsap, ScrollTrigger } from "../lib/gsap";

type Cleanup = () => void;

function findByClassFragment(
  stage: HTMLElement,
  ...fragments: string[]
): HTMLElement | null {
  const all = stage.querySelectorAll<HTMLElement>("div");
  for (const el of all) {
    const cls = el.className;
    if (typeof cls !== "string") continue;
    if (fragments.every((f) => cls.includes(f))) return el;
  }
  return null;
}

function findAllByClassFragment(
  stage: HTMLElement,
  ...fragments: string[]
): HTMLElement[] {
  const all = stage.querySelectorAll<HTMLElement>("div");
  const out: HTMLElement[] = [];
  for (const el of all) {
    const cls = el.className;
    if (typeof cls !== "string") continue;
    if (fragments.every((f) => cls.includes(f))) out.push(el);
  }
  return out;
}

function getStageScale(stage: HTMLElement): number {
  const rect = stage.getBoundingClientRect();
  return rect.width > 0 ? rect.width / 1920 : 1;
}

interface SectionSpec {
  label: string;
  cards: HTMLElement[];
  yStart: number;
  yEnd: number;
  scrollBuffer: number;
  spread: number;
}

function createHorizontalFlow(
  stage: HTMLElement,
  spec: SectionSpec
): ScrollTrigger | null {
  if (spec.cards.length === 0) return null;

  spec.cards.forEach((el, i) => {
    gsap.set(el, {
      xPercent: spec.spread * (i + 1),
      opacity: 0,
      willChange: "transform, opacity",
    });
  });

  const tween = gsap.to(spec.cards, {
    xPercent: (i: number) =>
      -spec.spread * (spec.cards.length - i),
    opacity: 1,
    ease: "none",
    stagger: 0,
    scrollTrigger: {
      trigger: stage,
      start: () => {
        const s = getStageScale(stage);
        return `top+=${spec.yStart * s} top`;
      },
      end: () => {
        const s = getStageScale(stage);
        return `top+=${spec.yEnd * s + spec.scrollBuffer} top`;
      },
      scrub: 1,
      invalidateOnRefresh: true,
      id: spec.label,
    },
  });

  return tween.scrollTrigger ?? null;
}

export function initHorizontalSections(stage: HTMLElement): Cleanup {
  const triggers: ScrollTrigger[] = [];

  // ─── Section A: image cards (Frame40-43) in y-range 1238-2269 ─────────────
  const sectionACards = [
    findByClassFragment(stage, "top-[1238px]", "overflow-clip"),
    findByClassFragment(stage, "top-[1400px]", "overflow-clip"),
    findByClassFragment(stage, "top-[1847px]", "overflow-clip"),
    findByClassFragment(stage, "top-[1824px]", "overflow-clip"),
  ].filter((x): x is HTMLElement => x !== null);

  const a = createHorizontalFlow(stage, {
    label: "section-a-horizontal",
    cards: sectionACards,
    yStart: 1150,
    yEnd: 2300,
    scrollBuffer: 500,
    spread: 80,
  });
  if (a) triggers.push(a);

  // ─── Section B: testimonial cards (Frame10/19/22/26) in y-range 4013-4632 ─
  const sectionBCards = findAllByClassFragment(
    stage,
    "w-[513px]",
    "h-[509px]",
    "p-[32px]"
  );

  const b = createHorizontalFlow(stage, {
    label: "section-b-horizontal",
    cards: sectionBCards,
    yStart: 3900,
    yEnd: 4650,
    scrollBuffer: 600,
    spread: 70,
  });
  if (b) triggers.push(b);

  ScrollTrigger.refresh();

  return () => {
    triggers.forEach((t) => t.kill());
    [...sectionACards, ...sectionBCards].forEach((el) => {
      gsap.set(el, { clearProps: "transform,opacity,willChange" });
    });
  };
}
