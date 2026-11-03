import { Mail } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { CopyButton } from "@/components/ui/copy-button";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact",
  description: `Contact the Nventra POS team at ${SITE.email} for installation help, set-up questions or access to the source code.`,
  path: "/contact/",
});

const TOPICS = [
  "Help installing Nventra POS on your machine",
  "Questions about features, hardware or printers",
  "Access to the source code",
  "Reporting a bug or a security issue",
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to a person."
        lead="We answer by email. Tell us about your restaurant and what you need, and we will reply as soon as we can."
      />
      <section aria-label="Email address" className="container-x py-14 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-line bg-card p-6 sm:p-10">
            <span className="inline-flex size-12 items-center justify-center rounded-full bg-mint text-mint-fg">
              <Mail className="size-5" aria-hidden />
            </span>
            <p className="mt-6 text-sm text-fg-muted">Email us at</p>
            <p className="mt-1 select-all break-all text-2xl font-semibold tracking-tight sm:text-4xl">{SITE.email}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <CopyButton value={SITE.email} label="Copy email address" className="min-h-11 px-5 text-sm" />
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex min-h-11 items-center rounded-full bg-mint px-5 text-sm font-semibold text-mint-fg hover:brightness-105"
              >
                Open in your mail app
              </a>
            </div>
            <p className="mt-6 text-sm text-fg-muted">
              There is no contact form on this site, so nothing you type here is collected.
            </p>
          </div>
          <div className="rounded-3xl border border-line bg-bg-subtle p-6 sm:p-10">
            <h2 className="text-xl font-semibold tracking-tight">Good reasons to write</h2>
            <ul className="mt-5 space-y-3 text-[15px]">
              {TOPICS.map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-mint-text" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-fg-muted">{SITE.sourceNote}.</p>
          </div>
        </div>
      </section>
    </>
  );
}
