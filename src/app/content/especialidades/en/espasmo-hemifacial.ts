import type { ArticleContent } from "../types";

// Reestruturado no molde rico — o texto corrido original foi dividido nas
// seções, sem novas afirmações médicas.
export const article: ArticleContent = {
  slug: "espasmo-hemifacial",
  category: "Functional",
  readingTime: "3 min read",
  lead: "Involuntary contractions of one side of the face, treated by microvascular decompression.",
  heroMeta: [
    { label: "Approach", value: "Microvascular decompression" },
    { label: "Diagnosis", value: "Magnetic resonance imaging" },
    { label: "Cause", value: "Vascular loop over the facial nerve" },
  ],
  sections: [
    {
      id: "o-que-e",
      tocLabel: "What it is",
      heading: "Involuntary contraction of one side of the face.",
      emphasis: "one side of the face",
      figureCaption: "Fig. 01 — Neurovascular conflict of the facial nerve · illustration",
      figureSrc: "espasmo-hemifacial-fig01",
      paragraphs: [
        "Hemifacial spasm is a rare disease characterized by involuntary contraction of one side of the face. It appears spontaneously and usually worsens progressively. It has an aesthetic and psychologically damaging effect on the patient.",
        "The main cause is similar to that of trigeminal neuralgia: a vascular loop is frequently overlying the facial nerve, promoting, through the continuous pulsing against the nerve, inflammation and involuntary, repeated depolarization.",
      ],
    },
    {
      id: "sintomas",
      tocLabel: "Symptoms",
      heading: "How it manifests",
      paragraphs: [
        "The involuntary contractions of the muscles of facial expression are predominant around the eyes, gradually progressing to the muscles that contract one half of the mouth. They are intensified by stress:",
      ],
      bullets: [
        "Contraction around the eyes",
        "Progression to one half of the mouth",
        "Intensification by stress",
      ],
    },
    {
      id: "diagnostico",
      tocLabel: "Diagnosis",
      heading: "Imaging diagnosis",
      paragraphs: [
        "Magnetic resonance imaging is the best method for diagnosis, allowing identification of the vascular loop in conflict with the facial nerve.",
      ],
    },
    {
      id: "tratamento",
      tocLabel: "Treatment",
      heading: "Management and treatment",
      paragraphs: [
        "Drug treatment has a limited response in this condition. Botulinum toxin acts on the contractions, with a temporary effect. Elderly patients or those with severe clinical comorbidities are not candidates for the surgical procedure:",
      ],
      options: [
        {
          title: "Botulinum toxin",
          description:
            "Used in specific cases to treat the involuntary contractions of one half of the face, with a temporary effect.",
        },
        {
          title: "Microvascular decompression",
          description:
            "Microsurgical decompression of the facial nerve with interposition of a prosthesis between the nerve and the vascular loop. Indicated for patients fit for the neurosurgical procedure.",
        },
      ],
    },
  ],
};
