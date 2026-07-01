# Project 1 Execution Evidence Audit

## 1. Audit Scope

本次是只读审计，仅新增本报告文件，未修改现有网页、图片、PDF、脚本或 Git 历史。

扫描路径：

- `/Users/frey/Library/Mobile Documents/iCloud~md~obsidian/Documents/Frey's Notes/01 PROJECTS/Resume/AIPM_Resume_2026/03_作品集素材202605`
- `/Users/frey/Library/Mobile Documents/iCloud~md~obsidian/Documents/Frey's Notes/01 PROJECTS/Resume/AIPM_Resume_2026/ai-product-portfolio`
- 只读补充检查：`ai-product-portfolio` 的 Git 历史，重点是 2026-04-19 至 2026-05-18 的旧项目页与删除记录。

文件类型：

- 当前仓库：`.html`, `.md`, `.mmd`, `.svg`, `.png`, `.yaml`, `.txt`, `.pdf`
- 历史素材目录：`.md`, `.png`, `.pdf` 线索与目录索引
- Git 历史：已删除的 `docs/local-knowledge-rag/`, `docs/enterprise-rag/`, `en/docs/local-knowledge-rag/`, `en/docs/enterprise-rag/`, `docs/02_RAG_PRD.md`, 以及 2026-05-18 短暂存在的 `docs/module1-enterprise-knowledge-workspace/企业知识工作台_RAG到Agent工作流_产品设计文档.md`

关键词：

- 项目1, 项目 1, 企业知识工作台, RAG, Rank, rerank, citation, 引用, chunk, embedding, vector, Chroma, ChromaDB, LlamaIndex, LangChain, Ollama, Qwen, 本地, PRD, 母版, 技术架构, 数据流, prompt, UI, 知识库, 可信上下文, archived, archive, backup, old, legacy, v1, draft

未命中说明：

- 未在当前可读文件中发现 `rerank`, `LlamaIndex`, `LangChain`, `ChromaDB` 作为实际实现证据；当前材料主要使用 `Chroma`, `Ollama`, `embeddinggemma`, `qwen3:0.6b`, `FastAPI`, `local RAG`, `Router / Tool / Memory / Agent Core`。
- `/Users/frey/Library/Mobile Documents/iCloud~md~obsidian/Documents/Frey's Notes/01 PROJECTS/Resume/AIPM_Resume_2026/03_作品集素材202605/99_归档_旧版站点文件` 当前可读状态为空目录；但 `04_验收与发布/PROJECT_STRUCTURE.md` 记录它曾作为旧版站点和旧 PRD 的归档入口。

## 2. Most Relevant Source Files

