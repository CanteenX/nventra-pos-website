import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";

interface CtaBandProps {
  title?: string;
  body?: string;
}

export function CtaBand({
  title = "Run your restaurant on a system you own.",
  body = "Install it on a spare machine this afternoon and take your first order tonight. If you get stuck, write to us.",
}: CtaBandProps) {
  return (
    <section aria-labelledby="cta-title" className="py-16 sm:py-24">
      <div className="container-x">
        <div className="scheme-dark relative overflow-hidden rounded-[2rem] p-8 sm:p-16">
          <div className="glow-mint pointer-events-none absolute -right-24 -top-24 size-[420px]" aria-hidden />
          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <p className="text-mono-tag mb-4 font-semibold text-mint-text">Get started //</p>
              <h2 id="cta-title" className="text-3xl leading-[1.05] sm:text-5xl">
                {title}
              </h2>
              <p className="mt-4 text-fg-muted">{body}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
              <ButtonLink href="/install/">
                Get started free <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
              <ButtonLink href="/contact/" variant="secondary">
                Talk to us
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
