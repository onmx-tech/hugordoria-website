import { useState, useEffect } from "react";
import Doria from "../imports/Doria";

export default function App() {
  const [scale, setScale] = useState(typeof window !== 'undefined' ? Math.min(1, window.innerWidth / 1920) : 1);

  useEffect(() => {
    const handleResize = () => setScale(Math.min(1, window.innerWidth / 1920));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ width: '100%', overflow: 'hidden', height: 9258 * scale }}>
      <div style={{ width: 1920, height: 9258, transform: `scale(${scale})`, transformOrigin: 'top left' }} className="relative">
        <Doria />
      </div>
    </div>
  );
}
