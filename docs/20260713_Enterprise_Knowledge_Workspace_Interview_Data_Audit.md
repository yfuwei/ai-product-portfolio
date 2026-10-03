---
title: Enterprise Knowledge Workspace Interview Data Audit
date: 2026-07-13
tags:
  - interview
  - data-audit
  - enterprise-knowledge-workspace
status: complete
---

# 企业知识工作台：面试补充数据审计

> [!important] 审计边界
> 本报告只读核验现有文件、Chroma SQLite、Git 历史与归档材料；未运行会改写索引或结果的脚本，未修改代码、数据或 Git 历史。审计时间为 2026-07-13（Asia/Shanghai）。

## 目录

- [[#1. Executive Summary|1. Executive Summary]]
- [[#2. Source Inventory|2. Source Inventory]]
- [[#3. Verified Metrics|3. Verified Metrics]]
- [[#4. Calculation Notes|4. Calculation Notes]]
- [[#5. Interpretation of the “600+” Statement|5. Interpretation of the “600+” Statement]]
- [[#6. HR Message — Recommended Version|6. HR Message — Recommended Version]]
- [[#7. HR Message — Correction Version|7. HR Message — Correction Version]]
- [[#8. Follow-up Interview Talking Points|8. Follow-up Interview Talking Points]]
- [[#9. Reproducible Checks|9. Reproducible Checks]]

## 1. Executive Summary

- 已确认 4 个主要资料位置：当前作品集仓库、Vault 内真实本地 RAG 项目、Vault 归档作品集材料、`/Users/frey/local-rag` 本机运行目录；另核对了 Git 全历史及 `Documents/AIPM作品集/ai-product-portfolio-release` 发布副本。
- 盘点到当前模块 48 个文件、归档关键词命中 89 个文件、Git 中 139 个相关历史路径；这些数字有交叠和副本，**仅表示材料盘点规模，不是项目效果数据**。
- A 级原始数据库确认：主 collection `personal_knowledge_base` 含 **163 个 distinct path、390 个 chunks**，其中 Obsidian 162 文件/385 chunks、OneDrive 1 文件/5 chunks。
- B 级运行记录确认：项目从基础 RAG 升级到只读 Agent；至少完成一次端到端 Agent smoke test，并记录 6 种任务分类。
- B 级结果表确认：存在 **10 个独立验证问题**，结果为 **9 个命中、1 个基本命中**；没有逐次原始响应、运行时间戳或批量执行日志，因此测试轮次、累计执行次数不能扩写。
- 另有 20 问、4 维度的旧“企业知识库问答”样例评审表，但它属于模拟/概念 Demo 的 C 级材料，不能与 10 问真实本地原型相加，也不建议用于 HR 的效果口径。
- 未发现“三组、每组一百多个问题”、600+ 独立样本或 600+ 次测试运行的 A/B 级证据。
- **“约 600”不成立，应放弃。** 最稳对外口径是：163 个文件、390 个知识片段、10 个独立验证问题（9 命中、1 基本命中）、RAG → Agent 两阶段迭代。

## 2. Source Inventory

### 2.1 项目根目录与版本关系

| 层级 | 位置 | 关系 | 时间/版本 | 等级 |
|---|---|---|---|---|
| 当前作品集根目录 | `/Users/frey/Library/Mobile Documents/iCloud~md~obsidian/Documents/Frey's Notes/01 PROJECTS/Resume/AIPM_Resume_2026/ai-product-portfolio` | 当前公开叙事与中英文网页 | Git 2026-04-19 至 2026-07-01，40 commits | B/C |
| 真实原型文档 | `/Users/frey/Library/Mobile Documents/iCloud~md~obsidian/Documents/Frey's Notes/01 PROJECTS/00 Active/本地RAG个人知识库` | 当前企业知识工作台的底层执行原型 | 2026-04-18 至 2026-04-23 | B |
| 本机运行目录 | `/Users/frey/local-rag` | 源码、配置、Chroma 数据库与运行副本 | SQLite mtime 2026-04-23 21:13:09 +0800 | A/B |
| Vault 归档 | `/Users/frey/Library/Mobile Documents/iCloud~md~obsidian/Documents/Frey's Notes/04 ARCHIVES/作品集旧过程/20260524_portfolio_old_process` | 旧版 PRD、结果表、页面与项目包装材料 | 归档于 2026-05-24 | B/C |
| 发布副本 | `/Users/frey/Documents/AIPM作品集/ai-product-portfolio-release` | 当前仓库的导出/发布副本 | 文件副本，不单独计数 | C |
| Git 历史 | 当前仓库 `.git` | 已删除的本地知识助手、企业 RAG、过渡版企业知识工作台文件 | 重点 commits `18ee4079`, `f552954f`, `1f26c994`, `55ad8eaa` | B/C |

版本关系：

1. **V1 真实执行原型**：本地 RAG，完成文档扫描、切块、embedding、Chroma、检索、来源问答与 GUI。
2. **V2 真实最小升级**：只读 Agent，加入任务分类、子查询、向量检索、证据去重、本地 LLM 生成与引用；不是完整多工具生产 Agent。
3. **旧企业知识库问答 Demo**：20 问样例集，主要用于产品方案和边界表达，缺少真实语料与逐次运行原始产物。
4. **当前企业知识工作台包装**：把真实 V1/V2 原型和企业化产品设计合并为作品集叙事；PRD 中的 V3 workflow/eval/versioning 是设计方向，不是已落地运行版本。

### 2.2 核心数据、日志与测试文件

| 文件/数据 | 关键内容 | 定位 | 等级 |
|---|---|---|---|
| `/Users/frey/local-rag/data/chroma/chroma.sqlite3` | 主 collection 390 embeddings；metadata 可按 `path`、`source_type` 去重 | 原始结构化索引 | A |
| `01 PROJECTS/00 Active/本地RAG个人知识库/使用记录.md` | 9 个索引批次、163 文件/390 chunks、smoke tests、Agent 升级 | 运行记录 | B |
| `.../验证问题与结果表_本地知识助手_AgenticRAG.md` | 10 个独立问题；9 命中、1 基本命中 | 汇总结果表，无逐次响应 | B |
| `.../项目包_知识检索与文本生成原型验证_验证问题集与结果表.md` | 20 问、4 类、4 个评分维度、20 行结论 | 模拟企业场景样例评审 | C |
| `.../20260518_old_portfolio_pages/docs/RAG_验证问题集.md` | 上述 20 问中的 8 个展示问题 | 子集/导出版，不重复计数 | C |
| `docs/module1-enterprise-knowledge-workspace/evaluation.md` | 脱敏查询与结果摘要 | 作品集支撑说明 | C |
| `docs/project1-execution-evidence-audit-20260701.md` | 既有证据审计与 Git 历史索引 | 二手审计报告 | B |

上表中两个归档结果表的共同路径前缀为：

`/Users/frey/Library/Mobile Documents/iCloud~md~obsidian/Documents/Frey's Notes/04 ARCHIVES/作品集旧过程/20260524_portfolio_old_process/03_作品集素材202605/99_归档_旧版站点文件/`

### 2.3 当前仓库主要支撑材料

| 相对路径 | 内容 | 等级 |
|---|---|---|
| `docs/module1-enterprise-knowledge-workspace/portfolio-case.md` | 163 文件、390 chunks、10 问结果的作品集复述 | C |
| `docs/module1-enterprise-knowledge-workspace/system-design.md` | 四层架构、检索与回答流程 | C（设计文档） |
| `docs/module1-enterprise-knowledge-workspace/indexing-pipeline.md` | 发现、转换、切块、path refresh、embedding、Chroma | C（设计说明） |
| `docs/module1-enterprise-knowledge-workspace/product-brief.md` | MVP 范围、成功指标与技术取舍 | C |
| `docs/module1-enterprise-knowledge-workspace/examples/config.example.yaml` | 模型、chunk、overlap、top-k 参数样例 | B/C |
| `docs/module1-enterprise-knowledge-workspace/index.html` | 当前中文项目页 | C |
| `en/docs/module1-enterprise-knowledge-workspace/index.html` | 当前英文镜像，不单独计成果 | C |
| `assets/docs/enterprise_knowledge_workspace_product_design_cn.pdf` | 16 页产品设计母稿 | C |
| `assets/docs/enterprise_knowledge_workspace_prd_out_cn_v1.2.pdf` | 13 页对外全图版 | C |
| `docs/module1-enterprise-knowledge-workspace/assets/screenshots/*` | GUI、检索、引用、索引截图 | B/C；支持“做过界面”，不能独立支持效果百分比 |

### 2.4 Git 中已删除但相关的材料

| Git 对象 | 内容 | 判断 | 等级 |
|---|---|---|---|
| `18ee4079:docs/local-knowledge-rag/index.html` | 10 问、9+1、约 8/10 可用性、V1→V2 | 旧页面；数字需回原始记录 | C |
| `18ee4079:docs/local-knowledge-rag/本地知识助手_RAG到AgenticRAG_产品设计文档.md` | 详细本地 RAG/Agent 母版 | 设计与总结 | C |
| `18ee4079:docs/enterprise-rag/index.html` | 旧企业知识库问答页面、20 问 | 模拟/概念 Demo | C |
| `f552954f^:docs/02_RAG_PRD.md` | 20 问与“19 个基本可用以上”自述 | 无原始运行日志，不对外使用 | C |
| `f552954f:docs/module1-enterprise-knowledge-workspace/企业知识工作台_RAG到Agent工作流_产品设计文档.md` | 迁移期企业知识工作台版本 | 过渡包装版本 | C |

### 2.5 未发现

- 未发现 JSON/JSONL/CSV/XLSX 格式的批量测试结果。
- 未发现逐问题的原始模型回答、trace、运行 ID、时间戳、自动评测输出或三轮回归日志。
- 未发现可证明 100+ 独立问题、三组问题集或 600+ 次执行的文件。
- Downloads/Desktop 未发现项目相关独立导出；Documents 仅发现发布副本。
- 未发现 reranker 的实际实现或评估证据。

## 3. Verified Metrics

| 指标 | 数值 | 口径 | 证据 | 置信度 |
|---|---:|---|---|---|
| 原始候选文件 | 744 | 2026-04-18 扫描发现：Obsidian 158 + OneDrive 586；**不是已导入数** | `使用记录.md:399-403` | B，高 |
| 成功索引文件 | 163 | 主 collection 中 distinct `path` | `chroma.sqlite3`；`使用记录.md:324-331` | A，最高 |
| 文档类型分布 | 162 Obsidian Markdown + 1 OneDrive DOCX | 主 collection 按 `source_type`/path 统计；记录第 331 行写“2 个”与数据库冲突，以数据库 distinct path 为准 | SQLite metadata；`使用记录.md:326-336` | A，高；日志有一处笔误 |
| Chunk 数 | 390 | 主 collection `personal_knowledge_base` 的 embedding 记录；不含 `smoke_test` 13 条 | SQLite `embeddings` + `segments` + `collections` | A，最高 |
| Chunk 来源分布 | 385 Obsidian + 5 OneDrive | 主 collection 按 `source_type` | SQLite metadata；`使用记录.md:326-328` | A，最高 |
| 去重前 Chunk 数 | 无法确认 | 没有保存切块前/刷新前的完整原始计数；曾估算 383，不是最终原始数 | `使用记录.md:205-209` | — |
| 索引记录数 | 390 | 在该 Chroma schema 中，主 collection 一条 embedding 对应一个 chunk 索引记录 | SQLite | A，最高 |
| 索引批次 | 9 批 Obsidian + 早期极小/OneDrive smoke tests | 运行记录明确列出第 2 至第 9 批及初始批；不等于同步次数 | `使用记录.md:237-336, 382-415` | B，高 |
| 独立测试问题 | 10 | 本地真实原型验证表中的 10 行不同问题 | `验证问题与结果表...md:17-30` | B，高 |
| 测试问题分类 | 10 个场景标签 | 每题一个场景：文件管理、AI 协作、RAG 使用等；不是统计学分类体系 | 同上 | B，中高 |
| 测试轮次 | 至少 1 次汇总验证；确切轮次无法确认 | 只有一张结果表，无逐轮日志 | 同上 | B/缺失 |
| 每轮执行问题数 | 无法确认 | 10 问结果表未记录是否同轮执行 | 同上 | — |
| 累计测试执行次数 | 无法确认 | 没有 run ID 或逐次日志，不能把问题数当运行次数 | 全局搜索未发现 | — |
| 重复执行/跨版本回归 | 无法确认 | 有“后续增加 20 个固定回归问题”的计划，但无完成记录 | `验证问题与结果表...md:51-56` | — |
| 检索结果 | 9 命中 + 1 基本命中 | 10 问汇总中的人工结果标签 | `验证问题与结果表...md:19-30` | B，高 |
| 人工评估项 | 10 个检索结果判断 | 每个问题一个“结果”判断；不能扩成多维评估项 | 同上 | B，高 |
| 自动评估项 | 无法确认 | 未发现自动评测脚本或输出 | 全局搜索未发现 | — |
| 引用准确率/幻觉率 | 无法确认 | 10 问表没有逐题引用/幻觉字段 | — | — |
| Router 正确率 | 无法确认 | 仅有 1 个 Agent smoke test 和 6 类规则，无批量路由结果 | `使用记录.md:13-60` | — |
| 工具调用成功 | 至少 1 次端到端 Agent smoke test | `/api/agent` 返回 task_type/plan/answer/rows/next_actions | `使用记录.md:39-60` | B，高 |
| Bad Case 数 | 无法确认 | 有若干问题类型与优化案例，但没有结构化、去重后的执行 bad-case 清单 | PRD/复盘材料 | — |
| 修复后通过/回归通过 | 无法确认 | 无前后逐题结果 | — | — |
| 已执行产品版本 | 2 个阶段 | V1 基础 RAG；V2 最小只读 Agent。PRD V3 不算已执行 | `使用记录.md:13-65, 382-429` | B，高 |
| Router 规则/任务类型 | 6 | `interview_prep`, `brief`, `compare`, `index_review`, `ai_research`, `research` | `使用记录.md:20-27`; `/Users/frey/local-rag/scripts/agent.py:26-38` | B/A，高 |
| Agent 工具/处理节点 | 3 类核心节点 | `vector_search`, `evidence_ranker`, `ollama_chat`；planner 是内部步骤，不冒充外部工具 | `agent.py:182-228` | A，高 |
| 人工确认闸门 | 1 类总闸门 | 写文件/改笔记/外部动作只建议、不执行；写文件或重建索引需人工确认 | `agent.py:111-116,147-166`; `使用记录.md:61-65` | A/B，高 |
| Python 脚本数 | 8 | `/Users/frey/local-rag/scripts/*.py`；工程规模补充，不是效果数据 | 文件系统计数 | A，高 |
| 作品集 Git commits | 40 | 整个作品集仓库全部 commits，并非项目 1 独占 | `git rev-list --all --count` | A，高但不可作项目效果 |
| 开发/迭代时间 | 2026-04-18 至 2026-04-23（真实原型集中开发）；作品集包装至 2026-07-01 | 运行记录与 Git 历史 | B，高 |

## 4. Calculation Notes

### 4.1 去重规则

1. `Documents/AIPM作品集/ai-product-portfolio-release` 视为当前仓库发布副本，不重复计成果。
2. 中文/英文网页、PDF brief、截图导出只算同一项目的不同表达，不算独立版本或测试。
3. 10 问本地原型表与 20 问企业 Demo 表属于不同项目阶段与证据等级，不能相加为 30 个“真实测试问题”。
4. `RAG_验证问题集.md` 的 8 问是 20 问表的展示子集，不另计。
5. SQLite 中 `smoke_test` collection 的 13 chunks 与主 collection 分离，不并入 390；否则会错误得到 403。
6. 主 collection 按 metadata `path` 去重得到 163 个文件；chunk/embedding 记录数为 390，不能与文件数相加成“数据量”。
7. 10 个问题的 9+1 结果是 10 个检索判断，不是 10×多个维度的评估项。

### 4.2 数字之间不能相加

- 163 文件 + 390 chunks = 553 个不同口径对象，不是 553 条测试数据。
- 390 chunks + 10 问 = 400，也不是累计测试量。
- 初始扫描的 744 个候选文件中只有 163 个进入主索引；586 个 OneDrive 候选不能冒充导入数据。
- 20 问企业 Demo 若按 4 个评分字段可形成 80 个表格评分单元，但这是 C 级设计/总结材料，既不是 80 个样本，也不能与真实原型 10 问合并。
- 多次 smoke test 说明链路被反复验证，但缺少逐次 run 记录，不能推导累计运行次数。

### 4.3 缺失与冲突

- `使用记录.md:329-331` 写总文件 163、Obsidian 162、OneDrive 2，分项相加为 164。SQLite 主 collection 显示 162 + 1 = 163，因此采用 A 级数据库结果，并将日志中的“2”判为笔误或口径残留。
- 作品集旧页声称“回答可用性约 8/10”，但 10 问表没有逐题“回答可用性”字段与原始回答，故仅列为 C 级，不放 HR 文案。
- 20 问企业 Demo 有完整评分表，但缺少真实输入语料、模型输出、运行时间戳与执行日志；不能把表格完整度等同于真实实验强度。
- 未保存去重前的最终 chunk 快照，也未发现同步次数或索引更新时间序列。

## 5. Interpretation of the “600+” Statement

| 候选解释 | 是否支持 | 结论 |
|---|---|---|
| 600 多个独立测试样本 | 否 | 仅确认 10 个真实原型独立问题；另有 20 问 C 级模拟 Demo |
| 600 多次累计测试执行 | 否 | 无逐次运行日志或 run ID |
| 600 多个评估项 | 否 | A/B 级仅确认 10 个检索结果判断 |
| 600 多条日志记录 | 否 | 未发现结构化运行日志集合 |
| 600 多个知识片段 | 否 | 主 collection 为 390；即使错误加入 smoke-test 也只有 403 |
| 无法支持 600 这一说法 | **是** | 这是唯一符合证据的判断 |

最可能的口误来源是把“候选文件、已索引文件、chunks、问题数、重复 smoke tests 或评估维度”混合记忆，但现有证据无法重建一个合法的 600+ 口径。对外应彻底放弃“600 多”，不要改称“约 600 条数据”。

安全修正：**“我刚才把知识库规模、测试问题和评估维度混在一起描述了。重新核对原始记录后，准确口径是 163 个已索引文件、390 个知识片段，以及 10 个独立验证问题；这些问题是项目测试数据，不是真实企业用户数据。”**

## 6. HR Message — Recommended Version

您好，补充一下今天提到的企业知识工作台项目数据：这是个人原型的项目评估数据，并非真实企业用户数据。原型实际索引 163 个文件、生成 390 个知识片段；我用 10 个独立任务问题做检索验证，结果为 9 个命中、1 个基本命中。项目从基础 RAG 迭代到只读 Agent 工作流，并保留来源复核和人工确认边界。如需要，我可以继续提供评估说明或作品集链接。

## 7. HR Message — Correction Version

您好，补充澄清一下刚才的口头数据：我当时把知识库规模、测试问题和评估项合并描述了，所以“600 多”这个说法不够准确。重新核对原始记录后，准确口径是：原型索引 163 个文件、生成 390 个知识片段，并用 10 个独立任务问题做验证，结果为 9 个命中、1 个基本命中。这些是个人项目测试数据，不是真实企业用户数据；如需要，我可以补充评估说明或作品集链接。

## 8. Follow-up Interview Talking Points

### 8.1 这些数据是真实用户数据吗？

不是。163 个文件和 390 个 chunks 来自个人 Obsidian/本地资料原型；10 个问题来自真实个人知识任务，但不是企业客户、线上用户或生产流量。企业场景部分是脱敏后的产品设计与模拟验证。

### 8.2 600 条具体指什么？

这个数字应撤回。口头表达混合了文件、知识片段、测试问题和评估维度。核验后没有任何单一口径达到 600；准确数字是 163 文件、390 chunks、10 个独立问题。

### 8.3 独立测试问题有多少？

有 A/B 级支持的是 10 个，覆盖文件管理、规则查找、项目复盘、迁移、隐私等 10 个任务场景。另有 20 问企业场景设计集，但它是模拟 Demo 材料，不能说成真实运行样本。

### 8.4 如何判断项目效果提升？

当前能确认的是 10 问中 9 个命中、1 个基本命中，以及索引、检索、带来源回答和 Agent smoke test 链路跑通。没有前后版本同题回归数据，因此不能宣称提升了某个百分比。更诚实的说法是：通过 bad-case 分层定位，推动了 path refresh、chunk 合并、来源筛选、只读 Agent 和人工确认边界等迭代。

### 8.5 为什么没有真实企业用户？

这是为验证产品判断和端到端闭环搭建的个人原型，不具备企业权限、合规、数据接入和真实组织部署条件。因此我主动把边界设为本地、只读、可追溯，并用模拟企业场景验证产品结构；下一阶段若进入企业环境，应先做权限、数据治理和小范围用户试点。

## 9. Reproducible Checks

### 9.1 主 collection 文件与 chunk 计数

```sql
SELECT c.name,
       COUNT(DISTINCT CASE WHEN m.key='path' THEN m.string_value END) AS files,
       COUNT(DISTINCT e.id) AS chunks
FROM embeddings e
JOIN segments s ON e.segment_id=s.id
JOIN collections c ON s.collection=c.id
JOIN embedding_metadata m ON m.id=e.id
GROUP BY c.name;
```

审计结果：

| collection | files | chunks |
|---|---:|---:|
| `personal_knowledge_base` | 163 | 390 |
| `smoke_test` | 1 | 13 |

### 9.2 主 collection 来源分布

```sql
SELECT c.name, m.string_value AS source_type,
       COUNT(DISTINCT e.id) AS chunks,
       COUNT(DISTINCT p.string_value) AS files
FROM embeddings e
JOIN segments s ON e.segment_id=s.id
JOIN collections c ON s.collection=c.id
JOIN embedding_metadata m ON m.id=e.id AND m.key='source_type'
JOIN embedding_metadata p ON p.id=e.id AND p.key='path'
GROUP BY c.name, m.string_value;
```

主 collection 结果：Obsidian 162 文件/385 chunks；OneDrive 1 文件/5 chunks。

### 9.3 Git 范围

- `git rev-list --all --count` → 40。
- 最早 commit：`a4e5eb4`，2026-04-19。
- 最新审计时 commit：`55ad8ea`，2026-07-01。
- Git commit 数仅代表整个作品集仓库的包装与网页迭代，不用于证明模型或产品效果。
