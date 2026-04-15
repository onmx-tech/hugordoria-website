import { useEffect, useRef, useState } from "react";
import Doria from "../imports/Doria";
import SectionSobre from "./components/SectionSobre";
import SectionQuote from "./components/SectionQuote";
import SectionEspecialidades from "./components/SectionEspecialidades";
import { useLenis } from "../hooks/useLenis";
import { initDoriaReveals } from "../animations/doria-reveals";
import { ScrollTrigger } from "../lib/gsap";

const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 9258;
const HERO_NATIVE_H = 1084;
const REST_START = 4700;
const MIN_MOBILE_SCALE = 0.5;

function computeHeroScale() {
  if (typeof window === "undefined") return 1;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  if (vw < 1024) {
    return Math.max(MIN_MOBILE_SCALE, Math.min(1, vw / CANVAS_WIDTH));
  }
  // Contain: fit the 1920x1084 hero frame inside the viewport without clipping
  return Math.min(vh / HERO_NATIVE_H, vw / CANVAS_WIDTH);
}

function computeRestScale() {
  if (typeof window === "undefined") return 1;
  const vw = window.innerWidth;
  const natural = Math.min(1, vw / CANVAS_WIDTH);
  return vw >= 1024 ? natural : Math.max(MIN_MOBILE_SCALE, natural);
}

export default function App() {
  const [heroScale, setHeroScale] = useState(computeHeroScale);
  const [restScale, setRestScale] = useState(computeRestScale);
  const heroStageRef = useRef<HTMLDivElement | null>(null);
  const restStageRef = useRef<HTMLDivElement | null>(null);

  useLenis();

  useEffect(() => {
    const handleResize = () => {
      setHeroScale(computeHeroScale());
      setRestScale(computeRestScale());
    };
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
  }, [heroScale, restScale]);

  const restHeight = CANVAS_HEIGHT - REST_START;

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      {/* Hero — full 100vh, contained + centered inside the viewport */}
      <div
        className="relative w-full overflow-hidden flex items-center justify-center"
        style={{ height: "100vh", backgroundColor: "#122136" }}
      >
        <div
          className="relative flex-shrink-0 overflow-hidden"
          style={{
            width: CANVAS_WIDTH * heroScale,
            height: HERO_NATIVE_H * heroScale,
          }}
        >
          <div
            ref={heroStageRef}
            className="absolute left-0 top-0"
            style={{
              width: CANVAS_WIDTH,
              height: CANVAS_HEIGHT,
              transform: `scale(${heroScale})`,
              transformOrigin: "top left",
            }}
          >
            <Doria />
          </div>
        </div>
      </div>

      <SectionSobre />
      <SectionQuote />
      <SectionEspecialidades />

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
