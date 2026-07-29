import type { ArticleContent } from "../types";

// Reestruturado no molde rico, reorganizando o conteúdo original sem novas
// afirmações médicas.
export const article: ArticleContent = {
  slug: "doenca-de-moyamoya",
  category: "Vascular",
  readingTime: "5 min read",
  lead: "Progressive narrowing of the cerebral arteries treated by revascularization to prevent strokes.",
  heroMeta: [
    { label: "Approach", value: "Cerebral revascularization" },
    { label: "Risk ranges", value: "5–10 and 30–40 years" },
    { label: "Goal", value: "Prevent stroke" },
  ],
  sections: [
    {
      id: "o-que-e",
      tocLabel: "What it is",
      heading: "A “puff of smoke” in the vessels of the brain.",
      emphasis: "puff of smoke",
      figureCaption: "Fig. 01 — Moya-Moya collateral network",
      paragraphs: [
        "Moya-Moya Disease affects the blood vessels of the brain: it causes the progressive narrowing of the arteries that carry blood to the brain, resulting in the formation of abnormal collateral vessels with the appearance of a “puff of smoke” on imaging studies — hence the name, which means “smoke” in Japanese.",
        "The exact cause is still unknown, but genetic factors play an important role. The condition can be primary or characterize a syndrome when associated with other diseases, such as sickle cell anemia, Down Syndrome, or autoimmune conditions.",
        "It is more common in Asian populations, but it occurs worldwide, including in Brazil. It affects children and adults, with a higher risk between 5 and 10 years of age in children and between 30 and 40 years of age in adults.",
      ],
    },
    {
      id: "sintomas",
      tocLabel: "Symptoms",
      heading: "Manifestations according to age",
      paragraphs: [
        "Symptoms vary with age. In children, ischemic strokes and transient ischemic attacks predominate — about 65% to 70% present with weakness, numbness, or difficulty speaking as the first signs. In adults, intracerebral hemorrhage predominates (about 40% of cases), although ischemic strokes are also frequent:",
      ],
      bullets: [
        "Ischemic stroke or TIA",
        "Intracerebral hemorrhage",
        "Seizures",
        "Progressive cognitive changes",
      ],
    },
    {
      id: "diagnostico",
      tocLabel: "Diagnosis",
      heading: "Imaging diagnosis",
      paragraphs: [
        "Cerebral angiography is the gold standard for confirming the narrowing of the arteries and the presence of the collateral vessels.",
        "Magnetic resonance imaging assesses possible areas affected by ischemia, and computed tomography can identify early changes or brain damage. Together, these exams help define the stage of the disease and plan the treatment.",
      ],
    },
    {
      id: "tratamento",
      tocLabel: "Treatment",
      heading: "Cerebral revascularization",
      paragraphs: [
        "Treatment is essential to prevent strokes and hemorrhages. Each case is assessed individually:",
      ],
      options: [
        {
          title: "Direct revascularization (bypass)",
          description:
            "Creation of new connections between blood vessels to ensure adequate circulation to the brain. It must be performed by a neurosurgeon experienced in vascular microsurgery.",
        },
        {
          title: "Indirect revascularization",
          description:
            "Techniques such as encephalomyosynangiosis (EMS), EDAS, and EMAS, in which vascularized tissue is placed over the brain to stimulate, over time, the development of new vessels and improve collateral flow.",
        },
        {
          title: "Medications",
          description:
            "Although they do not cure the disease, medications such as aspirin can reduce the risk of clot formation until surgery is performed.",
        },
      ],
    },
  ],
};
