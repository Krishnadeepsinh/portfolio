import { useEffect, useState } from "react";

const CursorGlow = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const leave = () => setHidden(true);
    const enter = () => setHidden(false);
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, []);

  // Hide on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <div
        className="cursor-dot"
        style={{
          left: pos.x,
          top: pos.y,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "hsl(var(--primary))",
          transform: "translate(-50%, -50%)",
          opacity: hidden ? 0 : 1,
          boxShadow: "0 0 12px hsl(var(--primary))",
          transition: "opacity 0.2s",
        }}
      />
      <div
        className="cursor-dot"
        style={{
          left: pos.x,
          top: pos.y,
          width: 280,
          height: 280,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, hsl(var(--primary) / 0.18) 0%, hsl(var(--secondary) / 0.08) 40%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          opacity: hidden ? 0 : 1,
          transition: "opacity 0.3s, left 0.15s ease-out, top 0.15s ease-out",
        }}
      />
    </>
  );
};

export default CursorGlow;
