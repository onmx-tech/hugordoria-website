import type { ArticleContent } from "../types";

// Página nova (17/08/2026). Era a única das 11 especialidades sem artigo — o site
// original nunca teve texto próprio para ela, só o nome na lista de tratamentos.
//
// Base do texto, em ordem de precedência:
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
//     abertos ("poucos dias"): as fontes divergem entre si e nenhuma reflete a
//     prática deste serviço. Só o Dr. Hugo pode fechá-los.
//
// ⚠️ PENDENTE DE VALIDAÇÃO MÉDICA antes de publicar — em especial o parágrafo sobre
// aterosclerose (posição majoritária da literatura, mas é onde um colega pode
// divergir) e a frase sobre moyamoya sem sintomas.
export const article: ArticleContent = {
  slug: "revascularizacao-cerebral",
  category: "Vascular",
  readingTime: "6 min",
  lead: "Cirurgia que cria um novo caminho para o sangue chegar a uma parte do cérebro que está recebendo pouco — ou que repõe o fluxo de uma artéria que precisou ser sacrificada.",
  heroMeta: [
    { label: "Abordagem", value: "Microcirurgia vascular" },
    { label: "Técnica mais comum", value: "Bypass STA-MCA" },
    { label: "Objetivo", value: "Restabelecer o fluxo" },
  ],
  quote: {
    text: "O mesmo procedimento atende a dois objetivos opostos: acrescentar sangue onde ele falta, ou repor o sangue de uma artéria que precisou sair do caminho.",
    emphasis: "dois objetivos opostos",
    afterSectionId: "quando-indicada",
  },
  sections: [
    {
      id: "o-que-e",
      tocLabel: "O que é",
      heading: "Um novo caminho para o sangue chegar ao cérebro.",
      emphasis: "novo caminho",
      figureCaption:
        "Fig. 01 — Artéria cerebral com estreitamento e ramos distais mal irrigados · ilustração",
      figureSrc: "revascularizacao-cerebral-fig01",
      paragraphs: [
        "A revascularização cerebral é o equivalente, no cérebro, da ponte de safena do coração: uma artéria saudável é ligada a um vaso de dentro do crânio, desviando o fluxo em torno do trecho obstruído ou doente. O sangue volta a chegar por um caminho novo.",
        "A técnica mais comum é o bypass entre a artéria temporal superficial — a que se sente pulsar na têmpora, e que normalmente irriga o couro cabeludo — e um ramo da artéria cerebral média, na superfície do cérebro. A conexão entre as duas é feita sob microscópio, com fio mais fino que um fio de cabelo.",
        "Existem duas razões distintas para operar, e vale entender a diferença porque ela organiza todo o resto: em alguns casos o objetivo é acrescentar fluxo a uma região que vive com pouco sangue; em outros, é repor o fluxo de uma artéria que precisará ser fechada para tratar um aneurisma ou retirar um tumor. O procedimento é o mesmo; o motivo, oposto.",
      ],
    },
    {
      id: "quando-indicada",
      tocLabel: "Quando é indicada",
      heading: "Situações em que criar um novo caminho muda o cenário",
      paragraphs: [
        "A indicação é sempre individual e depende do que os exames mostram sobre a circulação daquele paciente. As situações mais frequentes são:",
      ],
      bullets: [
        "Doença de Moyamoya, em que as artérias se estreitam progressivamente — é a condição com o melhor respaldo para a cirurgia, tanto na forma isquêmica quanto na hemorrágica",
        "Aneurismas complexos — gigantes, fusiformes ou já tratados antes — em que a artéria de origem precisa ser fechada, e o bypass repõe o sangue do território que dependia dela",
        "Tumores da base do crânio que envolvem a artéria carótida, quando a retirada completa exige sacrificar o vaso",
        "Casos selecionados de obstrução arterial em que o cérebro já esgotou a própria capacidade de compensar",
      ],
    },
    {
      id: "aterosclerose",
      tocLabel: "Esclarecimento",
      heading: "Nem toda obstrução de artéria se resolve com cirurgia.",
      emphasis: "Nem toda obstrução",
      paragraphs: [
        "Vale dizer com clareza, porque é uma dúvida comum de quem chega ao consultório depois de um AVC: a revascularização não é tratamento de rotina para o AVC isquêmico causado por aterosclerose — o entupimento gradual das artérias por placas de gordura.",
        "Grandes estudos internacionais compararam a cirurgia ao tratamento clínico nesse grupo e não encontraram vantagem consistente. O bypass funcionava — o sangue passava a chegar —, mas o ganho ao longo dos anos acabava neutralizado pelo risco do próprio pós-operatório.",
        "Por isso, nesse cenário a indicação é de exceção: pacientes muito selecionados, que continuam apresentando sintomas apesar do melhor tratamento clínico e cujos exames de perfusão mostram esgotamento da reserva de fluxo. É um tema ainda em investigação, e a conduta se decide caso a caso.",
      ],
    },
    {
      id: "tecnicas",
      tocLabel: "Técnicas",
      heading: "Direta, indireta ou combinada",
      figureCaption:
        "Fig. 02 — Anastomose entre a artéria doadora e um ramo cortical · ilustração",
      figureSrc: "revascularizacao-cerebral-fig02",
      paragraphs: [
        "A escolha depende da idade, do calibre dos vasos disponíveis e de quanto fluxo precisa ser reposto:",
      ],
      options: [
        {
          title: "Revascularização direta (bypass)",
          description:
            "A artéria doadora é costurada diretamente a um ramo na superfície do cérebro. O fluxo aumenta na mesma hora, ainda dentro da cirurgia. É a técnica preferida no adulto, quando existe um vaso receptor de calibre adequado.",
        },
        {
          title: "Revascularização indireta",
          description:
            "Tecido bem vascularizado — a artéria do couro cabeludo, o músculo temporal, a dura-máter — é apoiado sobre a superfície do cérebro, que ao longo de meses desenvolve seus próprios vasos novos em direção a ele. Inclui técnicas como EDAS, EMS e EMAS. É frequente na criança, cujas artérias corticais costumam ser finas demais para a sutura direta.",
        },
        {
          title: "Combinada",
          description:
            "Direta e indireta no mesmo tempo cirúrgico: o fluxo imediato da primeira somado ao crescimento gradual da segunda. Tem sido sugerida sempre que é tecnicamente possível, inclusive em crianças.",
        },
        {
          title: "Bypass de alto fluxo",
          description:
            "Quando é preciso repor o sangue de um tronco arterial grande, um segmento de artéria radial ou de veia safena do próprio paciente é usado como ponte entre uma artéria do pescoço e uma artéria intracraniana. É a situação típica dos aneurismas gigantes e dos tumores que envolvem a carótida.",
        },
      ],
    },
    {
      id: "avaliacao",
      tocLabel: "Avaliação",
      heading: "Como se decide, antes de operar",
      paragraphs: [
        "A cirurgia só faz sentido depois de responder a duas perguntas: quanto sangue está realmente chegando àquela região, e se ainda existe reserva. Cada exame responde a uma parte:",
      ],
      bullets: [
        "Angiografia digital — mostra onde está a obstrução, por onde o sangue está chegando hoje e se existem vasos doador e receptor adequados",
        "Perfusão por tomografia ou ressonância — mede quanto sangue chega e com quanto atraso",
        "SPECT ou PET com acetazolamida — verifica se o cérebro ainda consegue aumentar o fluxo quando estimulado, ou se os vasos já estão dilatados ao máximo",
        "Teste de oclusão por balão — responde se o paciente tolera perder aquela artéria, quando o tratamento exige fechá-la",
      ],
    },
    {
      id: "recuperacao",
      tocLabel: "Recuperação",
      heading: "O que esperar depois",
      paragraphs: [
        "As primeiras horas são acompanhadas em unidade de terapia intensiva, com controle rigoroso da pressão arterial e da hidratação — o cérebro recém-revascularizado é sensível tanto à falta quanto ao excesso de fluxo. A internação costuma durar poucos dias, e a retomada das atividades é gradual.",
        "O tempo até o resultado depende da técnica: no bypass direto o fluxo aumenta durante a própria cirurgia; na revascularização indireta os vasos novos se formam ao longo de meses, com a maior parte do crescimento nos primeiros seis e continuidade até cerca de um ano. O acompanhamento é feito por exames de imagem em intervalos definidos caso a caso.",
        "Como toda neurocirurgia, o procedimento tem riscos, discutidos individualmente antes da decisão. Os principais são o AVC no período próximo à cirurgia, a síndrome de hiperperfusão — quando a região passa a receber mais sangue do que estava habituada, nos primeiros dias — e a possibilidade de o bypass não se manter aberto.",
        "Um ponto que merece franqueza: a revascularização trata a consequência, que é a falta de fluxo, não a causa do estreitamento. Na doença de Moyamoya, por exemplo, a doença de base segue seu curso, e o acompanhamento continua depois da cirurgia.",
      ],
    },
  ],
};
