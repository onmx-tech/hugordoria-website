# Auditoria do briefing × site no ar

**Briefing auditado:** `Briefing_Revisao_Final_Site_Dr_Hugo_Doria_Merinno.pdf` — versão 27/07/2026, 10 páginas, 12 seções.
**Alvo medido:** `https://hugodoria.merinno.com` — HTML servido (pré-renderizado), 36 rotas baixadas nos 3 idiomas + 11 páginas de especialidade + `sitemap.xml`, `robots.txt` e o bundle JS.
**Data da medição:** 2026-07-29, **segunda passagem** (ver aviso 1).
**Escopo:** conferência. Nenhum arquivo de código foi alterado, nenhum commit, nenhum deploy.

Este documento tem duas partes independentes:
- **Parte A — conferência item a item** contra as 12 seções do briefing.
- **Parte B — riscos que o briefing não viu**: varredura própria do site, por padrão de risco, sem usar o briefing como lista. É a parte que reposiciona a conversa.

---

## Aviso de método — leia antes da tabela

**1. Houve deploy no meio da auditoria; esta é a segunda medição.** A primeira passagem mediu um site anterior aos commits `ae2f4dd`, `4d395a2` e `aceba1a`. Entre uma passagem e outra o site foi republicado: refiz o download das 69 rotas e reclassifiquei tudo. O que o deploy mudou: **§3.1 (título) e §4 (os 5 cards) entraram no ar.** Todo o resto permaneceu idêntico — duplicação, analytics, chave de i18n, menu, canonical, FAQ, bloco final, hospitais. O estado **`feito_no_codigo_nao_publicado`** sobrevive em um único item (o §4 do texto longo), e mantive a definição: pelo critério do projeto, entregue é o que está no ar.

**2. Grep não lê imagem.** A home serve 17 imagens (`/v4/procedimentos/*.webp`, `/v4/photos/*.webp`, hero). Qualquer exigência que possa estar cumprida **ou violada dentro de um PNG/JPG** — legenda embutida, texto em print, selo desenhado na arte — está fora do alcance desta auditoria. Marquei esses casos como `nao_verificavel_externamente` em vez de declarar limpo. Vale sobretudo para §5 (superlativo dentro de uma peça gráfica) e §6 (número desenhado numa imagem).

**3. Buscas por string literal usaram `grep -F`.** `"+20"`, `"+100"`, `"+9.500"` foram procurados como literal, não como regex.

---

## Placar

| Estado | Itens |
|---|---|
| `feito` | 19 |
| `parcial` | 9 |
| `nao_feito` | 10 |
| `divergente` | 6 |
| `feito_no_codigo_nao_publicado` | 1 |
| `depende_do_cliente` | 4 |
| `nao_verificavel_externamente` | 5 |

**P0 do briefing em aberto: 10.** O briefing diz na capa: *"não publicar definitivamente antes da conclusão dos itens P0"*.

**E mais 11 riscos de compliance que o briefing não listou** — Parte B. Nove deles são de gravidade igual ou maior que os P0 do cliente, incluindo três promessas de cura publicadas nos três idiomas.

---

## §2 — Elementos aprovados que devem ser preservados

| Item | Estado | Evidência medida |
|---|---|---|
| §2.1 Posicionamento "Neurocirurgia vascular e craniana de alta complexidade" | `feito` | Presente no `<h1>` da home nos 3 idiomas. |
| §2.2 Destaque para aneurismas, MAVs, cavernomas, Moyamoya, revascularização, tumores | `feito` | Subtítulo do hero lista as 6 condições; 11 cards na seção "Minhas Especialidades". |
| §2.3 Botões "Agendar consulta" e "Solicitar segunda opinião" | `feito` | Ambos no hero, 1× cada. |
| §2.4 Conteúdo textual acessível a rastreadores | `feito` | Todas as 36 rotas devolvem HTML pré-renderizado (49 KB–134 KB). Exceção em §8.3. |
| §2.5 Páginas individuais por condição, cada uma tecnicamente validada | `parcial` | 10 das 11 páginas existem e são únicas. `revascularizacao-cerebral` **não existe** — ver §8.3. |
| §2.6 Aviso de que depoimentos são experiências individuais | `feito` | *"São relatos individuais: cada caso é único e nenhum resultado pode ser garantido."* — na home e em `/depoimentos`, nos 3 idiomas. |

---

## §3 — Alterações de texto obrigatórias

| Item | Prior. | Estado | Evidência medida |
|---|---|---|---|
| §3.1 Título técnico | P0 | `divergente` | Publicado no deploy desta sessão — e **ainda diverge**. Ver quadro abaixo. |
| §3.2 Título promocional ("Melhor Neurocirurgia e Cuidados Neurológicos") | P0 | `feito` | `grep -F "Melhor Neurocirurgia"` → **0** em 50 arquivos. O hero traz "Neurocirurgia vascular e craniana de alta complexidade". |
| §3.3 Promessa ampla ("Proporcionar o melhor tratamento") | P0 | `parcial` | A frase literal sumiu da home, **mas `/doutorado` está no ar com "oferecer ao paciente o melhor tratamento possível"** — mesma promessa, outra redação. Também traz "Essa descoberta inovadora". |
| §3.4 Promessa emocional ("Transformar sua vida") | P0 | `feito` | `grep -F` → **0** ocorrências em qualquer idioma. |
| §3.5 Superlativo internacional ("excelência mundial") | P0 | `feito` | `grep -F "excelência mundial"` → **0**. Ressalva em §5.1. |
| §3.6 Chamada comercial | P0 | `divergente` | Ver quadro abaixo. |
| §3.7 Produção científica | P0 | `parcial` | O texto-problema sumiu ("revistas renomadas", "formador de opinião", "vasta experiência de 20 anos" → 0 ocorrências). O substituto no ar é *"Publicações em periódicos nacionais e internacionais de neurocirurgia, com atuação como revisor ao longo da carreira."* — **falta o trecho "participante ativo de atividades de ensino, pesquisa e formação"** da redação recomendada. |
| §3.8 Vocação e fé | P1 | `feito` | "dádiva de Deus" → **0 ocorrências**. Substituído por *"exerce a neurocirurgia como responsabilidade e vocação, colocando conhecimento e técnica a serviço da vida"*, que segue a recomendação. ⚠️ Ressalva: a citação imediatamente acima ainda diz *"resgatar a vida dos pacientes"*. |
| §3.9 Bloco final | P0 | `divergente` | Ver quadro abaixo. |

