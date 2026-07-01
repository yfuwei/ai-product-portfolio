# Project 1 Proof of Execution Restructure Plan

## 1. Goal

本轮改版目标不是继续证明项目 1 的产品判断已经足够成熟，而是让项目 1 承担一个更直接的证据角色：

> 证明这个 AI 产品原型真的被设计过、搭建过、跑过、验证过，并且在本地部署、索引、检索、引用回答、Agent 控制层和 badcase 复盘上留下了可追溯证据。

当前项目 1「企业知识工作台」已经较好地表达了“为什么企业知识需要可信上下文层”，但对招聘方来说，还需要更明确地回答：

- 这是不是只是一套概念页面？
- 有没有真实实现栈？
- 有没有跑过本地索引和检索？
- 有没有验证数字？
- 有没有遇到过真实 badcase，并做出产品判断？
- 候选人是否懂从 RAG demo 走向可控 AI 产品原型的工程边界？

因此，建议在不推翻现有页面主线的前提下，新增 3 个 `Proof of Execution` 模块：

1. `Prototype Implementation Snapshot`
2. `Indexing & Retrieval Pipeline`
3. `Validation & Badcase Evidence`

这 3 个模块的作用是补齐“做过 / 跑过 / 验证过”的证据，而不是把页面改回纯技术 Demo。RAG 仍然作为可信上下文基础设施出现，不作为最终产品价值主角。

## 2. Current Page Diagnosis

对照当前页面：

- `docs/module1-enterprise-knowledge-workspace/index.html`
- `docs/project1-execution-evidence-audit-20260701.md`

当前页面已经具备的优势：

- Hero 已清楚表达项目不是知识库问答机器人，而是让企业知识进入可信工作流。
- `01｜业务问题` 能说明企业不是缺知识，而是知识不能被可信使用。
- `02｜贯穿样例 / 用户任务` 能把用户任务从“问 AI”转成“完成业务判断材料”。
- `03｜可信上下文层` 已经定义上下文卡、来源、权限、版本、引用、适用范围和人审入口。
- `04｜AI / RAG 接入前后` 已经把 RAG 定位为候选上下文组织机制，而不是替人判断。
- `05｜核心产品对象` 已经把知识来源、上下文卡、知识任务、复盘确认、知识更新拆成产品对象。
- `06｜关键界面 / 工作流` 已经有工作台首页、检索与引用、项目复盘、知识任务问答等低保真页面。
- `07｜产品架构判断` 已经表达“不要让 Agent 裸连知识库”。
- `08｜产品演进路径` 已经表达从 RAG 到可信上下文再到 Agent 工作流的演进。
- `09｜验证方式 / 边界` 已经有验证维度、badcase、回流、评估看板。
- `10｜项目总结` 已经收束为可信工作流机制。

当前页面过于宏观的地方：

- 页面多次讲“可信上下文”，但较少说明这个原型实际怎么跑起来。
- 页面呈现了界面原型，但缺少本地运行栈：`Ollama`, `embeddinggemma`, `qwen3:0.6b`, `Chroma`, `FastAPI GUI`。
- 页面呈现了工作流，但缺少索引链路：ingestion、文档转换、chunk、embedding、Chroma 写入、top_k 检索、引用回答。
- 页面讲验证边界，但缺少真实验证数字：`163 files`, `390 chunks`, `10 task questions`, `9+1 recall`, `8/10 usefulness`。
- 页面讲 badcase/eval，但缺少具体 badcase：误召回、长文档总结片面、Router 误判、写回风险、来源不足不强答。
- 页面没有展示本地运行约束：2020 Intel i5 / 16GB / no GPU、分批索引、低配机器上索引慢但检索可用。
- 页面没有把“只读边界 / 不自动写入 / 来源不足不强答”作为原型控制规则明确展示。

结论：

当前项目 1 的产品判断已经够强，但 proof of execution 不够硬。建议新增证据层，让页面同时具备：

