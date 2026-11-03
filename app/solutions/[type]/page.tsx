import Link from "next/link";
import { notFound } from "next/navigation";
import { Info } from "lucide-react";
import { CtaBand } from "@/components/home/cta-band";
import { PageHero } from "@/components/layout/page-hero";
import { ButtonLink } from "@/components/ui/button-link";
import { Screenshot } from "@/components/ui/screenshot";
import { SHOTS } from "@/lib/screenshots";
import { SOLUTIONS, getSolution } from "@/lib/content/solutions";
import { pageMetadata } from "@/lib/metadata";

interface Params {
  params: Promise<{ type: string }>;
}

export const dynamicParams = false;

export function generateStaticParams(): { type: string }[] {
  return SOLUTIONS.map((s) => ({ type: s.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { type } = await params;
  const s = getSolution(type);
  if (!s) return {};
  return pageMetadata({
    title: `Restaurant POS for ${s.name}`,
    description: `${s.headline}. ${s.intro}`,
    path: `/solutions/${s.slug}/`,
    image: SHOTS[s.shots[0]].src,
  });
}

export default async function SolutionPage({ params }: Params) {
  const { type } = await params;
  const s = getSolution(type);
  if (!s) notFound();
  const others = SOLUTIONS.filter((o) => o.slug !== s.slug);

  return (
    <>
      <PageHero eyebrow={`Solutions · ${s.name}`} title={s.headline} lead={s.intro}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/install/">Get started free</ButtonLink>
          <ButtonLink href="/how-to-use/" variant="secondary">
            See how it works
          </ButtonLink>
        </div>
      </PageHero>

      <section aria-labelledby="highlights" className="container-x py-14 sm:py-20">
        <h2 id="highlights" className="sr-only">
          Highlights for {s.name}
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {s.highlights.map((h) => (
            <li key={h.title} className="rounded-2xl border border-line bg-card p-6">
              <h3 className="text-base font-semibold tracking-tight">{h.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{h.body}</p>
            </li>
          ))}
        </ul>
        {s.honestNote ? (
          <p className="mt-6 flex gap-2 text-sm text-fg-muted">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
            {s.honestNote}
          </p>
        ) : null}
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {s.shots.map((id) => (
            <Screenshot key={id} id={id} caption />
          ))}
        </div>
      </section>

      <section aria-labelledby="other-solutions" className="border-t border-line bg-bg-subtle py-14">
        <div className="container-x">
          <h2 id="other-solutions" className="text-2xl">
            Other restaurant types
          </h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/solutions/${o.slug}/`}
                  className="inline-flex min-h-10 items-center rounded-full border border-line bg-card px-4 text-sm font-medium hover:border-line-strong"
                >
                  {o.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
