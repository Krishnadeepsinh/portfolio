import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MessageCircle } from "lucide-react";
import { TextScramble } from "../animations/TextScramble";

const WHATSAPP_HREF = `https://wa.me/916353579859?text=${encodeURIComponent(
  "Hi Krishnadeepsinh, I just visited your portfolio and would love to connect!"
)}`;

const contacts = [
  { icon: Mail, label: "Email", value: "chudasamakrishnadeep3@gmail.com", href: "mailto:chudasamakrishnadeep3@gmail.com" },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat instantly", href: WHATSAPP_HREF },
  { icon: Github, label: "GitHub", value: "@Krishnadeepsinh", href: "https://github.com/Krishnadeepsinh" },
  { icon: Linkedin, label: "LinkedIn", value: "krishnadeep-chudasama", href: "https://www.linkedin.com/in/krishnadeep-chudasama-483772311" },
];

const Contact = () => {
  return (
    <div className="relative py-20 sm:py-28 md:py-32 px-4 sm:px-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-30" />
      <div className="pointer-events-none absolute -top-20 right-1/4 h-96 w-96 rounded-full bg-secondary/10 blur-[120px] animate-float-slow" />

      <div className="container relative mx-auto max-w-5xl">
        <div className="mb-12 sm:mb-16 text-center">
          <h2 className="section-heading inline-block">
            <TextScramble text="Get In Touch" autostart={true} duration={1} />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-3 sm:mt-4 font-mono text-xs sm:text-sm text-muted-foreground px-4"
          >
            Open for projects, technical collaborations, or discussing the intersection of Fullstack & AI.
          </motion.p>
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            {contacts.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.a
                  key={c.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex flex-col items-center text-center glass-panel p-8 hover-glow transition-all duration-500 hover:-translate-y-2 border-primary/10"
                >
                  <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary group-hover:text-background group-hover:shadow-glow-primary transition-all duration-500 mb-6 relative">
                    <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
                    <Icon size={28} className="relative z-10" />
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2 whitespace-nowrap">
                    {c.label}
                  </div>
                  <div className="text-sm font-display font-bold text-foreground break-all">
                    {c.value}
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
