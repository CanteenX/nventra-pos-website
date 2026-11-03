"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { STATS } from "@/lib/content/home";

/**
 * Count-up number (idea from Magic UI's Number Ticker, MIT). The final value
 * is rendered in the HTML so it is correct without JavaScript, for crawlers
 * and under reduced motion; the animation only runs when it scrolls into view.
 */
function Ticker({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView || reduce || value === 0) return;
    const controls = animate(0, value, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        node.textContent = Math.round(v).toString();
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  );
}

export function StatsBand() {
  return (
    <section aria-label="Nventra POS in numbers" className="border-y border-line bg-bg-subtle">
      <dl className="container-x grid grid-cols-2 gap-y-10 py-14 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="px-2 text-center">
            <dt className="sr-only">{s.label}</dt>
            <dd className="text-5xl font-medium tracking-tighter sm:text-6xl">
              <Ticker value={s.value} />
              {s.suffix}
            </dd>
            <dd className="mt-2 text-sm font-medium">{s.label}</dd>
            <dd className="mt-1 text-xs text-fg-muted">{s.source}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