### §3.1 — Título técnico, as três redações

| | Redação |
|---|---|
| Texto que o briefing registra como problema | `Dr. Hugo Doria — Neurocirurgião vascular em São Paulo` |
| **Recomendado pelo briefing** | `Dr. Hugo Doria \| Neurocirurgi**ão** vascular e crani**ano** em São Paulo` |
| Antes do deploy desta sessão | `Dr. Hugo Doria — Neurocirurgia vascular e craniana \| São Paulo` |
| **No ar agora** | `Dr. Hugo Doria \| Neurocirurgi**a** vascular e crani**ana** em São Paulo` |

O deploy corrigiu a pontuação (barra no lugar do travessão, "em São Paulo" no fim) e **manteve a especialidade no lugar do profissional**: "Neurocirurgi**a** vascular e crani**ana**" (o campo) em vez de "Neurocirurgi**ão** vascular e crani**ano**" (a pessoa). O briefing pede o substantivo que qualifica o médico — é o que faz o título dizer *quem ele é* e não *do que o site trata*. Como `og:title` e `twitter:title` espelham o `<title>`, a divergência vai junto para o card social.

### §3.6 — Chamada comercial

| | Redação |
|---|---|
| **Recomendado** | Entre em contato com a equipe para agendar uma consulta ou solicitar uma segunda opinião especializada. |
| **No ar** | `Entre em Contato` (botão isolado, sem a frase) · EN: `Get in Touch` · ES: `Ponte en Contacto` |

### §3.9 — Bloco final

| | Redação |
|---|---|
| **Recomendado** | Avaliação especializada em neurocirurgia vascular e craniana. Entre em contato com a equipe para agendar uma consulta ou solicitar uma segunda opinião especializada. |
| **No ar (PT)** | **Cuidados Essenciais para Sua Saúde Neurológica** — Tratamento de condições cerebrovasculares e tumores cranianos com técnica microcirúrgica, avaliação individualizada e acompanhamento próximo em cada etapa. |
| **No ar (EN)** | Essential Care for Your Neurological Health |
| **No ar (ES)** | Cuidados Esenciales para tu Salud Neurológica |

"Cuidados Essenciais para Sua Saúde Neurológica" é exatamente a categoria que o briefing descreve como problema — *"texto comercial genérico ou com promessa implícita"*. Está publicado nos três idiomas.

---

## §4 — Correções de precisão médica (P0)

**Estado global: `feito` na camada do card / `feito_no_codigo_nao_publicado` no texto longo — e incompleto onde o briefing não olhou.**

Os cinco textos-problema **saíram do ar** no deploy desta sessão. Medido na segunda passagem: `"técnicas minimamente invasivas"` → **0 ocorrências** na home; `"preservação funcional"` → 2 (a redação nova, duplicada pelo §8.1). Vale para PT, EN e ES.

| Tema | Estado | Evidência |
|---|---|---|
| §4.1 Tumores cerebrais | `feito` | Card no ar: *"Avaliação e tratamento microcirúrgico de tumores cerebrais primários, metastáticos e de localização complexa, com planejamento individualizado e técnicas voltadas à preservação funcional."* — literal ao recomendado. |
| §4.2 Tumores hipofisários | `feito` | Redação recomendada no ar, literal. |
| §4.3 Neuralgia do trigêmeo | `feito` | Redação recomendada no ar, literal. |
| §4.4 Doença de Moyamoya | `feito` | Redação recomendada no ar, literal. |
| §4.5 Cavernomas | `feito` | Redação recomendada no ar, literal. |

### ⚠️ A correção alcançou o card, não a página

O §4 foi cumprido no campo `description` (o resumo do card, que aparece na home e em `/especialidades`). Dois flancos ficaram abertos:

**a) O `detailedDescription`, na mesma estrutura, não foi tocado** (`feito_no_codigo_nao_publicado` invertido: está no código, errado, e hoje não renderiza):
- `data.ts:170` (Moyamoya) — *"O Dr. Hugo Doria **é referência** nessa técnica cirúrgica altamente especializada."*
- `data.ts:140` (Tumores cerebrais) — *"...técnicas **avançadas** ... **maximizando** a remoção tumoral e **preservando a qualidade de vida do paciente**."* → o §5 proíbe frase que implique garantia de preservação funcional. Replicado em `cards-i18n/en.ts` e `es.ts`.

Medido: `grep -F "é referência"` → 0 no HTML servido, 1 no bundle JS. Risco latente, não violação publicada — volta no instante em que o texto longo reaparecer numa página.

**b) O corpo das páginas de especialidade nunca esteve no escopo do §4** — e é onde estão as promessas mais graves do site. Ver **Parte B**.

**Falsos positivos que verifiquei e descarto:** "é o melhor método para o diagnóstico" (`/especialidade/espasmo-hemifacial`, sobre ressonância magnética) e "melhor para pequenos tumores intracanaliculares" (`/especialidade/schwannoma-vestibular`, comparando abordagens cirúrgicas). Os dois comparam **técnicas**, não profissionais. Não são superlativo no sentido do Art. 14.

---

## §5 — Identificação profissional e compliance

