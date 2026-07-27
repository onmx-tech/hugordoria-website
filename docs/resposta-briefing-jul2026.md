# Resposta ao briefing executivo — Dr. Hugo Doria

> Rascunho para o Thalyson revisar antes de enviar. Todos os números foram medidos
> em 27/jul/2026; as citações do CFM foram conferidas no PDF oficial da Resolução
> 2.336/2023 (sistemas.cfm.org.br), artigo por artigo.

---

Dr. Hugo e equipe,

Obrigado pelo documento. Vocês pediram uma opinião sincera antes de publicar, para não terem que refazer depois — e é assim que respondemos abaixo.

**Em resumo:** a estrutura do briefing é boa e vamos adotá-la como régua até a publicação. Boa parte do que ele lista como prioridade já estava construída e medida, e mostramos os números. E encontramos um ponto que não estava no documento e que preferimos tratar antes de qualquer outra coisa.

---

## 1. Um ponto para decidir antes de publicar

O site publica hoje cerca de **26 depoimentos de pacientes**: uma galeria com 24 prints de avaliações, mais citações nominais na home e nas páginas clínicas, com nome completo e a condição tratada ("Paciente — Cirurgia de Aneurisma", "Paciente — Schwannoma"), incluindo frases como *"salvaram minha vida"* e *"a cirurgia foi um sucesso"*.

A Resolução CFM 2.336/2023 não proíbe depoimento — ela pede uma forma específica, e é aí que está a diferença:

- **Art. 14, II, "g"** — depoimentos sobre a atuação do médico "devem ser **sóbrios, sem adjetivos que denotem superioridade ou induzam a promessa de resultado**".
- **Art. 14, II, "i", item 3** — é preciso "**garantir o anonimato do paciente que cedeu as imagens, mesmo que tenha recebido autorização** para divulgação". Ou seja, o consentimento do paciente não dispensa o anonimato.
- **Art. 8º, §3º** — publicações de pacientes que o médico compartilha ou reposta "passam a ser consideradas publicações suas".
- **Art. 8º, §4º** — elogios à técnica e ao resultado são analisados pela Codame quando ocorrem de modo **reiterado ou sistemático**.
- **Art. 11, XII** — é vedado "garantir, prometer ou **insinuar** bons resultados do tratamento".

A leitura é sempre caso a caso, e o material está hoje num endereço de trabalho, não no domínio público. Mas como a publicação no domínio oficial muda esse contexto, achamos que vale vocês decidirem sobre isso com calma, e não no meio do lançamento.

**Nossa recomendação segue o que a própria norma pede:** manter as avaliações, porém **anonimizadas** (primeiro nome e inicial, sem identificar o procedimento) e **filtradas** — deixando de fora as que trazem adjetivo de superioridade ou menção a resultado. Sobram menos depoimentos, e sobra o que costuma pesar mais na decisão do paciente: o relato do cuidado. Podemos montar essa versão para vocês compararem lado a lado com a atual. **A decisão é de vocês, e é a única do pacote que preferimos não tomar sozinhos.**

No mesmo capítulo, os **Art. 4º e 6º** pedem que o site traga, **na página principal**, o nome do Dr. Hugo, o número do CRM acompanhado da palavra MÉDICO, e a especialidade seguida do RQE. Já construímos essa linha no rodapé, que é compartilhado com a home e portanto atende ao Art. 6º.

Preenchemos o **CRM/SP 118350**, que localizamos em duas fontes concordantes — a página do Dr. Hugo no Hospital BP e o CliniGuia, que espelha o cadastro do CFM. Como encontramos em terceiros, e não na fonte oficial, **pedimos que vocês confirmem**. **O RQE precisa vir de vocês**: não é informação pública, e não queremos publicar número de registro por dedução.

---

## 2. Onde o site já está

O documento aponta um "risco técnico de baixa leitura por mecanismos de busca e sistemas de inteligência artificial". Esse risco de fato existia, e foi resolvido no mês passado. Os números de hoje:

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