| 文件路径 | 文件类型 | 为什么相关 | 内容新旧判断 | 是否建议复用 |
|---|---|---|---|---|
| `assets/docs/enterprise_knowledge_workspace_product_design_cn.pdf` | PDF | 16 页中文产品设计母稿，标题为“企业知识工作台产品设计文档”，包含项目状态、业务问题、V1/V2/V3、RAG/Agent/Memory/Human Review/badcase/eval/rollback、验证体系和边界 | 当前仓库保留的 PRD 母稿；2026-05-17 生成 | 建议复用，作为 PRD Master 依据 |
| `assets/docs/enterprise_knowledge_workspace_prd_out_cn_v1.2.pdf` | PDF | 13 页“PRD 全图版”，当前页面直接挂载；包含图 1-10、信息架构、搜索与引用结果页、知识任务问答、问答状态、评估看板 | 当前对外挂载版，比母稿更视觉化，文字更压缩 | 建议复用图示与页面证据 |
| `docs/module1-enterprise-knowledge-workspace/product-brief.md` | Markdown | 保留 MVP 范围、成功指标、取舍：DOCX/PDF/PPTX/TXT/Markdown 转换，chunk, embedding, Chroma, CLI/Web GUI, 本地小模型带来源回答 | 当前仓库内支撑文档，但当前页面未充分显化 | 建议复用，适合补 execution evidence |
| `docs/module1-enterprise-knowledge-workspace/system-design.md` | Markdown | 明确四层架构、运行组件 `sources.py`, `convert.py`, `ingest.py`, `search.py`, `ask.py`, `app.py`, `web/`, `gui.py`，以及检索流程和刷新策略 | 当前仓库内工程支撑文档 | 建议复用，工程可信度最高 |
| `docs/module1-enterprise-knowledge-workspace/indexing-pipeline.md` | Markdown | 具体说明发现文件、转换、切块、按 path 刷新旧 chunks、小批量 embedding、写入 Chroma、offset/limit/max-chunks 参数 | 当前仓库内工程支撑文档 | 建议复用，适合做数据 pipeline 小节 |
| `docs/module1-enterprise-knowledge-workspace/examples/config.example.yaml` | YAML | 明确 `embedding_model: embeddinggemma`, `llm_model: qwen3:0.6b`, `chunk_target_chars: 1200`, `chunk_overlap_chars: 150`, `top_k: 5`, Chroma/cache/logs 路径 | 当前脱敏配置样例 | 建议复用，适合做“实现参数快照” |
| `docs/module1-enterprise-knowledge-workspace/portfolio-case.md` | Markdown | 有验证快照：已索引文件 163、Obsidian Markdown 162、总 chunks 390、Obsidian chunks 385、本地文档 smoke-test chunks 5 | 当前仓库内旧叙事支撑 | 建议复用，页面当前缺少这种数字 |
| `docs/module1-enterprise-knowledge-workspace/evaluation.md` | Markdown | 有脱敏测试集、命中结果、优势限制；强调“只有在检索上下文支持时才生成简短回答” | 当前仓库内验证记录 | 建议复用，适合补验证证据 |
| `docs/module1-enterprise-knowledge-workspace/hardware-constraints.md` | Markdown | 明确 2020 Intel i5 MacBook Pro、16GB、无独显，以及小型 embedding、本地 LLM、Chroma、FastAPI、原生 HTML/CSS/JS 的取舍 | 当前仓库内实现约束 | 建议复用，适合展示真实调试/约束 |
| `docs/module1-enterprise-knowledge-workspace/index.html` | HTML | 当前项目 1 中文页面；已有可信上下文层、产品对象、界面原型、Agent 架构、演进路径和验证边界 | 当前页面，是 gap analysis 对照基准 | 保留，不在本轮修改 |
| `en/docs/module1-enterprise-knowledge-workspace/index.html` | HTML | 当前项目 1 英文页面；结构与中文相近，保留 PRD PDF 链接和上下文层叙事 | 当前英文页面，是后续同步基准 | 保留，不在本轮修改 |
| `git:f552954f^:docs/local-knowledge-rag/index.html` / `git:18ee4079:docs/local-knowledge-rag/index.html` | 历史 HTML | 旧项目 1 页面保留更多技术落地证据：10 条真实任务问题、9+1 命中、8/10 可用性、RAG -> Agentic RAG、Router/Tool/Memory、badcase 表 | 旧版，2026-05-18 改版时删除 | 建议抽取证据，不建议整体恢复 |
| `git:18ee4079:docs/local-knowledge-rag/本地知识助手_RAG到AgenticRAG_产品设计文档.md` | 历史 Markdown PRD | 非常详细的本地 RAG/Agentic RAG 母版；包含 Mermaid 架构、chunk/Prompt/Chroma/top_k、search_docs、Memory、Router、验证结果和未来多工具 Agent | 高度疑似“非常详细 PRD 母版”的早期版本 | 强烈建议复用，但要产品化改写 |
| `git:18ee4079:docs/enterprise-rag/index.html` | 历史 HTML | 旧“企业知识库问答与报告生成”页面；包含 20 个问题验证 RAG 边界、报告初稿、引用规则、资料字段、拒答策略 | 旧版项目 2，后来并入当前项目 1 叙事 | 可选择性复用“报告初稿/20 问验证” |
| `git:f552954f^:docs/02_RAG_PRD.md` | 历史 Markdown PRD | 旧企业 RAG PRD 草稿；包含 20 个验证问题、19 个基本可用以上、资料库范围、召回片段、人工复核提示、拒答边界 | 更早、更粗的 PRD 草稿 | 可作为历史证据，不建议直接恢复 |
| `/Users/frey/.../03_作品集素材202605/00_总计划/ai_portfolio_master_rework_guideline_v2.md` | Markdown | 记录改版原则：RAG 不做主角，降级为可信上下文基础设施；解释为什么后续页面弱化 chunk/embedding/vector database | 当前改版总纲 | 建议作为“为什么弱化技术细节”的解释依据 |
| `/Users/frey/.../03_作品集素材202605/04_验收与发布/PROJECT_STRUCTURE.md` | Markdown | 记录旧路径、归档策略和禁止重新引用旧路径；指出旧 PRD/旧截图/历史支撑材料曾归档到 `99_归档_旧版站点文件/...` | 当前结构索引，但实际归档目录未展开出文件 | 建议作为路径考证依据 |

## 3. PRD Master / Source Material Found

### 高度疑似 PRD 母版 1：当前中文产品设计母稿

