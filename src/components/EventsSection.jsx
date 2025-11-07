import { useMemo, useState } from 'react';

const ALL_EVENTS = [
  { id: 1, title: 'AI Hackathon', category: 'Technical' },
  { id: 2, title: 'Battle of Bands', category: 'Cultural' },
  { id: 3, title: 'Valorant Cup', category: 'E-Sports' },
  { id: 4, title: 'UI/UX Workshop', category: 'Workshops' },
  { id: 5, title: 'Robotics Challenge', category: 'Technical' },
  { id: 6, title: 'Street Dance Showdown', category: 'Cultural' },
  { id: 7, title: 'FIFA League', category: 'E-Sports' },
  { id: 8, title: 'Startup Pitch Clinic', category: 'Workshops' },
];

const CATEGORIES = ['All', 'Technical', 'Cultural', 'E-Sports', 'Workshops'];

export default function EventsSection() {
  const [active, setActive] = useState('All');

  const filtered = useMemo(() => {
    if (active === 'All') return ALL_EVENTS;
    return ALL_EVENTS.filter((e) => e.category === active);
  }, [active]);

  return (
    <section
      id="events"
      className="snap-start min-h-screen bg-gradient-to-b from-indigo-500 via-purple-600 to-fuchsia-600 text-white"
      aria-label="The Ignition: Events"
    >
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-sm backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-white" />
          The Ignition
        </div>
        <h2 className="text-4xl font-extrabold sm:text-5xl">Events</h2>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition backdrop-blur ${
                active === cat
                  ? 'bg-white text-purple-700'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((evt) => (
            <div
              key={evt.id}
              className="group relative overflow-hidden rounded-2xl bg-white/10 p-5 shadow-lg ring-1 ring-white/20 backdrop-blur transition hover:translate-y-[-2px]"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-bold">{evt.title}</h3>
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                  {evt.category}
                </span>
              </div>
              <p className="mt-3 text-sm text-white/80">
                High energy, high stakes. Join the action and make your mark.
              </p>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 translate-y-10 bg-gradient-to-t from-black/30 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-4 flex translate-y-6 justify-center opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                <a
                  href="#register"
                  className="rounded-full bg-white px-5 py-2 text-sm font-bold text-purple-700 shadow"
                >
                  Register
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