| Item | Estado | Evidência medida |
|---|---|---|
| §5.1 Inserção obrigatória (nome, CRM-SP, RQE) | `divergente` | Presente em **23 de 23 páginas PT** no rodapé: `Dr. Hugo Leonardo Doria-Netto — MÉDICO — CRM/SP 118350 · RQE 48918 — Neurocirurgia`. Divergências de forma × briefing: **"Doria-Netto" com hífen** (briefing: "Doria Netto"), **"CRM/SP"** (briefing: "CRM-SP"), e a ordem `RQE … — Neurocirurgia` invertida em relação a `Neurocirurgia - RQE`. |
| §5.2 Em área visível da página **e** no rodapé | `parcial` | No rodapé: sim, em todas. Em área visível: a home traz *"Especialista registrado no CREMESP RQE 48918"* — **RQE sim, CRM não**. O briefing pede o bloco com os dois. |
| §5.3 Remover superlativos ("melhor", "excelência mundial", "resultados excepcionais") | `parcial` | "excelência mundial", "resultados excepcionais", "Melhor Neurocirurgia" → 0. **Sobreviveram:** `/sobre-mim` — *"A **excelência** não se revela apenas no resultado final"*; home — *"Dr. Hugo Doria oferece tratamentos **avançados** em neurocirurgia"* (2×, nos 3 idiomas); `/doutorado` — *"o melhor tratamento possível"* e *"descoberta inovadora"*. |
| §5.4 Nada que implique garantia de preservação funcional, cura ou transformação de vida | `parcial` | "Transformar sua vida" → 0. **Mas** `/especialidade/doenca-de-moyamoya` publica "garantir a circulação adequada" + "altamente eficaz", e o `detailedDescription` traz "preservando a qualidade de vida do paciente". |
| §5.5 Depoimentos com origem, autorização e rastreabilidade; sem curadoria repetitiva centrada em resultado | `parcial` | Ver bloco abaixo. |
| §5.6 Número público só com metodologia e fonte documentada | `feito` | Ver §6. |
| §5.7 Política de privacidade, consentimento, **aviso de cookies**, contato completo | `parcial` | Política publicada em `/privacidade` (3 idiomas, com LGPD e seção de cookies). Consentimento de dados: presente e explícito no formulário de `/contato`. **Aviso/banner de cookies: NÃO EXISTE** — `grep -iE 'cookie[- ]?(banner\|consent\|notice)\|aceitar cookies'` → 0 no HTML de todas as rotas. |

### §5.5 — o que realmente está publicado em depoimentos

Corrijo um pressuposto que circulou hoje: **a galeria de 24 prints não está no ar.** Medido: `grep -oE '/v4/depoimentos/'` → **0 ocorrências** no HTML de todas as 36 rotas. Os 24 PNGs existem em `public/v4/depoimentos/` e são referenciados 25× no bundle JS, mas o commit `4d395a2` ("Retira a galeria de 24 prints de avaliações") já os desligou; `DEPOIMENTOS_GALERIA` segue importado em `InstitucionalPages.tsx` sem uso.

O que está publicado são **6 depoimentos em texto**, já anonimizados no padrão primeiro nome + inicial. Cinco falam de acolhimento, explicação e atenção — exatamente o registro seguro. Três pontos:

1. **Um dos seis traz superlativo de resultado:** *"conduziu minha cirurgia de forma **impecável**"* (Rita N.) — no carrossel da home **e** em `/depoimentos`, nos 3 idiomas. Cai no §5.3.
2. **A origem é declarada de duas formas diferentes.** Home: *"Avaliações publicadas por pacientes em plataformas públicas."* `/depoimentos`: *"Mensagens de pacientes e familiares ao longo dos anos."* O §5.5 exige origem rastreável — duas descrições incompatíveis do mesmo conteúdo enfraquecem isso.
3. **"Marjouri G." não diz no site o que escreveu no print.** O print `depo-23.png` traz *"Que tradução perfeita desse dom brilhante!"*; o site publica um texto inteiramente diferente sob a mesma atribuição. Não sei a origem do texto publicado (pode vir do Doctoralia ou do Google, não do Instagram) — por isso não classifico como erro, mas **precisa de rastreabilidade documentada** antes de publicar, porque atribui fala a uma paciente identificável por primeiro nome + inicial.

---

## §6 — Indicadores numéricos

| Item | Estado | Evidência medida (`grep -F`, string literal) |
|---|---|---|
| §6.1 "Mais de 20 anos" | `feito` | `"+20"` → **0** · `"20 anos"` → **1**, e a única ocorrência é dentro do texto-problema já removido da home. Nenhum selo numérico no HTML. |
| §6.2 "Mais de 100 artigos" | `feito` | `"+100"` → **0** · `"100 artigos"` → **0**. |
| §6.3 "Mais de 9.500 pacientes" | `feito` | `"9.500"` → **0** · `"9500"` → **0** · `"+9"` → **0**. |
| §6.x Número dentro de imagem | `nao_verificavel_externamente` | As 17 imagens servidas não foram inspecionadas visualmente. Um "+20 anos" desenhado numa arte passaria por esta auditoria sem ser visto. Exige revisão a olho das peças de `/v4/`. |

---

## §7 — Endereço e nomenclaturas institucionais

