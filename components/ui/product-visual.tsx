import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { FRAGMENTS } from "@/components/fragments/registry";
import { ScaledCanvas } from "@/components/ui/scaled-canvas";
import { cn } from "@/lib/cn";
import { SHOTS, type ShotId } from "@/lib/screenshots";

/** True when a real screenshot was captured into /public (checked at build time). */
export function hasCapture(id: ShotId): boolean {
  try {
    return existsSync(join(process.cwd(), "public", SHOTS[id].src));
  } catch {
    return false;
  }
}

/** Neutral 16:10 stand-in for a screen with neither a capture nor an illustration yet. */
function ShotPlaceholder({ caption, className }: { caption: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`${caption}: screenshot coming soon`}
      className={cn(
        "relative flex aspect-[16/10] w-full flex-col items-center justify-center gap-2 overflow-hidden bg-bg-subtle text-center",
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-60 [background-image:linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [background-size:28px_28px]"
      />
      <ImageIcon className="relative size-6 text-fg-muted" aria-hidden />
      <span className="relative text-sm font-semibold">{caption}</span>
      <span className="relative text-xs text-fg-muted">Screenshot coming soon</span>
    </div>
  );
}

interface ProductVisualProps {
  id: ShotId;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

/**
 * The real screenshot when one has been captured; until then an HTML/CSS
 * illustration of the same screen drawn with clearly sample data.
 */
export function ProductVisual({ id, priority = false, sizes = "(min-width: 1024px) 50vw, 100vw", className }: ProductVisualProps) {
  const shot = SHOTS[id];
  if (hasCapture(id)) {
    return (
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        priority={priority}
        sizes={sizes}
        className={cn("h-auto w-full", className)}
      />
    );
  }
  const Fragment = FRAGMENTS[id];
  if (!Fragment) {
    return <ShotPlaceholder caption={shot.caption} className={className} />;
  }
  return (
    <ScaledCanvas label={`${shot.alt}. Illustration with sample data.`} className={className}>
      <Fragment />
    </ScaledCanvas>
  );
}
