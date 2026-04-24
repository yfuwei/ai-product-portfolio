#!/bin/zsh
set -euo pipefail

if [[ $# -lt 2 || $# -gt 3 ]]; then
  echo "Usage: $0 <source.md> <output.pdf> [print.css]" >&2
  exit 1
fi

SOURCE_MD="$(cd "$(dirname "$1")" && pwd)/$(basename "$1")"
OUTPUT_PDF="$(cd "$(dirname "$2")" && pwd)/$(basename "$2")"
PRINT_CSS=""

if [[ $# -eq 3 ]]; then
  PRINT_CSS="$(cd "$(dirname "$3")" && pwd)/$(basename "$3")"
fi

TMP_STEM="/tmp/$(basename "$SOURCE_MD" .md)-export"
TMP_MD="${TMP_STEM}.md"
TMP_HTML="${TMP_STEM}.html"

ruby - "$SOURCE_MD" "$TMP_MD" <<'RUBY'
source = ARGV[0]
target = ARGV[1]
text = File.read(source)

title = File.basename(source, ".md")

if text.start_with?("---\n")
  parts = text.split(/^---\s*$\n/, 3)
  if parts.length >= 3
    frontmatter = parts[1]
    body = parts[2]
    fm_title = frontmatter[/^title:\s*(.+)$/, 1]
    title = fm_title.strip if fm_title && !fm_title.strip.empty?
    text = body
  end
end

lines = text.lines

if lines.first && lines.first.strip == "# #{title}"
  lines.shift
  lines.shift while lines.first&.strip == ""
end

filtered = []
skip_obsidian_toc = false

lines.each do |line|
  if !skip_obsidian_toc && line.strip == "## 目录"
    skip_obsidian_toc = true
    next
  end

  if skip_obsidian_toc
    if line.start_with?("## ")
      skip_obsidian_toc = false
      filtered << line
    end
    next
  end

  filtered << line
end

converted = []
i = 0

while i < filtered.length
  line = filtered[i]
  match = line.match(/^> \[!(\w+)\]\s*(.*)$/)

  unless match
    converted << line
    i += 1
    next
  end

  callout_type = match[1].downcase
  callout_title = match[2].strip
  callout_title = callout_type.capitalize if callout_title.empty?
  body_lines = []
  i += 1

  while i < filtered.length && filtered[i].start_with?(">")
    body_lines << filtered[i].sub(/^>\s?/, "")
    i += 1
  end

  paragraphs = []
  current = []

  body_lines.each do |body_line|
    if body_line.strip.empty?
      unless current.empty?
        paragraphs << current.join(" ").strip
        current = []
      end
    else
      current << body_line.strip
    end
  end

  paragraphs << current.join(" ").strip unless current.empty?

  converted << %(<div class="callout callout-#{callout_type}">\n)
  converted << %(<p class="callout-title">#{callout_title}</p>\n)
  paragraphs.each do |paragraph|
    converted << %(<p>#{paragraph}</p>\n)
  end
  converted << "</div>\n\n"
end

output = +"---\n"
output << "title: #{title}\n"
output << "---\n\n"
output << converted.join

File.write(target, output)
RUBY

PANDOC_ARGS=(
  "$TMP_MD"
  -s
  --toc
  --toc-depth=2
  --self-contained
)

if [[ -n "$PRINT_CSS" ]]; then
  PANDOC_ARGS+=(--css "$PRINT_CSS")
fi

PANDOC_ARGS+=(-o "$TMP_HTML")

(
  cd "$(dirname "$SOURCE_MD")"
  pandoc "${PANDOC_ARGS[@]}"
)

"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new \
  --disable-gpu \
  --print-to-pdf="$OUTPUT_PDF" \
  "file://$TMP_HTML"
