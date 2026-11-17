import assert from 'node:assert/strict';
import test from 'node:test';
import { capturePlan, captureConfig, assertCapturePage, findQrToken, prepareGuest, captureRequestAllowed } from './capture-plan.mjs';

test('capture plan covers all 15 agreed outputs with the email editor and phone viewport', () => {
  const shots = capturePlan('demo-token');
  assert.equal(shots.length, 15);
  assert.equal(new Set(shots.map(s => s.id)).size, 15);
  assert.deepEqual(shots.find(s => s.id === 'email-templates').path, '/settings/email-templates');
  assert.deepEqual(shots.find(s => s.id === 'guest-qr-phone').viewport, { width: 390, height: 844 });
  assert.equal(shots.filter(s => s.theme === 'dark').length, 2);
});

test('capture requires explicit credentials or private session state and refuses credentials in URL', () => {
  assert.throws(() => captureConfig({}), /APP_PASSWORD or APP_STORAGE_STATE/);
  assert.equal(captureConfig({ APP_PASSWORD: 'test-value' }).password, 'test-value');
  assert.equal(captureConfig({ APP_STORAGE_STATE: 'private-session.json' }).storageState, 'private-session.json');
  assert.throws(() => captureConfig({ APP_PASSWORD: 'test', APP_URL: 'http://user:secret@localhost:1995' }), /credentials/);
});

test('login redirects, HTTP failures, error pages and missing content cannot become product images', () => {
  const ready = { actualURL: 'http://localhost:1995/pos', status: 200, hasError: false, hasContent: true };
  assert.doesNotThrow(() => assertCapturePage('/pos', ready));
  assert.throws(() => assertCapturePage('/pos', { ...ready, actualURL: 'http://localhost:1995/login' }), /route/);
  assert.throws(() => assertCapturePage('/pos', { ...ready, status: 500 }), /HTTP/);
  assert.throws(() => assertCapturePage('/pos', { ...ready, hasError: true }), /error/);
  assert.throws(() => assertCapturePage('/pos', { ...ready, hasContent: false }), /content/);
});

test('QR discovery parses floors without depending on JSON formatting and refuses missing tokens', () => {
  assert.equal(findQrToken([{ tables: [{ qrToken: null }, { qrToken: 'existing-token' }] }]), 'existing-token');
  assert.throws(() => findQrToken([{ tables: [] }]), /existing QR token/);
  assert.throws(() => findQrToken({ error: 'unauthorized' }), /floors/);
});

test('guest capture passes the name gate and waits for menu without placing orders', async () => {
  const actions = [];
  const page = {
    locator(selector) {
      assert.equal(selector, '#guest-name');
      return { async waitFor(options) { assert.equal(options.state, 'visible'); }, async fill(value) { actions.push(['name', value]); }, async press(key) { actions.push(['press', key]); } };
    },
    getByRole(role, options) {
      assert.equal(role, 'button');
      assert.deepEqual(options, { name: 'Add', exact: true });
      return { first() { return { async waitFor(options) { assert.equal(options.state, 'visible'); actions.push(['menu']); } }; } };
    },
  };
  await prepareGuest(page);
  assert.deepEqual(actions, [['name', 'Asha'], ['press', 'Enter'], ['menu']]);
});

test('capture rejects missing guest tokens and unexpected application URL paths', () => {
  assert.throws(() => capturePlan(), /QR token/);
  assert.throws(() => captureConfig({ APP_PASSWORD: 'test', APP_URL: 'http://localhost:1995/private' }), /root/);
});

test('healthy trailing-slash routes are accepted', () => {
  assert.doesNotThrow(() => assertCapturePage('/settings', { actualURL: 'http://localhost:1995/settings/', status: 200, hasError: false, hasContent: true }));
});

test('capture blocks persisted writes, including order, payment and real email requests', () => {
  assert.equal(captureRequestAllowed('GET', '/api/v1/tables/floors'), true);
  assert.equal(captureRequestAllowed('POST', '/api/v1/email-templates/REPORT_SCHEDULED/preview'), true);
  for (const path of ['/api/v1/orders', '/api/v1/orders/1/payments', '/api/v1/email-templates/REPORT_SCHEDULED/test', '/api/v1/tables/1/qr-token']) {
    assert.equal(captureRequestAllowed('POST', path), false);
  }
  assert.equal(captureRequestAllowed('PATCH', '/api/v1/email-templates/REPORT_SCHEDULED'), false);
});

test('email capture refuses an offscreen title, subject, or insufficient upper preview at 1440px', () => {
  const composition = {
    clip: { x: 256, y: 80, width: 1184, height: 820 },
    title: { x: 600, y: 90, width: 120, height: 24 },
    subject: { x: 600, y: 140, width: 550, height: 24 },
    frame: { x: 600, y: 180, width: 600, height: 1300 },
  };
  const ready = { actualURL: 'http://localhost:1995/settings/email-templates', status: 200, hasError: false, hasContent: true, emailComposition: composition };
  assert.doesNotThrow(() => assertCapturePage('/settings/email-templates', ready));
  for (const emailComposition of [
    { ...composition, title: { ...composition.title, y: -200 } },
    { ...composition, subject: { ...composition.subject, y: -30 } },
    { ...composition, frame: { ...composition.frame, y: 750 } },
    { ...composition, frame: { ...composition.frame, y: -500 } },
    { ...composition, frame: { ...composition.frame, x: 1200 } },
  ]) {
    assert.throws(() => assertCapturePage('/settings/email-templates', { ...ready, emailComposition }), /preview composition/);
  }
});
