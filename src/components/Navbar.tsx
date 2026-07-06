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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(12,12,12,0.85)] backdrop-blur-xl border-b border-[var(--color-line)]"
          : "bg-[rgba(12,12,12,0.6)] backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div
        className={`max-w-[1200px] mx-auto px-6 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "h-14" : "h-16"
        }`}
      >
        <a
          href="#inicio"
          className="flex items-center gap-2.5 text-[var(--color-text)] font-semibold text-base shrink-0"
        >
          <span className="w-2 h-2 rounded-full bg-gray-300" />
          <span>Sebastian Arroyo</span>
        </a>

        <nav className="navbar-links hidden md:flex items-center gap-8 text-sm relative">
          {navLinksData.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="cv.pdf"
            target="_blank"
            rel="noopener"
            className="ml-2 px-4 py-[7px] text-sm font-semibold text-black bg-[var(--color-text)] rounded-full hover:opacity-90 transition-opacity duration-200"
          >
            CV
          </a>
          <span className="nav-indicator" aria-hidden="true" />
        </nav>

        <button
          className="md:hidden flex items-center justify-center w-8 h-8 text-gray-300 focus:outline-none"
          onClick={toggleMenu}
          aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      <div
        className={`md:hidden transition-all ease-in-out duration-300 overflow-hidden ${
          isOpen
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 pb-6 pt-2 flex flex-col items-stretch gap-3">
          {navLinksData.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors duration-200 py-2 text-sm text-center"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="border-t border-[var(--color-line)] pt-3 mt-1">
            <a
              href="cv.pdf"
              target="_blank"
              rel="noopener"
              className="block w-full py-[10px] text-sm font-semibold text-black bg-[var(--color-text)] rounded-full hover:opacity-90 transition-opacity duration-200 text-center"
              onClick={() => setIsOpen(false)}
            >
              Descargar CV
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
