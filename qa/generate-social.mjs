import { chromium } from '@playwright/test';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(
  `<!doctype html><html lang="zh-CN"><meta charset="utf-8"><style>*{box-sizing:border-box}body{margin:0;background:#f5f3ed;color:#222522;font-family:'PingFang SC','Microsoft YaHei',sans-serif;padding:58px 72px;width:1200px;height:630px}header{font-size:36px;letter-spacing:-2px}header span{color:#ce4325;margin-left:14px}h1{font-size:86px;letter-spacing:-6px;font-weight:600;line-height:1.3;margin:70px 0 42px}h1 span{color:#ce4325}.bottom{display:flex;justify-content:space-between;border-top:1px solid #cdd2c3;padding-top:25px;font-size:20px;color:#6d7069}.arrow{position:absolute;right:75px;top:118px;font-size:250px;color:#d4dcc5;font-weight:400}</style><header>outgopro<span>↗</span></header><div class="arrow">↗</div><h1>好生意，<br>从这里<span>开始。</span></h1><div class="bottom"><span>建站 / 公司 / 财税 / 商标 / 网络 / AI</span><span>outgopro.com</span></div></html>`
);
await page.screenshot({ path: 'public/og-cover.png' });
await browser.close();
