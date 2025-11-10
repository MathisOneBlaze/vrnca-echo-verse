# TASK - Site Evergreen (vrnca-echo-verse)

## ✅ Tâches complétées

### 2024-11-10 - Mise à jour page biographie, nettoyage et intégration visuels
- [x] Ajout rectangle d'infos de base dans Biography (nom, pseudo, lieu, origine, style)
- [x] Nettoyage des produits placeholder du shop
- [x] Conservation uniquement CD Single Teddy Blaze et produits Printful
- [x] Création article "Teddyverse" dans Publications
- [x] Suppression articles placeholder (flow rap, production minimaliste, TOP 50)
- [x] Création fichiers PLANNING.md, TASK.md et rapport.md
- [x] Copie de 9 images d'albums depuis dossiers sources:
  - Teddy Blaze: Cover + Avatar Nounours (3 images)
  - Trap Teddy: BD Comic Metro Studio Bingo (1 image)
  - Trap Teddy 2: BD Comics Battle Royal + Bol Toloman (2 images)
  - VRNCA.exe: Cover principal (1 image)
  - Evil Blazy Vilain Teddy: Cover + Tracklist (2 images)
- [x] Mise à jour albumData.ts avec nouveaux chemins d'images
- [x] Build de production réussi (1.5 MB bundle, 437 KB gzipped)

### Déploiement initial (précédent)
- [x] Déploiement sur VPS 168.231.85.181
- [x] Configuration DNS pour evrgrn.mathisoneblaze.com
- [x] Installation certificat SSL Let's Encrypt
- [x] Configuration Nginx avec HTTP/2, gzip, cache
- [x] Script de déploiement automatisé (deploy-evrgrn.sh)

### Fonctionnalités de base
- [x] Pages principales (Biography, Music, Shop, Publications)
- [x] Système de navigation avec Header/Footer
- [x] Intégration Printful pour merchandising
- [x] Système de panier (CartContext)
- [x] Page dédiée par album avec routing dynamique
- [x] Lecteur audio intégré
- [x] Filtres et recherche dans la discographie

## 📋 Tâches en cours

### Test et validation
- [ ] Tester le site en local avec `npm run dev`
- [ ] Vérifier affichage de toutes les nouvelles images
- [ ] Tester navigation entre pages albums
- [ ] Vérifier fonctionnement du shop et panier

## 🎯 Tâches à venir

### Contenu
- [ ] Compléter les descriptions d'albums avec textes des dossiers sources
- [ ] Ajouter plus de clips vidéo YouTube dans Publications
- [ ] Créer pages détaillées pour articles majeurs (Teddyverse, etc.)
- [ ] Ajouter section "Collaborateurs" sur page Biography
- [ ] Créer page dédiée pour projet VRNCA avec timeline

### Fonctionnalités
- [ ] Améliorer le player audio (playlist, contrôles avancés)
- [ ] Ajouter système de newsletter
- [ ] Créer calendrier d'événements/concerts
- [ ] Implémenter recherche globale sur le site
- [ ] Ajouter animations Three.js sur page d'accueil

### Shop
- [ ] Vérifier intégration Kunaki pour CDs
- [ ] Ajouter plus de produits Printful (t-shirts, posters)
- [ ] Implémenter système de paiement (Stripe/PayPal)
- [ ] Ajouter système de codes promo
- [ ] Créer page "Commandes" pour suivi

### Optimisations
- [ ] Optimiser chargement des images (lazy loading, WebP)
- [ ] Améliorer SEO (meta tags, sitemap, robots.txt)
- [ ] Ajouter analytics (Google Analytics ou Plausible)
- [ ] Optimiser bundle size (code splitting)
- [ ] Ajouter PWA features (service worker, offline)

### Testing
- [ ] Tests unitaires pour composants critiques
- [ ] Tests E2E pour parcours utilisateur (shop, navigation)
- [ ] Tests de performance (Lighthouse)
- [ ] Tests d'accessibilité (a11y)

## 🐛 Bugs connus

_Aucun bug critique identifié pour le moment_

## 💡 Idées futures

### Projets ambitieux
- [ ] Section blog/journal de création
- [ ] Espace membres avec contenus exclusifs
- [ ] Integration streaming (Spotify embed, SoundCloud)
- [ ] Galerie photos haute résolution
- [ ] Section samples/beats à télécharger
- [ ] Chatbot AI pour guider les visiteurs
- [ ] Version multilingue (FR/EN)

### Collaborations
- [ ] Page dédiée aux collaborations avec autres artistes
- [ ] Formulaire de contact pour propositions artistiques
- [ ] Showcase pour artistes signés EVRGRN

### Expériences interactives
- [ ] Visualizer audio interactif avec Three.js
- [ ] Timeline interactive de la carrière
- [ ] Quiz "Quel album EVRGRN es-tu ?"
- [ ] Easter eggs cachés dans le site

## 📝 Notes de développement

### Conventions à respecter
- Toujours créer un test Pytest pour nouvelles features
- Fichiers < 500 lignes max
- Mettre à jour TASK.md après chaque session
- Documenter les fonctions complexes
- Utiliser TypeScript strict

### Avant chaque déploiement
1. `npm run build` - Vérifier que le build passe
2. Tester en local avec `npm run preview`
3. Vérifier que toutes les images sont présentes
4. Lancer `./deploy-evrgrn.sh` pour déployer
5. Vérifier le site en production
6. Marquer la tâche comme complétée dans TASK.md

### Ressources externes
- Images albums: `/Volumes/SAFEHOUSE/00 MATHIS ONEBLAZE/01 MUSIQUE/01 PROJETS/`
- Documentation Printful: https://developers.printful.com/
- React Router docs: https://reactrouter.com/
- Three.js docs: https://threejs.org/docs/

---

**Dernière mise à jour**: 2024-11-10  
**Prochaine session**: Intégration des visuels d'albums
