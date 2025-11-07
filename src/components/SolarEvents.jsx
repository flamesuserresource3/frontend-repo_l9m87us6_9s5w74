import { useEffect, useMemo, useState } from 'react';

const BASE_EVENTS = [
  { id: 1, title: 'AI Hackathon', ring: 1 },
  { id: 2, title: 'Battle of Bands', ring: 2 },
  { id: 3, title: 'Valorant Cup', ring: 3 },
  { id: 4, title: 'UI/UX Workshop', ring: 2 },
  { id: 5, title: 'Robotics Challenge', ring: 1 },
  { id: 6, title: 'FIFA League', ring: 3 },
  { id: 7, title: 'Startup Pitch Clinic', ring: 2 },
];

function useScrollProgress(id) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById(id);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const visible = Math.min(Math.max(1 - rect.top / vh, 0), 1);
      setP(visible);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [id]);
  return p;
}

export default function SolarEvents() {
  const progress = useScrollProgress('events');
  const events = useMemo(() => BASE_EVENTS, []);

  return (
    <section id="events" className="relative min-h-screen snap-start bg-gradient-to-b from-indigo-950 via-purple-950 to-black text-white" aria-label="The Solar System: Events">
      {/* Central sun and rings */}
      <div className="absolute inset-0 -z-0 flex items-center justify-center">
        <div className="relative h-[36rem] w-[36rem] max-w-[90vw]">
          <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-amber-300 to-fuchsia-400 blur-[2px] shadow-[0_0_60px_rgba(244,114,182,0.6)]" />
          {[1, 2, 3].map((r) => (
            <div key={r} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" style={{ width: `${16 * r}rem`, height: `${16 * r}rem` }} />
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-purple-200 shadow-sm backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-fuchsia-300" />
          The Solar System
        </div>
        <h2 className="text-4xl font-extrabold sm:text-5xl">Events</h2>
        <p className="mt-2 text-purple-200/80">Orbiting highlights — tap a planet to register.</p>

        <div className="relative mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="relative h-[28rem] overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur">
            <div className="relative h-full w-full">
              {events.map((evt, i) => {
                const angle = (i / events.length) * Math.PI * 2 + progress * 1.5; // rotate with scroll
                const radiusRem = 8 + evt.ring * 4;
                const x = Math.cos(angle) * radiusRem;
                const y = Math.sin(angle) * radiusRem;
                const depth = 1 + (evt.ring - 1) * 0.25; // different parallax speeds
                return (
                  <button
                    key={evt.id}
                    className="absolute flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-b from-white to-purple-200 text-purple-900 shadow-lg ring-1 ring-purple-300/50 transition hover:scale-105"
                    style={{ left: `calc(50% + ${x}rem)`, top: `calc(50% + ${y * depth}rem)` }}
                    onClick={() => alert(`Register for ${evt.title}`)}
                  >
                    <span className="px-2 text-center text-[10px] font-bold leading-tight">{evt.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            {events.map((evt) => (
              <div key={evt.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <div>
                  <div className="text-sm uppercase tracking-wider text-purple-200/70">Ring {evt.ring}</div>
                  <div className="text-lg font-semibold">{evt.title}</div>
                </div>
                <button className="rounded-full bg-fuchsia-400 px-4 py-2 text-xs font-bold text-black shadow hover:bg-fuchsia-300" onClick={() => alert(`Register for ${evt.title}`)}>
                  Register
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
