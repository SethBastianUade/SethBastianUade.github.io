const jobs = [
  {
    org: "Vivatia",
    role: "Analista Programador",
    period: "Mar 2025 — hoy",
    bullets: [
      "Relevo las necesidades de clientes de banca y seguros y las convierto en desarrollos a medida en Java y ZK sobre Thuban, plataforma empresarial del sector.",
      "Soporte Nivel 2 de sistemas en producción: análisis de incidentes, debugging y fixes bajo SLA, con 100% de cumplimiento.",
      "Migraciones de sistemas y bases de datos (Oracle → SQL Server) para clientes corporativos.",
      "Reduje 20% el tiempo de respuesta de las APIs optimizando consultas SQL en SQL Server.",
    ],
  },
  {
    org: "Kreta",
    role: "Cofundador",
    period: "Mar 2024 — hoy",
    bullets: [
      "Estudio de software para PyMEs: relevo los procesos de venta y atención de cada cliente y los traduzco a software, explicando cada decisión técnica a los dueños.",
      "Construí BiFrost, un SaaS POS multi-tenant en Java 17 y Spring Boot con facturación electrónica integrada a la API de ARCA, hoy en producción.",
      "Implementé con Botpress un agente de IA sobre WhatsApp Business API para la atención al cliente de Club Center, del relevamiento al go-live.",
    ],
  },
  {
    org: "Vivatia · Proyecto BBVA",
    role: "Analista de Documentación",
    period: "Sep 2024 — Feb 2025",
    bullets: [
      "Reduje el backlog documental de COMEX y Banca Corporativa de 140 a 20 cajas, digitalizando y clasificando documentación crítica en Captika y Thuban.",
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section className="section section-narrow" id="experiencia">
      <h2 className="section-label reveal-hidden">Experiencia</h2>

      {jobs.map((job) => (
        <article key={job.org + job.role} className="project reveal-hidden">
          <div className="project-head">
            <h3>{job.org}</h3>
            <span className="chip">{job.period}</span>
          </div>
          <p className="project-stack">{job.role}</p>
          <ul className="job-bullets">
            {job.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
}
