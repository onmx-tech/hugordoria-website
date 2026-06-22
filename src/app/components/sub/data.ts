import { Activity, Brain, GitBranch, Microscope, Waves, Zap, CircleDot, Stethoscope } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Specialty = {
  slug: string;
  title: string;
  short: string;
  description: string;
  symptoms: string[];
  treatments: string[];
  icon: LucideIcon;
};

export const SPECIALTIES: Specialty[] = [
  {
    slug: "schwannoma-vestibular",
    title: "Schwannoma Vestibular",
    short: "O schwannoma vestibular (SV) é um tumor benigno do nervo vestibulococlear.",
    description:
      "Tumor benigno de crescimento lento originado das células de Schwann do nervo vestibulococlear. O tratamento é individualizado e pode envolver observação, radiocirurgia ou microcirurgia com monitorização neurofisiológica para preservar a audição e a função do nervo facial.",
    symptoms: [
      "Perda auditiva unilateral progressiva",
      "Zumbido (tinnitus) persistente",
      "Tontura e desequilíbrio",
      "Sensação de plenitude auricular",
    ],
    treatments: [
      "Observação com ressonância seriada",
      "Radiocirurgia estereotáxica",
      "Microcirurgia com monitorização do nervo facial",
    ],
    icon: Waves,
  },
  {
    slug: "aneurisma-cerebral",
    title: "Aneurisma Cerebral",
    short: "Os aneurismas cerebrais são dilatações anormais nas paredes das artérias cerebrais.",
    description:
      "Dilatações nas paredes arteriais cerebrais que, ao se romperem, causam hemorragia subaracnóidea — uma emergência neurológica. O tratamento envolve clipagem microcirúrgica ou técnicas endovasculares, definidas caso a caso conforme a anatomia e o risco.",
    symptoms: [
      "Cefaleia súbita e intensa (“a pior dor da vida”)",
      "Rigidez de nuca",
      "Visão dupla ou turva",
      "Náuseas e vômitos",
    ],
    treatments: [
      "Clipagem microcirúrgica",
      "Embolização endovascular (coils)",
      "Desvio de fluxo (flow diverter)",
      "Acompanhamento de aneurismas não rotos",
    ],
    icon: Activity,
  },
  {
    slug: "mavs",
    title: "MAVs",
    short: "Malformações arteriovenosas são conexões anormais entre artérias e veias cerebrais.",
    description:
      "Emaranhados anormais de vasos que conectam diretamente artérias e veias, sem leito capilar intermediário. A abordagem combina microcirurgia, embolização e radiocirurgia conforme a localização e o grau de Spetzler-Martin.",
    symptoms: [
      "Convulsões",
      "Cefaleias persistentes",
      "Déficits neurológicos focais",
      "Hemorragia cerebral",
    ],
    treatments: [
      "Microcirurgia de ressecção",
      "Embolização pré-operatória",
      "Radiocirurgia",
      "Tratamento multimodal combinado",
    ],
    icon: GitBranch,
  },
  {
    slug: "tumores-cerebrais",
    title: "Tumores Cerebrais",
    short: "Lesões intracranianas que exigem ressecção precisa e preservação funcional.",
    description:
      "Lesões intracranianas benignas ou malignas tratadas com técnicas microcirúrgicas avançadas, mapeamento cerebral e cirurgia com paciente acordado quando indicado, priorizando a remoção máxima segura e a preservação funcional.",
    symptoms: [
      "Cefaleia progressiva",
      "Convulsões de início recente",
      "Alterações cognitivas ou de personalidade",
      "Déficits motores ou sensitivos",
    ],
    treatments: [
      "Ressecção microcirúrgica",
      "Cirurgia com paciente acordado",
      "Mapeamento cerebral funcional",
      "Biópsia estereotáxica",
    ],
    icon: Microscope,
  },
  {
    slug: "neuralgia-do-trigemeo",
    title: "Neuralgia do Trigêmio",
    short: "Dor facial intensa e episódica em um dos lados da face.",
    description:
      "Dor facial súbita e lancinante associada à compressão do nervo trigêmeo por um vaso sanguíneo. O tratamento definitivo pode incluir a descompressão microvascular, com altos índices de resolução duradoura.",
    symptoms: [
      "Dor facial em choque ou pontada",
      "Crises desencadeadas por toque, fala ou mastigação",
      "Episódios curtos e recorrentes",
      "Dor estritamente unilateral",
    ],
    treatments: [
      "Descompressão microvascular",
      "Radiocirurgia",
      "Procedimentos percutâneos",
      "Manejo medicamentoso",
    ],
    icon: Zap,
  },
  {
    slug: "espasmo-hemifacial",
    title: "Espasmo Hemifacial",
    short: "Contrações involuntárias da musculatura de um lado do rosto.",
    description:
      "Contrações involuntárias e progressivas da musculatura facial, geralmente por compressão vascular do nervo facial na sua origem. A descompressão microvascular oferece tratamento curativo na maioria dos casos.",
    symptoms: [
      "Contrações involuntárias da pálpebra",
      "Espasmos progressivos de um lado do rosto",
      "Piora com estresse e fadiga",
      "Impacto na visão e na vida social",
    ],
    treatments: [
      "Descompressão microvascular",
      "Aplicação de toxina botulínica",
      "Acompanhamento neurológico",
    ],
    icon: CircleDot,
  },
  {
    slug: "cavernomas",
    title: "Cavernomas",
    short: "Malformações vasculares de baixo fluxo com risco de sangramento.",
    description:
      "Malformações cavernosas de baixo fluxo que podem causar convulsões e sangramentos recorrentes. A ressecção microcirúrgica é indicada em lesões sintomáticas ou de localização cirurgicamente acessível.",
    symptoms: [
      "Convulsões",
      "Hemorragias recorrentes",
      "Déficits neurológicos",
      "Cefaleias",
    ],
    treatments: [
      "Ressecção microcirúrgica",
      "Observação de lesões assintomáticas",
      "Acompanhamento por imagem",
    ],
    icon: Brain,
  },
  {
    slug: "tumores-hipofisarios",
    title: "Tumores Hipofisários",
    short: "Adenomas que afetam o equilíbrio hormonal e a visão.",
    description:
      "Adenomas da hipófise abordados por via endoscópica transesfenoidal, técnica minimamente invasiva que preserva estruturas nobres, reduz o tempo de internação e acelera a recuperação.",
    symptoms: [
      "Alterações visuais",
      "Desequilíbrios hormonais",
      "Cefaleias",
      "Fadiga e alterações metabólicas",
    ],
    treatments: [
      "Cirurgia endoscópica transesfenoidal",
      "Tratamento hormonal",
      "Acompanhamento endocrinológico",
    ],
    icon: Stethoscope,
  },
];

