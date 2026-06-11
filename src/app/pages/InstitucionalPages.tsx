import SubPage from "../components/SubPage";
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

// ── blocos compartilhados ──────────────────────────────────────────

function Section({
  children,
  cream = false,
  first = false,
}: {
  children: React.ReactNode;
  cream?: boolean;
  first?: boolean;
}) {
  return (
    <section
      data-section-reveal
      className="relative w-full"
      style={{
        background: cream ? "var(--color-bg-cream)" : "var(--color-bg-deeper)",
        paddingTop: first ? "clamp(64px, 9vh, 110px)" : "clamp(48px, 7vh, 90px)",
        paddingBottom: "clamp(64px, 9vh, 110px)",
      }}
    >
      <div className="px-6 md:px-12 lg:px-16">{children}</div>
    </section>
  );
}

function Eyebrow({ children, dark = false }: { children: string; dark?: boolean }) {
  return (
    <span
      data-reveal
      className={`inline-block font-['Geist_Mono',sans-serif] uppercase tracking-[0.18em] ${
        dark ? "text-navy/50" : "text-gold-light/60"
      }`}
      style={{ fontSize: 10, marginBottom: 24 }}
    >
      {children}
    </span>
  );
}

function Paragraphs({ items, dark = false }: { items: readonly string[]; dark?: boolean }) {
  return (
    <div className="flex flex-col" style={{ gap: 20, maxWidth: 820 }}>
      {items.map((p, i) => (
        <p
          key={i}
          data-reveal
          className={`font-['Geist',sans-serif] ${dark ? "text-navy/75" : "text-cream/60"}`}
          style={{
            margin: 0,
            fontSize: "clamp(15px, 1.1vw, 17px)",
            lineHeight: 1.75,
          }}
        >
          {p}
        </p>
      ))}
    </div>
  );
}

function PdfButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      data-reveal
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 self-start transition-transform duration-300 hover:-translate-y-0.5"
      style={{
        marginTop: 40,
        padding: "14px 28px",
        background: "var(--color-accent-gold-light)",
        borderRadius: 100,
        textDecoration: "none",
      }}
    >
      <span
        className="font-['Geist',sans-serif]"
        style={{ fontWeight: 600, fontSize: 14, color: "var(--color-bg-deeper)" }}
      >
        {label}
      </span>
      <span aria-hidden style={{ color: "var(--color-bg-deeper)" }}>↗</span>
    </a>
  );
}

