import type { ReactNode } from "react";
import {
  IconAneurisma,
  IconMAV,
  IconSchwannoma,
  IconTumor,
} from "./icons";

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export type CardData = {
  slug: string;
  title: string;
  description: string;
  detailedDescription?: string;
  icon: () => ReactNode;
  image?: string;
  highlights?: string[];
  testimonials?: Testimonial[];
};

export const CANVAS_H = 1052;
export const HEADER_W = 1896;

export const CARD_W = 513;
export const CARD_H = 509;
export const CARD_START_X = 64;
export const CARD_STEP_X = 547;
export const CARD_Y_UP = 354;
export const CARD_Y_DOWN = 464;
export const END_PADDING = 80;

export const cards: CardData[] = [
  {
    slug: "schwannoma-vestibular",
    icon: IconSchwannoma,
    title: "Schwannoma Vestibular",
    description:
      "O schwannoma vestibular (SV) é um tumor benigno do nervo vestibulococlear.",
    detailedDescription:
      "O schwannoma vestibular, também conhecido como neurinoma do acústico, é um tumor benigno que se origina das células de Schwann do nervo vestibulococlear (VIII par craniano). Embora benigno, seu crescimento pode comprimir estruturas cerebrais adjacentes, causando perda auditiva, zumbido, desequilíbrio e, em casos avançados, compressão do tronco cerebral. O tratamento inclui observação, radiocirurgia estereotáxica e microcirurgia, dependendo do tamanho e sintomas. O Dr. Hugo Doria utiliza técnicas microcirúrgicas avançadas com monitorização neurofisiológica intraoperatória para preservação da função facial e auditiva.",
    image: "/images/especialidades/schwannoma.jpg",
    highlights: [
      "Monitorização neurofisiológica intraoperatória",
      "Preservação da função facial e auditiva",
      "Microcirurgia de alta precisão",
    ],
    // Depoimentos reais — excertos de avaliações verificadas no Doctoralia.
    testimonials: [
      {
        quote:
          "Excelente profissional. Atendimento humanizado, muito empático. Dr. Hugo e sua equipe salvaram minha vida. A cirurgia foi um sucesso e me recupero muito bem.",
        name: "Rita de Cássia de Jesus Silva",
        role: "Paciente — Schwannoma",
      },
    ],
  },
  {
    slug: "aneurisma-cerebral",
    icon: IconAneurisma,
    title: "Aneurisma Cerebral",
    description:
      "Os aneurismas cerebrais são dilatações anormais nas paredes das artérias cerebrais.",
    detailedDescription:
      "Os aneurismas cerebrais são dilatações anormais nas paredes das artérias do cérebro, geralmente em pontos de bifurcação. Quando rompem, causam hemorragia subaracnoidea — uma emergência neurológica com alta morbimortalidade. O tratamento pode ser realizado por clipagem microcirúrgica ou embolização endovascular. O Dr. Hugo Doria é especialista no tratamento microcirúrgico de aneurismas complexos, incluindo aneurismas gigantes e de circulação posterior, utilizando técnicas de bypass cerebral quando necessário para garantir a segurança do procedimento.",
    image: "/images/especialidades/aneurisma.jpg",
    highlights: [
      "Clipagem microcirúrgica de alta complexidade",
      "Bypass cerebral quando necessário",
      "Tratamento de aneurismas gigantes",
    ],
    testimonials: [
      {
        quote:
          "Com muita competência, atenção e sensibilidade, conduziu minha cirurgia de forma impecável, sempre me transmitindo segurança, calma e confiança desde o primeiro contato.",
        name: "Rita Cássia Nogueira",
        role: "Paciente — Cirurgia de Aneurisma",
      },
      {
        quote:
          "Eu só tenho a agradecer a Deus, ao meu anjo da guarda Dr. Hugo Doria e toda equipe médica, que esteve ao meu lado durante todo o período que estive hospitalizada. Eterna gratidão!",
        name: "Maria José da Silva Barbosa",
        role: "Paciente — Cirurgia de Aneurisma",
      },
    ],
  },
  {
    slug: "mavs",
    icon: IconMAV,
    title: "MAVs",
    description:
      "As malformações arteriovenosas (MAVs) são conexões anormais entre artérias e veias cerebrais.",
    detailedDescription:
      "As malformações arteriovenosas cerebrais são emaranhados vasculares onde artérias se conectam diretamente a veias sem o leito capilar intermediário. Isso cria um fluxo de alta pressão que pode causar hemorragias, convulsões e déficits neurológicos. O tratamento envolve uma abordagem multidisciplinar com microcirurgia, embolização e radiocirurgia. O Dr. Hugo Doria realiza ressecção microcirúrgica de MAVs com auxílio de neuronavegação e angiografia intraoperatória, garantindo remoção completa com máxima segurança.",
    image: "/images/especialidades/mav.jpg",
    highlights: [
      "Abordagem multidisciplinar integrada",
      "Neuronavegação e angiografia intraoperatória",
      "Ressecção microcirúrgica completa",
    ],
    testimonials: [
      {
        quote:
          "Neurocirurgião com expertise de nível internacional. Médico de altíssimo conhecimento científico e alma iluminada.",
        name: "Reginaldo Queiroz",
        role: "Paciente",
      },
    ],
  },
  {
    slug: "tumores-cerebrais",
    icon: IconTumor,
    title: "Tumores Cerebrais",
    description:
      "Tratamento cirúrgico de tumores cerebrais primários e metastáticos com técnicas minimamente invasivas.",
    detailedDescription:
      "Os tumores cerebrais podem ser primários (originados no cérebro) ou metastáticos (provenientes de outros órgãos). O tratamento cirúrgico visa a ressecção máxima segura, preservando áreas eloquentes do cérebro responsáveis por funções motoras, de linguagem e cognitivas. O Dr. Hugo Doria utiliza técnicas avançadas como neuronavegação, fluorescência com 5-ALA, estimulação cortical direta e cirurgia acordada para tumores em áreas eloquentes, maximizando a remoção tumoral e preservando a qualidade de vida do paciente.",
    image: "/images/especialidades/tumor.jpg",
    highlights: [
      "Neuronavegação e fluorescência com 5-ALA",
      "Cirurgia acordada em áreas eloquentes",
      "Ressecção máxima segura",
    ],
    testimonials: [
      {
        quote:
          "Não há palavras que possam expressar minha sincera gratidão e admiração pelo Dr. Hugo! É evidente a capacidade dele como profissional. Mas é a forma como trata os pacientes, com respeito e dedicação, que o transforma em um ser humano único.",
        name: "Marjouri Garcia",
        role: "Paciente — Tumores Cerebrais",
      },
      {
        quote:
          "Na minha primeira consulta fui muito bem recebida, com muita atenção e carinho. Me senti totalmente segura e confiante. Minha recuperação tem sido rápida e tranquila graças à atenção e profissionalismo do Dr. Hugo e toda sua equipe.",
        name: "Ana Maria Rosini",
        role: "Paciente — Meningioma",
      },
    ],
  },
  {
    slug: "doenca-de-moyamoya",
    icon: IconSchwannoma,
    title: "Doença de Moyamoya",
    description:
      "Tratamento da doença rara com estreitamento progressivo das artérias cerebrais via revascularização.",
    detailedDescription:
      "A doença de Moyamoya é uma condição cerebrovascular rara e progressiva caracterizada pelo estreitamento das artérias carótidas internas e seus ramos principais. Isso leva à formação de uma rede de vasos colaterais frágeis que podem causar isquemia cerebral e hemorragias. O tratamento de escolha é a revascularização cerebral cirúrgica, por meio de bypass direto (anastomose da artéria temporal superficial à artéria cerebral média) ou técnicas indiretas. O Dr. Hugo Doria é referência nessa técnica cirúrgica altamente especializada.",
    image: "/images/especialidades/moyamoya.jpg",
    highlights: [
      "Bypass direto (STA-MCA)",
      "Técnicas indiretas de revascularização",
      "Referência nacional nesta patologia",
    ],
    testimonials: [
      {
        quote:
          "Ótimo profissional, muito atencioso antes, durante e após o procedimento. Tratamento super eficaz! Sou grato por tudo!",
        name: "Renato Santos",
        role: "Paciente",
      },
    ],
  },
  {
    slug: "neuralgia-do-trigemeo",
    icon: IconAneurisma,
    title: "Neuralgia do Trigêmeo",
    description:
      "Dor facial episódica tratada por descompressão microvascular ou radiocirurgia estereotáxica.",
    detailedDescription:
      "A neuralgia do trigêmeo é uma das dores mais intensas conhecidas na medicina, caracterizada por episódios lancinantes e súbitos de dor em um lado da face. Geralmente é causada pela compressão do nervo trigêmeo por um vaso sanguíneo na base do crânio. O tratamento definitivo é a descompressão microvascular (técnica de Jannetta), que consiste em afastar o vaso do nervo por meio de uma craniotomia retrosigmoide. O Dr. Hugo Doria tem ampla experiência nesse procedimento, proporcionando alívio duradouro da dor com preservação da sensibilidade facial.",
    image: "/images/especialidades/neuralgia.jpg",
    highlights: [
      "Descompressão microvascular (Jannetta)",
      "Alívio duradouro da dor",
      "Preservação da sensibilidade facial",
    ],
  },
  {
    slug: "espasmo-hemifacial",
    icon: IconMAV,
    title: "Espasmo Hemifacial",
    description:
      "Contrações involuntárias da musculatura facial tratadas por descompressão microvascular do nervo facial.",
    detailedDescription:
      "O espasmo hemifacial consiste em contrações involuntárias e repetitivas da musculatura de um lado da face, geralmente iniciando ao redor do olho e progredindo para a boca. Na maioria dos casos, é causado pela compressão do nervo facial por uma artéria na saída do tronco cerebral. O tratamento cirúrgico por descompressão microvascular oferece cura definitiva em mais de 90% dos casos. O Dr. Hugo Doria realiza esse procedimento com monitorização neurofisiológica contínua para máxima segurança e eficácia.",
    image: "/images/especialidades/espasmo.jpg",
    highlights: [
      "Cura definitiva em +90% dos casos",
      "Monitorização neurofisiológica contínua",
      "Procedimento minimamente invasivo",
    ],
  },
  {
    slug: "revascularizacao-cerebral",
    icon: IconTumor,
    title: "Revascularização Cerebral",
    description:
      "Bypass cerebral para restaurar o fluxo sanguíneo em casos de isquemia crônica e doenças oclusivas.",
    detailedDescription:
      "A revascularização cerebral é uma técnica microcirúrgica altamente especializada que consiste na criação de novas vias de fluxo sanguíneo para o cérebro. É indicada para doença de Moyamoya, aneurismas complexos que requerem oclusão da artéria principal, e aterosclerose intracraniana refratária. O procedimento envolve a anastomose microcirúrgica de artérias extracranianas com artérias intracranianas (bypass EC-IC). O Dr. Hugo Doria é um dos poucos neurocirurgiões no Brasil com treinamento especializado nessa técnica complexa.",
    image: "/images/especialidades/revascularizacao.jpg",
    highlights: [
      "Bypass EC-IC altamente especializado",
      "Um dos poucos no Brasil com esta expertise",
      "Indicado para múltiplas patologias vasculares",
    ],
  },
  {
    slug: "tumores-hipofisarios",
    icon: IconAneurisma,
    title: "Tumores Hipofisários",
    description:
      "Remoção de adenomas hipofisários por via endoscópica endonasal, preservando a função glandular.",
    detailedDescription:
      "Os tumores hipofisários (adenomas) são lesões benignas que se desenvolvem na glândula hipófise, na base do crânio. Podem causar distúrbios hormonais, alterações visuais e cefaleia. O tratamento cirúrgico é realizado preferencialmente por via endoscópica endonasal transesfenoidal, uma técnica minimamente invasiva sem incisões externas. O Dr. Hugo Doria realiza esse procedimento em parceria com equipe otorrinolaringológica, utilizando endoscopia de alta definição e neuronavegação para remoção precisa do tumor com preservação da função glandular.",
    image: "/images/especialidades/hipofise.jpg",
    highlights: [
      "Via endoscópica sem incisões externas",
      "Endoscopia de alta definição",
      "Preservação da função glandular",
    ],
  },
  {
    slug: "cavernomas",
    icon: IconMAV,
    title: "Cavernomas",
    description:
      "Malformações vasculares de baixo fluxo, cerebrais ou medulares, tratadas por microcirurgia.",
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
    icon: IconTumor,
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
