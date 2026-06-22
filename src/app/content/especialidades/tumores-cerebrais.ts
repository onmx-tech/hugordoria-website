import type { ArticleContent } from "./types";

// Reestruturado no molde rico — o texto corrido original foi dividido nas
// seções, sem novas afirmações médicas.
export const article: ArticleContent = {
  slug: "tumores-cerebrais",
  category: "Tumoral",
  readingTime: "4 min",
  lead: "Lesões expansivas do sistema nervoso central tratadas por microcirurgia de precisão e terapias complementares.",
  heroMeta: [
    { label: "Abordagem", value: "Microcirurgia de precisão" },
    { label: "Diagnóstico", value: "TC e ressonância" },
    { label: "Complemento", value: "Radio/quimioterapia" },
  ],
  quote: {
    text: "O objetivo é a retirada mais ampla possível, com o menor acometimento neurológico do paciente.",
    emphasis: "menor acometimento neurológico",
    afterSectionId: "tratamento",
  },
  sections: [
    {
      id: "o-que-e",
      tocLabel: "O que é",
      heading: "Uma lesão expansiva dentro da caixa craniana.",
      emphasis: "caixa craniana",
      figureCaption: "Fig. 01 — Lesão expansiva supratentorial",
      paragraphs: [
        "Os tumores cerebrais resultam da multiplicação desordenada de células no sistema nervoso central, formando uma lesão expansiva dentro de um sistema fechado, a caixa craniana. Todas as faixas etárias são acometidas — em crianças há predomínio do andar inferior do crânio (fossa posterior) e em adultos do andar superior (supratentorial).",
        "Existem doenças herdadas geneticamente, como a neurofibromatose e a esclerose tuberosa, que favorecem o seu surgimento. As lesões são classificadas por suas características celulares — astrocitomas, oligodendrogliomas, ependimomas, meningeomas, neurinomas — e, hoje, também por caracterização molecular e genética, com o objetivo de individualizar o tratamento e traçar o prognóstico.",
      ],
    },
    {
      id: "sintomas",
      tocLabel: "Sintomas",
      heading: "Sinais de alerta",
      paragraphs: [
        "As manifestações mais frequentes são dores de cabeça de forte intensidade ou a mudança do padrão da cefaleia habitual; também podem surgir déficits progressivos e crises convulsivas:",
      ],
      bullets: [
        "Cefaleia intensa ou mudança de padrão",
        "Alterações motoras e sensitivas",
        "Alterações visuais",
        "Crises convulsivas",
      ],
    },
    {
      id: "diagnostico",
      tocLabel: "Diagnóstico",
      heading: "Diagnóstico por imagem",
      paragraphs: [
        "A investigação inicia-se com exame de imagem — a tomografia e, mais detalhadamente, a ressonância do crânio. Após a cirurgia, o tecido retirado é analisado e o acompanhamento segue com observação neurológica e ressonância seriada.",
      ],
    },
    {
      id: "tratamento",
      tocLabel: "Tratamento",
      heading: "Conduta e tratamento",
      paragraphs: [
        "O tratamento geralmente inicia-se por procedimento cirúrgico, com o objetivo de coletar material para análise e, na maioria das vezes, realizar a retirada mais ampla possível com o menor acometimento neurológico:",
      ],
      options: [
        {
          title: "Ressecção microcirúrgica",
          description:
            "Técnica microcirúrgica de precisão apoiada por neuronavegador, aspirador ultrassônico e monitorização neurofisiológica de potencial evocado sensitivo-motor para preservar áreas eloquentes.",
        },
        {
          title: "Cirurgia acordada e biópsia guiada",
          description:
            "Eletrocorticografia para identificar áreas cerebrais eloquentes e cirurgia com o paciente acordado; biópsias guiadas por estereotaxia ou neuronavegador quando indicado.",
        },
        {
          title: "Terapias complementares",
          description:
            "Após a análise do tecido, o tratamento pode ser complementado com radioterapia e quimioterapia, conforme o tipo tumoral.",
        },
      ],
    },
  ],
};
