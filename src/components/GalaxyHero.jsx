import { useEffect, useMemo, useState } from 'react';
import Spline from '@splinetool/react-spline';

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY || window.pageYOffset);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return y;
}

function Starfield({ speed = 0.1 }) {
  const y = useScrollY();
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        transform: `translateY(${y * speed}px)`,
        backgroundImage:
          'radial-gradient(white 0.7px, transparent 0.8px), radial-gradient(white 0.6px, transparent 0.7px)',
        backgroundSize: '3px 3px, 2px 2px',
        backgroundPosition: '0 0, 1px 1px',
        opacity: 0.5,
      }}
    />
  );
}

function Nebulas({ speed = 0.3 }) {
  const y = useScrollY();
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ transform: `translateY(${y * speed}px)` }}
    >
      <div className="absolute -left-20 top-10 h-96 w-96 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(168,85,247,0.5), transparent 60%)' }} />
      <div className="absolute right-[-6rem] top-1/3 h-[28rem] w-[28rem] rounded-full blur-3xl" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.4), transparent 60%)' }} />
      <div className="absolute left-1/3 bottom-[-8rem] h-[30rem] w-[30rem] rounded-full blur-3xl" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(236,72,153,0.35), transparent 60%)' }} />
    </div>
  );
}

function ForegroundDust({ count = 40, speed = 1.5 }) {
  const y = useScrollY();
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 2 + Math.random() * 3,
      opacity: 0.25 + Math.random() * 0.5,
      blur: 0.5 + Math.random() * 2,
    }));
  }, [count]);
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.left}vw`,
            top: `calc(${p.top}vh + ${y * speed}px)`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            filter: `blur(${p.blur}px)`,
            boxShadow: '0 0 6px rgba(255,255,255,0.6)',
          }}
        />
      ))}
    </div>
  );
}

function useCountdown(targetDate) {
  const calc = () => {
    const now = new Date().getTime();
    const diff = Math.max(targetDate - now, 0);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
  };
  const [timeLeft, setTimeLeft] = useState(calc());
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(timer);
  }, []);
  return timeLeft;
}

export default function GalaxyHero() {
  const target = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 45);
    return d.getTime();
  }, []);
  const { days, hours, minutes, seconds } = useCountdown(target);

  return (
    <section id="home" className="relative h-screen snap-start overflow-hidden bg-black text-white" aria-label="The Big Bang: Home">
      {/* Layer 1: Deep Space (static) is the bg-black */}
      {/* Layer 2: Starfield */}
      <Starfield speed={0.1} />
      {/* Layer 3: Nebulas */}
      <Nebulas speed={0.3} />

      {/* Layer 4: Content with Spline background */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/er66D6jbuo0hIjmn/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-indigo-900/30 via-purple-900/20 to-black/40" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-purple-200 shadow-sm backdrop-blur">
          <span className="h-2 w-2 animate-pulse rounded-full bg-fuchsia-300" />
          The Big Bang
        </div>
        <h1 className="font-extrabold tracking-tight text-6xl sm:text-7xl md:text-8xl">
          IGNITIA
        </h1>
        <p className="mt-3 text-lg sm:text-xl md:text-2xl text-purple-200/90">
          The Annual Your College Name Fest
        </p>

        <div className="mt-8 grid grid-cols-4 gap-3 text-center">
          {[
            { label: 'Days', value: days },
            { label: 'Hours', value: hours },
            { label: 'Minutes', value: minutes },
            { label: 'Seconds', value: seconds },
          ].map((t) => (
            <div key={t.label} className="rounded-xl bg-white/10 px-4 py-3 shadow backdrop-blur-sm">
              <div className="text-3xl font-black text-fuchsia-300 tabular-nums">
                {String(t.value).padStart(2, '0')}
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-purple-200/80">
                {t.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="#events" className="rounded-full bg-fuchsia-400 px-8 py-3 text-base font-bold text-black shadow-lg shadow-fuchsia-500/30 transition hover:translate-y-[-2px] hover:bg-fuchsia-300 focus:outline-none focus:ring-4 focus:ring-fuchsia-400/60">
            Register Now
          </a>
          <a href="#about" className="rounded-full bg-white/10 px-8 py-3 text-base font-semibold text-purple-100 shadow backdrop-blur transition hover:bg-white/20 focus:outline-none focus:ring-4 focus:ring-purple-400/30">
            Learn More
          </a>
        </div>
      </div>

      {/* Layer 5: Foreground Dust */}
      <ForegroundDust speed={1.5} />
    </section>
  );
}
