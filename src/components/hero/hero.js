import { initHeroAnimation } from './hero.animations';

let timeline = null;

export function initHero() {
  const root = document.querySelector('[data-component="hero"]');
  if (!root) return;
  timeline = initHeroAnimation(root);
}

export function destroyHero() {
  timeline?.kill();
  timeline = null;
}
