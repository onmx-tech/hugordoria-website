import type { ArticleContent } from "../types";

// Versão em inglês da página nova (17/08/2026). Tradução do arquivo PT de mesmo
// nome — sem novas afirmações médicas, sem "melhorar" o original.
//
// Base do texto PT, em ordem de precedência:
//   1. O material clínico do próprio site original (a descrição de bypass EC-IC /
//      IC-IC, baixo e alto fluxo, que vivia dentro da página de aneurisma) e a
//      página de moyamoya já publicada — para não contradizer o que já está no ar;
//   2. Literatura consultada com fonte rastreável (ESO Moyamoya 2023, CMOSS/JAMA
//      2023, JAM Trial, EC/IC Bypass Study, COSS, revisões de revascularização
//      indireta) para o que o material do cliente não cobria.
//
// Regras que moldaram a redação, todas do CFM 2.336/2023:
//   · Art. 11, XII — nada que garanta, prometa ou INSINUE bom resultado. Por isso
//     não há taxa de sucesso, percentual de risco nem promessa de cura.
//   · Art. 11, IX — nada que atribua capacidade privilegiada. Por isso a página não
//     repete o "neurocirurgião experiente" que já existe na de moyamoya.
//   · Números de duração de cirurgia e de internação ficaram propositalmente
//     abertos ("a few days"): as fontes divergem entre si e nenhuma reflete a
//     prática deste serviço. Só o Dr. Hugo pode fechá-los.
//
// ⚠️ PENDENTE DE VALIDAÇÃO MÉDICA antes de publicar — em especial o parágrafo sobre
// aterosclerose (posição majoritária da literatura, mas é onde um colega pode
// divergir) e a frase sobre moyamoya sem sintomas.
export const article: ArticleContent = {
  slug: "revascularizacao-cerebral",
  category: "Vascular",
  readingTime: "6 min read",
  lead: "Surgery that creates a new path for blood to reach a part of the brain that is receiving too little — or that restores the flow of an artery that had to be sacrificed.",
  heroMeta: [
    { label: "Approach", value: "Vascular microsurgery" },
    { label: "Most common technique", value: "STA-MCA bypass" },
    { label: "Goal", value: "Restore blood flow" },
  ],
  quote: {
    text: "The same procedure serves two opposite goals: adding blood where it is missing, or replacing the blood of an artery that had to be taken out of the way.",
    emphasis: "two opposite goals",
    afterSectionId: "quando-indicada",
  },
  sections: [
    {
      id: "o-que-e",
      tocLabel: "What it is",
      heading: "A new path for blood to reach the brain.",
      emphasis: "new path",
      figureCaption:
        "Fig. 01 — Cerebral artery with narrowing and poorly perfused distal branches · illustration",
      figureSrc: "revascularizacao-cerebral-fig01",
      paragraphs: [
        "Cerebral revascularization is, in the brain, the equivalent of a coronary bypass graft in the heart: a healthy artery is connected to a vessel inside the skull, diverting the flow around the obstructed or diseased segment. Blood reaches the area again through a new path.",
        "The most common technique is the bypass between the superficial temporal artery — the one that can be felt pulsing at the temple, and which normally supplies the scalp — and a branch of the middle cerebral artery, on the surface of the brain. The connection between the two is made under a microscope, with suture thinner than a strand of hair.",
        "There are two distinct reasons to operate, and it is worth understanding the difference because it organizes everything else: in some cases the goal is to add flow to a region that lives with too little blood; in others, it is to replace the flow of an artery that will have to be closed in order to treat an aneurysm or remove a tumor. The procedure is the same; the reason, opposite.",
      ],
    },
    {
      id: "quando-indicada",
      tocLabel: "When it is indicated",
      heading: "Situations in which creating a new path changes the picture",
      paragraphs: [
        "The indication is always individual and depends on what the imaging studies show about that patient's circulation. The most frequent situations are:",
      ],
      bullets: [
        "Moyamoya disease, in which the arteries narrow progressively — it is the condition with the strongest support for surgery, in both the ischemic and the hemorrhagic form",
        "Complex aneurysms — giant, fusiform, or previously treated — in which the parent artery has to be closed, and the bypass replaces the blood of the territory that depended on it",
        "Skull base tumors involving the carotid artery, when complete removal requires sacrificing the vessel",
        "Selected cases of arterial obstruction in which the brain has already exhausted its own capacity to compensate",
      ],
    },
    {
      id: "aterosclerose",
      tocLabel: "Clarification",
      heading: "Not every arterial obstruction is resolved with surgery.",
      emphasis: "Not every arterial obstruction",
      paragraphs: [
        "It is worth saying clearly, because it is a common question from those who come to the office after a stroke: revascularization is not a routine treatment for ischemic stroke caused by atherosclerosis — the gradual clogging of the arteries by fatty plaques.",
        "Large international studies compared surgery with medical treatment in this group and found no consistent advantage. The bypass worked — blood did start reaching the area —, but the gain over the years ended up neutralized by the risk of the postoperative period itself.",
        "For that reason, in this scenario the indication is an exception: highly selected patients who continue to have symptoms despite the best medical treatment and whose perfusion studies show exhaustion of the flow reserve. It is a subject still under investigation, and the approach is decided case by case.",
      ],
    },
    {
      id: "tecnicas",
      tocLabel: "Techniques",
      heading: "Direct, indirect, or combined",
      figureCaption:
        "Fig. 02 — Anastomosis between the donor artery and a cortical branch · illustration",
      figureSrc: "revascularizacao-cerebral-fig02",
      paragraphs: [
        "The choice depends on age, on the caliber of the available vessels, and on how much flow needs to be replaced:",
      ],
      options: [
        {
          title: "Direct revascularization (bypass)",
          description:
            "The donor artery is sutured directly to a branch on the surface of the brain. Flow increases immediately, still during the surgery. It is the preferred technique in adults, when a recipient vessel of adequate caliber is available.",
        },
        {
          title: "Indirect revascularization",
          description:
            "Well-vascularized tissue — the scalp artery, the temporal muscle, the dura mater — is placed over the surface of the brain, which over months develops its own new vessels toward it. It includes techniques such as EDAS, EMS, and EMAS. It is frequent in children, whose cortical arteries are usually too thin for direct suturing.",
        },
        {
          title: "Combined",
          description:
            "Direct and indirect in the same operation: the immediate flow of the former added to the gradual growth of the latter. It has been suggested whenever it is technically possible, including in children.",
        },
        {
          title: "High-flow bypass",
          description:
            "When the blood of a large arterial trunk needs to be replaced, a segment of the patient's own radial artery or saphenous vein is used as a graft between an artery in the neck and an intracranial artery. This is the typical situation of giant aneurysms and of tumors involving the carotid artery.",
        },
      ],
    },
    {
      id: "avaliacao",
      tocLabel: "Assessment",
      heading: "How the decision is made, before surgery",
      paragraphs: [
        "Surgery only makes sense after answering two questions: how much blood is actually reaching that region, and whether there is still reserve. Each study answers one part:",
      ],
      bullets: [
        "Digital angiography — shows where the obstruction is, through which route blood is arriving today, and whether adequate donor and recipient vessels exist",
        "CT or MR perfusion — measures how much blood arrives and with how much delay",
        "SPECT or PET with acetazolamide — checks whether the brain can still increase flow when stimulated, or whether the vessels are already maximally dilated",
        "Balloon test occlusion — answers whether the patient tolerates losing that artery, when the treatment requires closing it",
      ],
    },
    {
      id: "recuperacao",
      tocLabel: "Recovery",
      heading: "What to expect afterward",
      paragraphs: [
        "The first hours are monitored in an intensive care unit, with strict control of blood pressure and hydration — the newly revascularized brain is sensitive both to a lack and to an excess of flow. The hospital stay usually lasts a few days, and the return to activities is gradual.",
        "The time until the result depends on the technique: in the direct bypass, flow increases during the surgery itself; in indirect revascularization, the new vessels form over months, with most of the growth in the first six and continuing until about one year. Follow-up is done with imaging studies at intervals defined case by case.",
        "As with any neurosurgery, the procedure carries risks, discussed individually before the decision. The main ones are stroke in the period around the surgery, cerebral hyperperfusion syndrome — when the region starts receiving more blood than it was used to, in the first days — and the possibility that the bypass does not remain open.",
        "One point deserves frankness: revascularization treats the consequence, which is the lack of flow, not the cause of the narrowing. In moyamoya disease, for example, the underlying disease follows its course, and follow-up continues after the surgery.",
      ],
    },
  ],
};
