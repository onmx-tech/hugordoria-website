import { useRef, useState } from "react";
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
import { CONTATO, SEGUNDA_OPINIAO } from "../content/institucional";
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

const EXAMES_OPCOES = [
  "Tenho os exames em arquivo digital (DICOM/CD)",
  "Tenho apenas os laudos",
  "Ainda não tenho os exames em mãos",
] as const;

export function SegundaOpiniaoPage() {
  useSeo({
    title: "Segunda opinião em neurocirurgia",
    description:
      "Solicite uma segunda opinião especializada com o Dr. Hugo Doria: veja quais exames e documentos enviar, como funciona a análise e o que esperar do retorno.",
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

  const formRef = useRef<HTMLDivElement>(null);

  const [nome, setNome] = useState("");
  const [contato, setContato] = useState("");
  const [condicao, setCondicao] = useState("");
  const [exames, setExames] = useState("");
  const [resumo, setResumo] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const texto = [
      "Olá! Gostaria de solicitar uma SEGUNDA OPINIÃO especializada com o Dr. Hugo Doria.",
      `Nome: ${nome}`,
      `Contato: ${contato}`,
      condicao && `Condição ou suspeita: ${condicao}`,
      exames && `Exames: ${exames}`,
      resumo && `Resumo do caso: ${resumo}`,
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
        eyebrow="Segunda opinião"
        title="Segunda opinião especializada"
        intro={SEGUNDA_OPINIAO.heroIntro}
        image="/v4/photos/retrato-sentado.jpg"
        imageAlt="Dr. Hugo Doria"
      >
        <Button
          variant="gold"
          icon="arrow"
          onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
        >
          Solicitar segunda opinião
        </Button>
      </PageHero>

      {/* 1. Abertura — por que existe */}
      <Section tone="navy-800">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="flex flex-col gap-5 lg:sticky lg:top-24 lg:self-start">
            <Eyebrow>Sobre este atendimento</Eyebrow>
            <SectionHeading tone="light">
              Decidir sobre uma cirurgia no cérebro exige mais de uma leitura.
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
        <Eyebrow>Quem deve pedir</Eyebrow>
        <SectionHeading tone="light" className="mt-5 max-w-[860px]">
          Situações em que uma segunda opinião costuma fazer diferença
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
        <Eyebrow>O que enviar</Eyebrow>
        <SectionHeading tone="light" className="mt-5 max-w-[860px]">
          Exames e documentos para a análise
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
        <Eyebrow>Como funciona</Eyebrow>
        <SectionHeading tone="light" className="mt-5 max-w-[860px]">
          Do primeiro contato ao retorno
        </SectionHeading>
        <Divider tone="light" className="mt-8" />
        <ol className="mt-10 flex flex-col overflow-hidden rounded-2xl bg-white/[0.04]">
          {SEGUNDA_OPINIAO.comoFunciona.map((passo, i) => (
            <li
              key={passo.titulo}
              className="grid gap-4 border-b border-white/10 p-6 last:border-b-0 md:grid-cols-[80px_1fr] md:gap-8 md:p-8"
            >
              <span
                className="font-display text-gold-600 text-[28px] leading-none"
                style={{ fontWeight: 400 }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-white text-[19px]" style={{ fontWeight: 500 }}>
                  {passo.titulo}
                </h3>
                <p className="font-body text-white/65 text-[15px]" style={{ lineHeight: 1.65 }}>
                  {passo.texto}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* 5. Limites — compliance */}
      <Section tone="navy-800">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="flex flex-col gap-5 lg:sticky lg:top-24 lg:self-start">
            <Eyebrow>Importante</Eyebrow>
            {/* nbsp: evita o "é" sozinho na quebra de linha */}
            <SectionHeading tone="light">{"O que a segunda opinião não\u00A0é"}</SectionHeading>
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
              <Eyebrow>Solicitação</Eyebrow>
              <SectionHeading tone="light">Envie o seu pedido</SectionHeading>
              <p className="font-body text-white/70 text-[17px]" style={{ lineHeight: 1.7 }}>
                O formulário abre uma conversa no WhatsApp da minha equipe já identificada como um
                pedido de segunda opinião. É por lá que você recebe a confirmação de recebimento e a
                orientação para enviar os exames com segurança.
              </p>
              <Divider tone="light" className="my-2" />
              <div className="flex flex-col gap-3">
                <span className="font-mono uppercase tracking-[0.14em] text-[12px] text-cream">
                  WhatsApp da equipe
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
                  <Field label="Nome completo">
                    <input
                      required
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Nome do paciente ou responsável"
                      className={fieldClass}
                    />
                  </Field>
                  <Field label="Telefone ou WhatsApp">
                    <input
                      required
                      type="tel"
                      value={contato}
                      onChange={(e) => setContato(e.target.value)}
                      placeholder="(00) 00000-0000"
                      className={fieldClass}
                    />
                  </Field>
                </div>
                <Field label="Condição ou suspeita diagnóstica">
                  <select
                    value={condicao}
                    onChange={(e) => setCondicao(e.target.value)}
                    className={`${fieldClass} appearance-none`}
                  >
                    <option value="" className="bg-navy-800">
                      Selecione, se já houver
                    </option>
                    {cards.map((c) => (
                      <option key={c.slug} value={c.title} className="bg-navy-800">
                        {c.title}
                      </option>
                    ))}
                    <option value="Ainda sem diagnóstico definido" className="bg-navy-800">
                      Ainda sem diagnóstico definido
                    </option>
                    <option value="Outra condição" className="bg-navy-800">
                      Outra condição
                    </option>
                  </select>
                </Field>
                <Field label="Você já tem os exames?">
                  <select
                    value={exames}
                    onChange={(e) => setExames(e.target.value)}
                    className={`${fieldClass} appearance-none`}
                  >
                    <option value="" className="bg-navy-800">
                      Selecione
                    </option>
                    {EXAMES_OPCOES.map((o) => (
                      <option key={o} value={o} className="bg-navy-800">
                        {o}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Resumo do caso (opcional)">
                  <textarea
                    rows={4}
                    value={resumo}
                    onChange={(e) => setResumo(e.target.value)}
                    placeholder="Em poucas linhas: o diagnóstico recebido e a conduta proposta até aqui"
                    className={`${fieldClass} resize-none`}
                  />
                </Field>
                <Button type="submit" variant="gold" icon="chat" className="mt-2 w-full">
                  Enviar pedido pelo WhatsApp
                </Button>
                <p className="font-body text-white/45 text-[13px]" style={{ lineHeight: 1.55 }}>
                  Não envie exames por este formulário. A equipe orienta o envio dos arquivos na
                  conversa, após a confirmação do recebimento do pedido.
                </p>
              </form>
            </div>
          </div>
        </Section>
      </div>

      {/* 7. FAQ */}
      <Section tone="navy-800">
        <Eyebrow>Perguntas frequentes</Eyebrow>
        <SectionHeading tone="light" className="mt-5">
          Dúvidas comuns
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
