import type { ArticleContent } from "../types";

// Reestruturado no molde rico — o texto corrido original foi dividido nas
// seções, sem novas afirmações médicas.
export const article: ArticleContent = {
  slug: "tumores-hipofisarios",
  category: "Tumoral",
  readingTime: "4 min",
  lead: "Tumores de la región selar (hipófisis) extirpados preferentemente por vía endoscópica endonasal.",
  heroMeta: [
    { label: "Abordaje", value: "Endoscópica endonasal" },
    { label: "Diagnóstico", value: "RM + estudio hormonal" },
    { label: "Clasificación", value: "Micro y macroadenoma" },
  ],
  quote: {
    text: "El tratamiento preferente es el acceso transnasal endoscópico, con resección microquirúrgica de la lesión.",
    emphasis: "transnasal endoscópico",
    afterSectionId: "tratamento",
  },
  sections: [
    {
      id: "o-que-e",
      tocLabel: "Qué es",
      heading: "Tumores de la glándula maestra del cuerpo.",
      emphasis: "glándula maestra",
      figureCaption: "Fig. 01 — Región selar",
      paragraphs: [
        "La región selar comprende la silla turca, estructura ósea en forma de silla dentro de la cual se encuentra la glándula hipófisis — también llamada glándula pituitaria o glándula maestra, por producir o almacenar la mayoría de las hormonas implicadas en el funcionamiento del cuerpo.",
        "Los tumores de la región selar comprenden principalmente los adenomas hipofisarios, craneofaringiomas y meningiomas. Los tumores hipofisarios se dividen en secretores y no secretores de hormonas y, en cuanto al tamaño, en microadenomas (< 1 cm) y macroadenomas (> 1 cm).",
      ],
    },
    {
      id: "sintomas",
      tocLabel: "Síntomas",
      heading: "Cómo se manifiestan",
      paragraphs: [
        "Los síntomas dependen de las características del tumor. Los microadenomas no secretores suelen ser asintomáticos; en los secretores, varían según la hormona en exceso. Los macroadenomas comprimen estructuras neurovasculares adyacentes — la cefalea y las alteraciones visuales por compresión de los nervios ópticos son los síntomas más comunes. En algunos casos ocurre hemorragia tumoral (apoplejía hipofisaria):",
      ],
      bullets: [
        "Cefalea",
        "Alteraciones visuales",
        "Trastornos hormonales",
        "Apoplejía hipofisaria",
      ],
    },
    {
      id: "diagnostico",
      tocLabel: "Diagnóstico",
      heading: "Diagnóstico por imagen y hormonal",
      paragraphs: [
        "El diagnóstico se realiza mediante la resonancia magnética, para identificar la masa tumoral, y mediante el estudio de las hormonas del eje hipotálamo-hipofisario. La tomografía computarizada de los senos paranasales puede utilizarse para la planificación del acceso quirúrgico.",
      ],
    },
    {
      id: "tratamento",
      tocLabel: "Tratamiento",
      heading: "Conducta y tratamiento",
      paragraphs: [
        "La elección del acceso depende del volumen y de la extensión del tumor:",
      ],
      options: [
        {
          title: "Acceso transnasal endoscópico",
          description:
            "Vía preferente a la región selar, con resección microquirúrgica de la lesión — sea el macroadenoma o el microadenoma secretor de hormonas — sin incisiones externas.",
        },
        {
          title: "Acceso transcraneal",
          description:
            "Indicado en grandes volúmenes tumorales, con extensión paraselar o supraselar y compresión de estructuras cerebrales, para la resección de los tumores de la región selar.",
        },
      ],
    },
  ],
};
