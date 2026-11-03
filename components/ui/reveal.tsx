import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface RevealProps {
  children: ReactNode;
  className?: string;
}

/**
 * Fade-and-rise as the element scrolls into view, done with a CSS
 * scroll-driven animation (see .reveal in globals.css). Content is never
 * hidden in the server HTML, so crawlers, no-JS visitors and browsers
 * without scroll timelines just see it; reduced-motion users get no motion.
 */
export function Reveal({ children, className }: RevealProps) {
  return <div className={cn("reveal", className)}>{children}</div>;
}
