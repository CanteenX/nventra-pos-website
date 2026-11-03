import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { SHOTS, type ShotId } from "@/lib/screenshots";

interface ScreenshotProps {
  id: ShotId;
  className?: string;
  priority?: boolean;
  sizes?: string;
  caption?: boolean;
}

/** True when the screenshot file was captured into /public (checked at build time). */
function hasFile(src: string): boolean {
  try {
    return existsSync(join(process.cwd(), "public", src));
  } catch {
    return false;
  }
}

/**
 * Shown until real screenshots are captured (scripts/capture-screenshots.mjs).
 * A schematic of the app shell — sidebar, header, cards — never a fake UI claim.
 */
function PreviewPlaceholder({ label, alt }: { label: string; alt: string }) {
  return (
    <div role="img" aria-label={`${alt} (preview image coming soon)`} className="relative aspect-[16/10] w-full bg-bg-subtle">
      <div className="absolute inset-0 grid grid-cols-[18%_1fr] gap-3 p-4" aria-hidden>
        <div className="flex flex-col gap-2 rounded-lg bg-card p-3">
          {Array.from({ length: 7 }, (_, i) => (
            <span key={i} className="h-2.5 rounded bg-line" style={{ width: `${60 + ((i * 13) % 35)}%` }} />
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <span className="h-4 w-1/3 rounded bg-line-strong" />
          <div className="grid flex-1 grid-cols-3 gap-3">
            {Array.from({ length: 6 }, (_, i) => (
              <span key={i} className="rounded-lg bg-card" />
            ))}
          </div>
        </div>
      </div>
      <span className="absolute bottom-3 right-3 rounded-full bg-card px-3 py-1 text-xs font-medium text-fg-muted shadow">
        {label} · preview
      </span>
    </div>
  );
}

/** A real product screenshot inside a minimal browser frame. */
export function Screenshot({
  id,
  className,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  caption = false,
}: ScreenshotProps) {
  const shot = SHOTS[id];
  return (
    <figure
      className={cn("overflow-hidden rounded-2xl border border-line bg-card shadow-xl shadow-black/5", className)}
    >
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2" aria-hidden>
        <span className="size-2.5 rounded-full bg-line-strong" />
        <span className="size-2.5 rounded-full bg-line-strong" />
        <span className="size-2.5 rounded-full bg-line-strong" />
        <span className="ml-3 truncate rounded-md bg-bg-subtle px-2 py-0.5 font-mono text-[10px] text-fg-muted">
          your-server:1995
        </span>
      </div>
      {hasFile(shot.src) ? (
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          priority={priority}
          sizes={sizes}
          className="h-auto w-full"
        />
      ) : (
        <PreviewPlaceholder label={shot.caption} alt={shot.alt} />
      )}
      {caption ? (
        <figcaption className="border-t border-line px-4 py-2.5 text-sm text-fg-muted">{shot.caption}</figcaption>
      ) : null}
    </figure>
  );
}
