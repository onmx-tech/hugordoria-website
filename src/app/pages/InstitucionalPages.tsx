import { useEffect, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
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
import { track } from "../analytics/track";
import { appendUtmToUrl } from "../analytics/utm";
import { Navbar } from "../components/sub/Navbar";
import { Footer } from "../components/sub/Footer";
import FloatingNav from "../components/FloatingNav";
import { PageHero } from "../components/sub/PageHero";
import { Eyebrow, SectionHeading, Divider, Button, Container, Stat } from "../components/sub/primitives";
import { VideoFeature } from "../components/sub/VideoFeature";
import { VideoCard } from "../components/sub/VideoCard";
import { Reveal } from "../components/sub/Reveal";
import { useSeo } from "../seo/useSeo";
import { breadcrumbSchema } from "../seo/schema";
import { ScrollRevealManifesto } from "../components/sub/ScrollRevealManifesto";
import { cards } from "../components/section-especialidades/data";
import { useLocale } from "../i18n/LocaleProvider";
import {
  CONTATO,
  DEPOIMENTOS_GALERIA,
  getInstitucional,
} from "../content/institucional";

// Casca compartilhada — navy + Navbar/Footer + scroll-to-top.
// Exportada para as demais páginas institucionais (ex.: SegundaOpiniao.tsx)
// usarem exatamente a mesma casca, sem clonar a estrutura.
export function Shell({ children }: { children: ReactNode }) {
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

export function Section({ children, tone = "navy" }: { children: ReactNode; tone?: "navy" | "navy-800" }) {
  return (
    <section className={`${tone === "navy-800" ? "bg-navy-800" : "bg-navy-600"} py-20 md:py-28`}>
      <Container>{children}</Container>
    </section>
  );
}

// ───────────────────────── /sobre-mim ─────────────────────────
export function SobreMimPage() {
  const { locale } = useLocale();
  const { t } = useTranslation("forms");
  const { SOBRE_MIM } = getInstitucional(locale);

  useSeo({
    title: "Sobre o Dr. Hugo Doria — neurocirurgião MD PhD",
    description:
      "Trajetória, formação e atuação do Dr. Hugo Leonardo Doria-Netto: neurocirurgia vascular com precisão técnica, pesquisa avançada e cuidado humano.",
    image: "/v4/photos/sobre-portrait.jpg",
    jsonLd: [
      breadcrumbSchema([
        { name: "Início", path: "/" },
        { name: "Sobre mim", path: "/sobre-mim" },
      ]),
    ],
  });

  const stats = [
    { value: "+20", label: t("forms.stats.experiencia") },
    { value: "+100", label: t("forms.stats.artigos") },
    { value: "+9.500", label: t("forms.stats.casos") },
  ];

  return (
    <Shell>
      <PageHero
        eyebrow={t("forms.sobre.heroEyebrow")}
        title="Dr. Hugo Leonardo Doria-Netto"
        intro={t("forms.sobre.heroIntro")}
        image="/v4/photos/sobre-portrait.jpg"
        imageAlt="Dr. Hugo Doria"
        badge={{ value: "+20", label: t("forms.sobre.heroBadgeLabel") }}
      />

      {/* 1. Prova rápida de credibilidade */}
      <Section tone="navy-800">
        <div className="grid gap-10 md:grid-cols-3">
          {stats.map((s) => (
            <Stat key={s.label} value={s.value} label={s.label} tone="light" />
          ))}
        </div>
      </Section>

      {/* 2. Gancho — vídeo de apresentação (bg navy-600) */}
      <VideoFeature
        eyebrow={t("forms.sobre.videoEyebrow")}
        title={t("forms.sobre.videoTitle")}
        poster="/v4/videos/sobre-poster.jpg"
        src="/v4/videos/sobre.mp4"
        caption={t("forms.sobre.videoCaption")}
      />

      {/* 3. Bio / trajetória */}
      <Section tone="navy-800">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="flex flex-col gap-5 lg:sticky lg:top-24 lg:self-start">
            <Eyebrow>{t("forms.sobre.trajetoriaEyebrow")}</Eyebrow>
            <SectionHeading tone="light">{t("forms.sobre.trajetoriaHeading")}</SectionHeading>
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
        <Eyebrow>{t("forms.sobre.pilaresEyebrow")}</Eyebrow>
        <SectionHeading tone="light" className="mt-5">{t("forms.sobre.pilaresHeading")}</SectionHeading>
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
        <Eyebrow>{t("forms.sobre.formacaoEyebrow")}</Eyebrow>
        <SectionHeading tone="light" className="mt-5">{t("forms.sobre.formacaoHeading")}</SectionHeading>
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
        <Eyebrow>{t("forms.sobre.retratosEyebrow")}</Eyebrow>
        <SectionHeading tone="light" className="mt-5">{t("forms.sobre.retratosHeading")}</SectionHeading>
        <Divider tone="light" className="mt-8" />
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {[
            "/v4/photos/retrato-sentado.jpg",
            "/v4/photos/retrato-empe.jpg",
            "/v4/photos/retrato-bracos.jpg",
            "/v4/photos/retrato-sentado-sorrindo.jpg",
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
  const { locale } = useLocale();
  const { t } = useTranslation("forms");
  const { DOUTORADO } = getInstitucional(locale);

  useSeo({
    title: "Doutorado — tese sobre aneurismas paraclinóideos",
    description:
      "Tese de doutorado em Neurociência (UNIFESP): protocolo inédito, em quatro etapas, para distinguir quais aneurismas cerebrais paraclinóideos exigem tratamento.",
    image: "/v4/photos/doutorado-portrait.jpg",
    jsonLd: [
      breadcrumbSchema([
        { name: "Início", path: "/" },
        { name: "Doutorado", path: "/doutorado" },
      ]),
    ],
  });

  return (
    <Shell>
      <PageHero
        eyebrow={t("forms.doutorado.heroEyebrow")}
        title={t("forms.doutorado.heroTitle")}
        intro={t("forms.doutorado.heroIntro")}
        image="/v4/photos/doutorado-portrait.jpg"
        imageAlt="Dr. Hugo Doria"
        badge={{ value: "PhD", label: "UNIFESP" }}
      />

      <VideoFeature
        eyebrow={t("forms.doutorado.videoEyebrow")}
        title={t("forms.doutorado.videoTitle")}
        poster="/v4/videos/doutorado-poster.jpg"
        src="/v4/videos/doutorado.mp4"
        caption={t("forms.doutorado.videoCaption")}
      />

      <Section tone="navy-800">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
            <Eyebrow>{t("forms.doutorado.pesquisaEyebrow")}</Eyebrow>
            <SectionHeading tone="light">{t("forms.doutorado.pesquisaHeading")}</SectionHeading>
            <Button href={DOUTORADO.pdf} variant="gold" icon="arrow" className="mt-2 self-start">{t("forms.doutorado.lerTese")}</Button>
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
  const { locale } = useLocale();
  const { t } = useTranslation("forms");
  const { PUBLICACOES, SOBRE_MIM } = getInstitucional(locale);

  useSeo({
    title: "Publicações científicas",
    description:
      "Produção científica do Dr. Hugo Doria em neurocirurgia vascular — artigos, capítulos e pesquisa publicada em periódicos internacionais.",
    image: "/v4/photos/retrato-bracos.jpg",
    jsonLd: [
      breadcrumbSchema([
        { name: "Início", path: "/" },
        { name: "Publicações", path: "/publicacoes" },
      ]),
    ],
  });

  return (
    <Shell>
      <PageHero
        eyebrow={t("forms.publicacoes.heroEyebrow")}
        title={t("forms.publicacoes.heroTitle")}
        intro={PUBLICACOES.intro}
        image="/v4/photos/retrato-bracos.jpg"
        imageAlt={t("forms.publicacoes.heroImageAlt")}
        badge={{ value: "2022", label: "World Neurosurgery" }}
      />
      <Section>
        <div className="flex flex-col gap-6">
          <Eyebrow>{t("forms.publicacoes.artigoEyebrow")}</Eyebrow>
          <SectionHeading tone="light" className="max-w-[760px]">
            {t("forms.publicacoes.artigoHeading")}
          </SectionHeading>
          <Button href={PUBLICACOES.pdfArtigo} variant="gold" icon="arrow" className="mt-2 self-start">{t("forms.publicacoes.lerArtigo")}</Button>
        </div>
      </Section>
      <Section tone="navy-800">
        <Eyebrow>{t("forms.publicacoes.capitulosEyebrow")}</Eyebrow>
        <SectionHeading tone="light" className="mt-5">{t("forms.publicacoes.capitulosHeading")}</SectionHeading>
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
  const { locale } = useLocale();
  const { t } = useTranslation("forms");
  const { EVENTOS } = getInstitucional(locale);

  useSeo({
    title: "Eventos e congressos",
    description:
      "Vinte anos de participação em congressos nacionais e internacionais, aulas para residentes e simpósios de neurocirurgia vascular.",
    image: "/v4/photos/palestra-painel.jpg",
    jsonLd: [
      breadcrumbSchema([
        { name: "Início", path: "/" },
        { name: "Eventos", path: "/eventos" },
      ]),
    ],
  });

  return (
    <Shell>
      <PageHero
        eyebrow={t("forms.eventos.heroEyebrow")}
        title={t("forms.eventos.heroTitle")}
        intro={t("forms.eventos.heroIntro")}
        image="/v4/photos/palestra-painel.jpg"
        imageAlt={t("forms.eventos.heroImageAlt")}
        badge={{ value: String(EVENTOS.length).padStart(2, "0"), label: t("forms.eventos.heroBadgeLabel") }}
      />
      <Section>
        <Eyebrow>{t("forms.eventos.palestrasEyebrow")}</Eyebrow>
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
  const { locale } = useLocale();
  const { t } = useTranslation("forms");
  const { MIDIA_VIDEOS } = getInstitucional(locale);

  useSeo({
    title: "Mídia — vídeos e aparições",
    description:
      "Entrevistas, aulas e conteúdos do Dr. Hugo Doria sobre neurocirurgia vascular, diagnóstico e tratamento das principais condições neurológicas.",
    image: "/v4/photos/palestra-podium.jpg",
    jsonLd: [
      breadcrumbSchema([
        { name: "Início", path: "/" },
        { name: "Mídia", path: "/midia" },
      ]),
    ],
  });

  return (
    <Shell>
      <PageHero
        eyebrow={t("forms.midia.heroEyebrow")}
        title={t("forms.midia.heroTitle")}
        intro={t("forms.midia.heroIntro")}
        image="/v4/photos/palestra-podium.jpg"
        imageAlt={t("forms.midia.heroImageAlt")}
        badge={{ value: String(MIDIA_VIDEOS.length).padStart(2, "0"), label: t("forms.midia.heroBadgeLabel") }}
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
  const { t } = useTranslation("forms");

  useSeo({
    title: "Depoimentos de pacientes",
    description:
      "Mensagens reais de pacientes e familiares ao longo de duas décadas de neurocirurgia — o maior reconhecimento do trabalho.",
    image: "/v4/photos/retrato-sentado-sorrindo.jpg",
    jsonLd: [
      breadcrumbSchema([
        { name: "Início", path: "/" },
        { name: "Depoimentos", path: "/depoimentos" },
      ]),
    ],
  });

  return (
    <Shell>
      <PageHero
        eyebrow={t("forms.depoimentos.heroEyebrow")}
        title={t("forms.depoimentos.heroTitle")}
        intro={t("forms.depoimentos.heroIntro")}
        image="/v4/photos/retrato-sentado-sorrindo.jpg"
        imageAlt="Dr. Hugo Doria"
        badge={{ value: "+9.500", label: t("forms.depoimentos.heroBadgeLabel") }}
      />
      <Section>
        <div className="gap-5 sm:columns-2 lg:columns-3" style={{ columnFill: "balance" }}>
          {DEPOIMENTOS_GALERIA.map((src, i) => (
            <div key={i} className="mb-5 break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
              <img src={src} alt={t("forms.depoimentos.itemAlt", { n: i + 1 })} loading="lazy" className="w-full" />
            </div>
          ))}
        </div>
      </Section>
    </Shell>
  );
}

// ───────────────────────── /contato ─────────────────────────
export const fieldClass =
  "w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 font-body text-[16px] text-white placeholder:text-white/40 outline-none transition-colors focus:border-gold-600";

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-display text-white/80 text-[14px]" style={{ fontWeight: 500 }}>{label}</span>
      {children}
    </label>
  );
}

export function ContatoPage() {
  const { t } = useTranslation("forms");

  useSeo({
    title: "Contato e agendamento de consulta",
    description:
      "Agende sua avaliação com o Dr. Hugo Doria. Consultório na Bela Vista, São Paulo — atendimento por WhatsApp, telefone ou formulário.",
    image: "/v4/photos/contato-portrait.jpg",
    jsonLd: [
      breadcrumbSchema([
        { name: "Início", path: "/" },
        { name: "Contato", path: "/contato" },
      ]),
    ],
  });

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const texto = [
      t("forms.contato.wa.saudacao"),
      `${t("forms.contato.wa.nome")}: ${nome}`,
      telefone && `${t("forms.contato.wa.telefone")}: ${telefone}`,
      email && `${t("forms.contato.wa.email")}: ${email}`,
      assunto && `${t("forms.contato.wa.assunto")}: ${assunto}`,
      mensagem && `${t("forms.contato.wa.mensagem")}: ${mensagem}`,
    ].filter(Boolean).join("\n");

    // Evento de conversão — só página de origem e especialidade (o "assunto"
    // do select), nunca nome/telefone/e-mail/mensagem (dado pessoal do lead).
    track("lead_formulario", {
      origem_pagina: "/contato",
      especialidade: assunto || undefined,
    });

    const url = appendUtmToUrl(`${CONTATO.whatsappLink}?text=${encodeURIComponent(texto)}`);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const INFO = [
    { icon: Phone, label: t("forms.contato.infoWhatsapp"), value: CONTATO.whatsapp, href: CONTATO.whatsappLink },
    { icon: Mail, label: t("forms.contato.infoEmail"), value: CONTATO.email, href: `mailto:${CONTATO.email}` },
    { icon: MapPin, label: t("forms.contato.infoEndereco"), value: CONTATO.endereco, href: CONTATO.mapsLink },
    { icon: Clock, label: t("forms.contato.infoAtendimento"), value: t("forms.contato.atendimentoHorario"), href: undefined as string | undefined },
  ];

  return (
    <Shell>
      <PageHero
        eyebrow={t("forms.contato.heroEyebrow")}
        title={t("forms.contato.heroTitle")}
        intro={t("forms.contato.heroIntro")}
        image="/v4/photos/contato-portrait.jpg"
        imageAlt="Dr. Hugo Doria"
        badge={{ value: "24h", label: t("forms.contato.heroBadgeLabel") }}
      />
      <Section>
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr]">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <Eyebrow>{t("forms.contato.canaisEyebrow")}</Eyebrow>
              <SectionHeading tone="light">{t("forms.contato.canaisHeading")}</SectionHeading>
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
                <Field label={t("forms.contato.labelNome")}>
                  <input required type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder={t("forms.contato.phNome")} className={fieldClass} />
                </Field>
                <Field label={t("forms.contato.labelTelefone")}>
                  <input type="tel" value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder={t("forms.contato.phTelefone")} className={fieldClass} />
                </Field>
              </div>
              <Field label={t("forms.contato.labelEmail")}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("forms.contato.phEmail")} className={fieldClass} />
              </Field>
              <Field label={t("forms.contato.labelAssunto")}>
                <select value={assunto} onChange={(e) => setAssunto(e.target.value)} className={`${fieldClass} appearance-none`}>
                  <option value="" className="bg-navy-800">{t("forms.contato.selectAssuntoDefault")}</option>
                  {cards.map((c) => (
                    <option key={c.slug} value={c.title} className="bg-navy-800">{c.title}</option>
                  ))}
                  <option value="Outro" className="bg-navy-800">{t("forms.contato.selectAssuntoOutro")}</option>
                </select>
              </Field>
              <Field label={t("forms.contato.labelMensagem")}>
                <textarea required rows={5} value={mensagem} onChange={(e) => setMensagem(e.target.value)} placeholder={t("forms.contato.phMensagem")} className={`${fieldClass} resize-none`} />
              </Field>
              <Button type="submit" variant="gold" icon="chat" className="mt-2 w-full">{t("forms.contato.enviar")}</Button>
            </form>
          </div>
        </div>
      </Section>
    </Shell>
  );
}

// ───────────────────────── /localizacao ─────────────────────────
export function LocalizacaoPage() {
  const { t } = useTranslation("forms");

  useSeo({
    title: "Localização do consultório — Bela Vista, São Paulo",
    description:
      "Consultório do Dr. Hugo Doria na R. Teixeira da Silva, 54 — sala 73, Bela Vista, São Paulo. Como chegar e canais de contato.",
    image: "/v4/photos/retrato-empe.jpg",
    jsonLd: [
      breadcrumbSchema([
        { name: "Início", path: "/" },
        { name: "Localização", path: "/localizacao" },
      ]),
    ],
  });

  return (
    <Shell>
      <PageHero
        eyebrow={t("forms.localizacao.heroEyebrow")}
        title={t("forms.localizacao.heroTitle")}
        intro={CONTATO.endereco}
        image="/v4/photos/retrato-empe.jpg"
        imageAlt="Dr. Hugo Doria"
        badge={{ value: "SP", label: "Bela Vista" }}
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="flex flex-col gap-6">
            <Eyebrow>{t("forms.localizacao.consultorioEyebrow")}</Eyebrow>
            <SectionHeading tone="light">{t("forms.localizacao.consultorioHeading")}</SectionHeading>
            <p className="font-body text-white/70 text-[17px]" style={{ lineHeight: 1.6 }}>{CONTATO.endereco}</p>
            <div className="flex items-center gap-3">
              <Clock className="size-5 text-gold-700" strokeWidth={1.5} />
              <span className="font-mono text-white/60 text-[13px]">{t("forms.localizacao.atendimentoHorario")}</span>
            </div>
            <Button href={CONTATO.mapsLink} variant="gold" icon="arrow" className="mt-2 self-start">{t("forms.localizacao.abrirMaps")}</Button>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <iframe
              title={t("forms.localizacao.mapaTitle")}
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
