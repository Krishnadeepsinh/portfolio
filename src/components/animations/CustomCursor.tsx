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
      {/* Outer Trailing Ring */}
      <motion.div
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          scale: isHovered ? 2.2 : 1,
          opacity: isHovered ? 0.3 : 0.8,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute h-10 w-10 rounded-full border-[1.5px] border-primary/50 shadow-[0_0_15px_hsl(var(--primary)/0.3)] backdrop-blur-sm"
      />
      
      {/* Inner Quick Dot */}
      <motion.div
        style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          scale: isHovered ? 0 : 1,
          opacity: isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
        className="absolute h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.8)]"
      />
    </div>
  );
};

export default CustomCursor;
