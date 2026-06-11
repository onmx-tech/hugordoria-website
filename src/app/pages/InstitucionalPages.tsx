import SubPage from "../components/SubPage";
import imgRetrato from "@/assets/e25bc4f66b4a426ccf342bc9c87ec2d3e73f4b1a.png";
import imgPalestra from "@/assets/a375c45d2716fbbea43385fdee4485566a41cfa6.png";
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

const HAIR = "rgba(26,41,63,0.14)";

// ── blocos compartilhados (miolo claro; navy é o momento pontual) ──

function Section({
  children,
  tone = "cream",
  first = false,
}: {
  children: React.ReactNode;
  tone?: "cream" | "navy";
  first?: boolean;
}) {
  return (
    <section
      data-section-reveal
      className="relative w-full"
      style={{
        background: tone === "navy" ? "var(--color-bg-deeper)" : "var(--color-bg-cream)",
        paddingTop: first ? "clamp(64px, 9vh, 110px)" : "clamp(56px, 8vh, 100px)",
        paddingBottom: "clamp(64px, 9vh, 110px)",
      }}
    >
      <div className="px-6 md:px-12 lg:px-16">{children}</div>
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
    <div
      data-reveal
      className="flex items-baseline justify-between"
      style={{ marginBottom: "clamp(36px, 5vh, 56px)" }}
    >
      <span
        className={`font-['Geist_Mono',sans-serif] uppercase tracking-[0.22em] whitespace-nowrap ${dark ? "text-gold-light/70" : "text-navy/50"}`}
        style={{ fontSize: 11 }}
      >
        [&nbsp;&nbsp;{index} — {label}&nbsp;&nbsp;]
      </span>
      <span
        aria-hidden
        className="hidden md:block flex-1"
        style={{
          height: 1,
          background: dark ? "rgba(255,255,255,0.1)" : HAIR,
          marginLeft: 32,
        }}
      />
    </div>
  );
}

function Paragraphs({ items, dark = false }: { items: readonly string[]; dark?: boolean }) {
  return (
    <div className="flex flex-col" style={{ gap: 22, maxWidth: 720 }}>
      {items.map((p, i) => (
        <p
          key={i}
          data-reveal
          className={`font-['Geist',sans-serif] ${dark ? "text-cream/65" : "text-navy/70"}`}
          style={{ margin: 0, fontSize: "clamp(15px, 1.1vw, 17px)", lineHeight: 1.8 }}
        >
          {p}
        </p>
      ))}
    </div>
  );
}

