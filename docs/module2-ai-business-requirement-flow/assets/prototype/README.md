# P2 企业服务工作台 · Mock 代码原型

本目录是中文 P2 / B04 的可编辑 HTML、CSS、JavaScript 原型。界面文字、字段、状态、表格和按钮均由 DOM 构成，三张截图来自 Chromium 浏览器渲染。没有真实客户、业务 API、P1 集成、数据存储或组织任务执行。

## 文件与视图

- `index.html`：共享应用 Shell、侧栏、操作弹窗和反馈容器。
- `styles.css`：共享设计变量、状态标签、组件及响应式布局。
- `mock-data.js`：Case / Application、规则、Service Event、Candidate Issue 与目标态 Task 的模拟数据。
- `app.js`：三个视图的 DOM 模板、独立分支状态与本地操作门槛。
- `capture.cjs`：从浏览器渲染重新生成 1600 × 1000 截图及来源清单。
- `../prototype-preview.js`：作品集 B04 专用截图 Lightbox。

以静态 HTTP 服务打开 `index.html?view=case`、`?view=handoff` 或 `?view=voc`。左栏可在视图间切换；刷新页面或点击“重置演示”会重置内存状态。未引入前端框架或运行时依赖。

## 三条演示路径

1. **Customer Case / 正常分支**：CASE-001 查询 SIM-APP-001 的退回记录。模拟发送 → Waiting for Customer；记录客户结果确认（两项必选及说明）→ Resolved；另经关闭检查 → Closed。Application 始终 Returned，不代办补件、重提或开通。
2. **Human Handoff / 独立异常分支**：仍使用 CASE-001，但与正常分支独立。默认 Case Pending Handoff、Handoff Pending Assignment。确认模拟访问权限 → 接收回执 / Accepted → 开始人工处理 / Human Processing。可保存本地记录、模拟升级或接收超时，不能自动解决或关闭。
3. **VOC / 当前待补证**：CI-001 默认 Need Evidence。用户主动模拟四项补证及无重复条件，仍需另行确认审核权限与准入 → Confirm → TASK-001 / Pending Acceptance 目标态预览。预览不创建或执行任务。Need Evidence、Reject / Observe 不开放任务；Merge 明确禁用。

所有权限、客户确认、时间与结果均为明确标注的本地 Mock。前端勾选不是安全权限系统。业务权限、审批、幂等、实际人工分派、重复事项选择、发布与效果采集均未实现。

## 修改与更新截图

先修改 `mock-data.js` 的业务内容，或修改 `app.js` / `styles.css` 的呈现和操作规则。保持 Case、Application、Issue、Task 的生命周期独立。截图默认采用初始状态；不要把交互后状态写成默认截图，导致 CI-001 自动通过审核。

启动静态服务后，使用现有 Playwright / Chromium 环境：

```sh
P2_PREVIEW_URL='http://127.0.0.1:PORT/docs/module2-ai-business-requirement-flow/assets/prototype/index.html' node capture.cjs
```

可设置 `P2_BROWSER_MODULES` 为包含 `playwright` 的现有依赖目录；`P2_CHROME_PATH` 指定 Chrome 可执行路径；`P2_SCREENSHOT_DIR` 指定输出目录。工具不会安装依赖或启动服务。默认输出到 `../screenshots`，校验桌面画布没有截断后生成三张 PNG 与 `b04-render-manifest.json`。

发布前检查 1440 / 1280 / 1024px 原型布局、作品集移动端预览和 Lightbox。界面较窄时自然重排和纵向滚动，不缩成微型桌面画布。

## 与 P1 的关系

沿用 P1 的代码原型 → 浏览器截图 → PRD 嵌入 → Lightbox 展示方式，并参考其平实 SaaS Shell 和组件层级。这里只展示 P1 作为按需 Knowledge Service 的业务价值，未连接 P1，也不展开内部知识实现。截图资产可供后续 Tab A Gallery 复用，本轮未修改 Gallery。
