import type { ArticleContent } from "./types";

// Reestruturado no molde rico, reorganizando o conteúdo original sem novas
// afirmações médicas.
export const article: ArticleContent = {
  slug: "cavernomas",
  category: "Vascular",
  readingTime: "6 min",
  lead: "Malformações vasculares de baixo fluxo do encéfalo e da medula, tratadas por microcirurgia quando sintomáticas.",
  heroMeta: [
    { label: "Abordagem", value: "Observação ou microcirurgia" },
    { label: "Taxa de hemorragia", value: "0,8–3,8% ao ano" },
    { label: "Localização", value: "60–80% supratentorial" },
  ],
  quote: {
    text: "A ressecção microcirúrgica é o tratamento de escolha e o único definitivo e curativo.",
    emphasis: "definitivo e curativo",
    afterSectionId: "tratamento",
  },
  sections: [
    {
      id: "o-que-e",
      tocLabel: "O que é",
      heading: "Malformações vasculares de baixo fluxo.",
      emphasis: "baixo fluxo",
      figureCaption: "Fig. 01 — Cavernoma encefálico",
      paragraphs: [
        "As malformações cavernosas — também conhecidas como angiomas cavernosos ou cavernomas — são malformações vasculares de baixo fluxo localizadas no encéfalo e na medula espinhal, formadas por um conglomerado de canais sinusoidais dilatados revestidos por células endoteliais. Os vasos carecem das camadas musculares e elásticas normais, e não há tecido neural no interior da lesão.",
        "Podem ser esporádicos ou familiares. Os familiares são hereditários, de padrão autossômico dominante, correspondem a 30%–50% dos casos e frequentemente com múltiplas lesões, ao contrário dos esporádicos, comumente únicos.",
        "Depois dos aneurismas, são a lesão vascular mais frequente do sistema nervoso central (10%–15% das malformações neurovasculares). Não há preferência de gênero; entre 60% e 80% localizam-se no compartimento supratentorial. A apresentação clínica é bimodal, mais comum na terceira e quarta décadas da vida.",
      ],
    },
    {
      id: "sintomas",
      tocLabel: "Sintomas",
      heading: "Um amplo espectro de manifestações",
      paragraphs: [
        "Pela variabilidade em tamanho, localização e propensão ao sangramento, os cavernomas causam um amplo espectro de sintomas, que mudam ao longo do tempo. As crises epilépticas são o sintoma mais frequente, pelo potencial epileptogênico dos produtos de degradação do sangue; os déficits predominam nos cavernomas do tronco encefálico:",
      ],
      bullets: [
        "Crises epilépticas",
        "Déficits neurológicos focais",
        "Hemorragias",
        "Hidrocefalia (infrequente)",
      ],
    },
    {
      id: "diagnostico",
      tocLabel: "Diagnóstico",
      heading: "Diagnóstico por imagem",
      paragraphs: [
        "O diagnóstico é mais difícil do que o de outras doenças vasculares, pois os cavernomas não são evidentes na angiografia. A tomografia simples é o primeiro exame quando há suspeita de sangramento, mas é limitada.",
        "A ressonância magnética — com sequências T1, T2, gradiente eco e imagens ponderadas por suscetibilidade — é a ferramenta central, capaz de distinguir lesões em diferentes estágios de sangramento (agudas, subagudas e crônicas) e de auxiliar a navegação intraoperatória em lesões profundas.",
      ],
    },
    {
      id: "tratamento",
      tocLabel: "Tratamento",
      heading: "Conduta e tratamento",
      paragraphs: [
        "A presença de sintomas, a localização, a idade e o histórico de saúde são os determinantes mais importantes da conduta, que requer discussão multidisciplinar:",
      ],
      options: [
        {
          title: "Observação",
          description:
            "Manejo conservador favorecido para pacientes assintomáticos ou com risco pré-cirúrgico elevado.",
        },
        {
          title: "Ressecção microcirúrgica",
          description:
            "Tratamento de escolha e o único definitivo e curativo. Indicada em hemorragias múltiplas, déficit neurológico ou convulsões progressivas, com planejamento por neuronavegação e métodos eletroneurofisiológicos. A remoção completa, com o anel de hemossiderina, evita sangramentos e focos epileptogênicos.",
        },
        {
          title: "Radiocirurgia estereotáxica",
          description:
            "Opção para lesões supratentoriais em locais desfavoráveis ou de alto risco cirúrgico. Não é recomendada para cavernomas do tronco cerebral.",
        },
      ],
    },
  ],
};
