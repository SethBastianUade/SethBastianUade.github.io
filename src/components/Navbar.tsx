"use client";

import { useState, useEffect, useRef } from "react";

function AnimatedNavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="group relative inline-block overflow-hidden h-7 flex items-center text-sm leading-5"
    >
      <div className="flex flex-col transition-transform duration-[400ms] ease-out transform group-hover:-translate-y-1/2">
        <span className="leading-5 text-[var(--color-muted)]">{children}</span>
        <span className="leading-5 text-[var(--color-text)]">{children}</span>
      </div>
    </a>
  );
}

const navLinksData = [
  { label: "Sobre mi", href: "#sobre-mi" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Stack", href: "#stack" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const shapeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const headerShapeClass = isOpen
    ? "rounded-xl"
    : "rounded-2xl sm:rounded-full";

  useEffect(() => {
    if (!isOpen) {
      shapeTimeoutRef.current = setTimeout(() => {
        shapeTimeoutRef.current = null;
      }, 300);
    }

    return () => {
      if (shapeTimeoutRef.current) clearTimeout(shapeTimeoutRef.current);
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center px-8 py-5 backdrop-blur-sm ${headerShapeClass} border border-[#333] bg-[#1f1f1f57] w-[calc(100%-2rem)] sm:w-auto transition-[border-radius] duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-between w-full gap-x-6 sm:gap-x-8">
        <a href="#inicio" className="flex items-center">
          <div className="relative w-6 h-6 flex items-center justify-center">
            <span className="absolute w-[7px] h-[7px] rounded-full bg-gray-200 top-0 left-1/2 -translate-x-1/2 opacity-80" />
            <span className="absolute w-[7px] h-[7px] rounded-full bg-gray-200 left-0 top-1/2 -translate-y-1/2 opacity-80" />
            <span className="absolute w-[7px] h-[7px] rounded-full bg-gray-200 right-0 top-1/2 -translate-y-1/2 opacity-80" />
            <span className="absolute w-[7px] h-[7px] rounded-full bg-gray-200 bottom-0 left-1/2 -translate-x-1/2 opacity-80" />
          </div>
        </a>

        <nav className="navbar-links hidden sm:flex items-center gap-x-8 lg:gap-x-10 text-sm relative">
          {navLinksData.map((link) => (
            <AnimatedNavLink key={link.href} href={link.href}>
              {link.label}
            </AnimatedNavLink>
          ))}
          <span className="nav-indicator" aria-hidden="true" />
        </nav>

        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#contacto"
            className="px-5 py-[10px] text-sm border border-[#333] bg-[rgba(31,31,31,0.62)] text-gray-300 rounded-full hover:border-white/50 hover:text-white transition-colors duration-200"
          >
            Contacto
          </a>
          <div className="relative group">
            <div className="absolute inset-0 -m-2 rounded-full hidden sm:block bg-gray-100 opacity-40 filter blur-lg pointer-events-none transition-all duration-300 ease-out group-hover:opacity-60 group-hover:blur-xl group-hover:-m-3" />
            <a
              href="cv.pdf"
              target="_blank"
              rel="noopener"
              className="relative z-10 inline-block px-5 py-[10px] text-sm font-semibold text-black bg-gradient-to-br from-gray-100 to-gray-300 rounded-full hover:from-gray-200 hover:to-gray-400 transition-all duration-200"
            >
              CV
            </a>
          </div>
        </div>

        <button
          className="sm:hidden flex items-center justify-center w-8 h-8 text-gray-300 focus:outline-none"
          onClick={toggleMenu}
          aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      <div
        className={`sm:hidden flex flex-col items-center w-full transition-all ease-in-out duration-300 overflow-hidden ${
          isOpen
            ? "max-h-[1000px] opacity-100 pt-4"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center space-y-5 text-base w-full">
          {navLinksData.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-300 hover:text-white transition-colors w-full text-center"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-col items-center space-y-4 mt-4 w-full">
          <a
            href="#contacto"
            className="px-5 py-[10px] text-sm border border-[#333] bg-[rgba(31,31,31,0.62)] text-gray-300 rounded-full hover:border-white/50 hover:text-white transition-colors duration-200 text-center w-full"
            onClick={() => setIsOpen(false)}
          >
            Contacto
          </a>
          <a
            href="cv.pdf"
            target="_blank"
            rel="noopener"
            className="px-5 py-[10px] text-sm font-semibold text-black bg-gradient-to-br from-gray-100 to-gray-300 rounded-full hover:from-gray-200 hover:to-gray-400 transition-all duration-200 text-center w-full"
          >
            CV
          </a>
        </div>
      </div>
    </header>
  );
}
