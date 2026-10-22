export default function ContactSection() {
  return (
    <section className="section section-narrow" id="contacto">
      <h2 className="section-label reveal-hidden">Contacto</h2>
      <div className="contact reveal-blur">
        <p className="body-lg">
          ¿Necesitás un backend Java que aguante producción, o alguien que
          integre y evalúe IA con el mismo cuidado? Escribime a{" "}
          <a href="mailto:sebastianarroyo9014@gmail.com">
            sebastianarroyo9014@gmail.com
          </a>
          .
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
