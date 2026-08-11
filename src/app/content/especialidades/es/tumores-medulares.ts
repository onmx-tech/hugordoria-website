import type { ArticleContent } from "../types";

// Reestruturado no molde rico — o texto corrido original foi dividido nas
// seções, sem novas afirmações médicas.
export const article: ArticleContent = {
  slug: "tumores-medulares",
  category: "Tumoral",
  readingTime: "3 min",
  lead: "Tumores de la columna y de la médula tratados por técnica microquirúrgica, según el tipo celular identificado.",
  heroMeta: [
    { label: "Abordaje", value: "Microquirúrgica" },
    { label: "Diagnóstico", value: "Examen neurológico + RM" },
    { label: "Complemento", value: "Según la biopsia" },
  ],
  quote: {
    text: "El tratamiento se fundamenta en la técnica microquirúrgica, según el tipo celular identificado por la biopsia.",
    emphasis: "técnica microquirúrgica",
    afterSectionId: "tratamento",
  },
  sections: [
    {
      id: "o-que-e",
      tocLabel: "Qué es",
      heading: "Tumores de la columna y de la médula espinal.",
      emphasis: "columna y de la médula",
      figureCaption: "Fig. 01 — Tumor intramedular expandiendo el cordón · ilustración",
      figureSrc: "tumores-medulares-fig01",
      paragraphs: [
        "Los tumores de la columna vertebral pueden afectar el hueso vertebral, las meninges o la médula propiamente dicha. La mayoría de las veces, los tumores vertebrales son metástasis — consecuencias de tumores primarios localizados en otros órganos, como pulmón, mama, próstata, ovarios o intestinos.",
        "En los tumores medulares, los ependimomas y astrocitomas son los más frecuentes.",
      ],
    },
    {
      id: "sintomas",
      tocLabel: "Síntomas",
      heading: "Signos de alerta",
      paragraphs: [
        "En las metástasis vertebrales, el principal síntoma es el dolor, localizado o irradiado en el trayecto de los nervios. En los tumores medulares, predominan las alteraciones de fuerza y de sensibilidad:",
      ],
      bullets: [
        "Dolor localizado o irradiado",
        "Pérdida de fuerza muscular",
        "Alteraciones de la sensibilidad",
      ],
    },
    {
      id: "diagnostico",
      tocLabel: "Diagnóstico",
      heading: "Diagnóstico por imagen",
      paragraphs: [
        "El diagnóstico se realiza mediante un examen neurológico minucioso y exámenes de imagen, como la resonancia magnética, la gammagrafía y la tomografía computarizada.",
      ],
    },
    {
      id: "tratamento",
      tocLabel: "Tratamiento",
      heading: "Conducta y tratamiento",
      paragraphs: [
        "El tratamiento específico se fundamenta en la técnica microquirúrgica, pudiendo asociarse a terapias adyuvantes de acuerdo con el tipo celular:",
      ],
      options: [
        {
          title: "Resección microquirúrgica",
          description:
            "Técnica microquirúrgica de precisión para abordar tumores del hueso vertebral, de las meninges o de la médula.",
        },
        {
          title: "Radioterapia y/o quimioterapia",
          description:
            "Asociadas a la cirugía según el tipo celular tumoral identificado por la biopsia.",
        },
      ],
    },
  ],
};
