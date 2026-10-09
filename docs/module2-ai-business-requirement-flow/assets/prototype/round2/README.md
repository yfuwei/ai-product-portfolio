# P2 B04 · 售后服务工作台

本目录是第二轮退货退款场景的可编辑产品原型。三个视图共用 Shell、颜色、线性状态图标和集中 Mock 数据，以真实 HTML DOM / CSS 渲染。未安装前端框架，无网络业务调用。

## 源文件

- `index.html`：页面入口。
- `styles.css`：产品外壳、三种工作区和响应式布局。
- `mock-data.js`：业务 ID、会话、任务、状态、证据与候选问题集中定义。
- `app.js`：共享 Shell 与三个静态 DOM 模板；只读取视图参数，无业务状态机。
- `capture.cjs`：浏览器截图与版面 / 文案检查脚本。

## 三个独立快照

| URL 参数 | 用户 / 当前任务 | 业务边界 |
| --- | --- | --- |
| `?view=conversation` | 一线客服；从第三次追问恢复此前承诺的仓库核查。 | 物流已投递，仓库未确认，退款未发起，无有效核查任务；尚未展示 WH-201 完成或 RF-301 启动。回复为未发送草稿。 |
| `?view=execution` | 服务跟踪；查看 Agent 任务、历史等待与事件、计划更新。 | WH-201 已取得有效入库记录；Plan v2 分派后 Refund Agent 复查并创建 RF-301，实际退款仍为 Not Initiated，异常处理启动不等于退款发起或到账。 |
| `?view=insights` | 客服运营；核对候选问题、排除样本与补证事项。 | Flow B 独立分析；CASE-001/002/003 候选关联，CASE-004 排除。CI-001 Need Evidence，TASK-001 尚未创建。 |

左侧导航是真实的静态视图跳转；执行轨道的 RF-301 链接定位当前任务详情。蓝色业务操作入口为拟议交互，禁用且不执行任何动作。没有消息发送、任务创建、补证、审核、Agent Runtime、企业 API、持久化或权限系统。界面上的执行结果均为产品设计 Mock，不是实际执行记录。

## 重新生成截图

先修改集中数据或模板 / CSS，用本机静态 HTTP 服务打开此目录。不要直接用旧原型入口。设定实际服务地址：

```sh
P2_PREVIEW_URL='http://127.0.0.1:PORT/ai-product-portfolio/docs/module2-ai-business-requirement-flow/assets/prototype/round2/index.html' node capture.cjs
```

可选环境变量：`P2_BROWSER_MODULES`（含 Playwright 的现有 Node 依赖目录）、`P2_CHROME_PATH`、`P2_SCREENSHOT_DIR`。脚本不安装依赖，也不启动服务。

输出到 `../../screenshots/round2/`：

- `b04-service-conversation.png`
- `b04-agent-execution.png`
- `b04-case-insights.png`
- `b04-render-manifest.json`

截图尺寸为 1600 × 1000，直接来自浏览器，不缩放或拼接。清单仅记录浏览器渲染检查，不是业务系统测试。作品集在 1440 / 1280 / 390px 预览这些截图，并沿用 `../../prototype-preview.js` 的放大、原尺寸滚动和原图入口。

第一轮企业服务开通原型保留在上级目录，作为历史资源供既有 B05 验证记录使用；新版 B04 不再展示或链接旧界面。本轮不修改 B05 的历史检查或结论。

## Round 2 视觉与信息架构

- 共用 Shell：190px 导航、56px 顶栏，黑白灰建立阅读层次。蓝色用于当前任务 / 计划更新，绿色用于已核实动作，Amber 用于等待 / 待补证，玫红用于事件 / 断点，灰色用于未开始 / 排除。统一 18px、1.6px 线性图标。
- `.service-session-workspace`：20:41:39 历史记录 / 当前聊天 / AI 续办助手。历史列表仅保留摘要；周五消息与未发送草稿构成聊天工作区；Inspector 显示上次承诺、任务缺口、拟议移交入口与紧凑业务事实。
- `.agent-execution-workspace`：70:30 主轨道与任务详情。Plan v1 两条并行轨道，纵向串联 Waiting、事件、核实、Plan v2 与续办；右侧仅展示选中的 RF-301 及客户进展。
- `.case-investigation-workspace`：70:30 记录对照 / 问题详情。四条 Case 按问题、收货记录、业务卡点和关联判断对齐；下方显示候选问题与三项时间证据链路；Inspector 保留排除原因、待补证项和 TASK-001 条件预览。
- 390px 原型自然重排为连续滚动；作品集保留完整桌面截图及原尺寸平移查看。没有为了适配屏幕缩小全局文字。

截图与 DOM 检查只证明静态版面和设计事实一致，不能证明业务工作流实际执行。

## Round 3：源码是唯一 UI Source of Truth

长期流程：修改 HTML / CSS / Mock JS → 浏览器渲染 → 核对 DOM、状态色与业务时序 → 生成候选截图 → 验证源文件 / 图片 SHA-256 → 替换正式截图 → 检查作品集嵌入及原尺寸预览。

不得直接编辑 PNG 来代替源码修改。SVG 仅用于小图标与关系连线，界面主体必须是可编辑 DOM；没有整屏 SVG、Canvas 或背景 UI 位图。

