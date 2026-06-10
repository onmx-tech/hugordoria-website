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
    const getEndHold = () => window.innerHeight * 0.6; // ~60vh: cauda do último card que o Quote cobre ao subir

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

    // Individual entrance per item. Image frames reveal via clip-path + scale;
    // text elements rise with a subtle 3D tilt. Images also get parallax on
    // their inner <img> while the card travels through the viewport.
    const items = Array.from(track.children) as HTMLElement[];
    const scale = getScale();
    const viewportW = window.innerWidth;

    items.forEach((el) => {
      const innerImg = el.querySelector<HTMLElement>("img");
      const isImageFrame = !!innerImg;
      const itemLeftPx = el.offsetLeft * scale;
      const isPreVisible = itemLeftPx < viewportW * 0.85;

      // Initial states
      if (isImageFrame && innerImg) {
        gsap.set(el, {
          clipPath: "inset(100% 0% 0% 0%)",
          autoAlpha: 1,
        });
        gsap.set(innerImg, { scale: 1.2 });
      } else {
        gsap.set(el, {
          y: 72,
          autoAlpha: 0,
          rotateX: 14,
          transformPerspective: 800,
          transformOrigin: "top center",
        });
      }

      const entranceTrigger = isPreVisible
        ? {
            trigger: section,
            start: "top 85%",
            end: "top 20%",
            scrub: 0.6,
          }
        : {
            // Revela conforme a foto entra pela direita e completa quando ela
            // já está inteira na tela (borda direita) — assim a ÚLTIMA coluna,
            // que para na direita e nunca chega ao centro, também revela 100%.
            trigger: el,
            containerAnimation: masterTween,
            start: "left right",
            end: "right right",
            scrub: 0.6,
          };

      if (isImageFrame && innerImg) {
        const tl = gsap.timeline({
          scrollTrigger: entranceTrigger,
          defaults: { ease: "power3.out" },
        });
        tl.to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 1 }, 0)
          .to(innerImg, { scale: 1, duration: 1 }, 0);
      } else {
        gsap.to(el, {
          y: 0,
          autoAlpha: 1,
          rotateX: 0,
          ease: "power3.out",
          scrollTrigger: entranceTrigger,
        });
      }

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
