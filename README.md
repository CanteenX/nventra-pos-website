# Nventra POS website

Marketing site for **Nventra POS**, the self-hosted, offline-first restaurant POS.
Next.js 16 (App Router, static export), React 19, Tailwind CSS 4, TypeScript strict.
It is a fully static site: `pnpm build` writes plain HTML/CSS/JS to `out/`, so no server is needed.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Hero, install chooser, trust badges, module bento grid, solutions by restaurant type, "works with" strip, stats band, screenshot gallery, deployment options, architecture diagram, comparison table, 4 steps, FAQ, CTA |
| `/features/` | Every feature group, with roadmap items clearly marked |
| `/how-to-use/` | Six-step walkthrough with screenshots, plus a "more tools" grid |
| `/install/` | Docker per OS, install methods, `.env` reference, hosting options, updates, backups, troubleshooting |
| `/solutions/[type]/` | Static pages for QSR, fine dining, cafés & bakeries, cloud kitchens, food courts, multi-outlet chains |
| `/contact/` | Email address with a copy button (no form, no backend) |
| `/privacy/`, `/terms/` | Plain-language drafts, marked TODO for legal review |

Also generated: `sitemap.xml`, `robots.txt`, per-page OpenGraph/Twitter metadata, FAQ JSON-LD.

## Develop

Requires Node 22 and pnpm 10. (On Node 22.12, recent pnpm 10 releases refuse to run; use
`npm exec --package=pnpm@10.11.0 -- pnpm <command>` or upgrade Node to 22.13+.)

```bash
pnpm install
pnpm dev          # http://localhost:4100
pnpm lint
pnpm typecheck
pnpm build        # static export to ./out
pnpm start        # serve ./out locally
```

Set `NEXT_PUBLIC_SITE_URL` at build time to the real domain (used for canonical URLs, OpenGraph,
sitemap and robots). The default in `lib/site.ts` is a placeholder.

Deploys as a standard Next.js project on Vercel (it detects the static export automatically) or on any
static host.

## Screenshots

Until real screenshots are captured, every product image is an HTML/CSS illustration of the screen with
clearly labelled sample data (`components/fragments/`, data in `lib/sample-data.ts`). Real captures are made by
`scripts/capture-screenshots.mjs` (Playwright + your installed Chrome, compressed PNG via sharp), or by
dropping a PNG with the exact name below into `public/screenshots/`. The next build picks it up, swaps the
illustration for the real image and drops the "Sample data" badge.

| File | Viewport | Screen |
|---|---|---|
| `pos.png`, `pos-dark.png` | 1440×900 | Point of Sale with an open, unsent cart |
| `dashboard.png`, `dashboard-dark.png` | 1440×900 | Dashboard |
| `kds.png` | 1440×900 | Kitchen display |
| `online-orders.png` | 1440×900 | Online orders queue (delivery platforms, website, QR) |
| `email-templates.png` | 1440×900 | Settings email preview: heading, subject and upper branded email |
| `inventory.png` | 1440×900 | Inventory |
| `reports.png` | 1440×900 | Reports |
| `tables.png`, `reservations.png`, `menu.png`, `customers.png`, `settings.png` | 1440×900 | As named |
| `guest-qr-phone.png` | 390×844 | Guest QR ordering page, shown in a phone frame |

Capture at device scale factor 1. Use only the local demo stack, updated after the release-blocking PRs merge.

Set `APP_PASSWORD` privately in the environment, or point `APP_STORAGE_STATE` at an existing owner session file outside version control (for example under ignored `scripts/.auth/`). Never paste credentials into commands or commit session files. An expired session causes capture to fail.

```bash
# Run from Git Bash with Node 26 first on PATH. Preserve the existing demo data.
# Set APP_PASSWORD privately, or APP_STORAGE_STATE to the private session path.
until mkdir /tmp/nventra-heavy.lock 2>/dev/null; do sleep 20; done
trap 'rmdir /tmp/nventra-heavy.lock' EXIT
pnpm capture
# Other options: APP_URL (default http://localhost:1995), APP_EMAIL, CHROME_PATH
# Fast capture-plan regression checks, without a browser:
pnpm test:capture
```

