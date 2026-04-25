import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

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
        animate={{
          scale: isHovered ? 2.5 : 1,
          backgroundColor: isHovered ? "hsl(var(--primary) / 0)" : "hsl(var(--primary) / 0.6)",
          borderWidth: isHovered ? "1.5px" : "0px",
          borderColor: "hsl(var(--primary) / 0.8)",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute h-4 w-4 rounded-full backdrop-blur-[2px]"
      />
    </div>
  );
};

export default CustomCursor;