- 产品判断：为什么需要可信上下文。
- 原型实现：怎么本地跑起来。
- 数据链路：资料如何进入索引和回答。
- 验证证据：跑过多少文件、多少 chunks、哪些问题命中。
- badcase 判断：哪些地方失败过，如何控制风险。

## 3. Recommended Content Additions

### 3.1 Prototype Implementation Snapshot

建议放置位置：

- 首选：放在 `06｜关键界面 / 工作流` 之后、`07｜产品架构判断` 之前。
- 理由：`06` 已经展示界面原型，接着补“这个原型背后的本地实现快照”最自然；然后再进入 `07` 的 Agent 架构判断。
- 导航建议：可作为 `07｜原型实现快照`，原有 `07–10` 后续顺延；或不改导航编号，作为 `06` 末尾的证据块。

该模块解决什么招聘方疑问：

- 这是不是只是一组概念图？
- 有没有真实技术栈和本地运行环境？
- 候选人是否真的把 RAG 原型跑起来，而不是只画了产品流程？
- 是否理解低配本地模型、向量库、GUI 和隐私边界之间的取舍？

推荐标题：

- 主标题：`原型实现快照：这个工作台不是只停在概念图`
- 英文备用：`Prototype Implementation Snapshot`
- 小标题可选：
  - `本地运行栈`
  - `硬件约束`
  - `原型边界`

推荐内容结构：

1. 一句话说明：这是本地可跑的产品级原型，不是企业生产系统。
2. 四列或四张小卡：
   - Runtime：Ollama / local LLM
   - Retrieval Store：Chroma
   - UI：FastAPI GUI
   - Hardware：2020 Intel i5 / 16GB / no GPU
3. 一组实现事实：
   - 本地运行、本地索引、本地检索。
   - embedding 使用 `embeddinggemma`。
   - 轻量回答模型使用 `qwen3:0.6b`。
   - 本地 Chroma 保存向量索引。
   - FastAPI + 原生 Web GUI 降低命令行门槛。
4. 一组边界：
   - 不上传私人笔记、embedding、Chroma、转换缓存和日志。
   - 不声称企业生产部署。
   - 写入、删除、同步、发布类动作不自动执行。

可直接引用的源文件路径：

- `docs/project1-execution-evidence-audit-20260701.md`
- `docs/module1-enterprise-knowledge-workspace/system-design.md`
- `docs/module1-enterprise-knowledge-workspace/examples/config.example.yaml`
- `docs/module1-enterprise-knowledge-workspace/hardware-constraints.md`
- `docs/module1-enterprise-knowledge-workspace/privacy-and-security.md`
- `docs/module1-enterprise-knowledge-workspace/portfolio-case.md`
- `git:18ee4079:docs/local-knowledge-rag/index.html`

推荐中文文案草稿：

```text
原型实现快照：这个工作台不是只停在概念图

项目 1 的底层验证来自一个本地可运行的 RAG / Agentic RAG 原型。它不是企业生产系统，也不包装成已上线平台；它的价值在于验证一条最小闭环：本地资料能被索引，问题能被检索，回答能带来源，用户能回到原文复核。

原型运行在 2020 款 Intel i5 MacBook Pro，16GB 内存，无独立 GPU。为了适配低配本地环境，方案选择轻量本地链路：Ollama 负责本地模型调用，embedding 使用 embeddinggemma，轻量回答模型使用 qwen3:0.6b，向量存储使用 Chroma，交互层使用 FastAPI + 原生 Web GUI。

这套原型的重点不是追求模型能力上限，而是验证企业知识工作台最基础的可信链路：
资料留在本地，索引留在本地，检索结果带路径、标题、片段和来源，回答只作为可复核初稿。

实现边界：
- 本地运行：笔记、embedding、Chroma、转换缓存和日志不上传云端。
- 本地索引：支持 Obsidian Markdown 和选定本地文档。
- 本地检索：先召回 chunks，再组织带来源回答。
- 默认只读：不自动写入、删除、同步或发布内容。
- 非生产声明：这是产品级原型 / 可演示 MVP，不声称企业生产部署。
```

### 3.2 Indexing & Retrieval Pipeline

建议放置位置：

