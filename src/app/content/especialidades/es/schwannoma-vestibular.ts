import type { ArticleContent } from "../types";

// Reestruturado no molde rico, reorganizando o conteúdo original sem novas
// afirmações médicas.
export const article: ArticleContent = {
  slug: "schwannoma-vestibular",
  category: "Tumoral",
  readingTime: "7 min",
  lead: "Tumor benigno del nervio vestibulococlear, con pérdida auditiva progresiva, tratado por microcirugía u observación.",
  heroMeta: [
    { label: "Abordaje", value: "Microcirugía u observación" },
    { label: "Incidencia", value: "6–8% de los tumores intracraneales" },
    { label: "Seguimiento", value: "RM seriada" },
  ],
  sections: [
    {
      id: "o-que-e",
      tocLabel: "Qué es",
      heading: "Un tumor benigno del nervio vestibulococlear.",
      emphasis: "nervio vestibulococlear",
      figureCaption: "Fig. 01 — Schwannoma en el ángulo pontocerebeloso · ilustración",
      figureSrc: "schwannoma-vestibular-fig01",
      paragraphs: [
        "El schwannoma vestibular (SV), también llamado neuroma acústico, es un tumor benigno derivado de las células de Schwann con origen en el nervio vestibulococlear. Representa el 80–85% de los tumores que se originan en el ángulo pontocerebeloso. A pesar de ser benigno, por el efecto de masa puede comprometer varias estructuras intracraneales.",
        "La mayoría crece a partir del nervio vestibular inferior, raramente del superior o de la porción coclear. La histología es característica, con áreas Antoni A densamente celulares alternadas con áreas Antoni B microquísticas.",
        "Representa cerca del 6–8% de todos los tumores intracraneales y el 80% de los tumores del ángulo pontocerebeloso. Es esporádico en el 90% de los casos, unilateral y sin predominancia de lado; el resto ocurre en la neurofibromatosis tipo 2. La exposición a la radiación ionizante en altas dosis es un factor de riesgo reconocido.",
      ],
    },
    {
      id: "sintomas",
      tocLabel: "Síntomas",
      heading: "Signos de alerta",
      paragraphs: [
        "La mayoría de los pacientes presenta pérdida auditiva neurosensorial unilateral (94%) y acúfenos (83%). Los síntomas vestibulares varían y suelen estar subnotificados. Los tumores grandes pueden causar neuropatía trigeminal y facial, compresión del tronco cerebral e hidrocefalia:",
      ],
      bullets: [
        "Pérdida auditiva unilateral",
        "Acúfenos",
        "Vértigo e inestabilidad",
        "Neuropatía facial o trigeminal",
      ],
    },
    {
      id: "diagnostico",
      tocLabel: "Diagnóstico",
      heading: "Diagnóstico y clasificación",
      figureCaption: "Fig. 02 — Resección con preservación del nervio facial · ilustración",
      figureSrc: "schwannoma-vestibular-fig02",
      paragraphs: [
        "La resonancia magnética es el método de elección — la secuencia T1 con contraste es el patrón de oro para la evaluación inicial y posoperatoria. La tomografía complementa, aportando la anatomía ósea de la base del cráneo.",
        "El tumor aparece como una masa sólida con componente intracanalicular en el meato acústico interno, que suele ensancharse. Es isointenso en T1, con fuerte realce tras gadolinio, y heterogéneamente hiperintenso en T2; las calcificaciones están típicamente ausentes.",
        "Los sistemas de graduación más usados son el de Koos (grados I a IV, del tumor puramente intrameatal al que desplaza el tronco cerebral) y el de Hannover, que detalla la extensión a la cisterna pontocerebelosa y la compresión del tronco.",
      ],
    },
    {
      id: "tratamento",
      tocLabel: "Tratamiento",
      heading: "Conducta y abordajes",
      paragraphs: [
        "El manejo considera el tamaño y la morfología del tumor, los síntomas y las comorbilidades. En tumores grandes (Koos IV), la cirugía es el tratamiento primario; el objetivo es la resección total o casi total, ya que el volumen residual se correlaciona con la recurrencia. Las vías de acceso incluyen:",
      ],
      options: [
        {
          title: "Abordaje retrosigmoideo",
          description:
            "Indicado para tumores en la cisterna pontocerebelosa o con efecto de masa significativo. Permite tumores de diversos tamaños, ofrece la posibilidad de preservación auditiva y excelente visualización del tronco encefálico y de los nervios craneales.",
        },
        {
          title: "Abordaje translaberíntico",
          description:
            "Útil para tumores de cualquier tamaño. La laberintectomía lleva a la pérdida completa de la audición de ese lado, pero ofrece un acceso amplio y visualización superior de todo el nervio facial, sin retracción cerebral.",
        },
        {
          title: "Abordaje de la fosa media",
          description:
            "Acceso lateral al canal acústico interno por craneotomía temporal, mejor para pequeños tumores intracanaliculares cuando la preservación de la audición es un objetivo.",
        },
        {
          title: "Observación",
          description:
            "Ofrecida a pacientes seleccionados — de edad avanzada, con tumor muy pequeño y asintomático — con RM seriada cada 6 a 12 meses, dado el crecimiento lento de la mayoría de estos tumores.",
        },
      ],
    },
  ],
};
