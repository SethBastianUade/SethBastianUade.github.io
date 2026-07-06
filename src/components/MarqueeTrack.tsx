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
            {i < track.length - 1 && (
              <span className="marquee-dot"> ·</span>
            )}
          </span>
        ))}
      </div>
      <style jsx>{`
        .hero-meta {
          margin-top: 1.75rem;
          overflow: hidden;
          position: relative;
        }
        .hero-meta::before,
        .hero-meta::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 60px;
          z-index: 2;
          pointer-events: none;
        }
        .hero-meta::before {
          left: 0;
          background: linear-gradient(to right, var(--color-bg), transparent);
        }
        .hero-meta::after {
          right: 0;
          background: linear-gradient(to left, var(--color-bg), transparent);
        }
        .marquee-track {
          display: flex;
          gap: 3rem;
          width: max-content;
          animation: marquee-scroll 20s linear infinite;
        }
        .marquee-track span {
          flex-shrink: 0;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--color-dim);
          white-space: nowrap;
        }
        .marquee-dot {
          color: var(--color-dim);
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
