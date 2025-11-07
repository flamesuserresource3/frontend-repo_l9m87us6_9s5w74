import { useEffect, useState } from 'react';

function useDrawnLines() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const section = document.getElementById('about');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const visible = Math.min(Math.max(1 - rect.top / vh, 0), 1);
      setProgress(visible);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return progress;
}

export default function ConstellationAbout() {
  const progress = useDrawnLines();
  return (
    <section id="about" className="relative min-h-screen snap-start bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-white" aria-label="The Constellation: About">
      <div className="absolute inset-0">
        <svg width="100%" height="100%" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <defs>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(167,139,250,0.6)" />
              <stop offset="100%" stopColor="rgba(167,139,250,0)" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="200" r="120" fill="url(#glow)" />
          <circle cx="900" cy="600" r="160" fill="url(#glow)" />

          <g stroke="#a78bfa" strokeWidth="2" strokeLinecap="round">
            <line x1="200" y1="200" x2={200 + 400 * progress} y2="200" />
            <line x1="600" y1="200" x2="900" y2={200 + 400 * progress} />
            <line x1="900" y1="600" x2={900 - 300 * progress} y2={600 - 200 * progress} />
          </g>

          <g fill="#e9d5ff">
            <circle cx="200" cy="200" r="3" />
            <circle cx="600" cy="200" r="3" />
            <circle cx="900" cy="600" r="3" />
          </g>
        </svg>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-24">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-purple-200 shadow-sm backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-purple-300" />
          The Constellation
        </div>
        <h2 className="text-4xl font-extrabold sm:text-5xl">What is Ignitia?</h2>
        <p className="mt-4 text-lg/relaxed text-purple-100/90">
          We’re not just a fest; we’re a tradition written in the stars — connecting dreamers across disciplines to
          build, perform, play, and celebrate together.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            { value: '10+', label: 'Years' },
            { value: '50+', label: 'Events' },
            { value: '10,000+', label: 'Attendees' },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl bg-white/5 p-6 text-center shadow backdrop-blur">
              <div className="text-5xl font-black text-purple-300">{item.value}</div>
              <div className="mt-1 text-sm font-semibold uppercase tracking-wider text-purple-100/80">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
