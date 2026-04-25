import { motion } from "framer-motion";
import { Trophy, GraduationCap, Cpu } from "lucide-react";
import AvatarScene from "../three/AvatarScene";
import RevealText, { Reveal } from "../animations/RevealText";

const About = () => {
  return (
    <div className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-30" />
      <div className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[120px] animate-float-slow" />

      <div className="container relative mx-auto max-w-6xl">
        <div className="mb-12 sm:mb-16 text-center">
          <RevealText as="h2" by="letter" stagger={0.04} className="section-heading inline-block">
            About
          </RevealText>
        </div>

        <div className="grid gap-8 md:gap-12 md:grid-cols-5 items-center">
          {/* 3D avatar */}
          <Reveal delay={0.1} y={0} className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-square w-full max-w-[260px] sm:max-w-sm md:max-w-md mx-auto"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-glow blur-2xl" />
              <div className="relative h-full w-full glass-panel overflow-hidden">
                <AvatarScene />
                <div className="pointer-events-none absolute inset-0 holo-shimmer" />
              </div>
            </motion.div>
          </Reveal>

          {/* Bio */}
          <div className="md:col-span-3 space-y-5 sm:space-y-6">
            <Reveal delay={0.2}>
              <p className="text-base sm:text-lg leading-relaxed text-foreground/90">
                A passionate <span className="text-primary text-glow-primary">Computer Science student</span> focused on
                building scalable web applications and exploring{" "}
                <span className="text-secondary text-glow-secondary">artificial intelligence</span>. With a strong
                foundation in full stack development and problem solving, I aim to create impactful digital experiences.
              </p>
            </Reveal>

            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <Reveal delay={0.35} y={20} className="h-full">
                <div className="glass-panel p-5 h-full hover-glow transition-all hover:-translate-y-1 duration-500 flex flex-col">
                  <GraduationCap className="mb-3 text-primary" size={22} />
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Education
                  </div>
                  <div className="mt-1 font-display font-bold">BCA · 6th Semester</div>
                </div>
              </Reveal>

              <Reveal delay={0.45} y={20} className="h-full">
                <div className="glass-panel p-5 h-full hover-glow transition-all hover:-translate-y-1 duration-500 flex flex-col">
                  <Trophy className="mb-3 text-secondary" size={22} />
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Achievement
                  </div>
                  <div className="mt-1 font-display font-bold text-sm sm:text-base">AI4Dev Finalist</div>
                  <div className="mt-2 font-mono text-[10px] text-muted-foreground leading-relaxed">
                    National level hackathon finalist selected for the final round at PSG Tech.
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.55} y={20} className="sm:col-span-2">
                <div className="glass-panel p-5 hover-glow transition-all hover:-translate-y-1 duration-500">
                  <Cpu className="mb-3 text-accent" size={22} />
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Focus Areas
                  </div>
                  <div className="mt-1 font-display font-bold">
                    Full Stack Engineering · Machine Learning · System Design
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
