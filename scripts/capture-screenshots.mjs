#!/usr/bin/env node
/**
 * Captures real product screenshots for the marketing site.
 *
 *   pnpm capture                       # app at http://localhost:1995, demo data loaded
 *   APP_URL=http://192.168.1.20:1995 pnpm capture
 *
 * - Logs in ONCE (the app throttles login to 5/min) and reuses the session.
 * - Never completes a payment or sends an order: the POS shot only builds an
 *   unsent cart, which lives in the browser, not the database.
 * - Until the product rebrand ships, an init script rewrites upstream names
 *   and the demo restaurant name in visible text and hides logo images, so
 *   the screenshots show only "Nventra POS". Re-run after the rebrand and the
 *   scrub simply finds nothing to replace.
 * - Output: public/screenshots/<id>.webp at 1440x900 (ids match lib/screenshots.ts).
 */
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "public", "screenshots");
const APP_URL = (process.env.APP_URL ?? "http://localhost:1995").replace(/\/$/, "");
const EMAIL = process.env.APP_EMAIL ?? "owner@demo.local";
const PASSWORD = process.env.APP_PASSWORD ?? "Password123!";
const CHROME = process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
const VIEWPORT = { width: 1440, height: 900 };
const SETTLE_MS = 1800;

/** Runs in every page before its own scripts. Keeps re-applying on re-render. */
function brandScrub() {
  const RULES = [
    [/Nodedr Bistro \(Demo\)/gi, "Spice Route (Demo)"],
    [/Nodedr Bistro/gi, "Spice Route"],
    [/Nodedr OrderRestro/gi, "Nventra POS"],
    [/NodeDR Infotech Private Limited/gi, "Nventra"],
    [/OrderRestro/gi, "Nventra POS"],
    [/Nodedr/gi, "Nventra POS"],
  ];
  const fix = (s) => RULES.reduce((acc, [re, to]) => acc.replace(re, to), s);
  const needs = (s) => /nodedr|orderrestro/i.test(s);

  const LOGO_CSS =
    'img[src*="logo" i], img[src*="brand" i], img[alt*="OrderRestro" i], img[alt*="Nodedr" i] { visibility: hidden !important; }';

  function scrub(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      if (n.nodeValue && needs(n.nodeValue)) n.nodeValue = fix(n.nodeValue);
    }
    if (root.querySelectorAll) {
      for (const el of root.querySelectorAll("[title],[alt],[placeholder],[aria-label]")) {
        for (const attr of ["title", "alt", "placeholder", "aria-label"]) {
          const v = el.getAttribute(attr);
          if (v && needs(v)) el.setAttribute(attr, fix(v));
        }
      }
      for (const input of root.querySelectorAll("input,textarea")) {
        if (input.value && needs(input.value)) input.value = fix(input.value);
      }
    }
    if (needs(document.title)) document.title = fix(document.title);
  }

  function start() {
    const style = document.createElement("style");
    style.textContent = LOGO_CSS;
    document.head.appendChild(style);
    scrub(document.body);
    new MutationObserver(() => scrub(document.body)).observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
}

async function settle(page) {
  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("networkidle", { timeout: 8000 }).catch(() => {});
  await page.waitForTimeout(SETTLE_MS);
  // Leave no hover/focus artefacts in the shot.
  await page.mouse.move(VIEWPORT.width - 5, VIEWPORT.height - 5);
}

async function setTheme(page, theme) {
  await page.evaluate((t) => {
    const html = document.documentElement;
    html.classList.toggle("dark", t === "dark");
    html.classList.toggle("light", t === "light");
    html.style.colorScheme = t;
    try {
      localStorage.setItem("theme", t);
    } catch {
      /* ignore */
    }
  }, theme);
  await page.waitForTimeout(500);
}

async function save(page, id) {
  const png = await page.screenshot({ type: "png", fullPage: false });
  const file = path.join(OUT_DIR, `${id}.webp`);
  await writeFile(file, await sharp(png).webp({ quality: 82, effort: 6 }).toBuffer());
  console.log(`  saved ${path.relative(ROOT, file)}`);
}

