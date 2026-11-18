import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductVisual, hasCapture } from "@/components/ui/product-visual";
import { SOLUTIONS } from "@/lib/content/solutions";

export function SolutionCards() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {SOLUTIONS.map(({ slug, name, short, icon: Icon, highlights, shots }) => (
        <li key={slug}>
          <Link
            href={`/solutions/${slug}/`}
            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-card transition-colors hover:border-line-strong hover:bg-card-hover"
          >
            <div className="relative border-b border-line bg-bg-subtle px-5 pt-5">
              <div className="overflow-hidden rounded-t-xl border border-b-0 border-line shadow-lg shadow-black/5 transition-transform duration-300 group-hover:-translate-y-1">
                <ProductVisual id={shots[0]} sizes="(min-width: 1024px) 380px, 90vw" />
              </div>
              {hasCapture(shots[0]) ? null : (
              <span className="absolute right-3 top-3 rounded-full bg-card/90 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-fg-muted">
                Sample data
              </span>
              )}
            </div>
            <div className="flex flex-1 flex-col p-6">
            <span className="-mt-[3rem] relative inline-flex size-11 items-center justify-center rounded-full bg-brand text-brand-fg ring-4 ring-card">
              <Icon className="size-5" aria-hidden />
            </span>
            <h3 className="mt-5 text-lg font-semibold tracking-tight">{name}</h3>
            <p className="mt-1 text-sm text-fg-muted">{short}</p>
            <ul className="mt-4 space-y-1.5 text-sm">
              {highlights.slice(0, 3).map((h) => (
                <li key={h.title} className="flex gap-2">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-brand-text" aria-hidden />
                  {h.title}
                </li>
              ))}
            </ul>
            <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-brand-text">
              Explore <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
