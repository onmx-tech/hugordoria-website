import SubPage from "../components/SubPage";
import imgRetrato from "@/assets/e25bc4f66b4a426ccf342bc9c87ec2d3e73f4b1a.png";
import {
  CONTATO,
  DEPOIMENTOS_GALERIA,
  DOUTORADO,
  EVENTOS,
  MIDIA_VIDEOS,
  PUBLICACOES,
  SOBRE_MIM,
  SOCIAL,
} from "../content/institucional";

const STATS = [
  { value: "+ 20", label: "Anos de Experiência" },
  { value: "+100", label: "Artigos Publicados" },
  { value: "+ 9.500", label: "Casos de Sucesso" },
] as const;

// ── blocos compartilhados ──────────────────────────────────────────

function Section({
  children,
  tone = "deeper",
  first = false,
  flush = false,
}: {
  children: React.ReactNode;
  tone?: "deeper" | "darkest" | "cream";
  first?: boolean;
  flush?: boolean;
}) {
  const bg =
    tone === "cream"
      ? "var(--color-bg-cream)"
      : tone === "darkest"
        ? "var(--color-bg-darkest)"
        : "var(--color-bg-deeper)";
  return (
    <section
      data-section-reveal
      className="relative w-full"
      style={{
        background: bg,
        paddingTop: first ? "clamp(72px, 10vh, 120px)" : "clamp(56px, 8vh, 100px)",
        paddingBottom: "clamp(72px, 10vh, 120px)",
      }}
    >
      <div className={flush ? "" : "px-6 md:px-12 lg:px-16"}>{children}</div>
    </section>
  );
}

function SectionHeader({
  index,
  label,
  dark = false,
}: {
  index: string;
  label: string;
  dark?: boolean;
}) {
  return (
    <div data-reveal className="flex items-baseline justify-between" style={{ marginBottom: "clamp(36px, 5vh, 56px)" }}>
      <div className="flex items-center gap-4">
        <span
          className={`font-['Geist_Mono',sans-serif] ${dark ? "text-navy/40" : "text-gold-light/50"}`}
          style={{ fontSize: 12 }}
        >
          {index}
        </span>
        <span
          className={`font-['Geist_Mono',sans-serif] uppercase tracking-[0.22em] ${dark ? "text-navy/60" : "text-gold-light/70"}`}
          style={{ fontSize: 11 }}
        >
          {label}
        </span>
      </div>
      <span
        aria-hidden
        className="hidden md:block flex-1"
        style={{
          height: 1,
          background: dark ? "rgba(26,41,63,0.15)" : "rgba(255,255,255,0.08)",
          marginLeft: 32,
        }}
      />
    </div>
  );
}

function Paragraphs({ items, dark = false }: { items: readonly string[]; dark?: boolean }) {
  return (
    <div className="flex flex-col" style={{ gap: 22, maxWidth: 760 }}>
      {items.map((p, i) => (
        <p
          key={i}
          data-reveal
          className={`font-['Geist',sans-serif] ${dark ? "text-navy/75" : "text-cream/60"}`}
          style={{ margin: 0, fontSize: "clamp(15px, 1.1vw, 17px)", lineHeight: 1.8 }}
        >
          {p}
        </p>
      ))}
    </div>
  );
}

function LeadParagraph({ children, dark = false }: { children: string; dark?: boolean }) {
  return (
    <p
      data-reveal
      className={`font-['Arimo',sans-serif] ${dark ? "text-navy" : "text-cream/85"}`}
      style={{
        margin: 0,
        marginBottom: "clamp(32px, 5vh, 48px)",
        fontSize: "clamp(21px, 2.1vw, 32px)",
        lineHeight: 1.4,
        letterSpacing: "-0.015em",
        maxWidth: 880,
      }}
    >
      {children}
    </p>
  );
}

