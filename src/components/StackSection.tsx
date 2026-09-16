const stack = [
  {
    name: "IA y agentes",
    desc: "Botpress, diseño de prompts, guardrails, flujos conversacionales y WhatsApp Business API.",
  },
  {
    name: "IA en el trabajo",
    desc: "Claude Code a diario para investigar, refactorizar y documentar, con revisión humana.",
  },
  { name: "Lenguajes", desc: "Java, Python y SQL." },
  {
    name: "Backend y datos",
    desc: "Spring Boot, ZK, Hibernate, JPA, APIs REST, PostgreSQL, SQL Server y MySQL.",
  },
  {
    name: "Herramientas",
    desc: "Postman, Docker, GitHub y GitHub Actions (CI/CD).",
  },
  { name: "Frontend", desc: "React y Tailwind CSS." },
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
