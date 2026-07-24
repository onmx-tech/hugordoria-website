import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { lazy, Suspense } from "react";
import "./app/i18n/config.ts"; // inicializa o i18next (efeito colateral)
import { LocaleLayout } from "./app/i18n/LocaleProvider.tsx";
import { PREFIXED_LOCALES } from "./app/i18n/config.ts";
import App from "./app/App.tsx";
// Rotas secundárias em lazy(): saem do bundle inicial da home (que é o LCP),
// cada uma vira um chunk carregado só quando a rota é acessada. A home (App)
// fica eager por ser a entrada crítica.
const EspecialidadePage = lazy(() => import("./app/components/EspecialidadePage.tsx"));
const EspecialidadesPage = lazy(() =>
  import("./app/pages/Especialidades.tsx").then((m) => ({ default: m.EspecialidadesPage })),
);
const SobreMimPage = lazy(() => import("./app/pages/InstitucionalPages.tsx").then((m) => ({ default: m.SobreMimPage })));
const DoutoradoPage = lazy(() => import("./app/pages/InstitucionalPages.tsx").then((m) => ({ default: m.DoutoradoPage })));
const PublicacoesPage = lazy(() => import("./app/pages/InstitucionalPages.tsx").then((m) => ({ default: m.PublicacoesPage })));
const EventosPage = lazy(() => import("./app/pages/InstitucionalPages.tsx").then((m) => ({ default: m.EventosPage })));
const MidiaPage = lazy(() => import("./app/pages/InstitucionalPages.tsx").then((m) => ({ default: m.MidiaPage })));
const DepoimentosPage = lazy(() => import("./app/pages/InstitucionalPages.tsx").then((m) => ({ default: m.DepoimentosPage })));
const ContatoPage = lazy(() => import("./app/pages/InstitucionalPages.tsx").then((m) => ({ default: m.ContatoPage })));
const LocalizacaoPage = lazy(() => import("./app/pages/InstitucionalPages.tsx").then((m) => ({ default: m.LocalizacaoPage })));
const SegundaOpiniaoPage = lazy(() =>
  import("./app/pages/SegundaOpiniao.tsx").then((m) => ({ default: m.SegundaOpiniaoPage })),
);
const NotFoundPage = lazy(() => import("./app/pages/NotFound.tsx").then((m) => ({ default: m.NotFoundPage })));
import { RouteTracker } from "./app/analytics/RouteTracker.tsx";
import { captureUtmParams } from "./app/analytics/utm.ts";
import { initWhatsAppTracking } from "./app/analytics/whatsappTracking.ts";
import "./styles/index.css";

// Overlay de edição visual — só existe em dev. O import dinâmico mantém a
// biblioteca inteira FORA do bundle de produção (ela não faz nada lá).
const Retune = import.meta.env.DEV
  ? lazy(() => import("retune").then((m) => ({ default: m.Retune })))
  : null;

// Mensuração: captura utm_* da URL de entrada (sessionStorage) e liga o
// listener delegado de cliques em wa.me. Ambas as chamadas são NO-OP se o
// GTM ainda não tiver ID real (src/app/analytics/config.ts) — custo zero
// em produção antes do container existir.
captureUtmParams();
initWhatsAppTracking();

// Árvore de rotas compartilhada pelos 3 idiomas. Paths RELATIVOS (sem "/"): o
// grupo de idioma que a envolve define o prefixo (raiz=pt, /en, /es). Chamada
// como função para gerar elementos novos por grupo (evita reuso de instância).
function appRoutes() {
  return (
    <>
      <Route index element={<App />} />
      <Route path="especialidades" element={<EspecialidadesPage />} />
      <Route path="especialidade/:slug" element={<EspecialidadePage />} />
      <Route path="sobre-mim" element={<SobreMimPage />} />
      <Route path="doutorado" element={<DoutoradoPage />} />
      <Route path="publicacoes" element={<PublicacoesPage />} />
      <Route path="eventos" element={<EventosPage />} />
      <Route path="midia" element={<MidiaPage />} />
      <Route path="depoimentos" element={<DepoimentosPage />} />
      <Route path="contato" element={<ContatoPage />} />
      <Route path="localizacao" element={<LocalizacaoPage />} />
      <Route path="segunda-opiniao" element={<SegundaOpiniaoPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    {/* Pageview por rota — fora de App.tsx de propósito (home intocável). */}
    <RouteTracker />
    <Suspense fallback={null}>
      <Routes>
        {/* PT na raiz (sem prefixo) — preserva todas as URLs já indexadas. */}
        <Route element={<LocaleLayout locale="pt" />}>{appRoutes()}</Route>
        {/* EN e ES sob prefixo. */}
        {PREFIXED_LOCALES.map((loc) => (
          <Route key={loc} path={loc} element={<LocaleLayout locale={loc} />}>
            {appRoutes()}
          </Route>
        ))}
      </Routes>
    </Suspense>
    {/* Alt+D / Option+D alterna o overlay de edição visual (dev). */}
    {Retune && (
      <Suspense fallback={null}>
        <Retune />
      </Suspense>
    )}
  </BrowserRouter>,
);
