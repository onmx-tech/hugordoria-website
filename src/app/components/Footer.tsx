// LocaleLink como Link: mantém os links do rodapé no idioma ativo (drop-in;
// âncoras e URLs externas passam intactas). Rótulos ainda serão i18n-izados.
import { LocaleLink as Link, useLocale } from "../i18n/LocaleProvider";
import { useTranslation } from "react-i18next";
import svgPaths from "../../imports/svg-nx92b0rij3";
import { getCards } from "./section-especialidades/cards-i18n";
import { CONTATO, SOCIAL } from "../content/institucional";

// labelKey aponta para o i18n (namespace "sub": sub.footer.nav.*); o texto é
// resolvido com t() no render. `to` continua sendo o path base em PT.
const NAV_LINKS = [
  { labelKey: "sub.footer.nav.sobreMim", to: "/sobre-mim" },
  { labelKey: "sub.footer.nav.doutorado", to: "/doutorado" },
  { labelKey: "sub.footer.nav.publicacoes", to: "/publicacoes" },
  { labelKey: "sub.footer.nav.eventos", to: "/eventos" },
  { labelKey: "sub.footer.nav.midia", to: "/midia" },
  { labelKey: "sub.footer.nav.depoimentos", to: "/depoimentos" },
  { labelKey: "sub.footer.nav.segundaOpiniao", to: "/segunda-opiniao" },
  { labelKey: "sub.footer.nav.contato", to: "/contato" },
] as const;

// Uma única fonte para o endereço. Estava duplicado aqui como string literal e
// ficou para trás quando o formato oficial entrou em CONTATO — o rodapé é
// compartilhado por todas as páginas e nos três idiomas, então a cópia velha
// aparecia no site inteiro. Endereço é identificador: não se escreve duas vezes.
const ADDRESS = CONTATO.endereco;

function LogoSection() {
  return (
    <div className="flex flex-col gap-8 max-w-[384px]">
      <div className="flex flex-col gap-2">
        <svg
          className="w-[258px] h-[31px]"
          viewBox="0 0 258 30.88"
          fill="none"
        >
          <g clipPath="url(#footer_logo_clip)">
            <path d={svgPaths.p81b8980} fill="var(--color-accent-gold)" />
            <path d={svgPaths.p11a36640} fill="var(--color-accent-gold)" />
            <path d={svgPaths.p3dc46180} fill="var(--color-accent-gold)" />
            <path d={svgPaths.p2bd68500} fill="var(--color-accent-gold)" />
            <path d={svgPaths.p2b958c80} fill="var(--color-accent-gold)" />
            <path d={svgPaths.p2735a400} fill="var(--color-accent-gold)" />
            <path d={svgPaths.p1b4d0f00} fill="var(--color-accent-gold)" />
            <path d={svgPaths.p19c37c80} fill="var(--color-accent-gold)" />
            <path d={svgPaths.p1e2b3880} fill="var(--color-accent-gold)" />
            <path d={svgPaths.p394d2b40} fill="var(--color-accent-gold)" />
            <path d={svgPaths.p7117700} fill="var(--color-accent-gold)" />
          </g>
          <defs>
            <clipPath id="footer_logo_clip">
              <rect fill="white" height="30.88" width="258" />
            </clipPath>
          </defs>
        </svg>
        <svg
          className="w-[106px] h-[9px] ml-[70px]"
          viewBox="0 0 105.658 8.274"
          fill="none"
        >
          <path d={svgPaths.p32b2e680} fill="var(--color-accent-gold)" />
          <path d={svgPaths.p388bbe40} fill="var(--color-accent-gold)" />
          <path d={svgPaths.p11de5580} fill="var(--color-accent-gold)" />
          <path d={svgPaths.p27d0dff0} fill="var(--color-accent-gold)" />
          <path d={svgPaths.p1bf3c480} fill="var(--color-accent-gold)" />
          <path d={svgPaths.p3674af00} fill="var(--color-accent-gold)" />
          <path d={svgPaths.pd2dba00} fill="var(--color-accent-gold)" />
          <path d={svgPaths.p17ebd300} fill="var(--color-accent-gold)" />
          <path d={svgPaths.p7f04100} fill="var(--color-accent-gold)" />
          <path d={svgPaths.p19bf5a00} fill="var(--color-accent-gold)" />
          <path d={svgPaths.p5094300} fill="var(--color-accent-gold)" />
          <path d={svgPaths.p37bc3100} fill="var(--color-accent-gold)" />
          <path d={svgPaths.p2195ba00} fill="var(--color-accent-gold)" />
          <path d={svgPaths.p1a136f00} fill="var(--color-accent-gold)" />
        </svg>
      </div>
      <p className="font-['Geist',sans-serif] font-normal text-cream text-sm leading-[1.5]">
        {ADDRESS}
      </p>
    </div>
  );
}

