import type { ArticleContent } from "./types";

// Reestruturado no molde do Design System v3 (O que é / Sintomas / Diagnóstico /
// Tratamento / Recuperação). Todo o texto clínico vem do conteúdo migrado do
// site original — apenas reorganizado e condensado, sem novas afirmações médicas.
export const article: ArticleContent = {
  slug: "aneurisma-cerebral",
  category: "Vascular",
  readingTime: "6 min",
  lead: "Dilatações nas paredes das artérias cerebrais que exigem diagnóstico preciso e tratamento microcirúrgico ou endovascular individualizado.",
  heroMeta: [
    { label: "Abordagem", value: "Micro ou endovascular" },
    { label: "Pico de incidência", value: "35–60 anos" },
    { label: "Acompanhamento", value: "Imagem seriada" },
  ],
  quote: {
    text: "O diagnóstico precoce muda completamente o prognóstico. Cada minuto importa.",
    emphasis: "Cada minuto importa",
    afterSectionId: "sintomas",
  },
  sections: [
    {
      id: "o-que-e",
      tocLabel: "O que é",
      heading: "Uma dilatação na parede de uma artéria cerebral.",
      emphasis: "artéria cerebral",
      figureCaption: "Fig. 01 — Representação angiográfica",
      paragraphs: [
        "Os aneurismas cerebrais representam uma dilatação anormal na parede arterial dos vasos cerebrais, geralmente próxima a um ponto de bifurcação, onde existe uma anormalidade estrutural da parede. Cerca de 90% são saculares; os demais incluem fusiformes, traumáticos, micóticos, dissecantes e microaneurismas.",
        "Variam em tamanho — pequenos (< 10 mm), grandes (11–25 mm) e gigantes (> 25 mm). Aproximadamente 85% localizam-se na circulação anterior do Polígono de Willis, onde as circulações anterior e posterior se anastomosam.",
        "Vários fatores aumentam o risco de desenvolvimento, crescimento e ruptura: tabagismo, abuso de álcool, sexo feminino, hipertensão não controlada e aterosclerose. A contribuição genética é relevante e síndromes hereditárias devem ser consideradas quando há mais de um familiar com aneurismas intracranianos.",
        "São mais prevalentes entre 35 e 60 anos, com proporção de 1:2 entre homens e mulheres. Cerca de 10–30% dos pacientes podem apresentar múltiplos aneurismas.",
      ],
    },
    {
      id: "sintomas",
      tocLabel: "Sintomas",
      heading: "Sinais de alerta",
      paragraphs: [
        "Aneurismas íntegros costumam ser silenciosos e, com frequência, são achados incidentais durante a investigação de outra condição. Quando há ruptura — a hemorragia subaracnóidea — o quadro é súbito e intenso:",
        "A cefaleia sentinela, dor intensa que precede a ruptura em dias a semanas, ocorre em 10–43% dos pacientes e sinaliza risco maior. A perda abrupta de consciência também deve levantar a suspeita: o diagnóstico precoce é decisivo.",
      ],
      bullets: [
        "Cefaleia súbita e intensa",
        "Rigidez de nuca",
        "Náusea e vômitos",
        "Alteração de consciência",
      ],
    },
    {
      id: "diagnostico",
      tocLabel: "Diagnóstico",
      heading: "Diagnóstico e investigação",
      figureCaption: "Fig. 02 — Angiografia digital por subtração",
      paragraphs: [
        "A maioria dos aneurismas não rotos é identificada incidentalmente em uma neuroimagem feita por outra razão. Indivíduos de alto risco podem ser rastreados com angiorressonância ou angiotomografia.",
        "Para aneurismas rotos, o exame inicial confiável é a tomografia de crânio sem contraste — positiva em 98–100% dos casos nas primeiras 12 horas. Quando a TC é negativa mas a suspeita clínica é forte, sequências de ressonância (FLAIR, SWI, GRE) ou a punção lombar com pesquisa de xantocromia ajudam a confirmar o sangramento.",
        "A angiografia digital por subtração permanece o padrão-ouro: com reconstrução 3D identifica aneurismas pequenos, avalia a morfologia e a relação com ramos perfurantes próximos. O objetivo de diagnosticar cedo é estabelecer o tratamento adequado o mais rápido possível, evitando a hemorragia subaracnóidea e suas consequências.",
      ],
    },
    {
      id: "tratamento",
      tocLabel: "Tratamento",
      heading: "Conduta e tratamento",
      paragraphs: [
        "A decisão é sempre multifatorial — história clínica, sexo, comorbidades, exames de imagem, tamanho, localização e anatomia do vaso, história familiar e condições genéticas. Existem duas vias terapêuticas principais:",
      ],
      options: [
        {
          title: "Microcirurgia (clipagem)",
          description:
            "Colocação de um ou mais clipes de titânio no colo do aneurisma por craniotomia, excluindo-o da circulação sem comprometer os vasos vizinhos. Realizada com microscópio, angiografia intraoperatória com indocianina e monitorização neurofisiológica contínua. Em casos complexos, técnicas de bypass (EC-IC ou IC-IC) garantem a revascularização.",
        },
        {
          title: "Tratamento endovascular",
          description:
            "Abordagem não cirúrgica por microcateteres intra-arteriais guiados por fluoroscopia, com molas ou dispositivos de desvio de fluxo. Pode ser usada isoladamente ou em conjunto com a microcirurgia.",
        },
      ],
    },
    {
      id: "recuperacao",
      tocLabel: "Recuperação",
      heading: "Recuperação e acompanhamento",
      paragraphs: [
        "Após a hemorragia subaracnóidea, o vasoespasmo é uma complicação comum (até 40–70% dos casos), com pico entre o 7º e o 10º dia e resolução habitual em 21 dias. O manejo inclui nimodipina, manutenção da euvolemia e monitoramento com Doppler transcraniano.",
        "Outras complicações possíveis incluem hidrocefalia, convulsões, arritmias e distúrbios hidroeletrolíticos. O acompanhamento com imagem seriada é essencial para confirmar a exclusão completa do aneurisma e vigiar a circulação ao longo do tempo.",
      ],
    },
  ],
};
