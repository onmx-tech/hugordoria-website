import type { ArticleContent } from "./types";

// Reestruturado no molde rico (O que é / Sintomas / Diagnóstico / Tratamento).
// Texto reorganizado do conteúdo original, sem novas afirmações médicas.
export const article: ArticleContent = {
  slug: "mavs",
  category: "Vascular",
  readingTime: "6 min",
  lead: "Conexões anormais entre artérias e veias cerebrais que exigem ressecção microcirúrgica de alta precisão.",
  heroMeta: [
    { label: "Abordagem", value: "Microcirurgia multidisciplinar" },
    { label: "Risco anual de hemorragia", value: "2–4%" },
    { label: "Localização", value: "90% supratentorial" },
  ],
  quote: {
    text: "A ressecção deve ser sempre completa, garantindo a plena cura da doença.",
    emphasis: "plena cura",
    afterSectionId: "tratamento",
  },
  sections: [
    {
      id: "o-que-e",
      tocLabel: "O que é",
      heading: "Conexões anormais entre artérias e veias cerebrais.",
      emphasis: "artérias e veias cerebrais",
      figureCaption: "Fig. 01 — Nidus arteriovenoso",
      paragraphs: [
        "As malformações arteriovenosas (MAVs) são shunts diretos entre artérias e veias cerebrais displásicas, em que um nidus de vasos anormais, de paredes finas e frágeis, está interposto sem parênquima dentro dele. Considera-se que têm origem congênita, podendo mudar seu comportamento hemodinâmico ao longo da vida do paciente.",
        "Podem localizar-se em qualquer parte do sistema nervoso central, sendo mais comuns nos hemisférios cerebrais e, em ordem decrescente, cerebelo, núcleos cerebrais, tronco encefálico e medula espinhal. A morfologia é bastante variável, de poucos milímetros a mais de seis centímetros.",
        "São raras — cerca de 0,1% da população, um décimo da incidência dos aneurismas cerebrais. Aproximadamente 90% encontram-se na região supratentorial e cerca de 15% permanecem assintomáticas durante toda a vida. Não têm preferência de gênero.",
      ],
    },
    {
      id: "sintomas",
      tocLabel: "Sintomas",
      heading: "Como as MAVs se manifestam",
      paragraphs: [
        "A apresentação depende da idade do paciente, do tamanho, da localização e das características vasculares da MAV. A hemorragia é a manifestação mais comum:",
        "As MAVs não rotas têm risco anual de hemorragia de 2% a 4%, maior nas já rotas — especialmente no primeiro ano após a ruptura. Drenagem venosa profunda, localização cerebral profunda e nidus de pequeno tamanho aumentam o risco de ruptura. O déficit neurológico costuma decorrer do “roubo de fluxo” provocado pela malformação.",
      ],
      bullets: [
        "Hemorragia cerebral",
        "Convulsões",
        "Déficit neurológico focal",
        "Cefaleia",
      ],
    },
    {
      id: "diagnostico",
      tocLabel: "Diagnóstico",
      heading: "Diagnóstico por imagem",
      figureCaption: "Fig. 02 — Angiografia digital",
      paragraphs: [
        "Os estudos de imagem são essenciais para estabelecer o diagnóstico e caracterizar a lesão para o planejamento. A tomografia de crânio costuma ser o primeiro exame, usada para descartar uma hemorragia.",
        "A ressonância magnética define a localização do nidus, suas relações neuroanatômicas e a veia de drenagem associada; a angio-RM caracteriza a drenagem venosa e outras características vasculares com alta precisão.",
        "A angiografia digital é o padrão-ouro — um exame dinâmico que revela a anatomia e a fisiologia do nidus, discrimina os vasos que o alimentam dos de passagem, localiza a drenagem e demonstra aneurismas associados, de maior risco de sangramento.",
      ],
    },
    {
      id: "tratamento",
      tocLabel: "Tratamento",
      heading: "Tratamento multidisciplinar",
      paragraphs: [
        "O tratamento é individualizado e multidisciplinar. A decisão considera o tamanho do nidus, o tipo de drenagem venosa (superficial ou profunda) e a localização — eloquente ou não (Classificação de Spetzler-Martin):",
      ],
      options: [
        {
          title: "Ressecção microcirúrgica",
          description:
            "Tratamento mais eficaz: microdissecção, coagulação e corte de cada vaso aferente até desconectar o nidus da circulação, preservando a veia de drenagem até o fim. Conta com angiografia intraoperatória com indocianina e monitorização neurofisiológica contínua.",
        },
        {
          title: "Cirurgia com paciente acordado",
          description:
            "Para MAVs em áreas eloquentes (fala, córtex motor, sensitivo ou visual), a craniotomia acordada com estimulação cortical direta permite avaliar as regiões adjacentes em tempo real e obter uma ressecção segura, com recuperação mais rápida.",
        },
        {
          title: "Embolização endovascular",
          description:
            "Em MAVs de alto fluxo ou de localização profunda, a embolização seletiva dos vasos que irrigam o nidus é feita antes da cirurgia, reduzindo o volume de sangue que chega à malformação e o tempo da ressecção.",
        },
      ],
    },
  ],
};
