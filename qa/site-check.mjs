import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const base = process.env.BASE_URL || 'http://127.0.0.1:4322';
const out = process.env.QA_DIR || '/tmp/outgopro-qa';
const routes = [
  '/',
  '/websites',
  '/domestic-company',
  '/global-tax',
  '/trademark',
  '/network-tech',
  '/ai-api',
  '/about-us',
  '/privacy',
  '/terms',
  '/404',
];
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
const failures = [];
for (const width of [1440, 390]) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  for (const route of routes) {
    const errors = [];
    const listener = (error) => errors.push(error.message);
    const httpListener = (response) => {
      if (response.url().startsWith(base) && response.status() >= 400 && !response.url().endsWith('/404'))
        errors.push(`${response.status()} ${response.url()}`);
    };
    page.on('pageerror', listener);
    page.on('response', httpListener);
    try {
      const response = await page.goto(`${base}${route}`, { waitUntil: 'networkidle', timeout: 30000 });
      assert.ok(response.ok() || route === '/404', `HTTP ${response.status()}`);
      await page.evaluate(async () => {
        for (const img of document.images) img.loading = 'eager';
        await Promise.all([...document.images].map((img) => img.decode().catch(() => {})));
        await document.fonts.ready;
      });
      const metrics = await page.evaluate(() => ({
        h1s: document.querySelectorAll('h1').length,
        overflow: document.documentElement.scrollWidth - innerWidth,
        broken: [...document.images].filter((img) => !img.naturalWidth).map((img) => img.src),
        text: document.body.innerText,
        canonical: document.querySelector('link[rel=canonical]')?.getAttribute('href'),
      }));
      assert.equal(metrics.h1s, 1);
      assert.ok(metrics.overflow <= 1, `Overflow ${metrics.overflow}`);
      assert.equal(metrics.broken.length, 0, `Broken images ${metrics.broken}`);
      assert.ok(!/AstroWind|onwidget|1000\+|98%|500\+/.test(metrics.text));
      assert.ok(metrics.canonical?.startsWith('https://outgopro.com'));
      if (route === '/') {
        assert.equal(await page.locator('.service-row').count(), 6);
        await page.locator('.faq-list summary').first().click();
        assert.equal(await page.locator('.faq-list details').first().getAttribute('open'), '');
        if (width === 390) {
          await page.getByRole('button', { name: /菜单/ }).click();
          assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'true');
          await page.keyboard.press('Escape');
          assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
          await page.locator('.menu-toggle').click();
          await page.locator('#main-nav a[href="/#services"]').click();
          assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
          await page.evaluate(() => scrollTo(0, 0));
        }
        await page.evaluate(() => scrollTo(0, 0));
        await page.screenshot({ path: `${out}/home-${width}.png`, fullPage: true });
        await page.screenshot({ path: `${out}/hero-${width}.png` });
      }
      if (route === '/about-us') {
        assert.equal(await page.locator('#service option').count(), 7);
        await page.locator('#service').selectOption({ label: 'AI 模型聚合 API' });
        await page.locator('#message').fill('测试咨询内容，不发送。');
        await page.evaluate(() => {
          Object.defineProperty(navigator, 'clipboard', {
            configurable: true,
            value: {
              writeText: async (text) => {
                window.__copiedInquiry = text;
              },
            },
          });
        });
        await page.locator('#copy-inquiry').click();
        const copied = await page.evaluate(() => window.__copiedInquiry);
        assert.ok(copied.includes('AI 模型聚合 API') && copied.includes('admin@outgopro.com'));
        assert.ok((await page.locator('#form-status').innerText()).includes('已复制'));
      }
      assert.equal(errors.length, 0, errors.join('\n'));
      results.push({ route, width, status: 'pass' });
    } catch (error) {
      failures.push({ route, width, error: error.message, errors });
      results.push({ route, width, status: 'fail' });
    } finally {
      page.off('pageerror', listener);
      page.off('response', httpListener);
    }
  }
  await context.close();
}
// The content remains available with scripts disabled.
const noJS = await browser.newPage({ javaScriptEnabled: false });
await noJS.goto(base);
assert.equal(await noJS.locator('.service-row').count(), 6);
assert.ok(await noJS.locator('h1').isVisible());
await browser.close();
await writeFile(`${out}/report.json`, JSON.stringify({ base, results, failures }, null, 2));
console.log(
  JSON.stringify({ passed: results.filter((r) => r.status === 'pass').length, total: results.length, failures })
);
if (failures.length) process.exitCode = 1;
