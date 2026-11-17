"use client";

import { ArrowUp, Mail, MessageCircle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { SITE } from "@/lib/site";

const SHOW_AFTER_PX = 900;

/**
 * Bottom-right floating controls: a "Talk to us" pill that opens the email
 * address (mailto + copy), and a back-to-top button once the page is scrolled.
 * Both sit above the iOS home indicator via env(safe-area-inset-*).
 */
export function FloatingActions() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onDown = (e: PointerEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  function toTop() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <div
      ref={panelRef}
      className="fixed z-40 flex flex-col items-end gap-3"
      style={{
        right: "max(1rem, env(safe-area-inset-right))",
        bottom: "max(1rem, env(safe-area-inset-bottom))",
      }}
    >
      {open ? (
        <div
          id="contact-panel"
          role="dialog"
          aria-label="Contact Nventra"
          className="w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-line bg-card p-4 shadow-2xl shadow-black/15"
        >
          <p className="text-sm font-semibold">Talk to a person</p>
          <p className="mt-1 text-sm text-fg-muted">We answer by email. Tell us about your restaurant.</p>
          <p className="mt-3 select-all break-all text-[15px] font-medium">{SITE.email}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-mint px-3 text-xs font-semibold text-mint-fg"
            >
              <Mail className="size-3.5" aria-hidden /> Email us
            </a>
            <CopyButton value={SITE.email} label="Copy address" />
          </div>
        </div>
      ) : null}
      <div className="flex items-center gap-2">
        {scrolled ? (
          <button
            type="button"
            onClick={toTop}
            aria-label="Back to top"
            className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-card text-fg shadow-lg shadow-black/10 transition hover:bg-card-hover"
          >
            <ArrowUp className="size-4" aria-hidden />
          </button>
        ) : null}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="contact-panel"
          aria-label="Talk to us"
          className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full bg-fg px-3 text-sm font-semibold text-bg shadow-lg shadow-black/20 transition hover:opacity-90 sm:px-4"
        >
          {open ? <X className="size-4" aria-hidden /> : <MessageCircle className="size-4" aria-hidden />}
          <span className="hidden sm:inline">Talk to us</span>
        </button>
      </div>
    </div>
  );
}
