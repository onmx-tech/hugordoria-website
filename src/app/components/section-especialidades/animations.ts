import { gsap } from "../../../lib/gsap";
import { CANVAS_H, HEADER_W, TRACK_W } from "./data";

type Refs = {
  section: HTMLElement;
  content: HTMLElement;
  track: HTMLElement;
  headerWrap: HTMLElement;
};

export function initEspecialidadesAnimation({
  section,
  content,
  track,
  headerWrap,
}: Refs) {
  const getScale = () => {
    const byHeight = window.innerHeight / CANVAS_H;
    const byWidth = window.innerWidth / HEADER_W;
    return Math.min(byHeight, byWidth);
  };
  const getDistance = () =>
    Math.max(0, TRACK_W * getScale() - window.innerWidth);

  const applyScale = () => {
    const s = getScale();
    gsap.set(headerWrap, { scale: s, transformOrigin: "top left" });
    gsap.set(track, { scale: s, transformOrigin: "top left" });
  };
  applyScale();

  // A entrada por scroll (o bloco inteiro subindo de baixo, de autoAlpha 0)
  // saiu a pedido: a seção já nasce visível. O que continua é a panorâmica
  // horizontal — essa é a mecânica da seção, não um efeito de chegada.

  const mm = gsap.matchMedia();
  mm.add("(min-width: 1024px)", () => {
    gsap.to(track, {
      x: () => `-${getDistance()}`,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${getDistance()}`,
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    });
  });

  window.addEventListener("resize", applyScale);

  return () => {
    window.removeEventListener("resize", applyScale);
    mm.revert();
  };
}
