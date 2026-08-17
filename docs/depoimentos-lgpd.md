# Prints de depoimento: o que já saiu, o que ainda está exposto

Levantado em 17/08/2026, medindo o site no ar — não lendo o código.

## O que são os arquivos

Duas pastas, 40 arquivos, nenhuma referenciada pelo site:

| Pasta | Arquivos | O que é |
|---|---|---|
| `public/v4/depoimentos/` | 24 PNG (+48 WebP derivados) | screenshots de avaliações usados na galeria antiga |
| `public/images/depoimentos/` | 16 JPG/PNG (`IMG_*`) | herança do WordPress; prints de comentários do Instagram |

Abri um deles antes de decidir qualquer coisa. `IMG_6340.jpg` é o print de um
comentário do Instagram com **@ real, nome, foto de perfil (com uma criança no
colo)** e o texto *"Eu sou um dos privilegiados que ganharam uma nova vida"* — ou
seja, a própria imagem revela que a pessoa é paciente operado.

Isso é **dado pessoal sensível** (LGPD, Art. 5º II e Art. 11: dado referente à
saúde), de pessoa **identificável**, publicado sem finalidade declarada e sem
consentimento específico. Some-se a resolução **CFM 2.336/2023**, que é o motivo
pelo qual a galeria saiu das páginas.

## O problema que ninguém tinha visto

Tirar a galeria do site **não tirou os arquivos do ar**. Eles continuavam
servidos em URL adivinhável e respondendo **200**:

```
https://hugodoria.com.br/v4/depoimentos/depo-01.png        → 200
https://hugodoria.com.br/images/depoimentos/IMG_6340.jpg   → 200
```

A galeria some da navegação, o arquivo permanece público. É a diferença entre
"não está mais no site" e "não está mais no ar".

## As quatro camadas — e onde cada uma está

| # | Camada | Estado |
|---|---|---|
| 1 | Página que exibia | ✅ removida (substituída por depoimentos em texto anonimizados) |
| 2 | Arquivo servido pelo domínio | 🔸 **regra `410 Gone` no `nginx.conf`, sobe no próximo deploy** |
| 3 | Arquivo no repositório — que é **público** | ❌ ainda lá, inclusive no histórico |
| 4 | Cache e índice do Google | ❌ pedir remoção no Search Console depois do 410 |

O código também foi limpo: a constante `DEPOIMENTOS_GALERIA`, que montava os 24
caminhos, saiu (era import órfão em `InstitucionalPages.tsx` — não renderizava
nada, mas continuava sendo a receita pronta para religar a galeria sem saber por
que ela caiu), e a pasta saiu do `optimize-images.mjs`, que ainda gerava WebP
dela a cada build.

### Camada 2 — o que o deploy resolve

```nginx
location ~ ^/(v4|images)/depoimentos/ { return 410; }
```

**410 Gone**, e não 404, pelo mesmo motivo dos restos do WordPress invadido logo
acima no arquivo: 410 diz "isto não existe mais e não volte a perguntar", e o
Google desindexa em semanas em vez de meses.

Conferir depois de publicar:

```bash
curl -so /dev/null -w '%{http_code}\n' https://hugodoria.com.br/v4/depoimentos/depo-01.png
curl -so /dev/null -w '%{http_code}\n' https://hugodoria.com.br/images/depoimentos/IMG_6340.jpg
# 410 nos dois
```

### Camada 3 — remoção do repositório (precisa de decisão)

O 410 fecha a porta do site, mas os arquivos continuam no repositório — e
`onmx-tech/hugordoria-website` é **público**. Remover do working tree:

```bash
cd ~/Documents/Cursor/hugordoria-website
git rm -r public/v4/depoimentos public/images/depoimentos
git commit -m "Remove os prints de depoimento de paciente do repositório"
git push origin main && git push cdn main
```

⚠️ Isso **não** apaga do histórico: qualquer commit anterior ainda serve as
imagens pelo GitHub. Para eliminar de verdade é preciso reescrever o histórico
(`git filter-repo --path public/v4/depoimentos --path public/images/depoimentos
--invert-paths`) e fazer force push nos dois remotes — operação destrutiva, que
quebra qualquer clone existente e precisa ser combinada com o Crasto antes.

A alternativa mais simples, e talvez a mais honesta para um repositório que
guarda dado de paciente: **tornar o repositório privado**. Ele é público hoje por
conveniência de deploy (o Easypanel clona sem credencial) — mas isso se resolve
com deploy key, e resolve a camada 3 inteira de uma vez.

### Camada 4 — Google

Depois que o 410 estiver no ar, pedir a remoção das URLs em
`search.google.com/search-console` → Remoções. Sem isso, a miniatura pode
continuar aparecendo em busca por imagem por semanas.

## Se um dia a galeria voltar

Com autorização por escrito de cada paciente, nomeada, arquivada — não com um
`Array.from`.
