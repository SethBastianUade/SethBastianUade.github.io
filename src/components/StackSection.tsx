const stack = [
  { name: "Java", desc: "El nucleo. Logica de negocio, POO y apps de verdad." },
  {
    name: "Spring Boot",
    desc: "APIs REST y estructura backend que no estorba.",
  },
  {
    name: "SQL Server",
    desc: "Consultas, persistencia y modelado de datos.",
  },
  {
    name: "REST APIs",
    desc: "Endpoints claros y contratos que se mantienen.",
  },
  {
    name: "Git",
    desc: "Versionado y trabajo ordenado, sin perder nada.",
  },
  {
    name: "Microservicios",
    desc: "Separar responsabilidades para que escale.",
  },
];

export default function StackSection() {
  return (
    <section className="section section-narrow" id="stack">
      <h2 className="section-label">
        Stack <span className="count">06</span>
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
