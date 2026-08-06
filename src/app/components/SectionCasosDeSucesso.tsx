import { useEffect, useRef, useState } from "react";
import { LocaleLink } from "../i18n/LocaleProvider";
import { useTranslation } from "react-i18next";
import svgPaths from "../../imports/svg-nx92b0rij3";
import { gsap } from "../../lib/gsap";
import { isPrerender } from "../../lib/prerender";

// ⚠️ COMPLIANCE — ler antes de mexer aqui.
// Excertos de avaliações públicas de pacientes (Doctoralia). Três regras
// governam este bloco, e todas nasceram de norma, não de gosto:
//
// 1. ANONIMATO (CFM 2.336/2023, Art. 14, II, "i", 3). A identificação do
//    paciente é vedada MESMO COM AUTORIZAÇÃO dele. Por isso a atribuição é
//    primeiro nome + inicial. Não repor nome completo.
// 2. SEM DIAGNÓSTICO ATRELADO A PESSOA. Antes cada card dizia "Paciente —
//    Cirurgia de Aneurisma", "— Meningioma". Nome de gente somado a doença é
//    dado pessoal SENSÍVEL (LGPD, Art. 5º, II) publicado abertamente, e a
//    exposição é do paciente, não nossa. Todos usam o papel genérico.
// 3. SEM AFIRMAÇÃO DE DESFECHO NEM SUPERLATIVO (Art. 11, XII e Art. 14, II,
//    "g"). Saíram as falas que afirmavam cura, salvamento, eficácia do
//    tratamento ou expertise de nível internacional. (Os trechos não são
//    citados aqui de propósito: comentário que reproduz a string removida
//    dispara em toda varredura de compliance futura.) A norma veda
//    garantir, prometer ou INSINUAR resultado, e
//    o depoimento tem de ser sóbrio. O que ficou fala de conduta, acolhimento
//    e comunicação, que é o que o paciente de fato tem a dizer sem prometer
//    nada a quem lê.
//
// Também vale o Art. 8º, §4º: elogio reiterado e sistemático vai para a
// Codame. Manter o conjunto curto é parte da proteção — não voltar a encher.
// A lista completa e a triagem caso a caso estão em docs/triagem-depoimentos.json.
type Testimonial = { quote: string; name: string; roleKey: string; photo?: string | null };
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Com muita competência, atenção e sensibilidade, conduziu todo o processo sempre me transmitindo segurança, calma e confiança desde o primeiro contato.",
    name: "Rita N.",
    roleKey: "home.casos.roles.paciente",
  },
  {
    quote:
      "Não há palavras que possam expressar minha gratidão. É evidente a capacidade dele como profissional, mas é a forma como trata os pacientes, com respeito e dedicação, que faz a diferença.",
    name: "Marjouri G.",
    roleKey: "home.casos.roles.paciente",
  },
  {
    quote:
      "Dr. Hugo demonstra muito domínio técnico e conhecimento científico em sua área de atuação; mas possui um diferencial: respeitar os momentos humanos que passamos como pacientes de cirurgias tão delicadas.",
    name: "Rebecca S.",
    roleKey: "home.casos.roles.paciente",
  },
  {
    quote:
      "Desde a primeira consulta me passou total confiança. Foi muito atencioso e prestativo, e explicou cada etapa até eu entender.",
    name: "Marli V.",
    roleKey: "home.casos.roles.paciente",
  },
  {
    quote:
      "Na minha primeira consulta fui muito bem recebida, com muita atenção e carinho. Me senti segura e confiante para seguir com o tratamento.",
    name: "Ana R.",
    roleKey: "home.casos.roles.paciente",
  },
  {
    quote:
      "Muito atencioso antes, durante e depois do procedimento. A equipe esteve disponível sempre que precisei tirar uma dúvida.",
    name: "Renato S.",
    roleKey: "home.casos.roles.paciente",
  },
  {
    quote:
      "Agradeço pelo acolhimento antes da minha cirurgia. O senhor me passou muita tranquilidade.",
    name: "Jader X.",
    roleKey: "home.casos.roles.paciente",
  },
  {
    quote:
      "Há 14 anos o senhor realizou uma cirurgia na minha coluna. Sou muito grata.",
    name: "Sandra M.",
    roleKey: "home.casos.roles.paciente",
  },
  {
    quote: "Sempre alegre nos recebendo quando saíamos da sala de cirurgia.",
    name: "Adriana T.",
    roleKey: "home.casos.roles.paciente",
  },
  {
    quote:
      "Parabéns, Dr. Hugo, por toda a sua dedicação e empenho com os pacientes.",
    name: "Selma S.",
    roleKey: "home.casos.roles.paciente",
  },
  {
    quote: "É merecedor de todo reconhecimento. Gratidão, de sua paciente.",
    name: "Andressa A.",
    roleKey: "home.casos.roles.paciente",
  },
  {
    quote: "Um orgulho ter você como meu médico.",
    name: "Greicy D.",
    roleKey: "home.casos.roles.paciente",
  },
  {
    quote: "Fui sua paciente em acompanhamento. Muito obrigada por tudo.",
    name: "Isa S.",
    roleKey: "home.casos.roles.paciente",
  },
];

