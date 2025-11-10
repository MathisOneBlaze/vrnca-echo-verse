# PLANNING - Site Evergreen (vrnca-echo-verse)

## 📋 Vue d'ensemble du projet

**Nom du projet**: Evergreen (EVRGRN)  
**Type**: Site web artistique pour Mathis OneBlaze  
**Stack technique**: React 18 + TypeScript + Vite + Three.js  
**Déploiement**: VPS 168.231.85.181 à /var/www/evrgrn  
**URL**: https://evrgrn.mathisoneblaze.com  
**Status**: Déployé et en production

## 🎯 Objectif du site

Présenter l'univers artistique de Mathis OneBlaze (EVRGRN label), incluant:
- Biographie et parcours musical
- Discographie complète avec pages dédiées par album
- Shop avec produits physiques (CDs, merchandising via Printful)
- Publications (articles de presse, livres, clips vidéo)
- Projets artistiques (VRNCA, Teddyverse, Le Trousseau)

## 🏗️ Architecture du projet

### Structure des dossiers
```
src/
├── components/        # Composants réutilisables
│   ├── layout/       # Header, Footer, Navigation
│   ├── shop/         # Composants boutique
│   └── ...
├── pages/            # Pages principales
│   ├── Biography.tsx
│   ├── Music.tsx
│   ├── Shop.tsx
│   ├── Publications.tsx
│   ├── AlbumPage.tsx
│   └── ...
├── data/             # Données statiques
│   └── albumData.ts  # Données des albums
├── services/         # Services externes
│   └── PrintfulService.ts
├── context/          # React contexts
└── utils/            # Utilitaires
```

### Pages principales
1. **Index** (`/`) - Page d'accueil avec présentation
2. **Biography** (`/biography`) - Biographie, réseaux sociaux, infos artiste
3. **Music** (`/music`) - Discographie avec filtres et lecteur
4. **Album Page** (`/album/:id`) - Page dédiée par album
5. **Shop** (`/shop`) - Boutique avec intégration Printful
6. **Publications** (`/publications`) - Articles, presse, clips, livres

## 🎨 Style et design

### Palette de couleurs
- **evrgrn-dark**: Fond principal sombre
- **evrgrn-muted**: Fond secondaire
- **evrgrn-accent**: Couleur d'accent (vert signature)
- **evrgrn-darker**: Variante plus sombre

### Typographie
- **Fonte principale**: System fonts (sans-serif)
- **Fonte titre**: Serif pour les titres importants

### Principes de design
- Interface minimaliste et épurée
- Focus sur le contenu musical et visuel
- Navigation intuitive
- Responsive design (mobile-first)

## 🛍️ Système de boutique

### Intégrations
- **Printful**: Pour le merchandising (pull, vêtements)
- **Kunaki**: Pour les CDs physiques (via product IDs)

### Produits actuels
- CD Single Teddy Blaze (format physique avec livret)
- Pull EVRGRN (via Printful)

### Gestion du panier
- Context API React pour state management
- Données persistées en localStorage

## 📀 Discographie

### Albums principaux
- **VRNCA Patch 1.2.exe** (2024) - Mise à jour du programme VRNCA
- **Evil Blazy Vilain Teddy** (2022) - Dualité du personnage Teddy
- **VRNCA.exe** (2022) - Combat contre la censure numérique
- **Trap Teddy 2** (2021) - Suite de l'univers Teddy
- **Trap Teddy** (2020) - Introduction du Teddyverse
- **#TeddyBlaze** (2018) - Origines du concept
- **Letters on Fallen Fall Leaves** (2016) - Voyage introspectif
- **Magnum 2** (2016) - Œuvre au Blanc (trilogie alchimique)
- **MAGNUM** (2015) - Œuvre au Noir

### Caractéristiques des albums
Chaque album possède:
- Cover art officiel
- Description narrative
- Crédits de production
- Concept visuel
- Caractéristiques musicales (calm/dancing, engaged/silly, reality/fiction)
- Liens Spotify
- Images additionnelles

## 🔧 Conventions de code

### React/TypeScript
- Composants fonctionnels avec hooks
- TypeScript strict pour type safety
- Interfaces pour tous les types de données
- Props destructuring

### Imports
- Imports relatifs au sein des packages
- Alias `@/` pour `src/`

### Naming
- **Composants**: PascalCase (ex: `Biography.tsx`)
- **Fichiers utilitaires**: camelCase
- **Constants**: UPPER_SNAKE_CASE

## 📦 Dépendances principales

- **react** & **react-dom**: ^18.x
- **vite**: Build tool
- **typescript**: Type checking
- **tailwindcss**: Styling
- **lucide-react**: Icônes
- **react-router-dom**: Routing
- **three**: 3D graphics (pour VRNCA head)

## 🚀 Déploiement

### Configuration Nginx
- Serveur configuré avec SSL (Let's Encrypt)
- HTTP/2 activé
- Gzip compression
- Cache headers optimisés
- Redirect HTTP → HTTPS

### Scripts de déploiement
- `deploy-evrgrn.sh`: Script de déploiement automatisé
- Build: `npm run build`
- Preview: `npm run preview`

## 📝 Règles de développement

### Tests
- Tests Pytest pour nouvelles fonctionnalités (si backend ajouté)
- Tests dans `/tests` mirror de la structure app

### Modularité
- **Jamais de fichier > 500 lignes**
- Découpage en modules/helpers si nécessaire
- Séparation claire des responsabilités

### Documentation
- Docstrings Google style pour fonctions
- Comments pour logique complexe
- README.md à jour avec setup et features

### Qualité du code
- Type hints partout (TypeScript)
- Code formatté et lisible
- Pas de code mort
- Pas de hardcoding (utiliser env vars)

## 🎯 Projets artistiques

### VRNCA
Univers narratif explorant l'intersection technologie/humanité. Entité numérique combattant la censure et le shadow ban.

### Teddyverse
Univers conceptuel développé à travers plusieurs albums (#TeddyBlaze, Trap Teddy, Trap Teddy 2, Evil Blazy). Fusion rap/trap caribéen.

### Le Trousseau
Association culturelle et livre sur l'indépendance artistique et la création authentique.

## 🔄 Maintenance

### Mises à jour régulières
- Nouvelles sorties d'albums à ajouter dans `albumData.ts`
- Articles de presse dans `Publications.tsx`
- Nouveaux produits shop dans `ShopData.ts`

### Monitoring
- Vérifier les certificats SSL (renouvellement auto via certbot)
- Surveiller les performances du site
- Mettre à jour les dépendances régulièrement

---

**Dernière mise à jour**: 2024-11-10
