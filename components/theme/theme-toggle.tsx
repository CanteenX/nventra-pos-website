"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/cn";

const KEY = "nventra-theme";

function currentTheme(): "light" | "dark" {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

interface ThemeToggleProps {
  className?: string;
}

/** Icons for both states are rendered and swapped with CSS, so SSR and client markup match. */
export function ThemeToggle({ className }: ThemeToggleProps) {
  function toggle() {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(KEY, next);
    } catch {
      // Storage can be unavailable (private mode); the choice still applies for this page.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark theme"
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full border border-line text-fg-muted transition-colors hover:text-fg hover:border-line-strong",
        className,
      )}
    >
      <Sun className="size-4 hidden dark:block" aria-hidden />
      <Moon className="size-4 block dark:hidden" aria-hidden />
    </button>
  );
}