function SocialLinkedin() {
  return (
    <svg className="size-10" viewBox="0 0 40 40" fill="none">
      <rect
        height="39"
        rx="19.5"
        stroke="var(--color-border-muted)"
        width="39"
        x="0.5"
        y="0.5"
      />
      <path d={svgPaths.p35111b00} fill="var(--color-text-tertiary)" />
    </svg>
  );
}

function SocialInstagram() {
  return (
    <div className="size-10 rounded-full border border-steel flex items-center justify-center">
      <svg className="size-[15px]" viewBox="0 0 14.99 15.31" fill="none">
        <path d={svgPaths.p9948b0} fill="var(--color-text-tertiary)" />
        <path d={svgPaths.p39b0fc80} fill="var(--color-icon-muted)" />
        <path d={svgPaths.p36950100} fill="var(--color-text-tertiary)" />
        <path d={svgPaths.p43f400} fill="var(--color-icon-muted)" />
      </svg>
    </div>
  );
}

function SocialFacebook() {
  return (
    <svg className="size-10" viewBox="0 0 40 40" fill="none">
      <rect
        height="39"
        rx="19.5"
        stroke="var(--color-border-muted)"
        width="39"
        x="0.5"
        y="0.5"
      />
      <path d={svgPaths.p3ebb0f80} fill="var(--color-text-tertiary)" />
    </svg>
  );
}

