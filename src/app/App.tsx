import { useTranslation } from "react-i18next";
import { SiteHeader } from "./components/SiteHeader";
import Hero from "./components/Hero";
import SectionSobre from "./components/SectionSobre";
import SectionQuote from "./components/SectionQuote";
import SectionEspecialidades from "./components/SectionEspecialidades";
import SectionSobreMim from "./components/SectionSobreMim";
import SectionAvaliacaoEspecializada from "./components/SectionAvaliacaoEspecializada";
import SectionCasosDeSucesso from "./components/SectionCasosDeSucesso";
import SectionBrain from "./components/SectionBrain";
import Footer from "./components/Footer";
import FloatingNav from "./components/FloatingNav";
import { useLenis } from "../hooks/useLenis";
import { useSeo } from "./seo/useSeo";
import { websiteSchema } from "./seo/schema";

export default function App() {
  useLenis();
  const { t } = useTranslation("seo");
  useSeo({
    title: t("seo.home.title"),
    description: t("seo.home.description"),
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

      {/* Respiro entre o hero e o "Sobre". Eram 40vh no desktop — 326px de navy
          vazio numa tela de 816, meia dobra de nada antes de a seção começar, e
          foi exatamente isso que o cliente apontou no print. Respiro é pausa,
          não intervalo: 6vh separam sem abrir buraco. */}
      <div
        aria-hidden
        className="w-full h-[2vh] lg:h-[6vh]"
        style={{ backgroundColor: "var(--color-bg-deep)" }}
      />

      <SectionSobre />

      {/* Mesmo critério do respiro acima: o handoff entre as duas seções
          escuras é contínuo, então quase não precisa de intervalo. */}
      <div
        aria-hidden
        className="w-full h-[2vh] lg:h-[4vh]"
        style={{ backgroundColor: "var(--color-bg-deep)" }}
      />

      <SectionQuote />

      <div id="especialidades">
        <SectionEspecialidades />
      </div>
      {/* §10.3 do briefing — entra DEPOIS das especialidades e ANTES do "sobre":
          a pessoa acabou de ver o que é tratado e a pergunta seguinte é por que
          procurar alguém para isso. Só então faz sentido falar de quem é o
          médico. */}
      <SectionAvaliacaoEspecializada />

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
