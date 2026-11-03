import type { ReactNode } from "react";
import { PageHero } from "@/components/layout/page-hero";

interface LegalPageProps {
  title: string;
  updated: string;
  children: ReactNode;
}

export function LegalPage({ title, updated, children }: LegalPageProps) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} lead={`Last updated ${updated}.`} />
      <div className="container-x py-12 sm:py-16">
        <div
          role="note"
          className="mb-10 max-w-3xl rounded-2xl border border-dashed border-primary/60 bg-bg-subtle p-5 text-sm leading-relaxed"
        >
          <strong>Draft, not legal advice.</strong> This page is a plain-language placeholder. TODO: have a lawyer
          review it before the site goes public.
        </div>
        <div className="max-w-3xl space-y-8 text-[15px] leading-relaxed [&_h2]:mb-3 [&_h2]:text-2xl [&_li]:ml-5 [&_li]:list-disc [&_p]:text-fg-muted [&_ul]:space-y-1.5 [&_ul]:text-fg-muted">
          {children}
        </div>
      </div>
    </>
  );
}