- 首选：放在 `Prototype Implementation Snapshot` 后面，作为同一组 `Proof of Execution` 的第二个 section。
- 备选：插入 `04｜AI / RAG 接入前后` 之后，因为该 section 已经解释 RAG 的产品角色，紧接着展示数据 pipeline 可以把抽象判断落地。

该模块解决什么招聘方疑问：

- 资料是怎么进入系统的？
- 是否真的有 ingestion/index/retrieval 流程？
- chunk、embedding、Chroma、top_k、citation 是否只是概念词？
- 是否考虑过文档更新后旧 chunks 污染？
- 是否能处理多种文件类型？

推荐标题：

- 主标题：`索引与检索链路：从文件到带引用回答`
- 英文备用：`Indexing & Retrieval Pipeline`
- 小标题可选：
  - `Ingestion`
  - `Chunking`
  - `Retrieval`
  - `Answer with Citation`

推荐内容结构：

1. 用 6 步 pipeline 表达：
   - 发现文件
   - 读取 / 转换文档
   - chunk 切分
   - 本地 embedding
   - 写入 Chroma
   - top_k 检索 + answer with citation
2. 补参数：
   - 支持 `.md`, `.txt`, `.docx`, `.pdf`, `.pptx`
   - `chunk_target_chars: 1200`
   - `chunk_overlap_chars: 150`
   - `top_k: 5`
3. 补维护策略：
   - 按 `path` 删除旧 chunks 后写入新 chunks。
   - 使用 `offset`, `limit`, `max-chunks` 支持低配机器分批索引。
4. 补产品判断：
   - 先检索，再回答。
   - 检索质量不可靠时，生成答案也不可靠。
   - answer with citation 是为了让用户复核，不是为了让 AI 看起来更聪明。

可直接引用的源文件路径：

- `docs/project1-execution-evidence-audit-20260701.md`
- `docs/module1-enterprise-knowledge-workspace/indexing-pipeline.md`
- `docs/module1-enterprise-knowledge-workspace/system-design.md`
- `docs/module1-enterprise-knowledge-workspace/diagrams/indexing-flow.mmd`
- `docs/module1-enterprise-knowledge-workspace/diagrams/query-flow.mmd`
- `docs/module1-enterprise-knowledge-workspace/examples/config.example.yaml`
- `docs/module1-enterprise-knowledge-workspace/product-brief.md`

推荐中文文案草稿：

```text
索引与检索链路：从文件到带引用回答

这个原型先验证的不是“模型会不会回答”，而是资料能不能稳定进入一个可复核的检索链路。MVP 的核心 pipeline 是：

1. Ingestion：从配置中读取允许索引的 Obsidian 笔记和本地文档。
2. Conversion：直接读取 Markdown / TXT，并将 DOCX、PDF、PPTX 转为文本或 Markdown。
3. Chunking：按结构和目标长度切分 chunks，避免标题很多的文档被切成过碎片段。
4. Embedding：通过 Ollama 在本地生成 embedding。
5. Vector Store：写入本地 Chroma，并保留路径、标题、章节、source_type 等元数据。
6. Answer with Citation：用户提问时先召回 top_k chunks，再基于召回片段组织回答，并展示来源路径和片段。

脱敏配置快照：
- 支持文件类型：md / txt / docx / pdf / pptx
- chunk_target_chars：1200
- chunk_overlap_chars：150
- top_k：5
- embedding_model：embeddinggemma
- llm_model：qwen3:0.6b
- vector store：Chroma

索引维护策略：
当某个文件重新索引时，系统会先按 path 删除旧 chunks，再写入新 chunks，避免笔记或文档更新后留下过期片段。低配机器上，全量索引可能较慢，因此原型支持 offset / limit / max-chunks 等分批控制参数，把“慢慢跑的索引任务”和“日常使用的检索体验”分开。

产品判断：
RAG 在这里不是卖点，而是可信上下文基础设施。它的职责是把资料范围、来源位置、引用片段和更新状态显性化，让回答可以被复核。
```

### 3.3 Validation & Badcase Evidence

建议放置位置：

