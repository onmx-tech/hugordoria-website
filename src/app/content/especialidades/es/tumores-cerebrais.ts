import type { ArticleContent } from "../types";

// Reestruturado no molde rico — o texto corrido original foi dividido nas
// seções, sem novas afirmações médicas.
export const article: ArticleContent = {
  slug: "tumores-cerebrais",
  category: "Tumoral",
  readingTime: "4 min",
  lead: "Lesiones expansivas del sistema nervioso central tratadas por microcirugía de precisión y terapias adyuvantes.",
  heroMeta: [
    { label: "Abordaje", value: "Microcirugía de precisión" },
    { label: "Diagnóstico", value: "TC y resonancia" },
    { label: "Complemento", value: "Radio/quimioterapia" },
  ],
  quote: {
    text: "El objetivo es la extirpación más amplia posible, con el menor compromiso neurológico del paciente.",
    emphasis: "menor compromiso neurológico",
    afterSectionId: "tratamento",
  },
  sections: [
    {
      id: "o-que-e",
      tocLabel: "Qué es",
      heading: "Una lesión expansiva dentro de la caja craneal.",
      emphasis: "caja craneal",
      figureCaption: "Fig. 01 — Lesión expansiva infiltrando el parénquima · ilustración",
      figureSrc: "tumores-cerebrais-fig01",
      paragraphs: [
        "Los tumores cerebrales resultan de la multiplicación desordenada de células en el sistema nervioso central, formando una lesión expansiva dentro de un sistema cerrado, la caja craneal. Todas las franjas de edad se ven afectadas — en niños hay predominio del piso inferior del cráneo (fosa posterior) y en adultos del piso superior (supratentorial).",
        "Existen enfermedades heredadas genéticamente, como la neurofibromatosis y la esclerosis tuberosa, que favorecen su aparición. Las lesiones se clasifican por sus características celulares — astrocitomas, oligodendrogliomas, ependimomas, meningiomas, neurinomas — y, hoy, también por caracterización molecular y genética, con el objetivo de individualizar el tratamiento y trazar el pronóstico.",
      ],
    },
    {
      id: "sintomas",
      tocLabel: "Síntomas",
      heading: "Signos de alerta",
      paragraphs: [
        "Las manifestaciones más frecuentes son dolores de cabeza de fuerte intensidad o el cambio del patrón de la cefalea habitual; también pueden surgir déficits progresivos y crisis convulsivas:",
      ],
      bullets: [
        "Cefalea intensa o cambio de patrón",
        "Alteraciones motoras y sensitivas",
        "Alteraciones visuales",
        "Crisis convulsivas",
      ],
    },
    {
      id: "diagnostico",
      tocLabel: "Diagnóstico",
      heading: "Diagnóstico por imagen",
      paragraphs: [
        "La investigación se inicia con un examen de imagen — la tomografía y, con más detalle, la resonancia del cráneo. Tras la cirugía, el tejido extraído se analiza y el seguimiento continúa con observación neurológica y resonancia seriada.",
      ],
    },
    {
      id: "tratamento",
      tocLabel: "Tratamiento",
      heading: "Conducta y tratamiento",
      paragraphs: [
        "El tratamiento generalmente se inicia por un procedimiento quirúrgico, con el objetivo de recolectar material para análisis y, la mayoría de las veces, realizar la extirpación más amplia posible con el menor compromiso neurológico:",
      ],
      options: [
        {
          title: "Resección microquirúrgica",
          description:
            "Técnica microquirúrgica de precisión apoyada por neuronavegador, aspirador ultrasónico y monitorización neurofisiológica de potencial evocado sensitivo-motor para preservar áreas elocuentes.",
        },
        {
          title: "Cirugía con paciente despierto y biopsia guiada",
          description:
            "Electrocorticografía para identificar áreas cerebrales elocuentes y cirugía con el paciente despierto; biopsias guiadas por estereotaxia o neuronavegador cuando esté indicado.",
        },
        {
          title: "Terapias complementarias",
          description:
            "Tras el análisis del tejido, el tratamiento puede complementarse con radioterapia y quimioterapia, según el tipo tumoral.",
        },
      ],
    },
  ],
};
