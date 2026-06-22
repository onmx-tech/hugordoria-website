import type { ArticleContent } from "./types";

// Reestruturado no molde rico — o texto corrido original foi dividido nas
// seções, sem novas afirmações médicas.
export const article: ArticleContent = {
  slug: "neuralgia-do-trigemeo",
  category: "Funcional",
  readingTime: "3 min",
  lead: "Dor facial lancinante em crises, com ótimo resultado cirúrgico — até 85% dos pacientes sem sintomas.",
  heroMeta: [
    { label: "Abordagem", value: "Descompressão ou rizotomia" },
    { label: "Incidência", value: "> 50 anos, mais em mulheres" },
    { label: "Resultado", value: "Até 85% sem dor" },
  ],
  quote: {
    text: "A cirurgia apresenta ótimo resultado, com regressão completa dos sintomas em até 85% dos casos.",
    emphasis: "regressão completa",
    afterSectionId: "tratamento",
  },
  sections: [
    {
      id: "o-que-e",
      tocLabel: "O que é",
      heading: "Dor lancinante limitada a um lado da face.",
      emphasis: "um lado da face",
      figureCaption: "Fig. 01 — Conflito neurovascular do trigêmeo",
      paragraphs: [
        "A neuralgia do trigêmeo, também chamada de “tic douloureux”, é caracterizada por dor lancinante, em crises, limitada a um lado da face — na região dos olhos, da asa do nariz, da mandíbula e dentes, ou em todas essas localizações. As dores são de curta duração, com completa remissão entre as crises.",
        "Geralmente ocorre em pacientes com mais de 50 anos e muito mais frequentemente nas mulheres. A causa mais frequente é a inflamação do nervo em decorrência do pulsar contínuo de uma alça vascular sobre o nervo trigêmeo.",
      ],
    },
    {
      id: "sintomas",
      tocLabel: "Sintomas",
      heading: "Como a dor se apresenta",
      paragraphs: [
        "As crises podem ser provocadas por um sorriso, pelo ato de falar, escovar os dentes, mastigar ou pelo atrito com vento frio:",
      ],
      bullets: [
        "Dor lancinante em crises",
        "Gatilhos: falar, mastigar, escovar os dentes",
        "Sensibilidade ao vento frio",
        "Remissão completa entre as crises",
      ],
    },
    {
      id: "diagnostico",
      tocLabel: "Diagnóstico",
      heading: "Diagnóstico clínico",
      paragraphs: [
        "O diagnóstico é clínico, com auxílio da ressonância magnética para identificar a alça vascular em conflito com o nervo trigêmeo.",
      ],
    },
    {
      id: "tratamento",
      tocLabel: "Tratamento",
      heading: "Conduta e tratamento",
      paragraphs: [
        "O tratamento inicial compreende medicação específica. A falha ou a intolerância ao tratamento clínico pode ser resolvida por intervenção cirúrgica:",
      ],
      options: [
        {
          title: "Medicação",
          description:
            "Primeira linha de tratamento, com medicação específica para o controle da dor.",
        },
        {
          title: "Rizotomia percutânea",
          description:
            "Por balão (lesão mecânica por compressão) ou por radiofrequência (lesão térmica): uma agulha penetra o crânio pelo forame oval e promove lesão controlada da raiz do nervo trigêmeo.",
        },
        {
          title: "Descompressão microvascular",
          description:
            "Com microscópio de alta resolução, o nervo e a alça vascular são identificados, dissecados e separados, com interposição de prótese entre as estruturas — regressão completa dos sintomas em até 85% dos casos.",
        },
      ],
    },
  ],
};
