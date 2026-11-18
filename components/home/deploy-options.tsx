import { Check, Cloud, Globe, Monitor, Server, ShieldCheck, Smartphone, Store, Tablet } from "lucide-react";
import type { ReactNode } from "react";
import { FlowScene, HubScene } from "@/components/ui/spot-scene";
import { DEPLOY_OPTIONS } from "@/lib/content/install";
import { cn } from "@/lib/cn";

const ART: ReactNode[] = [
  <HubScene key="lan" center={Server} around={[Monitor, Tablet, Smartphone]} className="lg:aspect-auto lg:h-full lg:min-h-[18rem]" />,
  <HubScene key="vps" center={Cloud} around={[Store, Store, Store]} />,
  <FlowScene key="tunnel" steps={[Server, ShieldCheck, Globe]} />,
];

/** Hosting options as a bento: the recommended option large, the others stacked beside it. */
export function DeployOptions() {
  return (
    <ul className="grid gap-4 lg:grid-cols-3">
      {DEPLOY_OPTIONS.map((opt, i) => (
        <li
          key={opt.title}
          className={cn(
            "flex flex-col rounded-3xl border bg-card p-4 sm:p-5",
            i === 0 ? "border-brand-text/50 ring-1 ring-brand-text/25 lg:col-span-2 lg:row-span-2" : "border-line",
          )}
        >
          <div className={i === 0 ? "lg:flex-1" : undefined}>{ART[i]}</div>
          <div className={cn("px-1 pb-1", i === 0 ? "mt-6" : "mt-5")}>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className={cn("font-semibold tracking-tight", i === 0 ? "text-2xl sm:text-3xl" : "text-lg")}>
                {opt.title}
              </h3>
              {opt.badge ? (
                <span className="rounded-full bg-brand px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-fg">
                  {opt.badge}
                </span>
              ) : null}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">{opt.body}</p>
            <ul className="mt-4 space-y-1.5 text-sm">
              {opt.points.map((p) => (
                <li key={p} className="flex gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand-text" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}
