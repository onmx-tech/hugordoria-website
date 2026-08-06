import { gsap } from "../../../lib/gsap";
import { CANVAS_H, CANVAS_W } from "./data";

type Refs = {
  section: HTMLElement;
  track: HTMLElement;
};

export function initSobreAnimation({ section, track }: Refs) {
  const getScale = () => window.innerHeight / CANVAS_H;
  const applyScale = () => {
    gsap.set(track, { scale: getScale(), transformOrigin: "top left" });
  };
  applyScale();

  const mm = gsap.matchMedia();
  mm.add("(min-width: 1024px)", () => {
    const getDistance = () =>
      Math.max(0, CANVAS_W * getScale() - window.innerWidth);
    const getHold = () => window.innerHeight * 0.25; // ~25vh: já começa a panorâmica logo
    // Cauda depois que a panorâmica termina. Eram 60vh — mais de meia tela de
    // rolagem sem nada acontecer, e o cliente descreveu exatamente isso:
    // "quando termina aqui, ele deixa um respirão enorme, eu tenho que descer
    // um monte pra achar; eu prefiro que ele já jogue na minha cara".
    // 25vh ainda segura a leitura da última coluna antes de soltar o pin.
    const getEndHold = () => window.innerHeight * 0.25;

    const masterTween = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${getDistance() + getHold() + getEndHold()}`,
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    });

    // 1. Hold — track stays put so col-1 content is readable
    masterTween.to({}, { duration: getHold() });
    // 2. Horizontal pan — duration proportional to distance keeps 1:1 feel
    masterTween.to(track, {
      x: () => `-${getDistance()}`,
      ease: "none",
      duration: getDistance(),
    });
    // 3. End hold — segura na última coluna antes de soltar o pin
    masterTween.to({}, { duration: getEndHold() });

    // A entrada individual de cada item saiu a pedido: as fotos revelavam por
    // clip-path e os textos subiam com inclinação 3D conforme a coluna entrava
    // pela direita. Agora tudo já está posto, e o que se move é só a
    // panorâmica — que é a mecânica da seção, não um efeito de chegada.
    const items = Array.from(track.children) as HTMLElement[];

    items.forEach((el) => {
      const innerImg = el.querySelector<HTMLElement>("img");
      const isImageFrame = !!innerImg;

      // Parallax on the inner image as the card travels across the viewport.
      // Using containerAnimation so it's tied to horizontal progress.
      if (isImageFrame && innerImg) {
        gsap.fromTo(
          innerImg,
          { xPercent: 6 },
          {
            xPercent: -6,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              containerAnimation: masterTween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      }
    });
  });

  window.addEventListener("resize", applyScale);
  return () => {
    window.removeEventListener("resize", applyScale);
    mm.revert();
  };
}
