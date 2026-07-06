"use client";

import { useState, useEffect } from "react";

const navLinksData = [
  { label: "Sobre mi", href: "#sobre-mi" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Stack", href: "#stack" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <header
      className={`topbar ${scrolled ? "topbar-scrolled" : ""} ${isOpen ? "topbar-open" : ""}`}
    >
      <div className={`topbar-inner ${scrolled ? "topbar-inner-scrolled" : ""}`}>
        <a href="#inicio" className="brand">
          Sebastian Arroyo
        </a>

        <button
          className={`menu-toggle ${isOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}
          aria-controls="site-nav"
        >
          <span />
          <span />
        </button>

        <nav className="navbar-links nav" id="site-nav" data-open={isOpen}>
          {navLinksData.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="cv.pdf"
            target="_blank"
            rel="noopener"
            className="nav-cta"
            onClick={() => setIsOpen(false)}
          >
            CV
          </a>
          <span className="nav-indicator" aria-hidden="true" />
        </nav>
      </div>
    </header>
  );
}
