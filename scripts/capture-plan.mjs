export const DESKTOP = { width: 1440, height: 900 };
export const PHONE = { width: 390, height: 844 };

export function captureConfig(env) {
  if (!env.APP_PASSWORD && !env.APP_STORAGE_STATE) {
    throw new Error('Set APP_PASSWORD or APP_STORAGE_STATE for the local demo session.');
  }
  const url = new URL(env.APP_URL ?? 'http://localhost:1995');
  if (url.username || url.password) throw new Error('APP_URL must not contain credentials.');
  if (url.pathname !== '/' || url.search || url.hash) throw new Error('APP_URL must point to the application root.');
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('APP_URL must use HTTP.');
  return {
    appURL: url.origin,
    email: env.APP_EMAIL ?? 'owner@demo.local',
    password: env.APP_PASSWORD,
    storageState: env.APP_STORAGE_STATE,
    chrome: env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  };
}

export function capturePlan(qrToken) {
  if (typeof qrToken !== 'string' || !qrToken.trim()) throw new Error('An existing QR token is required.');
  const routes = [
    ['pos', '/pos'], ['pos-dark', '/pos'],
    ['dashboard', '/dashboard'], ['dashboard-dark', '/dashboard'],
    ['kds', '/kds'], ['online-orders', '/orders'],
    ['email-templates', '/settings/email-templates'], ['inventory', '/inventory'],
    ['reports', '/reports'], ['tables', '/tables'], ['reservations', '/reservations'],
    ['menu', '/menu'], ['customers', '/customers'], ['settings', '/settings'],
  ];
  return [
    ...routes.map(([id, path]) => ({ id, path, theme: id.endsWith('-dark') ? 'dark' : 'light', viewport: DESKTOP })),
    { id: 'guest-qr-phone', path: `/order/${encodeURIComponent(qrToken)}`, theme: 'light', viewport: PHONE },
  ];
}

export function assertCapturePage(expectedPath, { actualURL, status, hasError, hasContent }) {
  if (new URL(actualURL).pathname.replace(/\/$/, '') !== expectedPath.replace(/\/$/, '')) throw new Error('Unexpected route or expired session.');
  if (!status || status >= 400) throw new Error('HTTP failure loading screenshot page.');
  if (hasError) throw new Error('Page contains a visible error.');
  if (!hasContent) throw new Error('Page content is incomplete.');
}

export function findQrToken(floors) {
  if (!Array.isArray(floors)) throw new Error('Unexpected floors response.');
  const table = floors.flatMap(floor => floor.tables ?? []).find(table => typeof table.qrToken === 'string' && table.qrToken.length);
  if (!table) throw new Error('Demo tables need an existing QR token before capture.');
  return table.qrToken;
}

export async function prepareGuest(page) {
  const input = page.locator('#guest-name');
  await input.waitFor({ state: 'visible' });
  await input.fill('Asha');
  await input.press('Enter');
  await page.getByRole('button', { name: 'Add', exact: true }).first().waitFor({ state: 'visible' });
}

/** Browser captures may read data and render an unsaved email preview only. */
export function captureRequestAllowed(method, pathname) {
  if (['GET', 'HEAD', 'OPTIONS'].includes(method)) return true;
  return method === 'POST' && /^\/api\/v1\/email-templates\/[A-Z_]+\/preview$/.test(pathname);
}
