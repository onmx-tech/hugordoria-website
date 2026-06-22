import type { ArticleContent } from "./types";

// Reestruturado no molde rico, reorganizando o conteúdo original sem novas
// afirmações médicas.
export const article: ArticleContent = {
  slug: "doenca-de-moyamoya",
  category: "Vascular",
  readingTime: "5 min",
  lead: "Estreitamento progressivo das artérias cerebrais tratado por revascularização para prevenir AVCs.",
  heroMeta: [
    { label: "Abordagem", value: "Revascularização cerebral" },
    { label: "Faixas de risco", value: "5–10 e 30–40 anos" },
    { label: "Objetivo", value: "Prevenir AVC" },
  ],
  quote: {
    text: "O tratamento cirúrgico especializado reduz significativamente o risco de AVCs e melhora a qualidade de vida.",
    emphasis: "o risco de AVCs",
    afterSectionId: "tratamento",
  },
  sections: [
    {
      id: "o-que-e",
      tocLabel: "O que é",
      heading: "Uma “nuvem de fumaça” nos vasos do cérebro.",
      emphasis: "nuvem de fumaça",
      figureCaption: "Fig. 01 — Rede colateral de Moya-Moya",
      paragraphs: [
        "A Doença de Moya-Moya afeta os vasos sanguíneos do cérebro: provoca o estreitamento progressivo das artérias que levam sangue ao cérebro, resultando na formação de vasos colaterais anormais com aparência de “nuvem de fumaça” em exames de imagem — daí o nome, que significa “fumaça” em japonês.",
        "A causa exata ainda é desconhecida, mas fatores genéticos têm papel importante. A condição pode ser primária ou caracterizar uma síndrome quando associada a outras doenças, como anemia falciforme, Síndrome de Down ou condições autoimunes.",
        "É mais comum em populações asiáticas, mas ocorre em todo o mundo, inclusive no Brasil. Afeta crianças e adultos, com maior risco entre 5 e 10 anos nas crianças e entre 30 e 40 anos nos adultos.",
      ],
    },
    {
      id: "sintomas",
      tocLabel: "Sintomas",
      heading: "Manifestações conforme a idade",
      paragraphs: [
        "Os sintomas variam com a idade. Em crianças, predominam os AVCs isquêmicos e ataques isquêmicos transitórios — cerca de 65% a 70% apresentam fraqueza, dormência ou dificuldade de fala como primeiros sinais. Em adultos, predomina a hemorragia intracerebral (cerca de 40% dos casos), embora AVCs isquêmicos também sejam frequentes:",
      ],
      bullets: [
        "AVC isquêmico ou AIT",
        "Hemorragia intracerebral",
        "Crises convulsivas",
        "Alterações cognitivas progressivas",
      ],
    },
    {
      id: "diagnostico",
      tocLabel: "Diagnóstico",
      heading: "Diagnóstico por imagem",
      paragraphs: [
        "A angiografia cerebral é o padrão-ouro para confirmar o estreitamento das artérias e a presença dos vasos colaterais.",
        "A ressonância magnética avalia possíveis áreas afetadas por isquemia, e a tomografia computadorizada pode identificar alterações iniciais ou danos cerebrais. Em conjunto, esses exames ajudam a definir o estágio da doença e a planejar o tratamento.",
      ],
    },
    {
      id: "tratamento",
      tocLabel: "Tratamento",
      heading: "Revascularização cerebral",
      paragraphs: [
        "O tratamento é essencial para prevenir AVCs e hemorragias. Cada caso é avaliado individualmente, e o tratamento cirúrgico, em mãos especializadas, reduz o risco de AVCs:",
      ],
      options: [
        {
          title: "Revascularização direta (bypass)",
          description:
            "Criação de novas conexões entre vasos sanguíneos para garantir a circulação adequada ao cérebro. É altamente eficaz em casos de obstrução significativa e deve ser realizada por neurocirurgião experiente em microcirurgia vascular.",
        },
        {
          title: "Revascularização indireta",
          description:
            "Técnicas como a encéfalomiossinangiose (EMS), a EDAS e a EMAS, em que tecido vascularizado é colocado sobre o cérebro para estimular, ao longo do tempo, o desenvolvimento de novos vasos e melhorar o fluxo colateral.",
        },
        {
          title: "Medicamentos",
          description:
            "Embora não curem a doença, medicamentos como a aspirina podem reduzir o risco de formação de coágulos até que a cirurgia seja realizada.",
        },
      ],
    },
  ],
};
