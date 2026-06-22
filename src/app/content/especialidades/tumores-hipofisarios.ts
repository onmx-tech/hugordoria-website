import type { ArticleContent } from "./types";

// Reestruturado no molde rico — o texto corrido original foi dividido nas
// seções, sem novas afirmações médicas.
export const article: ArticleContent = {
  slug: "tumores-hipofisarios",
  category: "Tumoral",
  readingTime: "4 min",
  lead: "Tumores da região selar (hipófise) removidos preferencialmente por via endoscópica endonasal.",
  heroMeta: [
    { label: "Abordagem", value: "Endoscópica endonasal" },
    { label: "Diagnóstico", value: "RM + estudo hormonal" },
    { label: "Classificação", value: "Micro e macroadenoma" },
  ],
  quote: {
    text: "O tratamento preferencial é o acesso trans-nasal endoscópico, com ressecção microcirúrgica da lesão.",
    emphasis: "trans-nasal endoscópico",
    afterSectionId: "tratamento",
  },
  sections: [
    {
      id: "o-que-e",
      tocLabel: "O que é",
      heading: "Tumores da glândula mestra do corpo.",
      emphasis: "glândula mestra",
      figureCaption: "Fig. 01 — Região selar",
      paragraphs: [
        "A região selar compreende a sela túrcica, estrutura óssea em forma de sela dentro da qual se encontra a glândula hipófise — também chamada glândula pituitária ou glândula mestra, por produzir ou armazenar a maioria dos hormônios envolvidos no funcionamento do corpo.",
        "Os tumores da região selar compreendem principalmente os adenomas hipofisários, craniofaringeomas e meningeomas. Os tumores hipofisários dividem-se em secretores e não secretores de hormônios e, quanto ao tamanho, em microadenomas (< 1 cm) e macroadenomas (> 1 cm).",
      ],
    },
    {
      id: "sintomas",
      tocLabel: "Sintomas",
      heading: "Como se manifestam",
      paragraphs: [
        "Os sintomas dependem das características do tumor. Microadenomas não secretores costumam ser assintomáticos; nos secretores, variam conforme o hormônio em excesso. Macroadenomas comprimem estruturas neurovasculares adjacentes — cefaleia e alterações visuais por compressão dos nervos ópticos são os sintomas mais comuns. Em alguns casos ocorre hemorragia tumoral (apoplexia hipofisária):",
      ],
      bullets: [
        "Cefaleia",
        "Alterações visuais",
        "Distúrbios hormonais",
        "Apoplexia hipofisária",
      ],
    },
    {
      id: "diagnostico",
      tocLabel: "Diagnóstico",
      heading: "Diagnóstico por imagem e hormonal",
      paragraphs: [
        "O diagnóstico é realizado pela ressonância magnética, para identificar a massa tumoral, e pelo estudo dos hormônios do eixo hipotálamo-hipofisário. A tomografia computadorizada dos seios da face pode ser utilizada para o planejamento do acesso cirúrgico.",
      ],
    },
    {
      id: "tratamento",
      tocLabel: "Tratamento",
      heading: "Conduta e tratamento",
      paragraphs: [
        "A escolha do acesso depende do volume e da extensão do tumor:",
      ],
      options: [
        {
          title: "Acesso trans-nasal endoscópico",
          description:
            "Via preferencial à região selar, com ressecção microcirúrgica da lesão — seja o macroadenoma ou o microadenoma secretor de hormônios — sem incisões externas.",
        },
        {
          title: "Acesso trans-craniano",
          description:
            "Indicado em grandes volumes tumorais, com extensão para-selar ou supra-selar e compressão de estruturas cerebrais, para ressecção dos tumores da região selar.",
        },
      ],
    },
  ],
};
