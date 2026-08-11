import type { ArticleContent } from "../types";

// Reestruturado no molde rico — o texto corrido original foi dividido nas
// seções, sem novas afirmações médicas.
export const article: ArticleContent = {
  slug: "neuralgia-do-trigemeo",
  category: "Funcional",
  readingTime: "3 min",
  lead: "Dolor facial punzante en crisis.",
  heroMeta: [
    { label: "Abordaje", value: "Descompresión o rizotomía" },
    { label: "Incidencia", value: "> 50 años, más en mujeres" },
  ],
  sections: [
    {
      id: "o-que-e",
      tocLabel: "Qué es",
      heading: "Dolor punzante limitado a un lado de la cara.",
      emphasis: "un lado de la cara",
      figureCaption: "Fig. 01 — Ilustración: árbol vascular cerebral",
      figureSrc: "angiografia",
      paragraphs: [
        "La neuralgia del trigémino, también llamada “tic douloureux”, se caracteriza por un dolor punzante, en crisis, limitado a un lado de la cara — en la región de los ojos, del ala de la nariz, de la mandíbula y los dientes, o en todas esas localizaciones. Los dolores son de corta duración, con completa remisión entre las crisis.",
        "Generalmente ocurre en pacientes mayores de 50 años y con mucha mayor frecuencia en las mujeres. La causa más frecuente es la inflamación del nervio como consecuencia de la pulsación continua de un asa vascular sobre el nervio trigémino.",
      ],
    },
    {
      id: "sintomas",
      tocLabel: "Síntomas",
      heading: "Cómo se presenta el dolor",
      paragraphs: [
        "Las crisis pueden ser provocadas por una sonrisa, por el acto de hablar, cepillarse los dientes, masticar o por el roce con viento frío:",
      ],
      bullets: [
        "Dolor punzante en crisis",
        "Desencadenantes: hablar, masticar, cepillarse los dientes",
        "Sensibilidad al viento frío",
        "Remisión completa entre las crisis",
      ],
    },
    {
      id: "diagnostico",
      tocLabel: "Diagnóstico",
      heading: "Diagnóstico clínico",
      paragraphs: [
        "El diagnóstico es clínico, con ayuda de la resonancia magnética para identificar el asa vascular en conflicto con el nervio trigémino.",
      ],
    },
    {
      id: "tratamento",
      tocLabel: "Tratamiento",
      heading: "Conducta y tratamiento",
      paragraphs: [
        "El tratamiento inicial comprende medicación específica. El fracaso o la intolerancia al tratamiento clínico puede resolverse mediante intervención quirúrgica:",
      ],
      options: [
        {
          title: "Medicación",
          description:
            "Primera línea de tratamiento, con medicación específica para el control del dolor.",
        },
        {
          title: "Rizotomía percutánea",
          description:
            "Por balón (lesión mecánica por compresión) o por radiofrecuencia (lesión térmica): una aguja penetra el cráneo por el agujero oval y promueve una lesión controlada de la raíz del nervio trigémino.",
        },
        {
          title: "Descompresión microvascular",
          description:
            "Con microscopio de alta resolución, el nervio y el asa vascular se identifican, disecan y separan, con interposición de una prótesis entre las estructuras.",
        },
      ],
    },
  ],
};
