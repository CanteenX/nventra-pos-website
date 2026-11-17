"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { STATS } from "@/lib/content/home";

/**
 * Count-up number (idea from Magic UI's Number Ticker, MIT). The final value
 * is in the HTML so it is right without JavaScript, for crawlers and under
 * reduced motion; the animation only runs once it scrolls into view.
 */
function Ticker({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView || reduce || value < 2) return;
    const controls = animate(0, value, {
      duration: 1.2,
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

/** Big verifiable numbers. Render inside a dark Section. */
export function StatsBand() {
  return (
    <dl className="grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
      {STATS.map((s, i) => (
        <div
          key={s.label}
          className={`flex flex-col border-l border-line pl-5 ${i === STATS.length - 1 ? "col-span-2 sm:col-span-1" : ""}`}
        >
          <dt className="order-2 mt-3 text-base font-medium">{s.label}</dt>
          <dd className="order-1 text-6xl font-semibold leading-none tracking-[-0.05em] text-brand-text sm:text-7xl">
            {s.prefix}
            <Ticker value={s.value} />
            {s.suffix}
          </dd>
          <dd className="order-3 mt-1 text-sm text-fg-muted">{s.source}</dd>
        </div>
      ))}
    </dl>
  );
}
