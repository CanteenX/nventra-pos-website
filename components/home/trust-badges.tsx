import { TRUST_BADGES } from "@/lib/content/home";

export function TrustBadges() {
  return (
    <section aria-label="Why restaurants choose Nventra POS" className="border-y border-line bg-bg-subtle">
      <ul className="container-x grid grid-cols-1 gap-px py-2 sm:grid-cols-2 lg:grid-cols-6">
        {TRUST_BADGES.map(({ label, body, icon: Icon }) => (
          <li key={label} className="flex gap-3 px-2 py-5 lg:flex-col lg:gap-2">
            <Icon className="size-5 shrink-0 text-brand-text" aria-hidden />
            <div>
              <p className="text-sm font-semibold">{label}</p>
              <p className="mt-0.5 text-[13px] leading-snug text-fg-muted">{body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
