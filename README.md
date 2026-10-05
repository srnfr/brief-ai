# Audit de code par IA en environnement maîtrisé

Ce dépôt contient les supports de présentation de l’offre BlueTrusty d’audit de cybersécurité de code logiciel.

- `audit-code-maitrise.md` : texte détaillé de l’offre et références.
- `fiche-audit-code.pdf` : fiche client d’une page A4.
- `fiche-audit-code.html` : source modifiable de la fiche PDF.
- `index.html` et `styles.css` : brochure consultable dans un navigateur.

La fiche reprend l’identité graphique de la page de garde du dépôt `srnfr/scan-hl-sept26` : fond bleu nuit, ondes géométriques, accent cyan et logo BlueTrusty blanc sans signature. Le logo importé se trouve dans `assets/bluetrusty-logo-white.png`.

Pour régénérer le PDF avec Chromium depuis la racine du dépôt :

```sh
chromium --headless --no-sandbox --no-pdf-header-footer \
  --print-to-pdf="$PWD/fiche-audit-code.pdf" \
  "file://$PWD/fiche-audit-code.html"
```

La fiche condense le texte du Markdown pour tenir sur une seule page ; le Markdown reste la version détaillée à relire pour toute évolution de l’offre.
