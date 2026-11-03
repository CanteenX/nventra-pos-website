import { WORKS_WITH, type WorksWith as Item } from "@/lib/content/home";
import { cn } from "@/lib/cn";

function Chip({ item }: { item: Item }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium",
        item.soon ? "border-dashed border-line-strong text-fg-muted" : "border-line bg-card",
      )}
    >
      {item.label}
      {item.soon ? (
        <span className="rounded-full bg-bg-subtle px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
          Coming soon
        </span>
      ) : null}
    </span>
  );
}

/**
 * "Works with" strip: text badges only, no third-party logos. A CSS marquee
 * (pattern from Magic UI's Marquee, MIT) that pauses on hover and stops
 * under prefers-reduced-motion. The list is real once; the duplicate copy
 * that makes the loop seamless is hidden from assistive tech.
 */
export function WorksWithStrip() {
  return (
    <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className="flex w-max gap-[var(--gap)] animate-marquee group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center"
        style={{ ["--gap" as string]: "0.75rem", ["--duration" as string]: "45s" }}
      >
        <ul className="flex shrink-0 gap-[var(--gap)] motion-reduce:flex-wrap motion-reduce:justify-center">
          {WORKS_WITH.map((item) => (
            <li key={item.label}>
              <Chip item={item} />
            </li>
          ))}
        </ul>
        <ul className="flex shrink-0 gap-[var(--gap)] motion-reduce:hidden" aria-hidden>
          {WORKS_WITH.map((item) => (
            <li key={item.label}>
              <Chip item={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
