import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { lazy, Suspense } from "react";
import App from "./app/App.tsx";
import EspecialidadePage from "./app/components/EspecialidadePage.tsx";
import { EspecialidadesPage } from "./app/pages/Especialidades.tsx";
import {
  ContatoPage,
  DepoimentosPage,
  DoutoradoPage,
  EventosPage,
  LocalizacaoPage,
  MidiaPage,
  PublicacoesPage,
  SobreMimPage,
} from "./app/pages/InstitucionalPages.tsx";
import { NotFoundPage } from "./app/pages/NotFound.tsx";
import "./styles/index.css";

// Overlay de edição visual — só existe em dev. O import dinâmico mantém a
// biblioteca inteira FORA do bundle de produção (ela não faz nada lá).
const Retune = import.meta.env.DEV
  ? lazy(() => import("retune").then((m) => ({ default: m.Retune })))
  : null;

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/especialidades" element={<EspecialidadesPage />} />
      <Route path="/especialidade/:slug" element={<EspecialidadePage />} />
      <Route path="/sobre-mim" element={<SobreMimPage />} />
      <Route path="/doutorado" element={<DoutoradoPage />} />
      <Route path="/publicacoes" element={<PublicacoesPage />} />
      <Route path="/eventos" element={<EventosPage />} />
      <Route path="/midia" element={<MidiaPage />} />
      <Route path="/depoimentos" element={<DepoimentosPage />} />
      <Route path="/contato" element={<ContatoPage />} />
      <Route path="/localizacao" element={<LocalizacaoPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    {/* Alt+D / Option+D alterna o overlay de edição visual (dev). */}
    {Retune && (
      <Suspense fallback={null}>
        <Retune />
      </Suspense>
    )}
  </BrowserRouter>,
);
