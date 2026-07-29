import type { ArticleContent } from "../types";

// Reestruturado no molde rico — o texto corrido original foi dividido nas
// seções, sem novas afirmações médicas.
export const article: ArticleContent = {
  slug: "espasmo-hemifacial",
  category: "Funcional",
  readingTime: "3 min",
  lead: "Contracciones involuntarias de un lado de la cara, tratadas por descompresión microvascular.",
  heroMeta: [
    { label: "Abordaje", value: "Descompresión microvascular" },
    { label: "Diagnóstico", value: "Resonancia magnética" },
    { label: "Causa", value: "Asa vascular sobre el nervio facial" },
  ],
  quote: {
    text: "La descompresión microquirúrgica del nervio facial constituye el tratamiento efectivo.",
    emphasis: "tratamiento efectivo",
    afterSectionId: "tratamento",
  },
  sections: [
    {
      id: "o-que-e",
      tocLabel: "Qué es",
      heading: "Contracción involuntaria de un lado de la cara.",
      emphasis: "un lado de la cara",
      figureCaption: "Fig. 01 — Conflicto neurovascular del nervio facial",
      paragraphs: [
        "El espasmo hemifacial es una enfermedad rara caracterizada por la contracción involuntaria de un lado de la cara. Aparece espontáneamente y generalmente empeora de forma progresiva. Presenta un efecto estético y psicológicamente dañino para el paciente.",
        "La principal causa es similar a la de la neuralgia del trigémino: frecuentemente un asa vascular está sobrepuesta al nervio facial, promoviendo, por el pulsar continuo sobre el nervio, inflamación y despolarización involuntaria y repetida.",
      ],
    },
    {
      id: "sintomas",
      tocLabel: "Síntomas",
      heading: "Cómo se manifiesta",
      paragraphs: [
        "Las contracciones involuntarias de los músculos de la expresión facial son preponderantes alrededor de los ojos, progresando paulatinamente hacia los músculos que contraen una mitad de la boca. Se intensifican con el estrés:",
      ],
      bullets: [
        "Contracción alrededor de los ojos",
        "Progresión hacia la mitad de la boca",
        "Intensificación con el estrés",
      ],
    },
    {
      id: "diagnostico",
      tocLabel: "Diagnóstico",
      heading: "Diagnóstico por imagen",
      paragraphs: [
        "La resonancia magnética es el mejor método para el diagnóstico, permitiendo identificar el asa vascular en conflicto con el nervio facial.",
      ],
    },
    {
      id: "tratamento",
      tocLabel: "Tratamiento",
      heading: "Conducta y tratamiento",
      paragraphs: [
        "No hay tratamiento clínico efectivo para el espasmo hemifacial. Los ancianos o pacientes con graves comorbilidades clínicas no son candidatos a la cirugía:",
      ],
      options: [
        {
          title: "Toxina botulínica",
          description:
            "Usada en casos específicos para tratar las contracciones involuntarias de la mitad del rostro, con efecto temporal.",
        },
        {
          title: "Descompresión microvascular",
          description:
            "Tratamiento efectivo: descompresión microquirúrgica del nervio facial con interposición de una prótesis entre el nervio y el asa vascular. Indicada para pacientes aptos para el procedimiento neuroquirúrgico.",
        },
      ],
    },
  ],
};
