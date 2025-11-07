export default function AboutSection() {
  return (
    <section
      id="about"
      className="snap-start min-h-screen bg-gradient-to-b from-orange-200 via-orange-300 to-red-400 text-red-950"
      aria-label="The Fuel: About"
    >
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-red-700 shadow-sm backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-red-600" />
          The Fuel
        </div>
        <h2 className="text-4xl font-extrabold sm:text-5xl">What is Ignitia?</h2>
        <p className="mt-4 text-lg/relaxed text-red-900/80">
          We’re not just a fest; we’re a tradition of curiosity, creativity, and community. Ignitia brings together
          innovators, artists, gamers, and dreamers for a multi-day celebration packed with competitions, showcases,
          and experiences that spark lifelong memories.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            { value: '10+', label: 'Years' },
            { value: '50+', label: 'Events' },
            { value: '10,000+', label: 'Attendees' },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl bg-white/70 p-6 text-center shadow backdrop-blur"
            >
              <div className="text-5xl font-black text-red-700">{item.value}</div>
              <div className="mt-1 text-sm font-semibold uppercase tracking-wider text-red-900/80">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
