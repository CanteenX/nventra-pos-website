import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SOLUTIONS } from "@/lib/content/solutions";

export function SolutionCards() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {SOLUTIONS.map(({ slug, name, short, icon: Icon, highlights }) => (
        <li key={slug}>
          <Link
            href={`/solutions/${slug}/`}
            className="group flex h-full flex-col rounded-2xl border border-line bg-card p-6 transition-colors hover:border-line-strong hover:bg-card-hover"
          >
            <span className="inline-flex size-11 items-center justify-center rounded-full bg-mint text-mint-fg">
              <Icon className="size-5" aria-hidden />
            </span>
            <h3 className="mt-5 text-lg font-semibold tracking-tight">{name}</h3>
            <p className="mt-1 text-sm text-fg-muted">{short}</p>
            <ul className="mt-4 space-y-1.5 text-sm">
              {highlights.slice(0, 3).map((h) => (
                <li key={h.title} className="flex gap-2">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-mint-text" aria-hidden />
                  {h.title}
                </li>
              ))}
            </ul>
            <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-mint-text">
              Explore <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
