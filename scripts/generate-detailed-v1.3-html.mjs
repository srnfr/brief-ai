import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = readFileSync(join(root, 'audit-code-maitrise.md'), 'utf8');
const dataUrl = (file, type) => `data:${type};base64,${readFileSync(join(root, file)).toString('base64')}`;
const logoDataUrl = dataUrl('assets/bluetrusty-logo-white.png', 'image/png');
const dgxDataUrl = dataUrl('assets/v1.3/dgx-spark-iamnuc.jpg', 'image/jpeg');
const diagramDataUrl = dataUrl('diagramme-v1.png', 'image/png');

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function inline(value) {
  return escapeHtml(value)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => `<a href="${href}">${label}</a>`)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
}

const enclaveCallout = `<div class="enclave-callout">
  <div class="enclave-copy">${inline('Notre environnement d’audit n’est pas une plateforme multi-tenante ni un espace de travail partagé entre plusieurs clients. À un moment donné, chaque enclave est dédiée à l’analyse du code, des dépendances et des configurations d’un seul client, dans un environnement isolé et contrôlé. Les flux entrants sont placés sous le contrôle d’une architecture réseau ZTNA. Les flux sortants sont journalisés au niveau applicatif au moyen d’une interception TLS effectuée localement. Le modèle ne dispose d’aucun chemin de sortie alternatif : toute communication vers l’extérieur doit passer par le proxy d’interception, selon les règles autorisées et journalisées. Cette conception s’inspire des principes NVIDIA relatifs aux environnements d’exécution isolés, à la séparation des workloads et au contrôle des flux sortants.')}</div>
  <figure><img src="${dgxDataUrl}" alt="NVIDIA DGX Spark"><figcaption>DGX Spark — image : <a href="https://iamnuc.com/32195-large_default/dgx-spark.jpg">IAMNUC</a>.</figcaption></figure>
</div>`;

const diagramFigure = `<figure class="architecture-wide">
  <img src="${diagramDataUrl}" alt="Architecture de l’enclave IA pour l’audit de code">
  <figcaption>Architecture simplifiée de l’enclave IA d’audit de code — BlueTrusty.</figcaption>
</figure>`;

const parts = [];
let list = null;
function closeList() { if (list) parts.push(`</${list}>`); list = null; }

for (const original of source.split(/\r?\n/)) {
  const line = original.trim();
  if (!line) { closeList(); continue; }
  if (line === '---') { closeList(); parts.push('<hr class="closing-rule">'); continue; }
  const heading = line.match(/^(#{1,3})\s+(.+)$/);
  if (heading) {
    closeList();
    const level = heading[1].length;
    parts.push(`<h${level}>${inline(heading[2])}</h${level}>`);
    if (heading[2] === 'Déroulé de l’audit') parts.push(diagramFigure);
    continue;
  }
  const bullet = line.match(/^\-\s+(.+)$/);
  const numbered = line.match(/^\d+\.\s+(.+)$/);
  if (bullet || numbered) {
    const wanted = bullet ? 'ul' : 'ol';
    if (list !== wanted) { closeList(); list = wanted; parts.push(`<${list}>`); }
    parts.push(`<li>${inline((bullet || numbered)[1])}</li>`);
    continue;
  }
  closeList();
  if (line.startsWith('Notre environnement d’audit n’est pas une plateforme multi-tenante')) parts.push(enclaveCallout);
  else parts.push(`<p>${inline(line)}</p>`);
}
closeList();

const title = 'Audit de cybersécurité de code logiciel par IA dans un environnement maîtrisé';
const html = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>BlueTrusty — ${title} — v1.3</title>
<style>
@page{size:A4;margin:33mm 18mm 20mm;@top-center{content:"CYBERSÉCURITÉ AUGMENTÉE PAR IA";width:174mm;height:19mm;margin-bottom:4mm;padding-right:5mm;color:#c5dfec;font:7.5pt "DejaVu Sans",sans-serif;letter-spacing:.1em;text-align:right;background-image:url("${logoDataUrl}"),linear-gradient(100deg,#102e60,#07182f);background-repeat:no-repeat;background-position:5mm center,center;background-size:39mm auto,cover}@bottom-center{content:"BlueTrusty · v1.3 · " counter(page) " / " counter(pages);width:174mm;height:10mm;border-top:1px solid #b4cbd9;color:#53718a;font:7pt "DejaVu Sans",sans-serif;text-align:right}}
*{box-sizing:border-box}html,body{margin:0}body{font-family:"DejaVu Serif",Georgia,serif;color:#102e4c;font-size:8.8pt;line-height:1.42;-webkit-print-color-adjust:exact;print-color-adjust:exact}.watermark{position:fixed;top:7mm;right:-18mm;width:158mm;height:230mm;z-index:-1;pointer-events:none;opacity:.085}main{position:relative;z-index:1}h1{margin:0 0 7mm;color:#102e60;font:bold 21pt/1.18 "DejaVu Sans",sans-serif;letter-spacing:-.03em;border-bottom:2.5mm solid #45c9f4;padding-bottom:4mm}h2{margin:7mm 0 2.5mm;padding-left:3mm;border-left:1.2mm solid #45c9f4;color:#102e60;font:bold 13pt/1.2 "DejaVu Sans",sans-serif;break-after:avoid}p{margin:0 0 2.7mm;text-align:left;orphans:3;widows:3}ul,ol{margin:2mm 0 3.5mm;padding-left:6mm}li{padding-left:1mm;margin-bottom:1.3mm;break-inside:avoid}li::marker{color:#2685b3}strong{color:#102e60}a{color:#126c9d;text-decoration:underline;text-underline-offset:1px;overflow-wrap:anywhere}.closing-rule{margin:7mm 0 3mm;border:0;border-top:1px solid #b4cbd9}h2+p{break-before:avoid}.enclave-callout{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(42mm,.9fr);gap:6mm;align-items:center;margin:4mm 0 6mm;padding:4mm;border:1px solid #c7dce7;background:#f7fbfd;break-inside:avoid}.enclave-copy{font-size:8.4pt;line-height:1.45}.enclave-callout figure{margin:0}.enclave-callout img{display:block;width:100%;aspect-ratio:1;object-fit:cover}.enclave-callout figcaption{padding-top:2mm;color:#53718a;font:7pt/1.3 "DejaVu Sans",sans-serif}.architecture-wide{margin:4mm 0 6mm;padding:3mm;border:1px solid #c7dce7;background:#f7fbfd;break-inside:avoid}.architecture-wide img{display:block;width:100%;height:auto}.architecture-wide figcaption{padding-top:2mm;color:#53718a;font:7pt/1.3 "DejaVu Sans",sans-serif}
</style></head><body><svg class="watermark" viewBox="0 0 630 920" aria-hidden="true"><defs><path id="arc" d="M 210,-50 C 700,170 210,300 580,560 S 780,880 340,1010" fill="none" stroke="#1f75aa" stroke-width="2"/></defs><g fill="none" stroke="#1f75aa" stroke-width="2"><use href="#arc"/><use href="#arc" transform="translate(11 0)"/><use href="#arc" transform="translate(22 0)"/><use href="#arc" transform="translate(33 0)"/><use href="#arc" transform="translate(44 0)"/><use href="#arc" transform="translate(55 0)"/><use href="#arc" transform="translate(66 0)"/><circle cx="505" cy="690" r="175"/><circle cx="495" cy="700" r="125"/><circle cx="485" cy="710" r="85"/><circle cx="475" cy="720" r="55"/></g></svg><main>${parts.join('\n')}</main></body></html>`;

writeFileSync(join(root, 'audit-code-detail-v1.3.html'), html);
