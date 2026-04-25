import { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  /** Seconds per loop */
  duration?: number;
  reverse?: boolean;
  className?: string;
}

/**
 * Infinite horizontally-scrolling banner. Pauses on hover.
 */
const Marquee = ({ children, duration = 30, reverse = false, className = "" }: MarqueeProps) => {
  return (
    <div
      className={`group relative flex w-full overflow-hidden ${className}`}
      style={{ ["--duration" as string]: `${duration}s` }}
    >
      <div
        className={`flex shrink-0 items-center gap-12 pr-12 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        } group-hover:[animation-play-state:paused]`}
      >
        {children}
      </div>
      <div
        aria-hidden
        className={`flex shrink-0 items-center gap-12 pr-12 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        } group-hover:[animation-play-state:paused]`}
      >
        {children}
      </div>
    </div>
  );
};

export default Marquee;
