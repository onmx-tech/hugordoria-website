import { useEffect, useRef, useState } from "react";
import Doria from "../imports/Doria";
import { useLenis } from "../hooks/useLenis";
import { initDoriaReveals } from "../animations/doria-reveals";
import { ScrollTrigger } from "../lib/gsap";

export default function App() {
  const [scale, setScale] = useState(
    typeof window !== "undefined" ? Math.min(1, window.innerWidth / 1920) : 1
  );
  const stageRef = useRef<HTMLDivElement | null>(null);

  useLenis();

  useEffect(() => {
    const handleResize = () => setScale(Math.min(1, window.innerWidth / 1920));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!stageRef.current) return;
    const cleanup = initDoriaReveals(stageRef.current);
    return cleanup;
  }, []);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [scale]);

  return (
    <div style={{ width: "100%", overflow: "hidden", height: 9258 * scale }}>
      <div
        ref={stageRef}
        style={{
          width: 1920,
          height: 9258,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
        className="relative"
      >
        <Doria />
      </div>
    </div>
  );
}
