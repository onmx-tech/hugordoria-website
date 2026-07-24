# Multi-idioma (PT · EN · ES) — Design

**Data:** 2026-07-24 · **Projeto:** hugordoria-website · **Motor:** padrão de site premium (sem público-alvo específico ainda) → **paridade total** nos 3 idiomas, nada de página pela metade.

## Decisões travadas

1. **URL:** prefixo só nos idiomas novos. PT na raiz (`/especialidade/aneurisma-cerebral`), EN/ES com prefixo (`/en/...`, `/es/...`). Preserva 100% das URLs PT indexadas e o canonical já no ar. `x-default` → PT.
2. **Tradução:** eu (Claude) traduzo em padrão editorial PT→EN/ES; Dr. Hugo revisa **só os claims clínicos e a home**. Full parity.
3. **Biblioteca:** `react-i18next`. Locale ativo derivado da URL.
4. **Raiz estável em PT** — sem auto-redirect por Accept-Language (footgun de SEO em SPA). Troca só pelo seletor.

## Arquitetura

### Roteamento (`src/main.tsx`)
- Prefixo de idioma como segmento opcional. Uma árvore de rotas, não triplicada:
  - PT: rotas atuais intactas.
  - EN/ES: mesmas rotas sob `/:lang(en|es)/...`.
- Um `<LocaleProvider>` lê o `:lang` da URL (default `pt`), seta `i18n.changeLanguage` e expõe o locale ativo. `<html lang>` atualizado por efeito.
- Slugs de rota **permanecem em PT** nas 3 línguas (ex.: `/en/especialidade/aneurisma-cerebral`). Decisão: menos churn, slugs são identificadores; o conteúdo é que muda. (Reavaliar só se surgir demanda de SEO por slug traduzido.)

### Strings de UI (~75 componentes)
- `react-i18next` com recursos em `src/app/i18n/locales/{pt,en,es}/*.json` (namespaces: `common`, `nav`, `home`, `forms`, `seo`...).
- Componentes consomem via `useTranslation(ns)` → `t('chave')`.
- PT é a fonte; EN/ES espelham as mesmas chaves.

### Conteúdo longo (especialidades, institucional, segunda-opinião)
- Migrar `content/especialidades/<slug>.ts` → `content/especialidades/{pt,en,es}/<slug>.ts`, **mesmo shape tipado** (`types.ts` compartilhado). PT só muda de pasta.
- `content/institucional.ts` → `content/institucional/{pt,en,es}.ts`.
- Loader `getEspecialidade(slug, locale)` / `getInstitucional(locale)` escolhe pelo idioma ativo, com fallback PT se faltar arquivo (não deve faltar — paridade).

### SEO (`src/app/seo/`)
- `useSeo` recebe `locale` → title/description/canonical **localizados e com prefixo**.
- **hreflang:** emitir `<link rel="alternate" hreflang="pt-BR|en|es|x-default">` pras 3 versões da rota atual + x-default→PT. Gerenciado com o mesmo `data-seo` de cleanup.
- `og:locale` dinâmico (`pt_BR`/`en_US`/`es_ES`) + `og:locale:alternate`.
- JSON-LD: `inLanguage` por bloco; Physician `@id` estático em PT mantido como base.
- `<html lang>` dinâmico.
- `scripts/gen-sitemap.mjs`: emitir as 3 URLs por rota indexável, com anotações hreflang. Thin-content noindex continua valendo por locale.
- `site.config.json` / `site.ts`: adicionar `LOCALES`, `DEFAULT_LOCALE`, helper `localizedPath(path, locale)`.

### Seletor de idioma
- Controle no `SiteHeader` (PT · EN · ES), com craft (não `<select>` cru) — é o sinal visível de premium. Troca = navega pra mesma rota no outro prefixo, preservando a página. Persiste em `localStorage` só como preferência de conveniência (não redireciona a raiz).

### Toques premium
- Mensagens `wa.me` e formulários da segunda-opinião localizam (texto pré-preenchido no idioma ativo).
- Analytics: evento carrega `locale`.

## Ordem de execução
1. **Fundação (inline):** lib + roteamento `:lang` + LocaleProvider + `useSeo` hreflang + `site.ts` helpers + loader de conteúdo locale-aware + seletor no header. PT 100% funcional no novo esquema; EN/ES com stub (fallback PT) pra provar o encanamento.
2. **Strings de UI:** extrair os ~75 componentes pra chaves `t()` (PT). Delegável por grupo de componentes.
3. **Tradução EN + ES:** UI JSON + conteúdo longo. Qualidade sob minha responsabilidade; extração delegável, spot-check meu nos termos clínicos.
4. **QA nos 3 idiomas:** navegar as 21 rotas × 3 locales, medir hreflang/canonical/lang no `<head>`, checar rag/overflow de texto (EN/ES são mais longos que PT), sitemap.

## Verificação
- `npm run build` = `✓ built` (não há tsc neste projeto).
- Navegador: `<html lang>`, canonical com prefixo, 3× `hreflang` + x-default por rota, seletor troca preservando a página.
- Teste de coerência: nenhuma página cai em PT quando o locale é EN/ES (paridade).

## Fora de escopo (YAGNI)
- Slugs de rota traduzidos.
- Auto-detecção/redirect por idioma na raiz.
- 4º idioma.
- Formatação ICU pesada (datas/números — o site quase não tem).