| Item | Estado | Evidência medida |
|---|---|---|
| §7.1 Formato do endereço | `feito` | `Rua Teixeira da Silva, 54 — conjunto 73, Bela Vista, São Paulo — SP, CEP 04002-030`. Conteúdo idêntico ao recomendado; a quebra em 3 linhas virou linha única com travessão, o que o briefing autoriza ("ajuste de layout"). Consistente no rodapé de todas as páginas, em `/contato`, `/localizacao` e no JSON-LD `PostalAddress`. |
| §7.2 "conjunto 73" é a denominação correta | `depende_do_cliente` | O briefing manda confirmar. Não é verificável por mim. |
| §7.3 Mesmo endereço no Google, Doctoralia, redes e diretórios | `nao_verificavel_externamente` | Fora do site. Requer conferência canal a canal. |
| §7.4 Hospitais com denominação institucional oficial | `divergente` | **No ar:** *"Neurocirurgião nos hospitais **BP, Santa Catarina, Albert Einstein e Sírio-Libanês**"* (home, `meta description` e `og:description`, 3 idiomas). **Recomendado:** *"BP - A Beneficência Portuguesa de São Paulo, Hospital Santa Catarina - Paulista, Hospital Israelita Albert Einstein e Hospital Sírio-Libanês"*. Medido: `"Hospital Santa Catarina"` → 0 páginas · `"Hospital Israelita Albert Einstein"` → 0 · `"Hospital Sírio-Libanês"` → 0 · `"Beneficência Portuguesa"` → 3 páginas, e só em `/publicacoes` (afiliação de artigo). |
| §7.5 Lista de hospitais validada pelo Dr. Hugo | `depende_do_cliente` | — |
| §7.6 Logotipos institucionais só com autorização | `nao_verificavel_externamente` | Nenhum logo de hospital encontrado como `<img>`; se houver logo dentro de uma arte composta, grep não vê. |

---

## §8 — Correções técnicas obrigatórias

| Item | Prior. | Estado | Evidência medida |
|---|---|---|---|
| §8.1 Duplicação de conteúdo no DOM | P0 | `nao_feito` | Contagem no texto extraído da home PT: bloco de autoridade **2×** ("Coordenador do Departamento de Neurocirurgia Vascular"), subtítulo do hero **2×**, seção "Minhas Especialidades" inteira **2×** (os 11 cards repetidos), navegação **2×**. É a versão desktop + a versão mobile ambas presentes no HTML — exatamente o problema descrito. Um leitor de tela percorre a lista de especialidades duas vezes. |
| §8.2 Título e metadados em todas as páginas | P0 | `parcial` | `title`, `description`, `canonical`, OG completo (7 tags), Twitter Card, `hreflang` ×4 e JSON-LD presentes em todas as rotas. **Duas falhas:** o `<title>` diverge do recomendado (§3.1) e **`/especialidade/revascularizacao-cerebral` repete o título da home** (§8.3). |
| §8.3 Páginas internas validadas individualmente | P0 | `parcial` | 22 rotas com título exclusivo, `h1` único, `canonical` próprio, `BreadcrumbList` e `MedicalWebPage`+`MedicalCondition` nas especialidades. **Duas falhas graves:** (a) **`/especialidade/revascularizacao-cerebral` não é pré-renderizada** — devolve byte a byte o HTML da **home**, com `<title>` da home e `canonical` apontando para `/`; está linkada na home e no rodapé; (b) **nenhuma das 11 páginas de especialidade tem perguntas frequentes** — `FAQPage` → 0; só `/segunda-opiniao` tem. O §8.3 pede FAQ explicitamente. |
| §8.4 Migração para hugodoria.com.br | P0 | `nao_feito` | Ver bloco abaixo — é o item mais grave da auditoria. |
| §8.5 GA4, Tag Manager, eventos de conversão | P0 | `nao_feito` | `gtag` → **0** · `googletagmanager` → **0** · `GTM-` → **0** · `G-` → **0**, no HTML de todas as 36 rotas **e** no bundle JS (585 KB). Nenhuma instrumentação. Nada de cliques no WhatsApp, formulário, origem do lead, consulta marcada ou cirurgia atribuída. (`analytics` e `clarity` deram match no grep, mas são falsos positivos: palavras nos textos EN/ES — verifiquei o contexto.) |
| §8.6 Mobile e desempenho | P1 | `nao_verificavel_externamente` | Não medi Core Web Vitals — exige navegador e rede controlada. O que dá para afirmar por HTML: imagens em WebP responsivo com `srcSet`, `width`/`height` presentes, `loading="lazy"` abaixo da dobra. O peso de HTML da home (134 KB) é inflado pela duplicação do §8.1. |
| §8.7 Acessibilidade | P1 | `parcial` | Medido: 32 `<img>` na home, **0 sem `alt`**, 0 com `alt=""`; `/contato` tem 10 campos e 10 `<label>` + 7 `aria-label`; `lang` correto por idioma (`pt-BR`/`en`/`es`); hierarquia h1→h2→h3 sem salto. **Faltas:** nenhum *skip link* ("pular para o conteúdo") e a duplicação do §8.1 é, por si, um defeito de navegação assistiva. Contraste e navegação por teclado exigem navegador — não medidos. |
| §8.8 Idiomas com revisão profissional | P1 | `parcial` | Estrutura correta: URLs próprias (`/en/`, `/es/`), `hreflang` com `x-default`, `og:locale` + `og:locale:alternate`, metadados traduzidos por rota. **Mas há texto provisório vazando** — ver §11. A qualidade da tradução em si é `depende_do_cliente`. |

### §8.4 — Migração: o site está publicado apontando para outro site

Este é o achado mais grave e ninguém precisa esperar o cliente para vê-lo.

O site está no ar em `hugodoria.merinno.com`, mas **todo o seu SEO aponta para `hugodoria.com.br`**:

- `canonical` da home → `https://hugodoria.com.br/`
- `og:url`, `hreflang` (×4) e o `sitemap.xml` inteiro (33 URLs) → `hugodoria.com.br`
- `robots.txt` → `Sitemap: https://hugodoria.com.br/sitemap.xml`

E `hugodoria.com.br` **hoje é o WordPress antigo**. Medido: responde 200, `<title>` "Dr. Hugo Doria – Neurocirurgião", com `wp-content`, `WordPress` e `Elementor` no HTML.

Consequências já mensuráveis:

