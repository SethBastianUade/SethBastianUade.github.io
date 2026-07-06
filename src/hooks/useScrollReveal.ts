"use client";

import { useEffect, useRef } from "react";

export function useScrollReveal() {
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const targets = document.querySelectorAll(".reveal-hidden, .reveal-blur");

    if (prefersReducedMotion) {
      targets.forEach((el) => el.classList.add("reveal-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const section = entry.target;
          const items = section.matches(".reveal-hidden") ||
            section.matches(".reveal-blur")
            ? [section]
            : section.querySelectorAll(".reveal-hidden, .reveal-blur");
          items.forEach((item, i) => {
            setTimeout(
              () => item.classList.add("reveal-visible"),
              i * 100
            );
          });
          obs.unobserve(section);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document
      .querySelectorAll("main .section, footer.reveal-hidden")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