function DocumentCard({
  href,
  kicker,
  title,
}: {
  href: string;
  kicker: string;
  title: string;
}) {
  return (
    <a
      data-reveal
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/doc relative flex flex-col justify-between overflow-hidden"
      style={{
        minHeight: 200,
        padding: "28px 28px 24px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: 16,
        textDecoration: "none",
        transition: "background 0.35s ease, border-color 0.35s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.07)";
        e.currentTarget.style.borderColor = "color-mix(in srgb, var(--color-accent-gold-light) 45%, transparent)";
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div className="flex items-start justify-between gap-6">
        <span
          className="font-['Geist_Mono',sans-serif] uppercase tracking-[0.2em] text-gold-light/70"
          style={{ fontSize: 10 }}
        >
          {kicker}
        </span>
        <span
          aria-hidden
          className="font-['Geist',sans-serif] text-cream/40 transition-all duration-300 group-hover/doc:text-gold-light group-hover/doc:translate-x-1 group-hover/doc:-translate-y-1"
          style={{ fontSize: 18 }}
        >
          ↗
        </span>
      </div>
      <p
        className="font-['Arimo',sans-serif] text-cream"
        style={{
          margin: 0,
          marginTop: 36,
          fontSize: "clamp(18px, 1.5vw, 24px)",
          lineHeight: 1.3,
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </p>
    </a>
  );
}

function EventRows({ items }: { items: readonly string[] }) {
  return (
    <div className="flex flex-col" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      {items.map((item, i) => (
        <div
          key={i}
          data-reveal
          className="group/ev grid grid-cols-[auto_1fr_auto] items-center gap-6 lg:gap-10"
          style={{
            padding: "26px 0",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <span
            className="font-['Arimo',sans-serif] shrink-0 transition-colors duration-300"
            style={{
              fontSize: "clamp(28px, 3vw, 48px)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              color: "transparent",
              WebkitTextStroke: "1px rgba(212,175,55,0.35)",
              width: "clamp(52px, 5vw, 84px)",
            }}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <span
            className="font-['Geist',sans-serif] text-cream/70 transition-colors duration-300 group-hover/ev:text-cream"
            style={{ fontSize: "clamp(16px, 1.25vw, 21px)", lineHeight: 1.45 }}
          >
            {item}
          </span>
          <span
            aria-hidden
            className="hidden md:inline font-['Geist',sans-serif] text-gold-light/0 transition-all duration-300 group-hover/ev:text-gold-light group-hover/ev:translate-x-1"
            style={{ fontSize: 20 }}
          >
            →
          </span>
        </div>
      ))}
    </div>
  );
}

// ── /sobre-mim ─────────────────────────────────────────────────────

export function SobreMimPage() {
  return (
    <SubPage
      eyebrow="Sobre mim"
      title="A neurocirurgia como vocação"
      lead="Dr. Hugo Leonardo Doria-Netto, MD PhD — especialista em neurocirurgia vascular, confiado por mais de 9.500 pacientes."
      meta="São Paulo — Brasil"
      watermark="HD"
    >
      {/* Retrato + citação sobreposta */}
      <Section first flush>
        <div className="px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-0 items-stretch">
            <div
              data-reveal
              className="relative lg:col-span-7 overflow-hidden rounded-2xl"
              style={{ minHeight: 420 }}
            >
              <img
                src={imgRetrato}
                alt="Dr. Hugo Doria em seu consultório"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(35deg, rgba(13,26,45,0.55) 0%, transparent 55%)",
                }}
              />
            </div>

            <div className="lg:col-span-5 flex items-center">
              <blockquote
                data-reveal
                className="relative lg:-ml-16 rounded-2xl"
                style={{
                  margin: 0,
                  padding: "clamp(32px, 4vw, 56px)",
                  background: "var(--color-bg-deep, #16263f)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 32px 80px -24px rgba(0,0,0,0.55)",
                }}
              >
                <span
                  aria-hidden
                  className="block font-['Arimo',sans-serif] text-gold-light"
                  style={{ fontSize: 56, lineHeight: 0.6, marginBottom: 24 }}
                >
                  “
                </span>
                <p
                  className="font-['Arimo',sans-serif] text-cream"
                  style={{
                    margin: 0,
                    fontSize: "clamp(19px, 1.7vw, 26px)",
                    lineHeight: 1.45,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {SOBRE_MIM.quote}
                </p>
                <p
                  className="font-['Geist',sans-serif] text-cream/40"
                  style={{ margin: 0, marginTop: 24, fontSize: 14 }}
                >
                  Dr. Hugo Leonardo Doria-Netto, MD PhD
                </p>
              </blockquote>
            </div>
          </div>

          {/* Stats band */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3"
            style={{
              marginTop: "clamp(56px, 8vh, 96px)",
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {STATS.map((s, i) => (
              <div
                key={s.label}
                data-reveal
                className="flex flex-col gap-2"
                style={{
                  padding: "32px clamp(0px, 2vw, 40px)",
                  borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.08)" : "none",
                }}
              >
                <span
                  className="font-['Arimo',sans-serif] text-gold-light"
                  style={{
                    fontSize: "clamp(40px, 4.5vw, 64px)",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {s.value}
                </span>
                <span
                  className="font-['Geist_Mono',sans-serif] uppercase tracking-[0.18em] text-cream/40"
                  style={{ fontSize: 11 }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Pilares */}
      <Section tone="darkest">
        <SectionHeader index="01" label="Pilares" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "rgba(255,255,255,0.08)" }}>
          {SOBRE_MIM.pilares.map((p, i) => (
            <div
              key={p.titulo}
              data-reveal
              className="flex flex-col justify-between"
              style={{
                minHeight: 260,
                padding: "32px 28px",
                background: "var(--color-bg-darkest)",
              }}
            >
              <span
                className="font-['Arimo',sans-serif]"
                style={{
                  fontSize: 44,
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(212,175,55,0.4)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3
                  className="font-['Arimo',sans-serif] text-cream"
                  style={{ margin: 0, fontWeight: 400, fontSize: 21, letterSpacing: "-0.01em" }}
                >
                  {p.titulo}
                </h3>
                <p
                  className="font-['Geist',sans-serif] text-cream/50"
                  style={{ margin: 0, marginTop: 12, fontSize: 15, lineHeight: 1.65 }}
                >
                  {p.texto}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Trajetória — duas colunas editorial */}
      <Section>
        <SectionHeader index="02" label="Trajetória" />
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,280px)_1fr] gap-10 lg:gap-20 items-start">
          <p
            data-reveal
            className="font-['Arimo',sans-serif] text-cream lg:sticky lg:top-24"
            style={{
              margin: 0,
              fontSize: "clamp(22px, 2vw, 30px)",
              lineHeight: 1.35,
              letterSpacing: "-0.015em",
            }}
          >
            Duas décadas dedicadas à microneurocirurgia de alta complexidade.
          </p>
          <Paragraphs items={SOBRE_MIM.bio} />
        </div>
      </Section>

      {/* Experiência internacional */}
      <Section tone="darkest">
        <SectionHeader index="03" label="Experiência Internacional" />
        <div className="flex flex-col" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {SOBRE_MIM.experienciaInternacional.map((e) => (
            <div
              key={e.titulo}
              data-reveal
              className="group/exp grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-2 lg:gap-16 items-baseline"
              style={{ padding: "28px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
            >
              <span
                className="font-['Geist_Mono',sans-serif] text-gold-light/70"
                style={{ fontSize: 13, width: 130 }}
              >
                {e.periodo}
              </span>
              <div>
                <p
                  className="font-['Arimo',sans-serif] text-cream transition-colors duration-300"
                  style={{
                    margin: 0,
                    fontSize: "clamp(17px, 1.4vw, 23px)",
                    lineHeight: 1.35,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {e.titulo}
                </p>
                <p
                  className="font-['Geist',sans-serif] text-cream/40"
                  style={{ margin: 0, marginTop: 8, fontSize: 14 }}
                >
                  {e.instituicao}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Capítulos de livros — fundo cream para fechar com contraste */}
      <Section tone="cream">
        <SectionHeader index="04" label="Capítulos de Livros Publicados" dark />
        <div className="flex flex-col" style={{ borderTop: "1px solid rgba(26,41,63,0.15)" }}>
          {SOBRE_MIM.capitulosDeLivros.map((c, i) => (
            <div
              key={i}
              data-reveal
              className="grid grid-cols-[auto_1fr] items-baseline gap-6 lg:gap-10"
              style={{ padding: "20px 0", borderBottom: "1px solid rgba(26,41,63,0.12)" }}
            >
              <span
                className="font-['Geist_Mono',sans-serif] text-navy/35"
                style={{ fontSize: 12, width: 28 }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="font-['Geist',sans-serif] text-navy/75"
                style={{ fontSize: "clamp(14px, 1.05vw, 16px)", lineHeight: 1.6 }}
              >
                {c}
              </span>
            </div>
          ))}
        </div>
      </Section>
    </SubPage>
  );
}

// ── /doutorado ─────────────────────────────────────────────────────

export function DoutoradoPage() {
  return (
    <SubPage
      eyebrow="Doutorado"
      title="Tese sobre aneurismas cerebrais paraclinóideos"
      lead="PhD em Neurologia e Neurociência pela Universidade Federal de São Paulo (UNIFESP), publicado na World Neurosurgery (2022)."
      meta="UNIFESP — 2018–2022"
      watermark="PhD"
    >
      <Section first>
        <SectionHeader index="01" label="A Pesquisa" />
        <LeadParagraph>{DOUTORADO.paragrafos[0]}</LeadParagraph>
        <Paragraphs items={DOUTORADO.paragrafos.slice(1)} />
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          style={{ marginTop: "clamp(48px, 7vh, 72px)", maxWidth: 760 }}
        >
          <DocumentCard
            href={DOUTORADO.pdf}
            kicker="PDF — Documento completo"
            title="Tese de Doutorado — Aneurismas Cerebrais"
          />
          <DocumentCard
            href={PUBLICACOES.pdfArtigo}
            kicker="PDF — World Neurosurgery"
            title="Artigo científico publicado (2022)"
          />
        </div>
      </Section>
    </SubPage>
  );
}

// ── /publicacoes ───────────────────────────────────────────────────

export function PublicacoesPage() {
  return (
    <SubPage
      eyebrow="Publicações"
      title="Pesquisa publicada na World Neurosurgery"
      meta="2018 — 2024"
      watermark="W N"
    >
      <Section first>
        <SectionHeader index="01" label="O Artigo" />
        <LeadParagraph>{PUBLICACOES.intro}</LeadParagraph>
        <Paragraphs items={DOUTORADO.paragrafos.slice(0, 4)} />
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          style={{ marginTop: "clamp(48px, 7vh, 72px)", maxWidth: 760 }}
        >
          <DocumentCard
            href={PUBLICACOES.pdfArtigo}
            kicker="PDF — World Neurosurgery"
            title="Ler o artigo científico (2022)"
          />
          <DocumentCard
            href={DOUTORADO.pdf}
            kicker="PDF — Documento completo"
            title="Ler a tese de doutorado"
          />
        </div>
      </Section>

      <Section tone="darkest">
        <SectionHeader index="02" label="Palestras & Congressos" />
        <EventRows items={EVENTOS} />
      </Section>
    </SubPage>
  );
}

// ── /eventos ───────────────────────────────────────────────────────

export function EventosPage() {
  return (
    <SubPage
      eyebrow="Palestras & Eventos"
      title="Presença na comunidade neurocirúrgica"
      lead="20 anos de experiência compartilhados em congressos nacionais e internacionais, aulas para residentes e simpósios de neurocirurgia vascular."
      meta="SBN — CLAN — CBAN"
      watermark="20"
    >
      <Section first>
        <SectionHeader index="01" label="Participações" />
        <EventRows items={EVENTOS} />
      </Section>
    </SubPage>
  );
}

// ── /midia ─────────────────────────────────────────────────────────

function VideoEmbed({ id, large = false }: { id: string; large?: boolean }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl"
      style={{
        aspectRatio: "16 / 9",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title="Vídeo — Dr. Hugo Doria"
        className="absolute inset-0 h-full w-full"
        style={{ border: 0 }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading={large ? "eager" : "lazy"}
      />
    </div>
  );
}

export function MidiaPage() {
  const [destaque, ...resto] = MIDIA_VIDEOS;
  return (
    <SubPage
      eyebrow="Mídia"
      title="Dr. Hugo Doria na mídia"
      lead="Entrevistas e participações sobre neurocirurgia — aneurismas, cavernomas, neuralgia do trigêmeo e mais."
      meta="Imprensa & TV"
      watermark="TV"
    >
      <Section first>
        <SectionHeader index="01" label="Em destaque" />
        <div data-reveal className="mx-auto" style={{ maxWidth: 1080 }}>
          <VideoEmbed id={destaque} large />
        </div>
      </Section>
      <Section tone="darkest">
        <SectionHeader index="02" label="Todas as participações" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {resto.map((id, i) => (
            <div key={id} data-reveal className="flex flex-col gap-3">
              <VideoEmbed id={id} />
              <span
                className="font-['Geist_Mono',sans-serif] text-cream/30"
                style={{ fontSize: 11 }}
              >
                {String(i + 2).padStart(2, "0")} — Portal Doctor TV
              </span>
            </div>
          ))}
        </div>
      </Section>
    </SubPage>
  );
}

// ── /depoimentos ───────────────────────────────────────────────────

export function DepoimentosPage() {
  return (
    <SubPage
      eyebrow="Depoimentos"
      title="Mensagens de pacientes"
      lead="Mensagens reais recebidas de pacientes e familiares ao longo de 20 anos — gratidão que é o maior reconhecimento do trabalho."
      meta="+ 9.500 casos de sucesso"
      watermark="“"
    >
      <Section first tone="cream">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [&>*]:mb-6">
          {DEPOIMENTOS_GALERIA.map((src) => (
            <figure
              key={src}
              data-reveal
              className="overflow-hidden"
              style={{
                margin: 0,
                padding: 10,
                background: "#FFFFFF",
                borderRadius: 14,
                border: "1px solid rgba(26,41,63,0.08)",
                boxShadow: "0 18px 48px -20px rgba(26,41,63,0.22)",
                transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 28px 64px -20px rgba(26,41,63,0.32)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 18px 48px -20px rgba(26,41,63,0.22)";
              }}
            >
              <img
                src={src}
                alt="Depoimento de paciente do Dr. Hugo Doria"
                loading="lazy"
                className="w-full"
                style={{ display: "block", borderRadius: 8 }}
              />
            </figure>
          ))}
        </div>
      </Section>
    </SubPage>
  );
}

// ── /contato e /localizacao ────────────────────────────────────────

function MapaBlock({ dark = false }: { dark?: boolean }) {
  return (
    <>
      <div
        data-reveal
        className="w-full overflow-hidden rounded-2xl"
        style={{
          aspectRatio: "16 / 7",
          minHeight: 320,
          border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(26,41,63,0.12)",
        }}
      >
        <iframe
          src={CONTATO.mapsEmbed}
          title="Consultório — R. Teixeira da Silva, 54, Bela Vista, São Paulo"
          className="h-full w-full"
          style={{ border: 0, filter: "grayscale(0.25) contrast(1.02)" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <div className="flex flex-wrap items-baseline justify-between gap-4" style={{ marginTop: 24 }}>
        <p
          data-reveal
          className={`font-['Geist',sans-serif] ${dark ? "text-cream/55" : "text-navy/70"}`}
          style={{ margin: 0, fontSize: 15, maxWidth: 520 }}
        >
          {CONTATO.endereco}
        </p>
        <a
          data-reveal
          href={CONTATO.mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`font-['Geist_Mono',sans-serif] uppercase tracking-[0.18em] ${dark ? "text-gold-light" : "text-navy"} hover:opacity-70 transition-opacity`}
          style={{ fontSize: 11, textDecoration: "none" }}
        >
          Abrir no Google Maps ↗
        </a>
      </div>
    </>
  );
}

export function ContatoPage() {
  return (
    <SubPage
      eyebrow="Contato"
      title="Fale conosco"
      lead="Clique no número para falar diretamente com a equipe do Dr. Hugo via WhatsApp."
      meta="Atendimento — São Paulo"
      watermark="@"
    >
      <Section first>
        <SectionHeader index="01" label="WhatsApp" />
        <a
          data-reveal
          href={CONTATO.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group/wa inline-flex flex-wrap items-baseline gap-6"
          style={{ textDecoration: "none" }}
        >
          <span
            className="font-['Arimo',sans-serif] text-cream transition-colors duration-300 group-hover/wa:text-gold-light"
            style={{
              fontSize: "clamp(36px, 5.5vw, 84px)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            {CONTATO.whatsapp}
          </span>
          <span
            aria-hidden
            className="font-['Geist',sans-serif] text-gold-light transition-transform duration-300 group-hover/wa:translate-x-2"
            style={{ fontSize: "clamp(24px, 3vw, 44px)" }}
          >
            →
          </span>
        </a>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-px"
          style={{
            marginTop: "clamp(56px, 8vh, 88px)",
            background: "rgba(255,255,255,0.08)",
            maxWidth: 880,
          }}
        >
          {[
            { label: "Instagram", value: "@drhugodoria", href: SOCIAL.instagram },
            { label: "LinkedIn", value: "Hugo Doria", href: SOCIAL.linkedin },
            { label: "Facebook", value: "hugoleonardo.dorianetto", href: SOCIAL.facebook },
            { label: "Localização", value: "Bela Vista, São Paulo", href: CONTATO.mapsLink },
          ].map((c) => (
            <a
              key={c.label}
              data-reveal
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group/soc flex flex-col gap-2"
              style={{
                padding: "26px 28px",
                background: "var(--color-bg-deeper)",
                textDecoration: "none",
              }}
            >
              <span
                className="font-['Geist_Mono',sans-serif] uppercase tracking-[0.2em] text-gold-light/60"
                style={{ fontSize: 10 }}
              >
                {c.label}
              </span>
              <span
                className="font-['Arimo',sans-serif] text-cream/85 transition-colors duration-300 group-hover/soc:text-gold-light"
                style={{ fontSize: "clamp(17px, 1.4vw, 22px)", letterSpacing: "-0.01em" }}
              >
                {c.value}
              </span>
            </a>
          ))}
        </div>
      </Section>

      <Section tone="cream">
        <SectionHeader index="02" label="Localização" dark />
        <MapaBlock />
      </Section>
    </SubPage>
  );
}

export function LocalizacaoPage() {
  return (
    <SubPage
      eyebrow="Localização"
      title="Onde estamos"
      lead={CONTATO.endereco}
      meta="Bela Vista — São Paulo"
      watermark="SP"
    >
      <Section first tone="cream">
        <MapaBlock />
      </Section>
    </SubPage>
  );
}
