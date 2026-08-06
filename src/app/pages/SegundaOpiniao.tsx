import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Check,
  ChevronDown,
  ClipboardList,
  FileText,
  FlaskConical,
  Info,
  Pill,
  ScanLine,
  ShieldAlert,
  Stethoscope,
} from "lucide-react";
import { track } from "../analytics/track";
import { appendUtmToUrl } from "../analytics/utm";
import { PageHero } from "../components/sub/PageHero";
import { Eyebrow, SectionHeading, Divider, Button } from "../components/sub/primitives";
import { Reveal } from "../components/sub/Reveal";
import { useSeo } from "../seo/useSeo";
import { breadcrumbSchema, faqSchema } from "../seo/schema";
import { cards } from "../components/section-especialidades/data";
import { useLocale } from "../i18n/LocaleProvider";
import { CONTATO, getInstitucional } from "../content/institucional";
// Mesma casca e mesmos campos das outras institucionais — a página é irmã
// delas, não um corpo estranho.
import { Shell, Section, Field, fieldClass } from "./InstitucionalPages";

const DOC_ICONS = {
  imagem: ScanLine,
  laudo: FileText,
  relatorio: ClipboardList,
  historico: Stethoscope,
  medicacao: Pill,
  laboratorio: FlaskConical,
} as const;

