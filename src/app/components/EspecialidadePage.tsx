import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate, Link } from "react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { cards } from "./section-especialidades/data";
import { getCard, getCards } from "./section-especialidades/cards-i18n";
import { getArticle } from "../content/especialidades";
import { useLocale } from "../i18n/LocaleProvider";
import { Navbar } from "./sub/Navbar";
import { Footer } from "./sub/Footer";
import FloatingNav from "./FloatingNav";
import { PageHero } from "./sub/PageHero";
import { Eyebrow, SectionHeading, Divider, Button, Container } from "./sub/primitives";
import { useSeo } from "../seo/useSeo";
import { breadcrumbSchema, medicalPageSchema, faqSchema } from "../seo/schema";
import { ChevronDown } from "lucide-react";
import FAQ_ESPECIALIDADES from "../content/faq/especialidades.json";
import { responsiveImg } from "@/lib/img";

// A figura de cada seção vem de `figureSrc` no conteúdo — ver o comentário do
// campo em `content/especialidades/types.ts`. Até 11/08/2026 era um sorteio por
// regex sobre a legenda, e ele colocava a MESMA imagem genérica em 9 das 10
// páginas, sob legendas clínicas diferentes. Seção sem `figureSrc` não desenha
// figura: é melhor não ter imagem do que ter a imagem de outra condição.
export default function EspecialidadePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation("seo");
  const { t: ts } = useTranslation("sub");
  const { locale } = useLocale();
  const card = slug ? getCard(slug, locale) : undefined;
  // Perguntas frequentes por condição (§8.3 do briefing). As respostas foram
  // extraídas do próprio artigo da página — nada de fato clínico novo. Sem
  // artigo (ex.: revascularização) simplesmente não há FAQ.
  const faq: Array<{ pergunta: string; resposta: string }> =
    (slug &&
      (FAQ_ESPECIALIDADES as Record<string, Record<string, Array<{ pergunta: string; resposta: string }>>>)[slug]?.[locale]) ||
    [];
  const article = slug ? getArticle(slug, locale) : undefined;

  const currentIndex = cards.findIndex((c) => c.slug === slug);
  const others = getCards(locale)
    .filter((c) => c.slug !== slug)
    .slice(0, 7);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  // SEO por especialidade — cada uma é a landing page de uma busca real
  // ("tratamento de aneurisma cerebral em São Paulo"). Chamado antes do early
  // return para manter a ordem dos hooks estável.
  useSeo(
    card
      ? {
          title: `${card.title}${t("seo.especialidade.titleSuffix")}`,
          description: article?.lead ?? card.description,
          image: `/v4/procedimentos/${card.slug}.jpg`,
          type: "article",
          // Especialidade sem artigo clínico ainda é só hero + CTA. Página
          // rasa indexada derruba a autoridade do domínio inteiro — fica fora
          // do índice até o texto existir (e volta sozinha quando existir).
          noindex: !article,
          jsonLd: [
            ...(faq.length
              ? [faqSchema(faq.map((f) => ({ question: f.pergunta, answer: f.resposta })))]
              : []),
            medicalPageSchema({
              name: card.title,
              description: article?.lead ?? card.description,
              path: `/especialidade/${card.slug}`,
              image: `/v4/procedimentos/${card.slug}.jpg`,
              conditionName: card.title,
            }),
            breadcrumbSchema([
              { name: ts("sub.especialidadeDetalhe.breadcrumbInicio"), path: "/" },
              { name: ts("sub.especialidadeDetalhe.breadcrumbEspecialidades"), path: "/especialidades" },
              { name: card.title, path: `/especialidade/${card.slug}` },
            ]),
          ],
        }
      : { title: ts("sub.especialidadeDetalhe.naoEncontrada"), noindex: true },
  );

  if (!card) {
    return (
      <div className="flex min-h-screen flex-col bg-navy-600 font-body">
        <Navbar />
        <main className="flex flex-1 flex-col items-center justify-center gap-6 py-32">
          <p className="font-display text-white/70" style={{ fontSize: 18 }}>{ts("sub.especialidadeDetalhe.naoEncontrada")}</p>
          <Button to="/" variant="outline-light">{ts("sub.especialidadeDetalhe.voltarInicio")}</Button>
        </main>
        <Footer />
      </div>
    );
  }

  const lead = article?.lead ?? card.description;
  const sections = article?.sections ?? [];

  const figuras = useMemo(
    () => sections.map((s) => (s.figureSrc ? `/v4/figuras/${s.figureSrc}.jpg` : null)),
    [sections],
  );

  return (
    <div className="flex min-h-screen flex-col bg-navy-600 font-body">
      <Navbar />
      <main className="flex-1">
        <PageHero
          eyebrow={ts("sub.especialidadeDetalhe.eyebrow")}
          title={card.title}
          intro={lead}
          image={`/v4/procedimentos/${card.slug}.jpg`}
          imageAlt={card.title}
          badge={article?.readingTime ? { value: String(currentIndex + 1).padStart(2, "0"), label: ts("sub.especialidadeDetalhe.badgeLabel", { total: String(cards.length).padStart(2, "0") }) } : undefined}
        >
          <button
            type="button"
            onClick={() => navigate("/#especialidades")}
            className="mt-8 inline-flex items-center gap-2 font-display text-white/70 text-[14px] transition-colors hover:text-gold-600"
            style={{ fontWeight: 500, background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            <ArrowLeft className="size-4" strokeWidth={1.7} />
            {ts("sub.especialidadeDetalhe.todasEspecialidades")}
          </button>
        </PageHero>

        <section className="bg-navy-600 py-20 md:py-28">
          <Container>
            <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr]">
              {/* Conteúdo principal */}
              <div className="flex flex-col gap-16">
                {/* Marca da especialidade — a imagem da própria condição, no
                    lugar do ícone genérico que existia aqui (4 símbolos para 11
                    condições). Mesma fonte dos cards e do hero: a série
                    `procedimentos`, resolvida pelo slug. */}
                <span className="block size-11 shrink-0 overflow-hidden">
                  <img
                    {...responsiveImg(`/v4/procedimentos/${card.slug}.jpg`, "44px")}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </span>

                {/* Fallback quando não há artigo estruturado */}
                {sections.length === 0 && (
                  <div className="flex flex-col gap-4">
                    <Eyebrow>{ts("sub.especialidadeDetalhe.visaoGeral")}</Eyebrow>
                    <p className="font-body text-white/80 text-[clamp(18px,2vw,22px)]" style={{ lineHeight: 1.55 }}>
                      {card.detailedDescription || card.description}
                    </p>
                  </div>
                )}

                {/* Seções do artigo */}
                {sections.map((s, si) => (
                  <article key={s.id} id={s.id} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                      <Eyebrow>{`${String(si + 1).padStart(2, "0")} — ${(s.tocLabel ?? s.heading).toUpperCase()}`}</Eyebrow>
                      <SectionHeading tone="light" className="text-[clamp(24px,2.6vw,34px)]">{s.heading}</SectionHeading>
                    </div>
                    <Divider tone="light" />
                    <div className="flex flex-col gap-5">
                      {s.paragraphs.map((p, i) => (
                        <p key={i} className="font-body text-white/70 text-[clamp(15px,1.15vw,17px)]" style={{ lineHeight: 1.75 }}>{p}</p>
                      ))}
                    </div>

                    {/* sintomas → check-grid */}
                    {s.bullets && s.bullets.length > 0 && (
                      <ul className="mt-2 grid gap-4 sm:grid-cols-2">
                        {s.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-3 rounded-xl bg-white/[0.04] px-5 py-4">
                            <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-gold-600/20">
                              <Check className="size-3.5 text-gold-600" strokeWidth={2.5} />
                            </span>
                            <span className="font-body text-white/80 text-[16px]" style={{ lineHeight: 1.45 }}>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* tratamento → lista numerada */}
                    {s.options && s.options.length > 0 && (
                      <div className="mt-2 flex flex-col">
                        {s.options.map((o, i) => (
                          <div key={i} className="flex items-start gap-5 border-b border-white/10 py-6 last:border-b-0">
                            <span className="font-display text-gold-600 text-[26px] shrink-0" style={{ fontWeight: 400, lineHeight: 1 }}>
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <div>
                              <h3 className="font-display text-white text-[18px]" style={{ fontWeight: 500 }}>{o.title}</h3>
                              <p className="mt-2 font-body text-white/65 text-[15px]" style={{ lineHeight: 1.6 }}>{o.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* figura */}
                    {s.figureCaption && figuras[si] && (
                      <figure className="mt-2 m-0">
                        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-navy-800 ring-1 ring-white/10">
                          <img
                            {...responsiveImg(figuras[si]!, "(max-width: 1024px) 100vw, 720px")}
                            alt={s.figureCaption}
                            loading="lazy"
                            className="absolute inset-0 size-full object-cover"
                          />
                        </div>
                        <figcaption className="mt-3 font-mono uppercase tracking-[0.16em] text-mist text-[11px]">
                          {s.figureCaption}
                        </figcaption>
                      </figure>
                    )}

                    {/* pull-quote */}
                    {article?.quote && article.quote.afterSectionId === s.id && (
                      <blockquote className="mt-4 rounded-2xl bg-white/[0.05] p-8 md:p-10">
                        <p className="font-display text-white text-[clamp(20px,2.4vw,30px)]" style={{ fontWeight: 500, lineHeight: 1.25 }}>
                          “{article.quote.emphasis && article.quote.text.includes(article.quote.emphasis) ? (
                            <>
                              {article.quote.text.split(article.quote.emphasis)[0]}
                              <span className="text-gold-600">{article.quote.emphasis}</span>
                              {article.quote.text.split(article.quote.emphasis)[1]}
                            </>
                          ) : article.quote.text}”
                        </p>
                      </blockquote>
                    )}
                  </article>
                ))}

                {/* CTA */}
                <div className="rounded-2xl bg-white/[0.05] p-8 md:p-10">
                  <SectionHeading tone="light" className="text-[clamp(22px,2.2vw,26px)]">{ts("sub.especialidadeDetalhe.ctaHeading")}</SectionHeading>
                  <p className="mt-3 max-w-[460px] font-body text-white/70 text-[17px]" style={{ lineHeight: 1.5 }}>
                    {ts("sub.especialidadeDetalhe.ctaText")}
                  </p>
                  <Button href="https://wa.me/5511971622777" variant="gold" icon="chat" className="mt-6">{ts("sub.especialidadeDetalhe.ctaButton")}</Button>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="flex flex-col gap-10 lg:sticky lg:top-24 lg:self-start">
                {article?.heroMeta && article.heroMeta.length > 0 && (
                  <div className="flex flex-col gap-5">
                    <Eyebrow>{ts("sub.especialidadeDetalhe.fichaRapida")}</Eyebrow>
                    <div className="flex flex-col overflow-hidden rounded-2xl bg-white/[0.04]">
                      {article.heroMeta.map((m) => (
                        <div key={m.label} className="border-b border-white/10 px-5 py-4 last:border-b-0">
                          <span className="block font-mono uppercase tracking-[0.16em] text-mist text-[11px]">{m.label}</span>
                          <span className="mt-1 block font-display text-white text-[16px]" style={{ fontWeight: 500 }}>{m.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {faq.length > 0 && (
                  <div className="flex flex-col gap-5">
                    <Eyebrow>{ts("sub.especialidadeDetalhe.faqEyebrow")}</Eyebrow>
                    <div className="flex flex-col overflow-hidden rounded-2xl bg-white/[0.04]">
                      {faq.map((item) => (
                        <details key={item.pergunta} className="group border-b border-white/10 last:border-b-0">
                          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-5 transition-colors hover:bg-white/[0.03]">
                            <h3 className="font-display text-white text-[15px] leading-[1.35]" style={{ fontWeight: 500 }}>
                              {item.pergunta}
                            </h3>
                            <ChevronDown className="mt-0.5 size-4 shrink-0 text-gold-600 transition-transform duration-300 group-open:rotate-180" strokeWidth={1.7} />
                          </summary>
                          <p className="px-5 pb-5 font-body text-white/65 text-[14px]" style={{ lineHeight: 1.7 }}>
                            {item.resposta}
                          </p>
                        </details>
                      ))}
                    </div>
                    {/* O schema FAQPage faz o Google exibir UMA resposta isolada
                        como resultado rico, fora da página — sem o rodapé e sem
                        o aviso de que o site não substitui consulta. A nota
                        viaja junto com a resposta e fecha essa exposição. */}
                    <p className="font-body text-[12px] leading-[1.55] text-white/40">
                      {ts("sub.especialidadeDetalhe.faqNota")}
                    </p>
                  </div>
                )}

                <div className="flex flex-col gap-5">
                  <Eyebrow>{ts("sub.especialidadeDetalhe.outrasEspecialidades")}</Eyebrow>
                  <div className="flex flex-col overflow-hidden rounded-2xl bg-white/[0.04]">
                    {others.map((c) => {
                      return (
                        <Link key={c.slug} to={`/especialidade/${c.slug}`} className="group flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 transition-colors last:border-b-0 hover:bg-white/[0.06]">
                          {/* Sem miniatura aqui: a 20px a arte da série vira
                              mancha escura e não identifica nada. Numa lista de
                              links, o nome basta. */}
                          <span className="font-display text-white/85 text-[15px]" style={{ fontWeight: 400 }}>{c.title}</span>
                          <ArrowRight className="size-4 text-gold-600 transition-transform group-hover:translate-x-1" strokeWidth={1.7} />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </aside>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
      <FloatingNav />
    </div>
  );
}
