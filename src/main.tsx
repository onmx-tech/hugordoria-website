import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { Retune } from "retune";
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
import "./styles/index.css";

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
    </Routes>
    {/* Overlay de edição visual (só em dev). Alt+D / Option+D para alternar. */}
    <Retune />
  </BrowserRouter>,
);
