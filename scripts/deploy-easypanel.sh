#!/usr/bin/env bash
# Publica o site do Dr. Hugo na VPS do cliente (Easypanel/Swarm), sem SSH.
#
# O serviço estava preso numa IMAGEM buildada à mão (127.0.0.1:5000/hugodoria:7),
# herança da época em que o repo era privado. Hoje onmx-tech/hugordoria-website é
# público, então o Easypanel pode clonar e buildar sozinho — que é exatamente o que
# o Dockerfile deste repo foi feito para fazer (chromium do apt, prerender das 69
# rotas dentro da imagem).
#
# Uso:
#   EP_TOKEN=<chave da API do Easypanel> bash scripts/deploy-easypanel.sh
#   EP_TOKEN=<chave> ROLLBACK=1 bash scripts/deploy-easypanel.sh   # volta para a imagem :7
#
# O token NÃO fica gravado em lugar nenhum — vem por variável de ambiente.
set -euo pipefail

EP="http://179.198.121.44:3000/api/trpc"
PROJ="hugodoria"; SVC="hugodoria"
REPO="https://github.com/onmx-tech/hugordoria-website.git"
IMG_ANTERIOR="127.0.0.1:5000/hugodoria:7"
TEMP_HOST="https://hugodoria-hugodoria.vyho9y.easypanel.host"

: "${EP_TOKEN:?defina EP_TOKEN=<chave da API do Easypanel>}"

api() { # api <endpoint> <json>
  # ⚠️ `deployService` só responde quando o build TERMINA na VPS (minutos), e o
  # curl desiste antes com "Operation timed out (28)". Com `set -e` isso matava o
  # script logo depois de disparar o deploy — o build seguia rodando lá e a
  # verificação nunca acontecia aqui, o que parece falha e não é. Timeout longo,
  # e um 28 não derruba o script: quem diz se deu certo é a medição no fim.
  curl -sS -m 600 -X POST "$EP/$1" \
    -H "Authorization: Bearer $EP_TOKEN" -H "Content-Type: application/json" \
    -d "$2" || echo "(sem resposta da API — seguindo para a verificação)"
  echo
}

fonte_atual() {
  api projects.listProjectsAndServices '{"json":{}}' | python3 -c "
import sys,json
d=json.load(sys.stdin)['json']
print([s['source'] for s in d['services'] if s['name']=='$SVC'][0])"
}

echo "fonte antes: $(fonte_atual)"

if [ "${ROLLBACK:-0}" = "1" ]; then
  echo "== rollback para a imagem anterior"
  api services.app.updateSourceImage \
    "{\"json\":{\"projectName\":\"$PROJ\",\"serviceName\":\"$SVC\",\"image\":\"$IMG_ANTERIOR\"}}"
else
  echo "== aponta o serviço para o repo git"
  api services.app.updateSourceGit \
    "{\"json\":{\"projectName\":\"$PROJ\",\"serviceName\":\"$SVC\",\"repo\":\"$REPO\",\"ref\":\"main\",\"path\":\"/\"}}"
fi

echo "fonte depois: $(fonte_atual)"

echo "== deploy (build roda na VPS: npm ci + vite build + prerender das 69 rotas, ~3-5 min)"
api services.app.deployService "{\"json\":{\"projectName\":\"$PROJ\",\"serviceName\":\"$SVC\"}}"

# O Swarm só troca o container quando o novo passa no HEALTHCHECK do Dockerfile,
# que exige a home PRERENDERIZADA — build quebrado não derruba o que está no ar.
echo "== esperando a troca (checa a figura própria do MAVs, que só existe no build novo)"
for i in $(seq 1 40); do
  sleep 15
  if curl -s -m 15 "$TEMP_HOST/especialidade/mavs" | grep -q "mavs-fig01"; then
    echo "✓ no ar no host temporário depois de $((i*15))s"
    break
  fi
  printf '.'
done
echo

echo "== verificação final"
for u in "$TEMP_HOST" "https://hugodoria.com.br"; do
  printf '%-52s prerender:%s  mavs-fig01:%s  depoimento(410 esperado):%s\n' "$u" \
    "$(curl -s -m 15 "$u/" | grep -cE 'id="root"><(header|div|main)')" \
    "$(curl -s -m 15 "$u/especialidade/mavs" | grep -c 'mavs-fig01')" \
    "$(curl -so /dev/null -m 15 -w '%{http_code}' "$u/v4/depoimentos/depo-01.png")"
done
