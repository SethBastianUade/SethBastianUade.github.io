const projects = [
  {
    title: "Club Center Fight Academy",
    chip: "Cliente",
    description:
      "Sitio institucional para un club. Mas presencia online y una imagen mas profesional.",
    stack: "HTML · CSS · JavaScript",
    links: [
      { label: "Ver sitio", href: "https://clubcenterfa.com" },
      {
        label: "GitHub",
        href: "https://github.com/SethBastianUade/Proyect-Club-Center-Fight-Academy",
      },
    ],
  },
  {
    title: "Ruta de los 7",
    chip: "Cliente",
    description:
      "Tienda en WooCommerce para un cliente real: catalogo y experiencia de compra.",
    stack: "WooCommerce · Frontend · E-commerce",
    links: [{ label: "Ver sitio", href: "https://rutadelos7.com.ar" }],
  },
  {
    title: "Mamba Servicios",
    chip: "Cliente",
    description:
      "Landing para comunicar servicios y mejorar la presencia comercial del cliente.",
    stack: "Landing · HTML · CSS · JavaScript",
    links: [{ label: "Ver sitio", href: "https://mambaservicios.com" }],
  },
  {
    title: "Kash",
    chip: "Academico",
    description:
      "Billetera virtual academica: cuentas, transferencias y reportes. Foco en la logica.",
    stack: "Python · Logica de negocio · Reportes",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/SethBastianUade/Kash",
      },
    ],
  },
  {
    title: "Proyecto Final de Programacion II",
    chip: "Academico",
    description:
      "App de escritorio en Java (POO) que simula una plataforma de delivery.",
    stack: "Java · POO · App de escritorio",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/SethBastianUade/UADE-2025-PROGRA-II",
      },
    ],
  },
];

export default function ProjectsSection() {
  return (
    <section className="section section-narrow" id="proyectos">
      <h2 className="section-label reveal-hidden">
        Proyectos <span className="count">05</span>
      </h2>

      {projects.map((project) => (
        <article key={project.title} className="project reveal-hidden">
          <div className="project-head">
            <h3>{project.title}</h3>
            <span className="chip">{project.chip}</span>
          </div>
          <p>{project.description}</p>
          <p className="project-stack">{project.stack}</p>
          <div className="project-links">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener"
              >
                {link.label}
              </a>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}
