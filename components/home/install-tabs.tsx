"use client";

import { Tabs } from "radix-ui";
import { CodeBlock } from "@/components/ui/code-block";
import { COMING_SOON, INSTALL_OPTIONS } from "@/lib/content/install";
import { SITE } from "@/lib/site";

/** Install chooser on Radix Tabs (arrow-key navigation built in). */
export function InstallTabs() {
  return (
    <div className="rounded-3xl border border-line bg-card p-4 sm:p-8">
      <Tabs.Root defaultValue={INSTALL_OPTIONS[0].id}>
        <Tabs.List
          aria-label="Choose an install method"
          className="flex gap-1 overflow-x-auto rounded-full border border-line bg-bg-subtle p-1"
        >
          {INSTALL_OPTIONS.map((opt) => (
            <Tabs.Trigger
              key={opt.id}
              value={opt.id}
              className="min-h-10 flex-1 whitespace-nowrap rounded-full px-4 text-sm font-medium text-fg-muted transition data-[state=active]:bg-card data-[state=active]:text-fg data-[state=active]:shadow-sm"
            >
              {opt.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {INSTALL_OPTIONS.map((opt) => (
          <Tabs.Content key={opt.id} value={opt.id} className="mt-6 space-y-5">
            <p className="text-[15px] leading-relaxed text-fg-muted">{opt.intro}</p>
            <ol className="space-y-5">
              {opt.steps.map((step, i) => (
                <li key={step.text} className="space-y-2.5">
                  <p className="flex gap-3 text-[15px] font-medium">
                    <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-brand-fg">
                      {i + 1}
                    </span>
                    {step.text}
                  </p>
                  {step.code ? <CodeBlock code={step.code} /> : null}
                </li>
              ))}
            </ol>
            {opt.note ? <p className="text-sm text-fg-muted">{opt.note}</p> : null}
          </Tabs.Content>
        ))}
      </Tabs.Root>
      <div className="mt-6 flex flex-col gap-2 border-t border-line pt-5 text-sm text-fg-muted sm:flex-row sm:justify-between">
        <p>{COMING_SOON}</p>
        <p>{SITE.sourceNote}.</p>
      </div>
    </div>
  );
}
