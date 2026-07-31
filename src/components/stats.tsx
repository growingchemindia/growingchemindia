"use client";

import { useEffect, useRef, useState } from "react";
import { stats, type Stat } from "@/lib/content";

function useCountUp(target: number, run: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, run, duration]);
  return value;
}

function StatItem({ stat, run }: { stat: Stat; run: boolean }) {
  const value = useCountUp(stat.value, run);
  return (
    <div className="text-center">
      <b className="block font-[family-name:var(--font-head)] text-[clamp(1.9rem,4vw,2.8rem)] font-extrabold text-brand-200">
        {value}
        {stat.suffix ?? ""}
      </b>
      <span className="text-[0.92rem] text-[#a6b0da]">{stat.label}</span>
    </div>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-dark text-white">
      <div
        ref={ref}
        className="mx-auto grid w-[92%] max-w-[1160px] grid-cols-2 gap-6 py-10 sm:grid-cols-4"
      >
        {stats.map((stat) => (
          <StatItem key={stat.label} stat={stat} run={run} />
        ))}
      </div>
    </section>
  );
}
