# Brasserie virtuelle — Compositeur de bière en 3D

Site pédagogique 100% statique (HTML/CSS/JS, aucun outil de build) sur la
fabrication de la bière, avec un compositeur de recette et un verre rendu en
vraie 3D CSS (perspective + transformations 3D), sans bibliothèque externe.

## Structure du projet

```
biere-compositeur/
├── index.html
├── css/
│   └── style.css
└── js/
    ├── beer-styles-data.js   (données pédagogiques + styles de bière réels)
    ├── beer-visual.js        (rendu du verre en 3D CSS : perspective, transform-style, variables CSS)
    └── ui.js                 (logique d'interface)
```

Aucune bibliothèque externe n'est utilisée pour la 3D : le verre est en
vraie 3D CSS (perspective + transformations 3D + variables CSS
personnalisées), animée nativement par le moteur du navigateur — pas de
boucle de rendu JavaScript à maintenir, pas de contexte WebGL à charger.

## Tester en local avant de déployer

Comme le site est 100% statique, un simple serveur local suffit (ouvrir
`index.html` directement dans le navigateur via `file://` peut bloquer
certains navigateurs pour des raisons de sécurité liées aux scripts) :

```bash
cd biere-compositeur
python3 -m http.server 8000
# puis ouvrez http://localhost:8000 dans votre navigateur
```

## Déployer sur GitHub Pages

1. Créez un nouveau dépôt sur GitHub (par exemple `biere-compositeur`).
2. Dans un terminal, à la racine du dossier `biere-compositeur/` :

   ```bash
   git init
   git add .
   git commit -m "Premier déploiement du compositeur de bière"
   git branch -M main
   git remote add origin https://github.com/<votre-utilisateur>/biere-compositeur.git
   git push -u origin main
   ```

   (Préférez toujours cette méthode en ligne de commande au glisser-déposer
   sur l'interface web de GitHub, qui aplatit parfois l'arborescence des
   dossiers `css/` et `js/` à la racine.)

3. Sur GitHub, allez dans **Settings → Pages**.
4. Dans **Build and deployment**, choisissez **Deploy from a branch**,
   branche `main`, dossier `/ (root)`.
5. Après une minute ou deux, votre site est en ligne à l'adresse :
   `https://<votre-utilisateur>.github.io/biere-compositeur/`

## Mettre à jour le site plus tard

```bash
git add .
git commit -m "Description du changement"
git push
```

GitHub Pages republie automatiquement à chaque `push` sur `main`.
