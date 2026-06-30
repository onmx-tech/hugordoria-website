import { useEffect, useState, type ReactNode } from "react";
import {
  Award,
  BookOpen,
  Clock,
  GraduationCap,
  Mail,
  MapPin,
  Mic,
  Phone,
  Quote,
} from "lucide-react";
import { Navbar } from "../components/sub/Navbar";
import { Footer } from "../components/sub/Footer";
import FloatingNav from "../components/FloatingNav";
import { PageHero } from "../components/sub/PageHero";
import { Eyebrow, SectionHeading, Divider, Button, Container, Stat } from "../components/sub/primitives";
import { VideoFeature } from "../components/sub/VideoFeature";
import { VideoCard } from "../components/sub/VideoCard";
import { Reveal } from "../components/sub/Reveal";
import { ScrollRevealManifesto } from "../components/sub/ScrollRevealManifesto";
import { cards } from "../components/section-especialidades/data";
import {
  CONTATO,
  DEPOIMENTOS_GALERIA,
  DOUTORADO,
  EVENTOS,
  MIDIA_VIDEOS,
  PUBLICACOES,
  SOBRE_MIM,
} from "../content/institucional";

const STATS = [
  { value: "+20", label: "Anos de experiência" },
  { value: "+100", label: "Artigos publicados" },
  { value: "+9.500", label: "Casos de sucesso" },
];

// Casca compartilhada — navy + Navbar/Footer + scroll-to-top.
function Shell({ children }: { children: ReactNode }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="flex min-h-screen flex-col bg-navy-600 font-body">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingNav />
    </div>
  );
}

function Section({ children, tone = "navy" }: { children: ReactNode; tone?: "navy" | "navy-800" }) {
  return (
    <section className={`${tone === "navy-800" ? "bg-navy-800" : "bg-navy-600"} py-20 md:py-28`}>
      <Container>{children}</Container>
    </section>
  );
}

