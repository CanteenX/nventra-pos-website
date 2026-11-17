import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Screenshot } from "@/components/ui/screenshot";
import { WHATS_NEW } from "@/lib/content/whats-new";

const SHOT_SIZES = "(min-width: 1024px) 600px, 100vw";

/** "What's new in v1.0": a dense grid of shipped features plus two new screens. */
export function WhatsNew() {
  return (
    <div>
      <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {WHATS_NEW.map(({ title, body, icon: Icon, href }) => (
          <li key={title} className="bg-card sm:last:col-span-2 lg:last:col-span-1">
            <Link
              href={href}
              className="group flex h-full min-h-11 gap-4 p-4 transition-colors hover:bg-card-hover sm:p-6"
            >
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-bg-subtle text-mint-text">
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-1.5 font-semibold tracking-tight">
                  {title}
                  <ArrowUpRight
                    className="size-3.5 shrink-0 text-fg-muted transition group-hover:text-fg"
                    aria-hidden
                  />
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-fg-muted">{body}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-6 grid gap-6 lg:grid-cols-2 [&>*]:min-w-0">
        <Reveal>
          <Screenshot id="onlineOrders" caption sizes={SHOT_SIZES} />
        </Reveal>
        <Reveal>
          <Screenshot id="emailTemplates" caption sizes={SHOT_SIZES} />
        </Reveal>
      </div>
    </div>
  );
}
