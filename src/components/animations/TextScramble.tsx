import { useState, useCallback, useEffect, useRef } from "react";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>[]{}/\\|!@#$%^&*()_+-=";

interface TextScrambleProps {
  text: string;
  autostart?: boolean;
  className?: string;
  delay?: number;
  duration?: number;
}

export const TextScramble = ({
  text,
  autostart = true,
  className = "",
  delay = 0,
  duration = 1.0
}: TextScrambleProps) => {
  const [output, setOutput] = useState("");
  const iterations = useRef(0);
  const frameId = useRef<number>(0);

  const scramble = useCallback(() => {
    const totalFrames = duration * 60; // 60fps
    iterations.current += 1;

    if (iterations.current % 3 === 0 || iterations.current >= totalFrames) {
      const scrambled = text
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (iterations.current / totalFrames > index / text.length) {
            return text[index];
          }
          return CHARSET[Math.floor(Math.random() * CHARSET.length)];
        })
        .join("");

      setOutput(scrambled);
    }

    if (iterations.current < totalFrames) {
      frameId.current = requestAnimationFrame(scramble);
    } else {
      setOutput(text);
    }
  }, [text, duration]);

  useEffect(() => {
    if (autostart) {
      const timer = setTimeout(() => {
        iterations.current = 0;
        scramble();
      }, delay);
      return () => {
        clearTimeout(timer);
        cancelAnimationFrame(frameId.current);
      };
    }
  }, [autostart, delay, scramble]);

  return <span className={className}>{output || (autostart ? "" : text)}</span>;
};
