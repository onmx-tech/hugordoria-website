import { initSpecialtiesAnimation } from './specialties.animations';
import { killTriggers } from '../../utils/cleanup';

let triggers = [];

export function initSpecialties() {
  const root = document.querySelector('[data-component="specialties"]');
  if (!root) return;
  triggers = initSpecialtiesAnimation(root);
}

export function destroySpecialties() {
  killTriggers(triggers);
  triggers = [];
}