export function getSpecialty(slug: string): Specialty | undefined {
  return SPECIALTIES.find((s) => s.slug === slug);
}

export type Testimonial = { quote: string; name: string; role: string };

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "O cuidado e a atenção do Dr. Hugo Doria transformaram completamente a minha recuperação. Senti segurança em cada etapa do tratamento.",
    name: "Maria Helena S.",
    role: "Paciente — Aneurisma Cerebral",
  },
  {
    quote:
      "Profissional excepcional, humano e extremamente competente. Devolveu qualidade de vida ao meu pai após uma cirurgia complexa.",
    name: "Rafael Andrade",
    role: "Familiar de paciente",
  },
  {
    quote:
      "A precisão técnica aliada ao acolhimento fez toda a diferença. Recomendo o Dr. Hugo de olhos fechados.",
    name: "Carla Menezes",
    role: "Paciente — Neuralgia do Trigêmio",
  },
  {
    quote:
      "Encontrei no Dr. Hugo a confiança que eu precisava em um momento tão delicado. Uma equipe que cuida de verdade.",
    name: "João Pedro L.",
    role: "Paciente — Tumor Cerebral",
  },
];

/* --------------------------------------------------------------------- Eventos */
export type SiteEvent = {
  id: string;
  date: string;
  title: string;
  location: string;
  type: "Congresso" | "Palestra" | "Workshop" | "Curso";
  description: string;
  upcoming: boolean;
};

