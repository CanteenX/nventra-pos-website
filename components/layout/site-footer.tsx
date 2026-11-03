import Link from "next/link";
import { Logo } from "@/components/brand/brand-mark";
import { FOOTER_COLUMNS } from "@/lib/content/nav";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-bg-subtle">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-fg-muted">
            A self-hosted, offline-first restaurant POS. Billing, kitchen, stock, staff and reports on a server
            you own, with no per-terminal subscription.
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="mt-4 inline-block text-sm font-medium text-fg underline-offset-4 hover:underline"
          >
            {SITE.email}
          </a>
          <p className="mt-2 text-xs text-fg-muted">{SITE.sourceNote}.</p>
        </div>
        {FOOTER_COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="text-mono-tag mb-4 font-semibold text-fg-muted">/{col.title.toLowerCase()}</p>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith("http") || link.href.startsWith("mailto:") ? (
                    <a href={link.href} className="break-words text-sm text-fg/85 hover:text-mint-text">
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className="text-sm text-fg/85 hover:text-mint-text">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-fg-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.company}. {SITE.name} is free software under the {SITE.license}.
          </p>
          <p>
            <a href={SITE.upstream.href} className="underline-offset-4 hover:underline" rel="noopener">
              {SITE.upstream.label}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
