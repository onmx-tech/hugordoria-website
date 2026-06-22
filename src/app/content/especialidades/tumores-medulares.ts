import type { ArticleContent } from "./types";

// Reestruturado no molde rico — o texto corrido original foi dividido nas
// seções, sem novas afirmações médicas.
export const article: ArticleContent = {
  slug: "tumores-medulares",
  category: "Tumoral",
  readingTime: "3 min",
  lead: "Tumores da coluna e da medula tratados por técnica microcirúrgica, conforme o tipo celular identificado.",
  heroMeta: [
    { label: "Abordagem", value: "Microcirúrgica" },
    { label: "Diagnóstico", value: "Exame neurológico + RM" },
    { label: "Complemento", value: "Conforme a biópsia" },
  ],
  quote: {
    text: "O tratamento é fundamentado na técnica microcirúrgica, conforme o tipo celular identificado pela biópsia.",
    emphasis: "técnica microcirúrgica",
    afterSectionId: "tratamento",
  },
  sections: [
    {
      id: "o-que-e",
      tocLabel: "O que é",
      heading: "Tumores da coluna e da medula espinhal.",
      emphasis: "coluna e da medula",
      figureCaption: "Fig. 01 — Acometimento medular",
      paragraphs: [
        "Tumores da coluna vertebral podem acometer o osso vertebral, as meninges ou a medula propriamente dita. Na maioria das vezes, os tumores vertebrais são metástases — consequências de tumores primários localizados em outros órgãos, como pulmão, mama, próstata, ovários ou intestinos.",
        "Nos tumores medulares, ependimomas e astrocitomas são os mais frequentes.",
      ],
    },
    {
      id: "sintomas",
      tocLabel: "Sintomas",
      heading: "Sinais de alerta",
      paragraphs: [
        "Nas metástases vertebrais, o principal sintoma é a dor, localizada ou irradiada no trajeto dos nervos. Nos tumores medulares, predominam alterações de força e de sensibilidade:",
      ],
      bullets: [
        "Dor localizada ou irradiada",
        "Perda de força muscular",
        "Alterações da sensibilidade",
      ],
    },
    {
      id: "diagnostico",
      tocLabel: "Diagnóstico",
      heading: "Diagnóstico por imagem",
      paragraphs: [
        "O diagnóstico é realizado por exame neurológico acurado e exames de imagem, como a ressonância magnética, a cintilografia e a tomografia computadorizada.",
      ],
    },
    {
      id: "tratamento",
      tocLabel: "Tratamento",
      heading: "Conduta e tratamento",
      paragraphs: [
        "O tratamento específico é fundamentado na técnica microcirúrgica, podendo ser associado a terapias complementares de acordo com o tipo celular:",
      ],
      options: [
        {
          title: "Ressecção microcirúrgica",
          description:
            "Técnica microcirúrgica de precisão para abordar tumores do osso vertebral, das meninges ou da medula.",
        },
        {
          title: "Radioterapia e/ou quimioterapia",
          description:
            "Associadas à cirurgia conforme o tipo celular tumoral identificado pela biópsia.",
        },
      ],
    },
  ],
};
