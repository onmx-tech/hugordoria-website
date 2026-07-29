import type { ArticleContent } from "../types";

// Reestruturado no molde rico, reorganizando o conteúdo original sem novas
// afirmações médicas.
export const article: ArticleContent = {
  slug: "cavernomas",
  category: "Vascular",
  readingTime: "6 min",
  lead: "Malformaciones vasculares de bajo flujo del encéfalo y de la médula, tratadas por microcirugía cuando son sintomáticas.",
  heroMeta: [
    { label: "Abordaje", value: "Observación o microcirugía" },
    { label: "Tasa de hemorragia", value: "0,8–3,8% al año" },
    { label: "Localización", value: "60–80% supratentorial" },
  ],
  quote: {
    text: "La resección microquirúrgica es el tratamiento de elección.",
    afterSectionId: "tratamento",
  },
  sections: [
    {
      id: "o-que-e",
      tocLabel: "Qué es",
      heading: "Malformaciones vasculares de bajo flujo.",
      emphasis: "bajo flujo",
      figureCaption: "Fig. 01 — Cavernoma encefálico",
      paragraphs: [
        "Las malformaciones cavernosas — también conocidas como angiomas cavernosos o cavernomas — son malformaciones vasculares de bajo flujo localizadas en el encéfalo y en la médula espinal, formadas por un conglomerado de canales sinusoidales dilatados revestidos por células endoteliales. Los vasos carecen de las capas musculares y elásticas normales, y no hay tejido neural en el interior de la lesión.",
        "Pueden ser esporádicos o familiares. Los familiares son hereditarios, de patrón autosómico dominante, corresponden al 30%–50% de los casos y frecuentemente con múltiples lesiones, a diferencia de los esporádicos, comúnmente únicos.",
        "Después de los aneurismas, son la lesión vascular más frecuente del sistema nervioso central (10%–15% de las malformaciones neurovasculares). No hay preferencia de género; entre el 60% y el 80% se localizan en el compartimento supratentorial. La presentación clínica es bimodal, más común en la tercera y cuarta décadas de la vida.",
      ],
    },
    {
      id: "sintomas",
      tocLabel: "Síntomas",
      heading: "Un amplio espectro de manifestaciones",
      paragraphs: [
        "Por la variabilidad en tamaño, localización y propensión al sangrado, los cavernomas causan un amplio espectro de síntomas, que cambian a lo largo del tiempo. Las crisis epilépticas son el síntoma más frecuente, por el potencial epileptógeno de los productos de degradación de la sangre; los déficits predominan en los cavernomas del tronco encefálico:",
      ],
      bullets: [
        "Crisis epilépticas",
        "Déficits neurológicos focales",
        "Hemorragias",
        "Hidrocefalia (infrecuente)",
      ],
    },
    {
      id: "diagnostico",
      tocLabel: "Diagnóstico",
      heading: "Diagnóstico por imagen",
      paragraphs: [
        "El diagnóstico es más difícil que el de otras enfermedades vasculares, ya que los cavernomas no son evidentes en la angiografía. La tomografía simple es el primer examen cuando hay sospecha de sangrado, pero es limitada.",
        "La resonancia magnética — con secuencias T1, T2, gradiente eco e imágenes ponderadas por susceptibilidad — es la herramienta central, capaz de distinguir lesiones en diferentes estadios de sangrado (agudas, subagudas y crónicas) y de auxiliar la navegación intraoperatoria en lesiones profundas.",
      ],
    },
    {
      id: "tratamento",
      tocLabel: "Tratamiento",
      heading: "Conducta y tratamiento",
      paragraphs: [
        "La presencia de síntomas, la localización, la edad y el historial de salud son los determinantes más importantes de la conducta, que requiere discusión multidisciplinaria:",
      ],
      options: [
        {
          title: "Observación",
          description:
            "Manejo conservador favorecido para pacientes asintomáticos o con riesgo prequirúrgico elevado.",
        },
        {
          title: "Resección microquirúrgica",
          description:
            "Tratamiento de elección. Indicada en hemorragias múltiples, déficit neurológico o convulsiones progresivas, con planificación por neuronavegación y métodos electroneurofisiológicos. La remoción completa, con el anillo de hemosiderina, evita sangrados y focos epileptógenos.",
        },
        {
          title: "Radiocirugía estereotáctica",
          description:
            "Opción para lesiones supratentoriales en localizaciones desfavorables o de alto riesgo quirúrgico. No se recomienda para cavernomas del tronco cerebral.",
        },
      ],
    },
  ],
};