1. **`og:image` está quebrado.** O card aponta para `https://hugodoria.com.br/og/og-default.jpg` → **404**. O mesmo arquivo responde **200 image/jpeg** em `hugodoria.merinno.com`. Ou seja: **todo compartilhamento do site novo no WhatsApp ou no LinkedIn sai hoje sem imagem.**
2. **O sitemap lista URLs que não existem.** `hugodoria.com.br/especialidade/aneurisma-cerebral` → **404**. Se esse sitemap for enviado ao Search Console, ele entrega uma lista de páginas mortas.
3. **O canonical entrega o ranqueamento ao site antigo.** Todo sinal do site novo credita o WordPress.

Redirecionamentos 301: `hugodoria.com.br/sobre-mim` responde 301 (o WP antigo já redireciona algo), mas o mapa completo das URLs antigas → novas não foi testado e não é auditável sem a lista de URLs do WordPress.

---

## §9 — Menu e arquitetura de navegação (P1)

**Estado: `nao_feito`.** Nenhum dos dois menus do site corresponde ao recomendado, e é idêntico nos 3 idiomas.

| Posição | Briefing | Header no ar (PT) | FloatingNav no ar |
|---|---|---|---|
| 1 | Início | Início | Início |
| 2 | Sobre | Sobre mim | Especialidades |
| 3 | Áreas de atuação | Depoimentos | Sobre mim |
| 4 | **Segunda opinião** | Especialidades | Depoimentos |
| 5 | Formação e pesquisa | **Doutorado** | Segunda opinião |
| 6 | Conteúdos | **Eventos** | Agendar |
| 7 | **Contato** | — | — |

Três problemas, em ordem de gravidade:

1. **"Contato" não existe no menu principal.** A página `/contato` está publicada, tem formulário completo, WhatsApp e e-mail — e não é alcançável pelo header. Só pelo rodapé. Para um site cujo objetivo declarado é conversão, é a falha mais cara da seção.
2. **"Segunda opinião" também não está no header** (só no FloatingNav e no rodapé), apesar de ser um dos dois CTAs aprovados no §2.3 e de ter jornada própria no §10.5.
3. **"Doutorado" e "Eventos" seguem ocupando posição prioritária** — exatamente o que o briefing pede para evitar. Não foram incorporados a "Formação e pesquisa" nem a "Conteúdos"; essas duas categorias não existem no site.

EN e ES espelham o mesmo desenho (`Home / About / Reviews / Specialties / Doctorate / Events`; `Inicio / Sobre mí / Opiniones / Especialidades / Doctorado / Eventos`).

---

## §10 — Estrutura recomendada da página inicial

| Item | Estado | Evidência medida |
|---|---|---|
| §10.1 Primeira tela: título + subtítulo clínico + 2 botões | `feito` | `h1` com o posicionamento, subtítulo listando as condições, "Agendar consulta" e "Solicitar segunda opinião". |
| §10.2 Áreas prioritárias | `parcial` | 11 cards presentes. Cobrem aneurismas, MAVs, cavernomas, Moyamoya, revascularização e tumores cranianos. **"Conflitos neurovasculares"** não aparece como categoria nomeada na home — existe só como família interna (`family: "conflitos"`) e como itens soltos (neuralgia do trigêmeo, espasmo hemifacial). |
| §10.3 "Por que procurar avaliação especializada" | `nao_feito` | **Bloco inexistente.** Medido na home PT: `"Por que procurar"` → 0 · `"avaliação especializada"` → 0 · `"revisão de exames"` → 0 · `"riscos e benefícios"` → 0. É a seção que o briefing usa para explicar diagnóstico, decisão terapêutica e individualização de risco — o argumento central do posicionamento. |
| §10.4 Autoridade médica sem currículo longo | `feito` | Bloco de trajetória com formação (Evandro de Oliveira), experiência internacional (UCSF, Barrow), doutorado e coordenação na SBN. Conciso. |
| §10.5 Segunda opinião com jornada própria | `parcial` | A página `/segunda-opiniao` existe, é boa e tem FAQ com `FAQPage`. **Mas não há bloco de segunda opinião na home** — só o botão do hero. O briefing pede a jornada como item da estrutura da página inicial. |
| §10.6 Depoimentos com origem e aviso ético | `parcial` | Aviso ético: presente. Origem: contraditória entre home e `/depoimentos` — ver §5.5. |
| §10.7 Contato: endereço, telefone, WhatsApp, formulário, identificação | `parcial` | Tudo isso existe em `/contato` (formulário com 10 campos, consentimento LGPD, WhatsApp `+55 (11) 97162-2777`, e-mail, endereço, horário). **Na home**, porém, só o rodapé — não há seção de contato, e o menu não leva até ela (§9). |

---

## §11 — Critérios de aceite antes da publicação

| # | Critério | Estado | Nota |
|---|---|---|---|
| 1 | CRM-SP e RQE inseridos e validados | `parcial` | Inseridos em 23 páginas; grafia divergente (§5.1); validação pelo médico é `depende_do_cliente`. |
| 2 | Superlativos e promessas implícitas removidos | `parcial` | Os do §3 saíram; sobrevivem "excelência" (`/sobre-mim`), "tratamentos avançados" (home ×2), "o melhor tratamento possível" (`/doutorado`), "impecável" (depoimento) e "garantir…altamente eficaz" (`/especialidade/doenca-de-moyamoya`). |
| 3 | Textos clínicos corrigidos conforme o briefing | `nao_feito` | Os 5 textos do §4 estão no ar. Corrigidos no código, não publicados. |
| 4 | Duplicações removidas do conteúdo rastreável e da navegação assistiva | `nao_feito` | §8.1 — medida e confirmada. |
| 5 | Título técnico, descrição e metadados atualizados | `parcial` | §3.1 e §8.2. |
| 6 | Endereço e nomes institucionais padronizados | `parcial` | Endereço sim; hospitais não (§7.4). |
| 7 | Números públicos validados ou retirados | `feito` | Nenhum número no HTML. Ressalva: imagens não inspecionadas. |
| 8 | Todas as páginas internas revisadas individualmente | `nao_feito` | `/especialidade/revascularizacao-cerebral` serve a home; nenhuma especialidade tem FAQ. |
| 9 | Redirecionamentos 301 e migração testados | `nao_feito` | §8.4. |
| 10 | GA4, Tag Manager e eventos configurados | `nao_feito` | Zero instrumentação (§8.5). |
| 11 | Versões mobile e desktop testadas | `nao_verificavel_externamente` | Exige navegador. |
| 12 | Política de privacidade, cookies e consentimentos publicados | `parcial` | Política e consentimento sim; **aviso de cookies não existe**. |
| 13 | Traduções revisadas profissionalmente | `parcial` | Estrutura correta, mas com texto provisório vazando (linha 14). Qualidade: `depende_do_cliente`. |
| 14 | Nenhum erro ortográfico, texto provisório ou link quebrado | `nao_feito` | **Chave de tradução vazando como texto visível:** `home.casos.roles.paciente` aparece **6× em `/depoimentos`, em cada um dos 3 idiomas — 18 ocorrências publicadas**, ao lado do nome de cada paciente ("Rita N. · home.casos.roles.paciente"). Links internos: os 32 distintos respondem 200, mas `/especialidade/revascularizacao-cerebral` responde 200 servindo a página errada — quebrado de fato, não de status. |

