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

/**
 * A product screen inside a minimal browser frame: the real capture when it
 * exists, otherwise a labelled sample-data illustration of the same screen.
 */
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
        {sample ? (
          <span className="ml-auto shrink-0 rounded-full border border-line px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-fg-muted">
            Sample data
          </span>
        ) : null}
      </div>
      {children}
      {caption ? (
        <figcaption className="border-t border-line px-4 py-2.5 text-sm text-fg-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

export function Screenshot({ id, className, priority = false, sizes, caption = false }: ScreenshotProps) {
  const shot = SHOTS[id];
  return (
    <BrowserFrame sample={!hasCapture(id)} className={className} caption={caption ? shot.caption : undefined}>
      <ProductVisual id={id} priority={priority} sizes={sizes} />
    </BrowserFrame>
  );
}
