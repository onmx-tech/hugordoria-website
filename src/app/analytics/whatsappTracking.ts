// Listener DELEGADO no document inteiro para clique em qualquer link de
// WhatsApp (wa.me) — cobre TODOS os CTAs do site (FloatingNav "Agendar",
// Footer, SectionBrain, EspecialidadePage, canal da página de Contato) sem
// precisar de onClick espalhado por 21 arquivos. Como hoje todo CTA de
// agendamento aponta para wa.me, este mesmo listener também é o sinal de
// "clique em CTA de agendamento" pedido no briefing.
import { ANALYTICS_ENABLED } from "./config";
import { track } from "./track";
import { appendUtmToUrl } from "./utm";

let initialized = false;

/** Extrai o slug de especialidade da rota atual, se houver (/especialidade/:slug). */
function especialidadeFromPath(pathname: string): string | undefined {
  const match = pathname.match(/^\/especialidade\/([^/]+)/);
  return match?.[1];
}

export function initWhatsAppTracking(): void {
  if (!ANALYTICS_ENABLED || initialized || typeof document === "undefined") return;
  initialized = true;

  document.addEventListener("click", (event) => {
    const target = event.target as Element | null;
    const anchor = target?.closest?.('a[href*="wa.me"]') as HTMLAnchorElement | null;
    if (!anchor) return;

    // A UTM da sessão entra no href ANTES do navegador seguir o clique — a
    // navegação só acontece depois que todos os listeners de "click" (fase
    // de bubble, síncrona) terminarem de rodar.
    anchor.href = appendUtmToUrl(anchor.href);

    track("contato_whatsapp", {
      origem_pagina: window.location.pathname,
      especialidade: especialidadeFromPath(window.location.pathname),
    });
  });
}