export default function Footer() {
  const { locale } = useLocale();
  const { t } = useTranslation("sub");
  const { t: tForms } = useTranslation("forms");
  const cards = getCards(locale);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-navy-deep">
      {/* Main content */}
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16 pt-16 md:pt-20 pb-32 md:pb-36">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 lg:gap-16">
          <LogoSection />

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-base whitespace-nowrap">
            {/* Navigate */}
            <div className="flex flex-col gap-4">
              <h3 className="font-['Geist',sans-serif] font-medium text-cream leading-normal">
                {t("sub.footer.navegue")}
              </h3>
              <nav className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="font-['Geist',sans-serif] font-normal text-cream/50 leading-normal transition-colors duration-200 hover:text-cream"
                  >
                    {t(link.labelKey)}
                  </Link>
                ))}
                {/* Link legal (LGPD). Rótulo vem do namespace "forms", onde mora
                    o resto da política — não do "sub" dos demais itens. */}
                <Link
                  to="/privacidade"
                  className="font-['Geist',sans-serif] font-normal text-cream/50 leading-normal transition-colors duration-200 hover:text-cream"
                >
                  {tForms("forms.privacidade.footerLink")}
                </Link>
              </nav>
            </div>

            {/* Specialties */}
            <div className="flex flex-col gap-4">
              <h3 className="font-['Geist',sans-serif] font-medium text-cream leading-normal">
                {t("sub.footer.especialidades")}
              </h3>
              <nav className="flex flex-col gap-2">
                {cards.map((card) => (
                  <Link
                    key={card.slug}
                    to={`/especialidade/${card.slug}`}
                    className="font-['Geist',sans-serif] font-normal text-cream/50 leading-normal transition-colors duration-200 hover:text-cream"
                  >
                    {card.title}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-4 col-span-2 sm:col-span-1">
              <h3 className="font-['Geist',sans-serif] font-medium text-cream leading-normal">
                {t("sub.footer.contato")}
              </h3>
              <div className="flex flex-col gap-2">
                <a
                  href="https://wa.me/5511971622777"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-['Geist',sans-serif] font-normal text-cream/50 leading-normal transition-colors duration-200 hover:text-cream"
                >
                  +55 (11) 97162-2777
                </a>
                <Link
                  to="/localizacao"
                  className="font-['Geist',sans-serif] font-normal text-cream/50 leading-normal transition-colors duration-200 hover:text-cream"
                >
                  {t("sub.footer.localizacao")}
                </Link>

                {/* "Como chegar" abre o GPS já com a rota traçada até o
                    consultório. Nasceu de um pedido concreto: a secretária
                    instrui pacientes idosos por telefone, e "desce até o fim
                    do site e aperta o botão do mapa" é uma instrução que se dá
                    ao telefone. Alvo de toque de 44px pelo mesmo motivo. */}
                <a
                  href={CONTATO.rotaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex min-h-[44px] w-fit items-center gap-2 rounded-full border border-white/20 px-4 font-['Geist',sans-serif] text-[14px] font-medium leading-none text-cream transition-colors duration-200 hover:border-white/40 hover:bg-white/5"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-gold)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {t("sub.footer.comoChegar")}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Identificação profissional — EXIGIDA por lei, não é decoração.
            Resolução CFM 2.336/2023, Art. 4º: nome + nº do CRM acompanhados da
            palavra MÉDICO, e a especialidade registrada seguida do RQE. Art. 6º:
            em sites, isso tem de estar na página principal — este footer é
            compartilhado com a home, então é aqui que a obrigação se cumpre.
            Não remover nem esconder em mobile. */}
        <p className="mt-14 border-t border-white/10 pt-8 font-['Geist',sans-serif] text-[13px] leading-relaxed text-cream/45">
          {tForms("forms.identificacao.linha")}
        </p>
      </div>

      {/* Bottom bar */}
      {/* data-footer-bar: alvo do IntersectionObserver do FloatingNav. Quando
          esta barra entra na tela, o botão flutuante de agendar sai — os dois
          disputam o mesmo canto inferior direito. */}
      <div data-footer-bar className="absolute bottom-0 left-0 right-0 bg-[rgba(255,255,255,0.06)]">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-16 h-[72px] md:h-[112px] flex items-center justify-between">
          {/* Os três ícones eram SVG solto, sem <a> em volta: desenhados, mas
              não clicáveis — o cliente reportou "os ícones não estão levando
              para as páginas correspondentes". As URLs já existiam em SOCIAL,
              só nunca tinham sido ligadas. */}
          <div className="flex items-center gap-2">
            {[
              { href: SOCIAL.linkedin, rotulo: "LinkedIn", Icone: SocialLinkedin },
              { href: SOCIAL.instagram, rotulo: "Instagram", Icone: SocialInstagram },
              { href: SOCIAL.facebook, rotulo: "Facebook", Icone: SocialFacebook },
            ].map(({ href, rotulo, Icone }) => (
              <a
                key={rotulo}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${rotulo} do Dr. Hugo Doria`}
                className="rounded-full transition-opacity duration-200 hover:opacity-70"
              >
                <Icone />
              </a>
            ))}
          </div>

          <p className="hidden md:block font-['Geist',sans-serif] font-normal text-silver text-sm leading-normal whitespace-nowrap">
            {t("sub.footer.copyright")}
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 font-['Geist',sans-serif] font-medium text-silver text-sm leading-[1.5] transition-colors duration-200 hover:text-cream"
          >
            {t("sub.footer.voltarAoTopo")}
            <svg
              className="size-6 -rotate-90"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6.5 17L11.5 12L6.5 7"
                stroke="var(--color-accent-gold)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                opacity="0.4"
              />
              <path
                d="M12.5 17L17.5 12L12.5 7"
                stroke="var(--color-accent-gold)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
