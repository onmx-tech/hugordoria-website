import type { ArticleContent } from "../types";

// Reestruturado no molde rico, reorganizando o conteúdo original sem novas
// afirmações médicas.
export const article: ArticleContent = {
  slug: "cavernomas",
  category: "Vascular",
  readingTime: "6 min read",
  lead: "Low-flow vascular malformations of the brain and spinal cord, treated by microsurgery when symptomatic.",
  heroMeta: [
    { label: "Approach", value: "Observation or microsurgery" },
    { label: "Hemorrhage rate", value: "0.8–3.8% per year" },
    { label: "Location", value: "60–80% supratentorial" },
  ],
  quote: {
    text: "Microsurgical resection is the treatment of choice.",
    afterSectionId: "tratamento",
  },
  sections: [
    {
      id: "o-que-e",
      tocLabel: "What it is",
      heading: "Low-flow vascular malformations.",
      emphasis: "Low-flow",
      figureCaption: "Fig. 01 — Cerebral cavernoma",
      paragraphs: [
        "Cavernous malformations — also known as cavernous angiomas or cavernomas — are low-flow vascular malformations located in the brain and spinal cord, formed by a cluster of dilated sinusoidal channels lined with endothelial cells. The vessels lack the normal muscular and elastic layers, and there is no neural tissue within the lesion.",
        "They can be sporadic or familial. The familial ones are hereditary, with an autosomal dominant pattern, account for 30%–50% of cases, and frequently present with multiple lesions, unlike the sporadic ones, which are commonly single.",
        "After aneurysms, they are the most frequent vascular lesion of the central nervous system (10%–15% of neurovascular malformations). There is no gender preference; between 60% and 80% are located in the supratentorial compartment. The clinical presentation is bimodal, most common in the third and fourth decades of life.",
      ],
    },
    {
      id: "sintomas",
      tocLabel: "Symptoms",
      heading: "A broad spectrum of manifestations",
      paragraphs: [
        "Because of the variability in size, location, and propensity to bleed, cavernomas cause a broad spectrum of symptoms that change over time. Epileptic seizures are the most frequent symptom, due to the epileptogenic potential of blood degradation products; deficits predominate in brainstem cavernomas:",
      ],
      bullets: [
        "Epileptic seizures",
        "Focal neurological deficits",
        "Hemorrhages",
        "Hydrocephalus (infrequent)",
      ],
    },
    {
      id: "diagnostico",
      tocLabel: "Diagnosis",
      heading: "Imaging diagnosis",
      paragraphs: [
        "Diagnosis is more difficult than that of other vascular diseases, because cavernomas are not evident on angiography. Plain CT is the first study when bleeding is suspected, but it is limited.",
        "Magnetic resonance imaging — with T1, T2, gradient echo, and susceptibility-weighted sequences — is the central tool, capable of distinguishing lesions at different stages of bleeding (acute, subacute, and chronic) and of assisting intraoperative navigation in deep lesions.",
      ],
    },
    {
      id: "tratamento",
      tocLabel: "Treatment",
      heading: "Management and treatment",
      paragraphs: [
        "The presence of symptoms, the location, the age, and the health history are the most important determinants of management, which requires multidisciplinary discussion:",
      ],
      options: [
        {
          title: "Observation",
          description:
            "Conservative management favored for asymptomatic patients or those with elevated pre-surgical risk.",
        },
        {
          title: "Microsurgical resection",
          description:
            "The treatment of choice. Indicated in multiple hemorrhages, neurological deficit, or progressive seizures, with planning by neuronavigation and electroneurophysiological methods. Complete removal, together with the hemosiderin ring, prevents bleeding and epileptogenic foci.",
        },
        {
          title: "Stereotactic radiosurgery",
          description:
            "An option for supratentorial lesions in unfavorable locations or with high surgical risk. It is not recommended for brainstem cavernomas.",
        },
      ],
    },
  ],
};
