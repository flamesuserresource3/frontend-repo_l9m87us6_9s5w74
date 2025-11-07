export default function NebulaGallery() {
  return (
    <section id="gallery" className="relative min-h-screen snap-start bg-gradient-to-b from-fuchsia-950 via-purple-950 to-black text-white" aria-label="The Nebula: Gallery">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(circle at 20% 20%, rgba(236,72,153,0.25), transparent 60%), radial-gradient(circle at 80% 60%, rgba(99,102,241,0.25), transparent 60%)'
      }} />
      <div className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-purple-200 shadow-sm backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-fuchsia-300" />
          The Nebula
        </div>
        <h2 className="text-4xl font-extrabold sm:text-5xl">Gallery</h2>
        <p className="mt-2 text-purple-200/80">Float through highlights from past editions.</p>

        <div className="mt-8 columns-1 gap-4 sm:columns-2 md:columns-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="mb-4 break-inside-avoid">
              <img
                src={`https://picsum.photos/seed/ignitia-${i}/900/1200`}
                alt={`Ignitia highlight ${i + 1}`}
                className="w-full rounded-xl border border-white/10 object-cover shadow"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
