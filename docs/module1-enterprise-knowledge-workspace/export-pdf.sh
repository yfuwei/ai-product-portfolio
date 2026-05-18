#!/bin/zsh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
"$SCRIPT_DIR/../../scripts/export-markdown-pdf.sh" \
  "$SCRIPT_DIR/企业知识工作台_RAG到Agent工作流_产品设计文档.md" \
  "$SCRIPT_DIR/企业知识工作台_RAG到Agent工作流_产品设计文档.pdf" \
  "$SCRIPT_DIR/pdf-print.css"