- 路径：`/Users/frey/Library/Mobile Documents/iCloud~md~obsidian/Documents/Frey's Notes/01 PROJECTS/Resume/AIPM_Resume_2026/ai-product-portfolio/assets/docs/enterprise_knowledge_workspace_product_design_cn.pdf`
- 标题：`企业知识工作台产品设计文档`
- 版本：对外展示版 v1.1
- 生成信息：PDF metadata 显示 2026-05-17 22:15:54 CST，16 页。
- 主要章节：
  - `0. 文档说明`
  - `1. 项目概述`
  - `2. 业务背景与问题定义`
  - `3. 用户角色与核心任务`
  - `4. 当前流程与 AI 介入点`
  - `5. 产品责任单元定义`
  - `6. 关键产品判断：为什么 RAG 不再是主角`
  - `7. 技术路线与方案取舍`
  - `8. V1 / V2 / V3 产品演进路径`
  - `9. V1 设计：可信知识检索与引用溯源`
  - `10. V2 设计：Agent 工作流与任务型知识助手`
  - `11. V3 设计：可维护 AI 工作流工程脚手架`
  - `12. 验证体系、badcase 与迭代机制`
  - `13. 人机协同、安全边界与企业化扩展`
  - `14. 项目边界与模块 2 边界`
- 与当前项目 1 的关系：
  - 当前 `docs/module1-enterprise-knowledge-workspace/index.html` 的主叙事来自该文档，但网页更强调“可信上下文层 / 工作流机制”，弱化了 V1 实现栈、索引 pipeline、prompt、chunk、模型与本地部署细节。
- 可复用内容摘要：
  - “产品级原型 / 可演示 MVP”状态和“不声称生产系统”的边界。
  - RAG/Agent/Memory/Human Review/badcase/eval 的产品职责解释。
  - V1 -> V2 -> V3 演进逻辑。
  - “资料找得到、答案有依据、用户能回到来源复核”的 V1 目标。
  - “Router、Tool、Memory、Human Review”的 V2 架构。
  - “Prompt / Workflow Versioning, Eval Set, Rollback Note, Human Review Checkpoints”的 V3 脚手架。
  - badcase 示例：语义相近误召回、来源不足却强行回答、Router 误判、Memory 串扰。

### 高度疑似 PRD 母版 2：历史本地知识助手 Agentic RAG 母版

- 路径：`git:18ee4079:docs/local-knowledge-rag/本地知识助手_RAG到AgenticRAG_产品设计文档.md`
- 标题：`产品设计文档：本地知识助手（从 RAG 到 Agentic RAG 的演进实践）`
- 主要章节：
  - `1. 项目概述（TL;DR）`
  - `2. 问题定义 & 用户需求`
  - `3. V1：基础 RAG 系统设计`
  - `4. V2：Agentic RAG 系统设计（决策驱动升级）`
  - `5. V1 vs V2 对比`
  - `6. 关键设计思考`
  - `7. 验证与效果`
  - `8. 未来扩展`
  - `9. 我的角色与能力体现`
- 与当前项目 1 的关系：
  - 这是当前项目 1 中“本地 RAG / Agentic RAG 工程可信度”的最详细来源。当前项目 1 已从“本地知识助手”升级包装为“企业知识工作台”，但底层证据仍可用于说明真实做过的本地索引、检索、问答、GUI 和 Agent 控制层。
- 可复用内容摘要：
  - V1 架构：Obsidian/本地文档 -> 文档读取转换 -> Chunk -> 本地 Embedding -> Chroma -> 语义检索 -> Prompt -> LLM -> 答案 + 引用来源。
  - V1 实现：FastAPI + Web GUI、Ollama embedding + Chroma、163 文件、390 chunks。
  - V2 架构：Router, search_docs Tool, Memory, Agent Core。
  - Prompt 设计原则：优先使用上下文、上下文不足说明不确定、输出引用来源。
  - 设计取舍：Tool 只读、Memory 只保留短期、暂不做自动写入、复杂任务先不引入 Planner。
  - 验证：10 条代表性真实任务问题、9 条命中、1 条基本命中、约 8/10 回答可用性。

### 当前对外挂载 PRD / 图文版

- 路径：`assets/docs/enterprise_knowledge_workspace_prd_out_cn_v1.2.pdf`
- 标题：`企业知识工作台产品设计文档（全图版）`
- 版本：对外展示版 v1.2 / 全图版
- 主要章节：
  - 项目概述、业务背景、用户角色、AI 介入点、产品责任单元、RAG 重新定位、V1/V2/V3、验证体系、边界与图表清单。
