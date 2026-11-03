import { Check, Clock } from "lucide-react";
import { CtaBand } from "@/components/home/cta-band";
import { PageHero } from "@/components/layout/page-hero";
import { Screenshot } from "@/components/ui/screenshot";
import { FEATURE_GROUPS } from "@/lib/content/features";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/cn";

export const metadata = pageMetadata({
  title: "Features",
  description:
    "Every Nventra POS module: billing with UPI QR and GST, tables and reservations, kitchen display, menu, inventory, CRM, staff and payroll, accounting, delivery, QR ordering, reports, security and integrations.",
  path: "/features/",
});

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title="Everything a restaurant runs on, in one place."
        lead="This is the full list of what Nventra POS does today. Items marked 'on the roadmap' are planned and not available yet."
      >
        <nav aria-label="Feature groups">
          <ul className="flex flex-wrap gap-2">
            {FEATURE_GROUPS.map((g) => (
              <li key={g.id}>
                <a
                  href={`#${g.id}`}
                  className="inline-flex min-h-9 items-center rounded-full border border-line bg-card px-3.5 text-sm hover:border-line-strong"
                >
                  {g.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <div className="container-x divide-y divide-line">
        {FEATURE_GROUPS.map((g, i) => {
          const Icon = g.icon;
          return (
            <section key={g.id} id={g.id} aria-labelledby={`${g.id}-title`} className="py-14 sm:py-20">
              <div className={cn("grid gap-10", g.shot && "lg:grid-cols-2 lg:items-center")}>
                <div className={cn(g.shot && i % 2 === 1 && "lg:order-2")}>
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-bg-subtle text-mint-text">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h2 id={`${g.id}-title`} className="mt-5 text-3xl sm:text-4xl">
                    {g.title}
                  </h2>
                  <p className="mt-3 max-w-xl text-fg-muted">{g.summary}</p>
                  <ul className={cn("mt-6 grid gap-2.5", !g.shot && "sm:grid-cols-2 lg:grid-cols-3")}>
                    {g.items.map((item) => (
                      <li key={item} className="flex gap-2.5 text-[15px]">
                        <Check className="mt-0.5 size-4 shrink-0 text-mint-text" aria-hidden />
                        {item}
                      </li>
                    ))}
                    {g.soon?.map((item) => (
                      <li key={item} className="flex gap-2.5 text-[15px] text-fg-muted">
                        <Clock className="mt-0.5 size-4 shrink-0" aria-hidden />
                        <span>
                          {item} <span className="text-xs font-semibold uppercase tracking-wider">(on the roadmap)</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                {g.shot ? <Screenshot id={g.shot} caption /> : null}
              </div>
            </section>
          );
        })}
      </div>

      <CtaBand />
    </>
  );
}