---

## §12 — Ordem de execução recomendada

| Fase | Estado |
|---|---|
| Fase 1 — Correção crítica (compliance, superlativos, textos médicos, identificação, duplicações, título técnico, endereço, números) | `parcial` — identificação, endereço e números feitos; textos médicos, duplicações, superlativos residuais e título em aberto. |
| Fase 2 — Validação técnica (páginas internas, responsividade, acessibilidade, desempenho, formulários, mensuração) | `parcial` — formulários prontos; mensuração zerada; páginas internas com 2 falhas. |
| Fase 3 — Migração | `nao_feito` — e hoje está no pior estado possível: publicado num domínio, apontando canonical para outro. |

*Nota: a página 10 do PDF corta no meio do bloco "Fase 3 - Migração". O texto completo dessa fase não está no arquivo que recebi — se houver uma página 11, ela não veio.*

---

# PARTE B — Riscos que o briefing NÃO viu

O briefing é a lista do **cliente**, não a lista dos riscos. Ele foi montado olhando a home, o título, o endereço e cinco descrições de card. **Nunca leu o corpo das 11 páginas de especialidade** — que é justamente onde mora o texto clínico mais afirmativo do site.

Varri o site inteiro por padrão de risco, sem consultar o briefing: garantia, cura, absolutos ("sempre", "todos", "único"), percentual de resultado e superlativo comparativo. Nas 3 línguas. Foram **11 achados**, e nove deles têm gravidade igual ou maior que os P0 da lista do cliente.

## A régua aplicada aos percentuais

Adotei o critério formulado nesta rodada: **percentual sobre a DOENÇA é epidemiologia e pode ficar; percentual sobre o RESULTADO do tratamento é promessa e não pode.**

Extraí **os 30 percentuais do site** com contexto e classifiquei um a um. O resultado é uma boa notícia antes da má:

| Veredito | Qtde | Exemplos |
|---|---|---|
| **Epidemiologia / história natural — legítimo** | 26 | "90% são saculares"; "0,1% da população"; "risco anual de hemorragia de 2% a 4%"; "30–50% dos casos são familiares"; "94% perda auditiva unilateral"; "40–70% vasoespasmo" |
| **Acurácia de exame diagnóstico — legítimo** | 1 | "TC positiva em 98–100% dos casos nas primeiras 12 horas" (desempenho do exame, não do tratamento) |
| **RESULTADO DE TRATAMENTO — promessa** | **4** | todos na mesma página: neuralgia do trigêmeo |
| Descrição clínica que o grep pegou por engano | 1 | "Remissão completa entre as crises" (característica da doença, não desfecho cirúrgico) |

**O lastro epidemiológico do site é sério e deve ser preservado** — 27 dos 30 números são dados de doença, corretamente contextualizados. O problema é cirúrgico e está concentrado em um lugar só.

## B1 — As três promessas de cura publicadas (P0, gravidade máxima)

Estão em **citações destacadas** — o único elemento tipograficamente enfatizado de cada página. Nos três idiomas.

| Página | Citação no ar | Por quê |
|---|---|---|
| `/especialidade/mavs` | *"A ressecção deve ser **sempre** completa, **garantindo** a **plena cura** da doença."* | Três vedações numa frase de 11 palavras: absoluto + o verbo literal da vedação + cura. Replicado: `esp-en-mavs` ("full cure"), `esp-es-mavs` ("garantizando… plena cura"). |
| `/especialidade/cavernomas` | *"A ressecção microcirúrgica é o tratamento de escolha e **o único definitivo e curativo**."* | Cura + exclusividade. Aparece **2×** na página (corpo + citação). Replicado em EN ("only definitive") e ES ("único definitivo"). |
| `/especialidade/espasmo-hemifacial` | *"…o tratamento cirúrgico é **o único definitivo**"* + no lead do card: *"tratadas de forma **definitiva** por descompressão microvascular"* | Definitividade afirmada duas vezes, uma delas no resumo que aparece na listagem. Replicado em EN/ES. |

## B2 — A página de neuralgia do trigêmeo é construída sobre um percentual de resultado (P0)

Não é "um número solto". **O mesmo dado aparece 4 vezes**, em quatro camadas diferentes da página:

1. **No lead**, logo abaixo do título: *"Dor facial lancinante em crises, com **ótimo resultado cirúrgico — até 85% dos pacientes sem sintomas**."*
2. **No corpo**, na descrição da técnica: *"…regressão completa dos sintomas em até 85% dos casos."*
3. **Na citação destacada**: *"A cirurgia apresenta **ótimo resultado**, com regressão completa dos sintomas em até 85% dos casos."*
4. **Na "Ficha rápida"**, como dado estruturado: campo rotulado **"Resultado — Até 85% sem dor"**.

