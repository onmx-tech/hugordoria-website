# Resposta ao briefing executivo — Dr. Hugo Doria

> Rascunho para o Thalyson revisar antes de enviar. Todos os números aqui foram
> medidos em 27/jul/2026; as citações do CFM foram conferidas no PDF oficial da
> Resolução 2.336/2023 (sistemas.cfm.org.br), artigo por artigo.

---

Dr. Hugo,

O senhor pediu opinião sincera antes de publicar, para não ter que refazer depois. É o pedido certo, e vai aqui a resposta na mesma moeda.

**Resumo:** o documento tem uma boa estrutura e vamos adotá-la como régua de aprovação. Mas o diagnóstico técnico dele está desatualizado — a maior parte do que ele marca como P0 já estava construída e medida antes de o documento chegar. Em compensação, ele não viu o único ponto do site que pode chegar ao seu CRM. É sobre esse que precisamos falar primeiro.

---

## 1. O ponto que não estava no documento — e que é o mais sério

O site publica hoje cerca de **26 depoimentos de pacientes**: uma galeria com 24 prints de avaliações, mais citações nominais na home e nas páginas clínicas, com nome completo e a condição tratada ("Paciente — Cirurgia de Aneurisma", "Paciente — Schwannoma"), incluindo frases como *"salvaram minha vida"*, *"a cirurgia foi um sucesso"* e *"minha recuperação tem sido rápida"*.

A Resolução CFM 2.336/2023 não proíbe depoimento — ela impõe uma forma. E a forma que o site usa hoje é a que a norma descreve como problema:

- **Art. 14, II, "g"** — "autorretratos repostados dos pacientes e **depoimentos sobre a atuação do médico devem ser sóbrios, sem adjetivos que denotem superioridade ou induzam a promessa de resultado**". Hoje temos publicado, entre outros, *"Neurocirurgião com expertise de nível internacional, médico de altíssimo conhecimento científico"* e *"a cirurgia foi um sucesso"*. São exatamente as duas coisas que a alínea nomeia.
- **Art. 14, II, "i", item 3** — quando o material vem do banco do próprio médico, é preciso "**garantir o anonimato do paciente que cedeu as imagens, mesmo que tenha recebido autorização** para divulgação". Consentimento não basta: o anonimato é exigido de todo modo. Hoje eles aparecem com nome completo e o procedimento a que foram submetidos.
- **Art. 8º, §3º** — publicações de pacientes que o médico compartilha ou reposta "passam a ser consideradas publicações suas". Os prints deixam de ser palavra do paciente e viram anúncio seu.
- **Art. 8º, §4º** — elogios de pacientes à técnica e ao resultado do procedimento "devem ser investigadas pela Codame quando ocorrerem de modo **reiterado e/ou sistemático**". Uma galeria de 24 é sistemática por definição.
- **Art. 11, XII** — é vedado "garantir, prometer ou **insinuar** bons resultados do tratamento". A insinuação não precisa partir do senhor: basta ser publicada pelo senhor.

Não estamos dizendo que o senhor cometeu infração — o material está num endereço de trabalho, ainda não no domínio público, e a Codame lê caso a caso. Estamos dizendo que **publicar no domínio oficial do jeito que está expõe o seu registro por um ganho de marketing pequeno.** Um site de neurocirurgia vascular não converte por depoimento; converte por clareza clínica.

**Nossa recomendação, que é o que a própria norma pede:** manter as avaliações, mas **anonimizadas** (primeiro nome e inicial, sem o procedimento identificado) e **filtradas** — fora as que contêm adjetivo de superioridade ou menção a resultado. Sobra menos depoimento e sobra o que tem valor real: o relato do cuidado, não do desfecho. Podemos preparar essa versão para o senhor comparar lado a lado com a atual. **A decisão é sua, e é a única do pacote que preferimos não tomar sozinhos.**

Ainda no mesmo capítulo, e igualmente ausente do documento: os **Art. 4º e 6º** exigem que o site traga, **na página principal**, seu nome, o número do CRM acompanhado da palavra MÉDICO, e a especialidade seguida do RQE. Hoje o site não traz nenhum dos três. Já construímos a linha no rodapé, que é compartilhado com a home e portanto cumpre a exigência do Art. 6º.

Preenchemos o **CRM/SP 118350**, que localizamos em duas fontes concordantes — sua página no Hospital BP e o CliniGuia, que espelha o cadastro do CFM. **Pedimos que o senhor confirme**, porque achamos em terceiros e não na fonte oficial. **O RQE precisa vir do senhor**: não é informação pública (o Busca Médicos do CFM exige verificação humana) e não vamos digitar número de registro por dedução.

---

## 2. O que o documento pede e já estava pronto

O documento afirma haver "risco técnico de baixa leitura por mecanismos de busca e sistemas de inteligência artificial". Esse risco existia, era real, e foi resolvido no mês passado. Medições de hoje:

