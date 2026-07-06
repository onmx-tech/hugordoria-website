import { useEffect } from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { Navbar } from "../components/sub/Navbar";
import { Footer } from "../components/sub/Footer";
import { PageHero } from "../components/sub/PageHero";
import { Eyebrow, SectionHeading, Divider, Button, Container } from "../components/sub/primitives";
import { HERO_IMG } from "../components/sub/heroImages";
import { cards } from "../components/section-especialidades/data";
import FloatingNav from "../components/FloatingNav";

const PROCESS = [
  { step: "01", title: "Avaliação", text: "Consulta detalhada, análise de exames e escuta atenta da sua história clínica." },
  { step: "02", title: "Diagnóstico", text: "Investigação precisa com tecnologia de imagem avançada e discussão multidisciplinar." },
  { step: "03", title: "Tratamento", text: "Plano individualizado — microcirurgia, endovascular ou radiocirurgia conforme o caso." },
  { step: "04", title: "Acompanhamento", text: "Reabilitação e seguimento próximo para garantir a melhor recuperação possível." },
];

export function EspecialidadesPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="flex min-h-screen flex-col bg-navy-600 font-body">
      <Navbar />
      <main className="flex-1">
        <PageHero
          eyebrow="Serviços de Neurocirurgia"
          title="Minhas Especialidades"
          intro="Tratamentos avançados em neurocirurgia vascular e oncológica, do diagnóstico à reabilitação, sempre aliando tecnologia de ponta ao cuidado humanizado."
          image="/v4/photos/retrato-empe.jpg"
          imageAlt="Dr. Hugo Doria, neurocirurgião"
          badge={{ value: String(cards.length).padStart(2, "0"), label: "Áreas de especialidade" }}
        />

        {/* Grid de especialidades */}
        <section className="bg-navy-800 py-20 md:py-28">
          <Container>
            <div className="grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((s) => {
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
                      Saiba mais
                      <ArrowRight className="size-5 text-gold-600 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                    </span>
                  </Link>
                );
              })}
              {/* fecha a grade (11 cards → 1 célula órfã no grid de 2/3 col);
                  sem isto, o gap-px deixa um retângulo claro do fundo aparecendo */}
              <div aria-hidden className="hidden bg-navy-800 sm:block" />
            </div>
          </Container>
        </section>

        {/* Processo */}
        <section className="bg-navy-600 py-20 md:py-28">
          <Container>
            <Eyebrow>Como funciona</Eyebrow>
            <SectionHeading tone="light" className="mt-5">Um processo de cuidado completo</SectionHeading>
            <Divider tone="light" className="mt-8" />
            <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
              {PROCESS.map((p) => (
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
            <SectionHeading tone="light" className="max-w-[720px]">Não encontrou a sua condição? Fale comigo.</SectionHeading>
            <p className="mt-5 max-w-[520px] font-display text-white/70 text-[19px]" style={{ lineHeight: 1.4 }}>
              Cada caso é único. Agende uma avaliação para discutirmos o tratamento ideal para a sua saúde neurológica.
            </p>
            <Button to="/contato" variant="gold" icon="chat" className="mt-8">Entre em Contato</Button>
          </Container>
        </section>
      </main>
      <Footer />
      <FloatingNav />
    </div>
  );
}
