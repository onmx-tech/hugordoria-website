import { useEffect } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { Navbar } from "../components/sub/Navbar";
import { Footer } from "../components/sub/Footer";
import FloatingNav from "../components/FloatingNav";
import { Eyebrow, Divider, Button, Container } from "../components/sub/primitives";
import { cards } from "../components/section-especialidades/data";
import { useSeo } from "../seo/useSeo";

/**
 * Rota inexistente. Antes disso, uma URL errada não casava nenhuma <Route> e
 * a página ficava em branco — pior cenário para quem chega de um link antigo
 * ou de busca. Aqui o visitante sempre encontra um caminho de volta.
 */
export function NotFoundPage() {
  const { t } = useTranslation("sub");
  useEffect(() => { window.scrollTo(0, 0); }, []);
  useSeo({
    title: t("sub.notFound.seo.title"),
    description: t("sub.notFound.seo.description"),
    noindex: true,
  });

  const atalhos = cards.slice(0, 6);

  return (
    <div className="flex min-h-screen flex-col bg-navy-600 font-body">
      <Navbar />
      <main className="flex-1">
        <section className="bg-navy-800 pt-28 pb-20 md:pt-36 md:pb-28">
          <Container>
            <div className="max-w-[720px]">
              <Eyebrow>{t("sub.notFound.eyebrow")}</Eyebrow>
              <h1
                className="font-display mt-6 text-white"
                style={{
                  fontWeight: 700,
                  fontSize: "clamp(38px, 6vw, 72px)",
                  lineHeight: 1.03,
                  letterSpacing: "-0.04em",
                }}
              >
                {t("sub.notFound.heading")}
                <span className="text-gold-600">.</span>
              </h1>
              <p
                className="mt-7 text-white/65"
                style={{ fontSize: 19, lineHeight: 1.65, maxWidth: 560 }}
              >
                {t("sub.notFound.text")}
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button to="/" variant="gold" icon="arrow">
                  {t("sub.notFound.btnHome")}
                </Button>
                <Button to="/contato" variant="outline-light">
                  {t("sub.notFound.btnTeam")}
                </Button>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-navy-600 py-20 md:py-24">
          <Container>
            <Eyebrow>{t("sub.notFound.suggestEyebrow")}</Eyebrow>
            <Divider />
            <ul className="mt-10 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
              {atalhos.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/especialidade/${c.slug}`}
                    className="group flex items-center justify-between gap-4 bg-navy-600 px-7 py-7 transition-colors duration-300 hover:bg-navy-800"
                  >
                    <span
                      className="font-display text-white"
                      style={{ fontWeight: 500, fontSize: 18, letterSpacing: "-0.02em" }}
                    >
                      {c.title}
                    </span>
                    <ArrowRight
                      className="size-5 shrink-0 text-gold-600 transition-transform duration-300 group-hover:translate-x-1"
                      strokeWidth={1.7}
                    />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Button to="/especialidades" variant="outline-light" icon="arrow">
                {t("sub.notFound.btnAll")}
              </Button>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
      <FloatingNav />
    </div>
  );
}
