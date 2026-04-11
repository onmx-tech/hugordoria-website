import { initFooterAnimation } from './footer.animations';
import { killTriggers } from '../../utils/cleanup';

let triggers = [];

export function initFooter() {
  const root = document.querySelector('[data-component="footer"]');
  if (!root) return;
  triggers = initFooterAnimation(root);

  const yearEl = root.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

export function destroyFooter() {
  killTriggers(triggers);
  triggers = [];
}
