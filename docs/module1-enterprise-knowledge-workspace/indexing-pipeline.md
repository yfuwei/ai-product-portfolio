# 索引流程

## 流程摘要

```text
发现文件
→ 读取或转换文档
→ 拆分为 chunks
→ 按文件路径刷新旧 chunks
→ 生成 embedding
→ 写入 Chroma
```

参见：[索引流程图](diagrams/indexing-flow.mmd)。

## 来源扫描

扫描器从 `config.yaml` 读取 include / exclude 规则。

默认策略示例：

- 包含笔记、项目、领域资料和资源文件。
- 排除系统文件夹、临时附件、归档、废纸篓、插件缓存和敏感文档。
- 跳过 Office 临时锁文件，例如 `~$example.docx`。

## 文档转换

Markdown 和 TXT 文件直接读取。

Office 和 PDF 文件会先转换为 Markdown/text：

- `.docx`
- `.pdf`
- `.pptx`
- `.txt`
- `.md`

## 切块策略

早期切块规则在标题很多的 Markdown 文件上过于激进，容易产生大量过短 chunks。改进后会合并连续短章节，直到接近目标 chunk 大小。

收益：

- 减少 tiny chunks。
- 提升索引速度。
- 让检索片段更完整。
- 控制 Chroma 存储增长。

## Embedding

embedding 通过 Ollama 在本地生成。

私有版本使用小批量 embedding，因为测试机器是 2020 款 Intel MacBook Pro，16GB 内存。

## Chroma 写入策略

索引器使用 `upsert`，使 chunk ID 可以更新。完整刷新某个文件时，会先删除相同 `path` 下的旧 chunks，再写入新 chunks。

这样可以避免笔记改动后留下过期索引片段。

## 分批控制参数

| 参数 | 用途 |
|---|---|
| `--source-type obsidian` | 只索引 Obsidian 笔记 |
| `--source-type onedrive` | 只索引本地文档 |
| `--offset N` | 跳过前 N 个发现的文件 |
| `--limit N` | 只索引 N 个文件 |
| `--max-chunks N` | 达到 N 个 chunks 后停止 |
| `--extension .docx` | 只索引某一种文件类型 |
| `--clear-source obsidian` | 清理某一资料源的旧 chunks |
| `--no-refresh-path` | 跳过按路径清理 |

## 操作注意

使用 `--max-chunks` 时会禁用按路径刷新，因为部分索引可能只重建一个文件的一部分，直接清理旧 chunks 会导致该文件索引残缺。