- 与当前项目 1 的关系：
  - 当前中文/英文页面 Hero 都直接链接此 PDF 或英文 brief：`docs/module1-enterprise-knowledge-workspace/index.html` 与 `en/docs/module1-enterprise-knowledge-workspace/index.html`。
- 可复用内容摘要：
  - 图 3 典型使用流程、图 4 信息架构、图 6 搜索与引用结果页、图 7 知识任务问答页、图 9 问答执行流程与状态、图 10 评估与迭代看板。

## 4. Archived Portfolio Pages Found

| 路径 | 对应版本 | 和当前页面相比保留了哪些更具体的落地信息 | 哪些内容可恢复 |
|---|---|---|---|
| `git:18ee4079:docs/local-knowledge-rag/index.html` | 旧项目 1：本地知识助手（RAG -> Agentic RAG），2026-04-30 附近版本 | Hero 直接写出“10 条真实任务问题：9 条命中，1 条基本命中，回答可用性约 8/10”；V1 写本地 embedding + Chroma、GUI、Obsidian 与本地文档统一检索；V2 写 Router、Tool、Memory、Agent Core、`search_docs`；badcase 表写误召回、长文档总结片面、Router 误判、写回风险 | 恢复“实现快照 / 验证数字 / badcase 表 / V1-V2 架构取舍”，不要恢复旧页面标题和个人知识助手叙事 |
| `git:18ee4079:docs/local-knowledge-rag/local-knowledge-rag-case-study-en.md` | 旧英文 case study | 英文版更适合 LinkedIn/英文简历读者，聚焦 product thinking, trade-offs, validation, badcases, boundaries | 可提炼英文措辞，后续同步英文页面时参考 |
| `git:18ee4079:docs/local-knowledge-rag/本地知识助手_RAG到AgenticRAG_产品设计文档.md` | 旧 PRD 母版 | 详细到 mermaid 架构、chunk 设计、metadata、top_k、path refresh、Prompt 原则、search_docs Tool、Memory 策略和验证指标 | 最值得恢复为当前页面的 execution evidence section |
| `git:18ee4079:docs/enterprise-rag/index.html` | 旧项目 2：企业知识库问答与报告生成 | 保留企业资料字段、报告初稿、引用编号、人工复核、20 个问题验证 RAG 边界、问题类型表现、拒答策略 | 可恢复“报告初稿 / 引用复核 / 20 问验证边界”作为企业化证据，但需避免和当前项目 2 混淆 |
| `git:f552954f^:docs/02_RAG_PRD.md` | 更早企业 RAG PRD 草稿 | 写明 Demo 不接真实向量库、20 个验证问题、19 个基本可用及以上、资料库范围、召回片段、人工复核提示 | 可作为历史证据，不适合直接放当前项目 1 页面 |
| `git:f552954f:docs/module1-enterprise-knowledge-workspace/企业知识工作台_RAG到Agent工作流_产品设计文档.md` | 2026-05-18 新模块 1 迁移时短暂存在的 Markdown | 内容与早期本地知识助手 PRD 高度相似，但路径已经切换到企业知识工作台；随后 1f26c994 删除 | 可作为“从本地 RAG 迁移到企业知识工作台”的过渡证据 |

归档目录实际状态：

- `/Users/frey/.../03_作品集素材202605/99_归档_旧版站点文件` 当前只读扫描为空目录。
- `/Users/frey/.../03_作品集素材202605/04_验收与发布/PROJECT_STRUCTURE.md` 记录旧版站点文件应位于 `99_归档_旧版站点文件/20260518_old_portfolio_pages/` 和 `20260518_本地旧项目残余整理/01_项目素材_旧版归档/`，但本次文件系统未找到这些子目录。
- 旧页面实际可从 Git 历史恢复查看，不在当前文件系统目录中。

## 5. Reusable Execution Evidence

### 5.1 Architecture / Tech Stack

可复用证据：

- `docs/module1-enterprise-knowledge-workspace/system-design.md`：四层架构为来源层、处理层、存储层、交互层；运行组件包括 `sources.py`, `convert.py`, `ingest.py`, `search.py`, `ask.py`, `app.py`, `web/`, 早期 `gui.py`。
- `docs/module1-enterprise-knowledge-workspace/diagrams/architecture.mmd`：Obsidian Markdown 和本地 DOCX/PDF/PPTX/TXT -> 文档转换 -> 切块 -> Ollama 本地 Embedding -> Chroma -> 语义检索 / RAG 回答 -> FastAPI Web GUI。
- `docs/module1-enterprise-knowledge-workspace/examples/config.example.yaml`：`embedding_model: embeddinggemma`, `llm_model: qwen3:0.6b`, `chunk_target_chars: 1200`, `chunk_overlap_chars: 150`, `top_k: 5`。
- `docs/module1-enterprise-knowledge-workspace/hardware-constraints.md`：2020 款 Intel i5 MacBook Pro / 16GB / 无独显，选择小型本地 embedding、本地 LLM、Chroma、FastAPI、原生 HTML/CSS/JS。
- `git:18ee4079:docs/local-knowledge-rag/index.html`：旧页直接展示“本地 embedding + Chroma 向量检索”“FastAPI GUI”“Router / Tool / Memory / Agent Core”。

