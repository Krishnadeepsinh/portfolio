import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setCoords({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      setIsHovered(!!target.closest("button, a, .tilt-card"));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block">
      <motion.div
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
        className="flex items-center justify-center"
      >
        <div className="h-6 w-6 rounded-full border border-primary/30 relative">
          {/* Minimal crosshair */}
          <div className="absolute top-0 left-1/2 h-2 w-px bg-primary/40 -translate-x-1/2" />
          <div className="absolute bottom-0 left-1/2 h-2 w-px bg-primary/40 -translate-x-1/2" />
          <div className="absolute top-1/2 left-0 h-px w-2 bg-primary/40 -translate-y-1/2" />
          <div className="absolute top-1/2 right-0 h-px w-2 bg-primary/40 -translate-y-1/2" />
          {/* Focus dot */}
          <div className="absolute top-1/2 left-1/2 h-1 w-1 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2" />
        </div>
      </motion.div>
    </div>
  );
};

export default CustomCursor;
