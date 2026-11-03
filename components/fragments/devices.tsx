import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** A phone outline in CSS. Size it with width; the screen keeps a 9:19 ratio. */
export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-[2.4em] bg-neutral-900 p-[0.5em] shadow-2xl shadow-black/40 ring-1 ring-white/10", className)}>
      <div className="relative aspect-[9/19] overflow-hidden rounded-[1.95em] bg-bg">
        <span className="absolute left-1/2 top-[0.6em] z-10 h-[1.1em] w-[4.5em] -translate-x-1/2 rounded-full bg-neutral-900" />
        {children}
      </div>
    </div>
  );
}

/** A laptop outline in CSS: screen with bezel and a hinge/base bar. */
export function LaptopFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div className="rounded-t-[1.1rem] border border-white/10 bg-neutral-900 p-[1.2%] pb-[1.6%] shadow-2xl shadow-black/50">
        <div className="overflow-hidden rounded-[0.4rem] bg-bg">{children}</div>
      </div>
      <div className="relative mx-[-6%] h-3 rounded-b-[1.2rem] bg-gradient-to-b from-neutral-500 to-neutral-700 sm:h-4">
        <span className="absolute left-1/2 top-0 h-1.5 w-[14%] -translate-x-1/2 rounded-b-md bg-neutral-800" />
      </div>
    </div>
  );
}
