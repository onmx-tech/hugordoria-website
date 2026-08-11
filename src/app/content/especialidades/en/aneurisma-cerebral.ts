import type { ArticleContent } from "../types";

// Reestruturado no molde do Design System v3 (O que é / Sintomas / Diagnóstico /
// Tratamento / Recuperação). Todo o texto clínico vem do conteúdo migrado do
// site original — apenas reorganizado e condensado, sem novas afirmações médicas.
export const article: ArticleContent = {
  slug: "aneurisma-cerebral",
  category: "Vascular",
  readingTime: "6 min read",
  lead: "Dilations in the walls of the cerebral arteries that demand precise diagnosis and individualized microsurgical or endovascular treatment.",
  heroMeta: [
    { label: "Approach", value: "Microsurgical or endovascular" },
    { label: "Peak incidence", value: "35–60 years" },
    { label: "Follow-up", value: "Serial imaging" },
  ],
  quote: {
    text: "Early diagnosis completely changes the prognosis. Every minute matters.",
    emphasis: "Every minute matters",
    afterSectionId: "sintomas",
  },
  sections: [
    {
      id: "o-que-e",
      tocLabel: "What it is",
      heading: "A dilation in the wall of a cerebral artery.",
      emphasis: "cerebral artery",
      figureCaption: "Fig. 01 — Saccular aneurysm at an arterial bifurcation · illustration",
      figureSrc: "aneurisma-cerebral-fig01",
      paragraphs: [
        "Cerebral aneurysms are an abnormal dilation in the arterial wall of the cerebral vessels, usually near a bifurcation point, where there is a structural abnormality of the wall. About 90% are saccular; the remainder include fusiform, traumatic, mycotic, dissecting, and microaneurysms.",
        "They vary in size — small (< 10 mm), large (11–25 mm), and giant (> 25 mm). Approximately 85% are located in the anterior circulation of the Circle of Willis, where the anterior and posterior circulations anastomose.",
        "Several factors increase the risk of development, growth, and rupture: smoking, alcohol abuse, female sex, uncontrolled hypertension, and atherosclerosis. The genetic contribution is significant, and hereditary syndromes should be considered when more than one family member has intracranial aneurysms.",
        "They are most prevalent between 35 and 60 years of age, with a 1:2 ratio between men and women. About 10–30% of patients may present with multiple aneurysms.",
      ],
    },
    {
      id: "sintomas",
      tocLabel: "Symptoms",
      heading: "Warning signs",
      paragraphs: [
        "Intact aneurysms are usually silent and are often incidental findings during the investigation of another condition. When rupture occurs — subarachnoid hemorrhage — the presentation is sudden and intense:",
        "The sentinel headache, an intense pain that precedes rupture by days to weeks, occurs in 10–43% of patients and signals a higher risk. An abrupt loss of consciousness should also raise suspicion: early diagnosis is decisive.",
      ],
      bullets: [
        "Sudden, intense headache",
        "Neck stiffness",
        "Nausea and vomiting",
        "Altered consciousness",
      ],
    },
    {
      id: "diagnostico",
      tocLabel: "Diagnosis",
      heading: "Diagnosis and investigation",
      figureCaption: "Fig. 02 — Microsurgical clipping of the neck · illustration",
      figureSrc: "aneurisma-cerebral-fig02",
      paragraphs: [
        "Most unruptured aneurysms are identified incidentally on neuroimaging performed for another reason. High-risk individuals can be screened with MR angiography or CT angiography.",
        "For ruptured aneurysms, the reliable initial test is non-contrast head CT — positive in 98–100% of cases within the first 12 hours. When the CT is negative but clinical suspicion is strong, MRI sequences (FLAIR, SWI, GRE) or lumbar puncture with xanthochromia testing help confirm the bleeding.",
        "Digital subtraction angiography remains the gold standard: with 3D reconstruction it identifies small aneurysms, assesses the morphology, and the relationship with nearby perforating branches. The goal of diagnosing early is to establish appropriate treatment as quickly as possible, preventing subarachnoid hemorrhage and its consequences.",
      ],
    },
    {
      id: "tratamento",
      tocLabel: "Treatment",
      heading: "Management and treatment",
      paragraphs: [
        "The decision is always multifactorial — clinical history, sex, comorbidities, imaging studies, size, location and anatomy of the vessel, family history, and genetic conditions. There are two main therapeutic pathways:",
      ],
      options: [
        {
          title: "Microsurgery (clipping)",
          description:
            "Placement of one or more titanium clips on the neck of the aneurysm through a craniotomy, excluding it from the circulation without compromising the neighboring vessels. Performed with a microscope, intraoperative indocyanine angiography, and continuous neurophysiological monitoring. In complex cases, bypass techniques (EC-IC or IC-IC) are used for revascularization.",
        },
        {
          title: "Endovascular treatment",
          description:
            "A non-surgical approach through intra-arterial microcatheters guided by fluoroscopy, using coils or flow-diverting devices. It can be used alone or in combination with microsurgery.",
        },
      ],
    },
    {
      id: "recuperacao",
      tocLabel: "Recovery",
      heading: "Recovery and follow-up",
      paragraphs: [
        "After subarachnoid hemorrhage, vasospasm is a common complication (up to 40–70% of cases), peaking between the 7th and 10th day and usually resolving within 21 days. Management includes nimodipine, maintenance of euvolemia, and monitoring with transcranial Doppler.",
        "Other possible complications include hydrocephalus, seizures, arrhythmias, and hydroelectrolytic disturbances. Follow-up with serial imaging is essential to confirm the complete exclusion of the aneurysm and to monitor the circulation over time.",
      ],
    },
  ],
};
