import type { ComponentType } from "react";
import {
  Award,
  BookOpen,
  Boxes,
  Brain,
  Facebook,
  Globe,
  GraduationCap,
  HeartPulse,
  Instagram,
  Linkedin,
  MapPin,
  Mic,
  Microscope,
  ScanLine,
  Slice,
  Stethoscope,
} from "lucide-react";
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
type Icon = ComponentType<{ size?: number | string; strokeWidth?: number | string; color?: string }>;

// ── blocos compartilhados ──────────────────────────────────────────

function Section({
  children,
  tone = "cream",
  first = false,
}: {
  children: React.ReactNode;
  tone?: "cream" | "navy" | "white";
  first?: boolean;
}) {
  const bg =
    tone === "navy"
      ? "var(--color-bg-deeper)"
      : tone === "white"
        ? "#FFFFFF"
        : "var(--color-bg-cream)";
  return (
    <section
      data-section-reveal
      className="relative w-full"
      style={{
        background: bg,
        paddingTop: first ? "clamp(64px, 9vh, 110px)" : "clamp(56px, 8vh, 100px)",
        paddingBottom: "clamp(64px, 9vh, 110px)",
      }}
    >
      <div className="px-6 md:px-12 lg:px-16">{children}</div>
    </section>
  );
}

/** Header de seção centrado (ritmo Relume): kicker + título serif + sublead */
function CenterHeader({
  kicker,
  title,
  em,
  sub,
  dark = false,
}: {
  kicker: string;
  title: string;
  em?: string;
  sub?: string;
  dark?: boolean;
}) {
  const words = title.split(" ");
  return (
    <div
      className="mx-auto flex flex-col items-center text-center"
      style={{ maxWidth: 720, marginBottom: "clamp(44px, 6vh, 72px)" }}
    >
      <span
        data-reveal
        className={`font-['Geist_Mono',sans-serif] uppercase tracking-[0.22em] ${dark ? "text-gold-light/70" : "text-navy/45"}`}
        style={{ fontSize: 11 }}
      >
        [&nbsp;&nbsp;{kicker}&nbsp;&nbsp;]
      </span>
      <h2
        data-reveal
        className={`font-['Fraunces',serif] ${dark ? "text-cream" : "text-navy"}`}
        style={{
          margin: 0,
          marginTop: 20,
          fontWeight: 400,
          fontSize: "clamp(30px, 3.2vw, 48px)",
          lineHeight: 1.12,
          letterSpacing: "-0.02em",
        }}
      >
        {words.map((w, i) => {
          const isEm = em
            ?.toLowerCase()
            .split(/\s+/)
            .includes(w.toLowerCase().replace(/[^\p{L}\p{N}-]/gu, ""));
          return (
            <span key={i}>
              {isEm ? (
                <em style={{ color: dark ? "var(--color-accent-gold-light)" : "var(--color-accent-gold)" }}>
                  {w}
                </em>
              ) : (
                w
              )}
              {i < words.length - 1 ? " " : ""}
            </span>
          );
        })}
      </h2>
      {sub && (
        <p
          data-reveal
          className={`font-['Geist',sans-serif] ${dark ? "text-cream/55" : "text-navy/55"}`}
          style={{ margin: 0, marginTop: 18, fontSize: "clamp(15px, 1.15vw, 18px)", lineHeight: 1.6 }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

/** Badge de ícone — círculo cream com linha dourada */
function IconBadge({ icon: I, dark = false }: { icon: Icon; dark?: boolean }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-full shrink-0"
      style={{
        width: 52,
        height: 52,
        background: dark
          ? "color-mix(in srgb, var(--color-accent-gold-light) 12%, transparent)"
          : "var(--color-bg-cream)",
        border: dark
          ? "1px solid color-mix(in srgb, var(--color-accent-gold-light) 35%, transparent)"
          : `1px solid ${HAIR}`,
      }}
    >
      <I size={22} strokeWidth={1.5} color={dark ? "var(--color-accent-gold-light)" : "var(--color-accent-gold)"} />
    </span>
  );
}

/** Card branco com ícone, título e texto */
function IconCard({
  icon,
  kicker,
  title,
  text,
  foot,
}: {
  icon: Icon;
  kicker?: string;
  title: string;
  text?: string;
  foot?: string;
}) {
  return (
    <div
      data-reveal
      className="group/ic flex flex-col bg-white"
      style={{
        padding: "30px 28px 28px",
        borderRadius: 18,
        border: `1px solid ${HAIR}`,
        boxShadow: "0 16px 40px -28px rgba(26,41,63,0.3)",
        transition:
          "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease, border-color 0.4s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.borderColor =
          "color-mix(in srgb, var(--color-accent-gold) 45%, transparent)";
        e.currentTarget.style.boxShadow = "0 28px 56px -28px rgba(26,41,63,0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = HAIR;
        e.currentTarget.style.boxShadow = "0 16px 40px -28px rgba(26,41,63,0.3)";
      }}
    >
      <div className="flex items-center justify-between">
        <IconBadge icon={icon} />
        {kicker && (
          <span
            className="font-['Geist_Mono',sans-serif] uppercase tracking-[0.18em] text-navy/35"
            style={{ fontSize: 10 }}
          >
            {kicker}
          </span>
        )}
      </div>
      <h3
        className="font-['Fraunces',serif] text-navy"
        style={{
          margin: 0,
          marginTop: 24,
          fontWeight: 400,
          fontSize: "clamp(19px, 1.5vw, 23px)",
          lineHeight: 1.25,
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h3>
      {text && (
        <p
          className="font-['Geist',sans-serif] text-navy/60"
          style={{ margin: 0, marginTop: 12, fontSize: 15, lineHeight: 1.65 }}
        >
          {text}
        </p>
      )}
      {foot && (
        <span
          className="font-['Geist_Mono',sans-serif] text-gold"
          style={{ fontSize: 12, marginTop: 18 }}
        >
          {foot}
        </span>
      )}
    </div>
  );
}

function Paragraphs({ items }: { items: readonly string[] }) {
  return (
    <div className="flex flex-col" style={{ gap: 22, maxWidth: 720 }}>
      {items.map((p, i) => (
        <p
          key={i}
          data-reveal
          className="font-['Geist',sans-serif] text-navy/70"
          style={{ margin: 0, fontSize: "clamp(15px, 1.1vw, 17px)", lineHeight: 1.8 }}
        >
          {p}
        </p>
      ))}
    </div>
  );
}

function DocumentCard({ href, kicker, title }: { href: string; kicker: string; title: string }) {
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
        borderRadius: 18,
        textDecoration: "none",
        boxShadow: "0 16px 40px -24px rgba(26,41,63,0.35)",
        transition:
          "border-color 0.35s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor =
          "color-mix(in srgb, var(--color-accent-gold) 55%, transparent)";
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = HAIR;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div className="flex items-start justify-between gap-6">
        <IconBadge icon={BookOpen} />
        <span
          aria-hidden
          className="font-['Geist',sans-serif] text-navy/40 transition-all duration-300 group-hover/doc:text-gold group-hover/doc:translate-x-1 group-hover/doc:-translate-y-1"
          style={{ fontSize: 18 }}
        >
          ↗
        </span>
      </div>
      <div style={{ marginTop: 32 }}>
        <span
          className="font-['Geist_Mono',sans-serif] uppercase tracking-[0.2em] text-navy/40"
          style={{ fontSize: 10 }}
        >
          {kicker}
        </span>
        <p
          className="font-['Fraunces',serif] text-navy"
          style={{
            margin: 0,
            marginTop: 10,
            fontSize: "clamp(18px, 1.5vw, 24px)",
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </p>
      </div>
    </a>
  );
}

// ── /sobre-mim ─────────────────────────────────────────────────────

const PILAR_ICONS: Icon[] = [Stethoscope, BookOpen, Award];
const EXP_ICONS: Icon[] = [Microscope, Brain, Globe, HeartPulse];

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
      {/* Quote + stats — momento navy */}
      <Section tone="navy">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <blockquote className="lg:col-span-8" style={{ margin: 0 }}>
            <span
              aria-hidden
              className="block font-['Fraunces',serif] text-gold-light"
              style={{ fontSize: 64, lineHeight: 0.55, marginBottom: 28 }}
            >
              “
            </span>
            <p
              data-reveal
              className="font-['Fraunces',serif] text-cream"
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
          <div className="lg:col-span-4 flex flex-col">
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
                  className="font-['Fraunces',serif] text-gold-light"
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

      {/* Pilares — header centrado + cards com ícone */}
      <Section>
        <CenterHeader
          kicker="01 — Pilares"
          title="Três pilares de uma carreira dedicada à vida"
          em="vida"
          sub="Prática clínica de elite, produção científica constante e liderança na comunidade neurocirúrgica."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mx-auto" style={{ maxWidth: 1180 }}>
          {SOBRE_MIM.pilares.map((p, i) => (
            <IconCard
              key={p.titulo}
              icon={PILAR_ICONS[i]}
              kicker={String(i + 1).padStart(2, "0")}
              title={p.titulo}
              text={p.texto}
            />
          ))}
        </div>
      </Section>

      {/* Trajetória — editorial em duas colunas (contraponto ao grid) */}
      <Section tone="white">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,320px)_1fr] gap-10 lg:gap-24 items-start">
          <div className="lg:sticky lg:top-24 flex flex-col" data-reveal>
            <span
              className="font-['Geist_Mono',sans-serif] uppercase tracking-[0.22em] text-navy/45"
              style={{ fontSize: 11 }}
            >
              [&nbsp;&nbsp;02 — Trajetória&nbsp;&nbsp;]
            </span>
            <p
              className="font-['Fraunces',serif] text-navy"
              style={{
                margin: 0,
                marginTop: 24,
                fontSize: "clamp(24px, 2.2vw, 34px)",
                lineHeight: 1.3,
                letterSpacing: "-0.015em",
              }}
            >
              Duas décadas dedicadas à microneurocirurgia de{" "}
              <em style={{ color: "var(--color-accent-gold)" }}>alta complexidade</em>.
            </p>
          </div>
          <Paragraphs items={SOBRE_MIM.bio} />
        </div>
      </Section>

      {/* Experiência internacional — grid 2×2 de cards com ícone */}
      <Section>
        <CenterHeader
          kicker="03 — Experiência Internacional"
          title="Formação nos maiores centros do mundo"
          em="mundo"
          sub="Barrow Neurological Institute, UCSF e Saint Louis University — fellowship, observership e treinamento avançado."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mx-auto" style={{ maxWidth: 1080 }}>
          {SOBRE_MIM.experienciaInternacional.map((e, i) => (
            <IconCard
              key={e.titulo}
              icon={EXP_ICONS[i] ?? Globe}
              kicker={e.periodo}
              title={e.titulo}
              text={e.instituicao}
            />
          ))}
        </div>
      </Section>

      {/* Capítulos — box branco com lista em 2 colunas */}
      <Section>
        <CenterHeader
          kicker="04 — Publicações em Livros"
          title="Capítulos publicados na literatura médica"
          em="literatura"
        />
        <div
          data-reveal
          className="mx-auto bg-white"
          style={{
            maxWidth: 1080,
            padding: "clamp(28px, 3.5vw, 56px)",
            borderRadius: 20,
            border: `1px solid ${HAIR}`,
            boxShadow: "0 24px 56px -32px rgba(26,41,63,0.35)",
          }}
        >
          <div className="columns-1 lg:columns-2" style={{ columnGap: 56 }}>
            {SOBRE_MIM.capitulosDeLivros.map((c, i) => (
              <div
                key={i}
                className="grid grid-cols-[auto_1fr] items-baseline gap-4 break-inside-avoid"
                style={{
                  padding: "14px 0",
                  borderBottom: i === SOBRE_MIM.capitulosDeLivros.length - 1 ? "none" : `1px solid ${HAIR}`,
                }}
              >
                <span className="font-['Geist_Mono',sans-serif] text-gold" style={{ fontSize: 12, width: 26 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="font-['Geist',sans-serif] text-navy/70"
                  style={{ fontSize: 14, lineHeight: 1.6 }}
                >
                  {c}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </SubPage>
  );
}

// ── /doutorado ─────────────────────────────────────────────────────

const ETAPAS = [
  { icon: Brain, title: "Anatomia", text: "Estudo anatômico minucioso da região paraclinóidea e suas referências cirúrgicas." },
  { icon: ScanLine, title: "Radiológica", text: "Protocolo de ressonância magnética reprodutível para distinção dos aneurismas." },
  { icon: Boxes, title: "Biomodelos 3D", text: "Confirmação por impressão tridimensional de biomodelos dos casos estudados." },
  { icon: Slice, title: "Cirúrgica", text: "Validação em pacientes submetidos a cirurgia, comprovando a tese." },
] as const;

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
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,320px)_1fr] gap-10 lg:gap-24 items-start">
          <div className="lg:sticky lg:top-24 flex flex-col" data-reveal>
            <span
              className="font-['Geist_Mono',sans-serif] uppercase tracking-[0.22em] text-navy/45"
              style={{ fontSize: 11 }}
            >
              [&nbsp;&nbsp;01 — A Pesquisa&nbsp;&nbsp;]
            </span>
            <p
              className="font-['Fraunces',serif] text-navy"
              style={{
                margin: 0,
                marginTop: 24,
                fontSize: "clamp(24px, 2.2vw, 34px)",
                lineHeight: 1.3,
                letterSpacing: "-0.015em",
              }}
            >
              Distinguir com exatidão para tratar com{" "}
              <em style={{ color: "var(--color-accent-gold)" }}>precisão</em>.
            </p>
          </div>
          <Paragraphs items={DOUTORADO.paragrafos} />
        </div>
      </Section>

      {/* As 4 etapas — grid de cards com ícone */}
      <Section tone="white">
        <CenterHeader
          kicker="02 — Metodologia"
          title="Uma descoberta construída em quatro etapas"
          em="quatro"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mx-auto" style={{ maxWidth: 1240 }}>
          {ETAPAS.map((e, i) => (
            <IconCard
              key={e.title}
              icon={e.icon}
              kicker={`Etapa ${String(i + 1).padStart(2, "0")}`}
              title={e.title}
              text={e.text}
            />
          ))}
        </div>
      </Section>

      <Section tone="navy">
        <CenterHeader
          kicker="03 — Documentos"
          title="Leia a pesquisa completa"
          em="completa"
          dark
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mx-auto" style={{ maxWidth: 880 }}>
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
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,320px)_1fr] gap-10 lg:gap-24 items-start">
          <div className="lg:sticky lg:top-24 flex flex-col" data-reveal>
            <span
              className="font-['Geist_Mono',sans-serif] uppercase tracking-[0.22em] text-navy/45"
              style={{ fontSize: 11 }}
            >
              [&nbsp;&nbsp;01 — O Artigo&nbsp;&nbsp;]
            </span>
            <p
              className="font-['Fraunces',serif] text-navy"
              style={{
                margin: 0,
                marginTop: 24,
                fontSize: "clamp(24px, 2.2vw, 34px)",
                lineHeight: 1.3,
                letterSpacing: "-0.015em",
              }}
            >
              Quatro anos de pesquisa numa revista de{" "}
              <em style={{ color: "var(--color-accent-gold)" }}>referência mundial</em>.
            </p>
          </div>
          <div>
            <Paragraphs items={[PUBLICACOES.intro, ...DOUTORADO.paragrafos.slice(0, 4)]} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5" style={{ marginTop: "clamp(40px, 6vh, 64px)" }}>
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
          </div>
        </div>
      </Section>

      <Section tone="white">
        <CenterHeader
          kicker="02 — Palestras & Congressos"
          title="Conhecimento compartilhado com a comunidade"
          em="comunidade"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto" style={{ maxWidth: 1080 }}>
          {EVENTOS.map((ev, i) => (
            <IconCard key={i} icon={Mic} kicker={String(i + 1).padStart(2, "0")} title={ev} />
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
        <CenterHeader
          kicker="01 — Participações"
          title="Congressos, simpósios e aulas magnas"
          em="magnas"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto" style={{ maxWidth: 1080 }}>
          {EVENTOS.map((ev, i) => (
            <IconCard key={i} icon={Mic} kicker={String(i + 1).padStart(2, "0")} title={ev} />
          ))}
        </div>
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
        <CenterHeader
          kicker="01 — Em Destaque"
          title="Neurocirurgia explicada para todos"
          em="todos"
        />
        <div data-reveal className="mx-auto" style={{ maxWidth: 1080 }}>
          <VideoEmbed id={destaque} large />
        </div>
      </Section>
      <Section tone="white">
        <CenterHeader kicker="02 — Todas as Participações" title="Entrevistas e programas" em="programas" />
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
        <CenterHeader
          kicker="01 — Galeria"
          title="Palavras que valem uma vida"
          em="vida"
        />
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [&>*]:mb-6 mx-auto" style={{ maxWidth: 1240 }}>
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
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
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

const SOCIAL_CARDS = [
  { icon: Instagram, label: "Instagram", value: "@drhugodoria", href: SOCIAL.instagram },
  { icon: Linkedin, label: "LinkedIn", value: "Hugo Doria", href: SOCIAL.linkedin },
  { icon: Facebook, label: "Facebook", value: "hugoleonardo.dorianetto", href: SOCIAL.facebook },
  { icon: MapPin, label: "Localização", value: "Bela Vista, São Paulo", href: CONTATO.mapsLink },
] as const;

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
      {/* WhatsApp como peça central, centrado */}
      <Section first tone="white">
        <div className="flex flex-col items-center text-center">
          <span
            data-reveal
            className="font-['Geist_Mono',sans-serif] uppercase tracking-[0.22em] text-navy/45"
            style={{ fontSize: 11 }}
          >
            [&nbsp;&nbsp;01 — WhatsApp&nbsp;&nbsp;]
          </span>
          <a
            data-reveal
            href={CONTATO.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group/wa inline-flex items-baseline gap-5"
            style={{ textDecoration: "none", marginTop: 28 }}
          >
            <span
              className="font-['Fraunces',serif] text-navy transition-colors duration-300 group-hover/wa:text-gold"
              style={{
                fontSize: "clamp(34px, 5.2vw, 80px)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
              }}
            >
              {CONTATO.whatsapp}
            </span>
            <span
              aria-hidden
              className="font-['Geist',sans-serif] text-gold transition-transform duration-300 group-hover/wa:translate-x-2"
              style={{ fontSize: "clamp(22px, 2.6vw, 40px)" }}
            >
              →
            </span>
          </a>
          <p
            data-reveal
            className="font-['Geist',sans-serif] text-navy/50"
            style={{ margin: 0, marginTop: 20, fontSize: 15 }}
          >
            Atendimento de segunda a sexta — equipe do Dr. Hugo Doria
          </p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto"
          style={{ marginTop: "clamp(56px, 8vh, 88px)", maxWidth: 1240 }}
        >
          {SOCIAL_CARDS.map((c) => (
            <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <IconCard icon={c.icon} kicker={c.label} title={c.value} />
            </a>
          ))}
        </div>
      </Section>

      <Section>
        <CenterHeader kicker="02 — Localização" title="Onde nos encontrar" em="encontrar" />
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
