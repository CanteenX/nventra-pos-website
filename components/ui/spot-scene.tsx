import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

/*
 * Small decorative "spot illustrations" built from lucide icons and SVG lines
 * in brand colours. Always aria-hidden: the card text carries the meaning.
 */

function Bubble({ icon: Icon, big = false }: { icon: LucideIcon; big?: boolean }) {
  return (
    <span
      className={cn(
        "flex items-center justify-center rounded-2xl shadow-lg",
        big
          ? "size-16 bg-mint text-mint-fg shadow-[0_10px_40px_-10px_var(--mint)] sm:size-20"
          : "size-11 border border-line bg-card text-mint-text shadow-black/10 sm:size-12",
      )}
    >
      <Icon className={big ? "size-8 sm:size-9" : "size-5"} strokeWidth={1.75} />
    </span>
  );
}

interface HubSceneProps {
  center: LucideIcon;
  around: LucideIcon[];
  className?: string;
}

/** A hub icon with satellites on an ellipse, joined by dashed lines. */
export function HubScene({ center, around, className }: HubSceneProps) {
  const pts = around.map((_, i) => {
    const a = (-90 + (360 / around.length) * i) * (Math.PI / 180);
    return { x: 50 + Math.cos(a) * 34, y: 50 + Math.sin(a) * 30 };
  });
  return (
    <div
      className={cn("bg-dots relative aspect-[16/9] overflow-hidden rounded-2xl border border-line bg-bg-subtle", className)}
      aria-hidden
    >
      <div className="glow-mint absolute inset-0" />
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
        {pts.map((p, i) => (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={p.x}
            y2={p.y}
            stroke="var(--mint-text)"
            strokeOpacity="0.55"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      {pts.map((p, i) => (
        <span key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
          <Bubble icon={around[i]} />
        </span>
      ))}
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Bubble icon={center} big />
      </span>
    </div>
  );
}

/** Icons in a row with arrows between them: a simple flow. */
export function FlowScene({ steps, className }: { steps: LucideIcon[]; className?: string }) {
  return (
    <div
      className={cn(
        "bg-dots relative flex aspect-[16/9] items-center justify-center gap-2 overflow-hidden rounded-2xl border border-line bg-bg-subtle px-4 sm:gap-3",
        className,
      )}
      aria-hidden
    >
      <div className="glow-mint absolute inset-0" />
      {steps.map((Icon, i) => (
        <span key={i} className="relative flex items-center gap-2 sm:gap-3">
          {i > 0 ? <ArrowRight className="size-4 text-mint-text" /> : null}
          <Bubble icon={Icon} big={i === Math.floor(steps.length / 2)} />
        </span>
      ))}
    </div>
  );
}
