# Audit de code par IA en environnement maîtrisé

Ce dépôt contient les supports de présentation de l’offre BlueTrusty d’audit de cybersécurité de code logiciel.

- `audit-code-maitrise.md` : texte détaillé de l’offre et références.
- `fiche-audit-code.pdf` : fiche client d’une page A4.
- `fiche-audit-code.html` : source modifiable de la fiche PDF.
- `audit-code-detail.pdf` : version PDF complète du texte Markdown.
- `audit-code-detail.html` : fichier intermédiaire généré à partir du Markdown.
- `index.html` et `styles.css` : brochure consultable dans un navigateur.

La fiche reprend l’identité graphique de la page de garde du dépôt `srnfr/scan-hl-sept26` : fond bleu nuit, ondes géométriques, accent cyan et logo BlueTrusty blanc sans signature. Le logo importé se trouve dans `assets/bluetrusty-logo-white.png`.

## Régénérer les PDF

Depuis la racine du dépôt, avec Node.js et Chromium installés :

```sh
./scripts/generer-fiche-pdf.sh
./scripts/generer-markdown-pdf.sh
```

Les scripts cherchent automatiquement `chromium`, `chromium-browser` ou `google-chrome`. Si le navigateur se trouve ailleurs, indiquez son chemin :

```sh
CHROMIUM_BIN=/chemin/vers/chromium ./scripts/generer-markdown-pdf.sh
```

Le premier script imprime `fiche-audit-code.html` en une page A4. Le second transforme `audit-code-maitrise.md` en `audit-code-detail.html`, puis imprime le PDF complet. Celui-ci reprend le logo et le motif géométrique en filigrane. Les liens du Markdown restent cliquables dans le PDF. Après une modification du texte détaillé, régénérez le PDF avec le second script ; après une modification de la fiche, utilisez le premier.

La fiche condense le Markdown pour tenir sur une seule page. Le Markdown reste la source de référence pour la version détaillée de l’offre.
