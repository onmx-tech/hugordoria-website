export const qs = (sel, ctx = document) => ctx.querySelector(sel);
export const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
export const on = (el, event, fn, opts) => el.addEventListener(event, fn, opts);
