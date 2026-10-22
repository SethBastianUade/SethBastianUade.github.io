type Project = {
  title: string;
  chip: string;
  description: string;
  stack: string;
  links: { label: string; href: string }[];
};

const projects: Project[] = [
  {
    title: "Investigathon 2026 · Reward Hacking",
    chip: "Investigación · en curso",
    description:
      "Proyecto de investigación en equipo. Pregunta: ¿los reward hacks muestran más exploración del entorno que las soluciones legítimas, medido solo desde los comandos del agente? Corro evals con Inspect sobre un modelo abierto local (Qwen3 8B vía Ollama) y agregué logging por acción a un fork del benchmark EvilGenie. Los pilotos están hechos; falta el código de análisis.",
    stack: "Python · Inspect · Ollama · Qwen3 8B · EvilGenie",
    links: [
      { label: "GitHub", href: "https://github.com/SethBastianUade/Investigathon-2026" },
    ],
  },
  {
    title: "BiFrost",
    chip: "Kreta · en producción",
    description:
      "SaaS POS multi-tenant para PyMEs, enfocado en la gestión de ventas y la salud financiera del negocio (indicadores y reportes), con facturación electrónica a través de la API de ARCA.",
    stack: "Java 17 · Spring Boot · PostgreSQL · React",
    links: [{ label: "Ver demo", href: "https://bifrost-software.com.ar/login" }],
  },
  {
    title: "ERP",
    chip: "Personal · en desarrollo",
    description:
      "Sistema de gestión empresarial. Proyecto personal en desarrollo, todavía no público.",
    stack: "Java · Spring Boot",
    links: [],
  },
  {
    title: "Kreta",
    chip: "Estudio",
    description:
      "Estudio de software que cofundé para construir soluciones a medida para PyMEs.",
    stack: "Software a medida · PyMEs",
    links: [{ label: "Ver sitio", href: "https://www.sebastianarroyo.tech/Web-Kreta/" }],
  },
  {
    title: "Club Center Fight Academy",
    chip: "Cliente",
    description:
      "Sitio institucional y agente de IA sobre WhatsApp Business API para la atención al cliente del club. Relevé el proceso y diseñé flujos, prompts y guardrails hasta el go-live; operó hasta que el cambio de pricing de la API de WhatsApp dejó de cerrarle al cliente.",
    stack: "Botpress · WhatsApp Business API · HTML · CSS · JavaScript",
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
      "Tienda en WooCommerce para un cliente real: catálogo y experiencia de compra.",
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
    chip: "Académico",
    description:
      "Billetera virtual académica: cuentas, transferencias y reportes. Foco en la lógica.",
    stack: "Python · Lógica de negocio · Reportes",
    links: [{ label: "GitHub", href: "https://github.com/SethBastianUade/Kash" }],
  },
  {
    title: "Proyecto Final de Programación II",
    chip: "Académico",
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
        Proyectos <span className="count">{String(projects.length).padStart(2, "0")}</span>
      </h2>

      {projects.map((project) => (
        <article key={project.title} className="project reveal-hidden">
          <div className="project-head">
            <h3>{project.title}</h3>
            <span className="chip">{project.chip}</span>
          </div>
          <p>{project.description}</p>
          <p className="project-stack">{project.stack}</p>
          {project.links.length > 0 && (
            <div className="project-links">
              {project.links.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener">
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </article>
      ))}
    </section>
  );
}
