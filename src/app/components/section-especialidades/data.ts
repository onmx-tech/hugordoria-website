export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

/**
 * Família clínica da condição. O cliente pediu (briefing jul/2026, §3/§4) que as
 * áreas apareçam agrupadas por natureza do problema, e não como uma lista plana:
 * é assim que o paciente se localiza e é assim que a página ganha hierarquia
 * semântica de subtítulos. A ordem de `FAMILIES` é a ordem de exibição.
 */
export type Family = "vascular" | "conflitos" | "tumores";
export const FAMILIES: Family[] = ["vascular", "conflitos", "tumores"];

export type CardData = {
  slug: string;
  title: string;
  description: string;
  detailedDescription?: string;
  family: Family;
  highlights?: string[];
  testimonials?: Testimonial[];
};

/** Cards de uma família, na ordem original do array. */
export function cardsByFamily(all: CardData[], family: Family): CardData[] {
  return all.filter((c) => c.family === family);
}

export const CANVAS_H = 1052;
export const HEADER_W = 1896;

export const CARD_W = 513;
export const CARD_H = 509;
export const CARD_START_X = 64;
export const CARD_STEP_X = 547;
export const CARD_Y_UP = 284;
export const CARD_Y_DOWN = 394;
export const END_PADDING = 80;

export const cards: CardData[] = [
  {
    slug: "schwannoma-vestibular",
    family: "tumores",
    title: "Schwannoma Vestibular",
    description:
      "O schwannoma vestibular (SV) é um tumor benigno do nervo vestibulococlear.",
    detailedDescription:
      "O schwannoma vestibular, também conhecido como neurinoma do acústico, é um tumor benigno que se origina das células de Schwann do nervo vestibulococlear (VIII par craniano). Embora benigno, seu crescimento pode comprimir estruturas cerebrais adjacentes, causando perda auditiva, zumbido, desequilíbrio e, em casos avançados, compressão do tronco cerebral. O tratamento inclui observação, radiocirurgia estereotáxica e microcirurgia, dependendo do tamanho e sintomas. O Dr. Hugo Doria utiliza técnicas microcirúrgicas avançadas com monitorização neurofisiológica intraoperatória para preservação da função facial e auditiva.",
    highlights: [
      "Monitorização neurofisiológica intraoperatória",
      "Preservação da função facial e auditiva",
      "Microcirurgia de alta precisão",
    ],
    // Depoimentos reais — excertos de avaliações verificadas no Doctoralia.
    testimonials: [
      {
        quote:
          "Atendimento humanizado, muito empático.",
        name: "Rita S.",
        role: "Paciente — Schwannoma",
      },
    ],
  },
  {
    slug: "aneurisma-cerebral",
    family: "vascular",
    title: "Aneurisma Cerebral",
    description:
      "Os aneurismas cerebrais são dilatações anormais nas paredes das artérias cerebrais.",
    detailedDescription:
      "Os aneurismas cerebrais são dilatações anormais nas paredes das artérias do cérebro, geralmente em pontos de bifurcação. Quando rompem, causam hemorragia subaracnoidea — uma emergência neurológica com alta morbimortalidade. O tratamento pode ser realizado por clipagem microcirúrgica ou embolização endovascular. O Dr. Hugo Doria tem atuação no tratamento microcirúrgico de aneurismas complexos, incluindo aneurismas gigantes e de circulação posterior, utilizando técnicas de bypass cerebral quando necessário.",
    highlights: [
      "Clipagem microcirúrgica de alta complexidade",
      "Bypass cerebral quando necessário",
      "Tratamento de aneurismas gigantes",
    ],
    testimonials: [
      {
        quote:
          "Com muita competência, atenção e sensibilidade, conduziu todo o processo sempre me transmitindo segurança, calma e confiança desde o primeiro contato.",
        name: "Rita N.",
        role: "Paciente — Cirurgia de Aneurisma",
      },
      {
        quote:
          "Eu só tenho a agradecer a Deus, ao Dr. Hugo Doria e toda equipe médica, que esteve ao meu lado durante todo o período que estive hospitalizada. Eterna gratidão!",
        name: "Maria J.",
        role: "Paciente — Cirurgia de Aneurisma",
      },
    ],
  },
  {
    slug: "mavs",
    family: "vascular",
    title: "MAVs",
    description:
      "As malformações arteriovenosas (MAVs) são conexões anormais entre artérias e veias cerebrais.",
    detailedDescription:
      "As malformações arteriovenosas cerebrais são emaranhados vasculares onde artérias se conectam diretamente a veias sem o leito capilar intermediário. Isso cria um fluxo de alta pressão que pode causar hemorragias, convulsões e déficits neurológicos. O tratamento envolve uma abordagem multidisciplinar com microcirurgia, embolização e radiocirurgia. O Dr. Hugo Doria realiza ressecção microcirúrgica de MAVs com auxílio de neuronavegação e angiografia intraoperatória.",
    highlights: [
      "Abordagem multidisciplinar integrada",
      "Neuronavegação e angiografia intraoperatória",
      "Ressecção microcirúrgica completa",
    ],
  },
  {
    slug: "tumores-cerebrais",
    family: "tumores",
    title: "Tumores Cerebrais",
    description:
      "Avaliação e tratamento microcirúrgico de tumores cerebrais primários, metastáticos e de localização complexa, com planejamento individualizado e técnicas voltadas à preservação funcional.",
    detailedDescription:
      "Os tumores cerebrais podem ser primários (originados no cérebro) ou metastáticos (provenientes de outros órgãos). O tratamento cirúrgico visa a ressecção máxima segura, preservando áreas eloquentes do cérebro responsáveis por funções motoras, de linguagem e cognitivas. O Dr. Hugo Doria utiliza técnicas avançadas como neuronavegação, fluorescência com 5-ALA, estimulação cortical direta e cirurgia acordada para tumores em áreas eloquentes.",
    highlights: [
      "Neuronavegação e fluorescência com 5-ALA",
      "Cirurgia acordada em áreas eloquentes",
      "Ressecção máxima segura",
    ],
    testimonials: [
      {
        quote:
          "Não há palavras que possam expressar minha gratidão. É evidente a capacidade dele como profissional, mas é a forma como trata os pacientes, com respeito e dedicação, que faz a diferença.",
        name: "Marjouri G.",
        role: "Paciente — Tumores Cerebrais",
      },
      {
        quote:
          "Na minha primeira consulta fui muito bem recebida, com muita atenção e carinho. Me senti segura e confiante para seguir com o tratamento.",
        name: "Ana R.",
        role: "Paciente — Meningioma",
      },
    ],
  },
  {
    slug: "doenca-de-moyamoya",
    family: "vascular",
    title: "Doença de Moyamoya",
    description:
      "Avaliação e tratamento da doença de Moyamoya, incluindo técnicas de revascularização cerebral direta e indireta quando indicadas.",
    detailedDescription:
      "A doença de Moyamoya é uma condição cerebrovascular rara e progressiva caracterizada pelo estreitamento das artérias carótidas internas e seus ramos principais. Isso leva à formação de uma rede de vasos colaterais frágeis que podem causar isquemia cerebral e hemorragias. O tratamento de escolha é a revascularização cerebral cirúrgica, por meio de bypass direto (anastomose da artéria temporal superficial à artéria cerebral média) ou técnicas indiretas.",
    highlights: [
      "Bypass direto (STA-MCA)",
      "Técnicas indiretas de revascularização",
    ],
    testimonials: [
      {
        quote:
          "Muito atencioso antes, durante e depois do procedimento. A equipe esteve disponível sempre que precisei tirar uma dúvida.",
        name: "Renato S.",
        role: "Paciente",
      },
    ],
  },
  {
    slug: "neuralgia-do-trigemeo",
    family: "conflitos",
    title: "Neuralgia do Trigêmeo",
    description:
      "Avaliação especializada da neuralgia do trigêmeo e de suas alternativas terapêuticas, incluindo tratamento medicamentoso, procedimentos percutâneos, radiocirurgia e descompressão microvascular, conforme o perfil de cada caso.",
    detailedDescription:
      "A neuralgia do trigêmeo é uma das dores mais intensas conhecidas na medicina, caracterizada por episódios lancinantes e súbitos de dor em um lado da face. Geralmente é causada pela compressão do nervo trigêmeo por um vaso sanguíneo na base do crânio. A descompressão microvascular (técnica de Jannetta) consiste em afastar o vaso do nervo por meio de uma craniotomia retrosigmoide.",
    highlights: [
      "Descompressão microvascular (Jannetta)",
      "Preservação da sensibilidade facial",
    ],
  },
  {
    slug: "espasmo-hemifacial",
    family: "conflitos",
    title: "Espasmo Hemifacial",
    description:
      "Contrações involuntárias da musculatura facial tratadas por descompressão microvascular do nervo facial.",
    detailedDescription:
      "O espasmo hemifacial consiste em contrações involuntárias e repetitivas da musculatura de um lado da face, geralmente iniciando ao redor do olho e progredindo para a boca. Na maioria dos casos, é causado pela compressão do nervo facial por uma artéria na saída do tronco cerebral. O Dr. Hugo Doria realiza esse procedimento com monitorização neurofisiológica contínua.",
    highlights: [
      "Monitorização neurofisiológica contínua",
      "Procedimento minimamente invasivo",
    ],
  },
  {
    slug: "revascularizacao-cerebral",
    family: "vascular",
    title: "Revascularização Cerebral",
    description:
      "Bypass cerebral para restaurar o fluxo sanguíneo em casos de isquemia crônica e doenças oclusivas.",
    detailedDescription:
      "A revascularização cerebral é uma técnica microcirúrgica altamente especializada que consiste na criação de novas vias de fluxo sanguíneo para o cérebro. É indicada para doença de Moyamoya, aneurismas complexos que requerem oclusão da artéria principal, e aterosclerose intracraniana refratária. O procedimento envolve a anastomose microcirúrgica de artérias extracranianas com artérias intracranianas (bypass EC-IC).",
    highlights: [
      "Bypass EC-IC altamente especializado",
      "Indicado para múltiplas patologias vasculares",
    ],
  },
  {
    slug: "tumores-hipofisarios",
    family: "tumores",
    title: "Tumores Hipofisários",
    description:
      "Tratamento de adenomas hipofisários, incluindo abordagem endoscópica endonasal quando indicada, com planejamento voltado à preservação das estruturas e funções neuroendócrinas.",
    detailedDescription:
      "Os tumores hipofisários (adenomas) são lesões benignas que se desenvolvem na glândula hipófise, na base do crânio. Podem causar distúrbios hormonais, alterações visuais e cefaleia. O tratamento cirúrgico é realizado preferencialmente por via endoscópica endonasal transesfenoidal, uma técnica minimamente invasiva sem incisões externas. O Dr. Hugo Doria realiza esse procedimento em parceria com equipe otorrinolaringológica, utilizando endoscopia de alta definição e neuronavegação para remoção precisa do tumor com preservação da função glandular.",
    highlights: [
      "Via endoscópica sem incisões externas",
      "Endoscopia de alta definição",
      "Preservação da função glandular",
    ],
  },
  {
    slug: "cavernomas",
    family: "vascular",
    title: "Cavernomas",
    description:
      "Avaliação de cavernomas cerebrais e medulares, com definição individualizada entre acompanhamento clínico-radiológico e tratamento microcirúrgico quando indicado.",
    detailedDescription:
      "Os cavernomas (angiomas cavernosos) são malformações vasculares de baixo fluxo formadas por capilares dilatados, que podem ocorrer no cérebro ou na medula espinhal. Podem causar convulsões, déficits neurológicos e sangramentos. O tratamento microcirúrgico é indicado em lesões sintomáticas ou com sangramentos recorrentes, com técnica de alta precisão para remoção completa preservando o tecido neural adjacente.",
    highlights: [
      "Ressecção microcirúrgica completa",
      "Cavernomas cerebrais e medulares",
      "Preservação do tecido neural adjacente",
    ],
  },
  {
    slug: "tumores-medulares",
    family: "tumores",
    title: "Tumores Medulares",
    description:
      "Tumores da coluna vertebral e da medula tratados com técnica microcirúrgica de precisão.",
    detailedDescription:
      "Tumores da coluna vertebral podem acometer o osso vertebral, as meninges ou a medula propriamente dita. Ependimomas e astrocitomas são os mais frequentes entre os tumores medulares. O tratamento é fundamentado na técnica microcirúrgica, associado a radioterapia e/ou quimioterapia conforme o tipo celular tumoral identificado pela biópsia.",
    highlights: [
      "Microcirurgia da medula e coluna vertebral",
      "Monitorização neurofisiológica intraoperatória",
      "Tratamento integrado com radio/quimioterapia",
    ],
  },
];

export const TRACK_W =
  CARD_START_X + (cards.length - 1) * CARD_STEP_X + CARD_W + END_PADDING;

export function findCardBySlug(slug: string): CardData | undefined {
  return cards.find((c) => c.slug === slug);
}
