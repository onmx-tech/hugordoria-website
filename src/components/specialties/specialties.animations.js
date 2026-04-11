import { gsap, ScrollTrigger } from '../../lib/gsap';

export function initSpecialtiesAnimation(root) {
  if (!root) return [];

  const title = root.querySelector('[data-animate="title"]');
  const portrait = root.querySelector('[data-animate="portrait"]');
  const portraitImg = portrait?.querySelector('img');
  const copy = root.querySelector('[data-animate="copy"] > p');
  const stats = root.querySelectorAll('[data-animate="stats"] li');
  const counters = root.querySelectorAll('[data-counter]');

  const triggers = [];

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    scrollTrigger: {
      trigger: root,
      start: 'top 70%',
      once: true,
    },
  });

  tl.from(title, { y: 40, opacity: 0, duration: 0.9 }, 0)
    .from(portrait, { y: 60, opacity: 0, duration: 1.1 }, 0.05)
    .from(copy, { y: 40, opacity: 0, duration: 0.9 }, 0.2)
    .from(stats, { y: 40, opacity: 0, duration: 0.7, stagger: 0.12 }, 0.35);

  if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);

  if (portraitImg) {
    const parallax = gsap.to(portraitImg, {
      yPercent: -8,
      ease: 'none',
      scrollTrigger: {
        trigger: portrait,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
    if (parallax.scrollTrigger) triggers.push(parallax.scrollTrigger);
  }

  counters.forEach((el) => {
    const target = Number(el.dataset.counter || 0);
    const obj = { val: 0 };
    const counterTween = gsap.to(obj, {
      val: target,
      duration: 1.6,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = `+${Math.round(obj.val)}`;
      },
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });
    if (counterTween.scrollTrigger) triggers.push(counterTween.scrollTrigger);
  });

  return triggers;
}
