import type { ArticleContent } from "../types";

// Reestruturado no molde rico — o texto corrido original foi dividido nas
// seções, sem novas afirmações médicas.
export const article: ArticleContent = {
  slug: "tumores-hipofisarios",
  category: "Tumoral",
  readingTime: "4 min read",
  lead: "Tumors of the sellar region (pituitary gland) removed preferentially via the endoscopic endonasal route.",
  heroMeta: [
    { label: "Approach", value: "Endoscopic endonasal" },
    { label: "Diagnosis", value: "MRI + hormonal workup" },
    { label: "Classification", value: "Micro- and macroadenoma" },
  ],
  quote: {
    text: "The preferred treatment is the endoscopic transnasal approach, with microsurgical resection of the lesion.",
    emphasis: "endoscopic transnasal",
    afterSectionId: "tratamento",
  },
  sections: [
    {
      id: "o-que-e",
      tocLabel: "What it is",
      heading: "Tumors of the body's master gland.",
      emphasis: "master gland",
      figureCaption: "Fig. 01 — Illustration: three-dimensional representation of the brain",
      figureSrc: "reconstrucao3d",
      paragraphs: [
        "The sellar region comprises the sella turcica, a saddle-shaped bony structure within which the pituitary gland is located — also called the hypophysis or master gland, because it produces or stores most of the hormones involved in the functioning of the body.",
        "Tumors of the sellar region comprise mainly pituitary adenomas, craniopharyngiomas, and meningiomas. Pituitary tumors are divided into hormone-secreting and non-secreting and, by size, into microadenomas (< 1 cm) and macroadenomas (> 1 cm).",
      ],
    },
    {
      id: "sintomas",
      tocLabel: "Symptoms",
      heading: "How they present",
      paragraphs: [
        "The symptoms depend on the characteristics of the tumor. Non-secreting microadenomas are usually asymptomatic; in secreting ones, they vary according to the hormone in excess. Macroadenomas compress adjacent neurovascular structures — headache and visual changes from compression of the optic nerves are the most common symptoms. In some cases tumor hemorrhage occurs (pituitary apoplexy):",
      ],
      bullets: [
        "Headache",
        "Visual changes",
        "Hormonal disorders",
        "Pituitary apoplexy",
      ],
    },
    {
      id: "diagnostico",
      tocLabel: "Diagnosis",
      heading: "Imaging and hormonal diagnosis",
      paragraphs: [
        "The diagnosis is made by magnetic resonance imaging, to identify the tumor mass, and by studying the hormones of the hypothalamic-pituitary axis. Computed tomography of the paranasal sinuses may be used to plan the surgical approach.",
      ],
    },
    {
      id: "tratamento",
      tocLabel: "Treatment",
      heading: "Management and treatment",
      paragraphs: [
        "The choice of approach depends on the volume and extent of the tumor:",
      ],
      options: [
        {
          title: "Endoscopic transnasal approach",
          description:
            "The preferred route to the sellar region, with microsurgical resection of the lesion — whether the macroadenoma or the hormone-secreting microadenoma — without external incisions.",
        },
        {
          title: "Transcranial approach",
          description:
            "Indicated for large tumor volumes, with parasellar or suprasellar extension and compression of brain structures, for the resection of tumors of the sellar region.",
        },
      ],
    },
  ],
};
