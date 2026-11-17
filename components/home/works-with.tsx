import { WORKS_WITH, type WorksWith as Item } from "@/lib/content/home";
import { cn } from "@/lib/cn";

function Chip({ item }: { item: Item }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-2.5 rounded-2xl border px-5 py-3 text-[15px] font-medium",
        item.soon ? "border-dashed border-line-strong bg-bg text-fg-muted" : "border-line bg-card shadow-sm",
      )}
    >
      <span className={cn("size-2 rounded-full", item.soon ? "bg-held" : "bg-ok")} aria-hidden />
      {item.label}
      {item.soon ? (
        <span className="rounded-full bg-held/15 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-fg">
          Coming soon
        </span>
      ) : null}
    </span>
  );
}

function Row({ items, reverse = false }: { items: Item[]; reverse?: boolean }) {
  return (
    <div
      className={cn(
        "flex w-max gap-[var(--gap)] group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center",
        reverse ? "animate-marquee-reverse" : "animate-marquee",
      )}
      style={{ ["--gap" as string]: "0.75rem", ["--duration" as string]: "50s" }}
    >
      <ul className="flex shrink-0 gap-[var(--gap)] motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:justify-center">
        {items.map((item) => (
          <li key={item.label}>
            <Chip item={item} />
          </li>
        ))}
      </ul>
      <ul className="flex shrink-0 gap-[var(--gap)] motion-reduce:hidden" aria-hidden>
        {items.map((item) => (
          <li key={item.label}>
            <Chip item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * "Works with" strip: text badges only, no third-party logos. Two CSS marquee
 * rows (pattern from Magic UI's Marquee, MIT) running in opposite directions;
 * they pause on hover and become a static wrapped list under reduced motion.
 * Items not built yet keep an explicit "Coming soon" label.
 */
export function WorksWithStrip() {
  const half = Math.ceil(WORKS_WITH.length / 2);
  return (
    <div className="group relative space-y-3 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] motion-reduce:[mask-image:none]">
      <Row items={WORKS_WITH.slice(0, half)} />
      <Row items={WORKS_WITH.slice(half)} reverse />
    </div>
  );
}
