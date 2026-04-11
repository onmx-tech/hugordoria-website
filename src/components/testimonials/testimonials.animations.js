import { gsap } from '../../lib/gsap';

export function initTestimonialsAnimation(root) {
  if (!root) return [];

  const title = root.querySelector('[data-animate="title"]');
  const cards = root.querySelectorAll('[data-animate="card"]');

  const triggers = [];

  const titleTween = gsap.from(title, {
    y: 40,
    opacity: 0,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: { trigger: root, start: 'top 75%', once: true },
  });
  if (titleTween.scrollTrigger) triggers.push(titleTween.scrollTrigger);

  const cardsTween = gsap.from(cards, {
    y: 60,
    opacity: 0,
    duration: 0.85,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: { trigger: root, start: 'top 65%', once: true },
  });
  if (cardsTween.scrollTrigger) triggers.push(cardsTween.scrollTrigger);

  return triggers;
}
