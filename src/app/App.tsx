import { useEffect, useRef, useState } from "react";
import Doria from "../imports/Doria";
import Hero from "./components/Hero";
import SectionSobre from "./components/SectionSobre";
import SectionQuote from "./components/SectionQuote";
import SectionEspecialidades from "./components/SectionEspecialidades";
import SectionSobreMim from "./components/SectionSobreMim";
import { useLenis } from "../hooks/useLenis";
import { initDoriaReveals } from "../animations/doria-reveals";
import { ScrollTrigger } from "../lib/gsap";

const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 9258;
const REST_START = 6400;

function computeRestScale() {
  if (typeof window === "undefined") return 1;
  // Contain the 1920-wide canvas inside the viewport on every breakpoint —
  // no artificial mobile floor that would clip the right side of the canvas.
  return Math.min(1, window.innerWidth / CANVAS_WIDTH);
}

export default function App() {
  const [restScale, setRestScale] = useState(computeRestScale);
  const restStageRef = useRef<HTMLDivElement | null>(null);

  useLenis();

  useEffect(() => {
    const handleResize = () => setRestScale(computeRestScale());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!restStageRef.current) return;
    const cleanup = initDoriaReveals(restStageRef.current);
    return cleanup;
  }, []);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [restScale]);

  const restHeight = CANVAS_HEIGHT - REST_START;

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <Hero />

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

      <SectionQuote />
      <SectionEspecialidades />
      <SectionSobreMim />

      {/* Rest of canvas — shows y=REST_START to y=CANVAS_HEIGHT */}
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          height: restHeight * restScale,
          position: "relative",
        }}
      >
        <div
          ref={restStageRef}
          className="relative"
          style={{
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            transform: `scale(${restScale})`,
            transformOrigin: "top left",
            position: "absolute",
            top: -REST_START * restScale,
            left: 0,
          }}
        >
          <Doria />
        </div>
      </div>
    </div>
  );
}
