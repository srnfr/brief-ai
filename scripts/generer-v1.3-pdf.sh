#!/usr/bin/env bash
set -euo pipefail

racine=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
node "$racine/scripts/generate-v1.3-pdf-node.mjs"
test -s "$racine/audit-code-detail-v1.3.pdf"
printf 'PDF généré : %s\n' "$racine/audit-code-detail-v1.3.pdf"
