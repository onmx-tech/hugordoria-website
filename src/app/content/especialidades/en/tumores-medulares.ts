import type { ArticleContent } from "../types";

// Reestruturado no molde rico — o texto corrido original foi dividido nas
// seções, sem novas afirmações médicas.
export const article: ArticleContent = {
  slug: "tumores-medulares",
  category: "Tumoral",
  readingTime: "3 min read",
  lead: "Tumors of the spine and spinal cord treated with microsurgical technique, according to the identified cell type.",
  heroMeta: [
    { label: "Approach", value: "Microsurgical" },
    { label: "Diagnosis", value: "Neurological exam + MRI" },
    { label: "Complement", value: "According to the biopsy" },
  ],
  quote: {
    text: "Treatment is based on microsurgical technique, according to the cell type identified by biopsy.",
    emphasis: "microsurgical technique",
    afterSectionId: "tratamento",
  },
  sections: [
    {
      id: "o-que-e",
      tocLabel: "What it is",
      heading: "Tumors of the spine and spinal cord.",
      emphasis: "spine and spinal cord",
      figureCaption: "Fig. 01 — Illustration: brain sections",
      figureSrc: "mri",
      paragraphs: [
        "Tumors of the spinal column can affect the vertebral bone, the meninges, or the spinal cord itself. In most cases, vertebral tumors are metastases — consequences of primary tumors located in other organs, such as the lung, breast, prostate, ovaries, or intestines.",
        "Among spinal cord tumors, ependymomas and astrocytomas are the most frequent.",
      ],
    },
    {
      id: "sintomas",
      tocLabel: "Symptoms",
      heading: "Warning signs",
      paragraphs: [
        "In vertebral metastases, the main symptom is pain, localized or radiating along the path of the nerves. In spinal cord tumors, changes in strength and sensation predominate:",
      ],
      bullets: [
        "Localized or radiating pain",
        "Loss of muscle strength",
        "Changes in sensation",
      ],
    },
    {
      id: "diagnostico",
      tocLabel: "Diagnosis",
      heading: "Imaging diagnosis",
      paragraphs: [
        "The diagnosis is made by a thorough neurological examination and imaging studies, such as magnetic resonance imaging, scintigraphy, and computed tomography.",
      ],
    },
    {
      id: "tratamento",
      tocLabel: "Treatment",
      heading: "Management and treatment",
      paragraphs: [
        "Specific treatment is based on microsurgical technique, and may be combined with adjuvant therapies according to the cell type:",
      ],
      options: [
        {
          title: "Microsurgical resection",
          description:
            "Precision microsurgical technique to address tumors of the vertebral bone, the meninges, or the spinal cord.",
        },
        {
          title: "Radiotherapy and/or chemotherapy",
          description:
            "Combined with surgery according to the tumor cell type identified by biopsy.",
        },
      ],
    },
  ],
};