E, a partir da leitura do documento de vocês, entregamos hoje: revisão de toda a comunicação para retirar superlativos e promessas (§10), agrupamento das áreas clínicas por natureza do problema (§3), formulário com os campos que vocês pediram, aviso de cookies com recusa tão fácil quanto o aceite, e política de privacidade (§6, §7). A medição já nasce configurada para não gravar cookie nenhum antes de o paciente autorizar.

---

## 3. O que falta, e que depende de vocês

São as entradas que nenhuma agência produz:

1. **Texto clínico de decisão.** As 11 páginas hoje trazem o que é, sintomas, diagnóstico, tratamento e recuperação. O que vocês pedem no §4 — **quando observar, quando tratar, riscos e limites, papel da microcirurgia** — é justamente o que raramente se encontra na internet e o que ajuda o paciente a escolher. Não temos como escrever isso, porque não inventamos afirmação médica. Uma sugestão prática: o Dr. Hugo grava um áudio de cinco minutos por condição, respondendo "quando eu opero e quando eu acompanho", e nós transformamos em texto para revisão.
2. **O RQE, e a confirmação do CRM.**
3. **A conta do Google Analytics.** A medição está construída e desligada, esperando o identificador. Sem ela, nenhuma consulta pode ser atribuída a canal — que é, no próprio documento de vocês (§8), o critério de "comercialmente funcional".
4. **A data da virada de domínio.** O `hugodoria.com.br` ainda serve o site antigo em WordPress.
5. **Um olhar jurídico sobre a política de privacidade.** Escrevemos com as bases legais que entendemos corretas para consultório — consentimento (art. 7º, I), legítimo interesse para dados de navegação (art. 7º, IX) e tutela da saúde quando o contato vira atendimento (art. 11, II, "f") — além do prazo de guarda de prontuário da Lei 13.787/2018. Conferimos artigo por artigo, mas não somos advogados: vale uma leitura de dez minutos do jurídico de vocês antes de publicar. O texto também depende do e-mail `contato@hugodoria.com.br`, marcado como provisório no projeto — precisamos saber se é o definitivo.

As três páginas que ainda faltam — descompressão microvascular, meningiomas e tumores da base do crânio — dependem do primeiro item.

---

## 4. Uma observação sobre o método

Vale uma observação prática, e ela começa com um erro nosso.

Ao preparar esta resposta, pedimos a uma inteligência artificial que resumisse a Resolução CFM 2.336/2023. Ela respondeu, com toda a segurança, que o "Art. 20" proíbe depoimentos de pacientes em anúncios. Esse artigo não existe — a resolução termina no Art. 17 — e a regra verdadeira diz quase o contrário: depoimento é permitido, desde que sóbrio e anônimo. Se tivéssemos confiado, teríamos recomendado a vocês remover uma seção inteira do site sem nenhuma necessidade. Só não aconteceu porque abrimos o PDF do conselho e lemos.

Guardamos a lição para nós — e ela também explica por que alguns pontos do briefing já estavam resolvidos: uma análise feita de fora não tem como medir o que está dentro do código. É a natureza da ferramenta, não um defeito do documento, que no conjunto nos foi útil.

Daí a sugestão: **quando surgir uma dúvida técnica sobre o site, pergunte direto a nós.** Respondemos com o número medido, no mesmo dia, e vocês não gastam tempo com o que já está resolvido. Esse tempo rende muito mais no conteúdo clínico — a parte que ninguém além do Dr. Hugo pode escrever, e que hoje é o que separa o site de uma publicação segura.

---

**Próximo passo que sugerimos:** vocês decidem sobre os depoimentos e nos enviam o RQE, a confirmação do CRM e a conta do Analytics. Com isso, publicamos no domínio oficial. O conteúdo clínico entra em seguida, condição por condição, sem travar o lançamento.

Ficamos à disposição para conversar sobre qualquer ponto acima.