- 首选：合并进 `09｜验证方式 / 边界`，作为该 section 的前半部分或后半部分。
- 备选：放在 `Indexing & Retrieval Pipeline` 后面，形成完整 proof chain：实现快照 -> pipeline -> 验证和 badcase。

该模块解决什么招聘方疑问：

- 原型有没有跑过真实问题？
- 不是只做通路 demo，是否有结果数字？
- 失败时是否知道问题出在哪里？
- 是否有产品层面的风险控制，而不是只调模型？
- 是否理解 Agent 不是越主动越好，而是要有只读边界和人工确认？

推荐标题：

- 主标题：`验证与 badcase：让可信上下文从口号变成检查项`
- 英文备用：`Validation & Badcase Evidence`
- 小标题可选：
  - `Validation Snapshot`
  - `Observed Badcases`
  - `Control Rules`

推荐内容结构：

1. 数字快照：
   - `163 files`
   - `390 chunks`
   - `10 task questions`
   - `9+1 recall`
   - `8/10 usefulness`
2. 测试覆盖：
   - 协作规则
   - GUI 使用
   - 索引维护
   - 换电脑迁移
   - 项目介绍
   - 公开封装
   - 跨项目召回
3. badcase 表：
   - 误召回：语义相似不等于业务相关。
   - 长文档总结片面：基础 RAG 对长文档总结需要结构化策略。
   - Router 误判：Agent 第一步是路径判断，Router 错了后面都错。
   - 写回风险：默认只读，写入前必须预览和确认。
   - 来源不足不强答：证据不足时提示不足，不生成看似完整的答案。
4. 控制规则：
   - Top-K 是否召回正确来源。
   - 回答是否基于来源。
   - 是否能回到原文路径和片段。
   - 需要本地证据时是否调用检索。
   - 写入、删除、同步、发布类动作是否进入人工确认。

可直接引用的源文件路径：

- `docs/project1-execution-evidence-audit-20260701.md`
- `docs/module1-enterprise-knowledge-workspace/portfolio-case.md`
- `docs/module1-enterprise-knowledge-workspace/evaluation.md`
- `docs/module1-enterprise-knowledge-workspace/product-brief.md`
- `git:18ee4079:docs/local-knowledge-rag/index.html`
- `git:18ee4079:docs/local-knowledge-rag/本地知识助手_RAG到AgenticRAG_产品设计文档.md`
- `git:18ee4079:docs/enterprise-rag/index.html`

推荐中文文案草稿：

```text
验证与 badcase：让可信上下文从口号变成检查项

这个原型不是只验证“能不能生成答案”，而是验证资料能否被找到、来源能否被追溯、回答是否基于证据、Agent 是否判断对路径，以及高风险动作是否被挡在人工确认之前。

验证快照：
- 已索引文件：163
- 总 chunks：390
- 代表性任务问题：10
- 来源召回：9 条命中，1 条基本命中
- 回答可用性：约 8/10

验证问题覆盖协作规则、GUI 使用、索引维护、换电脑迁移、项目介绍、公开封装和跨项目召回。评估重点不是回答是否流畅，而是：正确来源是否进入 Top-K，回答是否基于来源，用户是否能回到原文复核，Agent 是否在需要资料时调用检索。

观察到的 badcase：

1. 语义相近导致误召回
   - 现象：项目介绍类问题可能召回其他 RAG 项目资料。
   - 判断：相似度高不等于业务相关。
   - 处理方向：增加 project_name、source_type、path 等元数据约束，并支持来源筛选。

2. 长文档总结片面
   - 现象：总结产品设计文档时，只覆盖某个章节。
   - 判断：基础 RAG 更适合局部问答；长文档总结需要结构化摘要和目录策略。
   - 处理方向：总结类问题优先召回目录、章节摘要和关键段落。

3. Router 误判
   - 现象：“我这个项目怎么讲”被误判为 direct，没有检索本地资料。
   - 判断：Agent 的第一步不是执行，而是正确判断任务路径；Router 错了，后面的 Tool 和回答都会错。
   - 处理方向：给 Router 增加本地资料信号规则，低置信时先澄清。

4. 写回风险
   - 现象：用户要求写回 Obsidian 或更新资料时，存在误写和覆盖风险。
   - 判断：Agent 能力边界必须先于能力扩展。
   - 处理方向：默认只读；写入、删除、同步、发布类动作必须先预览并人工确认。

5. 来源不足不强答
   - 现象：召回证据不足时，模型仍可能生成看似完整的回答。
   - 判断：企业知识场景里，错误但流畅的答案比“不知道”更危险。
   - 处理方向：当引用不足以支撑结论时，提示资料不足、缩小范围或转人工判断。

这组验证的意义不是证明系统已经成熟，而是说明这个原型已经从“能跑 demo”推进到“有问题集、有判断标准、有 badcase、有边界控制”的 AI 产品验证阶段。
```

