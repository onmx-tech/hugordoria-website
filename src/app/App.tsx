import { SiteHeader } from "./components/SiteHeader";
import Hero from "./components/Hero";
import SectionSobre from "./components/SectionSobre";
import SectionQuote from "./components/SectionQuote";
import SectionEspecialidades from "./components/SectionEspecialidades";
import SectionSobreMim from "./components/SectionSobreMim";
import SectionCasosDeSucesso from "./components/SectionCasosDeSucesso";
import SectionBrain from "./components/SectionBrain";
import Footer from "./components/Footer";
import FloatingNav from "./components/FloatingNav";
import { useLenis } from "../hooks/useLenis";
import { useSeo } from "./seo/useSeo";
import { websiteSchema } from "./seo/schema";

export default function App() {
  useLenis();
  useSeo({
    title: "Dr. Hugo Doria — Neurocirurgião vascular em São Paulo",
    description:
      "Neurocirurgião MD PhD com atuação no BP, Santa Catarina, Albert Einstein e Sírio-Libanês. Tratamento de aneurismas, MAVs, tumores cerebrais e doenças neurológicas complexas.",
    canonicalPath: "/",
    // O perfil Physician já vai estático no index.html (crawlers sem JS);
    // aqui só o WebSite, que referencia aquele @id.
    jsonLd: [websiteSchema()],
  });

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <SiteHeader />
      <div id="inicio">
        <Hero />
      </div>

      {/* Breathing room before SectionSobre — shorter on mobile (no pin) */}
      <div
        aria-hidden
        className="w-full h-[8vh] lg:h-[40vh]"
        style={{ backgroundColor: "var(--color-bg-deep)" }}
      />

      <SectionSobre />

      {/* Respiro entre as seções — handoff contínuo, sem buracos */}
      <div
        aria-hidden
        className="w-full h-[6vh] lg:h-[18vh]"
        style={{ backgroundColor: "var(--color-bg-deep)" }}
      />

      <SectionQuote />

      <div id="especialidades">
        <SectionEspecialidades />
      </div>
      <div id="sobre-mim">
        <SectionSobreMim />
      </div>

      <div id="depoimentos">
        <SectionCasosDeSucesso />
      </div>

      <FloatingNav />

      <SectionBrain />
      <Footer />
    </div>
  );
}
