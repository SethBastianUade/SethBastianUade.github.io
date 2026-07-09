const items = [
  "Java",
  "Spring Boot",
  "SQL Server",
  "REST APIs",
  "Git",
  "Microservicios",
  "POO",
];

export default function MarqueeTrack() {
  const track = [...items, ...items];

  return (
    <div className="hero-meta stagger" style={{ "--d": 3 } as React.CSSProperties}>
      <div className="marquee-track">
        {track.map((item, i) => (
          <span key={i}>
            {item}
            <span className="marquee-dot"> ·</span>
          </span>
        ))}
      </div>
      <style jsx>{`
        .hero-meta {
          margin-top: 1.75rem;
          overflow: hidden;
          position: relative;
          /* mask, no un gradiente opaco: detras esta el shader, asi que pintar
             hacia --color-bg dejaria un rectangulo visible en los bordes. */
          mask-image: linear-gradient(
            to right,
            transparent,
            #000 60px,
            #000 calc(100% - 60px),
            transparent
          );
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-scroll 20s linear infinite;
        }
        /* margin en vez de gap: con gap, translateX(-50%) no cae en un ciclo
           exacto (sobra medio gap) y el loop pega un salto. */
        .marquee-track > span {
          flex-shrink: 0;
          margin-right: 3rem;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--color-dim);
          white-space: nowrap;
        }
        .hero-meta:hover .marquee-track {
          animation-play-state: paused;
        }
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
