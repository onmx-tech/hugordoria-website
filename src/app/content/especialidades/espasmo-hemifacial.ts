import type { ArticleContent } from "./types";

// Reestruturado no molde rico — o texto corrido original foi dividido nas
// seções, sem novas afirmações médicas.
export const article: ArticleContent = {
  slug: "espasmo-hemifacial",
  category: "Funcional",
  readingTime: "3 min",
  lead: "Contrações involuntárias de um lado da face, tratadas de forma definitiva por descompressão microvascular.",
  heroMeta: [
    { label: "Abordagem", value: "Descompressão microvascular" },
    { label: "Diagnóstico", value: "Ressonância magnética" },
    { label: "Causa", value: "Alça vascular sobre o nervo facial" },
  ],
  quote: {
    text: "A descompressão microcirúrgica do nervo facial consiste no tratamento efetivo.",
    emphasis: "tratamento efetivo",
    afterSectionId: "tratamento",
  },
  sections: [
    {
      id: "o-que-e",
      tocLabel: "O que é",
      heading: "Contração involuntária de um lado da face.",
      emphasis: "um lado da face",
      figureCaption: "Fig. 01 — Conflito neurovascular do nervo facial",
      paragraphs: [
        "O espasmo hemifacial é uma doença rara caracterizada por contração involuntária de um lado da face. Aparece espontaneamente e geralmente piora de forma progressiva. Apresenta efeito estético e psicologicamente danoso ao paciente.",
        "A principal causa é semelhante à da neuralgia do trigêmeo: frequentemente uma alça vascular está sobreposta ao nervo facial, promovendo, pelo pulsar contínuo sobre o nervo, inflamação e despolarização involuntária e repetida.",
      ],
    },
    {
      id: "sintomas",
      tocLabel: "Sintomas",
      heading: "Como se manifesta",
      paragraphs: [
        "As contrações involuntárias dos músculos da expressão facial são preponderantes ao redor dos olhos, progredindo paulatinamente aos músculos que contraem uma metade da boca. São intensificadas pelo estresse:",
      ],
      bullets: [
        "Contração ao redor dos olhos",
        "Progressão para a metade da boca",
        "Intensificação pelo estresse",
      ],
    },
    {
      id: "diagnostico",
      tocLabel: "Diagnóstico",
      heading: "Diagnóstico por imagem",
      paragraphs: [
        "A ressonância magnética é o melhor método para o diagnóstico, permitindo identificar a alça vascular em conflito com o nervo facial.",
      ],
    },
    {
      id: "tratamento",
      tocLabel: "Tratamento",
      heading: "Conduta e tratamento",
      paragraphs: [
        "Não há tratamento clínico efetivo para o espasmo hemifacial — o tratamento cirúrgico é o único definitivo. Idosos ou pacientes com graves comorbidades clínicas não são candidatos à cirurgia:",
      ],
      options: [
        {
          title: "Toxina botulínica",
          description:
            "Usada em casos específicos para tratar as contrações involuntárias de metade do rosto, com efeito temporário.",
        },
        {
          title: "Descompressão microvascular",
          description:
            "Tratamento efetivo: descompressão microcirúrgica do nervo facial com interposição de prótese entre o nervo e a alça vascular. Indicada para pacientes aptos ao procedimento neurocirúrgico.",
        },
      ],
    },
  ],
};
