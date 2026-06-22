import type { ArticleContent } from "./types";

// Reestruturado no molde rico, reorganizando o conteúdo original sem novas
// afirmações médicas.
export const article: ArticleContent = {
  slug: "schwannoma-vestibular",
  category: "Tumoral",
  readingTime: "7 min",
  lead: "Tumor benigno do nervo vestibulococlear, com perda auditiva progressiva, tratado por microcirurgia ou observação.",
  heroMeta: [
    { label: "Abordagem", value: "Microcirurgia ou observação" },
    { label: "Incidência", value: "6–8% dos tumores intracranianos" },
    { label: "Acompanhamento", value: "RM seriada" },
  ],
  quote: {
    text: "Se a preservação da audição é um objetivo, a intervenção precoce pode levar a um melhor resultado.",
    emphasis: "intervenção precoce",
    afterSectionId: "tratamento",
  },
  sections: [
    {
      id: "o-que-e",
      tocLabel: "O que é",
      heading: "Um tumor benigno do nervo vestibulococlear.",
      emphasis: "nervo vestibulococlear",
      figureCaption: "Fig. 01 — Ângulo pontocerebelar",
      paragraphs: [
        "O schwannoma vestibular (SV), também chamado de neuroma acústico, é um tumor benigno derivado das células de Schwann com origem no nervo vestibulococlear. Representa 80–85% dos tumores que se originam no ângulo pontocerebelar. Apesar de benigno, pelo efeito de massa pode comprometer várias estruturas intracranianas.",
        "A maioria cresce a partir do nervo vestibular inferior, raramente do superior ou da porção coclear. A histologia é característica, com áreas Antoni A densamente celulares alternadas com áreas Antoni B microcísticas.",
        "Representa cerca de 6–8% de todos os tumores intracranianos e 80% dos tumores do ângulo pontocerebelar. É esporádico em 90% dos casos, unilateral e sem predominância de lado; o restante ocorre na neurofibromatose tipo 2. A exposição à radiação ionizante em altas doses é um fator de risco reconhecido.",
      ],
    },
    {
      id: "sintomas",
      tocLabel: "Sintomas",
      heading: "Sinais de alerta",
      paragraphs: [
        "A maioria dos pacientes apresenta perda auditiva neurossensorial unilateral (94%) e zumbido (83%). Sintomas vestibulares variam e costumam ser subnotificados. Tumores grandes podem causar neuropatia trigeminal e facial, compressão do tronco cerebral e hidrocefalia:",
      ],
      bullets: [
        "Perda auditiva unilateral",
        "Zumbido",
        "Vertigem e instabilidade",
        "Neuropatia facial ou trigeminal",
      ],
    },
    {
      id: "diagnostico",
      tocLabel: "Diagnóstico",
      heading: "Diagnóstico e classificação",
      figureCaption: "Fig. 02 — RM do meato acústico interno",
      paragraphs: [
        "A ressonância magnética é o método de escolha — a sequência T1 com contraste é o padrão-ouro para avaliação inicial e pós-operatória. A tomografia complementa, fornecendo a anatomia óssea da base do crânio.",
        "O tumor surge como massa sólida com componente intracanalicular no meato acústico interno, que costuma alargar. É isointenso em T1, com forte realce após gadolínio, e heterogeneamente hiperintenso em T2; calcificações estão tipicamente ausentes.",
        "Os sistemas de graduação mais usados são o de Koos (graus I a IV, do tumor puramente intrameatal ao que desloca o tronco cerebral) e o de Hannover, que detalha a extensão à cisterna pontocerebelar e a compressão do tronco.",
      ],
    },
    {
      id: "tratamento",
      tocLabel: "Tratamento",
      heading: "Conduta e abordagens",
      paragraphs: [
        "A conduta considera o tamanho e a morfologia do tumor, os sintomas e as comorbidades. Em tumores grandes (Koos IV), a cirurgia é o tratamento primário; o objetivo é a ressecção total ou quase total, já que o volume residual se correlaciona com recorrência. As vias de acesso incluem:",
      ],
      options: [
        {
          title: "Abordagem retrossigmóide",
          description:
            "Indicada para tumores na cisterna pontocerebelar ou com efeito de massa significativo. Permite tumores de diversos tamanhos, oferece a possibilidade de preservação auditiva e excelente visualização do tronco encefálico e dos nervos cranianos.",
        },
        {
          title: "Abordagem translabiríntica",
          description:
            "Útil para tumores de qualquer tamanho. A labirintectomia leva à perda completa da audição daquele lado, mas oferece acesso amplo e visualização superior de todo o nervo facial, sem retração cerebral.",
        },
        {
          title: "Abordagem da fossa média",
          description:
            "Acesso lateral ao canal acústico interno por craniotomia temporal, melhor para pequenos tumores intracanaliculares quando a preservação da audição é um objetivo.",
        },
        {
          title: "Observação",
          description:
            "Oferecida a pacientes selecionados — idosos, com tumor muito pequeno e assintomático — com RM seriada a cada 6 a 12 meses, dado o crescimento lento da maioria desses tumores.",
        },
      ],
    },
  ],
};
