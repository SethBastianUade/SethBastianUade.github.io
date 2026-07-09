"use client";

import { useEffect, useRef } from "react";

export function useScrollSpy() {
  const tickingRef = useRef(false);

  useEffect(() => {
    const navLinks = document.querySelectorAll<HTMLAnchorElement>(
      ".navbar-links a[href^='#']"
    );
    const sections = document.querySelectorAll<HTMLElement>(
      "main .section[id], .hero[id]"
    );
    const progressBar = document.querySelector<HTMLElement>(".progress-bar");
    const navIndicator = document.querySelector(".nav-indicator");
    const navEl = document.querySelector(".navbar-links");

    if (!navLinks.length || !sections.length) return;

    function onScroll() {
      const scrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (progressBar && docHeight > 0) {
        progressBar.style.width = `${(scrollY / docHeight) * 100}%`;
      }

      let current = "";
      sections.forEach((section) => {
        const top = section.offsetTop - 120;
        if (scrollY >= top) {
          current = section.getAttribute("id") || "";
        }
      });

      // La ultima seccion arranca demasiado abajo como para cruzar el umbral:
      // al tocar el fondo de la pagina, marcarla igual.
      if (docHeight > 0 && scrollY >= docHeight - 2) {
        current = sections[sections.length - 1].getAttribute("id") || current;
      }

      navLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${current}`
        );
      });

      if (navIndicator && navEl && window.innerWidth > 720) {
        const activeLink = navEl.querySelector<HTMLAnchorElement>("a.active");
        if (activeLink) {
          const navRect = navEl.getBoundingClientRect();
          const linkRect = activeLink.getBoundingClientRect();
          (navIndicator as HTMLElement).style.width = `${linkRect.width}px`;
          (navIndicator as HTMLElement).style.transform = `translateX(${linkRect.left - navRect.left}px)`;
        }
      }

      tickingRef.current = false;
    }

    const handleScroll = () => {
      if (!tickingRef.current) {
        requestAnimationFrame(() => {
          onScroll();
        });
        tickingRef.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}
