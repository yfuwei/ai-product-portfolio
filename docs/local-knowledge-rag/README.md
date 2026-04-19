# 本地个人知识库 RAG 系统

## 项目概览

本地个人知识库 RAG 系统是一个面向个人笔记和本地文档的语义检索原型。它索引 Obsidian vault 中的 Markdown 笔记和本地文档库中的部分文件，提供语义检索、带来源的回答，以及可日常使用的 FastAPI 网页界面。

这个项目不是要替代 Obsidian 或云盘，而是在现有笔记系统和本地文档库之上，增加一层私有、可追溯的语义检索能力。

## 问题背景

个人知识系统通常分成两层：

- Obsidian 中的笔记、索引、规则和项目记录。
- 本地文档库中的 PDF、DOCX、PPTX、TXT、阅读资料和原始文件。

当用户想找相近概念、恢复之前的决策、比较相似资料，或者生成一段带来源的简短回答时，关键词搜索不够用。

## 项目目标

- 索引 Obsidian Markdown 笔记和选定本地文档。
- embedding、向量库、转换缓存和日志全部留在本机。
- 每条搜索结果都返回来源路径、标题、章节和片段。
- 提供非终端使用的轻量网页 GUI。
- 支持低配置电脑上的小批量索引。
- 通过文档、配置模板和可重建索引支持换电脑迁移。

## 非目标

- 不上传私人笔记或文档到云端向量库。
- 不默认索引证件、合同、财务、医疗等敏感档案。
- 不修改 Obsidian 笔记或原始文档。
- 不默认依赖大模型或高性能 GPU。
- 不把生成答案当作最终事实，仍需回到来源复核。

## 核心功能

- 通过 Ollama 在本地生成 embedding。
- 使用 Chroma 作为本地持久化向量库。
- 支持 Obsidian Markdown 索引。
- 支持通过 MarkItDown 转换本地文档。
- 支持 CLI 检索和 FastAPI 原生 Web GUI。
- 支持带引用来源的轻量 RAG 回答。
- 支持按文件路径刷新，避免笔记改动后留下旧 chunks。
- 支持 `--offset`、`--limit`、`--max-chunks` 和文件类型过滤，适合低配置电脑分批索引。

## 当前状态

私有工作版本已经完成：

- 162 个 Obsidian Markdown 文件索引。
- 385 个 Obsidian chunks。
- 总计 390 个 chunks，包含少量本地文档 smoke test 样例。

公开作品集版本只包含文档、图示、脱敏样例和脱敏截图，不包含私人笔记、向量数据库、转换缓存或原始文件。

## 公开阅读入口

- [HTML 项目案例页](index.html)
- [项目背景](index.html#overview)
- [系统架构](index.html#architecture)
- [GUI 截图](index.html#screenshots)
- [验证结果](index.html#evaluation)
- [隐私边界](index.html#privacy)

Markdown 文件仅作为公开页面的内容草稿和维护素材，不作为招聘方主要阅读入口。更详细的项目复盘、PRD、系统设计、验证表和面试问答已经同步到 Obsidian 项目素材目录：

```text
01_项目素材/04_本地个人知识库_RAG/
```

## 架构图

- [系统架构](diagrams/architecture.mmd)
- [索引流程](diagrams/indexing-flow.mmd)
- [检索问答流程](diagrams/query-flow.mmd)
- [数据分层](diagrams/data-layers.mmd)

## 脱敏样例

fake sample notes 放在：

```text
docs/local-knowledge-rag/examples/sample-vault/
```

截图放在：

```text
docs/local-knowledge-rag/assets/screenshots/
```

当前脱敏截图已经直接展示在 [HTML 项目案例页](index.html) 中：

- [Notion 风格 GUI 总览](assets/screenshots/notion-style-gui.png)
- [检索工作台](assets/screenshots/search-workspace.png)
- [带引用的回答](assets/screenshots/answer-with-citations.png)
- [索引任务界面](assets/screenshots/indexing-workspace.png)

所有截图均使用 `sample-vault` 假数据生成，不包含真实 Obsidian 路径、OneDrive 路径、私人笔记名或真实文档内容。
