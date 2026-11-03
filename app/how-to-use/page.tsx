import { CtaBand } from "@/components/home/cta-band";
import { PageHero } from "@/components/layout/page-hero";
import { Screenshot } from "@/components/ui/screenshot";
import { GUIDE_STEPS, MORE_TOOLS } from "@/lib/content/guide";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "How to use",
  description:
    "Six steps from sign-up to your first UPI-paid order in Nventra POS: create the restaurant, set tax, UPI and staff, add the menu and floor, take an order, run the kitchen and payment, then stock, reports and backups.",
  path: "/how-to-use/",
  image: "/screenshots/pos-cart-light.webp",
});

export default function HowToUsePage() {
  return (
    <>
      <PageHero
        eyebrow="How to use"
        title="From sign-up to your first paid order."
        lead="Six steps, about ten minutes once the app is installed. Screenshots show the real app with demo data."
      >
        <nav aria-label="Steps">
          <ol className="flex flex-wrap gap-2">
            {GUIDE_STEPS.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="inline-flex min-h-9 items-center gap-2 rounded-full border border-line bg-card px-3.5 text-sm hover:border-line-strong"
                >
                  <span className="font-mono text-xs text-mint-text">{i + 1}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </PageHero>

      <ol className="container-x divide-y divide-line">
        {GUIDE_STEPS.map((step, i) => (
          <li key={step.id} id={step.id} className="scroll-mt-24 py-14 sm:py-20">
            <article aria-labelledby={`${step.id}-title`} className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-mint font-mono text-lg font-bold text-mint-fg">
                  {i + 1}
                </span>
                <h2 id={`${step.id}-title`} className="mt-5 text-3xl sm:text-4xl">
                  {step.title}
                </h2>
                <p className="mt-3 text-fg-muted">{step.intro}</p>
                <ul className="mt-6 space-y-3">
                  {step.tasks.map((task) => (
                    <li key={task} className="flex gap-3 text-[15px] leading-relaxed">
                      <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-mint-text" aria-hidden />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {step.shots.map((id) => (
                  <Screenshot key={id} id={id} caption sizes="(min-width: 1280px) 30vw, (min-width: 640px) 50vw, 100vw" />
                ))}
              </div>
            </article>
          </li>
        ))}
      </ol>

      <section aria-labelledby="more-tools" className="border-t border-line bg-bg-subtle py-16 sm:py-24">
        <div className="container-x">
          <p className="text-mono-tag mb-4 font-semibold text-mint-text">And more //</p>
          <h2 id="more-tools" className="text-3xl sm:text-5xl">
            More tools in the sidebar.
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MORE_TOOLS.map((t) => (
              <li key={t.title} className="rounded-2xl border border-line bg-card p-5">
                <h3 className="text-base font-semibold tracking-tight">{t.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{t.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
