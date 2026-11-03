import type { ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";
import { LaptopFrame, PhoneFrame } from "@/components/fragments/devices";
import { KotTicket } from "@/components/fragments/kitchen";
import { GstSummary, UpiCard } from "@/components/fragments/payments";
import { GuestQrScreen } from "@/components/fragments/screens";
import { ButtonLink } from "@/components/ui/button-link";
import { ProductVisual } from "@/components/ui/product-visual";

const POINTS = ["Runs on your own server", "Works with the internet down", "No per-terminal subscription"];

/** Floating card wrapper: light island, gentle float, hidden on small screens. */
function Floating({ className, delay, children }: { className: string; delay: string; children: ReactNode }) {
  return (
    <div className={`scheme-light absolute z-20 ${className}`} aria-hidden>
      <div className="animate-float" style={{ animationDelay: delay }}>
        {children}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="scheme-dark relative overflow-hidden">
      <div className="glow-mint pointer-events-none absolute -top-40 left-1/2 h-[620px] w-[1000px] -translate-x-1/2" aria-hidden />
      <div className="container-x relative pb-12 pt-16 text-center sm:pt-24">
        <p className="text-mono-tag inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 font-semibold text-fg-muted">
          <span className="size-1.5 rounded-full bg-mint" aria-hidden />
          Open source · AGPL-3.0 · Self-hosted
        </p>
        <h1 id="hero-title" className="mx-auto mt-6 max-w-4xl text-[2.6rem] leading-[1] sm:text-7xl lg:text-[5.25rem]">
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

      <div className="container-x relative pb-16 sm:pb-24">
        <figure className="relative mx-auto max-w-6xl sm:pr-24 md:pr-32 lg:pl-10 lg:pr-44">
          <div className="scheme-light relative z-10">
            <LaptopFrame>
              <ProductVisual id="pos" priority sizes="(min-width: 1280px) 900px, 100vw" />
            </LaptopFrame>
          </div>

          <div className="scheme-light absolute -bottom-8 right-0 z-30 hidden w-[150px] text-[8.8px] sm:block md:w-[180px] md:text-[10.6px] lg:right-4 lg:w-[215px] lg:text-[12.6px]">
            <div className="animate-float" style={{ animationDelay: "-2s" }}>
              <PhoneFrame>
                <div role="img" aria-label="Guest QR ordering on a phone: the Spice Route menu for table T7 with two Paneer Tikka in the basket. Sample data." className="h-full">
                  <div aria-hidden className="h-full">
                    <GuestQrScreen />
                  </div>
                </div>
              </PhoneFrame>
            </div>
          </div>

          <Floating className="-left-2 top-[10%] hidden w-[17em] text-[11px] lg:block xl:-left-6 xl:text-[12px]" delay="0s">
            <KotTicket className="shadow-2xl shadow-black/40" />
          </Floating>
          <Floating className="right-[22%] -top-6 hidden w-[19em] text-[11px] md:block lg:text-[12px]" delay="-4s">
            <UpiCard paid className="shadow-2xl shadow-black/40" />
          </Floating>
          <Floating className="-left-4 bottom-[4%] hidden w-[24em] text-[10px] xl:block xl:-left-10 xl:text-[11px]" delay="-1s">
            <GstSummary compact className="shadow-2xl shadow-black/40" />
          </Floating>

          <figcaption className="mt-10 text-center text-xs text-fg-muted">
            Product illustration with sample data: point of sale, guest QR ordering, a kitchen ticket, UPI payment
            and a GST summary.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
