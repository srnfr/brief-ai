import { readFileSync, writeFileSync } from 'node:fs';

const root = new URL('..', import.meta.url).pathname;
const source = readFileSync(`${root}/audit-code-maitrise.md`, 'utf8');
const dgx = readFileSync(`${root}/assets/v1.3/nvidia-dgx-spark-officiel.jpg`);
const studio = readFileSync(`${root}/assets/v1.3/nvidia-studio-officiel.jpg`);

const esc = s => String(s).replaceAll('\\', '\\\\').replaceAll('(', '\\(').replaceAll(')', '\\)');
const wrap = (s, n = 91) => {
  const words = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1').split(/\s+/);
  const out = []; let line = '';
  for (const word of words) { if ((line + ' ' + word).trim().length > n) { if (line) out.push(line); line = word; } else line = (line + ' ' + word).trim(); }
  if (line) out.push(line); return out;
};

const pages = [];
function newPage(title = '') { const p = { ops: [], y: 790 }; pages.push(p); if (title) text(p, title, 42, p.y, 18, true, '#102e60'); p.y -= title ? 34 : 0; return p; }
function text(p, value, x, y, size = 10, bold = false, color = '#102e4c') { const [r,g,b] = color.replace('#','').match(/../g).map(v => parseInt(v,16)/255); p.ops.push(`q ${r} ${g} ${b} rg BT /${bold?'F2':'F1'} ${size} Tf ${x} ${y} Td (${esc(value)}) Tj ET Q`); }
function paragraph(p, value, size = 9.3) { for (const line of wrap(value, 94)) { if (p.y < 54) { footer(p); p = newPage(); } text(p, line, 42, p.y, size); p.y -= size + 4; } p.y -= 5; return p; }
function footer(p) { text(p, 'BlueTrusty · v1.3', 42, 28, 7.5, false, '#53718a'); }
function image(p, data, name, x, y, w, h) { p.ops.push(`q ${w} 0 0 ${h} ${x} ${y} cm /${name} Do Q`); }
function line(p,x1,y1,x2,y2,color='#2685b3',width=1.5,dash='') { p.ops.push(`q ${color==='mint'?'0.11 0.67 0.62':'0.15 0.52 0.70'} RG ${width} w ${dash?`[${dash}] 0 d`:''} ${x1} ${y1} m ${x2} ${y2} l S Q`); }
function box(p,x,y,w,h,title,label,fill='0.97 0.99 1') { p.ops.push(`q ${fill} rg 0.45 0.78 0.91 RG 1 w ${x} ${y} ${w} ${h} re B Q`); text(p,title,x+w/2-20,y+h-20,9,true); text(p,label,x+8,y+16,7,false,'#53718a'); }
function diagram(p) {
  text(p,'Flux contrôlés autour du modèle LLM',42,p.y,13,true,'#102e60'); p.y -= 28;
  text(p,'La plateforme reste connectée à Internet ; les interactions sont filtrées et journalisées.',42,p.y,8.5,false,'#53718a'); p.y -= 30;
  box(p,45,525,105,48,'Flux entrant','client / prompts'); box(p,180,525,125,48,'Gateway entrée','endpoint gateway','0.91 0.98 0.96');
  p.ops.push('q 0.06 0.18 0.38 rg 335 485 175 120 re f Q'); text(p,'PLATEFORME MATÉRIELLE',350,584,8,true,'#bde9f8'); box(p,360,535,125,42,'Modèle LLM','inférence locale','1 1 1'); box(p,360,495,125,30,'Embeddings','RAG / audit','0.85 0.96 0.94');
  box(p,545,525,135,48,'Egress gateway','proxy + interception','1 0.96 0.89'); box(p,545,455,135,48,'Filtre / logs','inspection + logs','1 0.96 0.89'); box(p,545,385,135,48,'Internet','destinations autorisées','0.93 0.95 0.97');
  line(p,150,549,180,549); line(p,305,549,335,549,'mint'); line(p,510,549,545,549); line(p,612,525,612,503); line(p,612,455,612,433); line(p,422,535,422,525,'mint'); line(p,545,409,510,505,'#2685b3',1.1,'4 3');
  p.ops.push('q 0.91 0.97 0.99 rg 45 310 470 52 re f Q'); text(p,'Contrôles de frontière',60,341,9,true); text(p,'liste blanche · inspection · journalisation · pas d’exfiltration non autorisée',60,323,7.5,false,'#53718a');
  text(p,'Entrée : gateway endpoint',45,270,8.5,true,'#1caa9e'); text(p,'Sortie : egress gateway + proxy avec interception et filtrage des logs',45,252,8.5,true,'#ec9b35');
}