const CARDS_PER_PAGE = 2;

function QuoteIcon() {
  return (
    <svg
      className="w-[40px] h-[34px] md:w-[55px] md:h-[47px]"
      viewBox="0 0 55 47"
      fill="none"
    >
      <path d={svgPaths.p3f3a4c80} fill="var(--color-accent-gold-light)" />
    </svg>
  );
}

function ArrowIcon({ flipped }: { flipped?: boolean }) {
  return (
    <span
      className="inline-flex text-navy/60 text-2xl leading-none tracking-[-0.04em]"
      style={{ transform: flipped ? "scaleX(-1)" : undefined }}
    >
      →
    </span>
  );
}

export default function SectionCasosDeSucesso() {
  const { t } = useTranslation("home");
  const [page, setPage] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  // Direção da última navegação (1 = próximo, -1 = voltar, 0 = carga inicial)
  const dirRef = useRef<0 | 1 | -1>(0);
  const animatingRef = useRef(false);

  const items = TESTIMONIALS.slice(0, 10); // home: no máximo 10
  const totalPages = Math.max(1, Math.ceil(items.length / CARDS_PER_PAGE));

  const canPrev = page > 0;
  const canNext = page < totalPages - 1;

  const visibleCards = items.slice(
    page * CARDS_PER_PAGE,
    page * CARDS_PER_PAGE + CARDS_PER_PAGE,
  );

  // Sem entrada por scroll — ver o comentário no topo de App.tsx. A animação
  // abaixo fica: ela responde ao CLIQUE de paginação, não à rolagem.

  // Entrada dos cards: direcional quando vem da paginação, vertical na carga
  useEffect(() => {
    // Snapshot de pré-render captura o DOM estático (sem pin-spacers/canvas).
    if (isPrerender()) return;
    if (!cardsRef.current) return;
    const cards = cardsRef.current.querySelectorAll("[data-card]");
    const dir = dirRef.current;
    // Uma camada de movimento só. Antes o card deslizava E o conteúdo dele
    // deslizava por dentro, com stagger próprio: duas velocidades na mesma
    // peça fazem o texto parecer solto dentro da caixa. Trocar de página é
    // ação direta do usuário — tem de responder rápido e parar.
    gsap.fromTo(
      cards,
      dir === 0 ? { y: 20, opacity: 0 } : { x: dir * 32, opacity: 0, scale: 0.995 },
      {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.055,
        duration: dir === 0 ? 0.45 : 0.5,
        ease: "power3.out",
        onComplete: () => {
          animatingRef.current = false;
        },
      },
    );
  }, [page]);

  // Saída direcional: anima os cards atuais para fora e só então troca a página
  const paginate = (dir: 1 | -1) => {
    if (animatingRef.current || !cardsRef.current) return;
    if (dir === 1 ? !canNext : !canPrev) return;
    animatingRef.current = true;
    dirRef.current = dir;
    const cards = cardsRef.current.querySelectorAll("[data-card]");
    // Saída curta de propósito: o ciclo inteiro (sair + entrar) ficava perto de
    // 1s, e nesse tempo um segundo clique já não responde. Agora são ~0,46s.
    // Sem `scale`: escalar caixa com texto dentro borra a leitura no meio do
    // movimento, e a informação é o que importa aqui.
    gsap.to(cards, {
      x: dir * -22,
      opacity: 0,
      stagger: 0.03,
      duration: 0.16,
      ease: "power1.in",
      onComplete: () => setPage((p) => p + dir),
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{
        background: "var(--color-bg-cream)",
      }}
    >
      <div className="w-full px-6 md:px-12 lg:px-16 py-16 md:py-24 lg:py-28">
        {/* Header */}
        <div
          data-reveal
          className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-8 mb-12 md:mb-16"
        >
          <h2
            className="font-['Arimo',sans-serif] font-normal text-navy leading-[1.18] tracking-[-0.02em]"
            style={{ fontSize: "clamp(28px, 3.2vw, 40px)" }}
          >
            {t("home.casos.titulo")}
          </h2>
          <p
            className="font-['Arimo',sans-serif] font-normal text-navy/70 leading-[1.13] max-w-[380px]"
            style={{ fontSize: "clamp(16px, 1.2vw, 20px)" }}
          >
            {t("home.casos.descricao")}
          </p>
        </div>

        {/* Divider */}
        <div
          data-reveal
          className="w-full h-px bg-navy/[0.24] mb-10 md:mb-14"
        />

        {/* Testimonial cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6"
        >
          {visibleCards.map((item, i) => (
            <article
              key={`${page}-${i}`}
              data-card
              className="group relative flex flex-col justify-between rounded-2xl border border-navy/[0.08] bg-white p-8 md:p-10 lg:p-12 transition-all duration-400 hover:border-gold-light/30 hover:shadow-[0_8px_40px_-12px_rgba(26,41,63,0.08)]"
            >
              <div className="flex flex-col gap-6 md:gap-8">
                <QuoteIcon />
                <p
                  className="font-['Arimo',sans-serif] font-normal text-navy leading-[1.18] tracking-[-0.02em]"
                  style={{ fontSize: "clamp(18px, 2vw, 32px)" }}
                >
                  {item.quote}
                </p>
              </div>
              <div className="flex items-center gap-3 mt-8 md:mt-10 pt-6 border-t border-navy/[0.08]">
                {item.photo ? (
                  <img
                    src={item.photo}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="size-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="size-10 rounded-full bg-navy/[0.06] flex items-center justify-center">
                    <span className="font-['Geist',sans-serif] font-medium text-navy/40 text-sm">
                      {item.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="flex flex-col">
                  <span
                    className="font-['Arimo',sans-serif] font-normal text-navy leading-[1.3]"
                    style={{ fontSize: "clamp(14px, 1vw, 18px)" }}
                  >
                    {item.name}
                  </span>
                  <span
                    className="font-['Arimo',sans-serif] font-normal text-navy/40 leading-[1.3]"
                    style={{ fontSize: "clamp(12px, 0.9vw, 15px)" }}
                  >
                    {t(item.roleKey)}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Navigation */}
        <div
          data-reveal
          className="flex items-center justify-between mt-10 md:mt-14"
        >
          <span
            className="font-['Arimo',sans-serif] font-normal text-navy leading-[1.18] tracking-[-0.02em]"
            style={{ fontSize: "clamp(18px, 1.4vw, 24px)" }}
          >
            {String(page + 1).padStart(2, "0")} —{" "}
            {String(totalPages).padStart(2, "0")}
          </span>

          <div className="flex items-center gap-3">
            {/* Saída para a lista completa: o carrossel mostra 2 por vez e a
                pessoa que quer ler tudo não deveria ter de clicar sete vezes. */}
            <LocaleLink
              to="/depoimentos"
              className="mr-1 hidden sm:inline-flex min-h-[44px] items-center rounded-full px-4 font-['Arimo',sans-serif] text-[14px] text-navy/70 transition-colors duration-200 hover:text-navy"
            >
              {t("home.casos.verTodos")}
            </LocaleLink>
            <button
              type="button"
              onClick={() => paginate(-1)}
              disabled={!canPrev}
              className="inline-flex cursor-pointer items-center gap-3 rounded-full border border-navy px-5 py-3 font-['Arimo',sans-serif] font-normal text-navy transition-[opacity,background-color] duration-200 hover:bg-navy/[0.06] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
              style={{ fontSize: "clamp(16px, 1.2vw, 24px)" }}
            >
              <ArrowIcon flipped />
              {t("home.casos.voltar")}
            </button>
            <button
              type="button"
              onClick={() => paginate(1)}
              disabled={!canNext}
              className="inline-flex cursor-pointer items-center gap-3 rounded-full border border-navy px-5 py-3 font-['Arimo',sans-serif] font-normal text-navy transition-[opacity,background-color] duration-200 hover:bg-navy/[0.06] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
              style={{ fontSize: "clamp(16px, 1.2vw, 24px)" }}
            >
              {t("home.casos.proximo")}
              <ArrowIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