export function SegundaOpiniaoPage() {
  const { locale } = useLocale();
  const { t } = useTranslation("forms");
  const { t: tSeo } = useTranslation("seo");
  const { SEGUNDA_OPINIAO } = getInstitucional(locale);

  useSeo({
    title: tSeo("seo.segundaOpiniao.title"),
    description: tSeo("seo.segundaOpiniao.description"),
    image: "/v4/photos/retrato-sentado.jpg",
    jsonLd: [
      breadcrumbSchema([
        { name: "Início", path: "/" },
        { name: "Segunda opinião", path: "/segunda-opiniao" },
      ]),
      faqSchema(
        SEGUNDA_OPINIAO.faq.map((f) => ({ question: f.pergunta, answer: f.resposta })),
      ),
    ],
  });

  const examesOpcoes = t("forms.segundaOpiniao.examesOpcoes", {
    returnObjects: true,
  }) as string[];

  const formRef = useRef<HTMLDivElement>(null);

  const [nome, setNome] = useState("");
  const [contato, setContato] = useState("");
  const [condicao, setCondicao] = useState("");
  const [exames, setExames] = useState("");
  const [resumo, setResumo] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const texto = [
      t("forms.segundaOpiniao.wa.saudacao"),
      `${t("forms.segundaOpiniao.wa.nome")}: ${nome}`,
      `${t("forms.segundaOpiniao.wa.contato")}: ${contato}`,
      condicao && `${t("forms.segundaOpiniao.wa.condicao")}: ${condicao}`,
      exames && `${t("forms.segundaOpiniao.wa.exames")}: ${exames}`,
      resumo && `${t("forms.segundaOpiniao.wa.resumo")}: ${resumo}`,
    ]
      .filter(Boolean)
      .join("\n");

    // Conversão do segundo caminho do site. Só origem e condição (o select),
    // nunca nome/telefone/resumo — dado pessoal não vai para o dataLayer.
    track("lead_formulario", {
      origem_pagina: "/segunda-opiniao",
      tipo: "segunda_opiniao",
      especialidade: condicao || undefined,
    });

    const url = appendUtmToUrl(`${CONTATO.whatsappLink}?text=${encodeURIComponent(texto)}`);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <Shell>
      <PageHero
        eyebrow={t("forms.segundaOpiniao.heroEyebrow")}
        title={t("forms.segundaOpiniao.heroTitle")}
        intro={SEGUNDA_OPINIAO.heroIntro}
        image="/v4/photos/retrato-sentado.jpg"
        imageAlt="Dr. Hugo Doria"
      >
        <Button
          variant="gold"
          icon="arrow"
          onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
        >
          {t("forms.segundaOpiniao.ctaSolicitar")}
        </Button>
      </PageHero>

      {/* 1. Abertura — por que existe */}
      <Section tone="navy-800">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="flex flex-col gap-5 lg:sticky lg:top-24 lg:self-start">
            <Eyebrow>{t("forms.segundaOpiniao.aberturaEyebrow")}</Eyebrow>
            <SectionHeading tone="light">
              {t("forms.segundaOpiniao.aberturaHeading")}
            </SectionHeading>
          </div>
          <div className="flex flex-col gap-5">
            {SEGUNDA_OPINIAO.abertura.map((p, i) => (
              <p
                key={i}
                className="font-body text-white/70 text-[clamp(15px,1.15vw,17px)]"
                style={{ lineHeight: 1.75 }}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {/* 2. Quem deve pedir */}
      <Section>
        <Eyebrow>{t("forms.segundaOpiniao.quemEyebrow")}</Eyebrow>
        <SectionHeading tone="light" className="mt-5 max-w-[860px]">
          {t("forms.segundaOpiniao.quemHeading")}
        </SectionHeading>
        <Divider tone="light" className="mt-8" />
        <div className="mt-10 flex flex-col overflow-hidden rounded-2xl bg-white/[0.04]">
          {SEGUNDA_OPINIAO.quemDevePedir.map((item, i) => (
            <div key={i} className="flex items-start gap-5 border-b border-white/10 p-6 last:border-b-0">
              <Check className="mt-0.5 size-5 shrink-0 text-gold-700" strokeWidth={2} />
              <p className="font-body text-white/80 text-[16px]" style={{ lineHeight: 1.55 }}>
                {item}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 3. O coração da página — exames e documentos */}
      <Section tone="navy-800">
        <Eyebrow>{t("forms.segundaOpiniao.enviarEyebrow")}</Eyebrow>
        <SectionHeading tone="light" className="mt-5 max-w-[860px]">
          {t("forms.segundaOpiniao.enviarHeading")}
        </SectionHeading>
        <Divider tone="light" className="mt-8" />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SEGUNDA_OPINIAO.documentos.map((doc, i) => {
            const Icon = DOC_ICONS[doc.icone as keyof typeof DOC_ICONS] ?? FileText;
            return (
              <Reveal key={doc.titulo} delay={(i % 3) * 0.08}>
                <div className="flex h-full flex-col gap-5 rounded-2xl bg-white/[0.04] p-8">
                  <div className="flex items-center justify-between gap-4">
                    <Icon className="size-9 text-gold-700" strokeWidth={1.5} />
                    <span className="font-mono text-white/30 text-[13px]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-display text-white text-[20px]" style={{ fontWeight: 500 }}>
                    {doc.titulo}
                  </h3>
                  <p className="font-body text-white/65 text-[15px]" style={{ lineHeight: 1.65 }}>
                    {doc.texto}
                  </p>
                  {"nota" in doc && doc.nota && (
                    <span className="mt-auto border-t border-white/10 pt-5 font-body text-white/45 text-[13px]" style={{ lineHeight: 1.5 }}>
                      {doc.nota}
                    </span>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-8 flex items-start gap-4 border border-white/10 bg-white/[0.02] p-6">
          <Info className="mt-0.5 size-5 shrink-0 text-gold-600" strokeWidth={1.6} />
          <p className="font-body text-white/70 text-[15px]" style={{ lineHeight: 1.6 }}>
            {SEGUNDA_OPINIAO.documentosNota}
          </p>
        </div>
      </Section>

      {/* 4. Como funciona */}
      <Section>
        <Eyebrow>{t("forms.segundaOpiniao.comoEyebrow")}</Eyebrow>
        <SectionHeading tone="light" className="mt-5 max-w-[860px]">
          {t("forms.segundaOpiniao.comoHeading")}
        </SectionHeading>
        <Divider tone="light" className="mt-8" />
        {/* TRILHA — pedido de 06/08: "faz uma coisa bonita, sofisticada aí de
            trilha e jornada". Era uma lista numerada dentro de uma caixa, que
            informa mas não conta percurso. Agora os passos ficam pendurados num
            fio contínuo: o fio é o que transforma itens em caminho, e o nó
            preenchido no último passo mostra onde a jornada termina — que é o
            retorno, a informação que o paciente veio buscar.
            Sem caixa e sem sombra: o traço já é a estrutura. */}
        <ol className="relative mt-12 flex flex-col">
          {SEGUNDA_OPINIAO.comoFunciona.map((passo, i) => {
            const ultimo = i === SEGUNDA_OPINIAO.comoFunciona.length - 1;
            return (
              <li key={passo.titulo} className="relative grid grid-cols-[38px_1fr] gap-5 pb-10 last:pb-0 md:grid-cols-[64px_1fr] md:gap-8">
                {/* O fio desce do nó até o próximo passo; o último não tem fio,
                    senão a trilha parece continuar depois do fim. */}
                {!ultimo && (
                  <span
                    aria-hidden
                    className="absolute left-[7px] top-5 h-full w-px md:left-[11px]"
                    style={{ background: "color-mix(in srgb, var(--color-accent-gold-light) 34%, transparent)" }}
                  />
                )}
                <div className="flex items-start gap-3 md:gap-4">
                  <span
                    aria-hidden
                    className="mt-[7px] size-[15px] shrink-0 rounded-full md:size-[23px]"
                    style={
                      ultimo
                        ? { background: "var(--color-accent-gold-light)" }
                        : {
                            background: "var(--color-bg-deep)",
                            boxShadow: "inset 0 0 0 1.5px color-mix(in srgb, var(--color-accent-gold-light) 70%, transparent)",
                          }
                    }
                  />
                </div>
                <div className="flex flex-col gap-2 pt-0.5">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold-700">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-white text-[19px] md:text-[21px]" style={{ fontWeight: 500 }}>
                    {passo.titulo}
                  </h3>
                  <p className="font-body max-w-[620px] text-white/65 text-[15px]" style={{ lineHeight: 1.65 }}>
                    {passo.texto}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </Section>

      {/* 5. Limites — compliance */}
      <Section tone="navy-800">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="flex flex-col gap-5 lg:sticky lg:top-24 lg:self-start">
            <Eyebrow>{t("forms.segundaOpiniao.limitesEyebrow")}</Eyebrow>
            {/* nbsp: evita o "é" sozinho na quebra de linha */}
            <SectionHeading tone="light">{t("forms.segundaOpiniao.limitesHeading")}</SectionHeading>
          </div>
          <div className="flex flex-col">
            {SEGUNDA_OPINIAO.oQueNaoE.map((item, i) => (
              <div key={i} className="flex items-start gap-5 border-b border-white/10 py-6 first:pt-0 last:border-b-0">
                <ShieldAlert className="mt-0.5 size-5 shrink-0 text-gold-700" strokeWidth={1.6} />
                <p className="font-body text-white/70 text-[16px]" style={{ lineHeight: 1.6 }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 6. Formulário */}
      <div ref={formRef} id="solicitar" className="scroll-mt-24">
        <Section>
          <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr]">
            <div className="flex flex-col gap-6">
              <Eyebrow>{t("forms.segundaOpiniao.solicitacaoEyebrow")}</Eyebrow>
              <SectionHeading tone="light">{t("forms.segundaOpiniao.solicitacaoHeading")}</SectionHeading>
              <p className="font-body text-white/70 text-[17px]" style={{ lineHeight: 1.7 }}>
                {t("forms.segundaOpiniao.solicitacaoIntro")}
              </p>
              <Divider tone="light" className="my-2" />
              <div className="flex flex-col gap-3">
                <span className="font-mono uppercase tracking-[0.14em] text-[12px] text-cream">
                  {t("forms.segundaOpiniao.waEquipeLabel")}
                </span>
                <a
                  href={CONTATO.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="font-display text-white text-[22px] transition-colors hover:text-gold-600"
                  style={{ fontWeight: 500 }}
                >
                  {CONTATO.whatsapp}
                </a>
              </div>
            </div>

            <div className="rounded-3xl bg-white/[0.04] p-8 md:p-10">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={t("forms.segundaOpiniao.labelNome")}>
                    <input
                      required
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder={t("forms.segundaOpiniao.phNome")}
                      className={fieldClass}
                    />
                  </Field>
                  <Field label={t("forms.segundaOpiniao.labelContato")}>
                    <input
                      required
                      type="tel"
                      value={contato}
                      onChange={(e) => setContato(e.target.value)}
                      placeholder={t("forms.segundaOpiniao.phContato")}
                      className={fieldClass}
                    />
                  </Field>
                </div>
                <Field label={t("forms.segundaOpiniao.labelCondicao")}>
                  <select
                    value={condicao}
                    onChange={(e) => setCondicao(e.target.value)}
                    className={`${fieldClass} appearance-none`}
                  >
                    <option value="" className="bg-navy-800">
                      {t("forms.segundaOpiniao.selectCondicaoDefault")}
                    </option>
                    {cards.map((c) => (
                      <option key={c.slug} value={c.title} className="bg-navy-800">
                        {c.title}
                      </option>
                    ))}
                    <option value="Ainda sem diagnóstico definido" className="bg-navy-800">
                      {t("forms.segundaOpiniao.selectCondicaoSemDiagnostico")}
                    </option>
                    <option value="Outra condição" className="bg-navy-800">
                      {t("forms.segundaOpiniao.selectCondicaoOutra")}
                    </option>
                  </select>
                </Field>
                <Field label={t("forms.segundaOpiniao.labelExames")}>
                  <select
                    value={exames}
                    onChange={(e) => setExames(e.target.value)}
                    className={`${fieldClass} appearance-none`}
                  >
                    <option value="" className="bg-navy-800">
                      {t("forms.segundaOpiniao.selectExamesDefault")}
                    </option>
                    {examesOpcoes.map((o) => (
                      <option key={o} value={o} className="bg-navy-800">
                        {o}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label={t("forms.segundaOpiniao.labelResumo")}>
                  <textarea
                    rows={4}
                    value={resumo}
                    onChange={(e) => setResumo(e.target.value)}
                    placeholder={t("forms.segundaOpiniao.phResumo")}
                    className={`${fieldClass} resize-none`}
                  />
                </Field>
                <Button type="submit" variant="gold" icon="chat" className="mt-2 w-full">
                  {t("forms.segundaOpiniao.enviarPedido")}
                </Button>
                <p className="font-body text-white/45 text-[13px]" style={{ lineHeight: 1.55 }}>
                  {t("forms.segundaOpiniao.formNota")}
                </p>
              </form>
            </div>
          </div>
        </Section>
      </div>

      {/* 7. FAQ */}
      <Section tone="navy-800">
        <Eyebrow>{t("forms.segundaOpiniao.faqEyebrow")}</Eyebrow>
        <SectionHeading tone="light" className="mt-5">
          {t("forms.segundaOpiniao.faqHeading")}
        </SectionHeading>
        <Divider tone="light" className="mt-8" />
        <div className="mt-10 flex flex-col overflow-hidden rounded-2xl bg-white/[0.04]">
          {SEGUNDA_OPINIAO.faq.map((item) => (
            <details key={item.pergunta} className="group border-b border-white/10 last:border-b-0">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 p-6 transition-colors hover:bg-white/[0.03] md:p-8">
                <h3 className="font-display text-white text-[17px] md:text-[19px]" style={{ fontWeight: 500 }}>
                  {item.pergunta}
                </h3>
                <ChevronDown
                  className="size-5 shrink-0 text-gold-600 transition-transform duration-300 group-open:rotate-180"
                  strokeWidth={1.7}
                />
              </summary>
              <p
                className="max-w-[900px] px-6 pb-6 font-body text-white/65 text-[15px] md:px-8 md:pb-8"
                style={{ lineHeight: 1.7 }}
              >
                {item.resposta}
              </p>
            </details>
          ))}
        </div>
      </Section>
    </Shell>
  );
}
