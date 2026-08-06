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

export default function FloatingNav() {
  // Dois estados, porque os dois flutuantes têm importâncias diferentes.
  // `cedeVez` é do botão de agendar: só sai no rodapé.
  // `navCedeVez` é da pill de navegação: sai no rodapé E no hero — ali o
  // cabeçalho já mostra o menu inteiro, e dois flutuantes empilhados sobre o
  // letreiro "DR. HUGO DORIA" (a assinatura da marca) sujam a abertura.
  const [cedeVez, setCedeVez] = useState(false);
  const [navCedeVez, setNavCedeVez] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const { basePath } = useLocale();

  const isActive = (to: string) => {
    if (to === "/") return basePath === "/";
    if (to === "/especialidades") return basePath.startsWith("/especialidade");
    return basePath.startsWith(to);
  };

  // Nada aqui depende da direção do scroll — esse era o problema original: o
  // botão sumia conforme o dedo e podia não voltar nunca.
  //
  // O BOTÃO DE AGENDAR está na tela desde o primeiro pixel de qualquer página
  // e fica. Ele já cedeu a vez enquanto os CTAs do hero estavam visíveis, com
  // a lógica de não repetir o caminho que a tela já oferecia — mas o efeito
  // prático era não existir botão no topo da home, que é onde a maioria das
  // visitas começa e termina. O marketing reparou ("ele só vai aparecer depois
  // aqui"). Única exceção que sobra: o fim do rodapé, onde ele e o par
  // Agendar/Como chegar disputam literalmente o mesmo canto.
  //
  // A PILL DE NAVEGAÇÃO continua cedendo a vez no hero: ali o cabeçalho já
  // mostra o menu inteiro, e dois flutuantes empilhados sobre o letreiro
  // "DR. HUGO DORIA" sujam a abertura. Navegação é secundária; agendar não.
  useEffect(() => {
    const alvos = document.querySelectorAll('[data-hero="cta"], [data-footer-cta], [data-footer-bar]');
    if (!alvos.length) return;
    const naTela = new Set<Element>();
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) naTela.add(e.target);
          else naTela.delete(e.target);
        }
        const rodape = [...naTela].some((el) => !el.matches('[data-hero="cta"]'));
        const heroNaTela = [...naTela].some((el) => el.matches('[data-hero="cta"]'));
        // O flutuante cede a vez na PRIMEIRA DOBRA, nos dois tamanhos: ali o
        // hero já tem "Agendar consulta" escrito, e no celular o cabeçalho fixo
        // agora leva o botão de agendar também. Três chamadas para a mesma ação
        // na mesma tela foi a queixa literal do cliente em 06/08 — "eu tô com
        // dois, não tá legal". Ele reaparece assim que a leitura começa, que é
        // o que a equipe pediu quando exigiu um botão que não some.
        setCedeVez(rodape || heroNaTela);
        setNavCedeVez(naTela.size > 0);
      },
      { rootMargin: "0px 0px -8px 0px" },
    );
    alvos.forEach((a) => io.observe(a));
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
      className={`hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-50 items-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] gap-1 px-1.5 py-1.5 ${!navCedeVez ? "translate-y-0" : "translate-y-[calc(100%+2.5rem)]"}`}
      style={{
        opacity: navCedeVez ? 0 : 1,
        pointerEvents: navCedeVez ? "none" : "auto",
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
              color: active ? "var(--color-on-gold)" : "color-mix(in srgb, var(--color-bg-cream) 60%, transparent)",
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
            ? "var(--color-on-gold)"
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
        do dedo. */}
    <a
      href="https://wa.me/5511971622777"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("nav.agendarAria")}
      // 56px e corpo de 16px: o marketing testou no celular pensando em quem
      // vai usar o site — "eu sei que é hiper chique e bonito, só que eu tô
      // pensando nos idosos, ele está bem pequenininho". 48px cumpria o mínimo
      // de acessibilidade; não é a mesma coisa que ser a ação evidente da tela.
      className={`cta-luz cta-pula fixed bottom-6 right-5 z-50 flex min-h-[56px] lg:min-h-[60px] items-center gap-2.5 rounded-full px-6 lg:px-9 text-[16px] lg:text-[18px] font-medium leading-none tracking-[-0.01em] whitespace-nowrap transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${cedeVez ? "pointer-events-none translate-y-[calc(100%+2.5rem)] opacity-0" : "translate-y-0 opacity-100"}`}
      style={{
        fontFamily: "'Geist', sans-serif",
        textDecoration: "none",
        color: "var(--color-on-gold)",
        background: "var(--color-accent-gold-light)",
      }}
    >
      {/* Glifo do WhatsApp, não um telefone genérico: o cliente pediu o ícone
          do WhatsApp por nome, e o destino do link é o WhatsApp de fato. */}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.8h-.02a9.8 9.8 0 0 1-4.99-1.37l-.36-.21-3.71.97.99-3.62-.23-.37a9.79 9.79 0 0 1-1.5-5.22c0-5.4 4.4-9.8 9.82-9.8a9.75 9.75 0 0 1 6.94 2.88 9.75 9.75 0 0 1 2.87 6.93c0 5.4-4.4 9.81-9.81 9.81M20.52 3.45A11.73 11.73 0 0 0 12.05 0C5.53 0 .23 5.3.22 11.81c0 2.08.55 4.11 1.58 5.91L.12 24l6.42-1.68a11.8 11.8 0 0 0 5.51 1.4h.01c6.52 0 11.82-5.3 11.82-11.81 0-3.16-1.23-6.12-3.46-8.35" />
      </svg>
      {/* No desktop o rótulo é inteiro — "como os velinhos são meio toscos,
          de repente deixa escrito no botão do desktop agendar consulta". No
          celular continua curto: "Agendar consulta" empurraria o botão para
          quase metade da largura da tela. */}
      <span className="lg:hidden">{t("nav.agendar")}</span>
      <span className="hidden lg:inline">{t("nav.agendarConsulta")}</span>
    </a>
    </>
  );
}
