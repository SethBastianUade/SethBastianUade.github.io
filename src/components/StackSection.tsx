const stack = [
  { name: "Lenguajes", desc: "Java, Python, SQL y TypeScript." },
  {
    name: "Backend",
    desc: "Spring Boot, JPA / Hibernate, APIs REST y ZK.",
  },
  {
    name: "Bases de datos",
    desc: "PostgreSQL, SQL Server, Oracle y MySQL.",
  },
  { name: "Frontend", desc: "React, HTML y CSS." },
  {
    name: "Herramientas",
    desc: "Git, GitHub Actions, Docker y Postman.",
  },
  {
    name: "IA",
    desc: "Claude Code en el flujo de desarrollo diario; Inspect y Ollama para investigación de evaluaciones; Botpress y WhatsApp Business API para agentes conversacionales.",
  },
];

export default function StackSection() {
  return (
    <section className="section section-narrow" id="stack">
      <h2 className="section-label">
        Stack <span className="count">{String(stack.length).padStart(2, "0")}</span>
      </h2>
      <div>
        {stack.map((item) => (
          <div key={item.name} className="stack-row">
            <span className="stack-name">{item.name}</span>
            <span className="stack-desc">{item.desc}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
