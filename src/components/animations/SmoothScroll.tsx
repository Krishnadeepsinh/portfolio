import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

interface SmoothScrollProps {
  children: ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.4,      // Slightly slower for cinematic feel
        smoothWheel: true,
        wheelMultiplier: 1.1,
        touchMultiplier: 2,
        infinite: false,
        lerp: 0.08          // Smooth out the interpolation
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