| O que o documento pede (§7, §11) | Estado medido |
|---|---|
| Conteúdo no HTML inicial ou pré-renderizado | **Feito.** O site entrega 128 KB de conteúdo já montado, antes de qualquer JavaScript rodar — é o que o Google e os sistemas de IA leem |
| Título e descrição exclusivos por página | Feito, nas 21 páginas |
| URLs legíveis, canônicos, sitemap, robots.txt | Feito, gerados automaticamente a cada publicação |
| Dados estruturados (médico, artigo, perguntas, breadcrumb) | Feito |
| Desempenho móvel e Core Web Vitals | **100/100 no PageSpeed Insights do Google** (mobile). Carrega o conteúdo principal em 1,5 s |
| Imagens comprimidas, texto alternativo, HTTPS, página de erro | Feito |
| Posicionamento na primeira tela | Já é, palavra por palavra, o texto que o documento recomenda: "Neurocirurgia vascular e craniana de alta complexidade", com os dois botões separados — avaliação e segunda opinião |
| Jornada da segunda opinião | Página própria, com perguntas frequentes e aviso de que não há promessa de resultado |
| Redirecionamentos do site anterior | Feito hoje — as 20 páginas do site antigo apontam para as equivalentes |

Além disso, entregamos hoje, a partir da leitura do seu documento: limpeza de todos os superlativos e promessas da comunicação (§10), agrupamento das áreas clínicas por natureza do problema (§3), formulário com os campos que o senhor pediu, aviso de cookies com recusa tão fácil quanto o aceite, e política de privacidade (§6, §7). A medição já nasce configurada para não gravar cookie nenhum antes de o paciente autorizar.

---

## 3. O que trava a publicação — e só o senhor tem

Nada disso é trabalho de agência. São as entradas que faltam:

1. **Texto clínico de decisão.** As 11 páginas hoje têm o que é, sintomas, diagnóstico, tratamento e recuperação. O que o senhor pede no §4 — **quando observar, quando tratar, riscos e limites, papel da microcirurgia** — é justamente o que nenhum texto de internet tem e o que faz o paciente escolher. Não temos como escrever isso, e não vamos inventar afirmação médica. Sugestão prática: o senhor grava um áudio de cinco minutos por condição, respondendo "quando eu opero e quando eu acompanho", e nós transformamos em texto para o senhor revisar.
2. **O RQE, e a confirmação do CRM.** O CRM/SP 118350 já está no rodapé, achado em fontes públicas — falta o senhor confirmar. O RQE não existe em fonte pública: só o senhor tem.
3. **Conta do Google Analytics.** A medição está construída e desligada, esperando o identificador. Sem ela, nenhuma consulta pode ser atribuída a canal — que é, no seu próprio documento (§8), o critério de "comercialmente funcional".
4. **A data da virada de domínio.** O `hugodoria.com.br` ainda serve o site antigo em WordPress.
5. **Um olhar jurídico sobre a política de privacidade.** Nós a escrevemos com as bases legais que entendemos corretas para consultório — consentimento (art. 7º, I), legítimo interesse para dados de navegação (art. 7º, IX), tutela da saúde quando o contato vira atendimento (art. 11, II, "f") — e com o prazo de guarda de prontuário da Lei 13.787/2018. Conferimos artigo por artigo, mas **não somos advogados** e não vamos fingir que somos: peça ao seu jurídico uma leitura de dez minutos antes de publicar. O texto também depende do e-mail `contato@hugodoria.com.br`, que está marcado como provisório no projeto — precisamos saber se é definitivo.

As três páginas que faltam (descompressão microvascular, meningiomas e tumores da base do crânio) dependem do item 1.

---

## 4. Sobre o método — a franqueza que o senhor pediu

Para escrever esta resposta, pedimos a uma inteligência artificial que resumisse a Resolução CFM 2.336/2023. Ela nos devolveu, com toda a segurança do mundo, um "Art. 20 — não é permitido incluir depoimentos de pacientes ou ex-pacientes em anúncios". **Esse artigo não existe** — a resolução termina no Art. 17. E o erro não foi só de numeração: a regra real (Art. 14) não proíbe depoimento, ela exige sobriedade e anonimato. Ou seja, a resposta falsa teria nos levado a recomendar ao senhor que removesse uma seção inteira do site sem necessidade. Descobrimos porque abrimos o PDF do CFM e lemos os 17 artigos.

É o mesmo padrão do documento que o senhor nos enviou. Ele foi produzido olhando o site por fora, sem acesso ao código, e por isso:

- apontou como risco urgente cinco itens que já estavam construídos e medidos;
- não enxergou o único risco capaz de chegar ao seu conselho — os depoimentos;
- e dedicou sete páginas ao que cabe a nós, sem uma linha sobre o que só o senhor tem.

Uma análise que não consegue medir produz palpite confiante. E palpite confiante é caro: consome o seu tempo, o nosso, e desloca a atenção do que de fato atrasa a publicação.

O que pedimos não é que o senhor pare de trazer preocupações — é o contrário. **As suas valem mais do que qualquer análise automática**, porque o senhor é a única fonte daquilo que ainda falta: quando observar e quando operar, o que é risco e o que é limite, o que o senhor responde toda semana no consultório e não está escrito em lugar nenhum. Traga isso. A camada técnica é a nossa parte do contrato, e ela já está medida — quando houver dúvida sobre ela, é mais rápido nos perguntar: respondemos com número, não com opinião.

---

**Próximo passo que sugerimos:** o senhor decide sobre os depoimentos e nos manda CRM, RQE e a conta do Analytics. Com isso, publicamos no domínio oficial. O conteúdo clínico de decisão entra em seguida, condição por condição, sem travar o lançamento.
