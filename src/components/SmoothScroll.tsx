import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Wraps the app with Lenis-powered buttery smooth inertial scrolling.
 * Disables on touch devices (native momentum is better) and respects
 * users with prefers-reduced-motion.
 */
const SmoothScroll = () => {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (reduceMotion || isTouch) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Override anchor smooth-scroll calls so they go through Lenis
    const originalScrollIntoView = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = function (arg?: boolean | ScrollIntoViewOptions) {
      if (
        arg &&
        typeof arg === "object" &&
        arg.behavior === "smooth" &&
        this instanceof HTMLElement
      ) {
        lenis.scrollTo(this, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
      } else {
        originalScrollIntoView.call(this, arg);
      }
    };

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      Element.prototype.scrollIntoView = originalScrollIntoView;
    };
  }, []);

  return null;
};

export default SmoothScroll;
