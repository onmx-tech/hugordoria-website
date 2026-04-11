import { initNeuroAnimation } from './neuroimagens.animations';
import { killTriggers } from '../../utils/cleanup';

let triggers = [];

export function initNeuroimagens() {
  const root = document.querySelector('[data-component="neuroimagens"]');
  if (!root) return;
  triggers = initNeuroAnimation(root);
}

export function destroyNeuroimagens() {
  killTriggers(triggers);
  triggers = [];
}
