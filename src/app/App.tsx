import { useEffect, useRef, useState } from "react";
import Doria from "../imports/Doria";
import SectionSobre from "./components/SectionSobre";
import SectionQuote from "./components/SectionQuote";
import { useLenis } from "../hooks/useLenis";
import { initDoriaReveals } from "../animations/doria-reveals";
import { ScrollTrigger } from "../lib/gsap";

const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 9258;
const HERO_END = 1238;
const REST_START = 3500;

export default function App() {
  const [scale, setScale] = useState(
    typeof window !== "undefined"
      ? Math.min(1, window.innerWidth / CANVAS_WIDTH)
      : 1
  );
  const heroStageRef = useRef<HTMLDivElement | null>(null);
  const restStageRef = useRef<HTMLDivElement | null>(null);

  useLenis();

  useEffect(() => {
    const handleResize = () =>
      setScale(Math.min(1, window.innerWidth / CANVAS_WIDTH));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const cleanups: Array<() => void> = [];
    if (heroStageRef.current) cleanups.push(initDoriaReveals(heroStageRef.current));
    if (restStageRef.current) cleanups.push(initDoriaReveals(restStageRef.current));
    return () => cleanups.forEach((fn) => fn());
  }, []);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [scale]);

  const restHeight = CANVAS_HEIGHT - REST_START;

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      {/* Hero block — shows canvas y=0 to y=HERO_END */}
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          height: HERO_END * scale,
        }}
      >
        <div
          ref={heroStageRef}
          style={{
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
          className="relative"
        >
          <Doria />
        </div>
      </div>

      {/* Horizontal-scroll "Sobre" section */}
      <SectionSobre />

      {/* Pinned quote reveal — 100vh */}
      <SectionQuote />

      {/* Rest of canvas — shows y=REST_START to y=CANVAS_HEIGHT */}
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          height: restHeight * scale,
          position: "relative",
        }}
      >
        <div
          ref={restStageRef}
          style={{
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            position: "absolute",
            top: -REST_START * scale,
            left: 0,
          }}
          className="relative"
        >
          <Doria />
        </div>
      </div>
    </div>
  );
}