async function login(page) {
  await page.goto(`${APP_URL}/login`);
  await page.fill("#email", EMAIL);
  await page.fill("#password", PASSWORD);
  await Promise.all([
    page.waitForURL((url) => !url.pathname.startsWith("/login"), { timeout: 30000 }),
    page.click('button[type="submit"]'),
  ]);
}

/** Opens a free table and adds a few dishes to an UNSENT cart. */
async function buildCart(page) {
  const table = page.locator('button[title="Available"]').first();
  if (await table.count()) await table.click();
  await page.waitForTimeout(1200);

  const items = page.locator("button[title]").filter({ hasText: /₹|\$|€/ });
  const count = Math.min(await items.count(), 12);
  let added = 0;
  for (let i = 0; i < count && added < 4; i += 3) {
    await items.nth(i).click();
    await page.waitForTimeout(500);
    const dialog = page.getByRole("dialog");
    if (await dialog.count()) {
      const add = dialog.getByRole("button", { name: /add/i }).last();
      if (await add.isEnabled().catch(() => false)) await add.click();
      else await page.keyboard.press("Escape");
      await page.waitForTimeout(400);
    }
    added += 1;
  }
}

const SHOTS = [
  { id: "dashboard", path: "/dashboard", dark: true },
  { id: "pos-cart", path: "/pos", dark: true, prepare: buildCart },
  { id: "kds", path: "/kds" },
  { id: "tables", path: "/tables" },
  { id: "reservations", path: "/reservations" },
  { id: "menu", path: "/menu" },
  { id: "customers", path: "/customers" },
  { id: "inventory", path: "/inventory" },
  { id: "reports", path: "/reports" },
  { id: "settings", path: "/settings" },
];

async function main() {
  if (!existsSync(CHROME)) throw new Error(`Chrome not found at ${CHROME}; set CHROME_PATH.`);
  const health = await fetch(`${APP_URL}/api/health`).catch(() => null);
  if (!health?.ok) throw new Error(`App not reachable at ${APP_URL}/api/health`);
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ executablePath: CHROME, headless: true });
  const context = await browser.newContext({ viewport: VIEWPORT, colorScheme: "light", deviceScaleFactor: 1 });
  await context.addInitScript(brandScrub);
  const page = await context.newPage();

  // Remember a table QR token from the floors API to capture the guest page.
  let qrToken = null;
  page.on("response", async (res) => {
    if (qrToken || !res.url().includes("/tables/floors")) return;
    const text = await res.text().catch(() => "");
    const match = text.match(/"qrToken":"([^"]+)"/);
    if (match) qrToken = match[1];
  });

  const failed = [];
  try {
    await login(page);
    console.log("Logged in.");
    for (const shot of SHOTS) {
      try {
        console.log(`> ${shot.path}`);
        await page.goto(`${APP_URL}${shot.path}`);
        await setTheme(page, "light");
        await settle(page);
        if (shot.prepare) {
          await shot.prepare(page);
          await settle(page);
        }
        await save(page, `${shot.id}-light`);
        if (shot.dark) {
          await setTheme(page, "dark");
          await save(page, `${shot.id}-dark`);
          await setTheme(page, "light");
        }
      } catch (err) {
        failed.push(shot.path);
        console.error(`  failed: ${err instanceof Error ? err.message : err}`);
      }
    }

    if (qrToken) {
      console.log("> guest QR page");
      await page.goto(`${APP_URL}/order/${qrToken}`);
      await setTheme(page, "light");
      await settle(page);
      await save(page, "guest-qr-light");
    } else {
      failed.push("/order/<qrToken> (no table has a QR token)");
    }
  } finally {
    await browser.close();
  }

  if (failed.length) {
    console.error(`Could not capture: ${failed.join(", ")}`);
    process.exitCode = 1;
  } else {
    console.log("All screenshots captured.");
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
