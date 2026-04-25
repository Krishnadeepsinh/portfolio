import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileText, Briefcase, Code2, Cpu, X, ExternalLink, Mail, MapPin, Linkedin, Github } from "lucide-react";
import RevealText from "../animations/RevealText";

const timeline = [
  {
    icon: Briefcase,
    period: "March 2026",
    title: "AI4Dev National Hackathon — Finalist",
    detail: "Selected as a finalist at PSG College of Technology for developing AI-enable transformative technologies for global development.",
  },
  {
    icon: Code2,
    period: "2023 — Present",
    title: "Full Stack Engineer & AIML Explorer",
    detail: "Building production-ready systems like Nexus Scientific and FleetFlow. Focusing on the intersection of scalable architecture and emerging AI.",
  },
  {
    icon: Cpu,
    period: "45-Hour Course",
    title: "Hardware & Networking Certified",
    detail: "Completed specialized certification in computer engineering and networking protocols via SSCCS (MKBU).",
  },
];

const Resume = () => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <div className="relative py-14 sm:py-16 md:py-20 px-4 sm:px-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-30" />
      <div className="pointer-events-none absolute top-1/3 left-1/4 h-96 w-96 rounded-full bg-accent/10 blur-[120px] animate-float-slow" />

      <div className="container relative mx-auto max-w-5xl">
        <div className="mb-12 sm:mb-16 text-center">
          <RevealText as="h2" by="letter" stagger={0.05} className="section-heading inline-block">
            Resume
          </RevealText>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.96, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative glass-panel overflow-hidden"
        >
          {/* Holographic top bar */}
          <div className="flex items-center justify-between gap-3 border-b border-primary/20 bg-background/40 px-4 sm:px-6 py-3">
            <div className="flex items-center gap-2 min-w-0">
              <FileText size={16} className="text-primary shrink-0" />
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-primary truncate">
                resume.holo // KSC_v2026.sys
              </span>
            </div>
            <div className="flex gap-1.5 shrink-0">
              <span className="h-2 w-2 rounded-full bg-primary/60" />
              <span className="h-2 w-2 rounded-full bg-secondary/60" />
              <span className="h-2 w-2 rounded-full bg-accent/60" />
            </div>
          </div>

          <div className="relative grid gap-8 p-6 sm:p-8 md:p-12 md:grid-cols-3">
            {/* Left: Profile Snapshot */}
            <div className="md:col-span-1 space-y-6">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Identity
                </div>
                <div className="mt-1 font-display font-bold text-xl">
                  Krishnadeepsinh<br />Chudasama
                </div>
                <div className="mt-1 font-mono text-xs text-primary">
                  Full Stack Developer
                </div>
              </div>

              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Academic Stats
                </div>
                <div className="mt-2 space-y-1">
                  <div className="font-display font-bold text-lg">BCA · Sem 6</div>
                  <div className="text-sm font-mono text-muted-foreground">CGPA: 7.84 / 10</div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setIsPreviewOpen(true)}
                  className="group flex items-center justify-center gap-2 w-full rounded-lg bg-gradient-cyber px-5 py-3 font-mono text-xs uppercase tracking-widest text-background shadow-glow-primary hover:scale-[1.02] transition-all"
                >
                  <ExternalLink size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  Live Preview
                </button>
              </div>
            </div>

            {/* Right: Milestones Brief */}
            <div className="md:col-span-2">
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4">
                Key Milestones ::
              </div>
              <div className="space-y-6">
                {timeline.slice(0, 2).map((t, i) => (
                  <div key={i} className="relative pl-6 border-l border-primary/20">
                    <div className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-primary shadow-glow-primary" />
                    <div className="font-mono text-[10px] text-primary">{t.period}</div>
                    <div className="font-display font-bold text-sm">{t.title}</div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{t.detail}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setIsPreviewOpen(true)}
                className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-primary hover:text-glow-primary transition-all underline decoration-primary/30 underline-offset-4"
              >
                View Full Dossier
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Full Resume Preview Modal */}
      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 backdrop-blur-xl bg-background/80"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, rotateX: 10 }}
              animate={{ scale: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl glass-panel shadow-2xl flex flex-col border-primary/30"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-primary/20 bg-background/60 p-4 sm:px-8">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 grid place-items-center text-primary border border-primary/20">
                    <FileText size={18} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg leading-tight">Professional Dossier</h3>
                    <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">Archive_System / Verified_User</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="h-10 w-10 rounded-full hover:bg-white/5 grid place-items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-12">
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/5 pb-8">
                  <div>
                    <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground">Krishnadeepsinh Chudasama</h1>
                    <p className="mt-2 font-mono text-primary text-sm uppercase tracking-widest">Full Stack Developer | AI/ML Enthusiast</p>
                  </div>
                  <div className="flex flex-wrap gap-4 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                    <div className="flex items-center gap-1.5"><MapPin size={12} className="text-secondary" /> Bhavnagar, GJ</div>
                    <div className="flex items-center gap-1.5"><Mail size={12} className="text-secondary" /> chudasamakrishnadeep3@gmail.com</div>
                  </div>
                </div>

                <div className="grid gap-12 md:grid-cols-3">
                  {/* Primary Content */}
                  <div className="md:col-span-2 space-y-12">
                    <section>
                      <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-6 flex items-center gap-3">
                        <span className="h-px flex-1 bg-primary/20"></span>
                        Project Experience
                        <span className="h-px flex-1 bg-primary/20"></span>
                      </h4>
                      <div className="space-y-8">
                        <div className="relative pl-6 border-l-2 border-primary/10 group">
                          <div className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-primary group-hover:shadow-glow-primary transition-all" />
                          <div className="flex justify-between items-start">
                            <h5 className="font-display font-bold text-lg text-foreground">Nexus Scientific</h5>
                            <span className="font-mono text-[9px] text-muted-foreground border border-white/10 px-2 py-0.5 rounded">Vercel Deployment</span>
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground leading-relaxed italic">Research & Innovation Platform</p>
                          <ul className="mt-3 space-y-2 text-sm text-muted-foreground list-disc pl-4">
                            <li>Engineered a modern research platform with a focus on high-fidelity, responsive UI.</li>
                            <li>Optimized assets and component rendering, achieving sub-1s load times.</li>
                          </ul>
                        </div>

                        <div className="relative pl-6 border-l-2 border-primary/10 group">
                          <div className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-primary group-hover:shadow-glow-primary transition-all" />
                          <div className="flex justify-between items-start">
                            <h5 className="font-display font-bold text-lg text-foreground">FleetFlow</h5>
                            <span className="font-mono text-[9px] text-muted-foreground border border-white/10 px-2 py-0.5 rounded">Fleet Optimization</span>
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground leading-relaxed italic">Fleet Management System</p>
                          <ul className="mt-3 space-y-2 text-sm text-muted-foreground list-disc pl-4">
                            <li>Architected an intuitive dashboard for real-time logistics and vehicle monitoring.</li>
                            <li>Implemented complex data grids and real-time state synchronization using TypeScript.</li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-6 flex items-center gap-3">
                        <span className="h-px flex-1 bg-primary/20"></span>
                        Notable Milestones
                        <span className="h-px flex-1 bg-primary/20"></span>
                      </h4>
                      <div className="space-y-6">
                        {timeline.map((t, i) => (
                          <div key={i} className="flex gap-4">
                            <div className="font-mono text-[10px] text-secondary min-w-[80px] pt-1">{t.period}</div>
                            <div>
                              <div className="font-display font-bold text-sm text-foreground">{t.title}</div>
                              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{t.detail}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>

                  {/* Sidebar Info */}
                  <div className="space-y-10">
                    <section>
                      <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Contact Protocol</h4>
                      <div className="space-y-3">
                        <a href="https://github.com/Krishnadeepsinh" target="_blank" rel="noreferrer" className="flex items-center gap-3 group">
                          <div className="h-8 w-8 rounded bg-white/5 grid place-items-center text-muted-foreground group-hover:text-primary transition-colors"><Github size={16} /></div>
                          <span className="font-mono text-xs text-muted-foreground group-hover:text-foreground">github.com/KSC</span>
                        </a>
                        <a href="https://www.linkedin.com/in/krishnadeep-chudasama-483772311" target="_blank" rel="noreferrer" className="flex items-center gap-3 group">
                          <div className="h-8 w-8 rounded bg-white/5 grid place-items-center text-muted-foreground group-hover:text-primary transition-colors"><Linkedin size={16} /></div>
                          <span className="font-mono text-xs text-muted-foreground group-hover:text-foreground">linkedin/in/KSC</span>
                        </a>
                      </div>
                    </section>

                    <section>
                      <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Core Systems</h4>
                      <div className="flex flex-wrap gap-2">
                        {["JavaScript", "TypeScript", "Python", "Java", "PHP", "ASP.NET", "Supabase", "Turso", "SQL", "Git"].map(s => (
                          <span key={s} className="font-mono text-[9px] uppercase border border-white/5 bg-white/5 px-2 py-1 rounded text-primary">{s}</span>
                        ))}
                      </div>
                    </section>

                    <section className="p-4 rounded-xl border border-primary/10 bg-primary/5">
                      <h4 className="font-mono text-[10px] uppercase tracking-widest text-primary mb-2">Education_Status</h4>
                      <div className="font-display font-bold text-sm">BCA (Final Year)</div>
                      <div className="text-xs text-muted-foreground mt-1">GPA: 7.84 // 2026 Grad</div>
                      <div className="mt-3 pt-3 border-t border-primary/10 font-mono text-[8px] text-stone-500 uppercase">MKBU | SSCCS College</div>
                    </section>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="border-t border-primary/10 bg-background/80 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">System generated report // Hash_8x429</p>
                <div className="flex gap-4">
                  <a
                    href="/resume.pdf"
                    download
                    className="flex items-center gap-2 px-4 py-2 rounded-md bg-white/5 hover:bg-white/10 font-mono text-[10px] uppercase tracking-widest text-foreground transition-all"
                  >
                    <Download size={14} /> Download Copy
                  </a>
                  <button
                    onClick={() => setIsPreviewOpen(false)}
                    className="px-6 py-2 rounded-md bg-primary text-background font-mono text-[10px] uppercase tracking-widest hover:shadow-glow-primary transition-all font-bold"
                  >
                    Close Dossier
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Resume;