const p0 = newPage(); text(p0,'Audit de cybersécurité de code logiciel par IA',42,720,22,true,'#102e60'); text(p0,'dans un environnement maîtrisé',42,690,17,true,'#102e60'); p0.ops.push('q 0.27 0.79 0.96 rg 42 670 510 4 re f Q'); p0.y=625;
paragraph(p0,'Version 1.3 — une plateforme IA locale, opérée dans une enclave européenne maîtrisée, avec des interactions Internet filtrées en entrée et en sortie.');
paragraph(p0,'BlueTrusty propose une analyse de sécurité du code logiciel mis à sa disposition par le client. L’objectif est d’identifier les vulnérabilités et les scénarios de risque qui méritent une correction ou une investigation complémentaire, puis de les restituer dans un rapport exploitable.');
paragraph(p0,'Le code source, les dépendances, les configurations et la documentation utile sont étudiés dans une enclave située en Union européenne. Le matériel IA mobilisé est réservé à cette fonction. L’analyse ne repose pas sur un service d’IA cloud mutualisé.');
footer(p0);

let p1 = newPage('Une plateforme matérielle dédiée');
paragraph(p1,'Selon le volume du périmètre, l’enclave s’appuie sur des capacités NVIDIA, notamment des puces Blackwell ou des châssis DGX. Les ressources sont réservées à l’audit et intégrées à l’enclave, sans recours à un service d’IA mutualisé.');
image(p1,dgx,'Im1',42,355,510,268); text(p1,'NVIDIA DGX Spark — illustration officielle NVIDIA.',42,338,8,false,'#53718a');
paragraph(p1,'Les interactions éventuellement nécessaires avec Internet passent par un sas de sécurité et d’inspection dédié. Les destinations autorisées relèvent d’une liste blanche stricte et tous les échanges qui traversent ce sas sont journalisés.'); footer(p1);

const p2 = newPage('Studio et mémoire d’audit');
paragraph(p2,'Tous nos rapports d’audit et travaux de recherche sont anonymisés, puis conservés dans un espace de stockage raw dédié et indexés dans une base de connaissances de type RAG (Retrieval-Augmented Generation).');
image(p2,studio,'Im2',42,420,510,268); text(p2,'NVIDIA Studio — illustration officielle NVIDIA.',42,403,8,false,'#53718a');
diagram(p2); footer(p2);

let cur = newPage('Déroulé de l’audit');
for (const raw of source.split(/\r?\n/)) {
  const s = raw.trim(); if (!s || s === '---' || s.startsWith('# ') || s.includes('Version 1.2')) continue;
  if (s.startsWith('## ')) { if (cur.y < 100) { footer(cur); cur = newPage(); } text(cur,s.slice(3),42,cur.y,13,true,'#102e60'); cur.y -= 25; continue; }
  const clean = s.replace(/^[-\d.]+\s+/, '').replace(/\*\*/g,''); cur = paragraph(cur,clean,9); 
}
footer(cur);

const objects=[]; const add=o=>{objects.push(o);return objects.length;};
const font1=add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>'); const font2=add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>');
const img1=add(`<< /Type /XObject /Subtype /Image /Width 1200 /Height 630 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${dgx.length} >>\nstream\n${dgx.toString('binary')}\nendstream`);
const img2=add(`<< /Type /XObject /Subtype /Image /Width 1200 /Height 630 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${studio.length} >>\nstream\n${studio.toString('binary')}\nendstream`);
const pageIds=[];
for (const p of pages) { const stream=p.ops.join('\n'); const content=add(`<< /Length ${Buffer.byteLength(stream,'binary')} >>\nstream\n${stream}\nendstream`); const page=add(`<< /Type /Page /Parent PAGES /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${font1} 0 R /F2 ${font2} 0 R >> /XObject << /Im1 ${img1} 0 R /Im2 ${img2} 0 R >> >> /Contents ${content} 0 R >>`); pageIds.push(page); }
const pagesId=add(`<< /Type /Pages /Kids [${pageIds.map(id=>`${id} 0 R`).join(' ')}] /Count ${pageIds.length} >>`);
const catalog=add(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`);
let pdf='%PDF-1.4\n%âãÏÓ\n'; const offsets=[0]; for(let i=0;i<objects.length;i++){offsets[i+1]=Buffer.byteLength(pdf,'binary'); pdf+=`${i+1} 0 obj\n${objects[i].replace('PAGES',`${pagesId} 0 R`)}\nendobj\n`;}
const xref=Buffer.byteLength(pdf,'binary'); pdf+=`xref\n0 ${objects.length+1}\n0000000000 65535 f \n`; for(let i=1;i<offsets.length;i++) pdf+=String(offsets[i]).padStart(10,'0')+' 00000 n \n'; pdf+=`trailer\n<< /Size ${objects.length+1} /Root ${catalog} 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
writeFileSync(`${root}/audit-code-detail-v1.3.pdf`, Buffer.from(pdf,'binary'));
console.log(`PDF généré : ${root}/audit-code-detail-v1.3.pdf (${pages.length} pages)`);
