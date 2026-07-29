import type { ArticleContent } from "../types";

// Reestruturado no molde do Design System v3 (O que é / Sintomas / Diagnóstico /
// Tratamento / Recuperação). Todo o texto clínico vem do conteúdo migrado do
// site original — apenas reorganizado e condensado, sem novas afirmações médicas.
export const article: ArticleContent = {
  slug: "aneurisma-cerebral",
  category: "Vascular",
  readingTime: "6 min",
  lead: "Dilataciones en las paredes de las arterias cerebrales que exigen un diagnóstico preciso y un tratamiento microquirúrgico o endovascular individualizado.",
  heroMeta: [
    { label: "Abordaje", value: "Micro o endovascular" },
    { label: "Pico de incidencia", value: "35–60 años" },
    { label: "Seguimiento", value: "Imagen seriada" },
  ],
  quote: {
    text: "El diagnóstico precoz cambia por completo el pronóstico. Cada minuto importa.",
    emphasis: "Cada minuto importa",
    afterSectionId: "sintomas",
  },
  sections: [
    {
      id: "o-que-e",
      tocLabel: "Qué es",
      heading: "Una dilatación en la pared de una arteria cerebral.",
      emphasis: "arteria cerebral",
      figureCaption: "Fig. 01 — Representación angiográfica",
      paragraphs: [
        "Los aneurismas cerebrales representan una dilatación anormal en la pared arterial de los vasos cerebrales, generalmente cerca de un punto de bifurcación, donde existe una anormalidad estructural de la pared. Cerca del 90% son saculares; los demás incluyen fusiformes, traumáticos, micóticos, disecantes y microaneurismas.",
        "Varían en tamaño — pequeños (< 10 mm), grandes (11–25 mm) y gigantes (> 25 mm). Aproximadamente el 85% se localizan en la circulación anterior del Polígono de Willis, donde las circulaciones anterior y posterior se anastomosan.",
        "Varios factores aumentan el riesgo de desarrollo, crecimiento y ruptura: tabaquismo, abuso de alcohol, sexo femenino, hipertensión no controlada y aterosclerosis. La contribución genética es relevante y las síndromes hereditarias deben considerarse cuando hay más de un familiar con aneurismas intracraneales.",
        "Son más prevalentes entre los 35 y los 60 años, con una proporción de 1:2 entre hombres y mujeres. Cerca del 10–30% de los pacientes pueden presentar múltiples aneurismas.",
      ],
    },
    {
      id: "sintomas",
      tocLabel: "Síntomas",
      heading: "Señales de alerta",
      paragraphs: [
        "Los aneurismas íntegros suelen ser silenciosos y, con frecuencia, son hallazgos incidentales durante la investigación de otra condición. Cuando hay ruptura — la hemorragia subaracnoidea — el cuadro es súbito e intenso:",
        "La cefalea centinela, dolor intenso que precede a la ruptura en días o semanas, ocurre en el 10–43% de los pacientes y señala un riesgo mayor. La pérdida abrupta de conciencia también debe levantar la sospecha: el diagnóstico precoz es decisivo.",
      ],
      bullets: [
        "Cefalea súbita e intensa",
        "Rigidez de nuca",
        "Náuseas y vómitos",
        "Alteración de la conciencia",
      ],
    },
    {
      id: "diagnostico",
      tocLabel: "Diagnóstico",
      heading: "Diagnóstico e investigación",
      figureCaption: "Fig. 02 — Angiografía digital por sustracción",
      paragraphs: [
        "La mayoría de los aneurismas no rotos se identifican de forma incidental en una neuroimagen realizada por otra razón. Los individuos de alto riesgo pueden ser cribados con angiorresonancia o angiotomografía.",
        "Para los aneurismas rotos, el examen inicial confiable es la tomografía de cráneo sin contraste — positiva en el 98–100% de los casos en las primeras 12 horas. Cuando la TC es negativa pero la sospecha clínica es fuerte, las secuencias de resonancia (FLAIR, SWI, GRE) o la punción lumbar con búsqueda de xantocromía ayudan a confirmar el sangrado.",
        "La angiografía digital por sustracción sigue siendo el patrón de oro: con reconstrucción 3D identifica aneurismas pequeños, evalúa la morfología y la relación con ramas perforantes cercanas. El objetivo de diagnosticar temprano es establecer el tratamiento adecuado lo más rápido posible, evitando la hemorragia subaracnoidea y sus consecuencias.",
      ],
    },
    {
      id: "tratamento",
      tocLabel: "Tratamiento",
      heading: "Conducta y tratamiento",
      paragraphs: [
        "La decisión es siempre multifactorial — historia clínica, sexo, comorbilidades, exámenes de imagen, tamaño, localización y anatomía del vaso, historia familiar y condiciones genéticas. Existen dos vías terapéuticas principales:",
      ],
      options: [
        {
          title: "Microcirugía (clipaje)",
          description:
            "Colocación de uno o más clips de titanio en el cuello del aneurisma mediante craneotomía, excluyéndolo de la circulación sin comprometer los vasos vecinos. Se realiza con microscopio, angiografía intraoperatoria con indocianina y monitorización neurofisiológica continua. En casos complejos, las técnicas de bypass (EC-IC o IC-IC) se utilizan para la revascularización.",
        },
        {
          title: "Tratamiento endovascular",
          description:
            "Abordaje no quirúrgico mediante microcatéteres intraarteriales guiados por fluoroscopia, con coils o dispositivos de desvío de flujo. Puede usarse de forma aislada o en conjunto con la microcirugía.",
        },
      ],
    },
    {
      id: "recuperacao",
      tocLabel: "Recuperación",
      heading: "Recuperación y seguimiento",
      paragraphs: [
        "Tras la hemorragia subaracnoidea, el vasoespasmo es una complicación común (hasta el 40–70% de los casos), con pico entre el 7.º y el 10.º día y resolución habitual en 21 días. El manejo incluye nimodipina, mantenimiento de la euvolemia y monitorización con Doppler transcraneal.",
        "Otras complicaciones posibles incluyen hidrocefalia, convulsiones, arritmias y trastornos hidroelectrolíticos. El seguimiento con imagen seriada es esencial para confirmar la exclusión completa del aneurisma y vigilar la circulación a lo largo del tiempo.",
      ],
    },
  ],
};