function NumberedList({ items }: { items: readonly string[] }) {
  return (
    <div className="flex flex-col">
      {items.map((item, i) => (
        <div
          key={i}
          data-reveal
          className="flex items-baseline gap-5 lg:gap-8"
          style={{ padding: "22px 0", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          <span
            className="font-['Arimo',sans-serif] text-gold-light/40 shrink-0"
            style={{
              fontSize: "clamp(24px, 2.2vw, 36px)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              width: "clamp(36px, 3vw, 52px)",
            }}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <span
            className="font-['Geist',sans-serif] text-cream/70"
            style={{ fontSize: "clamp(15px, 1.15vw, 19px)", lineHeight: 1.55 }}
          >
            {item}
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
      title="Dr. Hugo Doria: Especialista em Neurocirurgia Vascular"
      lead="Confiado por mais de 9.500 pacientes."
    >
      <Section first>
        <blockquote
          data-reveal
          className="font-['Arimo',sans-serif] text-cream"
          style={{
            margin: 0,
            fontSize: "clamp(22px, 2.4vw, 36px)",
            lineHeight: 1.35,
            letterSpacing: "-0.01em",
            maxWidth: 880,
          }}
        >
          “{SOBRE_MIM.quote}”
        </blockquote>
        <p
          data-reveal
          className="font-['Geist',sans-serif] text-cream/45"
          style={{ margin: 0, marginTop: 24, fontSize: 15 }}
        >
          Assim define Dr. Hugo Leonardo Doria-Netto, MD, PhD — seu dom na
          medicina é reconhecido como uma dádiva de Deus.
        </p>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14"
          style={{ marginTop: "clamp(56px, 8vh, 96px)" }}
        >
          {SOBRE_MIM.pilares.map((p) => (
            <div key={p.titulo} data-reveal>
              <div
                className="w-10"
                style={{ height: 2, background: "var(--color-accent-gold-light)", opacity: 0.6, marginBottom: 20 }}
              />
              <h3
                className="font-['Arimo',sans-serif] text-cream"
                style={{ margin: 0, fontWeight: 400, fontSize: 20 }}
              >
                {p.titulo}
              </h3>
              <p
                className="font-['Geist',sans-serif] text-cream/55"
                style={{ margin: 0, marginTop: 12, fontSize: 15, lineHeight: 1.65 }}
              >
                {p.texto}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <Eyebrow>Trajetória</Eyebrow>
        <Paragraphs items={SOBRE_MIM.bio} />
      </Section>

      <Section>
        <Eyebrow>Experiência Internacional</Eyebrow>
        <div className="flex flex-col">
          {SOBRE_MIM.experienciaInternacional.map((e) => (
            <div
              key={e.titulo}
              data-reveal
              className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-2 lg:gap-12 items-baseline"
              style={{ padding: "24px 0", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div>
                <p
                  className="font-['Geist',sans-serif] text-cream"
                  style={{ margin: 0, fontWeight: 500, fontSize: "clamp(16px, 1.2vw, 20px)", lineHeight: 1.4 }}
                >
                  {e.titulo}
                </p>
                <p
                  className="font-['Geist',sans-serif] text-cream/45"
                  style={{ margin: 0, marginTop: 6, fontSize: 14 }}
                >
                  {e.instituicao}
                </p>
              </div>
              <span
                className="font-['Geist_Mono',sans-serif] text-gold-light/60"
                style={{ fontSize: 13 }}
              >
                {e.periodo}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <Eyebrow>Capítulos de Livros Publicados</Eyebrow>
        <NumberedList items={SOBRE_MIM.capitulosDeLivros} />
      </Section>
    </SubPage>
  );
}

// ── /doutorado ─────────────────────────────────────────────────────

export function DoutoradoPage() {
  return (
    <SubPage
      eyebrow="Doutorado"
      title="Tese de Doutorado sobre Aneurismas Cerebrais"
      lead="PhD em Neurologia e Neurociência pela Universidade Federal de São Paulo (UNIFESP), publicado na World Neurosurgery (2022)."
    >
      <Section first>
        <Eyebrow>A Pesquisa</Eyebrow>
        <Paragraphs items={DOUTORADO.paragrafos} />
        <PdfButton href={DOUTORADO.pdf} label="Ler a tese completa (PDF)" />
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
      lead={PUBLICACOES.intro}
    >
      <Section first>
        <Eyebrow>O Artigo</Eyebrow>
        <Paragraphs items={DOUTORADO.paragrafos} />
        <div className="flex flex-wrap gap-4">
          <PdfButton href={PUBLICACOES.pdfArtigo} label="Ler o artigo (PDF)" />
          <PdfButton href={DOUTORADO.pdf} label="Ler a tese completa (PDF)" />
        </div>
      </Section>

      <Section>
        <Eyebrow>Palestras & Congressos</Eyebrow>
        <NumberedList items={EVENTOS} />
      </Section>
    </SubPage>
  );
}

// ── /eventos ───────────────────────────────────────────────────────

export function EventosPage() {
  return (
    <SubPage
      eyebrow="Palestras & Eventos"
      title="Participação do Dr. Hugo Doria em eventos"
      lead="20 anos de experiência compartilhados com a comunidade neurocirúrgica em congressos nacionais e internacionais."
    >
      <Section first>
        <NumberedList items={EVENTOS} />
      </Section>
    </SubPage>
  );
}

// ── /midia ─────────────────────────────────────────────────────────

export function MidiaPage() {
  return (
    <SubPage
      eyebrow="Mídia"
      title="Dr. Hugo Doria na mídia"
      lead="Entrevistas, participações e conteúdos sobre neurocirurgia."
    >
      <Section first>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {MIDIA_VIDEOS.map((id) => (
            <div
              key={id}
              data-reveal
              className="relative w-full overflow-hidden rounded-xl"
              style={{ aspectRatio: "16 / 9", background: "rgba(255,255,255,0.05)" }}
            >
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${id}`}
                title="Vídeo — Dr. Hugo Doria"
                className="absolute inset-0 h-full w-full"
                style={{ border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
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
      lead="Casos de sucesso e mensagens reais recebidas por pacientes e familiares ao longo de 20 anos de experiência."
    >
      <Section first>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [&>*]:mb-6">
          {DEPOIMENTOS_GALERIA.map((src) => (
            <img
              key={src}
              data-reveal
              src={src}
              alt="Depoimento de paciente do Dr. Hugo Doria"
              loading="lazy"
              className="w-full rounded-xl"
              style={{ display: "block" }}
            />
          ))}
        </div>
      </Section>
    </SubPage>
  );
}

// ── /contato ───────────────────────────────────────────────────────

function ContatoInfo() {
  const items = [
    { label: "WhatsApp", value: CONTATO.whatsapp, href: CONTATO.whatsappLink },
    { label: "Localização", value: CONTATO.endereco, href: CONTATO.mapsLink },
    { label: "Instagram", value: "@drhugodoria", href: SOCIAL.instagram },
  ];
  return (
    <div className="flex flex-col" style={{ maxWidth: 720 }}>
      {items.map((c) => (
        <a
          key={c.label}
          data-reveal
          href={c.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group/contact flex flex-col gap-2"
          style={{
            padding: "28px 0",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            textDecoration: "none",
          }}
        >
          <span
            className="font-['Geist_Mono',sans-serif] uppercase tracking-[0.18em] text-gold-light/60"
            style={{ fontSize: 10 }}
          >
            {c.label}
          </span>
          <span
            className="font-['Arimo',sans-serif] text-cream transition-colors duration-200 group-hover/contact:text-gold-light"
            style={{ fontSize: "clamp(18px, 1.8vw, 28px)", lineHeight: 1.3, letterSpacing: "-0.01em" }}
          >
            {c.value}
          </span>
        </a>
      ))}
    </div>
  );
}

export function ContatoPage() {
  return (
    <SubPage
      eyebrow="Contato"
      title="Fale conosco"
      lead="Clique no número para falar diretamente com a equipe do Dr. Hugo via WhatsApp."
    >
      <Section first>
        <ContatoInfo />
      </Section>
      <MapaSection />
    </SubPage>
  );
}

// ── /localizacao ───────────────────────────────────────────────────

function MapaSection() {
  return (
    <Section>
      <Eyebrow>Localização</Eyebrow>
      <div
        data-reveal
        className="w-full overflow-hidden rounded-xl"
        style={{ aspectRatio: "16 / 7", minHeight: 320, background: "rgba(255,255,255,0.05)" }}
      >
        <iframe
          src={CONTATO.mapsEmbed}
          title="Consultório — R. Teixeira da Silva, 54, Bela Vista, São Paulo"
          className="h-full w-full"
          style={{ border: 0, filter: "grayscale(0.2)" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <p
        data-reveal
        className="font-['Geist',sans-serif] text-cream/50"
        style={{ margin: 0, marginTop: 20, fontSize: 15 }}
      >
        {CONTATO.endereco}
      </p>
    </Section>
  );
}

export function LocalizacaoPage() {
  return (
    <SubPage
      eyebrow="Localização"
      title="Onde estamos"
      lead={CONTATO.endereco}
    >
      <MapaSection />
    </SubPage>
  );
}
