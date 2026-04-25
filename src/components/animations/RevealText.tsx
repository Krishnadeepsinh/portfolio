import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface RevealTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  /** Stagger delay between each word in seconds */
  stagger?: number;
  /** Initial delay before the reveal starts */
  delay?: number;
  /** Split by words or letters */
  by?: "word" | "letter";
}

/**
 * Cinematic per-word/letter reveal with blur, scale, and rotation.
 * Perfect for hero headlines and section intros.
 */
const RevealText = ({
  children,
  className = "",
  as = "div",
  stagger = 0.06,
  delay = 0,
  by = "word",
}: RevealTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const tokens = by === "word" ? children.split(/(\s+)/) : children.split("");

  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag ref={ref} className={className} aria-label={children}>
      {tokens.map((token, i) => {
        if (/^\s+$/.test(token)) return <span key={i}>{token}</span>;
        return (
          <span
            key={i}
            className="inline-block overflow-hidden align-baseline"
            aria-hidden
          >
            <motion.span
              className="inline-block will-change-transform"
              initial={{ y: "115%", opacity: 0, filter: "blur(8px)", rotateX: -45 }}
              animate={
                inView
                  ? { y: "0%", opacity: 1, filter: "blur(0px)", rotateX: 0 }
                  : {}
              }
              transition={{
                duration: 0.85,
                delay: delay + i * stagger,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ transformOrigin: "50% 100%" }}
            >
              {token}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Re-trigger every time it enters the viewport */
  once?: boolean;
}

/**
 * Simple cinematic blur-up reveal wrapper for any block content.
 */
export const Reveal = ({ children, className = "", delay = 0, y = 40, once = true }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-15%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, filter: "blur(10px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default RevealText;
