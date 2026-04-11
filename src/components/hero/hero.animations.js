import { gsap } from '../../lib/gsap';

export function initHeroAnimation(root) {
  if (!root) return null;

  const eyebrow = root.querySelector('[data-animate="eyebrow"]');
  const quote = root.querySelector('[data-animate="quote"]');
  const titleLines = root.querySelectorAll('[data-line]');
  const portrait = root.querySelector('[data-animate="portrait"]');
  const portraitImg = portrait?.querySelector('img');
  const stripImgs = root.querySelectorAll('[data-animate="strip"] img');

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.set(titleLines, { yPercent: 110 })
    .set([eyebrow, quote], { y: 30, opacity: 0 })
    .set(portrait, { opacity: 0, scale: 0.95 })
    .set(stripImgs, { opacity: 0, y: 24 });

  tl.to(titleLines, {
    yPercent: 0,
    duration: 1.1,
    stagger: 0.08,
    ease: 'expo.out',
  }, 0.2)
    .to(eyebrow, { y: 0, opacity: 1, duration: 0.7 }, 0.4)
    .to(quote, { y: 0, opacity: 1, duration: 0.9 }, 0.55)
    .to(portrait, { opacity: 1, scale: 1, duration: 1.2, ease: 'expo.out' }, 0.45)
    .to(stripImgs, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, 0.8);

  if (portraitImg) {
    tl.to(portraitImg, { scale: 1, duration: 1.6, ease: 'power2.out' }, 0.45);
  }

  return tl;
}
