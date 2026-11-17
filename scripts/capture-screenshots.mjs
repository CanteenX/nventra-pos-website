#!/usr/bin/env node
/** Capture the real demo app without changing product text or persisted data.
 * Set APP_PASSWORD privately, or APP_STORAGE_STATE to an existing private owner
 * session file. Do not put credentials in shell history or commit session files.
 * Run pnpm capture behind the shared /tmp/nventra-heavy.lock after release PRs merge.
 * Outputs: 14 desktop PNGs (1440x900), one guest menu PNG (390x844).
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';
import sharp from 'sharp';
import { capturePlan, captureConfig, assertCapturePage, findQrToken, prepareGuest, captureRequestAllowed } from './capture-plan.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(ROOT, 'public', 'screenshots');
const config = captureConfig(process.env);
const log = text => process.stdout.write(`${text}\n`);

async function login(page) {
  if (config.storageState) return;
  await page.goto(`${config.appURL}/login`);
  await page.locator('#email').fill(config.email);
  await page.locator('#password').fill(config.password);
  await Promise.all([
    page.waitForURL(url => url.pathname === '/dashboard', { timeout: 30_000 }),
    page.locator('button[type="submit"]').click(),
  ]);
}

function monitor(page) {
  const pending = new Set();
  let failed = false;
  let completed = 0;
  const isAPI = request => new URL(request.url()).pathname.startsWith('/api/v1/');
  page.on('request', request => { if (isAPI(request)) pending.add(request); });
  page.on('requestfinished', request => pending.delete(request));
  page.on('requestfailed', request => {
    pending.delete(request);
    if (isAPI(request) && request.failure()?.errorText !== 'net::ERR_ABORTED') failed = true;
  });
  page.on('response', response => {
    if (isAPI(response.request())) { completed += 1; if (response.status() >= 400) failed = true; }
  });
  page.on('pageerror', () => { failed = true; });
  return { pending, failed: () => failed, completed: () => completed };
}

async function settle(page, state) {
  const deadline = Date.now() + 20_000;
  while ((!state.completed() || state.pending.size) && Date.now() < deadline) await page.waitForTimeout(100);
  if (!state.completed() || state.pending.size || state.failed()) throw new Error('Application requests failed or did not finish.');
  await page.evaluate(() => document.fonts.ready);
  await page.locator('.animate-pulse:visible').first().waitFor({ state: 'hidden', timeout: 15_000 });
  await page.mouse.move(0, 0);
}

async function setTheme(page, theme) {
  await page.evaluate(value => {
    localStorage.setItem('theme', value);
    document.documentElement.classList.toggle('dark', value === 'dark');
    document.documentElement.classList.toggle('light', value === 'light');
    document.documentElement.style.colorScheme = value;
  }, theme);
  await page.waitForFunction(value => document.documentElement.classList.contains(value), theme);
}

async function prepareCart(page) {
  // Opening an available table and adding cart lines are browser state only.
  const table = page.locator('button[title="Available"]').first();
  await table.waitFor({ state: 'visible' });
  await table.click();
  // Never click Send to kitchen or Pay.
  const items = page.locator('button[title]').filter({ hasText: /₹|\$|€/ });
  await items.first().waitFor({ state: 'visible' });
  const count = Math.min(await items.count(), 9);
  for (let index = 0; index < count; index += 3) {
    await items.nth(index).click();
    const dialog = page.getByRole('dialog');
    if (await dialog.isVisible()) {
      const add = dialog.getByRole('button', { name: /add/i }).last();
      if (await add.isEnabled()) await add.click();
      else await page.keyboard.press('Escape');
    }
  }
  // A cart with no removable lines would be a misleading POS screenshot.
  await page.getByText('Cart is empty', { exact: true }).waitFor({ state: 'hidden' });
  await page.locator('button:has(svg.lucide-trash-2), button:has(svg.lucide-trash2)').first().waitFor({ state: 'visible' });
}

async function prepareEmail(page) {
  await page.getByTestId('email-template-editor').waitFor({ state: 'visible' });
  const report = page.getByTestId('email-template-REPORT_SCHEDULED');
  if (await report.count()) await report.getByRole('button').click();
  const frame = page.getByTestId('email-preview-frame');
  await frame.waitFor({ state: 'visible' });
  await page.waitForFunction(() => {
    const frame = document.querySelector('[data-testid="email-preview-frame"]');
    return (frame?.contentDocument?.body?.innerText.trim().length ?? 0) > 0;
  });
  await frame.scrollIntoViewIfNeeded();
}

async function qrToken(context) {
  // Reuse the app's selected branch and existing token. Never rotate/create QR data.
  const page = await context.newPage();
  const floorsResponse = page.waitForResponse(response => {
    const url = new URL(response.url());
    return url.pathname === '/api/v1/tables/floors' && response.request().method() === 'GET';
  });
  try {
    const [response] = await Promise.all([floorsResponse, page.goto(`${config.appURL}/tables`)]);
    if (!response.ok()) throw new Error('Cannot read demo tables.');
    return findQrToken(await response.json());
  } finally {
    await page.close();
  }
}

async function capture(context, shot) {
  const page = await context.newPage();
  const state = monitor(page);
  try {
    await page.setViewportSize(shot.viewport);
    const response = await page.goto(`${config.appURL}${shot.path}`);
    // Fail redirects before waiting for content which may exist on the login page.
    assertCapturePage(shot.path, { actualURL: page.url(), status: response?.status(), hasError: false, hasContent: true });
    await setTheme(page, shot.theme);
    if (shot.id === 'guest-qr-phone') await prepareGuest(page);
    else {
      await page.locator('main').waitFor({ state: 'visible' });
      if (!shot.id.startsWith('pos')) await page.locator('main h1').first().waitFor({ state: 'visible' });
    }
    await settle(page, state);
    if (shot.id.startsWith('pos')) await prepareCart(page);
    if (shot.id === 'email-templates') await prepareEmail(page);
    await settle(page, state);
    const content = shot.id === 'guest-qr-phone' ? page.locator('body') : page.locator('main');
    const hasError = await page.locator('[role="alert"]:visible, nextjs-portal').count() > 0;
    const hasContent = (await content.innerText()).trim().length > 30;
    assertCapturePage(shot.path, { actualURL: page.url(), status: response?.status(), hasError, hasContent });
    const png = await page.screenshot({ type: 'png', fullPage: false, animations: 'disabled' });
    const file = path.join(OUT_DIR, `${shot.id}.png`);
    await writeFile(file, await sharp(png).png({ compressionLevel: 9 }).toBuffer());
    log(`Captured ${shot.id}.png`);
  } finally {
    await page.close();
  }
}

async function main() {
  if (!existsSync(config.chrome)) throw new Error('Chrome missing; set CHROME_PATH.');
  const health = await fetch(`${config.appURL}/api/health`, { signal: AbortSignal.timeout(10_000) }).catch(() => null);
  if (!health?.ok) throw new Error('Local demo stack health check failed.');
  const browser = await chromium.launch({ executablePath: config.chrome, headless: true });
  try {
    const options = { viewport: { width: 1440, height: 900 }, colorScheme: 'light', deviceScaleFactor: 1, locale: 'en-IN' };
    const owner = await browser.newContext({ ...options, ...(config.storageState ? { storageState: config.storageState } : {}) });
    owner.setDefaultTimeout(20_000);
    await owner.addInitScript(() => localStorage.setItem('nodedr-locale', 'en'));
    const loginPage = await owner.newPage();
    await login(loginPage);
    await loginPage.close();
    const token = await qrToken(owner);
    const protect = context => context.route('**/api/v1/**', route => {
      const request = route.request();
      return captureRequestAllowed(request.method(), new URL(request.url()).pathname) ? route.continue() : route.abort('blockedbyclient');
    });
    await protect(owner);
    const guest = await browser.newContext(options);
    guest.setDefaultTimeout(20_000);
    await protect(guest);
    await guest.addInitScript(() => localStorage.setItem('nodedr-locale', 'en'));
    await mkdir(OUT_DIR, { recursive: true });
    const failures = [];
    for (const shot of capturePlan(token)) {
      try { await capture(shot.id === 'guest-qr-phone' ? guest : owner, shot); }
      catch { failures.push(shot.id); process.stderr.write(`Capture failed: ${shot.id}\n`); }
    }
    if (failures.length) throw new Error(`Incomplete capture: ${failures.join(', ')}. Inspect the local demo stack; no failed shot was saved.`);
    log('All 15 screenshots captured.');
  } finally {
    await browser.close();
  }
}

// Error objects may contain private URLs, form values or session state. Do not log them.
main().catch(() => { process.stderr.write('Screenshot capture failed. Check demo access, required environment and page readiness.\n'); process.exitCode = 1; });
