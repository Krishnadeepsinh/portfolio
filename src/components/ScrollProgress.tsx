import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";

const chapters = [
  { id: "home", label: "Hero", num: "00" },
  { id: "about", label: "About", num: "01" },
  { id: "skills", label: "Skills", num: "02" },
  { id: "projects", label: "Projects", num: "03" },
  { id: "resume", label: "Resume", num: "04" },
  { id: "contact", label: "Contact", num: "05" },
];

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  const [active, setActive] = useState("home");
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => setScrollPct(Math.round(v * 100)));
    return () => unsub();
  }, [scrollYProgress]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    chapters.forEach((c) => {
      const el = document.getElementById(c.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting && e.intersectionRatio > 0.4) {
              setActive(c.id);
            }
          });
        },
        { threshold: [0.4, 0.6] }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const activeChapter = chapters.find((c) => c.id === active) ?? chapters[0];

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-gradient-cyber shadow-glow-primary"
      />

      {/* Floating chapter HUD (bottom-left, desktop) */}
      <div className="fixed bottom-6 left-6 z-40 hidden lg:block pointer-events-none">
        <div className="glass-panel px-4 py-2.5 flex items-center gap-3">
          <span className="font-mono text-[10px] text-primary tracking-widest">
            {String(scrollPct).padStart(2, "0")}%
          </span>
          <span className="h-3 w-px bg-border" />
          <AnimatePresence mode="wait">
            <motion.span
              key={activeChapter.id}
              initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
              transition={{ duration: 0.4 }}
              className="font-mono text-[10px] uppercase tracking-widest text-foreground"
            >
              <span className="text-primary mr-1.5">CH.{activeChapter.num}</span>
              {activeChapter.label}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Side chapter rail (desktop only) */}
      <div className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
        <ul className="flex flex-col gap-4">
          {chapters.map((c) => {
            const isActive = active === c.id;
            return (
              <li key={c.id}>
                <button
                  onClick={() => document.getElementById(c.id)?.scrollIntoView({ behavior: "smooth" })}
                  className="group relative flex items-center gap-3"
                  aria-label={`Go to ${c.label}`}
                >
                  <span
                    className={`font-mono text-[10px] tracking-widest transition-all duration-500 ${
                      isActive
                        ? "opacity-100 text-primary text-glow-primary translate-x-0"
                        : "opacity-0 -translate-x-2 group-hover:opacity-70 group-hover:translate-x-0 text-muted-foreground"
                    }`}
                  >
                    {c.num} · {c.label.toUpperCase()}
                  </span>
                  <span
                    className={`relative block h-px transition-all duration-500 ${
                      isActive
                        ? "w-12 bg-primary shadow-glow-primary"
                        : "w-5 bg-muted-foreground/40 group-hover:w-7 group-hover:bg-primary/60"
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default ScrollProgress;