## 4. Existing Sections to Keep / Compress / Modify

| 当前 section | 当前作用 | 建议动作 | 具体说明 |
|---|---|---|---|
| `00｜Hero / 项目 01｜企业知识工作台` | 定义项目立场：不是知识库问答机器人，而是可信上下文工作流 | 保留，小幅增强 | 可在 Hero 或 Hero 下方增加一句“本页包含本地原型实现、索引链路和验证快照”，但不必大改 |
| `01｜业务问题` | 解释企业不是缺知识，而是知识不能被可信使用 | 保留 | 不建议改；这是项目判断的根基 |
| `02｜贯穿样例 / 用户任务` | 把用户任务从“问 AI”转成“准备业务判断材料” | 保留 | 不建议塞技术证据，避免破坏任务叙事 |
| `03｜可信上下文层` | 定义上下文卡和进入工作流前的校验门 | 保留 | 可补一句“上下文卡里的来源与片段来自索引检索链路”，但不是主要插入点 |
| `04｜AI / RAG 接入前后` | 说明 RAG 改变上下文组织，不替人判断 | 保留，小幅插入 | 可补一句“原型中 RAG 的职责是 retrieval/citation，不是最终产品价值” |
| `05｜核心产品对象` | 定义知识来源、上下文卡、知识任务、复核更新等对象 | 保留 | 不建议改；对象定义已经清楚 |
| `06｜关键界面 / 工作流` | 展示低保真界面和工作流落地 | 插入落地证据 | 建议在本 section 后新增 `Prototype Implementation Snapshot` 和 `Indexing & Retrieval Pipeline` |
| `07｜产品架构判断` | 表达不要让 Agent 裸连知识库 | 保留 | 新增实现证据后，这一节会更有说服力；不需要大改 |
| `08｜产品演进路径` | 表达 V1/V2/V3 不是堆功能，而是可信度提升 | 保留，必要时压缩 | 如果页面过长，可压缩解释文字，但保留演进图 |
| `09｜验证方式 / 边界` | 当前有验证维度和评估看板，但偏原则 | 强化 | 把 `Validation & Badcase Evidence` 放进这里最合适，补数字、badcase 和控制规则 |
| `10｜项目总结` | 收束为可信工作流机制 | 保留 | 不建议改；新增证据会自然支撑总结 |

推荐页面结构调整：

```text
00 Hero
01 业务问题
02 贯穿样例 / 用户任务
03 可信上下文层
04 AI / RAG 接入前后
05 核心产品对象
06 关键界面 / 工作流
07 原型实现快照（新增）
08 索引与检索链路（新增）
09 产品架构判断
10 产品演进路径
11 验证与 badcase（强化 / 新增）
12 项目总结
```

如果不想大幅改编号，也可以不重排导航：

```text
06 关键界面 / 工作流
  - 新增：Proof of Execution block
  - 新增：Indexing & Retrieval Pipeline block
09 验证方式 / 边界
  - 新增：Validation Snapshot
  - 新增：Observed Badcases
```

## 5. Reusable Source Mapping