// ───────────────────────── /sobre-mim ─────────────────────────
export function SobreMimPage() {
  return (
    <Shell>
      <PageHero
        eyebrow="Sobre"
        title="Dr. Hugo Leonardo Doria-Netto"
        intro="MD, PhD — Neurocirurgião dedicado à neurocirurgia vascular, unindo precisão técnica, pesquisa avançada e um cuidado profundamente humano."
        image="/v4/photos/sobre-portrait.jpg"
        imageAlt="Dr. Hugo Doria"
        badge={{ value: "+20", label: "anos de experiência" }}
      />

      {/* 1. Prova rápida de credibilidade */}
      <Section tone="navy-800">
        <div className="grid gap-10 md:grid-cols-3">
          {STATS.map((s) => (
            <Stat key={s.label} value={s.value} label={s.label} tone="light" />
          ))}
        </div>
      </Section>

      {/* 2. Gancho — vídeo de apresentação (bg navy-600) */}
      <VideoFeature
        eyebrow="Conheça minha trajetória"
        title="Uma conversa sobre técnica, decisão e o cuidado com cada paciente."
        poster="/v4/videos/sobre-poster.jpg"
        src="/v4/videos/sobre.mp4"
        caption="Vídeo · Dr. Hugo Doria"
      />

      {/* 3. Bio / trajetória */}
      <Section tone="navy-800">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="flex flex-col gap-5 lg:sticky lg:top-24 lg:self-start">
            <Eyebrow>Trajetória</Eyebrow>
            <SectionHeading tone="light">Duas décadas dedicadas à microneurocirurgia de alta complexidade.</SectionHeading>
          </div>
          <div className="flex flex-col gap-5">
            {SOBRE_MIM.bio.map((p, i) => (
              <p key={i} className="font-body text-white/70 text-[clamp(15px,1.15vw,17px)]" style={{ lineHeight: 1.75 }}>{p}</p>
            ))}
          </div>
        </div>
      </Section>

      {/* 4. Pilares */}
      <Section>
        <Eyebrow>Pilares</Eyebrow>
        <SectionHeading tone="light" className="mt-5">Uma atuação em três frentes</SectionHeading>
        <Divider tone="light" className="mt-8" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {SOBRE_MIM.pilares.map((p, i) => {
            const Icon = [GraduationCap, BookOpen, Award][i] ?? Award;
            return (
              <div key={p.titulo} className="flex flex-col gap-5 rounded-2xl bg-white/[0.04] p-8">
                <Icon className="size-10 text-gold-700" strokeWidth={1.5} />
                <h3 className="font-display text-white text-[20px]" style={{ fontWeight: 500 }}>{p.titulo}</h3>
                <p className="font-body text-white/65 text-[15px]" style={{ lineHeight: 1.6 }}>{p.texto}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* 5. Formação internacional */}
      <Section tone="navy-800">
        <Eyebrow>Formação internacional</Eyebrow>
        <SectionHeading tone="light" className="mt-5">Treinamento nos maiores centros do mundo</SectionHeading>
        <Divider tone="light" className="mt-8" />
        <div className="mt-10 flex flex-col overflow-hidden rounded-2xl bg-white/[0.04]">
          {SOBRE_MIM.experienciaInternacional.map((e) => (
            <div key={e.titulo} className="flex flex-col gap-2 border-b border-white/10 p-6 last:border-b-0 md:flex-row md:items-center md:justify-between md:gap-8">
              <div>
                <h3 className="font-display text-white text-[17px]" style={{ fontWeight: 500 }}>{e.titulo}</h3>
                <p className="mt-1 font-body text-white/55 text-[15px]">{e.instituicao}</p>
              </div>
              <span className="shrink-0 font-mono text-gold-600 text-[13px]">{e.periodo}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* 5b. Galeria de retratos profissionais */}
      <Section>
        <Eyebrow>Retratos</Eyebrow>
        <SectionHeading tone="light" className="mt-5">O profissional por trás de cada cirurgia</SectionHeading>
        <Divider tone="light" className="mt-8" />
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {[
            "/v4/photos/retrato-sentado.jpg",
            "/v4/photos/retrato-empe.jpg",
            "/v4/photos/retrato-bracos.jpg",
            "/v4/photos/retrato-casual.jpg",
          ].map((src) => (
            <div key={src} className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-navy-800 ring-1 ring-white/10">
              <img src={src} alt="Dr. Hugo Doria" loading="lazy" className="absolute inset-0 size-full object-cover object-top transition-transform duration-[1.2s] ease-out hover:scale-105" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/40 to-transparent" />
            </div>
          ))}
        </div>
      </Section>

      {/* 6. Clímax — filosofia (scroll-reveal, bg navy-800) */}
      <ScrollRevealManifesto />

      {/* 7. Fechamento */}
      <Section>
        <blockquote className="mx-auto flex max-w-[840px] flex-col items-center gap-6 text-center">
          <Quote className="size-10 text-gold-600" strokeWidth={1.5} />
          <p className="font-display text-white text-[clamp(22px,2.8vw,34px)]" style={{ fontWeight: 500, lineHeight: 1.3 }}>
            {SOBRE_MIM.quote}
          </p>
        </blockquote>
      </Section>
    </Shell>
  );
}

// ───────────────────────── /doutorado ─────────────────────────
export function DoutoradoPage() {
  return (
    <Shell>
      <PageHero
        eyebrow="Doutorado"
        title="Tese de Doutorado em Neurociência"
        intro="Aneurismas cerebrais paraclinóideos: um protocolo inédito para distinguir, com exatidão, quais exigem tratamento — desenvolvido em quatro etapas."
        image="/v4/photos/doutorado-portrait.jpg"
        imageAlt="Dr. Hugo Doria"
        badge={{ value: "PhD", label: "UNIFESP" }}
      />

      <VideoFeature
        eyebrow="Sobre a pesquisa"
        title="A tese em quatro etapas, explicada."
        poster="/v4/videos/doutorado-poster.jpg"
        src="/v4/videos/doutorado.mp4"
        caption="Vídeo · Doutorado — UNIFESP"
      />

      <Section tone="navy-800">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
            <Eyebrow>A pesquisa</Eyebrow>
            <SectionHeading tone="light">Distinguir com exatidão para tratar com precisão.</SectionHeading>
            <Button href={DOUTORADO.pdf} variant="gold" icon="arrow" className="mt-2 self-start">Ler a tese (PDF)</Button>
          </div>
          <div className="flex flex-col gap-5">
            {DOUTORADO.paragrafos.map((p, i) => (
              <p key={i} className="font-body text-white/70 text-[clamp(15px,1.15vw,17px)]" style={{ lineHeight: 1.75 }}>{p}</p>
            ))}
          </div>
        </div>
      </Section>
    </Shell>
  );
}

// ───────────────────────── /publicacoes ─────────────────────────
export function PublicacoesPage() {
  return (
    <Shell>
      <PageHero
        eyebrow="Publicações"
        title="Produção científica"
        intro={PUBLICACOES.intro}
        image="/v4/photos/retrato-bracos.jpg"
        imageAlt="Publicações científicas"
        badge={{ value: "2022", label: "World Neurosurgery" }}
      />
      <Section>
        <div className="flex flex-col gap-6">
          <Eyebrow>Artigo em destaque</Eyebrow>
          <SectionHeading tone="light" className="max-w-[760px]">
            Quatro anos de pesquisa em uma revista de referência mundial.
          </SectionHeading>
          <Button href={PUBLICACOES.pdfArtigo} variant="gold" icon="arrow" className="mt-2 self-start">Ler o artigo científico</Button>
        </div>
      </Section>
      <Section tone="navy-800">
        <Eyebrow>Capítulos de livros</Eyebrow>
        <SectionHeading tone="light" className="mt-5">Contribuições em obras de referência</SectionHeading>
        <Divider tone="light" className="mt-8" />
        <div className="mt-10 flex flex-col overflow-hidden rounded-2xl bg-white/[0.04]">
          {SOBRE_MIM.capitulosDeLivros.map((c, i) => (
            <div key={i} className="flex items-start gap-5 border-b border-white/10 p-6 last:border-b-0">
              <span className="font-display text-gold-600 text-[18px] shrink-0" style={{ fontWeight: 400 }}>{String(i + 1).padStart(2, "0")}</span>
              <p className="font-body text-white/70 text-[15px]" style={{ lineHeight: 1.6 }}>{c}</p>
            </div>
          ))}
        </div>
      </Section>
    </Shell>
  );
}

// ───────────────────────── /eventos ─────────────────────────
export function EventosPage() {
  return (
    <Shell>
      <PageHero
        eyebrow="Eventos"
        title="Presença na comunidade neurocirúrgica"
        intro="20 anos de experiência compartilhados em congressos nacionais e internacionais, aulas para residentes e simpósios de neurocirurgia vascular."
        image="/v4/photos/palestra-podium.jpg"
        imageAlt="Palestra em congresso"
        badge={{ value: String(EVENTOS.length).padStart(2, "0"), label: "palestras e congressos" }}
      />
      <Section>
        <Eyebrow>Palestras &amp; congressos</Eyebrow>
        <Divider tone="light" className="mt-6" />
        <div className="mt-8 flex flex-col overflow-hidden rounded-2xl bg-white/[0.04]">
          {EVENTOS.map((e, i) => (
            <div key={i} className="flex items-start gap-5 border-b border-white/10 p-6 last:border-b-0">
              <Mic className="size-6 shrink-0 text-gold-700" strokeWidth={1.5} />
              <span className="font-body text-white/80 text-[16px]" style={{ lineHeight: 1.5 }}>{e}</span>
            </div>
          ))}
        </div>
      </Section>
    </Shell>
  );
}

// ───────────────────────── /midia ─────────────────────────
export function MidiaPage() {
  return (
    <Shell>
      <PageHero
        eyebrow="Mídia"
        title="Vídeos e aparições"
        intro="Entrevistas, aulas e conteúdos sobre neurocirurgia vascular, diagnóstico e tratamento das principais condições neurológicas."
        image="/v4/photos/palestra-podium.jpg"
        imageAlt="Mídia e vídeos"
        badge={{ value: String(MIDIA_VIDEOS.length).padStart(2, "0"), label: "vídeos" }}
      />
      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MIDIA_VIDEOS.map((id, i) => (
            <Reveal key={id} delay={(i % 3) * 0.08}>
              <VideoCard id={id} />
            </Reveal>
          ))}
        </div>
      </Section>
    </Shell>
  );
}

// ───────────────────────── /depoimentos ─────────────────────────
export function DepoimentosPage() {
  return (
    <Shell>
      <PageHero
        eyebrow="Depoimentos"
        title="Palavras que valem uma vida"
        intro="Mensagens reais de pacientes e familiares ao longo de duas décadas — o maior reconhecimento do trabalho."
        image="/v4/photos/retrato-sentado-sorrindo.jpg"
        imageAlt="Dr. Hugo Doria"
        badge={{ value: "+9.500", label: "casos de sucesso" }}
      />
      <Section>
        <div className="gap-5 sm:columns-2 lg:columns-3" style={{ columnFill: "balance" }}>
          {DEPOIMENTOS_GALERIA.map((src, i) => (
            <div key={i} className="mb-5 break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
              <img src={src} alt={`Depoimento ${i + 1}`} loading="lazy" className="w-full" />
            </div>
          ))}
        </div>
      </Section>
    </Shell>
  );
}

// ───────────────────────── /contato ─────────────────────────
const fieldClass =
  "w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 font-body text-[16px] text-white placeholder:text-white/40 outline-none transition-colors focus:border-gold-600";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-display text-white/80 text-[14px]" style={{ fontWeight: 500 }}>{label}</span>
      {children}
    </label>
  );
}

export function ContatoPage() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const texto = [
      "Olá, Dr. Hugo Doria! Gostaria de agendar uma avaliação.",
      `Nome: ${nome}`,
      telefone && `Telefone: ${telefone}`,
      email && `E-mail: ${email}`,
      assunto && `Assunto: ${assunto}`,
      mensagem && `Mensagem: ${mensagem}`,
    ].filter(Boolean).join("\n");
    window.open(`${CONTATO.whatsappLink}?text=${encodeURIComponent(texto)}`, "_blank", "noopener,noreferrer");
  }

  const INFO = [
    { icon: Phone, label: "WhatsApp", value: CONTATO.whatsapp, href: CONTATO.whatsappLink },
    { icon: Mail, label: "E-mail", value: CONTATO.email, href: `mailto:${CONTATO.email}` },
    { icon: MapPin, label: "Endereço", value: CONTATO.endereco, href: CONTATO.mapsLink },
    { icon: Clock, label: "Atendimento", value: "Seg. a Sex. — 08h às 18h", href: undefined as string | undefined },
  ];

  return (
    <Shell>
      <PageHero
        eyebrow="Contato"
        title="Vamos cuidar da sua saúde neurológica"
        intro="Preencha o formulário ou utilize um dos canais abaixo. Minha equipe responderá o mais breve possível para agendar a sua avaliação."
        image="/v4/photos/contato-portrait.jpg"
        imageAlt="Dr. Hugo Doria"
        badge={{ value: "24h", label: "Retorno do contato" }}
      />
      <Section>
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr]">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <Eyebrow>Canais de atendimento</Eyebrow>
              <SectionHeading tone="light">Fale diretamente comigo</SectionHeading>
            </div>
            <div className="grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2">
              {INFO.map((item) => {
                const inner = (
                  <div className="flex h-full flex-col gap-4 bg-navy-600 p-6">
                    <item.icon className="size-8 text-gold-700" strokeWidth={1.5} />
                    <div className="flex flex-col gap-1">
                      <span className="font-mono uppercase tracking-[0.14em] text-[12px] text-cream">{item.label}</span>
                      <span className="font-body text-white text-[16px]" style={{ lineHeight: 1.4 }}>{item.value}</span>
                    </div>
                  </div>
                );
                return item.href ? (
                  <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="transition-colors hover:bg-white/[0.03]">{inner}</a>
                ) : (
                  <div key={item.label}>{inner}</div>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl bg-white/[0.04] p-8 md:p-10">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Nome completo">
                  <input required type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Seu nome" className={fieldClass} />
                </Field>
                <Field label="Telefone">
                  <input type="tel" value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="(00) 00000-0000" className={fieldClass} />
                </Field>
              </div>
              <Field label="E-mail">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@email.com" className={fieldClass} />
              </Field>
              <Field label="Assunto">
                <select value={assunto} onChange={(e) => setAssunto(e.target.value)} className={`${fieldClass} appearance-none`}>
                  <option value="" className="bg-navy-800">Selecione a especialidade</option>
                  {cards.map((c) => (
                    <option key={c.slug} value={c.title} className="bg-navy-800">{c.title}</option>
                  ))}
                  <option value="Outro" className="bg-navy-800">Outro assunto</option>
                </select>
              </Field>
              <Field label="Mensagem">
                <textarea required rows={5} value={mensagem} onChange={(e) => setMensagem(e.target.value)} placeholder="Descreva brevemente o seu caso" className={`${fieldClass} resize-none`} />
              </Field>
              <Button type="submit" variant="gold" icon="chat" className="mt-2 w-full">Enviar mensagem</Button>
            </form>
          </div>
        </div>
      </Section>
    </Shell>
  );
}

// ───────────────────────── /localizacao ─────────────────────────
export function LocalizacaoPage() {
  return (
    <Shell>
      <PageHero
        eyebrow="Localização"
        title="Onde me encontrar"
        intro={CONTATO.endereco}
        image="/v4/photos/retrato-casual.jpg"
        imageAlt="Dr. Hugo Doria"
        badge={{ value: "SP", label: "Bela Vista" }}
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="flex flex-col gap-6">
            <Eyebrow>Consultório</Eyebrow>
            <SectionHeading tone="light">Bela Vista, São Paulo</SectionHeading>
            <p className="font-body text-white/70 text-[17px]" style={{ lineHeight: 1.6 }}>{CONTATO.endereco}</p>
            <div className="flex items-center gap-3">
              <Clock className="size-5 text-gold-700" strokeWidth={1.5} />
              <span className="font-mono text-white/60 text-[13px]">Seg. a Sex. — 08h às 18h</span>
            </div>
            <Button href={CONTATO.mapsLink} variant="gold" icon="arrow" className="mt-2 self-start">Abrir no Google Maps</Button>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <iframe
              title="Mapa do consultório"
              src={CONTATO.mapsEmbed}
              className="h-[420px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Section>
    </Shell>
  );
}