function LeadParagraph({ children }: { children: string }) {
  return (
    <p
      data-reveal
      className="font-['Arimo',sans-serif] text-navy"
      style={{
        margin: 0,
        marginBottom: "clamp(32px, 5vh, 48px)",
        fontSize: "clamp(21px, 2.1vw, 32px)",
        lineHeight: 1.4,
        letterSpacing: "-0.015em",
        maxWidth: 860,
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
      className="group/doc relative flex flex-col justify-between overflow-hidden bg-white"
      style={{
        minHeight: 200,
        padding: "28px 28px 24px",
        border: `1px solid ${HAIR}`,
        borderRadius: 16,
        textDecoration: "none",
        boxShadow: "0 16px 40px -24px rgba(26,41,63,0.25)",
        transition:
          "border-color 0.35s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor =
          "color-mix(in srgb, var(--color-accent-gold) 55%, transparent)";
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 24px 56px -24px rgba(26,41,63,0.35)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = HAIR;
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 16px 40px -24px rgba(26,41,63,0.25)";
      }}
    >
      <div className="flex items-start justify-between gap-6">
        <span
          className="font-['Geist_Mono',sans-serif] uppercase tracking-[0.2em] text-navy/45"
          style={{ fontSize: 10 }}
        >
          {kicker}
        </span>
        <span
          aria-hidden
          className="font-['Geist',sans-serif] text-navy/40 transition-all duration-300 group-hover/doc:text-gold group-hover/doc:translate-x-1 group-hover/doc:-translate-y-1"
          style={{ fontSize: 18 }}
        >
          ↗
        </span>
      </div>
      <p
        className="font-['Arimo',sans-serif] text-navy"
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
    <div className="flex flex-col" style={{ borderTop: `1px solid ${HAIR}` }}>
      {items.map((item, i) => (
        <div
          key={i}
          data-reveal
          className="group/ev grid grid-cols-[auto_1fr_auto] items-center gap-6 lg:gap-10"
          style={{ padding: "26px 0", borderBottom: `1px solid ${HAIR}` }}
        >
          <span
            className="font-['Arimo',sans-serif] shrink-0"
            style={{
              fontSize: "clamp(28px, 3vw, 48px)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              color: "transparent",
              WebkitTextStroke: "1px rgba(26,41,63,0.3)",
              width: "clamp(52px, 5vw, 84px)",
            }}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <span
            className="font-['Geist',sans-serif] text-navy/75 transition-colors duration-300 group-hover/ev:text-navy"
            style={{ fontSize: "clamp(16px, 1.25vw, 21px)", lineHeight: 1.45 }}
          >
            {item}
          </span>
          <span
            aria-hidden
            className="hidden md:inline font-['Geist',sans-serif] text-gold/0 transition-all duration-300 group-hover/ev:text-gold group-hover/ev:translate-x-1"
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
      em="vocação"
      lead="Dr. Hugo Leonardo Doria-Netto, MD PhD — especialista em neurocirurgia vascular, confiado por mais de 9.500 pacientes."
      meta="Nº 01 — São Paulo, Brasil"
      image={imgRetrato}
      imageCaption="Dr. Hugo Doria — São Paulo"
    >
      {/* Quote + stats: o momento navy pontual da página */}
      <Section tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <blockquote className="lg:col-span-8" style={{ margin: 0 }}>
            <span
              aria-hidden
              className="block font-['Arimo',sans-serif] text-gold-light"
              style={{ fontSize: 64, lineHeight: 0.55, marginBottom: 28 }}
            >
              “
            </span>
            <p
              data-reveal
              className="font-['Arimo',sans-serif] text-cream"
              style={{
                margin: 0,
                fontSize: "clamp(22px, 2.3vw, 36px)",
                lineHeight: 1.4,
                letterSpacing: "-0.01em",
              }}
            >
              {SOBRE_MIM.quote}
            </p>
            <p
              data-reveal
              className="font-['Geist_Mono',sans-serif] uppercase tracking-[0.18em] text-cream/40"
              style={{ margin: 0, marginTop: 28, fontSize: 11 }}
            >
              [&nbsp;&nbsp;Dr. Hugo Leonardo Doria-Netto, MD PhD&nbsp;&nbsp;]
            </p>
          </blockquote>
          <div className="lg:col-span-4 flex flex-col" style={{ gap: 0 }}>
            {STATS.map((s, i) => (
              <div
                key={s.label}
                data-reveal
                className="flex items-baseline justify-between gap-6"
                style={{
                  padding: "20px 0",
                  borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <span
                  className="font-['Arimo',sans-serif] text-gold-light"
                  style={{ fontSize: "clamp(32px, 3vw, 44px)", lineHeight: 1, letterSpacing: "-0.02em" }}
                >
                  {s.value}
                </span>
                <span
                  className="font-['Geist_Mono',sans-serif] uppercase tracking-[0.16em] text-cream/45 text-right"
                  style={{ fontSize: 10 }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Pilares — colunas de revista com hairlines */}
      <Section>
        <SectionHeader index="01" label="Pilares" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          {SOBRE_MIM.pilares.map((p, i) => (
            <div key={p.titulo} data-reveal className="flex flex-col">
              <span
                className="font-['Arimo',sans-serif]"
                style={{
                  fontSize: 44,
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(178,141,58,0.55)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="w-full" style={{ height: 1, background: HAIR, margin: "20px 0" }} />
              <h3
                className="font-['Arimo',sans-serif] text-navy"
                style={{ margin: 0, fontWeight: 400, fontSize: 21, letterSpacing: "-0.01em" }}
              >
                {p.titulo}
              </h3>
              <p
                className="font-['Geist',sans-serif] text-navy/60"
                style={{ margin: 0, marginTop: 12, fontSize: 15, lineHeight: 1.7 }}
              >
                {p.texto}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Trajetória */}
      <Section>
        <SectionHeader index="02" label="Trajetória" />
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,300px)_1fr] gap-10 lg:gap-20 items-start">
          <p
            data-reveal
            className="font-['Arimo',sans-serif] text-navy lg:sticky lg:top-24"
            style={{
              margin: 0,
              fontSize: "clamp(22px, 2vw, 30px)",
              lineHeight: 1.35,
              letterSpacing: "-0.015em",
            }}
          >
            Duas décadas dedicadas à microneurocirurgia de{" "}
            <em style={{ color: "var(--color-accent-gold)" }}>alta complexidade</em>.
          </p>
          <Paragraphs items={SOBRE_MIM.bio} />
        </div>
      </Section>

      {/* Experiência internacional */}
      <Section>
        <SectionHeader index="03" label="Experiência Internacional" />
        <div className="flex flex-col" style={{ borderTop: `1px solid ${HAIR}` }}>
          {SOBRE_MIM.experienciaInternacional.map((e) => (
            <div
              key={e.titulo}
              data-reveal
              className="grid grid-cols-1 lg:grid-cols-[150px_1fr] gap-2 lg:gap-16 items-baseline"
              style={{ padding: "28px 0", borderBottom: `1px solid ${HAIR}` }}
            >
              <span className="font-['Geist_Mono',sans-serif] text-gold" style={{ fontSize: 13 }}>
                {e.periodo}
              </span>
              <div>
                <p
                  className="font-['Arimo',sans-serif] text-navy"
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
                  className="font-['Geist',sans-serif] text-navy/50"
                  style={{ margin: 0, marginTop: 8, fontSize: 14 }}
                >
                  {e.instituicao}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Capítulos */}
      <Section>
        <SectionHeader index="04" label="Capítulos de Livros Publicados" />
        <div className="flex flex-col" style={{ borderTop: `1px solid ${HAIR}` }}>
          {SOBRE_MIM.capitulosDeLivros.map((c, i) => (
            <div
              key={i}
              data-reveal
              className="grid grid-cols-[auto_1fr] items-baseline gap-6 lg:gap-10"
              style={{ padding: "18px 0", borderBottom: `1px solid ${HAIR}` }}
            >
              <span className="font-['Geist_Mono',sans-serif] text-navy/35" style={{ fontSize: 12, width: 28 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="font-['Geist',sans-serif] text-navy/70"
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
      em="paraclinóideos"
      lead="PhD em Neurologia e Neurociência pela Universidade Federal de São Paulo (UNIFESP), publicado na World Neurosurgery (2022)."
      meta="Nº 02 — UNIFESP, 2018–2022"
      image="/images/especialidades/aneurisma.jpg"
      imageCaption="Pesquisa — Aneurismas Cerebrais"
    >
      <Section first>
        <SectionHeader index="01" label="A Pesquisa" />
        <LeadParagraph>{DOUTORADO.paragrafos[0]}</LeadParagraph>
        <Paragraphs items={DOUTORADO.paragrafos.slice(1)} />
      </Section>
      <Section tone="navy">
        <SectionHeader index="02" label="Documentos" dark />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5" style={{ maxWidth: 860 }}>
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
      em="World Neurosurgery"
      meta="Nº 03 — 2018–2024"
      image="/images/especialidades/revascularizacao.jpg"
      imageCaption="World Neurosurgery — 2022"
    >
      <Section first>
        <SectionHeader index="01" label="O Artigo" />
        <LeadParagraph>{PUBLICACOES.intro}</LeadParagraph>
        <Paragraphs items={DOUTORADO.paragrafos.slice(0, 4)} />
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          style={{ marginTop: "clamp(48px, 7vh, 72px)", maxWidth: 860 }}
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
      <Section tone="navy">
        <SectionHeader index="02" label="Palestras & Congressos" dark />
        <div className="flex flex-col" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          {EVENTOS.map((item, i) => (
            <div
              key={i}
              data-reveal
              className="grid grid-cols-[auto_1fr] items-center gap-6 lg:gap-10"
              style={{ padding: "24px 0", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              <span
                className="font-['Geist_Mono',sans-serif] text-gold-light/60"
                style={{ fontSize: 12, width: 32 }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="font-['Geist',sans-serif] text-cream/70"
                style={{ fontSize: "clamp(15px, 1.2vw, 19px)", lineHeight: 1.5 }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
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
      em="comunidade"
      lead="20 anos de experiência compartilhados em congressos nacionais e internacionais, aulas para residentes e simpósios de neurocirurgia vascular."
      meta="Nº 04 — SBN · CLAN · CBAN"
      image={imgPalestra}
      imageCaption="Palestras & Congressos"
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
      className="relative w-full overflow-hidden rounded-2xl bg-white"
      style={{
        aspectRatio: "16 / 9",
        border: `1px solid ${HAIR}`,
        boxShadow: "0 16px 40px -24px rgba(26,41,63,0.25)",
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
      em="mídia"
      lead="Entrevistas e participações sobre neurocirurgia — aneurismas, cavernomas, neuralgia do trigêmeo e mais."
      meta="Nº 05 — Imprensa & TV"
    >
      <Section first>
        <SectionHeader index="01" label="Em destaque" />
        <div data-reveal className="mx-auto" style={{ maxWidth: 1080 }}>
          <VideoEmbed id={destaque} large />
        </div>
      </Section>
      <Section>
        <SectionHeader index="02" label="Todas as participações" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {resto.map((id, i) => (
            <div key={id} data-reveal className="flex flex-col gap-3">
              <VideoEmbed id={id} />
              <span className="font-['Geist_Mono',sans-serif] text-navy/40" style={{ fontSize: 11 }}>
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
      title="Mensagens de gratidão"
      em="gratidão"
      lead="Mensagens reais recebidas de pacientes e familiares ao longo de 20 anos — o maior reconhecimento do trabalho."
      meta="Nº 06 — + 9.500 casos de sucesso"
    >
      <Section first>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [&>*]:mb-6">
          {DEPOIMENTOS_GALERIA.map((src) => (
            <figure
              key={src}
              data-reveal
              className="overflow-hidden bg-white"
              style={{
                margin: 0,
                padding: 10,
                borderRadius: 14,
                border: `1px solid ${HAIR}`,
                boxShadow: "0 18px 48px -20px rgba(26,41,63,0.2)",
                transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 28px 64px -20px rgba(26,41,63,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 18px 48px -20px rgba(26,41,63,0.2)";
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

function MapaBlock() {
  return (
    <>
      <div
        data-reveal
        className="w-full overflow-hidden rounded-2xl"
        style={{ aspectRatio: "16 / 7", minHeight: 320, border: `1px solid ${HAIR}` }}
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
          className="font-['Geist',sans-serif] text-navy/70"
          style={{ margin: 0, fontSize: 15, maxWidth: 520 }}
        >
          {CONTATO.endereco}
        </p>
        <a
          data-reveal
          href={CONTATO.mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="font-['Geist_Mono',sans-serif] uppercase tracking-[0.18em] text-navy hover:opacity-60 transition-opacity"
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
      em="conosco"
      lead="Clique no número para falar diretamente com a equipe do Dr. Hugo via WhatsApp."
      meta="Nº 07 — Atendimento, São Paulo"
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
            className="font-['Arimo',sans-serif] text-navy transition-colors duration-300 group-hover/wa:text-gold"
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
            className="font-['Geist',sans-serif] text-gold transition-transform duration-300 group-hover/wa:translate-x-2"
            style={{ fontSize: "clamp(24px, 3vw, 44px)" }}
          >
            →
          </span>
        </a>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-px"
          style={{
            marginTop: "clamp(56px, 8vh, 88px)",
            background: HAIR,
            border: `1px solid ${HAIR}`,
            borderRadius: 16,
            overflow: "hidden",
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
              className="group/soc flex flex-col gap-2 bg-white"
              style={{ padding: "26px 28px", textDecoration: "none" }}
            >
              <span
                className="font-['Geist_Mono',sans-serif] uppercase tracking-[0.2em] text-navy/40"
                style={{ fontSize: 10 }}
              >
                {c.label}
              </span>
              <span
                className="font-['Arimo',sans-serif] text-navy transition-colors duration-300 group-hover/soc:text-gold"
                style={{ fontSize: "clamp(17px, 1.4vw, 22px)", letterSpacing: "-0.01em" }}
              >
                {c.value}
              </span>
            </a>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader index="02" label="Localização" />
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
      em="estamos"
      lead={CONTATO.endereco}
      meta="Nº 08 — Bela Vista, São Paulo"
    >
      <Section first>
        <MapaBlock />
      </Section>
    </SubPage>
  );
}
