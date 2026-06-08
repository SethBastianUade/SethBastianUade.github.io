const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav a");
const typingTarget = document.querySelector(".terminal-typing");

if (menuToggle && nav) {
  const setMenuState = (open) => {
    nav.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Cerrar menu" : "Abrir menu");
  };

  menuToggle.addEventListener("click", () => {
    setMenuState(!nav.classList.contains("open"));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) {
      setMenuState(false);
    }
  });
}

if (typingTarget) {
  const fullText = typingTarget.dataset.text ?? "";
  let index = 0;

  typingTarget.classList.add("is-typing");

  const type = () => {
    typingTarget.textContent = fullText.slice(0, index);
    index += 1;

    if (index <= fullText.length) {
      window.setTimeout(type, 42);
      return;
    }

    typingTarget.classList.remove("is-typing");
  };

  type();
}

/* Reveals al hacer scroll. Progressive enhancement: sin JS o con prefers-reduced-motion,
   el contenido se ve completo. CSS soportado -> scroll-driven animations; si no, este
   IntersectionObserver hace de fallback agregando .is-visible. */
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealTargets = document.querySelectorAll(
  ".section-heading, .stack-row, .project-row, .contact-item"
);

if (revealTargets.length && !prefersReducedMotion) {
  document.documentElement.classList.add("reveal-enabled");
  revealTargets.forEach((el) => el.classList.add("reveal"));

  const supportsScrollDriven = CSS.supports(
    "(animation-timeline: view()) and (animation-range: entry)"
  );

  if (!supportsScrollDriven) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    revealTargets.forEach((el) => observer.observe(el));
  }
}