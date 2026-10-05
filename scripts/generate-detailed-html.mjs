import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = readFileSync(join(root, 'audit-code-maitrise.md'), 'utf8');

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function inline(value) {
  return escapeHtml(value)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => `<a href="${href}">${label}</a>`)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
}

const parts = [];
let list = null;
function closeList() {
  if (list) parts.push(`</${list}>`);
  list = null;
}

for (const original of source.split(/\r?\n/)) {
  const line = original.trim();
  if (!line) { closeList(); continue; }
  if (line === '---') { closeList(); parts.push('<hr class="closing-rule">'); continue; }
  const heading = line.match(/^(#{1,3})\s+(.+)$/);
  if (heading) {
    closeList();
    const level = heading[1].length;
    parts.push(`<h${level}>${inline(heading[2])}</h${level}>`);
    continue;
  }
  const bullet = line.match(/^-\s+(.+)$/);
  const numbered = line.match(/^\d+\.\s+(.+)$/);
  if (bullet || numbered) {
    const wanted = bullet ? 'ul' : 'ol';
    if (list !== wanted) { closeList(); list = wanted; parts.push(`<${list}>`); }
    parts.push(`<li>${inline((bullet || numbered)[1])}</li>`);
    continue;
  }
  closeList();
  parts.push(`<p>${inline(line)}</p>`);
}
closeList();

const title = 'Audit de cybersécurité de code logiciel par IA dans un environnement maîtrisé';
const html = `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>BlueTrusty — ${title}</title>
  <style>
    @page { size: A4; margin: 18mm 18mm 20mm; }
    * { box-sizing: border-box; }
    html, body { margin: 0; }
    body { font-family: Arial, Helvetica, sans-serif; color: #102e4c; font-size: 9.4pt; line-height: 1.42; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .page-header { height: 19mm; margin-bottom: 8mm; padding: 2.3mm 5mm 1.5mm; display: flex; align-items: center; justify-content: space-between; background: linear-gradient(100deg, #102e60, #07182f); color: #c5dfec; }
    .page-header img { width: 39mm; height: 14mm; object-fit: contain; object-position: left center; }
    .page-header span { font-size: 7.5pt; letter-spacing: .1em; text-transform: uppercase; }
    .watermark { position: fixed; top: 7mm; right: -18mm; width: 158mm; height: 230mm; z-index: -1; pointer-events: none; opacity: .085; }
    main { position: relative; z-index: 1; }
    h1 { margin: 0 0 7mm; color: #102e60; font-size: 21pt; line-height: 1.18; letter-spacing: -.03em; border-bottom: 2.5mm solid #45c9f4; padding-bottom: 4mm; }
    h2 { margin: 7mm 0 2.5mm; padding-left: 3mm; border-left: 1.2mm solid #45c9f4; color: #102e60; font-size: 13pt; line-height: 1.2; break-after: avoid; }
    p { margin: 0 0 2.7mm; text-align: left; orphans: 3; widows: 3; }
    ul, ol { margin: 2mm 0 3.5mm; padding-left: 6mm; }
    li { padding-left: 1mm; margin-bottom: 1.3mm; break-inside: avoid; }
    li::marker { color: #2685b3; }
    strong { color: #102e60; }
    a { color: #126c9d; text-decoration: underline; text-underline-offset: 1px; overflow-wrap: anywhere; }
    .closing-rule { margin: 7mm 0 3mm; border: 0; border-top: 1px solid #b4cbd9; }
    h2 + p { break-before: avoid; }
  </style>
</head>
<body>
  <div class="page-header"><img src="assets/bluetrusty-logo-white.png" alt="BlueTrusty"><span>Offre de cybersécurité · Version 1.0</span></div>
  <svg class="watermark" viewBox="0 0 630 920" aria-hidden="true">
    <defs><path id="arc" d="M 210,-50 C 700,170 210,300 580,560 S 780,880 340,1010" fill="none" stroke="#1f75aa" stroke-width="2"/></defs>
    <g fill="none" stroke="#1f75aa" stroke-width="2">
      <use href="#arc"/><use href="#arc" transform="translate(11 0)"/><use href="#arc" transform="translate(22 0)"/><use href="#arc" transform="translate(33 0)"/><use href="#arc" transform="translate(44 0)"/><use href="#arc" transform="translate(55 0)"/><use href="#arc" transform="translate(66 0)"/>
      <circle cx="505" cy="690" r="175"/><circle cx="495" cy="700" r="125"/><circle cx="485" cy="710" r="85"/><circle cx="475" cy="720" r="55"/>
    </g>
  </svg>
  <main>${parts.join('\n')}</main>
</body>
</html>
`;

writeFileSync(join(root, 'audit-code-detail.html'), html);