| 新增证据 | 建议使用位置 | 具体来源文件路径 |
|---|---|---|
| Ollama 本地模型调用 | Prototype Implementation Snapshot | `docs/module1-enterprise-knowledge-workspace/diagrams/architecture.mmd`; `docs/module1-enterprise-knowledge-workspace/indexing-pipeline.md`; `docs/project1-execution-evidence-audit-20260701.md` |
| embeddinggemma | Prototype Implementation Snapshot / Pipeline | `docs/module1-enterprise-knowledge-workspace/examples/config.example.yaml`; `docs/project1-execution-evidence-audit-20260701.md` |
| qwen3:0.6b | Prototype Implementation Snapshot | `docs/module1-enterprise-knowledge-workspace/examples/config.example.yaml`; `docs/project1-execution-evidence-audit-20260701.md` |
| Chroma | Prototype Implementation Snapshot / Pipeline | `docs/module1-enterprise-knowledge-workspace/system-design.md`; `docs/module1-enterprise-knowledge-workspace/indexing-pipeline.md`; `docs/module1-enterprise-knowledge-workspace/examples/config.example.yaml` |
| FastAPI GUI | Prototype Implementation Snapshot | `docs/module1-enterprise-knowledge-workspace/system-design.md`; `docs/module1-enterprise-knowledge-workspace/portfolio-case.md`; `git:18ee4079:docs/local-knowledge-rag/index.html` |
| 2020 Intel i5 / 16GB / no GPU | Prototype Implementation Snapshot | `docs/module1-enterprise-knowledge-workspace/hardware-constraints.md` |
| 本地运行、本地索引、本地检索 | Prototype Implementation Snapshot | `docs/module1-enterprise-knowledge-workspace/product-brief.md`; `docs/module1-enterprise-knowledge-workspace/privacy-and-security.md`; `docs/module1-enterprise-knowledge-workspace/hardware-constraints.md` |
| 支持 md / txt / docx / pdf / pptx | Indexing & Retrieval Pipeline | `docs/module1-enterprise-knowledge-workspace/indexing-pipeline.md`; `docs/module1-enterprise-knowledge-workspace/examples/config.example.yaml`; `docs/module1-enterprise-knowledge-workspace/product-brief.md` |
| chunk 1200 / overlap 150 / top_k 5 | Indexing & Retrieval Pipeline | `docs/module1-enterprise-knowledge-workspace/examples/config.example.yaml` |
| 按 path 刷新旧 chunks | Indexing & Retrieval Pipeline | `docs/module1-enterprise-knowledge-workspace/indexing-pipeline.md`; `docs/module1-enterprise-knowledge-workspace/system-design.md` |
| answer with citation | Indexing & Retrieval Pipeline / Validation | `docs/module1-enterprise-knowledge-workspace/product-brief.md`; `docs/module1-enterprise-knowledge-workspace/system-design.md`; `docs/module1-enterprise-knowledge-workspace/portfolio-case.md` |
| 163 files | Validation & Badcase Evidence | `docs/module1-enterprise-knowledge-workspace/portfolio-case.md`; `docs/project1-execution-evidence-audit-20260701.md` |
| 390 chunks | Validation & Badcase Evidence | `docs/module1-enterprise-knowledge-workspace/portfolio-case.md`; `git:18ee4079:docs/local-knowledge-rag/本地知识助手_RAG到AgenticRAG_产品设计文档.md` |
| 10 task questions | Validation & Badcase Evidence | `git:18ee4079:docs/local-knowledge-rag/index.html`; `git:18ee4079:docs/local-knowledge-rag/本地知识助手_RAG到AgenticRAG_产品设计文档.md`; `docs/project1-execution-evidence-audit-20260701.md` |
| 9+1 recall | Validation & Badcase Evidence | `git:18ee4079:docs/local-knowledge-rag/index.html`; `git:18ee4079:docs/local-knowledge-rag/本地知识助手_RAG到AgenticRAG_产品设计文档.md`; `docs/project1-execution-evidence-audit-20260701.md` |
| 8/10 usefulness | Validation & Badcase Evidence | `git:18ee4079:docs/local-knowledge-rag/index.html`; `git:18ee4079:docs/local-knowledge-rag/本地知识助手_RAG到AgenticRAG_产品设计文档.md`; `docs/project1-execution-evidence-audit-20260701.md` |
| 误召回 | Validation & Badcase Evidence | `git:18ee4079:docs/local-knowledge-rag/index.html`; `git:18ee4079:docs/local-knowledge-rag/本地知识助手_RAG到AgenticRAG_产品设计文档.md` |
| 长文档总结片面 | Validation & Badcase Evidence | `git:18ee4079:docs/local-knowledge-rag/index.html`; `git:18ee4079:docs/local-knowledge-rag/本地知识助手_RAG到AgenticRAG_产品设计文档.md` |
| Router 误判 | Validation & Badcase Evidence | `git:18ee4079:docs/local-knowledge-rag/index.html`; `git:18ee4079:docs/local-knowledge-rag/本地知识助手_RAG到AgenticRAG_产品设计文档.md` |
| 写回风险 | Validation & Badcase Evidence | `git:18ee4079:docs/local-knowledge-rag/index.html`; `git:18ee4079:docs/local-knowledge-rag/本地知识助手_RAG到AgenticRAG_产品设计文档.md`; `docs/module1-enterprise-knowledge-workspace/privacy-and-security.md` |
| 来源不足不强答 | Validation & Badcase Evidence | `docs/module1-enterprise-knowledge-workspace/evaluation.md`; `git:18ee4079:docs/enterprise-rag/index.html`; `docs/project1-execution-evidence-audit-20260701.md` |

