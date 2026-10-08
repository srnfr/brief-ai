import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = readFileSync(join(root, 'audit-code-maitrise.md'), 'utf8');
const logoDataUrl = `data:image/png;base64,${readFileSync(join(root, 'assets/bluetrusty-logo-white.png')).toString('base64')}`;
const dgxDataUrl = `data:image/jpeg;base64,${readFileSync(join(root, 'assets/v1.3/nvidia-dgx-spark-officiel.jpg')).toString('base64')}`;
const studioDataUrl = `data:image/jpeg;base64,${readFileSync(join(root, 'assets/v1.3/nvidia-studio-officiel.jpg')).toString('base64')}`;

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function inline(value) {
  return escapeHtml(value)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => `<a href="${href}">${label}</a>`)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
}

const dgxFigure = `<figure class="photo-card photo-card-wide">
  <img src="${dgxDataUrl}" alt="NVIDIA DGX Spark, ordinateur compact pour l'IA">
  <figcaption><strong>NVIDIA DGX Spark</strong> — une plateforme matérielle compacte pour exécuter localement des charges d’IA. <span>Illustration officielle NVIDIA.</span></figcaption>
</figure>`;

const studioFigure = `<figure class="photo-card photo-card-wide">
  <img src="${studioDataUrl}" alt="NVIDIA Studio, environnement de création accéléré par l'IA">
  <figcaption><strong>NVIDIA Studio</strong> — l’accélération matérielle comme prolongement naturel d’un environnement de travail dédié. <span>Illustration officielle NVIDIA.</span></figcaption>
</figure>`;

