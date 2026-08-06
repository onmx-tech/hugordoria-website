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

/**
 * A HOME NÃO TEM MAIS ENTRADA POR SCROLL.
 *
 * Todas as seções nasciam escondidas (`autoAlpha: 0`, deslocadas, com clip-path
 * ou máscara) e só se montavam conforme a rolagem passava por elas. Saiu a
 * pedido, na home inteira: o conteúdo já vem pintado no HTML pré-renderizado e
 * é assim que ele fica — nada de aparecer ao ser alcançado.
 *
 * O que continua se movendo, porque é a MECÂNICA da seção e não um efeito de
 * chegada: a panorâmica horizontal do "Sobre" e das "Especialidades", a
 * sequência de frames do `SectionBrain`, o parallax dentro das fotos, e a
 * entrada dos cards de depoimento — essa última responde ao clique de
 * paginação, não à rolagem.
 */
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
