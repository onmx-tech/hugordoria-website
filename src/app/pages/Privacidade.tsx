import { useTranslation } from "react-i18next";
import { Mail } from "lucide-react";
import { Eyebrow, SectionHeading, Divider, Button, Container } from "../components/sub/primitives";
import { useSeo } from "../seo/useSeo";
import { breadcrumbSchema } from "../seo/schema";
import { CONTATO } from "../content/institucional";
// Mesma casca das demais institucionais — a página é irmã delas.
import { Shell, Section } from "./InstitucionalPages";

type Secao = {
  titulo: string;
  paragrafos?: string[];
  itens?: string[];
  /** Parágrafos que fecham a seção, depois da lista. */
  fecho?: string[];
};

/**
 * /privacidade — política de privacidade (LGPD).
 *
 * Hero tipográfico de propósito: a página é texto legal, não tem foto própria
 * e não deveria pedir emprestada a de outra seção só para preencher o frame.
 * O conteúdo é data-driven (i18n: forms.privacidade.secoes), então as três
 * versões de idioma ficam com a mesma estrutura sem clonar JSX.
 */
export function PrivacidadePage() {
  const { t } = useTranslation("forms");

  useSeo({
    title: t("forms.privacidade.seoTitle"),
    description: t("forms.privacidade.seoDescription"),
    jsonLd: [
      breadcrumbSchema([
        { name: "Início", path: "/" },
        { name: "Política de Privacidade", path: "/privacidade" },
      ]),
    ],
  });

  const secoes = t("forms.privacidade.secoes", { returnObjects: true }) as Secao[];

  return (
    <Shell>
      {/* Hero tipográfico */}
      <section className="bg-navy-800 pt-28 pb-16 md:pt-36 md:pb-20">
        <Container>
          <div className="max-w-[760px]">
            <Eyebrow>{t("forms.privacidade.heroEyebrow")}</Eyebrow>
            <h1
              className="font-display mt-6 text-cream"
              style={{
                fontWeight: 500,
                fontSize: "clamp(36px, 5.2vw, 64px)",
                lineHeight: 1.05,
                letterSpacing: "-0.04em",
              }}
            >
              {t("forms.privacidade.heroTitle")}
            </h1>
            <p
              className="mt-7 max-w-[620px] font-display text-white/70"
              style={{ fontSize: "clamp(17px, 1.7vw, 21px)", lineHeight: 1.5 }}
            >
              {t("forms.privacidade.heroIntro")}
            </p>
            <Divider tone="light" className="mt-10" />
            <p className="mt-5 font-mono uppercase tracking-[0.14em] text-[12px] text-white/45">
              {t("forms.privacidade.atualizacaoLabel")} — {t("forms.privacidade.atualizacaoData")}
            </p>
          </div>
        </Container>
      </section>

      {/* Corpo — uma seção numerada por bloco */}
      <Section>
        <div className="flex flex-col">
          {secoes.map((secao, i) => (
            <article
              key={secao.titulo}
              className="grid gap-6 border-b border-white/10 py-10 first:pt-0 last:border-b-0 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-16 lg:py-14"
            >
              <div className="flex items-start gap-5 lg:sticky lg:top-24 lg:self-start">
                <span className="font-mono text-[13px] text-gold-700 leading-[1.9]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2
                  className="font-display text-white text-[21px] md:text-[24px]"
                  style={{ fontWeight: 500, lineHeight: 1.25, letterSpacing: "-0.02em" }}
                >
                  {secao.titulo}
                </h2>
              </div>

              {/* Medida de leitura: texto legal em coluna larga vira parede. */}
              <div className="flex max-w-[760px] flex-col gap-5">
                {secao.paragrafos?.map((p, j) => (
                  <p key={j} className="font-body text-white/70 text-[16px]" style={{ lineHeight: 1.75 }}>
                    {p}
                  </p>
                ))}

                {secao.itens && (
                  <ul className="flex flex-col gap-3">
                    {secao.itens.map((item, j) => (
                      <li key={j} className="flex items-start gap-4">
                        <span className="mt-[10px] size-1.5 shrink-0 rounded-full bg-gold-700" />
                        <span className="font-body text-white/70 text-[16px]" style={{ lineHeight: 1.65 }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {secao.fecho?.map((p, j) => (
                  <p key={j} className="font-body text-white/70 text-[16px]" style={{ lineHeight: 1.75 }}>
                    {p}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Canal do titular */}
      <Section tone="navy-800">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="flex flex-col gap-5">
            <Eyebrow>{t("forms.privacidade.canalEyebrow")}</Eyebrow>
            <SectionHeading tone="light">{t("forms.privacidade.canalHeading")}</SectionHeading>
          </div>
          <div className="flex flex-col items-start gap-6">
            <p className="font-body text-white/70 text-[17px]" style={{ lineHeight: 1.7 }}>
              {t("forms.privacidade.canalTexto")}
            </p>
            <div className="flex flex-col gap-2">
              <span className="font-mono uppercase tracking-[0.14em] text-[12px] text-cream">
                {t("forms.privacidade.canalEmailLabel")}
              </span>
              <a
                href={`mailto:${CONTATO.email}`}
                className="flex items-center gap-3 font-display text-white text-[20px] transition-colors hover:text-gold-600"
                style={{ fontWeight: 500 }}
              >
                <Mail className="size-5 text-gold-700" strokeWidth={1.6} />
                {CONTATO.email}
              </a>
            </div>
            <Button to="/contato" variant="outline-light" icon="arrow" className="mt-2">
              {t("forms.privacidade.canalBotao")}
            </Button>
          </div>
        </div>
      </Section>
    </Shell>
  );
}