export const EVENTS: SiteEvent[] = [
  {
    id: "cbn-2026",
    date: "15 Ago 2026",
    title: "Congresso Brasileiro de Neurocirurgia 2026",
    location: "São Paulo — SP",
    type: "Congresso",
    description:
      "Conferência magna sobre os avanços em neurocirurgia vascular e o futuro do tratamento de aneurismas complexos.",
    upcoming: true,
  },
  {
    id: "simposio-vascular",
    date: "22 Set 2026",
    title: "Simpósio de Neurocirurgia Vascular",
    location: "Rio de Janeiro — RJ",
    type: "Palestra",
    description:
      "Discussão de casos e estratégias multimodais no manejo de malformações arteriovenosas.",
    upcoming: true,
  },
  {
    id: "workshop-microcirurgia",
    date: "10 Out 2026",
    title: "Workshop de Microcirurgia",
    location: "São Paulo — SP",
    type: "Workshop",
    description:
      "Treinamento prático em técnicas de microdissecção e descompressão microvascular para residentes.",
    upcoming: true,
  },
  {
    id: "wfns-2025",
    date: "Nov 2025",
    title: "World Federation of Neurosurgical Societies",
    location: "Cidade do Cabo, África do Sul",
    type: "Congresso",
    description:
      "Apresentação de resultados de longo prazo na clipagem de aneurismas complexos.",
    upcoming: false,
  },
  {
    id: "jornada-avc",
    date: "Mar 2025",
    title: "Jornada de Atualização em AVC",
    location: "São Paulo — SP",
    type: "Palestra",
    description:
      "Painel sobre revascularização cerebral e prevenção do acidente vascular cerebral.",
    upcoming: false,
  },
];

/* --------------------------------------------------------------------- Artigos */
export type Article = {
  id: string;
  title: string;
  journal: string;
  year: number;
  category: "Vascular" | "Funcional" | "Base de Crânio" | "Técnica" | "Oncologia";
  excerpt: string;
  featured?: boolean;
};

export const ARTICLES: Article[] = [
  {
    id: "long-term-clipping",
    title: "Resultados de longo prazo na clipagem de aneurismas complexos",
    journal: "Journal of Neurosurgery",
    year: 2025,
    category: "Vascular",
    excerpt:
      "Análise de uma coorte de mais de 400 pacientes submetidos à clipagem microcirúrgica, com acompanhamento médio de 7 anos.",
    featured: true,
  },
  {
    id: "mvd-trigeminal",
    title: "Descompressão microvascular na neuralgia do trigêmeo: série de casos",
    journal: "Neurosurgery",
    year: 2024,
    category: "Funcional",
    excerpt:
      "Avaliação dos desfechos de dor e qualidade de vida após descompressão microvascular em centro de referência.",
  },
  {
    id: "endoscopic-pituitary",
    title: "Abordagem endoscópica de tumores hipofisários",
    journal: "World Neurosurgery",
    year: 2023,
    category: "Base de Crânio",
    excerpt:
      "Técnica transesfenoidal endoscópica e seus resultados em preservação visual e controle hormonal.",
  },
  {
    id: "avm-multimodal",
    title: "Manejo multimodal de malformações arteriovenosas",
    journal: "Stroke",
    year: 2022,
    category: "Vascular",
    excerpt:
      "Protocolo combinando embolização, microcirurgia e radiocirurgia para MAVs de alto grau.",
  },
  {
    id: "moyamoya-bypass",
    title: "Revascularização cerebral na doença de Moyamoya",
    journal: "Journal of Neurosurgery",
    year: 2021,
    category: "Vascular",
    excerpt:
      "Resultados de bypass de revascularização cerebral na redução de eventos isquêmicos.",
  },
  {
    id: "iom-monitoring",
    title: "Monitorização neurofisiológica intraoperatória",
    journal: "Acta Neurochirurgica",
    year: 2020,
    category: "Técnica",
    excerpt:
      "Impacto da monitorização intraoperatória na preservação funcional em cirurgias de alta complexidade.",
  },
];
