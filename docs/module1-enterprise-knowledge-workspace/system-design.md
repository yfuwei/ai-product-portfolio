# 系统设计

## 总体架构

系统分为四层：

1. 来源层：Obsidian 笔记和本地文档。
2. 处理层：文件发现、文档转换、切块、embedding。
3. 存储层：本地 Chroma 向量库和可选转换缓存。
4. 交互层：CLI 脚本和 FastAPI 原生 Web GUI。

参见：[系统架构图](diagrams/architecture.mmd)。

## 数据来源

| 来源 | 角色 | 处理方式 |
|---|---|---|
| Obsidian Markdown | 笔记、索引、规则、项目文档 | 直接读取 |
| 本地文档 | PDF、DOCX、PPTX、TXT、Markdown | 转换为 Markdown/text |
| 敏感档案 | 证件、合同、财务、医疗文件 | 默认排除 |

## 运行组件

| 组件 | 责任 |
|---|---|
| `sources.py` | 扫描允许索引的来源文件 |
| `convert.py` | 读取 Markdown/TXT，并转换 Office/PDF 文档 |
| `ingest.py` | 切块、生成 embedding、写入 Chroma |
| `search.py` | 查询 Chroma 并输出检索结果 |
| `ask.py` | 召回 chunks 并生成本地回答 |
| `app.py` | FastAPI Web app，提供检索、问答、状态和索引接口 |
| `web/` | 原生 HTML/CSS/JS 日常使用界面 |
| `gui.py` | 早期 Streamlit prototype，作为历史版本保留 |

## 存储策略

| 存储内容 | 位置 | 迁移策略 |
|---|---|---|
| 项目文档和脚本 | Git 或作品集仓库 | 保留 |
| 配置模板 | Git 或作品集仓库 | 保留，不写私人路径 |
| 运行配置 | 本机 | 每台电脑单独创建 |
| Chroma 向量库 | 本机 | 建议重建 |
| 转换文档缓存 | 本机或同步文档目录 | 可选迁移 |
| 原始文档 | 既有文档库 | 不放入仓库 |

## 检索流程

1. 用户输入问题。
2. 系统用同一 embedding 模型向量化问题。
3. Chroma 返回 top-k 相似 chunks。
4. UI 展示来源路径、标题、章节和片段。
5. 如果进入问答模式，系统把召回 chunks 传给本地 LLM。
6. 回答必须引用来源 chunks。

## 刷新策略

索引器在写入某个文件的新 chunks 之前，会先删除同一 `path` 下的旧 chunks，避免笔记修改后留下过期片段。

如果使用 `--max-chunks` 做部分索引，则禁用按路径刷新，避免只重建半个文件导致索引残缺。

## 主要失败模式

| 风险 | 缓解方式 |
|---|---|
| 大文件导致索引慢 | 小批量 embedding，并使用 offset/limit 分批 |
| 标题过多导致 tiny chunks | 合并连续短章节后再 embedding |
| 中文问题检索英文术语不稳定 | 建议保留来源语言关键词 |
| PDF 转换质量不稳定 | 先小批量测试不同类型 PDF |
| 换电脑后路径失效 | 使用配置模板和迁移说明重建 |
