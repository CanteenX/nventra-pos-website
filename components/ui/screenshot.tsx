import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { SHOTS, type ShotId } from "@/lib/screenshots";
import { ProductVisual, hasCapture } from "@/components/ui/product-visual";

interface ScreenshotProps {
  id: ShotId;
  className?: string;
  priority?: boolean;
  sizes?: string;
  caption?: boolean;
}

function SampleBadge() {
  return (
    <span className="ml-auto shrink-0 rounded-full border border-line px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-fg-muted">
      Sample data
    </span>
  );
}

/** Browser chrome around any product visual; flags sample-data illustrations. */
export function BrowserFrame({
  sample,
  className,
  children,
  caption,
}: {
  sample: boolean;
  className?: string;
  children: ReactNode;
  caption?: string;
}) {
  return (
    <figure
      className={cn("overflow-hidden rounded-2xl border border-line bg-card shadow-xl shadow-black/5", className)}
    >
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
        <span className="size-2.5 rounded-full bg-line-strong" aria-hidden />
        <span className="size-2.5 rounded-full bg-line-strong" aria-hidden />
        <span className="size-2.5 rounded-full bg-line-strong" aria-hidden />
        <span className="ml-3 truncate rounded-md bg-bg-subtle px-2 py-0.5 font-mono text-[10px] text-fg-muted" aria-hidden>
          your-server:1995
        </span>
        {sample ? <SampleBadge /> : null}
      </div>
      {children}
      {caption ? (
        <figcaption className="border-t border-line px-4 py-2.5 text-sm text-fg-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

/** A 390x844 phone capture inside a CSS phone bezel, centred on a soft panel. */
function PhoneShotFrame({ className, children, caption }: { className?: string; children: ReactNode; caption?: string }) {
  return (
    <figure className={cn("overflow-hidden rounded-2xl border border-line bg-bg-subtle shadow-xl shadow-black/5", className)}>
      <div className="flex justify-center px-6 py-8">
        <div className="w-full max-w-[16rem] rounded-[2.2rem] bg-neutral-900 p-2 shadow-2xl shadow-black/30 ring-1 ring-white/10">
          <div className="overflow-hidden rounded-[1.75rem] bg-bg">{children}</div>
        </div>
      </div>
      {caption ? (
        <figcaption className="border-t border-line bg-card px-4 py-2.5 text-sm text-fg-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

/**
 * A product screen in a device frame: the real capture when
 * public/screenshots/<file> exists, otherwise a labelled sample-data
 * illustration of the same screen. Phone captures get a phone bezel.
 */
export function Screenshot({ id, className, priority = false, sizes, caption = false }: ScreenshotProps) {
  const shot = SHOTS[id];
  const captured = hasCapture(id);
  const label = caption ? shot.caption : undefined;
  if (captured && shot.device === "phone") {
    return (
      <PhoneShotFrame className={className} caption={label}>
        <ProductVisual id={id} priority={priority} sizes={sizes ?? "256px"} />
      </PhoneShotFrame>
    );
  }
  return (
    <BrowserFrame sample={!captured} className={className} caption={label}>
      <ProductVisual id={id} priority={priority} sizes={sizes} />
    </BrowserFrame>
  );
}
