"use client";

import { Accordion as A } from "radix-ui";
import { Plus } from "lucide-react";

interface AccordionItem {
  q: string;
  a: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

/** FAQ accordion on Radix Accordion (keyboard support and ARIA come from the primitive). */
export function Accordion({ items }: AccordionProps) {
  return (
    <A.Root type="multiple" className="divide-y divide-line rounded-2xl border border-line bg-card">
      {items.map((item, i) => (
        <A.Item key={item.q} value={`item-${i}`}>
          <A.Header asChild>
            <h3 className="text-base font-medium tracking-tight">
              <A.Trigger className="group flex w-full items-center justify-between gap-6 px-5 py-5 text-left sm:px-6">
                <span>{item.q}</span>
                <Plus
                  className="size-4 shrink-0 text-fg-muted transition-transform duration-200 group-data-[state=open]:rotate-45"
                  aria-hidden
                />
              </A.Trigger>
            </h3>
          </A.Header>
          <A.Content className="px-5 pb-5 text-[15px] leading-relaxed text-fg-muted sm:px-6">{item.a}</A.Content>
        </A.Item>
      ))}
    </A.Root>
  );
}
