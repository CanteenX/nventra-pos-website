import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "default" | "subtle" | "dark";

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  /** "dark" renders a large rounded dark container inset from the page edges. */
  tone?: Tone;
  labelledBy?: string;
}

export function Section({ id, className, children, tone = "default", labelledBy }: SectionProps) {
  if (tone === "dark") {
    return (
      <section id={id} aria-labelledby={labelledBy} className="px-2 py-4 sm:px-4 sm:py-6">
        <div
          className={cn(
            "scheme-dark relative mx-auto max-w-[96rem] overflow-hidden rounded-[1.75rem] ring-1 ring-inset ring-line py-20 sm:rounded-[2rem] sm:py-28",
            className,
          )}
        >
          <div className="glow-brand pointer-events-none absolute -top-48 right-[-10%] h-[480px] w-[720px]" aria-hidden />
          <div className="container-x relative">{children}</div>
        </div>
      </section>
    );
  }
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("py-20 sm:py-28", tone === "subtle" && "border-y border-line bg-bg-subtle", className)}
    >
      <div className="container-x">{children}</div>
    </section>
  );
}

interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
}

/** Eyebrow tag + heading + lead line: the portfolio's "Label //" heading rhythm. */
export function SectionHeading({ id, eyebrow, title, lead, align = "left", as = "h2", className }: SectionHeadingProps) {
  const Tag = as;
  return (
    <div className={cn("mb-12 max-w-3xl sm:mb-16", align === "center" && "mx-auto text-center", className)}>
      <p className="text-mono-tag mb-3 font-semibold text-brand-text">
        {eyebrow} {"//"}
      </p>
      <Tag
        id={id}
        className={
          as === "h1"
            ? "text-[2.6rem] leading-[1] sm:text-7xl"
            : "text-[2.25rem] leading-[1.02] sm:text-5xl lg:text-[3.75rem]"
        }
      >
        {title}
      </Tag>
      {lead ? <p className="mt-5 text-base leading-relaxed text-fg-muted sm:text-lg">{lead}</p> : null}
    </div>
  );
}
