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
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        priority={priority}
        sizes={sizes}
        className="h-auto w-full"
      />
      {caption ? (
        <figcaption className="border-t border-line px-4 py-2.5 text-sm text-fg-muted">{shot.caption}</figcaption>
      ) : null}
    </figure>
  );
}
