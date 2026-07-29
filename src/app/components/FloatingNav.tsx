import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { LocaleLink, useLocale } from "../i18n/LocaleProvider";

// Navegação flutuante fixa embaixo — aparece ao rolar, em TODAS as páginas.
// Links de navegação do site (rotas cientes de idioma); ativo pelo path base.
const NAV_LINKS = [
  { key: "inicio", to: "/" },
  { key: "especialidades", to: "/especialidades" },
  { key: "sobreMim", to: "/sobre-mim" },
  { key: "depoimentos", to: "/depoimentos" },
] as const;

const SHOW_THRESHOLD = 480;

export default function FloatingNav() {
  const [visible, setVisible] = useState(false);
  const [noRodape, setNoRodape] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const { basePath } = useLocale();

  const isActive = (to: string) => {
    if (to === "/") return basePath === "/";
    if (to === "/especialidades") return basePath.startsWith("/especialidade");
    return basePath.startsWith(to);
  };

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      const goingDown = y > lastY + 4;
      const goingUp = y < lastY - 4;
      // Só a PILL de navegação (desktop) obedece à direção do scroll: enquanto
      // a pessoa desce lendo ela sai da frente, e volta ao subir. O botão de
      // agendar NÃO participa disso — ver o comentário do CTA abaixo.
      if (y <= SHOW_THRESHOLD) setVisible(false);
      else if (goingDown) setVisible(false);
      else if (goingUp) setVisible(true);
      lastY = y;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // O CTA cede a vez ao rodapé. Ele é fixo no canto inferior direito, que é
  // exatamente onde mora a barra final do rodapé — sem isso os dois se
  // sobrepõem (o cliente mandou print). Não é perda de conversão: quando o
  // rodapé está na tela, telefone, WhatsApp e "Como chegar" já estão visíveis.
  useEffect(() => {
    const alvo = document.querySelector("[data-footer-bar]");
    if (!alvo) return;
    const io = new IntersectionObserver(
      ([entrada]) => setNoRodape(entrada.isIntersecting),
      { rootMargin: "0px 0px -8px 0px" },
    );
    io.observe(alvo);
    return () => io.disconnect();
  }, [pathname]);

  // A página de contato JÁ é o CTA de agendamento (formulário + canais):
  // a nav flutuante fica redundante e, no mobile, colide com o botão de envio.
  if (basePath.startsWith("/contato")) return null;

  return (
    <>
    <nav
      ref={navRef}
      aria-label="Navegação flutuante"
      // Pill de navegação — só no desktop, e só depois que a leitura começa.
      // No mobile ela não existe: lá o polegar tem uma ação só, que é agendar.
      className={`hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-50 items-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] gap-1 px-1.5 py-1.5 ${visible ? "translate-y-0" : "translate-y-[calc(100%+2.5rem)]"}`}
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        background: "rgba(18, 33, 54, 0.75)",
        backdropFilter: "blur(24px) saturate(1.6)",
        WebkitBackdropFilter: "blur(24px) saturate(1.6)",
      }}
    >
      {NAV_LINKS.map((link) => {
        const active = isActive(link.to);
        return (
          <LocaleLink
            key={link.to}
            to={link.to}
            className="relative hidden md:inline-block rounded-full px-4 py-2 text-[13px] font-medium leading-none tracking-[-0.01em] transition-all duration-300 whitespace-nowrap"
            style={{
              fontFamily: "'Geist', sans-serif",
              textDecoration: "none",
              color: active ? "var(--color-bg-deep)" : "color-mix(in srgb, var(--color-bg-cream) 60%, transparent)",
              background: active ? "var(--color-accent-gold-light)" : "transparent",
            }}
          >
            {t(`nav.${link.key}`)}
          </LocaleLink>
        );
      })}

      {/* Segundo caminho de conversão, presente em todas as páginas.
          No mobile a barra é um FAB e só cabe a ação primária — lá o acesso
          à segunda opinião fica no hero e no rodapé. */}
      <LocaleLink
        to="/segunda-opiniao"
        className="relative hidden md:inline-block rounded-full border px-4 py-2 text-[13px] font-medium leading-none tracking-[-0.01em] transition-all duration-300 whitespace-nowrap"
        style={{
          fontFamily: "'Geist', sans-serif",
          textDecoration: "none",
          color: isActive("/segunda-opiniao")
            ? "var(--color-bg-deep)"
            : "var(--color-bg-cream)",
          background: isActive("/segunda-opiniao")
            ? "var(--color-accent-gold-light)"
            : "transparent",
          borderColor: "color-mix(in srgb, var(--color-bg-cream) 30%, transparent)",
        }}
      >
        {t("nav.segundaOpiniao")}
      </LocaleLink>

    </nav>

    {/* AGENDAR — permanente, em todas as páginas e desde o topo.
        Antes ele morava dentro da pill e só aparecia ao rolar PARA CIMA: a
        equipe do cliente testou, concluiu que estava quebrado e pediu três
        vezes um botão fixo. Estavam certos pelo motivo certo — o site existe
        para marcar consulta, e uma ação primária não pode depender da direção
        do dedo. Altura mínima de 48px: a área de toque anterior media ~34px,
        abaixo dos 44px recomendados, e o público é majoritariamente idoso. */}
    <a
      href="https://wa.me/5511971622777"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("nav.agendarAria")}
      className={`fixed bottom-6 right-5 z-50 flex min-h-[48px] items-center gap-2.5 rounded-full px-5 text-[15px] font-medium leading-none tracking-[-0.01em] whitespace-nowrap transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${noRodape ? "pointer-events-none translate-y-[calc(100%+2.5rem)] opacity-0" : "translate-y-0 opacity-100"}`}
      style={{
        fontFamily: "'Geist', sans-serif",
        textDecoration: "none",
        color: "var(--color-bg-deep)",
        background: "var(--color-accent-gold-light)",
      }}
    >
      {/* Glifo do WhatsApp, não um telefone genérico: o cliente pediu o ícone
          do WhatsApp por nome, e o destino do link é o WhatsApp de fato. */}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.8h-.02a9.8 9.8 0 0 1-4.99-1.37l-.36-.21-3.71.97.99-3.62-.23-.37a9.79 9.79 0 0 1-1.5-5.22c0-5.4 4.4-9.8 9.82-9.8a9.75 9.75 0 0 1 6.94 2.88 9.75 9.75 0 0 1 2.87 6.93c0 5.4-4.4 9.81-9.81 9.81M20.52 3.45A11.73 11.73 0 0 0 12.05 0C5.53 0 .23 5.3.22 11.81c0 2.08.55 4.11 1.58 5.91L.12 24l6.42-1.68a11.8 11.8 0 0 0 5.51 1.4h.01c6.52 0 11.82-5.3 11.82-11.81 0-3.16-1.23-6.12-3.46-8.35" />
      </svg>
      {t("nav.agendar")}
    </a>
    </>
  );
}
