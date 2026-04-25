import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";
import { Menu, X } from "lucide-react";

import Magnetic from "./animations/Magnetic";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

const Nav = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    if (lenis) {
      lenis.scrollTo(`#${id}`, {
        duration: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
      className={`fixed top-0 inset-x-0 z-[1001] transition-all ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-primary/10"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex h-16 items-center justify-between px-6">
        <Magnetic>
          <button
            onClick={() => scrollTo("home")}
            className="font-display font-black text-lg tracking-widest text-glow-primary p-2"
          >
            <span className="text-primary">K.</span>
            <span className="text-foreground">S.C</span>
          </button>
        </Magnetic>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.id}>
              <Magnetic>
                <button
                  onClick={() => scrollTo(l.id)}
                  className="relative font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary group px-3 py-1"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all group-hover:w-full" />
                </button>
              </Magnetic>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle Button with larger hit area */}
        <button
          className="md:hidden relative z-50 p-2 -mr-2 text-foreground hover:text-primary transition-colors focus:outline-none"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
          aria-label="Toggle menu"
        >
          <div className="relative h-6 w-6">
            <motion.div
              animate={{ rotate: open ? 45 : 0, y: open ? 0 : -6 }}
              className="absolute top-1/2 left-0 w-6 h-[2px] bg-current rounded-full"
            />
            <motion.div
              animate={{ opacity: open ? 0 : 1 }}
              className="absolute top-1/2 left-0 w-6 h-[2px] bg-current rounded-full"
            />
            <motion.div
              animate={{ rotate: open ? -45 : 0, y: open ? 0 : 6 }}
              className="absolute top-1/2 left-0 w-6 h-[2px] bg-current rounded-full"
            />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, scaleY: 0, transformOrigin: "top" }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden absolute top-full inset-x-0 bg-background/95 backdrop-blur-2xl border-t border-primary/10 overflow-hidden shadow-2xl"
          >
            {links.map((l, i) => (
              <motion.li 
                key={l.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 + 0.1 }}
              >
                <button
                  onClick={() => scrollTo(l.id)}
                  className="w-full px-8 py-5 text-left font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all border-b border-primary/5 active:bg-primary/10"
                >
                  <span className="text-primary/40 mr-4">0{i + 1}</span>
                  {l.label}
                </button>
              </motion.li>
            ))}
            <div className="p-8 flex justify-center gap-6">
              <div className="h-1 w-12 bg-primary/20 rounded-full" />
            </div>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Nav;
