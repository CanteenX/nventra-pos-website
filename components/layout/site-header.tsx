"use client";

import Link from "next/link";
import { NavigationMenu as NM } from "radix-ui";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/brand-mark";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { ButtonLink } from "@/components/ui/button-link";
import { PRODUCT_LINKS, RESOURCE_LINKS, SOLUTION_LINKS, type NavLink } from "@/lib/content/nav";
import { cn } from "@/lib/cn";

const MENUS: { label: string; links: NavLink[]; cols: string; footer?: NavLink }[] = [
  {
    label: "Product",
    links: PRODUCT_LINKS,
    cols: "md:w-[720px] md:grid-cols-3",
    footer: { label: "See every feature", href: "/features/" },
  },
  { label: "Solutions", links: SOLUTION_LINKS, cols: "md:w-[560px] md:grid-cols-2" },
  { label: "Resources", links: RESOURCE_LINKS, cols: "md:w-[480px] md:grid-cols-2" },
];

function MenuLink({ link }: { link: NavLink }) {
  return (
    <NM.Link asChild>
      <Link
        href={link.href}
        className="block rounded-xl p-3 transition-colors hover:bg-card-hover focus-visible:bg-card-hover"
      >
        <span className="block text-sm font-medium text-fg">{link.label}</span>
        {link.description ? (
          <span className="mt-0.5 block text-[13px] leading-snug text-fg-muted">{link.description}</span>
        ) : null}
      </Link>
    </NM.Link>
  );
}

function DesktopNav() {
  return (
    <NM.Root className="relative hidden lg:block" aria-label="Main">
      <NM.List className="flex items-center gap-1">
        {MENUS.map((menu) => (
          <NM.Item key={menu.label}>
            <NM.Trigger className="group inline-flex h-10 items-center gap-1 rounded-full px-4 text-sm font-medium text-fg-muted transition-colors hover:text-fg data-[state=open]:text-fg">
              {menu.label}
              <ChevronDown
                className="size-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180"
                aria-hidden
              />
            </NM.Trigger>
            <NM.Content className="absolute left-0 top-0 w-full md:w-auto">
              <div className={cn("grid gap-1 p-3", menu.cols)}>
                {menu.links.map((link) => (
                  <MenuLink key={link.href} link={link} />
                ))}
              </div>
              {menu.footer ? (
                <div className="border-t border-line px-6 py-3">
                  <NM.Link asChild>
                    <Link href={menu.footer.href} className="text-sm font-semibold text-mint-text hover:underline">
                      {menu.footer.label} →
                    </Link>
                  </NM.Link>
                </div>
              ) : null}
            </NM.Content>
          </NM.Item>
        ))}
        <NM.Item>
          <NM.Link asChild>
            <Link
              href="/contact/"
              className="inline-flex h-10 items-center rounded-full px-4 text-sm font-medium text-fg-muted transition-colors hover:text-fg"
            >
              Contact
            </Link>
          </NM.Link>
        </NM.Item>
      </NM.List>
      <div className="absolute left-0 top-full flex justify-center pt-3">
        <NM.Viewport className="relative h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)] overflow-hidden rounded-2xl border border-line bg-card shadow-2xl shadow-black/10 transition-[width,height] duration-200" />
      </div>
    </NM.Root>
  );
}

function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <nav
      id="mobile-nav"
      aria-label="Main"
      className="absolute inset-x-0 top-full max-h-[calc(100dvh-5rem)] overflow-y-auto border-b border-line bg-bg px-4 pb-8 pt-2 shadow-xl lg:hidden"
    >
      {MENUS.map((menu) => (
        <div key={menu.label} className="border-b border-line py-4">
          <p className="text-mono-tag mb-2 text-fg-muted">{menu.label}</p>
          <ul className="grid gap-0.5 sm:grid-cols-2">
            {menu.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="flex min-h-11 items-center rounded-lg px-2 text-[15px] font-medium hover:bg-card-hover"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="flex flex-col gap-3 pt-5">
        <Link href="/contact/" onClick={onClose} className="flex min-h-11 items-center px-2 text-[15px] font-medium">
          Contact
        </Link>
        <ButtonLink href="/install/">Get started free</ButtonLink>
      </div>
    </nav>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className="sticky top-0 z-50 border-b border-line backdrop-blur-xl"
      style={{ backgroundColor: "var(--header-bg)" }}
    >
      <div className="container-x relative flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="Nventra POS home" className="inline-flex min-h-10 items-center rounded-lg">
          <Logo />
        </Link>
        <DesktopNav />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ButtonLink href="/install/" className="hidden sm:inline-flex">
            Get started free
          </ButtonLink>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-line lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>
      <MobileNav open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
