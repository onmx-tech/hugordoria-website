// Constantes de identidade do site usadas por metadados, OG e dados
// estruturados. Fonte única — não duplicar string de domínio/nome pelo código.

import { CONTATO, SOCIAL } from "../content/institucional";
import siteConfig from "../../../site.config.json";

/**
 * Origem canônica em produção (sem barra final). Vem de site.config.json —
 * o mesmo arquivo alimenta o index.html (via vite.config.ts) e o sitemap.
 * Trocar o domínio é trocar UMA linha lá.
 */
export const SITE_URL = siteConfig.siteUrl.replace(/\/$/, "");

export const SITE_NAME = "Dr. Hugo Doria";
export const SITE_LOCALE = "pt_BR";

/** Assinatura do profissional — usada nos títulos e no JSON-LD. */
export const DOCTOR = {
  name: "Dr. Hugo Doria",
  legalName: "Hugo Leonardo Doria Netto",
  jobTitle: "Neurocirurgião",
  credentials: "MD PhD",
  specialty: "Neurocirurgia vascular",
} as const;

/** Imagem padrão de compartilhamento (WhatsApp, LinkedIn, Facebook). */
export const DEFAULT_OG_IMAGE = "/og/og-default.jpg";
export const OG_IMAGE_W = 1200;
export const OG_IMAGE_H = 630;

export const DEFAULT_DESCRIPTION =
  "Neurocirurgião vascular em São Paulo. Tratamento microcirúrgico e endovascular de aneurismas, MAVs, tumores cerebrais e doenças neurológicas complexas.";

/** Endereço estruturado do consultório (Bela Vista, São Paulo). */
export const ADDRESS = {
  street: "R. Teixeira da Silva, 54 — sala 73",
  district: "Bela Vista",
  city: "São Paulo",
  state: "SP",
  postalCode: "04002-030",
  country: "BR",
} as const;

export { CONTATO, SOCIAL };

/** Monta uma URL absoluta a partir de um path do site. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
