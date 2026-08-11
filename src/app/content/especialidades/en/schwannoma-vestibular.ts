import type { ArticleContent } from "../types";

// Reestruturado no molde rico, reorganizando o conteúdo original sem novas
// afirmações médicas.
export const article: ArticleContent = {
  slug: "schwannoma-vestibular",
  category: "Tumoral",
  readingTime: "7 min read",
  lead: "Benign tumor of the vestibulocochlear nerve, with progressive hearing loss, treated by microsurgery or observation.",
  heroMeta: [
    { label: "Approach", value: "Microsurgery or observation" },
    { label: "Incidence", value: "6–8% of intracranial tumors" },
    { label: "Follow-up", value: "Serial MRI" },
  ],
  sections: [
    {
      id: "o-que-e",
      tocLabel: "What it is",
      heading: "A benign tumor of the vestibulocochlear nerve.",
      emphasis: "vestibulocochlear nerve",
      figureCaption: "Fig. 01 — Illustration: three-dimensional representation of the brain",
      figureSrc: "reconstrucao3d",
      paragraphs: [
        "Vestibular schwannoma (VS), also known as acoustic neuroma, is a benign tumor derived from Schwann cells originating in the vestibulocochlear nerve. It represents 80–85% of tumors arising in the cerebellopontine angle. Although benign, through mass effect it can compromise several intracranial structures.",
        "Most grow from the inferior vestibular nerve, rarely from the superior nerve or the cochlear portion. The histology is characteristic, with densely cellular Antoni A areas alternating with microcystic Antoni B areas.",
        "It represents about 6–8% of all intracranial tumors and 80% of cerebellopontine angle tumors. It is sporadic in 90% of cases, unilateral and without side predominance; the remainder occur in neurofibromatosis type 2. Exposure to high-dose ionizing radiation is a recognized risk factor.",
      ],
    },
    {
      id: "sintomas",
      tocLabel: "Symptoms",
      heading: "Warning signs",
      paragraphs: [
        "Most patients present with unilateral sensorineural hearing loss (94%) and tinnitus (83%). Vestibular symptoms vary and are often underreported. Large tumors can cause trigeminal and facial neuropathy, brainstem compression, and hydrocephalus:",
      ],
      bullets: [
        "Unilateral hearing loss",
        "Tinnitus",
        "Vertigo and instability",
        "Facial or trigeminal neuropathy",
      ],
    },
    {
      id: "diagnostico",
      tocLabel: "Diagnosis",
      heading: "Diagnosis and classification",
      figureCaption: "Fig. 02 — Illustration: brain sections",
      figureSrc: "mri",
      paragraphs: [
        "Magnetic resonance imaging is the method of choice — the contrast-enhanced T1 sequence is the gold standard for initial and postoperative assessment. Computed tomography complements it, providing the bony anatomy of the skull base.",
        "The tumor appears as a solid mass with an intracanalicular component in the internal acoustic meatus, which it tends to widen. It is isointense on T1, with strong enhancement after gadolinium, and heterogeneously hyperintense on T2; calcifications are typically absent.",
        "The most widely used grading systems are the Koos system (grades I to IV, from a purely intrameatal tumor to one displacing the brainstem) and the Hannover system, which details the extension into the cerebellopontine cistern and brainstem compression.",
      ],
    },
    {
      id: "tratamento",
      tocLabel: "Treatment",
      heading: "Management and approaches",
      paragraphs: [
        "Management takes into account the size and morphology of the tumor, the symptoms, and comorbidities. In large tumors (Koos IV), surgery is the primary treatment; the goal is total or near-total resection, since residual volume correlates with recurrence. The surgical approaches include:",
      ],
      options: [
        {
          title: "Retrosigmoid approach",
          description:
            "Indicated for tumors in the cerebellopontine cistern or with significant mass effect. It accommodates tumors of various sizes, offers the possibility of hearing preservation, and provides excellent visualization of the brainstem and cranial nerves.",
        },
        {
          title: "Translabyrinthine approach",
          description:
            "Useful for tumors of any size. Labyrinthectomy leads to complete hearing loss on that side, but offers wide access and superior visualization of the entire facial nerve, without brain retraction.",
        },
        {
          title: "Middle fossa approach",
          description:
            "Lateral access to the internal auditory canal via temporal craniotomy, best for small intracanalicular tumors when hearing preservation is a goal.",
        },
        {
          title: "Observation",
          description:
            "Offered to selected patients — elderly, with a very small and asymptomatic tumor — with serial MRI every 6 to 12 months, given the slow growth of most of these tumors.",
        },
      ],
    },
  ],
};
