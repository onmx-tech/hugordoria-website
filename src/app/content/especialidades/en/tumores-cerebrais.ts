import type { ArticleContent } from "../types";

// Reestruturado no molde rico — o texto corrido original foi dividido nas
// seções, sem novas afirmações médicas.
export const article: ArticleContent = {
  slug: "tumores-cerebrais",
  category: "Tumoral",
  readingTime: "4 min read",
  lead: "Expansive lesions of the central nervous system treated with precision microsurgery and complementary therapies.",
  heroMeta: [
    { label: "Approach", value: "Precision microsurgery" },
    { label: "Diagnosis", value: "CT and MRI" },
    { label: "Complement", value: "Radio/chemotherapy" },
  ],
  quote: {
    text: "The goal is the widest possible removal, with the least neurological impact on the patient.",
    emphasis: "least neurological impact",
    afterSectionId: "tratamento",
  },
  sections: [
    {
      id: "o-que-e",
      tocLabel: "What it is",
      heading: "An expansive lesion inside the cranial vault.",
      emphasis: "cranial vault",
      figureCaption: "Fig. 01 — Supratentorial expansive lesion",
      paragraphs: [
        "Brain tumors result from the disordered multiplication of cells in the central nervous system, forming an expansive lesion within a closed system, the cranial vault. All age groups are affected — in children there is a predominance of the lower compartment of the skull (posterior fossa) and in adults of the upper compartment (supratentorial).",
        "There are genetically inherited diseases, such as neurofibromatosis and tuberous sclerosis, that favor their onset. The lesions are classified by their cellular characteristics — astrocytomas, oligodendrogliomas, ependymomas, meningiomas, neurinomas — and, today, also by molecular and genetic characterization, with the goal of individualizing treatment and defining the prognosis.",
      ],
    },
    {
      id: "sintomas",
      tocLabel: "Symptoms",
      heading: "Warning signs",
      paragraphs: [
        "The most frequent manifestations are severe headaches or a change in the pattern of the usual headache; progressive deficits and seizures may also appear:",
      ],
      bullets: [
        "Severe headache or change in pattern",
        "Motor and sensory changes",
        "Visual changes",
        "Seizures",
      ],
    },
    {
      id: "diagnostico",
      tocLabel: "Diagnosis",
      heading: "Imaging diagnosis",
      paragraphs: [
        "The investigation begins with an imaging exam — computed tomography and, in greater detail, MRI of the skull. After surgery, the removed tissue is analyzed and follow-up continues with neurological observation and serial MRI.",
      ],
    },
    {
      id: "tratamento",
      tocLabel: "Treatment",
      heading: "Management and treatment",
      paragraphs: [
        "Treatment generally begins with a surgical procedure, with the goal of collecting material for analysis and, in most cases, performing the widest possible removal with the least neurological impact:",
      ],
      options: [
        {
          title: "Microsurgical resection",
          description:
            "Precision microsurgical technique supported by neuronavigation, ultrasonic aspirator, and neurophysiological monitoring of sensory-motor evoked potentials to preserve eloquent areas.",
        },
        {
          title: "Awake surgery and guided biopsy",
          description:
            "Electrocorticography to identify eloquent brain areas and surgery with the patient awake; biopsies guided by stereotaxy or neuronavigation when indicated.",
        },
        {
          title: "Complementary therapies",
          description:
            "After tissue analysis, treatment may be complemented with radiotherapy and chemotherapy, according to the tumor type.",
        },
      ],
    },
  ],
};
