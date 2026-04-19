# 迁移说明

## 迁移模型

换电脑时，不建议直接复制整个运行环境。更稳的方式是保留文档、脚本和配置模板，在新电脑上重新创建运行配置并重建 Chroma 索引。

## 可迁移层

可以保留：

- 项目文档。
- 脚本代码。
- 配置模板。
- Mermaid 架构图。
- 脱敏验证问题。
- 迁移说明。

## 可选缓存层

转换后的 Markdown 缓存可以放在 vault 外部的文档目录中。如果不想重复转换 DOCX/PDF，可以选择迁移这部分缓存。

## 建议重建层

建议在新电脑上重建：

- 运行用 `config.yaml`。
- Python 虚拟环境。
- Chroma 向量数据库。
- 运行日志。

## 新电脑设置

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

复制 `config.example.yaml` 为 `config.yaml`，再按新电脑的真实路径修改。

## 重建索引

Obsidian：

```bash
python scripts/ingest.py --config config.yaml --source-type obsidian
```

本地文档小批量测试：

```bash
python scripts/ingest.py --config config.yaml --source-type onedrive --extension .docx --limit 3 --reuse-converted
```

## 迁移判断

默认不迁移 Chroma。重建更干净，也能避免不同电脑路径不一致导致的问题。
