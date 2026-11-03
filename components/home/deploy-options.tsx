import { Check } from "lucide-react";
import { DEPLOY_OPTIONS } from "@/lib/content/install";
import { cn } from "@/lib/cn";

export function DeployOptions() {
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {DEPLOY_OPTIONS.map((opt, i) => (
        <li
          key={opt.title}
          className={cn(
            "rounded-2xl border bg-card p-6",
            i === 0 ? "border-mint-text/60 ring-1 ring-mint-text/30" : "border-line",
          )}
        >
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-semibold tracking-tight">{opt.title}</h3>
            {opt.badge ? (
              <span className="rounded-full bg-mint px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-mint-fg">
                {opt.badge}
              </span>
            ) : null}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-fg-muted">{opt.body}</p>
          <ul className="mt-5 space-y-2 text-sm">
            {opt.points.map((p) => (
              <li key={p} className="flex gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-mint-text" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
