# MyBeer — Studio de brassage interactif

Site pédagogique statique HTML/CSS/JavaScript permettant de composer un profil de bière puis de découvrir les **styles brassicoles les plus proches**. L'expérience comprend un verre animé en CSS 3D, un questionnaire sensoriel de **14 étapes**, des comparaisons de résultats et une encyclopédie consultable.

## Ce que fait le site

- 14 critères : fermentation (ou « Je ne sais pas »), tradition, malt, houblon, arômes, douceur, carbonatation, degré d’alcool, acidité, corps, caractère des levures, torréfaction, signature particulière et limpidité
- Verre en perspective 3D qui adapte couleur, mousse et bulles selon les réponses
- Score **heuristique** multi-critères, fondé sur des profils sensoriels et non sur une probabilité statistique ; l'affichage montre le style principal et deux alternatives
- Encyclopédie de **121 profils de styles**, avec recherche, filtres par famille, description distincte et plages d'alcool indicatives
- Accessible sans création de compte, sans base distante ni bibliothèque graphique externe

### Limites importantes

**Style ≠ produit commercial.** Les styles de bière forment des familles descriptives qui évoluent. Il existe une multitude de recettes, millésimes et éditions limitées impossibles à couvrir exhaustivement dans une base figée. Certains styles ne correspondent pas à une catégorie BJCP indépendante (p. ex. appellations modernes IPA, interprétations régionales), et leurs caractéristiques peuvent varier selon les brasseries.

**Résultat ≠ recette certifiée.** L’utilisateur décrit un profil désiré ; le moteur attribue des proximités descriptives, il ne calcule ni OG/FG ni IBU/ABV mesurés ni garantie de fermentation. La proximité affichée **n'est pas un taux de confiance**. Les plages d'alcool et caractéristiques sont indicatives. Les exemples commerciaux sont illustratifs et ne sont pas une base de produits en temps réel.

Les descriptions sont des **synthèses originales**, basées notamment sur les sources publiques suivantes, sans reproduction intégrale de leurs notices :

- [BJCP 2021 — Beer Style Guidelines](https://www.bjcp.org/style/2021/beer/)
- [Brewers Association — Beer Style Guidelines, édition 2026](https://www.brewersassociation.org/edu/brewers-association-beer-style-guidelines/)

## Structure

```
index.html
css/style.css
css/experience.css         # mise en scène 3D
css/knowledge.css          # questionnaire avancé et encyclopédie
js/beer-styles-data.js     # socle historique des styles et explications
js/beer-knowledge.js       # profils étendus et calcul sensoriel v2
js/beer-visual.js         # fond et ambiance
js/experience.js          # verre animé, statistiques visuelles
js/catalog.js             # recherche et filtres
js/ui.js                  # questionnaire et résultats
tests/knowledge.cjs       # cohérence de la base et scénarios repères
tests/smoke.cjs           # test DOM du parcours complet
tests/browser.cjs         # tests Chrome ordinateur / mobile
.github/workflows/quality.yml
```

## Développement et tests

Pas de build : servir la racine avec `python3 -m http.server 8000`, puis ouvrir `http://localhost:8000/`.

Le workflow GitHub Actions **MyBeer — quality gate** vérifie :
1. La syntaxe JavaScript.
2. La cohérence des profils et des recettes de référence.
3. Les 14 étapes et la recherche documentaire.
4. Les parcours Chrome desktop et mobile, avec captures disponibles en artefacts.
5. L'accès public aux fichiers sur GitHub Pages une fois déployés.

Site public : https://cosscoll.github.io/MyBeer/
