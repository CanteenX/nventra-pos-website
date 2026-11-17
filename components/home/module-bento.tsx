import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Screenshot } from "@/components/ui/screenshot";
import { FEATURE_GROUPS, type FeatureGroup } from "@/lib/content/features";
import { cn } from "@/lib/cn";

/** Large tiles carry a screenshot; the rest are compact. Pattern: Magic UI Bento Grid (MIT). */
const LARGE = new Set(["pos-billing", "kitchen"]);

function Tile({ group }: { group: FeatureGroup }) {
  const large = LARGE.has(group.id);
  const Icon = group.icon;
  return (
    <Link
      href={`/features/#${group.id}`}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card p-5 transition-colors hover:border-line-strong hover:bg-card-hover sm:p-6",
        large && "md:col-span-2",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="inline-flex size-10 items-center justify-center rounded-xl bg-bg-subtle text-brand-text">
          <Icon className="size-5" aria-hidden />
        </span>
        <ArrowUpRight className="size-4 text-fg-muted transition group-hover:text-fg" aria-hidden />
      </div>
      <h3 className="mt-5 text-lg font-semibold tracking-tight">{group.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{group.summary}</p>
      {large && group.shot ? (
        <div className="mt-5 -mb-12 hidden sm:block">
          <Screenshot id={group.shot} sizes="(min-width: 1024px) 640px, 100vw" className="shadow-none" />
        </div>
      ) : (
        <p className="mt-auto pt-4 text-xs text-fg-muted">{group.items.length} capabilities</p>
      )}
    </Link>
  );
}

export function ModuleBento() {
  return (
    <div className="grid grid-flow-dense gap-4 md:grid-cols-3 lg:grid-cols-4">
      {FEATURE_GROUPS.map((g) => (
        <Reveal key={g.id} className={cn(LARGE.has(g.id) && "md:col-span-2 md:row-span-2")}>
          <Tile group={g} />
        </Reveal>
      ))}
    </div>
  );
}
