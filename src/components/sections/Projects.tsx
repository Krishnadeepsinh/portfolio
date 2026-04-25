import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { useRef, useState, useCallback, useMemo } from "react";
import RevealText from "../animations/RevealText";

const projects = [
  {
    title: "Nexus Scientific",
    subtitle: "Research & Innovation Platform",
    description:
      "A modern scientific platform showcasing research initiatives, publications, and collaborative innovations. Built with a clean, responsive interface that highlights cutting-edge work.",
    url: "https://nexusscientific.vercel.app/",
    stack: ["React", "Vite", "Tailwind", "Vercel"],
    accent: "from-primary to-accent",
    glow: "shadow-glow-primary",
    border: "border-primary/30",
  },
  {
    title: "FleetFlow",
    subtitle: "Fleet Management System",
    description:
      "An intuitive fleet management dashboard for tracking vehicles, monitoring routes, and managing logistics operations in real time with a streamlined interface.",
    url: "https://fleetflow-beige.vercel.app/",
    stack: ["React", "TypeScript", "Tailwind", "Vercel"],
    accent: "from-secondary to-primary",
    glow: "shadow-glow-secondary",
    border: "border-secondary/30",
  },
  {
    title: "Audit Tracker",
    subtitle: "Professional Audit Management",
    description:
      "A specialized work management system designed for audit firms. Features real-time task tracking, article assignment, and comprehensive audit history with a focus on data integrity and workflow efficiency.",
    url: "https://audit-pro-ruddy.vercel.app/",
    stack: ["React", "Turso DB", "Express", "Vercel"],
    accent: "from-accent to-secondary",
    glow: "shadow-glow-accent",
    border: "border-accent/30",
  },
];

interface CardProps {
  p: typeof projects[0];
  i: number;
}

