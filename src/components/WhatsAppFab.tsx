import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const PHONE = "916353579859"; // +91 6353579859 in international format
const MESSAGE = encodeURIComponent(
  "Hi Krishnadeepsinh, I just visited your portfolio and would love to connect!"
);
const HREF = `https://wa.me/${PHONE}?text=${MESSAGE}`;

const WhatsAppFab = () => {
  return (
    <motion.a
      href={HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, scale: 0, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="group fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3"
    >
      {/* Pulsing rings */}
      <span className="pointer-events-none absolute right-0 bottom-0 h-12 w-12 sm:h-14 sm:w-14 rounded-full border border-primary/40 animate-ping opacity-60" />
      <span
        className="pointer-events-none absolute right-0 bottom-0 h-12 w-12 sm:h-14 sm:w-14 rounded-full border border-secondary/40 animate-ping opacity-40"
        style={{ animationDelay: "0.6s" }}
      />

      {/* Tooltip / label */}
      <span className="hidden md:inline-flex items-center rounded-full border border-primary/30 bg-background/70 backdrop-blur-md px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-foreground shadow-glow-primary/20 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
        <span className="text-primary mr-1.5">›</span> Chat on WhatsApp
      </span>

      {/* Main button */}
      <span className="relative grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-full bg-gradient-cyber shadow-glow-primary border border-primary/40 overflow-hidden">
        <span className="absolute inset-0 bg-background/20 backdrop-blur-sm" />
        <span className="absolute inset-[1px] rounded-full bg-background/80" />
        <MessageCircle
          size={20}
          className="relative z-10 text-primary drop-shadow-[0_0_6px_hsl(var(--primary))] sm:w-[22px] sm:h-[22px]"
          strokeWidth={2}
        />
        {/* Scan line */}
        <span className="absolute inset-0 rounded-full overflow-hidden">
          <span className="absolute inset-x-0 top-0 h-px bg-primary/60 animate-scan" />
        </span>
      </span>
    </motion.a>
  );
};

export default WhatsAppFab;
