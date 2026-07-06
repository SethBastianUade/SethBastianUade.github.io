// Marca que hay JS: los reveals solo se ocultan con esta clase (sin JS todo se ve).
document.documentElement.classList.add("js");

// Menu movil
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {
  const setMenuState = (open) => {
    nav.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Cerrar menu" : "Abrir menu");
  };

  menuToggle.addEventListener("click", () => {
    setMenuState(!nav.classList.contains("open"));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) {
      setMenuState(false);
    }
  });
}

// Reveals al hacer scroll, escalonados por seccion
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealTargets = document.querySelectorAll(".reveal-hidden");

if (prefersReducedMotion) {
  revealTargets.forEach((el) => el.classList.add("reveal-visible"));
} else if (revealTargets.length) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const section = entry.target;
        const items = section.matches(".reveal-hidden")
          ? [section]
          : section.querySelectorAll(".reveal-hidden");
        items.forEach((item, i) => {
          setTimeout(() => item.classList.add("reveal-visible"), i * 100);
        });
        obs.unobserve(section);
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  document.querySelectorAll("main .section, footer.reveal-hidden").forEach((el) => {
    observer.observe(el);
  });
}
