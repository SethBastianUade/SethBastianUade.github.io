export default function ContactSection() {
  return (
    <section className="section section-narrow" id="contacto">
      <h2 className="section-label reveal-hidden">Contacto</h2>
      <div className="contact reveal-blur">
        <p className="body-lg">
          ¿Buscás a alguien que lleve agentes de IA a producción o construya el backend? Acá está mi CV y dónde encontrarme.
        </p>
        <div className="contact-actions">
          <a
            href="cv.pdf"
            target="_blank"
            rel="noopener"
            className="button-primary"
          >
            Descargar CV
          </a>
          <a
            href="https://www.linkedin.com/in/sebasti%C3%A1n-arroyo-84a46a20a"
            target="_blank"
            rel="noopener"
            className="button-secondary"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/SethBastianUade"
            target="_blank"
            rel="noopener"
            className="button-secondary"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
