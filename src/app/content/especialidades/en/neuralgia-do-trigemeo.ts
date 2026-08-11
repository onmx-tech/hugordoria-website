import type { ArticleContent } from "../types";

// Reestruturado no molde rico — o texto corrido original foi dividido nas
// seções, sem novas afirmações médicas.
export const article: ArticleContent = {
  slug: "neuralgia-do-trigemeo",
  category: "Functional",
  readingTime: "3 min read",
  lead: "Lancinating facial pain in bouts.",
  heroMeta: [
    { label: "Approach", value: "Decompression or rhizotomy" },
    { label: "Incidence", value: "> 50 years, more in women" },
  ],
  sections: [
    {
      id: "o-que-e",
      tocLabel: "What it is",
      heading: "Lancinating pain limited to one side of the face.",
      emphasis: "one side of the face",
      figureCaption: "Fig. 01 — Neurovascular conflict of the trigeminal nerve · illustration",
      figureSrc: "neuralgia-do-trigemeo-fig01",
      paragraphs: [
        "Trigeminal neuralgia, also known as “tic douloureux,” is characterized by lancinating pain, in bouts, limited to one side of the face — in the region of the eyes, the ala of the nose, the jaw and teeth, or in all of these locations. The episodes of pain are short-lived, with complete remission between bouts.",
        "It generally occurs in patients over 50 years of age and far more frequently in women. The most common cause is inflammation of the nerve resulting from the continuous pulsing of a vascular loop against the trigeminal nerve.",
      ],
    },
    {
      id: "sintomas",
      tocLabel: "Symptoms",
      heading: "How the pain presents",
      paragraphs: [
        "The bouts can be triggered by a smile, by the act of speaking, brushing the teeth, chewing, or by the friction of cold wind:",
      ],
      bullets: [
        "Lancinating pain in bouts",
        "Triggers: speaking, chewing, brushing the teeth",
        "Sensitivity to cold wind",
        "Complete remission between bouts",
      ],
    },
    {
      id: "diagnostico",
      tocLabel: "Diagnosis",
      heading: "Clinical diagnosis",
      paragraphs: [
        "The diagnosis is clinical, aided by magnetic resonance imaging to identify the vascular loop in conflict with the trigeminal nerve.",
      ],
    },
    {
      id: "tratamento",
      tocLabel: "Treatment",
      heading: "Management and treatment",
      paragraphs: [
        "Initial treatment consists of specific medication. Failure of, or intolerance to, medical treatment can be resolved by surgical intervention:",
      ],
      options: [
        {
          title: "Medication",
          description:
            "First line of treatment, with specific medication to control the pain.",
        },
        {
          title: "Percutaneous rhizotomy",
          description:
            "By balloon (mechanical lesion by compression) or by radiofrequency (thermal lesion): a needle penetrates the skull through the foramen ovale and produces a controlled lesion of the trigeminal nerve root.",
        },
        {
          title: "Microvascular decompression",
          description:
            "Using a high-resolution microscope, the nerve and the vascular loop are identified, dissected, and separated, with the interposition of a prosthesis between the structures.",
        },
      ],
    },
  ],
};
