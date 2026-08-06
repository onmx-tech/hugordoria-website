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
  { labelKey: "sub.footer.nav.eventos", to: "/eventos" },
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
    <svg className="size-11" viewBox="0 0 40 40" fill="none">
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
    <div className="size-11 rounded-full border border-steel flex items-center justify-center">
      <svg className="size-[17px]" viewBox="0 0 14.99 15.31" fill="none">
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
    <svg className="size-11" viewBox="0 0 40 40" fill="none">
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
  // "Agendar" é o mesmo rótulo do botão flutuante e dos CTAs do hero: vem do
  // namespace comum (nav.*), não do "sub" do resto do rodapé.
  const { t: tNav } = useTranslation();
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

          {/* `whitespace-nowrap` é regra de DESKTOP, onde as colunas são largas e
              um nome quebrado ficaria feio. No celular, em duas colunas de ~155px,
              ela fazia "Schwannoma Vestibular" e "Revascularização Cerebral"
              sangrarem para fora da tela — o texto aparecia cortado na borda e o
              rodapé é compartilhado pelas 21 rotas. Abaixo de `sm` o nome quebra. */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-base sm:whitespace-nowrap">
            {/* Navigate */}
            <div className="flex flex-col gap-4">
              <h3 className="font-['Geist',sans-serif] font-medium text-cream leading-normal">
                {t("sub.footer.navegue")}
              </h3>
              {/* No celular o item pode ocupar duas linhas; sem um respiro maior
                  entre itens, a quebra de linha e a troca de link ficam com o
                  mesmo espaçamento e a lista vira um bloco só. */}
              <nav className="flex flex-col gap-3 sm:gap-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="font-['Geist',sans-serif] font-normal text-cream/50 leading-snug sm:leading-normal transition-colors duration-200 hover:text-cream"
                  >
                    {t(link.labelKey)}
                  </Link>
                ))}
                {/* Link legal (LGPD). Rótulo vem do namespace "forms", onde mora
                    o resto da política — não do "sub" dos demais itens. */}
                <Link
                  to="/privacidade"
                  className="font-['Geist',sans-serif] font-normal text-cream/50 leading-snug sm:leading-normal transition-colors duration-200 hover:text-cream"
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
              {/* No celular o item pode ocupar duas linhas; sem um respiro maior
                  entre itens, a quebra de linha e a troca de link ficam com o
                  mesmo espaçamento e a lista vira um bloco só. */}
              <nav className="flex flex-col gap-3 sm:gap-2">
                {cards.map((card) => (
                  <Link
                    key={card.slug}
                    to={`/especialidade/${card.slug}`}
                    className="font-['Geist',sans-serif] font-normal text-cream/50 leading-snug sm:leading-normal transition-colors duration-200 hover:text-cream"
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
                  href={CONTATO.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-['Geist',sans-serif] font-normal text-cream/50 leading-snug sm:leading-normal transition-colors duration-200 hover:text-cream"
                >
                  {CONTATO.whatsapp}
                </a>
                <Link
                  to="/localizacao"
                  className="font-['Geist',sans-serif] font-normal text-cream/50 leading-snug sm:leading-normal transition-colors duration-200 hover:text-cream"
                >
                  {t("sub.footer.localizacao")}
                </Link>

                {/* Par de ações que FECHA a página, no mesmo desenho dos dois
                    CTAs do hero (sólido + contorno): quem chega ao fim do
                    rodapé está decidindo, e até agora só encontrava aqui um
                    botão secundário. O "Agendar" que aparecia sobre o rodapé
                    era o flutuante, que sai de cena justamente no fim da
                    página — o site terminava sem a sua ação principal.
                    `data-footer-cta` avisa o FloatingNav para ceder a vez e
                    não deixar dois "Agendar" dourados na mesma tela.
                    Altura de 52px e corpo de 15px pelo mesmo motivo do FAB:
                    o público é majoritariamente idoso, e "Como chegar" é o
                    botão que a secretária instrui por telefone. */}
                <div data-footer-cta className="mt-4 flex flex-wrap items-center gap-4 md:gap-5">
                  <a
                    href={CONTATO.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-luz inline-flex min-h-[56px] flex-1 min-w-[9.5rem] items-center justify-center gap-2.5 rounded-full px-5 font-['Geist',sans-serif] text-[17px] font-medium leading-none tracking-[-0.01em]"
                    style={{
                      color: "var(--color-on-gold)",
                      background: "var(--color-accent-gold-light)",
                    }}
                  >
                    {/* Mesmo glifo do WhatsApp do botão flutuante: o destino é o
                        WhatsApp de fato, e o cliente pediu o ícone por nome. */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.8h-.02a9.8 9.8 0 0 1-4.99-1.37l-.36-.21-3.71.97.99-3.62-.23-.37a9.79 9.79 0 0 1-1.5-5.22c0-5.4 4.4-9.8 9.82-9.8a9.75 9.75 0 0 1 6.94 2.88 9.75 9.75 0 0 1 2.87 6.93c0 5.4-4.4 9.81-9.81 9.81M20.52 3.45A11.73 11.73 0 0 0 12.05 0C5.53 0 .23 5.3.22 11.81c0 2.08.55 4.11 1.58 5.91L.12 24l6.42-1.68a11.8 11.8 0 0 0 5.51 1.4h.01c6.52 0 11.82-5.3 11.82-11.81 0-3.16-1.23-6.12-3.46-8.35" />
                    </svg>
                    {tNav("nav.agendar")}
                  </a>

                  {/* "Como chegar" abre o GPS já com a rota traçada até o
                      consultório. Nasceu de um pedido concreto: a secretária
                      instrui pacientes idosos por telefone, e "desce até o fim
                      do site e aperta o botão do mapa" é uma instrução que se dá
                      ao telefone. */}
                  <a
                    href={CONTATO.rotaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[56px] flex-1 min-w-[9.5rem] items-center justify-center gap-2 rounded-full border px-5 font-['Geist',sans-serif] text-[17px] font-medium leading-none tracking-[-0.01em] text-cream transition-colors duration-200 hover:bg-white/5"
                    style={{ borderColor: "color-mix(in srgb, var(--color-bg-cream) 34%, transparent)" }}
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-gold)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {t("sub.footer.comoChegar")}
                  </a>
                </div>
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
          {/* O RQE é conferível — mas só pelo documento: a consulta pública do
              CREMESP não abre por médico. Enquanto o PDF não estiver em
              public/documentos/, `__RQE_PDF__` é null e nada aparece aqui.
              Definido na build (vite.config.ts) justamente para o arquivo
              ligar o link sozinho, sem depender de alguém lembrar. */}
          {__RQE_PDF__ ? (
            <>
              {" "}
              <a
                href={__RQE_PDF__}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 transition-colors hover:text-gold-600"
              >
                {tForms("forms.identificacao.verCertificado")}
              </a>
            </>
          ) : null}
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
          {/* 44px de diâmetro e 16px de respiro entre eles: o marketing testou
              no celular e a queixa foi literal — "tá tudo muito junto, fica
              difícil de acessar as redes sociais, eu separaria mais". Três
              alvos de 40px encostados viram um alvo só para um dedo grande.
              44px é o mínimo recomendado de área de toque, e é a mesma régua
              já aplicada nos botões desta página. */}
          <div className="flex items-center gap-4">
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
