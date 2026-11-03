import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
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
  return (
    <ScaledCanvas label={`${shot.alt}. Illustration with sample data.`} className={className}>
      <Fragment />
    </ScaledCanvas>
  );
}
