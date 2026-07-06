"use client";

import { useEffect, useRef } from "react";
import MarqueeTrack from "./MarqueeTrack";

function TextReveal({ text }: { text: string }) {
  const elRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || !elRef.current) return;

    const el = elRef.current;
    const original = el.textContent || "";
    el.textContent = "";
    el.setAttribute("aria-label", original);

    [...original].forEach((char, i) => {
      const span = document.createElement("span");
      span.className = "char";
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.setProperty("--char-delay", `${200 + i * 30}ms`);
      span.setAttribute("aria-hidden", "true");
      el.appendChild(span);
    });
  }, []);

  return (
    <h1 ref={elRef} className="inline-block overflow-hidden">
      {text}
    </h1>
  );
}

export default function HeroSection() {
  return (
    <section className="hero" id="inicio">
      <TextReveal text="Sebastian Arroyo" />
      <p className="hero-sub stagger" style={{ "--d": 2 } as React.CSSProperties}>
        Backend Developer &bull; Java
      </p>

      <MarqueeTrack />

      <div
        className="hero-actions stagger"
        style={{ "--d": 4 } as React.CSSProperties}
      >
        <a href="#proyectos" className="button-primary">
          Ver Proyectos <span className="btn-arrow">&rarr;</span>
        </a>
        <a
          href="cv.pdf"
          target="_blank"
          rel="noopener"
          className="button-secondary"
        >
          Descargar CV
        </a>
      </div>
    </section>
  );
}
