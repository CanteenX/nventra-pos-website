import { ArrowRight, Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Screenshot } from "@/components/ui/screenshot";

const POINTS = ["Runs on your own server", "Works with the internet down", "No per-terminal subscription"];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="glow-mint pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2" aria-hidden />
      <div className="container-x relative pb-10 pt-14 text-center sm:pt-20">
        <p className="text-mono-tag inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 font-semibold text-fg-muted">
          <span className="size-1.5 rounded-full bg-mint" aria-hidden />
          Open source · AGPL-3.0 · Self-hosted
        </p>
        <h1 id="hero-title" className="mx-auto mt-6 max-w-4xl text-4xl leading-[1.02] sm:text-6xl lg:text-7xl">
          The restaurant POS that lives in <span className="text-mint-text">your</span> restaurant.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">
          Nventra POS is a self-hosted, offline-first point of sale and management system. Billing with UPI QR,
          tables, a kitchen display, inventory, staff and reports, all on one machine on your own network.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/install/" className="w-full sm:w-auto">
            Get started free <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
          <ButtonLink href="/how-to-use/" variant="secondary" className="w-full sm:w-auto">
            See how it works
          </ButtonLink>
        </div>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-fg-muted">
          {POINTS.map((p) => (
            <li key={p} className="inline-flex items-center gap-1.5">
              <Check className="size-4 text-mint-text" aria-hidden />
              {p}
            </li>
          ))}
        </ul>
      </div>
      <div className="container-x relative pb-16">
        <div className="mx-auto max-w-6xl">
          <Screenshot id="pos" priority sizes="(min-width: 1280px) 1152px, 100vw" />
        </div>
      </div>
    </section>
  );
}
