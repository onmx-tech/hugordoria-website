import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { findCardBySlug, cards } from "./section-especialidades/data";
import { findArticleBySlug } from "../content/especialidades";
import { Navbar } from "./sub/Navbar";
import { Footer } from "./sub/Footer";
import FloatingNav from "./FloatingNav";
import { PageHero } from "./sub/PageHero";
import { Eyebrow, SectionHeading, Divider, Button, Container } from "./sub/primitives";

// Figuras médicas Magnific (navy). Escolhe por palavra-chave da legenda;
// fallback rotativo pelo índice da seção pra variar entre as imagens.
const FIGURAS = ["angiografia", "mri", "reconstrucao3d", "microscopio"] as const;
function figuraFor(caption: string, idx: number): string {
  const c = caption.toLowerCase();
  let key: string = FIGURAS[idx % FIGURAS.length];
  if (/angiograf|vascul|arteri|fluxo|bypass/.test(c)) key = "angiografia";
  else if (/resson|rm\b|mri|tomograf|imagem|scan/.test(c)) key = "mri";
  else if (/microcirurg|cirúrg|clipagem|microsc|intraoper/.test(c)) key = "microscopio";
  else if (/3d|reconstru|anatom|lesão|tumor|nidus|represent/.test(c)) key = "reconstrucao3d";
  return `/v4/figuras/${key}.jpg`;
}

export default function EspecialidadePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const card = slug ? findCardBySlug(slug) : undefined;
  const article = slug ? findArticleBySlug(slug) : undefined;

  const currentIndex = cards.findIndex((c) => c.slug === slug);
  const others = cards.filter((c) => c.slug !== slug).slice(0, 7);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!card) {
    return (
      <div className="flex min-h-screen flex-col bg-navy-600 font-body">
        <Navbar />
        <main className="flex flex-1 flex-col items-center justify-center gap-6 py-32">
          <p className="font-display text-white/70" style={{ fontSize: 18 }}>Especialidade não encontrada.</p>
          <Button to="/" variant="outline-light">Voltar ao início</Button>
        </main>
        <Footer />
      </div>
    );
  }

  const Icon = card.icon;
  const lead = article?.lead ?? card.description;
  const sections = article?.sections ?? [];

  return (
    <div className="flex min-h-screen flex-col bg-navy-600 font-body">
      <Navbar />
      <main className="flex-1">
        <PageHero
          eyebrow="Especialidade"
          title={card.title}
          intro={lead}
          image={`/v4/procedimentos/${card.slug}.jpg`}
          imageAlt={card.title}
          badge={article?.readingTime ? { value: String(currentIndex + 1).padStart(2, "0"), label: `de ${String(cards.length).padStart(2, "0")} especialidades` } : undefined}
        >
          <button
            type="button"
            onClick={() => navigate("/#especialidades")}
            className="mt-8 inline-flex items-center gap-2 font-display text-white/70 text-[14px] transition-colors hover:text-gold-600"
            style={{ fontWeight: 500, background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            <ArrowLeft className="size-4" strokeWidth={1.7} />
            Todas as especialidades
          </button>
        </PageHero>

        <section className="bg-navy-600 py-20 md:py-28">
          <Container>
            <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr]">
              {/* Conteúdo principal */}
              <div className="flex flex-col gap-16">
                {/* Marca da especialidade (o intro vem do hero; a 1ª seção é a visão geral) */}
                <span className="block [&>svg]:h-full [&>svg]:w-full" style={{ width: 44, height: 44 }}><Icon /></span>

                {/* Fallback quando não há artigo estruturado */}
                {sections.length === 0 && (
                  <div className="flex flex-col gap-4">
                    <Eyebrow>Visão geral</Eyebrow>
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
                    {s.figureCaption && (
                      <figure className="mt-2 m-0">
                        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-navy-800 ring-1 ring-white/10">
                          <img
                            src={figuraFor(s.figureCaption, si)}
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
                  <SectionHeading tone="light" className="text-[clamp(22px,2.2vw,26px)]">Tem dúvidas sobre o seu caso?</SectionHeading>
                  <p className="mt-3 max-w-[460px] font-body text-white/70 text-[17px]" style={{ lineHeight: 1.5 }}>
                    Agende uma avaliação para discutirmos o diagnóstico e o melhor caminho de tratamento.
                  </p>
                  <Button href="https://wa.me/5511971622777" variant="gold" icon="chat" className="mt-6">Entre em Contato</Button>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="flex flex-col gap-10 lg:sticky lg:top-24 lg:self-start">
                {article?.heroMeta && article.heroMeta.length > 0 && (
                  <div className="flex flex-col gap-5">
                    <Eyebrow>Ficha rápida</Eyebrow>
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

                <div className="flex flex-col gap-5">
                  <Eyebrow>Outras especialidades</Eyebrow>
                  <div className="flex flex-col overflow-hidden rounded-2xl bg-white/[0.04]">
                    {others.map((c) => {
                      const OIcon = c.icon;
                      return (
                        <Link key={c.slug} to={`/especialidade/${c.slug}`} className="group flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 transition-colors last:border-b-0 hover:bg-white/[0.06]">
                          <span className="flex items-center gap-3">
                            <span className="block shrink-0 [&>svg]:h-full [&>svg]:w-full" style={{ width: 20, height: 20 }}><OIcon /></span>
                            <span className="font-display text-white/85 text-[15px]" style={{ fontWeight: 400 }}>{c.title}</span>
                          </span>
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
