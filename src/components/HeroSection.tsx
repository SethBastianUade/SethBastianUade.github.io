// Hero adaptado de "prisma-hero" (21st.dev). Las animaciones de framer-motion
// se reemplazaron por la utilidad .stagger que ya existe: mismo efecto, sin
// dependencias nuevas. Lo mismo con el ícono de lucide (&rarr;).

function WordsPullUp({ text, offset = 0 }: { text: string; offset?: number }) {
  return text.split(" ").map((word, i) => (
    <span
      key={i}
      className="stagger inline-block mr-[0.2em] last:mr-0"
      style={{ "--d": offset + i * 0.5 } as React.CSSProperties}
    >
      {word}
    </span>
  ));
}

export default function HeroSection() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-card">
        {/* ponytail: video alojado en el CDN de 21st.dev; si desaparece queda el fondo oscuro. Bajarlo a public/ si querés controlarlo. */}
        <video
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className="hero-video absolute inset-0 h-full w-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
        />
        <div className="hero-noise pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/60" />

        <div className="absolute inset-x-0 bottom-0 px-4 pb-4 sm:px-6 md:px-10">
          <div className="grid grid-cols-12 items-end gap-4">
            <h1
              className="hero-title col-span-12 lg:col-span-8"
              aria-label="Sebastian Arroyo"
            >
              <span aria-hidden="true">
                <WordsPullUp text="Sebastian Arroyo" />
              </span>
            </h1>

            <div className="col-span-12 flex flex-col gap-5 pb-6 lg:col-span-4 lg:pb-10">
              <p className="hero-sub stagger" style={{ "--d": 3 } as React.CSSProperties}>
                Implemento agentes de IA y desarrollo backend en Java. Llevé un
                agente sobre WhatsApp Business API a producción y construyo
                software a medida para banca y PyMEs.
              </p>

              <div className="flex flex-wrap items-center gap-4 stagger" style={{ "--d": 4 } as React.CSSProperties}>
                <a href="#proyectos" className="hero-cta">
                  Ver proyectos
                  <span className="hero-cta-icon" aria-hidden="true">&rarr;</span>
                </a>
                <a href="cv.pdf" target="_blank" rel="noopener" className="hero-link">
                  Descargar CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