function ProjectCard({ p, i }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  // Use MotionValues for high-performance animation (no re-renders)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useMotionValue(0);
  const sy = useMotionValue(0);

  // Smooth springs for fluid motion
  const springConfig = { stiffness: 150, damping: 25 };
  const smoothMX = useSpring(mx, springConfig);
  const smoothMY = useSpring(my, springConfig);
  const smoothSX = useSpring(sx, { stiffness: 200, damping: 30 });
  const smoothSY = useSpring(sy, { stiffness: 200, damping: 30 });

  // Map mouse position to rotation
  const rotateX = useTransform(smoothMY, [-0.5, 0.5], [6.5, -6.5]);
  const rotateY = useTransform(smoothMX, [-0.5, 0.5], [-7.5, 7.5]);

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Normalized position for tilt (-0.5 to 0.5)
    mx.set((e.clientX - (rect.left + rect.width / 2)) / rect.width);
    my.set((e.clientY - (rect.top + rect.height / 2)) / rect.height);
    
    // Pixel position for spotlight
    sx.set(e.clientX - rect.left);
    sy.set(e.clientY - rect.top);
  }, [mx, my, sx, sy]);

  const handleLeave = useCallback(() => {
    setHover(false);
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  // Performance-optimized spotlight gradient string
  const spotlightGradient = useTransform(
    [smoothSX, smoothSY],
    ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, hsl(var(--primary) / 0.12), transparent 80%)`
  );
  
  const spotlightInnerGradient = useTransform(
    [smoothSX, smoothSY],
    ([x, y]) => `radial-gradient(150px circle at ${x}px ${y}px, hsl(var(--primary) / 0.25), transparent 100%)`
  );

  const innerMaskImage = useTransform(
    [smoothSX, smoothSY],
    ([x, y]) => `radial-gradient(150px circle at ${x}px ${y}px, black, transparent)`
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 80, scale: 0.95, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1200 }}
    >
        <motion.div
          ref={ref}
          onMouseMove={handleMove}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={handleLeave}
          className={`group relative flex flex-col h-full overflow-hidden rounded-2xl border ${p.border} bg-gradient-card backdrop-blur-xl transition-shadow duration-500 ${
            hover ? p.glow : "shadow-card"
          }`}
          style={{
            rotateX,
            rotateY,
            scale: hover ? 1.02 : 1,
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          {/* Spotlight Effect */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              opacity: hover ? 1 : 0,
              background: spotlightGradient,
            }}
          />
          <motion.div
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              opacity: hover ? 0.4 : 0,
              background: spotlightInnerGradient,
              maskImage: innerMaskImage,
            }}
          >
             <div className="absolute inset-0 grid-overlay opacity-50" />
          </motion.div>

          {/* Live preview iframe - Only load on hover for performance */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted shrink-0">
            {hover ? (
              <iframe
                src={p.url}
                title={p.title}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin"
                className="h-full w-full origin-top-left"
                style={{
                  transform: "scale(0.5)",
                  width: "200%",
                  height: "200%",
                  border: 0,
                  pointerEvents: "none",
                }}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-2 opacity-40">
                  <div className="h-1 bg-primary/20 w-32 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                      className="h-full bg-primary/40 w-1/2"
                    />
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-tighter">Standby Mode</span>
                </div>
              </div>
            )}
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent transition-opacity ${
                hover ? "opacity-60" : "opacity-90"
              }`}
            />
            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${p.accent} opacity-10 mix-blend-overlay`} />

            {/* Index label */}
            <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-widest text-primary backdrop-blur-md bg-background/40 px-2 py-1 rounded">
              // 0{i + 1}
            </div>

            {/* Floating launch icon */}
            <motion.div
              animate={{ y: hover ? -4 : 0, opacity: hover ? 1 : 0.6 }}
              className="absolute top-4 right-4 grid place-items-center h-10 w-10 rounded-full bg-primary text-background shadow-glow-primary"
            >
              <ArrowUpRight size={18} />
            </motion.div>
          </div>

          {/* Body */}
          <div className="relative flex-1 flex flex-col p-5 sm:p-6 md:p-8">
            <div className="flex justify-between items-start mb-2">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                {p.subtitle}
              </div>
              {hover && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="font-mono text-[8px] text-primary"
                >
                  PREVIEW_ACTIVE
                </motion.div>
              )}
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-foreground break-words group-hover:text-glow-primary transition-all">
              {p.title}
            </h3>
            <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
              {p.description}
            </p>

            <div className="mt-auto pt-6">
              <div className="flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-md border border-primary/20 bg-primary/5 text-primary"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary hover:text-glow-primary group/link"
              >
                Visit Live Site
                <ExternalLink
                  size={12}
                  className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                />
              </a>
            </div>
          </div>

          {/* Faux Reflection Effect */}
          <div className="pointer-events-none absolute -bottom-full left-0 right-0 h-full bg-gradient-to-t from-transparent to-primary/5 opacity-0 group-hover:opacity-40 transition-opacity duration-700 blur-xl scale-x-110" />

          {/* Holographic shimmer on hover */}
          <div
            className={`pointer-events-none absolute inset-0 holo-shimmer transition-opacity duration-700 ${
              hover ? "opacity-30" : "opacity-0"
            }`}
          />
        </motion.div>
    </motion.div>
  );
}

const Projects = () => {
  return (
    <div className="relative py-20 sm:py-28 md:py-32 px-4 sm:px-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-30" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[140px] animate-float-slow" />

      <div className="container relative mx-auto max-w-6xl">
        <div className="mb-12 sm:mb-16 text-center">
          <RevealText as="h2" by="letter" stagger={0.04} className="section-heading inline-block">
            Projects
          </RevealText>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-3 sm:mt-4 font-mono text-xs sm:text-sm text-muted-foreground px-4"
          >
            Live deployments — interact directly with the cards
          </motion.p>
        </div>

        <div className="grid gap-8 sm:gap-10 lg:gap-14 lg:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