O item 4 é o mais grave dos quatro, e há uma prova de que é anomalia e não escolha editorial: **das 10 fichas rápidas do site, essa é a única com um campo chamado "Resultado".** As outras nove usam rótulos neutros — Abordagem, Diagnóstico, Incidência, Acompanhamento, Localização, Causa, Classificação, Complemento, Taxa de hemorragia. A de Moyamoya inclusive usa **"Objetivo — Prevenir AVC"**, que é exatamente a formulação correta.

O padrão do sistema já está certo. Só essa página saiu dele.

## B3 — Garantia técnica em mais duas páginas (P0)

| Página | Trecho no ar |
|---|---|
| `/especialidade/aneurisma-cerebral` | *"…técnicas de bypass (EC-IC ou IC-IC) **garantem** a revascularização."* |
| `/especialidade/doenca-de-moyamoya` | *"Criação de novas conexões entre vasos sanguíneos para **garantir** a circulação adequada ao cérebro. **É altamente eficaz** em casos de obstrução significativa."* |

## B4 — Duas citações de benefício, gravidade média

- `/especialidade/doenca-de-moyamoya` — *"O tratamento cirúrgico especializado **reduz significativamente** o risco de AVCs e **melhora a qualidade de vida**."* Afirmação de benefício sem qualificador de caso.
- `/especialidade/aneurisma-cerebral` — *"O diagnóstico precoce muda **completamente** o prognóstico."* Absoluto, mas dirigido à **doença** e à urgência, não ao médico. O mais defensável dos dois.

**Citações que estão certas e servem de molde:** `/tumores-cerebrais` — *"O objetivo é a retirada mais ampla possível, com o menor acometimento neurológico do paciente"* (descreve **objetivo**, não desfecho); `/tumores-hipofisarios` e `/tumores-medulares` — descrevem **técnica**; `/schwannoma-vestibular` — *"**pode** levar a um melhor resultado"* (condicional explícito).

## B5 — `/doutorado` e `/publicacoes`: o §3.7 foi cumprido só na home

O briefing mandou remover "revistas renomadas", "formador de opinião" e "vasta experiência de 20 anos". Saiu da home. **Sobreviveu nas duas páginas que o briefing não abriu:**

| Página | Trecho no ar |
|---|---|
| `/doutorado` | *"…afim de oferecer ao paciente **o melhor tratamento possível**"* — é a "Promessa ampla" do §3.3, viva em outra redação |
| `/doutorado` | *"Essa **descoberta inovadora** foi desenvolvida em 4 etapas"* |
| `/doutorado` | *"publicação em **uma das melhores** revistas internacionais de neurocirurgia"* — superlativo comparativo |
| `/publicacoes` | *"na **renomada** revista internacional World Neurosurgery, um trabalho **revolucionário**"* — exatamente o termo que o §3.7 mandou tirar |
| `/sobre-mim` | *"…a **melhor** oportunidade de recuperar sua saúde"* e *"A **excelência** não se revela apenas no resultado final"* |

## B6 — O que a Parte B **não** encontrou (e é bom registrar)

Varri e **não** achei: "um dos poucos", "referência nacional/mundial" (fora do `detailedDescription` não renderizado), "pioneiro", "líder", "taxa de sucesso", "índice de sucesso", "sem riscos", "sem sequelas", "resultados excepcionais", "100% dos pacientes". Nenhum número de volume (pacientes, cirurgias, anos) em texto.

E há um contraexemplo notável: **`/segunda-opiniao` publica exatamente o texto que o resto do site deveria imitar** — *"Não há promessa de resultado. Nenhuma análise garante desfecho, cura ou ausência de complicações — o que existe é informação clara para decidir melhor."* Essa página deve ser mostrada ao cliente como prova de que o padrão correto já existe dentro do próprio site.

## Onde a Parte B não alcança

Toda a Parte B é varredura de **texto**. As 17 imagens da home e as 11 de `/v4/procedimentos/` não foram inspecionadas visualmente — uma legenda ou selo com percentual de resultado dentro de uma arte passaria por aqui sem ser vista. Exige revisão a olho.

---

# O que falta para cumprir o briefing

Ordem de gravidade **consolidada**, misturando a lista do cliente (Parte A) com a varredura própria (Parte B). Os quatro primeiros são de compliance médico e nenhum deles estava no briefing.

### 0-A. As três promessas de cura publicadas (B1) — **acima de tudo**
`/mavs` ("sempre completa, garantindo a plena cura"), `/cavernomas` ("o único definitivo e curativo", 2×) e `/espasmo-hemifacial` ("de forma definitiva", "o único definitivo"). Nos três idiomas, em citação destacada. São afirmações de **cura garantida** — a vedação mais direta da Res. CFM 2.336/2023 e o único item desta auditoria que expõe pessoalmente o médico no conselho. Nada mais na lista chega perto.

### 0-B. A página de neuralgia construída sobre "até 85%" (B2)
Quatro camadas da mesma página afirmam percentual de **resultado de tratamento**, incluindo um campo estruturado rotulado **"Resultado"** — o único assim em 10 fichas. Correção barata e de alto impacto: alinhar ao padrão que as outras nove já usam (a de Moyamoya diz "Objetivo — Prevenir AVC").

### 0-C. Garantia técnica em aneurisma e Moyamoya (B3)
"garantem a revascularização", "garantir a circulação adequada… altamente eficaz". "Garantir" é o verbo literal da vedação.

### 0-D. Superlativos em `/doutorado`, `/publicacoes` e `/sobre-mim` (B5)
O §3.7 foi cumprido só na home. "o melhor tratamento possível", "descoberta inovadora", "uma das melhores revistas", "renomada revista", "trabalho revolucionário", "excelência". São as mesmas expressões que o cliente pediu para remover — vivas nas páginas que ele não abriu.

