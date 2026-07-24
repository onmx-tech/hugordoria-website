import { useEffect } from "react";
import { initLenis, destroyLenis } from "../lib/lenis";
import { isPrerender } from "../lib/prerender";

export function useLenis() {
  useEffect(() => {
    // Snapshot de pré-render captura o DOM estático (sem pin-spacers/canvas).
    if (isPrerender()) return;
    const lenis = initLenis();
    return () => {
      destroyLenis();
    };
  }, []);
}
