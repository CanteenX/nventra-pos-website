import { cn } from "@/lib/cn";
import { SITE } from "@/lib/site";

/**
 * PLACEHOLDER brand mark: a simple "N" monogram. The real logo will replace
 * this one component (and public/icon.svg); nothing else references the mark.
 */
interface BrandMarkProps {
  className?: string;
  title?: string;
}

export function BrandMark({ className, title }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-8 shrink-0", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <rect width="32" height="32" rx="8" fill="var(--brand)" />
      <path
        d="M10 23V9h2.6l6.8 9.6V9H22v14h-2.6l-6.8-9.6V23z"
        fill="var(--brand-fg)"
      />
    </svg>
  );
}

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <BrandMark />
      <span className="text-[15px] font-semibold tracking-tight">
        {SITE.company}
        <span className="ml-1 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-fg-muted">
          POS
        </span>
      </span>
    </span>
  );
}
