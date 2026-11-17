"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";

interface CopyButtonProps {
  value: string;
  label?: string;
  className?: string;
}

type CopyState = "idle" | "copied" | "failed";

export function CopyButton({ value, label = "Copy", className }: CopyButtonProps) {
  const [state, setState] = useState<CopyState>("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setState("copied");
    } catch {
      // Clipboard can be blocked (insecure context, permissions); the text itself stays selectable.
      setState("failed");
    }
    window.setTimeout(() => setState("idle"), 2000);
  }

  const text = state === "copied" ? "Copied" : state === "failed" ? "Select and copy" : label;

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "inline-flex min-h-10 items-center gap-1.5 rounded-full border border-line-strong bg-card px-3 text-xs font-semibold text-fg transition hover:bg-card-hover",
        className,
      )}
    >
      {state === "copied" ? <Check className="size-3.5" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
      <span aria-live="polite">{text}</span>
    </button>
  );
}
