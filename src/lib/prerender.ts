// Guarda de pré-renderização (SSG por snapshot).
//
// Durante o snapshot (scripts/prerender.mjs), o puppeteer injeta
// window.__PRERENDER__ = true ANTES do app carregar. Os inits de animação
// (GSAP/ScrollTrigger/Lenis/frame-sequence) checam isto e NÃO rodam — assim o
// HTML capturado fica no estado estático, idêntico ao primeiro render do
// React no cliente (os effects só rodam DEPOIS da hidratação). Isso é o que
// evita mismatch de hidratação (ex.: os pin-spacers do ScrollTrigger, que são
// elementos novos no DOM, quebrariam o hydrate).
//
// Em runtime real a flag nunca existe → comportamento idêntico ao de sempre.
export function isPrerender(): boolean {
  return (
    typeof window !== "undefined" &&
    (window as unknown as { __PRERENDER__?: boolean }).__PRERENDER__ === true
  );
}

// Setado UMA vez no boot (main.tsx): true quando a página chegou já com HTML
// pré-renderizado (SSG) e foi HIDRATADA. Usado pelas animações de ENTRADA
// above-the-fold (a intro do Hero) para NÃO rodar na primeira carga — o
// conteúdo já está pintado e re-escondê-lo pra reanimar causaria flash. A vida
// da home passa a vir dos scroll-reveals (que rodam normalmente ao rolar).
let _wasPrerendered = false;
export function markPrerendered(v: boolean): void {
  _wasPrerendered = v;
}
export function wasPrerendered(): boolean {
  return _wasPrerendered;
}

/** Animações de entrada above-the-fold devem ser puladas nestes dois casos:
 *  durante a captura do snapshot, e na primeira carga hidratada. */
export function skipEntranceAnimation(): boolean {
  return isPrerender() || wasPrerendered();
}
