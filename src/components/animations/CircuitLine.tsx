import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const CircuitLine = () => {
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, { stiffness: 45, damping: 20 });
  const opacity = useTransform(scrollYProgress, [0, 0.05], [0, 0.6]);

  return (
    <div className="fixed left-4 sm:left-10 top-0 bottom-0 w-[20px] pointer-events-none z-20 hidden md:block">
      <svg width="100%" height="100%" viewBox="0 0 20 1000" preserveAspectRatio="none">
        {/* Shadow/Glow path */}
        <motion.path
          d="M 10 0 L 10 1000"
          stroke="hsl(var(--primary))"
          strokeWidth="0.5"
          fill="none"
          strokeDasharray="0 1"
          style={{ pathLength, opacity, filter: "blur(4px)" }}
        />
        {/* Main path */}
        <motion.path
          d="M 10 0 L 10 1000"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          fill="none"
          strokeDasharray="0 1"
          style={{ pathLength, opacity }}
        />
        
        {/* Junction points */}
        {[100, 300, 500, 700, 900].map((y) => (
          <motion.circle
            key={y}
            cx="10"
            cy={y}
            r="1.5"
            fill="hsl(var(--primary))"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            transition={{ delay: 0.5 }}
          />
        ))}
      </svg>
      
      {/* Percentage Counter */}
      <motion.div 
        className="absolute bottom-10 left-0 w-full flex flex-col items-center font-mono text-[8px] text-primary"
        style={{ opacity }}
      >
        <motion.span>
          {useTransform(scrollYProgress, (p) => `${Math.round(p * 100)}%`)}
        </motion.span>
        <span className="tracking-tighter opacity-50">SYNC</span>
      </motion.div>
    </div>
  );
};

export default CircuitLine;
