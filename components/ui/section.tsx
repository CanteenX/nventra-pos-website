import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  tone?: "default" | "subtle";
  labelledBy?: string;
}

export function Section({ id, className, children, tone = "default", labelledBy }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "py-16 sm:py-24",
        tone === "subtle" && "border-y border-line bg-bg-subtle",
        className,
      )}
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
}

/** Eyebrow tag + heading + lead line: the portfolio's "Label //" heading rhythm. */
export function SectionHeading({ id, eyebrow, title, lead, align = "left", as = "h2" }: SectionHeadingProps) {
  const Tag = as;
  return (
    <div className={cn("mb-10 max-w-3xl sm:mb-14", align === "center" && "mx-auto text-center")}>
      <p className="text-mono-tag mb-4 font-semibold text-mint-text">{eyebrow} {"//"}</p>
      <Tag
        id={id}
        className={as === "h1" ? "text-4xl leading-[1.02] sm:text-6xl" : "text-3xl leading-[1.05] sm:text-5xl"}
      >
        {title}
      </Tag>
      {lead ? <p className="mt-5 text-base leading-relaxed text-fg-muted sm:text-lg">{lead}</p> : null}
    </div>
  );
}
