#!/bin/zsh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
"$SCRIPT_DIR/../../scripts/export-markdown-pdf.sh" \
  "$SCRIPT_DIR/本地知识助手_RAG到AgenticRAG_产品设计文档.md" \
  "$SCRIPT_DIR/本地知识助手_RAG到AgenticRAG_产品设计文档.pdf" \
  "$SCRIPT_DIR/pdf-print.css"
