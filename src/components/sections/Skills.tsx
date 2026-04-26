import { motion } from "framer-motion";
import { useRef, useState } from "react";
import RevealText from "../animations/RevealText";
import Marquee from "../animations/Marquee";
import { 
  FileCode2, 
  Terminal, 
  Coffee, 
  Cpu, 
  Layout, 
  Server, 
  Database, 
  Table, 
  GitBranch, 
  Zap, 
  Brain, 
  Globe 
} from "lucide-react";

const skills = [
  { name: "JavaScript", category: "Language", color: "from-yellow-400 to-orange-500", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "Python", category: "Language", color: "from-blue-400 to-yellow-300", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "Java", category: "Language", color: "from-orange-500 to-red-500", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
  { name: "C / C++", category: "Language", color: "from-blue-500 to-indigo-600", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
  { name: "HTML5 / CSS3", category: "Frontend", color: "from-orange-400 to-pink-500", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
  { name: "PHP", category: "Backend", color: "from-indigo-500 to-purple-600", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
  { name: "Supabase", category: "Backend", color: "from-emerald-400 to-teal-500", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" },
  { name: "SQL / PL-SQL", category: "Database", color: "from-cyan-400 to-blue-500", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "Git / GitHub", category: "Tooling", color: "from-orange-500 to-red-600", icon: "https://cdn.simpleicons.org/github/FFFFFF" },
  { name: "Vercel", category: "Deploy", color: "from-zinc-300 to-zinc-500", icon: "https://cdn.simpleicons.org/vercel/FFFFFF" },
  { name: "OOP / DSA", category: "Concepts", color: "from-violet-500 to-fuchsia-500", icon: "https://cdn.simpleicons.org/codio/FFFFFF" },
  { name: "ASP.NET", category: "Framework", color: "from-sky-500 to-blue-600", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dot-net/dot-net-original.svg" },
];

interface TiltCardProps {
  skill: typeof skills[0];
  index: number;
}

function TiltCard({ skill, index }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: y * -14, y: x * 14 });
  };
  const reset = () => {
    setTilt({ x: 0, y: 0 });
    setHover(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.92, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ perspective: 1000 }}
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={reset}
        className="tilt-card group relative min-h-[8rem] sm:min-h-[9rem] rounded-xl border border-primary/15 bg-gradient-card backdrop-blur-md overflow-hidden"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`,
          boxShadow: hover
            ? "0 20px 40px hsl(235 80% 2% / 0.6), 0 0 30px hsl(var(--primary) / 0.4), inset 0 1px 0 hsl(var(--primary) / 0.3)"
            : "0 8px 24px hsl(235 80% 2% / 0.5), inset 0 1px 0 hsl(var(--primary) / 0.1)",
        }}
      >
        {/* Animated border gradient on hover */}
        <div
          className={`pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 ${
            hover ? "opacity-100" : ""
          }`}
          style={{
            background: "linear-gradient(135deg, hsl(var(--primary) / 0.15), transparent 50%, hsl(var(--secondary) / 0.15))",
          }}
        />

        {/* Top corner accent */}
        <div className="absolute top-3 right-3 h-1.5 w-1.5 rounded-full bg-primary shadow-glow-primary" />

        {/* Particle burst on hover */}
        {hover && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, scale: 0, x: "50%", y: "50%" }}
                animate={{
                  opacity: [1, 1, 0],
                  scale: [0, 1, 0.5],
                  x: `${50 + (Math.cos((i / 8) * Math.PI * 2) * 120 * (Math.random() + 0.5))}%`,
                  y: `${50 + (Math.sin((i / 8) * Math.PI * 2) * 120 * (Math.random() + 0.5))}%`,
                }}
                transition={{ duration: 1.2, ease: "easeOut", repeat: Infinity, repeatDelay: Math.random() * 2 }}
                className="absolute h-0.5 w-0.5 rounded-full bg-primary"
                style={{ boxShadow: "0 0 10px hsl(var(--primary))" }}
              />
            ))}
          </div>
        )}

        <div className="relative flex h-full flex-col justify-between p-4 sm:p-5" style={{ transform: "translateZ(40px)" }}>
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-md bg-white/5 border border-white/10 flex items-center justify-center`}>
                <img 
                  src={skill.icon} 
                  alt={skill.name}
                  className="w-5 h-5 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground whitespace-nowrap">
                {skill.category}
              </div>
            </div>

          </div>
          <div>
            <div className="font-display font-bold text-sm sm:text-base text-foreground group-hover:text-glow-primary transition-all break-words">
              {skill.name}
            </div>
            <div className="mt-2 h-1 w-full bg-primary/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1.5, delay: index * 0.1, ease: "easeInOut" }}
                className={`h-full bg-gradient-to-r ${skill.color} opacity-80`}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const Skills = () => {
  return (
    <div className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-30" />
      <div className="pointer-events-none absolute top-1/4 right-0 h-96 w-96 rounded-full bg-secondary/10 blur-[120px] animate-float-slow" />

      <div className="container relative mx-auto max-w-6xl">
        <div className="mb-12 sm:mb-16 text-center">
          <RevealText as="h2" by="letter" stagger={0.025} className="section-heading inline-block">
            Skills Matrix
          </RevealText>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-3 sm:mt-4 font-mono text-xs sm:text-sm text-muted-foreground px-4"
          >
            Technologies powering my engineering toolkit
          </motion.p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {skills.map((s, i) => (
            <TiltCard key={s.name} skill={s} index={i} />
          ))}
        </div>

        {/* Marquee of tech keywords */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-16 border-y border-primary/10 py-5"
        >
          <Marquee duration={40}>
            {skills.map((s) => (
              <span
                key={s.name}
                className="font-display text-2xl sm:text-3xl font-bold text-muted-foreground/40 hover:text-primary transition-colors whitespace-nowrap"
              >
                {s.name}
                <span className="mx-6 text-primary/40">◆</span>
              </span>
            ))}
          </Marquee>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
