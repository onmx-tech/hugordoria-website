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

export default function App() {
  useLenis();

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <div id="inicio">
        <Hero />
      </div>

      {/* Breathing room before the horizontal-scroll pin of SectionSobre */}
      <div
        aria-hidden
        className="w-full"
        style={{ height: "40vh", backgroundColor: "#1A293F" }}
      />

      <SectionSobre />

      {/* Breathing room after the horizontal pin releases, before SectionQuote */}
      <div
        aria-hidden
        className="w-full"
        style={{ height: "30vh", backgroundColor: "#1A293F" }}
      />

      <div id="depoimentos">
        <SectionQuote />
      </div>
      <div id="especialidades">
        <SectionEspecialidades />
      </div>
      <div id="sobre-mim">
        <SectionSobreMim />
      </div>

      <FloatingNav />

      <SectionCasosDeSucesso />
      <SectionBrain />
      <Footer />
    </div>
  );
}
