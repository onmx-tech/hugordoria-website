import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Navbar } from "../components/sub/Navbar";
import { Footer } from "../components/sub/Footer";
import { PageHero } from "../components/sub/PageHero";
import { Eyebrow, SectionHeading, Divider, Button, Container } from "../components/sub/primitives";
import { HERO_IMG } from "../components/sub/heroImages";
import { getCards } from "../components/section-especialidades/cards-i18n";
import { FAMILIES, cardsByFamily } from "../components/section-especialidades/data";
import { LocaleLink as Link, useLocale } from "../i18n/LocaleProvider";
import { useTranslation } from "react-i18next";
import FloatingNav from "../components/FloatingNav";
import { useSeo } from "../seo/useSeo";
import { breadcrumbSchema } from "../seo/schema";

type ProcessStep = { step: string; title: string; text: string };

export function EspecialidadesPage() {
  const { locale } = useLocale();
  const { t } = useTranslation("sub");
  const cards = getCards(locale);
  const process = t("sub.especialidades.processo.steps", {
    returnObjects: true,
  }) as ProcessStep[];
  useEffect(() => { window.scrollTo(0, 0); }, []);
  useSeo({
    title: t("sub.especialidades.seo.title"),
    description: t("sub.especialidades.seo.description"),
    image: "/v4/photos/retrato-empe.jpg",
    jsonLd: [
      breadcrumbSchema([
        { name: t("sub.especialidades.breadcrumb.inicio"), path: "/" },
        { name: t("sub.especialidades.breadcrumb.especialidades"), path: "/especialidades" },
      ]),
    ],
  });

  return (
    <div className="flex min-h-screen flex-col bg-navy-600 font-body">
      <Navbar />
      <main className="flex-1">
        <PageHero
          eyebrow={t("sub.especialidades.hero.eyebrow")}
          title={t("sub.especialidades.hero.title")}
          intro={t("sub.especialidades.hero.intro")}
          image="/v4/photos/retrato-empe.jpg"
          imageAlt={t("sub.especialidades.hero.imageAlt")}
          badge={{ value: String(cards.length).padStart(2, "0"), label: t("sub.especialidades.hero.badgeLabel") }}
        />

        {/* Grade por família clínica — o paciente chega sabendo o sintoma, não o
            nome da doença; o agrupamento é o que o orienta. Cada família é um
            <h2>, e os cards descem para <h3>: hierarquia semântica real. */}
        <section className="bg-navy-800 py-20 md:py-28">
          <Container className="flex flex-col gap-20 md:gap-24">
            {FAMILIES.map((family) => {
              const group = cardsByFamily(cards, family);
              if (!group.length) return null;
              // A grade é de 3 colunas; a última linha incompleta deixaria o fundo
              // aparecendo através do gap-px. Fechamos com células mudas.
              const filler = (3 - (group.length % 3)) % 3;
              return (
                <div key={family}>
                  <Eyebrow>{`0${FAMILIES.indexOf(family) + 1}`}</Eyebrow>
                  <h2 className="mt-5 font-display text-white text-[30px] tracking-[-0.02em] md:text-[38px]" style={{ fontWeight: 400, lineHeight: 1.1 }}>
                    {t(`sub.especialidades.familias.${family}.title`)}
                  </h2>
                  <p className="mt-4 max-w-[620px] font-body text-white/65 text-[17px]" style={{ lineHeight: 1.55 }}>
                    {t(`sub.especialidades.familias.${family}.intro`)}
                  </p>
                  <Divider tone="light" className="mt-8" />

                  <div className="mt-10 grid gap-px overflow-hidden bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
                    {group.map((s) => {
                      const Icon = s.icon;
                      return (
                        <Link
                          key={s.slug}
                          to={`/especialidade/${s.slug}`}
                          className="group flex flex-col gap-8 bg-navy-800 p-8 transition-colors hover:bg-white/[0.04]"
                        >
                          <span className="block [&>svg]:h-full [&>svg]:w-full" style={{ width: 48, height: 48 }}><Icon /></span>
                          <div className="flex flex-col gap-3">
                            <h3 className="font-display text-white text-[22px]" style={{ fontWeight: 500 }}>{s.title}</h3>
                            <p className="font-body text-white/70 text-[16px]" style={{ lineHeight: 1.55 }}>{s.description}</p>
                          </div>
                          <span className="mt-auto inline-flex items-center gap-2 font-display text-white text-[14px]" style={{ fontWeight: 600 }}>
                            {t("sub.common.saibaMais")}
                            <ArrowRight className="size-5 text-gold-600 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                          </span>
                        </Link>
                      );
                    })}
                    {Array.from({ length: filler }, (_, i) => (
                      <div key={`filler-${i}`} aria-hidden className="hidden bg-navy-800 sm:block" />
                    ))}
                  </div>
                </div>
              );
            })}
          </Container>
        </section>

        {/* Processo */}
        <section className="bg-navy-600 py-20 md:py-28">
          <Container>
            <Eyebrow>{t("sub.especialidades.processo.eyebrow")}</Eyebrow>
            <SectionHeading tone="light" className="mt-5">{t("sub.especialidades.processo.heading")}</SectionHeading>
            <Divider tone="light" className="mt-8" />
            <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
              {process.map((p) => (
                <div key={p.step} className="flex flex-col gap-4">
                  <span className="font-display text-gold-600 text-[40px] tracking-[-0.03em]" style={{ fontWeight: 400 }}>{p.step}</span>
                  <h3 className="font-display text-white text-[20px]" style={{ fontWeight: 500 }}>{p.title}</h3>
                  <p className="font-body text-white/65 text-[16px]" style={{ lineHeight: 1.5 }}>{p.text}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-b from-navy-800 to-navy-900 py-20 md:py-28">
          <Container className="flex flex-col items-center text-center">
            <SectionHeading tone="light" className="max-w-[720px]">{t("sub.especialidades.cta.heading")}</SectionHeading>
            <p className="mt-5 max-w-[520px] font-display text-white/70 text-[19px]" style={{ lineHeight: 1.4 }}>
              {t("sub.especialidades.cta.text")}
            </p>
            <Button to="/contato" variant="gold" icon="chat" className="mt-8">{t("sub.especialidades.cta.button")}</Button>
          </Container>
        </section>
      </main>
      <Footer />
      <FloatingNav />
    </div>
  );
}
