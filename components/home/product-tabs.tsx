"use client";

import Link from "next/link";
import { Tabs } from "radix-ui";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

export interface ProductTab {
  id: string;
  label: string;
  title: string;
  body: string;
  href: string;
  visual: ReactNode;
}

/**
 * Product tour under the hero: each tab swaps a heading, a line of copy, an
 * "Explore" link and the matching screen. Every panel is in the HTML (forceMount)
 * so the content is crawlable and switching tabs is instant.
 */
export function ProductTabs({ tabs }: { tabs: ProductTab[] }) {
  return (
    <Tabs.Root defaultValue={tabs[0].id}>
      <Tabs.List
        aria-label="Product areas"
        className="mx-auto flex w-full max-w-fit gap-1 overflow-x-auto rounded-full border border-line bg-bg-subtle p-1"
      >
        {tabs.map((t) => (
          <Tabs.Trigger
            key={t.id}
            value={t.id}
            className="min-h-10 shrink-0 whitespace-nowrap rounded-full px-4 text-sm font-medium text-fg-muted transition data-[state=active]:bg-fg data-[state=active]:text-bg sm:px-5"
          >
            {t.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {tabs.map((t) => (
        <Tabs.Content
          key={t.id}
          value={t.id}
          forceMount
          className="mt-10 grid gap-8 data-[state=inactive]:hidden lg:mt-14 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:gap-14 [&>*]:min-w-0"
        >
          <div>
            <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t.title}</h3>
            <p className="mt-4 text-base leading-relaxed text-fg-muted sm:text-lg">{t.body}</p>
            <Link
              href={t.href}
              className="mt-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brand-text hover:underline"
            >
              Explore {t.label} <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          {t.visual}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