### 1. Resolver o conflito de domínio (§8.4, P0)
O site está no ar em `merinno.com` com canonical, OG, hreflang e sitemap apontando para `hugodoria.com.br`, que ainda é o WordPress antigo. Consequência já medida e visível para qualquer pessoa: **o `og:image` responde 404 e todo compartilhamento em WhatsApp/LinkedIn sai sem imagem**. Ou migra de verdade, ou aponta `site.config.json` para o domínio onde o site efetivamente está. O estado intermediário é o pior dos três.

### 2. Completar o §4 na camada que ficou de fora (§4, P0)
Os 5 cards já estão corretos no ar — o deploy desta sessão resolveu. Falta o que o commit não alcançou: o `detailedDescription` ainda diz "é referência" e "maximizando… preservando a qualidade de vida do paciente" nos 3 idiomas (hoje não renderiza, mas volta ao ar junto com o texto longo).

### 3. Instrumentação zerada (§8.5, P0)
Nenhum GA4, nenhum GTM, nenhum evento — nem no HTML nem no bundle. Não há como medir cliques no WhatsApp, envio de formulário, origem do lead ou consulta marcada. Um site de conversão que não mede conversão não pode ser considerado homologado.

### 4. Duplicação do DOM (§8.1, P0)
Autoridade, hero e a seção inteira de 11 especialidades aparecem duas vezes no HTML servido. Afeta leitor de tela, rastreador e peso da página. É o P0 técnico mais barato de resolver e o mais visível para quem auditar o site com ferramenta de acessibilidade.

### 5. Texto provisório publicado (§11.14)
`home.casos.roles.paciente` impresso 18 vezes em `/depoimentos`, ao lado do nome de pacientes reais, nos 3 idiomas. É o tipo de erro que o cliente encontra em trinta segundos.

### 6. Duas páginas internas com defeito (§8.3, P0)
`/especialidade/revascularizacao-cerebral` devolve a home inteira, com o título e o canonical da home — título duplicado, que o próprio projeto trata como regressão. E nenhuma das 11 especialidades tem perguntas frequentes, item explícito do §8.3.

### 7. Menu (§9, P1)
"Contato" e "Segunda opinião" fora do header; "Doutorado" e "Eventos" ainda em posição prioritária. A página de contato existe e não é alcançável pela navegação principal.

### 8. Bloco final e chamada comercial (§3.6 e §3.9, P0)
"Cuidados Essenciais para Sua Saúde Neurológica" publicado nos 3 idiomas é exatamente o texto genérico que o briefing manda substituir pela redação de avaliação especializada.

### 9. Seção "Por que procurar avaliação especializada" (§10.3)
Não existe. É o bloco que sustenta o posicionamento inteiro — explicar diagnóstico, decisão terapêutica e individualização de risco.

### 10. Denominação oficial dos hospitais (§7.4, P0)
"BP, Santa Catarina, Albert Einstein e Sírio-Libanês" precisa virar a denominação institucional completa — e a mudança tem de alcançar também a `meta description` e o `og:description`, onde a versão abreviada está.

### 11. Superlativos residuais (§5.3)
"excelência" (`/sobre-mim`), "tratamentos avançados" (home ×2, 3 idiomas), "o melhor tratamento possível" + "descoberta inovadora" (`/doutorado`), "impecável" (depoimento na home e em `/depoimentos`).

### 12. Aviso de cookies (§5.7, §11.12)
A política existe; o banner de consentimento não. O critério de aceite pede os três: política, cookies e consentimentos.

### 13. Título técnico (§3.1, P0)
Mesmo depois do deploy, a redação diverge: o briefing pede **"Neurocirurgião vascular e craniano"** (o profissional) e o que está no ar traz "Neurocirurgia vascular e craniana" (a especialidade). Uma palavra, mas é a que faz o título dizer quem ele é.

---

## Recomendação de método para a conversa com o cliente

O briefing tem 12 seções e mapeou 5 textos clínicos. A varredura própria achou **11 riscos que ele não viu, e três deles são mais graves que qualquer P0 da lista**. A conclusão a levar à mesa não é "faltam N itens" — é que **a lista do cliente não é a medida do risco**.

Sugiro apresentar nesta ordem: (1) o que a lista dele pedia e já está feito, para estabelecer que o trabalho andou; (2) as três promessas de cura, que ele não pediu e que são o motivo real de não publicar; (3) `/segunda-opiniao` como prova de que o padrão correto já existe dentro do site — não é uma exigência externa, é coerência com o que o próprio site já sabe fazer.

---

## O que depende do cliente

- Confirmar se "conjunto 73" é a denominação correta do endereço (§7.2).
- Validar a lista de hospitais e autorizar o uso das denominações (§7.5).
- Confirmar a grafia oficial no cadastro: "Doria Netto" ou "Doria-Netto", "CRM-SP" ou "CRM/SP" (§5.1).
- Documentar a origem e a autorização dos 6 depoimentos publicados — em especial o atribuído a "Marjouri G.", cujo texto no site não corresponde ao print de mesma autoria (§5.5).
- Padronizar o endereço no Google, Doctoralia e demais diretórios (§7.3).

## O que não consegui verificar, e por quê

- **Texto dentro de imagem.** 17 imagens servidas na home. Um superlativo, um número ou uma legenda desenhada numa arte não aparecem em `curl` nem em `grep`. Exige revisão visual das peças de `public/v4/`.
- **Core Web Vitals e desempenho mobile** (§8.6) — exige navegador e rede controlada.
- **Contraste e navegação por teclado** (§8.7) — o HTML mostra `alt`, `label` e `lang` corretos, mas contraste se mede renderizado.
- **Qualidade das traduções** (§8.8) — verifiquei estrutura e metadados, não redação.
- **Mapa completo de redirecionamentos 301** (§8.4) — depende da lista de URLs do WordPress antigo.
