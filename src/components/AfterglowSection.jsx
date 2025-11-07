export default function AfterglowSection() {
  return (
    <section
      id="gallery"
      className="snap-start min-h-screen bg-gradient-to-b from-indigo-950 via-slate-900 to-blue-950 text-white"
      aria-label="The Afterglow: Gallery"
    >
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-sm backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-indigo-300" />
          The Afterglow
        </div>
        <h2 className="text-4xl font-extrabold sm:text-5xl">Gallery</h2>

        <div className="mt-8 columns-1 gap-4 sm:columns-2 md:columns-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="mb-4 break-inside-avoid">
              <img
                src={`https://images.unsplash.com/photo-${1600000000000 + i}?auto=format&fit=crop&w=1200&q=60`}
                alt={`Ignitia moment ${i + 1}`}
                className="w-full rounded-xl border border-white/10 object-cover shadow"
              />
            </div>
          ))}
        </div>

        <div className="mt-10 aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1"
            title="Ignitia Hype Reel"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
