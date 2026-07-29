import type { ArticleContent } from "../types";

// Reestruturado no molde rico (O que é / Sintomas / Diagnóstico / Tratamento).
// Texto reorganizado do conteúdo original, sem novas afirmações médicas.
export const article: ArticleContent = {
  slug: "mavs",
  category: "Vascular",
  readingTime: "6 min",
  lead: "Conexiones anormales entre arterias y venas cerebrales que exigen una resección microquirúrgica de alta precisión.",
  heroMeta: [
    { label: "Abordaje", value: "Microcirugía multidisciplinaria" },
    { label: "Riesgo anual de hemorragia", value: "2–4%" },
    { label: "Localización", value: "90% supratentorial" },
  ],
  quote: {
    text: "La resección debe ser siempre completa.",
    afterSectionId: "tratamento",
  },
  sections: [
    {
      id: "o-que-e",
      tocLabel: "Qué es",
      heading: "Conexiones anormales entre arterias y venas cerebrales.",
      emphasis: "arterias y venas cerebrales",
      figureCaption: "Fig. 01 — Nidus arteriovenoso",
      paragraphs: [
        "Las malformaciones arteriovenosas (MAV) son shunts directos entre arterias y venas cerebrales displásicas, en las que un nidus de vasos anormales, de paredes finas y frágiles, está interpuesto sin parénquima dentro de él. Se considera que tienen origen congénito, pudiendo cambiar su comportamiento hemodinámico a lo largo de la vida del paciente.",
        "Pueden localizarse en cualquier parte del sistema nervioso central, siendo más comunes en los hemisferios cerebrales y, en orden decreciente, cerebelo, núcleos cerebrales, tronco encefálico y médula espinal. La morfología es bastante variable, de pocos milímetros a más de seis centímetros.",
        "Son raras — cerca del 0,1% de la población, un décimo de la incidencia de los aneurismas cerebrales. Aproximadamente el 90% se encuentran en la región supratentorial y cerca del 15% permanecen asintomáticas durante toda la vida. No tienen preferencia de género.",
      ],
    },
    {
      id: "sintomas",
      tocLabel: "Síntomas",
      heading: "Cómo se manifiestan las MAV",
      paragraphs: [
        "La presentación depende de la edad del paciente, del tamaño, de la localización y de las características vasculares de la MAV. La hemorragia es la manifestación más común:",
        "Las MAV no rotas tienen un riesgo anual de hemorragia del 2% al 4%, mayor en las ya rotas — especialmente en el primer año tras la ruptura. El drenaje venoso profundo, la localización cerebral profunda y el nidus de pequeño tamaño aumentan el riesgo de ruptura. El déficit neurológico suele derivar del “robo de flujo” provocado por la malformación.",
      ],
      bullets: [
        "Hemorragia cerebral",
        "Convulsiones",
        "Déficit neurológico focal",
        "Cefalea",
      ],
    },
    {
      id: "diagnostico",
      tocLabel: "Diagnóstico",
      heading: "Diagnóstico por imagen",
      figureCaption: "Fig. 02 — Angiografía digital",
      paragraphs: [
        "Los estudios de imagen son esenciales para establecer el diagnóstico y caracterizar la lesión para la planificación. La tomografía de cráneo suele ser el primer examen, usada para descartar una hemorragia.",
        "La resonancia magnética define la localización del nidus, sus relaciones neuroanatómicas y la vena de drenaje asociada; la angio-RM caracteriza el drenaje venoso y otras características vasculares con alta precisión.",
        "La angiografía digital es el patrón de oro — un examen dinámico que revela la anatomía y la fisiología del nidus, discrimina los vasos que lo alimentan de los de paso, localiza el drenaje y demuestra aneurismas asociados, de mayor riesgo de sangrado.",
      ],
    },
    {
      id: "tratamento",
      tocLabel: "Tratamiento",
      heading: "Tratamiento multidisciplinario",
      paragraphs: [
        "El tratamiento es individualizado y multidisciplinario. La decisión considera el tamaño del nidus, el tipo de drenaje venoso (superficial o profundo) y la localización — elocuente o no (Clasificación de Spetzler-Martin):",
      ],
      options: [
        {
          title: "Resección microquirúrgica",
          description:
            "Microdisección, coagulación y corte de cada vaso aferente hasta desconectar el nidus de la circulación, preservando la vena de drenaje hasta el final. Cuenta con angiografía intraoperatoria con indocianina y monitorización neurofisiológica continua.",
        },
        {
          title: "Cirugía con paciente despierto",
          description:
            "Para MAV en áreas elocuentes (habla, córtex motor, sensitivo o visual), la craneotomía despierta con estimulación cortical directa permite evaluar las regiones adyacentes en tiempo real y obtener una resección segura, con una recuperación más rápida.",
        },
        {
          title: "Embolización endovascular",
          description:
            "En MAV de alto flujo o de localización profunda, la embolización selectiva de los vasos que irrigan el nidus se realiza antes de la cirugía, reduciendo el volumen de sangre que llega a la malformación y el tiempo de la resección.",
        },
      ],
    },
  ],
};
