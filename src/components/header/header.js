import { initHeaderAnimation, initHeaderScrollState } from './header.animations';

let timeline = null;
let removeScroll = null;

export function initHeader() {
  const root = document.querySelector('[data-component="header"]');
  if (!root) return;
  timeline = initHeaderAnimation(root);
  removeScroll = initHeaderScrollState(root);
}

export function destroyHeader() {
  timeline?.kill();
  timeline = null;
  removeScroll?.();
  removeScroll = null;
}
