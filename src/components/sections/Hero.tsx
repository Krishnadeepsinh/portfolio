import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, Download, Sparkles, Terminal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import HeroScene from "../three/HeroScene";
import RevealText, { Reveal } from "../animations/RevealText";
import Magnetic from "../animations/Magnetic";
import { TextScramble } from "../animations/TextScramble";

/** Typewriter effect for the subtitle */
const useTypewriter = (text: string, speed = 55, startDelay = 0) => {
  const [out, setOut] = useState("");
  useEffect(() => {
    let i = 0;
    let cancelled = false;
    const start = setTimeout(() => {
      const tick = () => {
        if (cancelled) return;
        i += 1;
        setOut(text.slice(0, i));
        if (i < text.length) setTimeout(tick, speed);
      };
      tick();
    }, startDelay);
    return () => {
      cancelled = true;
      clearTimeout(start);
    };
  }, [text, speed, startDelay]);
  return out;
};

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const scrollToProjects = () =>
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });

  // Scroll-driven parallax for the hero foreground
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "55%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [1, 0.5, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.75]);
  const titleBlur = useTransform(scrollYProgress, [0, 1], ["0px", "8px"]);

  // Mouse-driven 3D tilt on the title
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 80, damping: 18 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 80, damping: 18 });
  const transX = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 80, damping: 18 });
  const transY = useSpring(useTransform(my, [-0.5, 0.5], [-8, 8]), { stiffness: 80, damping: 18 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mx.set(e.clientX / w - 0.5);
      my.set(e.clientY / h - 0.5);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [mx, my]);

  const role = useTypewriter("Full Stack Developer", 45, 1900);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden bg-hero"
    >
      {/* 3D scene */}
      <div className="absolute inset-0">
        <HeroScene />
      </div>

      {/* Vignette + grid overlays */}
      <div className="pointer-events-none absolute inset-0 grid-overlay" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_30%,hsl(var(--background)/0.85)_85%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />

      {/* Animated scanline sweep */}
      <motion.div
        aria-hidden
        initial={{ y: "-20%", opacity: 0 }}
        animate={{ y: "120%", opacity: [0, 0.6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 1 }}
        className="pointer-events-none absolute inset-x-0 h-[2px] z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.8), transparent)",
          boxShadow: "0 0 24px hsl(var(--primary) / 0.6)",
        }}
      />


        {/* Content (parallax layer) */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
          className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-4 sm:px-6 text-center"
        >
          {/* Availability badge */}
          <Reveal delay={0.4} y={20} className="mb-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 sm:px-4 py-1.5 backdrop-blur-md shadow-[0_0_24px_hsl(var(--primary)/0.15)]"
            >
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-primary">
                Engineering Modern Full Stack Solutions
              </span>
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
            </motion.div>
          </Reveal>

          {/* Name with mouse-driven 3D tilt */}
          <motion.div
            style={{
              rotateX: rotX,
              rotateY: rotY,
              x: transX,
              y: transY,
              filter: useTransform(titleBlur, (b) => `blur(${b})`),
              transformStyle: "preserve-3d",
              perspective: 1000,
            }}
            className="will-change-transform"
          >
            <h1 className="font-display font-black tracking-tight text-[1.8rem] xs:text-3xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] break-words max-w-full">
              <span className="block break-words text-white">
                <TextScramble text="KRISHNADEEPSINH" duration={1.5} delay={700} />
              </span>
              <span className="mt-2 block bg-gradient-to-r from-primary via-indigo-300 to-primary bg-clip-text text-transparent break-words">
                <TextScramble text="CHUDASAMA" duration={1.2} delay={1200} />
              </span>
            </h1>

            {/* Underline decoration */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 2.1, duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
              className="mx-auto mt-4 h-px w-40 sm:w-64 origin-center bg-gradient-to-r from-transparent via-primary/50 to-transparent"
            />
          </motion.div>

          {/* Typewriter terminal line */}
          <Reveal delay={2.3} y={16} className="mt-6 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-md border border-primary/20 bg-background/60 px-4 py-2 font-mono text-xs sm:text-sm text-primary backdrop-blur-md shadow-lg">
              <Terminal size={14} className="text-secondary shrink-0" />
              <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                <span className="text-secondary font-bold">Focus: </span>
                {role}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
                  className="ml-0.5 inline-block w-[7px] h-[14px] -mb-0.5 bg-secondary"
                />
              </span>
            </div>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={2.6} y={20} className="mt-10 sm:mt-12 w-full sm:w-auto">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <Magnetic strength={20}>
                <button
                  onClick={scrollToProjects}
                  className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-xl bg-primary px-8 py-4 font-display text-[10px] uppercase tracking-[0.2em] font-black text-primary-foreground transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_hsl(var(--primary)/0.4)]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Projects
                    <ArrowDown size={14} className="transition-transform group-hover:translate-y-1" />
                  </span>
                </button>
              </Magnetic>

              <Magnetic strength={20}>
                <a
                  href="/resume.pdf"
                  download
                  className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-xl border border-primary/30 bg-primary/5 px-8 py-4 font-display text-[10px] uppercase tracking-[0.2em] font-black text-primary backdrop-blur-xl transition-all hover:bg-primary/10 hover:border-primary active:scale-95 hover:shadow-[0_0_20px_hsl(var(--primary)/0.15)]"
                >
                  <Download size={14} className="transition-transform group-hover:-translate-y-1" />
                  Get Resume
                </a>
              </Magnetic>
            </div>
          </Reveal>

      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Scroll
        </span>
        <div className="relative h-10 w-5 rounded-full border border-primary/40 overflow-hidden">
          <motion.div
            animate={{ y: [-6, 22, -6] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-1 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary shadow-glow-primary"
          />
        </div>
        <ArrowDown size={12} className="text-primary animate-pulse" />
      </motion.div>
    </section>
  );
};

export default Hero;
