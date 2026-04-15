import type { ReactNode } from "react";
import {
  IconAneurisma,
  IconMAV,
  IconSchwannoma,
  IconTumor,
} from "./icons";

export type CardData = {
  title: string;
  description: string;
  icon: () => ReactNode;
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
    icon: IconSchwannoma,
    title: "Schwannoma Vestibular",
    description:
      "O schwannoma vestibular (SV) é um tumor benigno do nervo vestibulococlear.",
  },
  {
    icon: IconAneurisma,
    title: "Aneurisma Cerebral",
    description:
      "Os aneurismas cerebrais são dilatações anormais nas paredes das artérias cerebrais.",
  },
  {
    icon: IconMAV,
    title: "MAVs",
    description:
      "As malformações arteriovenosas (MAVs) são conexões anormais entre artérias e veias cerebrais.",
  },
  {
    icon: IconTumor,
    title: "Tumores Cerebrais",
    description:
      "A neuralgia do trigêmio é uma dor intensa e episódica em um lado da face.",
  },
  {
    icon: IconSchwannoma,
    title: "Doença de Moyamoya",
    description:
      "Tratamento da doença rara com estreitamento progressivo das artérias cerebrais via revascularização.",
  },
  {
    icon: IconAneurisma,
    title: "Neuralgia do Trigêmeo",
    description:
      "Dor facial episódica tratada por descompressão microvascular ou radiocirurgia estereotáxica.",
  },
  {
    icon: IconMAV,
    title: "Espasmo Hemifacial",
    description:
      "Contrações involuntárias da musculatura facial tratadas por descompressão microvascular do nervo facial.",
  },
  {
    icon: IconTumor,
    title: "Revascularização Cerebral",
    description:
      "Bypass cerebral para restaurar o fluxo sanguíneo em casos de isquemia crônica e doenças oclusivas.",
  },
  {
    icon: IconAneurisma,
    title: "Tumores Hipofisários",
    description:
      "Remoção de adenomas hipofisários por via endoscópica endonasal, preservando a função glandular.",
  },
];

export const TRACK_W =
  CARD_START_X + (cards.length - 1) * CARD_STEP_X + CARD_W + END_PADDING;
