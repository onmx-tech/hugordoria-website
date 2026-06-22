import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

/**
 * Renders a fixed-size Figma frame (authored at `width` × `height`) and scales
 * it down to fit the available width, so the imported design is reproduced
 * faithfully (pixel-for-pixel) while still adapting to any viewport.
 */
export function ScaledFrame({
  children,
  width = 1920,
  height = 9258,
}: {
  children: ReactNode;
  width?: number;
  height?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(() =>
    typeof window !== "undefined" ? Math.min(window.innerWidth, 1920) / width : 1,
  );

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / width);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: height * scale, overflow: "hidden", position: "relative" }}>
      <div
        style={{
          width,
          height,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}
