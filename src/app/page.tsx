"use client";

"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import ShaderBg from "@/components/ShaderBg";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import StackSection from "@/components/StackSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useScrollSpy } from "@/hooks/useScrollSpy";

export default function Home() {
  useScrollReveal();
  useScrollSpy();

  useEffect(() => {
    document.documentElement.classList.add("js");
  }, []);

  return (
    <>
      <ShaderBg />

      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>

      <Navbar />

      <div className="progress-bar" role="progressbar" aria-valuenow={0} aria-valuemin={0} aria-valuemax={100} />

      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <StackSection />
        <ContactSection />
      </main>

      <FooterSection />
    </>
  );
}