状态 Token 位于 `styles.css` 的 `:root`，不影响全站公共样式：

| 状态 | Token | 用途 |
| --- | --- | --- |
| 当前 | `--ui-active` | 恢复事项、Plan v2、RF-301、选中 Case |
| 已核实 | `--ui-success` | 物流投递记录、已定位的历史承诺、查询完成、WH-201 核实 |
| 等待 | `--ui-waiting` | 历史 Waiting、到账待确认、Need Evidence、证据缺项 |
| 事件 / 阻断 | `--ui-risk` | 仓库新事件、任务缺口、候选业务卡点 |
| 未开始 / 非当前 | `--ui-inactive` | Not Initiated、TASK-001 尚未创建、排除记录 |

`app.js` 的 Badge 与时间轨道使用 `data-state`，业务事实色来自 Mock 数据的 `tone`。历史 Waiting 已结束；Plan v2 已采用；RF-301 Started 仍不等于实际退款发起或到账。

`capture.cjs` 会检查：

- 真实 DOM 文本对象、无 UI 位图 / Canvas。
- 三张设计快照不溢出、不截断、无浏览器错误。
- 特定业务字段与执行顺序、Badge / 节点 / 业务事实带的实际计算颜色。
- 保存当前入口、CSS、模板、Mock 数据及脚本的 SHA-256，以及截图 SHA-256 和浏览器版本。

先设置 `P2_SCREENSHOT_DIR` 输出到独立候选目录；核验清单中的源文件与图片指纹后，再复制 PNG 和清单到正式 `assets/screenshots/round2/`。所有检查仅核验产品原型呈现，不证明真实业务执行。

## Round 4：UI01 / UI03 工作界面，UI02 锁定

本轮只替换 UI01 和 UI03 模板，新增样式分别限制在 `.view-conversation` 与 `.view-insights`。Shell、`execution()`、执行数据及原有样式保持不变。UI02 正式截图不替换；候选目录中的 UI02 仅用于比较重渲染指纹。

会话中的历史记录与承诺链接、问题详情中的 Case / 证据定位入口是页内导航；业务移交、发送、业务记录读取均为禁用的拟议入口，不生成成功反馈。UI01 物流已投递 / 仓库未确认 / 退款未发起；UI03 三个候选、一个排除、Need Evidence 与尚未创建状态保持不变。

截图时先使用 `P2_SCREENSHOT_DIR` 输出全部三图到候选目录，确认 UI02 与锁定图逐字节一致，再只复制 `b04-service-conversation.png`、`b04-case-insights.png` 及新清单至正式目录。不要覆盖锁定 UI02 文件。

## Round 5：定向组件精修

UI01 保持共享三栏工作面，改为主题 / 日期、客户摘要、状态 / 编号的紧凑记录行；当前聊天固定呈现客户消息、关联事件、周三承诺、待续办服务事项与未发送草稿。待安排事项不是已创建的 WH-201。右侧按待办、服务目标、关联依据、任务缺口、建议移交、业务事实组织。

UI03 保留五列对照表及 70:30 主区 / Inspector；筛选项使用下划线选中，表头 42px，数据行目标 75px。三项时间证据带序号、Clock、方向连接线、来源与待核实状态，核查范围仅含三个候选 Case。Inspector 分为当前候选、关联与排除、条件任务三组。

本轮只在 `.view-conversation` / `.view-insights` 作用域追加 CSS，保留修改前 CSS 完整前缀；UI02 DOM、执行数据、Shell 和正式 PNG 不改，重新渲染与锁定图逐字节比较。仍使用浏览器候选截图、指纹核对后仅替换 UI01 / UI03。业务按钮禁用，不产生消息发送、任务创建或真实数据读取结果。

## Round 6：AI 恢复记录与跨 Case 证据矩阵

只升级 UI01 右侧 Inspector 与 UI03 下半部证据区。UI01 历史列表、聊天内容及草稿 DOM 保持不变，三栏边界保持不变；UI03 四条 Case 主表与筛选 DOM / 布局保持不变。UI02 模板、执行数据、Shell、原有 CSS 和正式 PNG 继续锁定。

UI01 用四条紧凑工作记录表达找回周三承诺、发现有效关联任务缺口、恢复可执行目标、等待移交；只有承诺关联使用绿色 Check，未展示 WH-201 / RF-301 执行结果。底部业务事实保持初始快照。

UI03 `insights.evidenceMatrix` 只把本轮指令明确提供的已知事实和证据缺口结构化，三条候选进入矩阵，CASE-004 留在主表及排除字段。绿色仅代表已有有效入库记录；相邻的时间信息仍为 Amber 待核实。蓝灰 Info 表示部分已知的客服状态，Amber 表示待核实 / 待补证。调查方向保持疑问句，CI-001 Need Evidence，TASK-001 尚未创建。Info SVG 仅位于 UI03 模板内，沿用现有线性图标规格，不改共享图标函数。

新增 CSS 均限制在 `.view-conversation` / `.view-insights`；截图仍由完整 1600×1000 代码原型生成，未新增画廊或局部放大图。业务按钮仍禁用，只有原有导航、记录定位与作品集图片预览可以操作。
