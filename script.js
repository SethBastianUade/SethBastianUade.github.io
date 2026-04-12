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