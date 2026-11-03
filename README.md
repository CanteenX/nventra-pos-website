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

All screenshots are real captures of the app running with demo data, made by
`scripts/capture-screenshots.mjs` (Playwright + your installed Chrome, output optimised to WebP with sharp).

```bash
# product running at http://localhost:1995 with demo data (./install.sh --demo)
pnpm capture
# options: APP_URL, APP_EMAIL, APP_PASSWORD, CHROME_PATH
```

The script logs in once (login is rate-limited), visits each screen, builds an **unsent** POS cart (no order
is sent and no payment is taken), and captures 1440×900 light shots plus dark versions of the dashboard and
POS. Until the product rebrand ships, it rewrites upstream product names and the demo restaurant name in the
page text and hides the logo image before each capture. Re-run it after the rebrand to refresh every image.
Image ids are listed in `lib/screenshots.ts` (alt text lives there too).

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
| Screenshot capture | [playwright-core](https://playwright.dev) + [sharp](https://sharp.pixelplumbing.com) | Apache-2.0 / Apache-2.0 | Drives the installed Chrome; WebP output |

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