建议恢复方式：

- 在当前项目页新增一个轻量 `Execution Evidence` 或 `Prototype Implementation Snapshot` section。
- 用 3-5 行说明实现栈，不把页面改成技术教程。
- 推荐表达：`Local prototype stack: Obsidian/local docs -> chunking -> Ollama embedding -> Chroma -> FastAPI GUI -> source-grounded answer.`。

### 5.2 Data Pipeline

可复用证据：

- `docs/module1-enterprise-knowledge-workspace/indexing-pipeline.md`：发现文件 -> 读取或转换文档 -> 拆分为 chunks -> 按文件路径刷新旧 chunks -> 生成 embedding -> 写入 Chroma。
- `docs/module1-enterprise-knowledge-workspace/diagrams/indexing-flow.mmd`：include/exclude 规则、Markdown/文档转换、切分并合并 chunks、完整刷新时按 path 删除旧 chunks、小批量 embedding、保存 manifest。
- `docs/module1-enterprise-knowledge-workspace/system-design.md`：检索流程为用户问题 -> query embedding -> Chroma top-k chunks -> UI 展示路径/标题/章节/片段 -> 本地 LLM 回答 -> 引用 chunks。
- `docs/module1-enterprise-knowledge-workspace/examples/config.example.yaml`：支持 `.md`, `.txt`, `.docx`, `.pdf`, `.pptx`，设置 chunk target/overlap/top_k。

建议恢复方式：

- 用一张 compact pipeline 或短列表讲清楚“不是概念 RAG，而是做过 ingestion/index/query/answer 闭环”。
- 可以直接复用 `diagrams/indexing-flow.mmd` 的逻辑，但当前页面更适合改写为文字/图形小组件。

### 5.3 Rerank / Retrieval Design

可复用证据：

- 本次未发现实际 `rerank` 或 ranker 实现证据。
- `docs/module1-enterprise-knowledge-workspace/evaluation.md` 和 `git:18ee4079:docs/local-knowledge-rag/本地知识助手_RAG到AgenticRAG_产品设计文档.md` 都保留了 retrieval quality 证据：Top-K 是否召回正确来源、同义表达覆盖、来源筛选、metadata 约束。
- 旧 PRD badcase 指出“语义相近导致误召回”，优化动作为增加 `project_name`, `source_type`, `path` 等元数据和来源筛选。
- 旧 PRD指出“长文档总结片面”，优化动作为增加章节摘要索引、总结类问题优先召回目录和章节摘要。

判断：

- 不建议在当前页面写 `rerank`，除非后续找到真实实现。
- 可以写 `retrieval quality controls` 或 `metadata-aware retrieval constraints`，依据来自旧 PRD 与 `evaluation.md`。

### 5.4 Citation / Source Traceability

可复用证据：

- `docs/module1-enterprise-knowledge-workspace/product-brief.md`：RAG 回答必须引用检索来源；搜索结果包含清晰路径和片段。
- `docs/module1-enterprise-knowledge-workspace/system-design.md`：UI 展示来源路径、标题、章节和片段；回答必须引用来源 chunks。
- `docs/module1-enterprise-knowledge-workspace/portfolio-case.md`：问答模式先检索 chunks，再只基于 chunks 生成回答；回答定位为“可复核初稿”。
- `assets/docs/enterprise_knowledge_workspace_prd_out_cn_v1.2.pdf`：搜索与引用结果页示意，用户看到引用片段、来源文档和原文定位。
- `docs/module1-enterprise-knowledge-workspace/index.html`：当前页面已经有 `检索与引用`、上下文卡、来源/权限/版本/适用范围。

建议恢复方式：

- 当前页面已有 citation 叙事，但偏产品抽象。
- 可补一句“prototype evidence”：`Search results retained source path, heading, chunk excerpt, and citation list; answers were treated as reviewable drafts.`。

### 5.5 Prompt / Answer Control

可复用证据：

