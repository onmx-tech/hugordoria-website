import type { ArticleContent } from "../types";

// Reestruturado no molde rico (O que é / Sintomas / Diagnóstico / Tratamento).
// Texto reorganizado do conteúdo original, sem novas afirmações médicas.
export const article: ArticleContent = {
  slug: "mavs",
  category: "Vascular",
  readingTime: "6 min read",
  lead: "Abnormal connections between cerebral arteries and veins that demand high-precision microsurgical resection.",
  heroMeta: [
    { label: "Approach", value: "Multidisciplinary microsurgery" },
    { label: "Annual hemorrhage risk", value: "2–4%" },
    { label: "Location", value: "90% supratentorial" },
  ],
  quote: {
    text: "The resection must always be complete.",
    afterSectionId: "tratamento",
  },
  sections: [
    {
      id: "o-que-e",
      tocLabel: "What it is",
      heading: "Abnormal connections between cerebral arteries and veins.",
      emphasis: "cerebral arteries and veins",
      figureCaption: "Fig. 01 — Arteriovenous nidus",
      paragraphs: [
        "Arteriovenous malformations (AVMs) are direct shunts between dysplastic cerebral arteries and veins, in which a nidus of abnormal vessels, with thin and fragile walls, is interposed with no parenchyma inside it. They are considered to be congenital in origin, and may change their hemodynamic behavior throughout the patient's life.",
        "They can be located in any part of the central nervous system, being most common in the cerebral hemispheres and, in decreasing order, the cerebellum, cerebral nuclei, brainstem, and spinal cord. The morphology is quite variable, from a few millimeters to more than six centimeters.",
        "They are rare — about 0.1% of the population, one tenth of the incidence of cerebral aneurysms. Approximately 90% are found in the supratentorial region and about 15% remain asymptomatic throughout life. They have no gender preference.",
      ],
    },
    {
      id: "sintomas",
      tocLabel: "Symptoms",
      heading: "How AVMs manifest",
      paragraphs: [
        "The presentation depends on the patient's age, the size, the location, and the vascular characteristics of the AVM. Hemorrhage is the most common manifestation:",
        "Unruptured AVMs have an annual hemorrhage risk of 2% to 4%, higher in those already ruptured — especially in the first year after rupture. Deep venous drainage, deep cerebral location, and small nidus size increase the risk of rupture. The neurological deficit usually results from the “flow steal” caused by the malformation.",
      ],
      bullets: [
        "Cerebral hemorrhage",
        "Seizures",
        "Focal neurological deficit",
        "Headache",
      ],
    },
    {
      id: "diagnostico",
      tocLabel: "Diagnosis",
      heading: "Imaging diagnosis",
      figureCaption: "Fig. 02 — Digital angiography",
      paragraphs: [
        "Imaging studies are essential to establish the diagnosis and characterize the lesion for planning. Head CT is usually the first exam, used to rule out a hemorrhage.",
        "Magnetic resonance imaging defines the location of the nidus, its neuroanatomical relationships, and the associated draining vein; MR angiography characterizes the venous drainage and other vascular features with high precision.",
        "Digital angiography is the gold standard — a dynamic exam that reveals the anatomy and physiology of the nidus, distinguishes the vessels that feed it from those in transit, locates the drainage, and demonstrates associated aneurysms, which carry a higher risk of bleeding.",
      ],
    },
    {
      id: "tratamento",
      tocLabel: "Treatment",
      heading: "Multidisciplinary treatment",
      paragraphs: [
        "Treatment is individualized and multidisciplinary. The decision considers the size of the nidus, the type of venous drainage (superficial or deep), and the location — eloquent or not (Spetzler-Martin Classification):",
      ],
      options: [
        {
          title: "Microsurgical resection",
          description:
            "The most effective treatment: microdissection, coagulation, and cutting of each feeding vessel until the nidus is disconnected from the circulation, preserving the draining vein until the end. It relies on intraoperative indocyanine angiography and continuous neurophysiological monitoring.",
        },
        {
          title: "Awake surgery",
          description:
            "For AVMs in eloquent areas (speech, motor, sensory, or visual cortex), awake craniotomy with direct cortical stimulation allows the adjacent regions to be assessed in real time and a safe resection to be achieved, with faster recovery.",
        },
        {
          title: "Endovascular embolization",
          description:
            "In high-flow or deeply located AVMs, selective embolization of the vessels that supply the nidus is performed before surgery, reducing the volume of blood reaching the malformation and the time of the resection.",
        },
      ],
    },
  ],
};
