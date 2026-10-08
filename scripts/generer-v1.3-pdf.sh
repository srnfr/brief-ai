#!/usr/bin/env bash
set -euo pipefail

racine=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
navigateur=${CHROMIUM_BIN:-}

if [[ -z "$navigateur" ]]; then
  for nom in chromium chromium-browser google-chrome; do
    if command -v "$nom" >/dev/null 2>&1; then navigateur=$(command -v "$nom"); break; fi
  done
fi
if [[ -z "$navigateur" ]]; then
  for candidat in /root/.cache/ms-playwright/chromium-*/chrome-linux64/chrome; do
    if [[ -x "$candidat" ]]; then navigateur=$candidat; break; fi
  done
fi
if [[ -z "$navigateur" ]]; then
  printf 'Chromium introuvable. Définir CHROMIUM_BIN avec le chemin du navigateur.\n' >&2
  exit 1
fi

node "$racine/scripts/generate-detailed-v1.3-html.mjs"
"$navigateur" --headless --no-sandbox --disable-gpu --disable-dev-shm-usage \
  --no-pdf-header-footer \
  --print-to-pdf="$racine/audit-code-detail-v1.3.pdf" \
  "file://$racine/audit-code-detail-v1.3.html"
test -s "$racine/audit-code-detail-v1.3.pdf"
printf 'PDF généré : %s\n' "$racine/audit-code-detail-v1.3.pdf"
