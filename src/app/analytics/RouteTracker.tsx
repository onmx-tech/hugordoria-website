// Dispara 1 pageview por navegação do React Router — sem isso, o GA4 só
// contaria a primeira das 21 rotas (todas servem o mesmo index.html).
//
// Renderizado como IRMÃO de <Routes> em src/main.tsx (mesmo slot do overlay
// Retune) — nunca dentro de App.tsx/Section*.tsx. A home é intocável neste
// pacote; como este componente vive fora dela, cobre a rota "/" também sem
// precisar editar nenhum arquivo da home.
import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { ANALYTICS_ENABLED } from "./config";
import { track } from "./track";

export function RouteTracker() {
  const location = useLocation();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    if (!ANALYTICS_ENABLED) return;

    const key = location.pathname + location.search;
    // Evita duplicar o mesmo pathname em sequência — o StrictMode do dev
    // roda o efeito 2x no mount, mas a chave não muda entre as duas vezes.
    if (lastTracked.current === key) return;
    lastTracked.current = key;

    track("page_view", {
      page_path: location.pathname,
      page_location: window.location.href,
    });
  }, [location.pathname, location.search]);

  return null;
}