- `git:18ee4079:docs/local-knowledge-rag/本地知识助手_RAG到AgenticRAG_产品设计文档.md`：Prompt 原则包括优先使用上下文、上下文不足说明不确定、回答简洁清晰、输出引用来源。
- 同一历史 PRD：Agent Core 将问题、Memory 和检索结果组装成 answer prompt；Router 可由规则 prompt 或 LLM 输出结构化 route decision。
- `docs/module1-enterprise-knowledge-workspace/evaluation.md`：只有在检索上下文支持时才生成简短回答；不编造检索上下文之外制度。
- `git:18ee4079:docs/enterprise-rag/index.html`：资料不足时拒答，错误但流畅的答案比“不知道”更危险。

建议恢复方式：

- 当前页面可以新增 “Answer Control Rules” 小卡片。
- 不建议贴完整 prompt；建议写成产品化规则：`Use retrieved context first; say insufficient evidence when sources do not support the claim; always return source path/excerpt; write/delete actions require confirmation.`。

### 5.6 UI / Interaction / Prototype

可复用证据：

- 当前页面：`docs/module1-enterprise-knowledge-workspace/index.html` 已有低保真界面图 `fig03_workspace_home.png`, `fig04_search_citation_results.png`, `fig05_knowledge_task_qa.png`, `fig06_project_review.png`, `fig08_evaluation_iteration_dashboard.png`。
- 旧本地 RAG 资产仍在当前目录中：`docs/module1-enterprise-knowledge-workspace/assets/screenshots/notion-style-gui.png`, `search-workspace.png`, `answer-with-citations.png`, `indexing-workspace.png`。
- `docs/module1-enterprise-knowledge-workspace/portfolio-case.md` 明确这些截图分别用于 GUI 总览、检索工作台、带引用回答、索引任务界面。

建议恢复方式：

- 当前页面已经展示“企业知识工作台”低保真图。
- 最值得补的是旧 `indexing-workspace.png` 或“索引任务界面”描述，因为它证明不只是 UI 概念，还考虑了文件类型、文件数量、chunk 限制、缓存、collection 重建等真实操作流。

### 5.7 Local Implementation / Constraints

可复用证据：

- `docs/module1-enterprise-knowledge-workspace/hardware-constraints.md`：低配 Intel Mac 上几百 chunks 可行但速度较慢；因此把“分批索引”和“日常检索”区分开。
- `docs/module1-enterprise-knowledge-workspace/privacy-and-security.md`：默认本机运行，笔记、embedding、Chroma、转换缓存、日志不上传；默认排除证件/合同/财务/医疗/密钥等高敏感目录。
- `docs/module1-enterprise-knowledge-workspace/migration-guide.md`：换电脑时不迁移 Chroma，建议重建索引；迁移文档、脚本、配置模板、Mermaid 图和脱敏验证问题。
- `docs/module1-enterprise-knowledge-workspace/examples/config.example.yaml`：公开样例配置不写私人路径。

建议恢复方式：

- 这部分非常适合展示“工程可信度”：真实硬件、隐私边界、迁移策略、重建索引策略。
- 不建议写得太底层；可作为页面底部 `Implementation Constraints` 小节。

## 6. Current Page Gap Analysis

对照文件：

- 当前中文页面：`docs/module1-enterprise-knowledge-workspace/index.html`
- 当前英文页面：`en/docs/module1-enterprise-knowledge-workspace/index.html`
- 当前支撑 README：`docs/module1-enterprise-knowledge-workspace/README.md`

当前页面保留得较好的内容：

- 可信上下文层：来源、权限、版本、引用、适用范围。
- 产品对象：知识来源、上下文卡、知识任务、复盘与确认、复核与知识更新。
- UI 原型：工作台首页、检索与引用、项目复盘、知识任务问答、评估与迭代看板。
- 产品架构判断：不要让 Agent 裸连知识库，先建立可信上下文层。
- 演进路径：不是从 RAG 一步跳到 Agent，而是先让上下文可信。
- 验证边界：召回质量、引用证据、权限版本、适用范围、人审边界、badcase/eval/rollback。

当前页面过于宏观的地方：

- 现在讲“可信上下文”很多，但较少说明原型实际怎么跑起来。
- 很少出现具体实现栈：Ollama, embeddinggemma, qwen3:0.6b, Chroma, FastAPI, CLI/Web GUI。
- 很少出现 ingestion/indexing 的细节：DOCX/PDF/PPTX/TXT/Markdown 转换、chunk target/overlap、按 path 刷新旧 chunks、offset/limit/max-chunks。
- 当前验证段更像设计原则，缺少旧材料里的数字证据：163 files, 390 chunks, 10 task questions, 9+1 recall, 8/10 usefulness。
- 当前页面没有突出 Prompt/Answer Control 的具体规则：上下文不足时说明不确定、只基于来源回答、输出引用来源、写入前确认。
- 当前页面没有呈现低配硬件和本地隐私约束，这会弱化“真实实现过”的可信度。

