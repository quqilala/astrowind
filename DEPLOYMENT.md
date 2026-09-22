# OUTGOPRO 官网

正式地址：https://outgopro.com

Cloudflare Pages 项目：`outgopro`，关联仓库 `quqilala/astrowind`，生产分支 `main`，构建命令 `npm run build`，产物 `dist`。保留原有 Pages 与域名配置，使用静态部署。

## 本地开发

```sh
npm ci
npm run dev
```

## 构建与检查

```sh
npm run check
npm run build
npm run preview -- --host 127.0.0.1 --port 4322
# 另一个终端；需要本机已安装 Chrome
npm run test:ui
```

测试默认读取 http://127.0.0.1:4322；可用 `BASE_URL` 指定预览或正式网址，用 `QA_DIR` 指定报告目录。默认报告写入 /tmp/outgopro-qa。测试只检查页面与交互，不发送咨询邮件。

## 内容维护

- `src/data/services.ts`：六项服务、范围、准备资料、常见问题和邮箱。
- `src/pages/index.astro`：首页介绍、设计参考、合作流程。
- `src/pages/about-us.astro`：合作理念与邮件咨询。
- `src/layouts/OutgoLayout.astro`：共用导航、页脚和 SEO。
- `src/assets/styles/outgo.css`：共用视觉规范及响应式布局。
- `public/_redirects`：旧 AI、跨境电商、Web3 链接迁移。

咨询表单只在浏览器内生成邮件，用户确认后由邮件应用发送。无咨询数据库、无服务端收集接口。

案例图片来自已提供的网站案例包，作为设计参考展示；完整案例库：https://gscase.outgopro.com。

## 回退

改版前的生产部署：`88f0b31a-5ffd-4e2d-b43b-9d6bfd8a7dad`，源代码提交：`c1182cf84852918abf7d3566c5d7fffe4ddfd69c`。需要恢复时可使用 Cloudflare Pages 部署回退；同时对源码提交做正常 revert，避免后续构建覆盖回退。