## 6. Copy Draft

以下是后续可粘进网页的中文页面 copy 草稿，不是最终 HTML。

### 6.1 新增模块：原型实现快照

```text
原型实现快照：这个工作台不是只停在概念图

项目 1 的底层验证来自一个本地可运行的 RAG / Agentic RAG 原型。它不是企业生产系统，也不包装成已上线平台；它的价值在于验证一条最小闭环：本地资料能被索引，问题能被检索，回答能带来源，用户能回到原文复核。

原型运行在 2020 款 Intel i5 MacBook Pro，16GB 内存，无独立 GPU。为了适配低配本地环境，方案选择轻量本地链路：Ollama 负责本地模型调用，embedding 使用 embeddinggemma，轻量回答模型使用 qwen3:0.6b，向量存储使用 Chroma，交互层使用 FastAPI + 原生 Web GUI。

这套原型的重点不是追求模型能力上限，而是验证企业知识工作台最基础的可信链路：资料留在本地，索引留在本地，检索结果带路径、标题、片段和来源，回答只作为可复核初稿。

实现边界：
- 本地运行：笔记、embedding、Chroma、转换缓存和日志不上传云端。
- 本地索引：支持 Obsidian Markdown 和选定本地文档。
- 本地检索：先召回 chunks，再组织带来源回答。
- 默认只读：不自动写入、删除、同步或发布内容。
- 非生产声明：这是产品级原型 / 可演示 MVP，不声称企业生产部署。
```

### 6.2 新增模块：索引与检索链路

```text
索引与检索链路：从文件到带引用回答

这个原型先验证的不是“模型会不会回答”，而是资料能不能稳定进入一个可复核的检索链路。

MVP 的核心 pipeline：

1. Ingestion：从配置中读取允许索引的 Obsidian 笔记和本地文档。
2. Conversion：直接读取 Markdown / TXT，并将 DOCX、PDF、PPTX 转为文本或 Markdown。
3. Chunking：按结构和目标长度切分 chunks，避免标题很多的文档被切成过碎片段。
4. Embedding：通过 Ollama 在本地生成 embedding。
5. Vector Store：写入本地 Chroma，并保留路径、标题、章节、source_type 等元数据。
6. Answer with Citation：用户提问时先召回 top_k chunks，再基于召回片段组织回答，并展示来源路径和片段。

脱敏配置快照：
- 支持文件类型：md / txt / docx / pdf / pptx
- chunk_target_chars：1200
- chunk_overlap_chars：150
- top_k：5
- embedding_model：embeddinggemma
- llm_model：qwen3:0.6b
- vector store：Chroma

索引维护策略：
当某个文件重新索引时，系统会先按 path 删除旧 chunks，再写入新 chunks，避免笔记或文档更新后留下过期片段。低配机器上，全量索引可能较慢，因此原型支持 offset / limit / max-chunks 等分批控制参数，把“慢慢跑的索引任务”和“日常使用的检索体验”分开。

产品判断：
RAG 在这里不是卖点，而是可信上下文基础设施。它的职责是把资料范围、来源位置、引用片段和更新状态显性化，让回答可以被复核。
```

