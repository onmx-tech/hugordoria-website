import type { ArticleContent } from "../types";

// Tradução ES da página nova (17/08/2026). Era a única das 11 especialidades sem
// artigo — o site original nunca teve texto próprio para ela, só o nome na lista
// de tratamentos.
//
// Base do texto (versão PT), em ordem de precedência:
//   1. O material clínico do próprio site original (a descrição de bypass EC-IC /
//      IC-IC, baixo e alto fluxo, que vivia dentro da página de aneurisma) e a
//      página de moyamoya já publicada — para não contradizer o que já está no ar;
//   2. Literatura consultada com fonte rastreável (ESO Moyamoya 2023, CMOSS/JAMA
//      2023, JAM Trial, EC/IC Bypass Study, COSS, revisões de revascularização
//      indireta) para o que o material do cliente não cobria.
//
// Regras que moldaram a redação, todas do CFM 2.336/2023, e que a tradução
// preserva sem acrescentar nada:
//   · Art. 11, XII — nada que garanta, prometa ou INSINUE bom resultado. Por isso
//     não há taxa de sucesso, percentual de risco nem promessa de cura.
//   · Art. 11, IX — nada que atribua capacidade privilegiada. Por isso a página não
//     repete o "neurocirujano experimentado" que já existe na de moyamoya.
//   · Números de duração de cirurgia e de internação ficaram propositalmente
//     abertos ("pocos días"): as fontes divergem entre si e nenhuma reflete a
//     prática deste serviço. Só o Dr. Hugo pode fechá-los.
//
// ⚠️ PENDENTE DE VALIDAÇÃO MÉDICA antes de publicar — em especial o parágrafo sobre
// aterosclerose (posição majoritária da literatura, mas é onde um colega pode
// divergir) e a frase sobre moyamoya sem sintomas.
export const article: ArticleContent = {
  slug: "revascularizacao-cerebral",
  category: "Vascular",
  readingTime: "6 min",
  lead: "Cirugía que crea un nuevo camino para que la sangre llegue a una parte del cerebro que está recibiendo poca — o que repone el flujo de una arteria que fue necesario sacrificar.",
  heroMeta: [
    { label: "Abordaje", value: "Microcirugía vascular" },
    { label: "Técnica más común", value: "Bypass STA-MCA" },
    { label: "Objetivo", value: "Restablecer el flujo" },
  ],
  quote: {
    text: "El mismo procedimiento atiende a dos objetivos opuestos: añadir sangre donde falta, o reponer la sangre de una arteria que tuvo que salir del camino.",
    emphasis: "dos objetivos opuestos",
    afterSectionId: "quando-indicada",
  },
  sections: [
    {
      id: "o-que-e",
      tocLabel: "Qué es",
      heading: "Un nuevo camino para que la sangre llegue al cerebro.",
      emphasis: "nuevo camino",
      figureCaption:
        "Fig. 01 — Arteria cerebral con estrechamiento y ramas distales mal irrigadas · ilustración",
      figureSrc: "revascularizacao-cerebral-fig01",
      paragraphs: [
        "La revascularización cerebral es el equivalente, en el cerebro, del bypass coronario: una arteria sana se conecta a un vaso del interior del cráneo, desviando el flujo alrededor del tramo obstruido o enfermo. La sangre vuelve a llegar por un camino nuevo.",
        "La técnica más común es el bypass entre la arteria temporal superficial — la que se siente latir en la sien, y que normalmente irriga el cuero cabelludo — y una rama de la arteria cerebral media, en la superficie del cerebro. La conexión entre ambas se realiza bajo microscopio, con un hilo más fino que un cabello.",
        "Existen dos razones distintas para operar, y vale la pena entender la diferencia porque ella organiza todo lo demás: en algunos casos el objetivo es añadir flujo a una región que vive con poca sangre; en otros, es reponer el flujo de una arteria que será necesario cerrar para tratar un aneurisma o extirpar un tumor. El procedimiento es el mismo; el motivo, opuesto.",
      ],
    },
    {
      id: "quando-indicada",
      tocLabel: "Cuándo se indica",
      heading: "Situaciones en que crear un nuevo camino cambia el escenario",
      paragraphs: [
        "La indicación es siempre individual y depende de lo que los exámenes muestren sobre la circulación de ese paciente. Las situaciones más frecuentes son:",
      ],
      bullets: [
        "Enfermedad de Moyamoya, en la que las arterias se estrechan progresivamente — es la condición con mejor respaldo para la cirugía, tanto en la forma isquémica como en la hemorrágica",
        "Aneurismas complejos — gigantes, fusiformes o ya tratados antes — en los que la arteria de origen debe cerrarse, y el bypass repone la sangre del territorio que dependía de ella",
        "Tumores de la base del cráneo que envuelven la arteria carótida, cuando la extirpación completa exige sacrificar el vaso",
        "Casos seleccionados de obstrucción arterial en los que el cerebro ya agotó su propia capacidad de compensar",
      ],
    },
    {
      id: "aterosclerose",
      tocLabel: "Aclaración",
      heading: "No toda obstrucción arterial se resuelve con cirugía.",
      emphasis: "No toda obstrucción",
      paragraphs: [
        "Vale decirlo con claridad, porque es una duda común de quien llega al consultorio después de un ACV: la revascularización no es tratamiento de rutina para el ACV isquémico causado por aterosclerosis — la obstrucción gradual de las arterias por placas de grasa.",
        "Grandes estudios internacionales compararon la cirugía con el tratamiento clínico en ese grupo y no encontraron una ventaja consistente. El bypass funcionaba — la sangre pasaba a llegar —, pero la ganancia a lo largo de los años terminaba neutralizada por el riesgo del propio posoperatorio.",
        "Por eso, en ese escenario la indicación es de excepción: pacientes muy seleccionados, que siguen presentando síntomas a pesar del mejor tratamiento clínico y cuyos exámenes de perfusión muestran agotamiento de la reserva de flujo. Es un tema todavía en investigación, y la conducta se decide caso a caso.",
      ],
    },
    {
      id: "tecnicas",
      tocLabel: "Técnicas",
      heading: "Directa, indirecta o combinada",
      figureCaption:
        "Fig. 02 — Anastomosis entre la arteria donante y una rama cortical · ilustración",
      figureSrc: "revascularizacao-cerebral-fig02",
      paragraphs: [
        "La elección depende de la edad, del calibre de los vasos disponibles y de cuánto flujo debe reponerse:",
      ],
      options: [
        {
          title: "Revascularización directa (bypass)",
          description:
            "La arteria donante se sutura directamente a una rama en la superficie del cerebro. El flujo aumenta de inmediato, aún durante la cirugía. Es la técnica preferida en el adulto, cuando existe un vaso receptor de calibre adecuado.",
        },
        {
          title: "Revascularización indirecta",
          description:
            "Tejido bien vascularizado — la arteria del cuero cabelludo, el músculo temporal, la duramadre — se apoya sobre la superficie del cerebro, que a lo largo de meses desarrolla sus propios vasos nuevos en dirección a él. Incluye técnicas como EDAS, EMS y EMAS. Es frecuente en el niño, cuyas arterias corticales suelen ser demasiado finas para la sutura directa.",
        },
        {
          title: "Combinada",
          description:
            "Directa e indirecta en el mismo tiempo quirúrgico: el flujo inmediato de la primera sumado al crecimiento gradual de la segunda. Se ha sugerido siempre que es técnicamente posible, incluso en niños.",
        },
        {
          title: "Bypass de alto flujo",
          description:
            "Cuando es necesario reponer la sangre de un tronco arterial grande, un segmento de arteria radial o de vena safena del propio paciente se usa como puente entre una arteria del cuello y una arteria intracraneal. Es la situación típica de los aneurismas gigantes y de los tumores que envuelven la carótida.",
        },
      ],
    },
    {
      id: "avaliacao",
      tocLabel: "Evaluación",
      heading: "Cómo se decide, antes de operar",
      paragraphs: [
        "La cirugía solo tiene sentido después de responder a dos preguntas: cuánta sangre está llegando realmente a esa región, y si todavía existe reserva. Cada examen responde a una parte:",
      ],
      bullets: [
        "Angiografía digital — muestra dónde está la obstrucción, por dónde llega la sangre hoy y si existen vasos donante y receptor adecuados",
        "Perfusión por tomografía o resonancia — mide cuánta sangre llega y con cuánto retraso",
        "SPECT o PET con acetazolamida — verifica si el cerebro aún consigue aumentar el flujo cuando se lo estimula, o si los vasos ya están dilatados al máximo",
        "Test de oclusión con balón — responde si el paciente tolera perder esa arteria, cuando el tratamiento exige cerrarla",
      ],
    },
    {
      id: "recuperacao",
      tocLabel: "Recuperación",
      heading: "Qué esperar después",
      paragraphs: [
        "Las primeras horas se acompañan en unidad de cuidados intensivos, con control riguroso de la presión arterial y de la hidratación — el cerebro recién revascularizado es sensible tanto a la falta como al exceso de flujo. La hospitalización suele durar pocos días, y la reanudación de las actividades es gradual.",
        "El tiempo hasta el resultado depende de la técnica: en el bypass directo el flujo aumenta durante la propia cirugía; en la revascularización indirecta los vasos nuevos se forman a lo largo de meses, con la mayor parte del crecimiento en los primeros seis y continuidad hasta cerca de un año. El seguimiento se hace con exámenes de imagen en intervalos definidos caso a caso.",
        "Como toda neurocirugía, el procedimiento tiene riesgos, discutidos individualmente antes de la decisión. Los principales son el ACV en el período próximo a la cirugía, el síndrome de hiperperfusión cerebral — cuando la región pasa a recibir más sangre de la que estaba habituada, en los primeros días — y la posibilidad de que el bypass no se mantenga abierto.",
        "Un punto que merece franqueza: la revascularización trata la consecuencia, que es la falta de flujo, no la causa del estrechamiento. En la enfermedad de Moyamoya, por ejemplo, la enfermedad de base sigue su curso, y el seguimiento continúa después de la cirugía.",
      ],
    },
  ],
};
