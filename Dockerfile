# Build + serve do site do Dr. Hugo Doria para a VPS (Easypanel/Traefik).
#
# O ponto todo deste arquivo é o PRERENDER rodar no servidor. O site é uma SPA
# que só ganha HTML de verdade quando o scripts/prerender.mjs visita as 63 rotas
# com um Chrome headless e salva o DOM. Enquanto esse Chrome só existia no Mac
# do Thalyson, a produção dependia de `vercel build` local e todo push ficava
# vermelho no painel. Aqui o chromium vem do apt, dentro da imagem: qualquer
# push no repo reconstrói o site inteiro, prerenderizado, sem máquina no meio.

# ─────────────────────────────── build ───────────────────────────────
FROM node:22-bookworm-slim AS build

# chromium + as fontes que ele precisa para não renderizar caixinhas no snapshot
RUN apt-get update && apt-get install -y --no-install-recommends \
      chromium ca-certificates fonts-liberation fonts-noto-color-emoji \
    && rm -rf /var/lib/apt/lists/*

# puppeteer-core não baixa browser; o prerender.mjs lê este env (fallback = Mac)
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium \
    PUPPETEER_SKIP_DOWNLOAD=1 \
    NODE_OPTIONS=--max-old-space-size=2048

WORKDIR /app

# camada de dependências separada: só reinstala quando o lock muda
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# vite build + prerender das 63 rotas (pt/en/es). O prerender aborta com exit 1
# se qualquer rota não montar — build vermelho é melhor que site oco no ar.
RUN npm run build:ssg

# ─────────────────────────────── serve ───────────────────────────────
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# Prova de vida que checa o que importa: não é "o nginx respondeu 200", é "a home
# veio prerenderizada". Se um dia o snapshot falhar e sair <div id="root"></div>,
# o container fica unhealthy em vez de servir um site em branco caladinho.
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ | grep -q 'id="root"><' || exit 1