The script logs in once, captures all 15 files, and rejects redirects, failed API calls, visible error pages and unfinished content. It leaves the app's branding and logos intact. The POS images use an **unsent** local cart; no order, payment or email is submitted. The guest capture uses a separate logged-out context, reuses an existing table QR token and passes the name prompt to show the menu. If the demo tables have no token, prepare one separately before capture; this script never rotates QR tokens. Email previews are rendered without saving or sending. At 1440 px the app stacks the editor and preview, so this capture focuses on the Settings preview heading, subject and at least 200 px of the upper rendered email. It uses natural page scrolling without changing app layout or zoom.

Inspect every generated PNG before committing it. A failed capture exits nonzero; existing files for failed shots are preserved, so do not treat a partial run as a complete refresh. Image ids and alt text live in `lib/screenshots.ts`. Browser capture and visual inspection remain required before release; unit checks alone do not verify screenshots.

## Project layout

```
app/                  routes, layout, sitemap, robots, globals.css (design tokens)
components/brand/     BrandMark: the placeholder "N" monogram (swap the real logo in here and app/icon.svg)
components/layout/    header with mega menu, footer, page hero, legal page shell
components/home/      home page sections
components/ui/        section heading, buttons, screenshot frame, code block, copy button, accordion, reveal
lib/content/          all page copy and data (features, FAQ, install, solutions, guide, nav)
lib/site.ts           brand, contact, URLs
scripts/              screenshot capture
```

All factual claims are drawn from the product repository's README, TUTORIAL and ROADMAP. Anything still on
the roadmap is labelled "coming soon" or "on the roadmap".

## Design

Design tokens come from the Nventra portfolio site (Inter, the mint brand accent, the warm orange primary,
uppercase mono "eyebrow" tags with `//`, hairline borders, the `[0.22, 1, 0.36, 1]` easing curve), extended
with a light theme. The site follows the OS colour scheme, with a toggle that is remembered per browser.
Motion is limited to fade-ins, a count-up and a logo-strip marquee, and all of it is disabled under
`prefers-reduced-motion`.

## Components & sources

Kept deliberately small. Everything is MIT/ISC and copied in as owned source or used as a primitive.

| What | Source | Licence | Why |
| --- | --- | --- | --- |
| Mega menu, FAQ accordion, install tabs | [Radix UI Primitives](https://github.com/radix-ui/primitives) via the unified [`radix-ui`](https://www.npmjs.com/package/radix-ui) package (NavigationMenu, Accordion, Tabs) | MIT | Keyboard support, focus management and ARIA handled for us; unstyled, so it takes our tokens. The same primitives [shadcn/ui](https://ui.shadcn.com/docs/tailwind-v4) uses for Tailwind 4 / React 19 |
| Component styling approach | [shadcn/ui](https://github.com/shadcn-ui/ui) conventions (owned source, `cn()` with clsx + tailwind-merge) | MIT | Copy-in components we can edit, no black-box UI kit |
| "Works with" marquee, bento grid, number ticker | Patterns from [Magic UI](https://github.com/magicuidesign/magicui) (Marquee, Bento Grid, Number Ticker), re-implemented in a few lines | MIT | Avoids pulling in a registry for three small effects; reduced-motion handled explicitly |
| Icons | [lucide-react](https://lucide.dev) | ISC | Same icon family as the product UI |
| Motion | [framer-motion](https://motion.dev) | MIT | Already used by the portfolio; `useReducedMotion` built in |
| Screenshot capture | [playwright-core](https://playwright.dev) + [sharp](https://sharp.pixelplumbing.com) | Apache-2.0 / Apache-2.0 | Drives the installed Chrome; PNG output |

No carousel library: the gallery is a CSS scroll-snap strip.

## Before going public

- Replace the placeholder logo (`components/brand/brand-mark.tsx`, `app/icon.svg`).
- Register the domain and set `NEXT_PUBLIC_SITE_URL`.
- Legal review of `/privacy/` and `/terms/` (search for `TODO(lawyer)`).
- Re-capture screenshots once the product rebrand ships.
- Decide whether the source repository becomes public; today the site says the source is available to
  customers on request.

## Licence and attribution

Nventra POS is licensed under the AGPL-3.0 and is based on
[Nodedr OrderRestro](https://github.com/Raktim94/nodedr-restaurant-pos), AGPL-3.0.
