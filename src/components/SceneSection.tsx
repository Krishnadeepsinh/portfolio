import { motion, useScroll, useTransform, MotionValue, useSpring, useInView } from "framer-motion";
import { useRef, ReactNode, useState, useEffect } from "react";
import { TextScramble } from "./animations/TextScramble";

interface SceneSectionProps {
  id: string;
  chapter: string;
  title: string;
  subtitle?: string;
  description?: string;
  children: ReactNode;
  accent?: "primary" | "secondary" | "accent";
  showChapterIntro?: boolean;
}

const accentMap = {
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
};

const accentBgMap = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
};

/**
 * Cinematic chapter wrapper.
 */
const SceneSection = ({
  id,
  chapter,
  title,
  subtitle,
  description,
  children,
  accent = "primary",
  showChapterIntro = true,
}: SceneSectionProps) => {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Smooth out the scroll signal so all transforms feel cinematic
  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.6,
    restDelta: 0.001,
  });

  const opacity = useTransform(smooth, [0, 0.18, 0.82, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(smooth, [0, 0.22, 0.78, 1], [0.96, 1, 1, 0.96]);
  const blur = useTransform(smooth, [0, 0.18, 0.82, 1], ["10px", "0px", "0px", "10px"]);
  const filter = useTransform(blur, (b) => `blur(${b})`);
  const contentY = useTransform(smooth, [0, 1], ["8%", "-8%"]);

  return (
    <motion.section
      id={id}
      ref={ref}
      style={{ opacity, scale, filter }}
      className="relative min-h-[50vh]"
    >
      {showChapterIntro && (
        <ChapterIntro
          chapter={chapter}
          title={title}
          subtitle={subtitle}
          description={description}
          accent={accent}
          progress={smooth}
        />
      )}
      <motion.div style={{ y: contentY }} className="relative z-10">
        {children}
      </motion.div>
    </motion.section>
  );
};

interface ChapterIntroProps {
  chapter: string;
  title: string;
  subtitle?: string;
  description?: string;
  accent: "primary" | "secondary" | "accent";
  progress: MotionValue<number>;
}

function ChapterIntro({ chapter, title, subtitle, description, accent, progress }: ChapterIntroProps) {
  // Massive watermark
  const numberY = useTransform(progress, [0, 1], ["25%", "-35%"]);
  const numberOpacity = useTransform(progress, [0, 0.2, 0.55, 0.85], [0, 0.1, 0.07, 0]);
  const numberScale = useTransform(progress, [0, 0.5, 1], [1.15, 1, 0.9]);

  // Sliding marker line + label
  const lineX = useTransform(progress, [0.05, 0.4], ["-100%", "0%"]);
  const titleY = useTransform(progress, [0.05, 0.35], [40, 0]);
  const titleOpacity = useTransform(progress, [0.05, 0.3, 0.85, 1], [0, 1, 1, 0]);

  // Vertical accent rail fill
  const railFill = useTransform(progress, [0.05, 0.6], ["0%", "100%"]);

  const labelRef = useRef(null);
  const isInView = useInView(labelRef, { once: false, amount: 0.5 });

  return (
    <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
      {/* Sliding marker line + chapter label */}
      <motion.div
        ref={labelRef}
        style={{ y: titleY, opacity: titleOpacity }}
        className="absolute top-20 sm:top-24 left-0 right-0 px-4 sm:px-6"
      >
        <div className="container mx-auto max-w-6xl flex flex-col gap-2">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative h-px w-12 sm:w-24 overflow-hidden bg-border shrink-0">
              <motion.div
                style={{ x: lineX }}
                className={`absolute inset-0 ${
                  accent === "primary"
                    ? "bg-gradient-to-r from-transparent via-primary to-primary"
                    : accent === "secondary"
                    ? "bg-gradient-to-r from-transparent via-secondary to-secondary"
                    : "bg-gradient-to-r from-transparent via-accent to-accent"
                }`}
              />
            </div>
            <div className={`font-display font-black text-[14px] sm:text-[18px] uppercase tracking-[0.5em] sm:tracking-[0.6em] truncate ${accentMap[accent]}`}>
              Chapter {chapter} <span className="opacity-40 px-3 truncate">|</span> {subtitle || title}
            </div>
          </div>
          {description && (
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 0.6, x: 0 } : { opacity: 0, x: -10 }}
              className="ml-16 sm:ml-28 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-muted-foreground max-w-md italic"
            >
              {description}
            </motion.p>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default SceneSection;