真实落地证据缺失：

- `docs/module1-enterprise-knowledge-workspace/portfolio-case.md` 中的验证快照未进入当前页面。
- `docs/module1-enterprise-knowledge-workspace/examples/config.example.yaml` 中的模型与 chunk 配置未进入当前页面。
- `docs/module1-enterprise-knowledge-workspace/indexing-pipeline.md` 的索引流程未进入当前页面。
- `docs/module1-enterprise-knowledge-workspace/system-design.md` 的运行组件未进入当前页面。
- `git:18ee4079:docs/local-knowledge-rag/index.html` 中的 badcase 表和 Agent 判断指标未进入当前页面。
- `git:18ee4079:docs/enterprise-rag/index.html` 中的 20 问验证、报告初稿和资料字段设计未进入当前页面。

旧内容可以补回：

- V1 本地 RAG 实现快照：数据源、chunk、embedding、Chroma、FastAPI GUI、引用回答。
- V2 Agentic RAG 控制层：Router, `search_docs` Tool, Memory, Agent Core。
- 验证数字：163 files, 390 chunks, 10 questions, 9+1 recall, 8/10 usefulness。
- badcase 和优化：语义相近误召回、长文档总结片面、Router 误判、写回风险。
- Prompt/回答边界：来源不足不强答、只读默认、写入前确认。
- 本地部署约束：Intel i5/16GB、分批索引、重建 Chroma、不上传私有资料。

旧内容不建议补回：

- 不建议恢复旧标题“本地知识助手（RAG -> Agentic RAG）”作为当前项目主标题，因为当前项目已统一为“企业知识工作台”。
- 不建议把当前页面改回 RAG 技术教程；`03_作品集素材202605/00_总计划/ai_portfolio_master_rework_guideline_v2.md` 明确要求 RAG 降级为上下文基础设施，不要过度讲 embedding/chunk/vector database。
- 不建议写 `rerank`, `LlamaIndex`, `LangChain`, `ChromaDB`，除非后续找到真实文件证据。
- 不建议恢复旧 `docs/local-knowledge-rag/` 或 `docs/enterprise-rag/` 路径到导航，因为 `PROJECT_STRUCTURE.md` 明确这些旧路径不属于当前新版入口。

## 7. Reuse Recommendation

### A. Directly reusable

几乎可以直接拿回当前项目 1 页面：

- `docs/module1-enterprise-knowledge-workspace/portfolio-case.md` 的验证快照：
  - 已索引文件 163
  - Obsidian Markdown 文件 162
  - 总 chunks 390
  - Obsidian chunks 385
  - 本地文档 smoke-test chunks 5
- `docs/module1-enterprise-knowledge-workspace/indexing-pipeline.md` 的流程摘要：
  - 发现文件 -> 读取或转换文档 -> 拆分为 chunks -> 按文件路径刷新旧 chunks -> 生成 embedding -> 写入 Chroma
- `docs/module1-enterprise-knowledge-workspace/examples/config.example.yaml` 的脱敏配置快照：
  - embeddinggemma, qwen3:0.6b, chunk 1200/150, top_k 5
- `docs/module1-enterprise-knowledge-workspace/hardware-constraints.md` 的硬件约束：
  - 2020 Intel i5 MacBook Pro, 16GB, no GPU
  - 分批索引、日常检索分离
- `docs/module1-enterprise-knowledge-workspace/privacy-and-security.md` 的本地隐私边界：
  - embedding/Chroma/cache/logs 不上传
  - 默认排除高敏感资料

### B. Reusable after upgrading

需要改写成更产品化、更作品集化语言后再用：

- `git:18ee4079:docs/local-knowledge-rag/index.html` 的旧 Hero 数字和 V1/V2 叙事：
  - 可改写为“Prototype evidence”，避免页面回到“个人知识助手”口径。
- `git:18ee4079:docs/local-knowledge-rag/本地知识助手_RAG到AgenticRAG_产品设计文档.md` 的详细架构：
  - 保留 Router/Tool/Memory/search_docs/Prompt/metadata/badcase，但语言要从“本地个人知识助手”升级到“企业知识工作台原型验证”。
- `git:18ee4079:docs/enterprise-rag/index.html` 的 20 问验证与报告初稿：
  - 可作为“早期企业 RAG 场景验证”，但要小心不要和当前项目 2 的“业务需求流转工作台”混淆。