### 6.3 新增模块：验证与 badcase

```text
验证与 badcase：让可信上下文从口号变成检查项

这个原型不是只验证“能不能生成答案”，而是验证资料能否被找到、来源能否被追溯、回答是否基于证据、Agent 是否判断对路径，以及高风险动作是否被挡在人工确认之前。

验证快照：
- 已索引文件：163
- 总 chunks：390
- 代表性任务问题：10
- 来源召回：9 条命中，1 条基本命中
- 回答可用性：约 8/10

验证问题覆盖协作规则、GUI 使用、索引维护、换电脑迁移、项目介绍、公开封装和跨项目召回。评估重点不是回答是否流畅，而是：正确来源是否进入 Top-K，回答是否基于来源，用户是否能回到原文复核，Agent 是否在需要资料时调用检索。

观察到的 badcase：

1. 语义相近导致误召回
   - 现象：项目介绍类问题可能召回其他 RAG 项目资料。
   - 判断：相似度高不等于业务相关。
   - 处理方向：增加 project_name、source_type、path 等元数据约束，并支持来源筛选。

2. 长文档总结片面
   - 现象：总结产品设计文档时，只覆盖某个章节。
   - 判断：基础 RAG 更适合局部问答；长文档总结需要结构化摘要和目录策略。
   - 处理方向：总结类问题优先召回目录、章节摘要和关键段落。

3. Router 误判
   - 现象：“我这个项目怎么讲”被误判为 direct，没有检索本地资料。
   - 判断：Agent 的第一步不是执行，而是正确判断任务路径；Router 错了，后面的 Tool 和回答都会错。
   - 处理方向：给 Router 增加本地资料信号规则，低置信时先澄清。

4. 写回风险
   - 现象：用户要求写回 Obsidian 或更新资料时，存在误写和覆盖风险。
   - 判断：Agent 能力边界必须先于能力扩展。
   - 处理方向：默认只读；写入、删除、同步、发布类动作必须先预览并人工确认。

5. 来源不足不强答
   - 现象：召回证据不足时，模型仍可能生成看似完整的回答。
   - 判断：企业知识场景里，错误但流畅的答案比“不知道”更危险。
   - 处理方向：当引用不足以支撑结论时，提示资料不足、缩小范围或转人工判断。

这组验证的意义不是证明系统已经成熟，而是说明这个原型已经从“能跑 demo”推进到“有问题集、有判断标准、有 badcase、有边界控制”的 AI 产品验证阶段。
```

### 6.4 可替换当前 `09｜验证方式 / 边界` 开头的短版 copy

```text
验证不是看回答像不像，而是看这条知识链路能不能被复核。

本项目的验证分两层：第一层看检索链路是否能找回正确来源，第二层看 Agent 是否能在需要本地资料时调用检索、在证据不足时停止强答、在高风险动作前保留人工确认。

这比单纯评估“回答流畅度”更接近企业知识场景：答案再完整，如果不能回到来源、不能确认版本、不能解释为什么引用这段资料，就不能进入业务判断。
```

### 6.5 可放在总结前的收束 copy

```text
Proof of Execution

这个项目最重要的证据不是某一张架构图，而是它经历过一轮完整原型验证：

资料被索引过，chunks 被写入过，本地模型跑过，检索结果被检查过，引用回答被验证过，badcase 被记录过，写回边界也被收住过。

因此，项目 1 展示的不是“我知道 RAG 是什么”，而是“我知道如何把 RAG 放在一个可复核、可维护、可控的 AI 产品原型里”。
```
