import { useEffect } from "react";
import Nav from "@/components/Nav";
import SceneSection from "@/components/SceneSection";
import SmoothScroll from "@/components/animations/SmoothScroll";
import CustomCursor from "@/components/animations/CustomCursor";
import CircuitLine from "@/components/animations/CircuitLine";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Resume from "@/components/sections/Resume";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";

const Index = () => {
  useEffect(() => {
    document.title = "Krishnadeepsinh Chudasama — Full Stack Developer";
  }, []);

  return (
    <>
      <SmoothScroll>
        <main className="relative min-h-screen bg-background overflow-hidden">
          {/* Immersive Overlays */}
          <div className="bg-noise" />
          <div className="scanlines" />
          <div className="vignette" />
          
          <CustomCursor />
          <CircuitLine />
          <Nav />

          <Hero />

          <SceneSection 
            id="about" 
            chapter="01" 
            title="About" 
            subtitle="Who I Am" 
            description="System Identity & Core Competencies"
            accent="primary"
          >
            <About />
          </SceneSection>

          <SceneSection 
            id="skills" 
            chapter="02" 
            title="Skills" 
            subtitle="Tech Stack" 
            description="Technical Stack & Engineering Matrix"
            accent="secondary"
          >
            <Skills />
          </SceneSection>

          <SceneSection 
            id="projects" 
            chapter="03" 
            title="Projects" 
            subtitle="Selected Work" 
            description="Featured Deployments & Architecture"
            accent="primary"
          >
            <Projects />
          </SceneSection>

          <SceneSection 
            id="resume" 
            chapter="04" 
            title="Resume" 
            subtitle="Career Path" 
            description="Professional Timeline & Academic Background"
            accent="accent"
          >
            <Resume />
          </SceneSection>

          <SceneSection 
            id="contact" 
            chapter="05" 
            title="Contact" 
            subtitle="Open Channel" 
            description="Communication Protocol & Liaison"
            accent="secondary"
          >
            <Contact />
          </SceneSection>

          <Footer />
        </main>
      </SmoothScroll>
      <WhatsAppFab />
    </>
  );
};

export default Index;
