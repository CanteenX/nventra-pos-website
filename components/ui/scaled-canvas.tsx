"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Design size of every UI illustration (16:10). */
const W = 800;
const H = 500;
const BASE_FONT_PX = W * 0.018;

interface ScaledCanvasProps {
  label: string;
  className?: string;
  children: ReactNode;
}

/**
 * Draws an illustration at a fixed 800×500 design size and scales it to fit,
 * like a screenshot, so small cards never hit the browser's minimum font
 * size. Before hydration (or without JS) the .ui-canvas CSS sizes it with
 * container units instead, which looks the same at normal widths.
 */
export function ScaledCanvas({ label, className, children }: ScaledCanvasProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      className={cn("ui-canvas relative aspect-[16/10] w-full overflow-hidden", className)}
    >
      <div
        aria-hidden
        className="h-full select-none"
        style={
          scale
            ? { width: W, height: H, fontSize: BASE_FONT_PX, transform: `scale(${scale})`, transformOrigin: "0 0" }
            : undefined
        }
      >
        {children}
      </div>
    </div>
  );
}
