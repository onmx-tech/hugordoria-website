import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Monogram } from "./sub/Logo";
import { LocaleLink, useLocale } from "../i18n/LocaleProvider";
import { LanguageSwitcher } from "../i18n/LanguageSwitcher";
import { CONTATO } from "../content/institucional";

// O número é um só — o mesmo celular atende voz e WhatsApp. São dois botões
// porque são dois GESTOS: quem quer falar agora liga, quem quer deixar recado
// escreve. A secretária instrui paciente idoso por telefone, e "aperte o
// telefone no topo" é instrução que se cumpre sem procurar.
const TEL_LINK = `tel:+${CONTATO.whatsappLink.split("/").pop()}`;

// Header full do site (home + subpáginas): largura cheia, transparente sobre o
// hero, rola junto com a página (não fixo). A navegação persistente fica na
// FloatingNav fixa embaixo. Links por rotas (cientes de idioma); ativo conforme
// o path base (sem o prefixo de locale). Rótulos vêm do i18n (namespace nav).
// Ordem do §9 do briefing do cliente: o menu é de PACIENTE, não currículo.
// "Contato" e "Segunda opinião" estavam fora do header — a página de contato,
// com formulário e consentimento, só era alcançável pelo rodapé, e a segunda
// opinião é um dos dois CTAs aprovados. "Doutorado" e "Eventos" saem da
// posição prioritária: continuam publicados e linkados no rodapé.
const NAV_ITEMS: Array<{ key: string; to: string }> = [
  { key: "inicio", to: "/" },
  { key: "sobreMim", to: "/sobre-mim" },
  { key: "especialidades", to: "/especialidades" },
  { key: "segundaOpiniao", to: "/segunda-opiniao" },
  { key: "depoimentos", to: "/depoimentos" },
  { key: "contato", to: "/contato" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [rolado, setRolado] = useState(false);
  const { t } = useTranslation();
  const { basePath } = useLocale();

  // No celular o cabeçalho é FIXO: os dois canais de contato têm de estar ao
  // alcance em qualquer ponto da página, não só no topo. Como ele é
  // transparente sobre o hero e a página tem seções claras logo abaixo, a barra
  // ganha fundo assim que a rolagem começa — sem isso, ícone cream sobre fundo
  // cream desaparece. No desktop nada muda: lá ele continua rolando junto, e a
  // navegação persistente é a pill de baixo.
  useEffect(() => {
    const onScroll = () => setRolado(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (to: string) => {
    if (to === "/") return basePath === "/";
    if (to === "/especialidades") return basePath.startsWith("/especialidade");
    return basePath.startsWith(to);
  };

  return (
    <>
      <header
        className="fixed lg:absolute inset-x-0 top-0 z-30 transition-[background-color,backdrop-filter] duration-300"
        style={
          rolado
            ? {
                background: "rgba(13, 26, 45, 0.92)",
                backdropFilter: "blur(18px) saturate(1.4)",
                WebkitBackdropFilter: "blur(18px) saturate(1.4)",
                borderBottom: "1px solid rgba(238, 235, 228, 0.10)",
              }
            : undefined
        }
      >
        <div className="flex h-[72px] w-full items-center justify-between px-6 md:px-8">
          <LocaleLink to="/" onClick={() => setMenuOpen(false)} className="text-[15px]" style={{ textDecoration: "none" }}>
            <Monogram tone="light" />
          </LocaleLink>

          <div className="hidden lg:flex items-center gap-7">
            <nav className="flex items-center gap-7 font-display font-medium text-[14px] leading-[1.5]">
              {NAV_ITEMS.map((item) => (
                <LocaleLink
                  key={item.key}
                  to={item.to}
                  className={isActive(item.to) ? "text-gold-600" : "text-cream/90 transition-colors hover:text-gold-600"}
                  style={{ textDecoration: "none" }}
                >
                  {t(`nav.${item.key}`)}
                </LocaleLink>
              ))}
            </nav>
            <span className="h-4 w-px bg-cream/20" aria-hidden />
            <LanguageSwitcher variant="header" />
          </div>

          {/* Contato no topo, só no celular: os dois gestos que de fato diferem
              — LIGAR (voz, agora) e WHATSAPP (recado). Ambos por SÍMBOLO, do
              mesmo tamanho: a barra do topo é lugar de atalho, não de chamada.
              A palavra "Agendar" vive no hero e no botão de baixo, que aparece
              depois da primeira dobra — assim nunca há duas chamadas para a
              mesma ação na mesma tela, que foi a queixa de 06/08. O dourado
              distingue: ligar é contorno, escrever é o botão cheio. */}
          <div className="lg:hidden ml-auto mr-1 flex items-center gap-2">
            <a
              href={TEL_LINK}
              aria-label={t("nav.ligarAria")}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors duration-300 hover:border-gold-600 hover:text-gold-600"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.24.2 2.45.57 3.57.12.35.03.75-.24 1.02l-2.21 2.2z" />
              </svg>
            </a>
            <a
              href={CONTATO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("nav.agendarAria")}
              // Só o símbolo, sem a palavra: o par vira dois ícones do mesmo
              // tamanho, e a barra do topo volta a ser um lugar de atalho, não
              // de chamada. Quem carrega a palavra "Agendar" é o botão de
              // baixo, que aparece assim que a leitura começa. O rótulo
              // acessível continua completo — leitor de tela não vê glifo.
              className="cta-luz inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
              style={{
                color: "var(--color-on-gold)",
                background: "var(--color-accent-gold-light)",
              }}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.8h-.02a9.8 9.8 0 0 1-4.99-1.37l-.36-.21-3.71.97.99-3.62-.23-.37a9.79 9.79 0 0 1-1.5-5.22c0-5.4 4.4-9.8 9.82-9.8a9.75 9.75 0 0 1 6.94 2.88 9.75 9.75 0 0 1 2.87 6.93c0 5.4-4.4 9.81-9.81 9.81M20.52 3.45A11.73 11.73 0 0 0 12.05 0C5.53 0 .23 5.3.22 11.81c0 2.08.55 4.11 1.58 5.91L.12 24l6.42-1.68a11.8 11.8 0 0 0 5.51 1.4h.01c6.52 0 11.82-5.3 11.82-11.81 0-3.16-1.23-6.12-3.46-8.35" />
              </svg>
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 -mr-2 text-cream"
          >
            <svg width="22" height="14" viewBox="0 0 22 14" fill="none" aria-hidden>
              <path d="M0 1H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M0 7H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M0 13H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className="lg:hidden fixed inset-0 z-[60] transition-opacity duration-300"
        style={{
          background: "rgba(13, 22, 38, 0.97)",
          backdropFilter: "blur(20px) saturate(1.4)",
          WebkitBackdropFilter: "blur(20px) saturate(1.4)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
        aria-hidden={!menuOpen}
      >
        <div className="flex h-[72px] items-center justify-between px-6">
          <Monogram tone="light" />
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Fechar menu"
            className="inline-flex items-center justify-center w-10 h-10 -mr-2 text-cream"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M2 2L18 18M18 2L2 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col gap-6 px-6 pt-12 font-display font-medium text-[26px] leading-[1.2] tracking-[-0.02em]">
          {NAV_ITEMS.map((item) => (
            <LocaleLink
              key={item.key}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className={isActive(item.to) ? "text-gold-600" : "text-cream"}
              style={{ textDecoration: "none" }}
            >
              {t(`nav.${item.key}`)}
            </LocaleLink>
          ))}
        </nav>
        <div className="px-6 pt-12">
          <LanguageSwitcher variant="overlay" onSelect={() => setMenuOpen(false)} />
        </div>
      </div>
    </>
  );
}
