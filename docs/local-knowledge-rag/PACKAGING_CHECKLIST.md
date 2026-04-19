# GitHub 公开版封装清单

## 用途

这份清单用于把私有本地 RAG 项目整理成可公开展示的 GitHub 作品集模块，同时避免泄露个人资料。

## 可以包含

- 产品说明。
- 系统设计。
- 索引与检索流程。
- 隐私和安全决策。
- 硬件约束和产品取舍。
- 迁移与重建策略。
- 脱敏验证案例。
- Mermaid 架构图。
- 假样例 vault。
- 脱敏截图。

## 必须排除

- 真实 Obsidian vault 内容。
- 真实 OneDrive 原始文档。
- Chroma 向量数据库。
- 转换后的 Markdown 缓存。
- 日志和运行缓存。
- `.venv`。
- 私人简历草稿和面试脚本。
- 证件、合同、财务、医疗等敏感目录。
- 本机绝对路径。

## 公开仓库结构

```text
docs/local-knowledge-rag/
  README.md
  PACKAGING_CHECKLIST.md
  product-brief.md
  system-design.md
  indexing-pipeline.md
  evaluation.md
  privacy-and-security.md
  migration-guide.md
  hardware-constraints.md
  portfolio-case.md
  index.html
  diagrams/
  examples/
  assets/
```

## 截图清单

- 检索工作台：脱敏查询、候选结果和片段详情。
- 带引用回答：只使用 sample-vault 内容。
- 索引任务页：使用示例配置和安全 limits。
- GUI 总览：展示 Notion 风格布局。

## README 叙事

推荐说法：

```text
面向 Obsidian 和本地文档的本地优先个人知识库 RAG。
```

避免说法：

```text
又一个聊天机器人 demo。
```

## 发布前检查

- 搜索真实姓名、真实公司和私人路径。
- 用 `sample-vault/...` 替换真实路径。
- 确认没有向量库文件。
- 确认没有原始文档。
- 确认样例均为假数据或脱敏数据。
