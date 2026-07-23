// Builders de dados estruturados (schema.org). O Google usa isso para exibir
// o cartão de conhecimento do profissional, o endereço do consultório e a
// trilha de navegação nos resultados de busca.

import {
  ADDRESS,
  CONTATO,
  DOCTOR,
  SITE_NAME,
  SITE_URL,
  SOCIAL,
  absoluteUrl,
} from "./site";

/** Perfil do profissional + consultório. Vai no index.html e na home. */
export function physicianSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${SITE_URL}/#physician`,
    name: DOCTOR.name,
    alternateName: DOCTOR.legalName,
    url: SITE_URL,
    image: absoluteUrl("/og/og-default.jpg"),
    medicalSpecialty: "Neurologic",
    description: `${DOCTOR.jobTitle} ${DOCTOR.credentials} — ${DOCTOR.specialty}.`,
    telephone: CONTATO.whatsapp,
    email: CONTATO.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS.street,
      addressLocality: ADDRESS.city,
      addressRegion: ADDRESS.state,
      postalCode: ADDRESS.postalCode,
      addressCountry: ADDRESS.country,
    },
    areaServed: { "@type": "City", name: ADDRESS.city },
    sameAs: [SOCIAL.instagram, SOCIAL.facebook, SOCIAL.linkedin],
  };
}

export function websiteSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "pt-BR",
    publisher: { "@id": `${SITE_URL}/#physician` },
  };
}

/** Trilha de navegação: Início › Especialidades › Aneurisma Cerebral. */
export function breadcrumbSchema(
  items: { name: string; path: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Bloco de perguntas frequentes de uma página (ex.: /segunda-opiniao). */
export function faqSchema(
  items: readonly { question: string; answer: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/**
 * Página de especialidade. `MedicalWebPage` sinaliza conteúdo de saúde
 * revisado por profissional — o autor é o próprio Dr. Hugo Doria.
 */
export function medicalPageSchema(args: {
  name: string;
  description: string;
  path: string;
  image?: string;
  conditionName: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: args.name,
    description: args.description,
    url: absoluteUrl(args.path),
    inLanguage: "pt-BR",
    ...(args.image ? { image: absoluteUrl(args.image) } : {}),
    about: { "@type": "MedicalCondition", name: args.conditionName },
    author: { "@id": `${SITE_URL}/#physician` },
    reviewedBy: { "@id": `${SITE_URL}/#physician` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
}