- `assets/docs/enterprise_knowledge_workspace_product_design_cn.pdf` 的 V1/V2/V3 章节：
  - 当前页面已有主线，可抽取一小段增强，不建议全量塞回。
- 旧 badcase 表：
  - 建议升级为“What failed / What changed / Product judgment”三列，页面价值更高。

### C. Do not reuse

不建议复用：

- `docs/local-knowledge-rag/` 和 `docs/enterprise-rag/` 的旧 URL 作为当前导航入口；这些路径已在 2026-05-18 改版中删除，`PROJECT_STRUCTURE.md` 也标记为旧路径。
- 旧页面中“证明我会做 RAG demo”的表达；当前作品集定位已升级为 AI 产品化、企业场景判断和可信上下文。
- 未找到真实实现证据的 `rerank`, `LlamaIndex`, `LangChain`, `ChromaDB` 说法。
- 过细的 chunk/vector database 参数作为页面主叙事；可以放在实现快照里，但不要抢走产品判断主线。
- 旧 `docs/02_RAG_PRD.md` 中“不接入真实向量数据库”的 Demo 口径不适合直接用于当前项目 1，因为当前本地知识助手材料已显示 Chroma 和本地索引验证。

## 8. Suggested Project 1 Restructure Direction

本轮不改页面，只建议后续方向。

当前可以保留的 section：

- Hero：保留“不是知识库问答机器人，而是企业知识进入可信工作流”的判断。
- `01｜业务问题`：保留企业不是缺知识，而是知识不能被可信使用。
- `02｜贯穿样例 / 用户任务`：保留用户任务链。
- `03｜可信上下文层`：保留 Context Card / gate。
- `04｜AI / RAG 接入前后`：保留，但可补一句“原型中 RAG 的职责是 retrieval/citation，不是最终产品价值”。
- `05｜核心产品对象`：保留。
- `06｜关键界面 / 工作流`：保留，建议新增索引任务界面或 implementation snapshot。
- `07｜产品架构判断`：保留。
- `08｜产品演进路径`：保留。
- `09｜验证方式 / 边界`：保留，但应补真实验证数字和 badcase。
- `10｜项目总结`：保留。

建议新增 1-3 个 execution evidence sections：

1. `Prototype Implementation Snapshot`
   - 内容来源：
     - `docs/module1-enterprise-knowledge-workspace/system-design.md`
     - `docs/module1-enterprise-knowledge-workspace/examples/config.example.yaml`
     - `docs/module1-enterprise-knowledge-workspace/hardware-constraints.md`
     - `git:18ee4079:docs/local-knowledge-rag/index.html`
   - 页面价值：
     - 证明项目不是纯概念页，而是本地可跑原型。
     - 建议内容：Ollama / embeddinggemma / qwen3:0.6b / Chroma / FastAPI GUI / 2020 Intel i5 / 16GB / no GPU。

2. `Indexing & Retrieval Pipeline`
   - 内容来源：
     - `docs/module1-enterprise-knowledge-workspace/indexing-pipeline.md`
     - `docs/module1-enterprise-knowledge-workspace/diagrams/indexing-flow.mmd`
     - `docs/module1-enterprise-knowledge-workspace/diagrams/query-flow.mmd`
   - 页面价值：
     - 把 document ingestion、chunk、embedding、retrieve、answer、citation 讲成落地链路。
     - 建议内容：支持 `.md/.txt/.docx/.pdf/.pptx`，chunk 1200/150，top_k 5，按 path 清旧 chunks，小批量 embedding。

3. `Validation & Badcase Evidence`
   - 内容来源：
     - `docs/module1-enterprise-knowledge-workspace/evaluation.md`
     - `docs/module1-enterprise-knowledge-workspace/portfolio-case.md`
     - `git:18ee4079:docs/local-knowledge-rag/index.html`
     - `git:18ee4079:docs/local-knowledge-rag/本地知识助手_RAG到AgenticRAG_产品设计文档.md`
   - 页面价值：
     - 把“可信上下文”从口号变成验证过的机制。
     - 建议内容：163 files / 390 chunks / 10 task questions / 9+1 recall / 8/10 usefulness / badcase: wrong semantic source, partial long-doc summary, Router misclassification, write-back risk。

推荐最小改版策略：

- 不重构当前页面信息架构。
- 在 `06｜关键界面 / 工作流` 后加 `Execution Evidence` 小节，或在 `09｜验证方式 / 边界` 内增加一个“Prototype evidence”块。
- 技术细节控制在 1-2 屏内，避免推翻 `ai_portfolio_master_rework_guideline_v2.md` 里“不要把 RAG 当主角”的方向。
- 先补中文页，再同步英文页；中文页仍作为 source of truth。
