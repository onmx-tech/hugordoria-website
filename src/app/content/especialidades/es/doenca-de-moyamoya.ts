import type { ArticleContent } from "../types";

// Reestruturado no molde rico, reorganizando o conteúdo original sem novas
// afirmações médicas.
export const article: ArticleContent = {
  slug: "doenca-de-moyamoya",
  category: "Vascular",
  readingTime: "5 min",
  lead: "Estrechamiento progresivo de las arterias cerebrales tratado por revascularización para prevenir ACV.",
  heroMeta: [
    { label: "Abordaje", value: "Revascularización cerebral" },
    { label: "Franjas de riesgo", value: "5–10 y 30–40 años" },
    { label: "Objetivo", value: "Prevenir ACV" },
  ],
  sections: [
    {
      id: "o-que-e",
      tocLabel: "Qué es",
      heading: "Una “nube de humo” en los vasos del cerebro.",
      emphasis: "nube de humo",
      figureCaption: "Fig. 01 — Red colateral de Moya-Moya",
      paragraphs: [
        "La Enfermedad de Moya-Moya afecta los vasos sanguíneos del cerebro: provoca el estrechamiento progresivo de las arterias que llevan sangre al cerebro, resultando en la formación de vasos colaterales anormales con apariencia de “nube de humo” en exámenes de imagen — de ahí el nombre, que significa “humo” en japonés.",
        "La causa exacta aún es desconocida, pero los factores genéticos tienen un papel importante. La condición puede ser primaria o caracterizar un síndrome cuando se asocia a otras enfermedades, como anemia falciforme, Síndrome de Down o condiciones autoinmunes.",
        "Es más común en poblaciones asiáticas, pero ocurre en todo el mundo, incluso en Brasil. Afecta a niños y adultos, con mayor riesgo entre los 5 y los 10 años en los niños y entre los 30 y los 40 años en los adultos.",
      ],
    },
    {
      id: "sintomas",
      tocLabel: "Síntomas",
      heading: "Manifestaciones según la edad",
      paragraphs: [
        "Los síntomas varían con la edad. En niños, predominan los ACV isquémicos y los ataques isquémicos transitorios — cerca del 65% al 70% presentan debilidad, entumecimiento o dificultad del habla como primeros signos. En adultos, predomina la hemorragia intracerebral (cerca del 40% de los casos), aunque los ACV isquémicos también son frecuentes:",
      ],
      bullets: [
        "ACV isquémico o AIT",
        "Hemorragia intracerebral",
        "Crisis convulsivas",
        "Alteraciones cognitivas progresivas",
      ],
    },
    {
      id: "diagnostico",
      tocLabel: "Diagnóstico",
      heading: "Diagnóstico por imagen",
      paragraphs: [
        "La angiografía cerebral es el patrón de oro para confirmar el estrechamiento de las arterias y la presencia de los vasos colaterales.",
        "La resonancia magnética evalúa posibles áreas afectadas por isquemia, y la tomografía computarizada puede identificar alteraciones iniciales o daños cerebrales. En conjunto, estos exámenes ayudan a definir el estadio de la enfermedad y a planificar el tratamiento.",
      ],
    },
    {
      id: "tratamento",
      tocLabel: "Tratamiento",
      heading: "Revascularización cerebral",
      paragraphs: [
        "El tratamiento es esencial para prevenir ACV y hemorragias. Cada caso se evalúa individualmente, y el tratamiento quirúrgico, en manos especializadas, reduce el riesgo de ACV:",
      ],
      options: [
        {
          title: "Revascularización directa (bypass)",
          description:
            "Creación de nuevas conexiones entre vasos sanguíneos para garantizar la circulación adecuada al cerebro. Debe ser realizada por un neurocirujano experimentado en microcirugía vascular.",
        },
        {
          title: "Revascularización indirecta",
          description:
            "Técnicas como la encefalomiosinangiosis (EMS), la EDAS y la EMAS, en las que se coloca tejido vascularizado sobre el cerebro para estimular, a lo largo del tiempo, el desarrollo de nuevos vasos y mejorar el flujo colateral.",
        },
        {
          title: "Medicamentos",
          description:
            "Aunque no curan la enfermedad, medicamentos como la aspirina pueden reducir el riesgo de formación de coágulos hasta que se realice la cirugía.",
        },
      ],
    },
  ],
};