const architectureFigure = `<figure class="architecture-card">
  <div class="architecture-head"><span>Architecture de filtrage des interactions</span><small>la plateforme reste connectée, mais les flux sont contrôlés</small></div>
  <svg viewBox="0 0 920 455" role="img" aria-label="Diagramme montrant un LLM sur une plateforme matérielle, avec gateway d'entrée, endpoint gateway, proxy egress avec interception et filtrage des logs, Internet filtré et base d'embeddings">
    <defs>
      <marker id="arrow-v13" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#2685b3"/></marker>
      <marker id="arrow-mint-v13" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#1caa9e"/></marker>
      <linearGradient id="hardware-v13" x1="0" x2="1"><stop offset="0" stop-color="#102e60"/><stop offset="1" stop-color="#174b83"/></linearGradient>
    </defs>
    <rect x="16" y="18" width="888" height="416" rx="16" fill="#f7fbfd" stroke="#b4cbd9"/>
    <rect x="35" y="55" width="132" height="70" rx="10" fill="#fff" stroke="#45c9f4" stroke-width="2"/>
    <text x="101" y="82" text-anchor="middle" class="box-title">Flux entrant</text><text x="101" y="103" text-anchor="middle" class="box-label">client / code / prompts</text>
    <rect x="205" y="55" width="150" height="70" rx="10" fill="#e8f8fb" stroke="#1caa9e" stroke-width="2"/>
    <text x="280" y="82" text-anchor="middle" class="box-title">Gateway entrée</text><text x="280" y="103" text-anchor="middle" class="box-label">endpoint gateway</text>
    <rect x="397" y="44" width="220" height="210" rx="14" fill="url(#hardware-v13)"/>
    <text x="507" y="72" text-anchor="middle" class="hardware-title">PLATEFORME MATÉRIELLE</text>
    <rect x="426" y="91" width="162" height="58" rx="8" fill="#fff" opacity=".97"/>
    <text x="507" y="116" text-anchor="middle" class="box-title">Modèle LLM</text><text x="507" y="136" text-anchor="middle" class="box-label">inférence locale</text>
    <rect x="426" y="169" width="162" height="58" rx="8" fill="#d8f5f1"/>
    <text x="507" y="194" text-anchor="middle" class="box-title">Base d’embeddings</text><text x="507" y="214" text-anchor="middle" class="box-label">RAG / mémoire d’audit</text>
    <rect x="659" y="55" width="157" height="70" rx="10" fill="#fff4e7" stroke="#ec9b35" stroke-width="2"/>
    <text x="737" y="82" text-anchor="middle" class="box-title">Egress gateway</text><text x="737" y="103" text-anchor="middle" class="box-label">proxy + interception</text>
    <rect x="659" y="155" width="157" height="70" rx="10" fill="#fff" stroke="#ec9b35" stroke-width="2"/>
    <text x="737" y="182" text-anchor="middle" class="box-title">Filtre / logs</text><text x="737" y="203" text-anchor="middle" class="box-label">inspection + journalisation</text>
    <rect x="659" y="286" width="157" height="70" rx="10" fill="#eef2f6" stroke="#7e99ad" stroke-width="2"/>
    <text x="737" y="313" text-anchor="middle" class="box-title">Internet</text><text x="737" y="334" text-anchor="middle" class="box-label">destinations autorisées</text>
    <path d="M167 90 H205" stroke="#2685b3" stroke-width="3" marker-end="url(#arrow-v13)"/><path d="M355 90 H397" stroke="#1caa9e" stroke-width="3" marker-end="url(#arrow-mint-v13)"/>
    <path d="M617 90 H659" stroke="#ec9b35" stroke-width="3" marker-end="url(#arrow-v13)"/><path d="M737 125 V155" stroke="#ec9b35" stroke-width="3" marker-end="url(#arrow-v13)"/><path d="M737 225 V286" stroke="#ec9b35" stroke-width="3" marker-end="url(#arrow-v13)"/>
    <path d="M507 149 V169" stroke="#1caa9e" stroke-width="3" marker-end="url(#arrow-mint-v13)"/>
    <path d="M617 115 C645 128 634 190 659 190" fill="none" stroke="#ec9b35" stroke-width="3" marker-end="url(#arrow-v13)"/>
    <path d="M659 321 C613 321 633 232 588 216" fill="none" stroke="#ec9b35" stroke-width="2" stroke-dasharray="6 5" marker-end="url(#arrow-v13)"/>
    <rect x="35" y="286" width="560" height="70" rx="10" fill="#e8f8fb" stroke="#45c9f4"/>
    <text x="315" y="313" text-anchor="middle" class="box-title">Contrôle de frontière</text><text x="315" y="335" text-anchor="middle" class="box-label">liste blanche · inspection · journalisation · pas d’exfiltration non autorisée</text>
    <path d="M280 125 V286" fill="none" stroke="#1caa9e" stroke-width="2" stroke-dasharray="6 5" marker-end="url(#arrow-mint-v13)"/>
    <style>.box-title{font:600 15px Arial,sans-serif;fill:#102e60}.box-label{font:12px Arial,sans-serif;fill:#53718a}.hardware-title{font:600 12px Arial,sans-serif;letter-spacing:1.3px;fill:#bde9f8}</style>
  </svg>
  <figcaption>Les flux Internet ne sont pas supprimés : ils sont <strong>filtrés en entrée et en sortie</strong>, tandis que le LLM, la base d’embeddings et les journaux tournent sur la plateforme matérielle de l’enclave.</figcaption>
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
    if (heading[2] === 'Un audit de code adapté aux environnements sensibles') parts.push(dgxFigure);
    if (heading[2] === 'Une plateforme d’IA spécialement entraînée pour l’analyse de code logiciel') parts.push(studioFigure);
    if (heading[2] === 'Déroulé de l’audit') parts.push(architectureFigure);
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
  parts.push(`<p>${inline(line)}</p>`);
}
closeList();

const title = 'Audit de cybersécurité de code logiciel par IA dans un environnement maîtrisé';
const html = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>BlueTrusty — ${title} — v1.3</title>
<style>
@page{size:A4;margin:33mm 18mm 20mm;@top-center{content:"CYBERSÉCURITÉ AUGMENTÉE PAR IA";width:174mm;height:19mm;margin-bottom:4mm;padding-right:5mm;color:#c5dfec;font:7.5pt "DejaVu Sans",sans-serif;letter-spacing:.1em;text-align:right;background-image:url("${logoDataUrl}"),linear-gradient(100deg,#102e60,#07182f);background-repeat:no-repeat;background-position:5mm center,center;background-size:39mm auto,cover}@bottom-center{content:"BlueTrusty · v1.3 · " counter(page) " / " counter(pages);width:174mm;height:10mm;border-top:1px solid #b4cbd9;color:#53718a;font:7pt "DejaVu Sans",sans-serif;text-align:right}}
*{box-sizing:border-box}html,body{margin:0}body{font-family:"DejaVu Serif",Georgia,serif;color:#102e4c;font-size:8.8pt;line-height:1.42;-webkit-print-color-adjust:exact;print-color-adjust:exact}.watermark{position:fixed;top:7mm;right:-18mm;width:158mm;height:230mm;z-index:-1;pointer-events:none;opacity:.085}main{position:relative;z-index:1}h1{margin:0 0 7mm;color:#102e60;font:bold 21pt/1.18 "DejaVu Sans",sans-serif;letter-spacing:-.03em;border-bottom:2.5mm solid #45c9f4;padding-bottom:4mm}h2{margin:7mm 0 2.5mm;padding-left:3mm;border-left:1.2mm solid #45c9f4;color:#102e60;font:bold 13pt/1.2 "DejaVu Sans",sans-serif;break-after:avoid}p{margin:0 0 2.7mm;text-align:left;orphans:3;widows:3}ul,ol{margin:2mm 0 3.5mm;padding-left:6mm}li{padding-left:1mm;margin-bottom:1.3mm;break-inside:avoid}li::marker{color:#2685b3}strong{color:#102e60}a{color:#126c9d;text-decoration:underline;text-underline-offset:1px;overflow-wrap:anywhere}.closing-rule{margin:7mm 0 3mm;border:0;border-top:1px solid #b4cbd9}h2+p{break-before:avoid}.photo-card,.architecture-card{margin:4mm 0 6mm;break-inside:avoid;border:1px solid #c7dce7;background:#f7fbfd}.photo-card img{display:block;width:100%;height:auto}.photo-card figcaption,.architecture-card figcaption{padding:2.5mm 3mm;color:#53718a;font:7.4pt/1.35 "DejaVu Sans",sans-serif}.photo-card figcaption span{color:#7d95a4;font-style:italic}.architecture-card{margin-top:4mm}.architecture-head{display:flex;justify-content:space-between;align-items:baseline;gap:8mm;padding:3mm 4mm 1mm;color:#102e60;font:bold 9pt "DejaVu Sans",sans-serif}.architecture-head small{color:#53718a;font:7pt "DejaVu Sans",sans-serif}.architecture-card svg{display:block;width:100%;height:auto;padding:2mm 3mm 0}
</style></head><body><svg class="watermark" viewBox="0 0 630 920" aria-hidden="true"><defs><path id="arc" d="M 210,-50 C 700,170 210,300 580,560 S 780,880 340,1010" fill="none" stroke="#1f75aa" stroke-width="2"/></defs><g fill="none" stroke="#1f75aa" stroke-width="2"><use href="#arc"/><use href="#arc" transform="translate(11 0)"/><use href="#arc" transform="translate(22 0)"/><use href="#arc" transform="translate(33 0)"/><use href="#arc" transform="translate(44 0)"/><use href="#arc" transform="translate(55 0)"/><use href="#arc" transform="translate(66 0)"/><circle cx="505" cy="690" r="175"/><circle cx="495" cy="700" r="125"/><circle cx="485" cy="710" r="85"/><circle cx="475" cy="720" r="55"/></g></svg><main>${parts.join('\n')}</main></body></html>`;

writeFileSync(join(root, 'audit-code-detail-v1.3.html'), html);
