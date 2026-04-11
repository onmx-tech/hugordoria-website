import { initQuoteAnimation } from './quote.animations';
import { killTriggers } from '../../utils/cleanup';

let triggers = [];

export function initQuote() {
  const root = document.querySelector('[data-component="quote"]');
  if (!root) return;
  triggers = initQuoteAnimation(root);
}

export function destroyQuote() {
  killTriggers(triggers);
  triggers = [];
}
