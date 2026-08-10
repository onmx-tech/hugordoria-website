// Barrel do conteúdo institucional.
//
// Este ARQUIVO (institucional.ts) tem precedência sobre a pasta
// institucional/index.ts na resolução de módulos — logo, todo import de
// "../content/institucional" cai aqui. É de propósito: os INVARIANTES abaixo
// (CONTATO, SOCIAL, DEPOIMENTOS_GALERIA — telefone/endereço/URLs/galeria, que
// não mudam com o idioma) precisam continuar exportados exatamente deste
// caminho, pois seo/site.ts importa CONTATO/SOCIAL daqui.
//
// Já o conteúdo TRADUZÍVEL (SOBRE_MIM, DOUTORADO, PUBLICACOES, EVENTOS,
// MIDIA_VIDEOS, SEGUNDA_OPINIAO) vive em institucional/{pt,en,es}.ts e é lido
// via getInstitucional(locale) — reexportado logo abaixo. Consumidores devem
// usar getInstitucional(locale) em vez de importar os objetos direto.

export { getInstitucional } from "./institucional/index";

export const CONTATO = {
  whatsapp: "+55 (11) 97162-2777",
  whatsappLink: "https://wa.me/5511971622777",
  endereco:
    "Rua Teixeira da Silva, 54 — conjunto 73, Bela Vista, São Paulo — SP, CEP 04002-030",
  mapsLink: "https://maps.app.goo.gl/jLGCpkNz1VXgS8fk7",
  // Rota ponto-a-ponto: abre o GPS já traçando o caminho até o consultório, no
  // app que a pessoa tiver. Pedido do cliente pensando em paciente idoso, que a
  // secretária instrui por telefone ("abre o site, desce e aperta Como chegar").
  // Google Maps universal em vez de Waze: quem não tem o app cai numa página de
  // instalação, e aí o atalho vira obstáculo.
  rotaLink:
    "https://www.google.com/maps/dir/?api=1&destination=Rua+Teixeira+da+Silva%2C+54+-+conjunto+73%2C+Bela+Vista%2C+S%C3%A3o+Paulo+-+SP%2C+04002-030",
  mapsEmbed:
    "https://maps.google.com/maps?q=R.%20Teixeira%20da%20Silva%2C%2054%20-%2073%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2004002-030%2C%20Brasil&t=m&z=16&output=embed&iwloc=near",
  // E-mail PROVISÓRIO — o original usa placeholder do Hostinger; confirmar com o cliente.
  email: "atendimento@centrodorianeuro.com.br",
} as const;

export const SOCIAL = {
  instagram: "https://www.instagram.com/drhugodoria/",
  facebook: "https://www.facebook.com/hugoleonardo.dorianetto/",
  linkedin: "https://www.linkedin.com/in/hugo-doria-md-phd-107b834b/",
} as const;

// 24 screenshots reais de avaliações (public/v4/depoimentos/depo-01..24.png).
export const DEPOIMENTOS_GALERIA = Array.from(
  { length: 24 },
  (_, i) => `/v4/depoimentos/depo-${String(i + 1).padStart(2, "0")}.png`,
);
