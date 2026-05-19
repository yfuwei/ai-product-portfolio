# AI Product Portfolio

静态作品集站点，用于展示 AI 应用从 Demo 到可试点状态的产品化路径。

## 当前结构

```text
ai-product-portfolio/
├── index.html
├── en/
│   ├── index.html
│   └── docs/
├── docs/
│   ├── module1-enterprise-knowledge-workspace/
│   ├── module2-ai-business-requirement-flow/
│   ├── module3-ai-content-operations-workflow/
│   └── module4-ai-evaluation-governance-framework/
├── assets/
│   ├── docs/
│   └── images/
├── src/
│   ├── i18n.js
│   ├── main.js
│   └── styles/main.css
└── .nojekyll
```

## 页面入口

- 首页：`index.html`
- 模块 1：`docs/module1-enterprise-knowledge-workspace/index.html`
- 模块 2：`docs/module2-ai-business-requirement-flow/index.html`
- 模块 3：`docs/module3-ai-content-operations-workflow/index.html`
- 模块 4：`docs/module4-ai-evaluation-governance-framework/index.html`

英文入口：

- 首页：`index.html?lang=en`，`en/index.html` 会跳转到该入口。
- 模块 1：`en/docs/module1-enterprise-knowledge-workspace/index.html` 当前为跳转页。
- 模块 2：`en/docs/module2-ai-business-requirement-flow/` 当前仅保留同步目录。
- 模块 3：`en/docs/module3-ai-content-operations-workflow/index.html`
- 模块 4：`en/docs/module4-ai-evaluation-governance-framework/index.html`

## 本地预览

```bash
python3 -m http.server 4177
```

打开：

```text
http://127.0.0.1:4177/index.html
```

## GitHub Pages

当前站点是纯静态文件，没有 Vite / React / Next / Astro 构建配置，也没有打包输出目录。

GitHub Pages 建议配置：

- Source：Deploy from a branch
- Branch：`main`
- Folder：`/root`

项目根目录已有 `.nojekyll`，用于避免 GitHub Pages 对下划线或静态资源做 Jekyll 处理。

## 旧版文件

旧版作品集页面和旧版 PRD 已移出站点目录，归档到：

`../03_作品集改造工作台/99_归档_旧版站点文件/20260518_old_portfolio_pages/`

该归档目录位于当前 `ai-product-portfolio` 仓库根目录之外，不属于 GitHub Pages 当前站点发布内容。
