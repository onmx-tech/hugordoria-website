import { useEffect, useRef } from "react";
import { CANVAS_H, CANVAS_W } from "./section-sobre/data";
import { SobreContent } from "./section-sobre/parts";
import { initSobreAnimation } from "./section-sobre/animations";

export default function SectionSobre() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    return initSobreAnimation({ section, track });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full lg:overflow-hidden overflow-x-auto overflow-y-hidden"
      style={{ height: "100vh", backgroundColor: "#1A293F" }}
      data-section="sobre"
      data-component="sobre"
    >
      <div
        ref={trackRef}
        className="absolute left-0 top-0 will-change-transform"
        style={{ width: CANVAS_W, height: CANVAS_H }}
      >
        <SobreContent />
      </div>
    </section>
  );
}
