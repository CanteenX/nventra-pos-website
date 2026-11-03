import type { ReactNode } from "react";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}

export function PageHero({ eyebrow, title, lead, children }: PageHeroProps) {
  return (
    <section aria-labelledby="page-title" className="relative overflow-hidden border-b border-line">
      <div className="glow-mint pointer-events-none absolute -top-48 left-1/4 h-[420px] w-[720px]" aria-hidden />
      <div className="container-x relative py-14 sm:py-20">
        <p className="text-mono-tag mb-4 font-semibold text-mint-text">{eyebrow} {"//"}</p>
        <h1 id="page-title" className="max-w-4xl text-4xl leading-[1.03] sm:text-6xl">
          {title}
        </h1>
        {lead ? <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">{lead}</p> : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
