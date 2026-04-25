import { useEffect, useState } from "react";

const Loader = ({ onDone }: { onDone: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 12 + 4;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onDone, 500);
          return 100;
        }
        return next;
      });
    }, 120);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background">
      <div className="absolute inset-0 grid-overlay opacity-40" />

      <div className="relative z-10 flex flex-col items-center gap-8 px-6">
        <div className="font-display text-5xl md:text-7xl font-black tracking-widest">
          <span className="glitch" data-text="K.S.C">
            K.S.C
          </span>
        </div>
        <div className="font-mono text-xs md:text-sm uppercase tracking-[0.4em] text-muted-foreground">
          Initializing Neural Interface
        </div>

        <div className="relative h-1.5 w-72 md:w-96 overflow-hidden rounded-full bg-muted/40">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-cyber transition-all duration-200 ease-out"
            style={{ width: `${progress}%`, boxShadow: "0 0 12px hsl(var(--primary))" }}
          />
        </div>
        <div className="font-mono text-xs text-primary text-glow-primary">
          {Math.floor(progress).toString().padStart(3, "0")}%  ::  LOADING_ASSETS
        </div>
      </div>

      {/* Scan line */}
      <div
        className="pointer-events-none absolute inset-x-0 h-px bg-primary/60"
        style={{ animation: "scan-line 2.4s linear infinite", boxShadow: "0 0 18px hsl(var(--primary))" }}
      />
    </div>
  );
};

export default Loader;
