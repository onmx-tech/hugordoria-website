import { initAboutAnimation } from './about.animations';
import { killTriggers } from '../../utils/cleanup';

let triggers = [];

export function initAbout() {
  const root = document.querySelector('[data-component="about"]');
  if (!root) return;
  triggers = initAboutAnimation(root);
}

export function destroyAbout() {
  killTriggers(triggers);
  triggers = [];
}
