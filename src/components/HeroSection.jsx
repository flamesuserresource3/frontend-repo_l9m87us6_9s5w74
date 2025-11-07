import { useEffect, useMemo, useState } from 'react';
import Spline from '@splinetool/react-spline';

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

export default function HeroSection() {
  // Target date 60 days from now as a default demo
  const target = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 60);
    return d.getTime();
  }, []);
  const { days, hours, minutes, seconds } = useCountdown(target);

  return (
    <section
      id="home"
      className="relative h-screen snap-start overflow-hidden bg-white text-neutral-900"
      aria-label="The Spark: Home"
    >
      {/* Spline 3D background */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/ShS6h2HOKd20s1py/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Warm gradient overlay to enhance contrast; pointer-events-none so 3D remains interactable */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-yellow-300/60 via-amber-200/30 to-transparent" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-amber-700 shadow-sm backdrop-blur">
          <span className="h-2 w-2 animate-pulse rounded-full bg-yellow-500" />
          The Spark
        </div>
        <h1 className="font-extrabold text-neutral-900 drop-shadow-sm [text-shadow:0_1px_0_rgba(255,255,255,0.5)] text-6xl sm:text-7xl md:text-8xl">
          IGNITIA
        </h1>
        <p className="mt-3 text-lg sm:text-xl md:text-2xl text-neutral-800/90">
          The Annual Your College Name Fest
        </p>

        {/* Countdown */}
        <div className="mt-8 grid grid-cols-4 gap-3 text-center">
          {[
            { label: 'Days', value: days },
            { label: 'Hours', value: hours },
            { label: 'Minutes', value: minutes },
            { label: 'Seconds', value: seconds },
          ].map((t) => (
            <div
              key={t.label}
              className="rounded-xl bg-white/80 px-4 py-3 shadow backdrop-blur-sm"
            >
              <div className="text-3xl font-black text-amber-700 tabular-nums">
                {String(t.value).padStart(2, '0')}
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-amber-900/80">
                {t.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#events"
            className="rounded-full bg-yellow-400 px-8 py-3 text-base font-bold text-neutral-900 shadow-lg shadow-yellow-500/30 transition hover:translate-y-[-2px] hover:bg-yellow-300 focus:outline-none focus:ring-4 focus:ring-yellow-400/60"
          >
            Register Now
          </a>
          <a
            href="#about"
            className="rounded-full bg-white/70 px-8 py-3 text-base font-semibold text-amber-800 shadow backdrop-blur transition hover:bg-white/90 focus:outline-none focus:ring-4 focus:ring-amber-200"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
