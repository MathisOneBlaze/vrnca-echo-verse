# 🚀 Guide de déploiement - Site Evergreen

## 📋 Vue d'ensemble

Ce guide décrit comment tester en local et déployer le site Evergreen sur le VPS.

**Dernière mise à jour**: 2024-11-10  
**Site en production**: https://evrgrn.mathisoneblaze.com

---

## 🧪 Test en local

### 1. Installation des dépendances

```bash
cd /Users/macbook/Documents/GitHub/vrnca-echo-verse
npm install
```

### 2. Lancement du serveur de développement

```bash
npm run dev
```

Le site sera accessible sur `http://localhost:5173`

### 3. Points à vérifier

- [ ] Page Biographie affiche le rectangle "Infos" avec les détails de l'artiste
- [ ] Shop affiche uniquement le CD Single Teddy Blaze (+ produits Printful si API configurée)
- [ ] Publications affiche l'article "Teddyverse"
- [ ] Toutes les images d'albums s'affichent correctement:
  - Teddy Blaze: Cover + Avatar Nounours
  - Trap Teddy: BD Comic Metro Studio Bingo
  - Trap Teddy 2: BD Comics Battle Royal + Bol Toloman
  - VRNCA.exe: Cover principal
  - Evil Blazy Vilain Teddy: Cover + Tracklist
- [ ] Navigation entre les pages fonctionne
- [ ] Panier fonctionne (ajout/suppression de produits)

---

## 📦 Build de production

### 1. Créer le build

```bash
npm run build
```

Résultat attendu:
- ✅ Build réussi en ~30 secondes
- ✅ Bundle size: ~1.5 MB (437 KB gzipped)
- ✅ Aucune erreur

### 2. Tester le build en local

```bash
npm run preview
```

Le site sera accessible sur `http://localhost:4173`

---

## 🌐 Déploiement sur VPS

### Pré-requis
- Accès SSH au VPS 168.231.85.181
- Build de production réussi

### Option 1: Script automatique (Recommandé)

```bash
./deploy-evrgrn.sh
```

Le script va:
1. Créer le build de production
2. Compresser les fichiers
3. Envoyer via SCP sur le VPS
4. Décompresser dans `/var/www/evrgrn`
5. Définir les bonnes permissions

### Option 2: Déploiement manuel

```bash
# 1. Build
npm run build

# 2. Compresser
tar -czf dist.tar.gz dist/

# 3. Envoyer au VPS
scp dist.tar.gz user@168.231.85.181:/tmp/

# 4. SSH sur le VPS
ssh user@168.231.85.181

# 5. Déployer
sudo tar -xzf /tmp/dist.tar.gz -C /var/www/evrgrn --strip-components=1
sudo chown -R www-data:www-data /var/www/evrgrn
sudo chmod -R 755 /var/www/evrgrn
```

---

## ✅ Vérification post-déploiement

### 1. Vérifier le site en production

Ouvrir https://evrgrn.mathisoneblaze.com et vérifier:

- [ ] HTTPS fonctionne (certificat SSL valide)
- [ ] Toutes les pages se chargent
- [ ] Images d'albums visibles
- [ ] Pas d'erreurs dans la console navigateur (F12)
- [ ] Navigation fluide
- [ ] Shop fonctionnel

### 2. Vérifier les logs Nginx (si nécessaire)

```bash
ssh user@168.231.85.181
sudo tail -f /var/log/nginx/evrgrn_access.log
sudo tail -f /var/log/nginx/evrgrn_error.log
```

### 3. Vérifier le certificat SSL

```bash
sudo certbot certificates
```

Expiration attendue: 5 février 2026  
Renouvellement automatique: ✅ Actif via `certbot.timer`

---

## 🔧 Résolution de problèmes

### Images ne s'affichent pas

**Cause**: Chemins incorrects dans `albumData.ts`  
**Solution**: Vérifier que les chemins commencent par `/Cover Art/`

```typescript
image: "/Cover Art/Teddy Blaze/00-Cover-TEDDYBLAZE-1200x1200.jpg"
```

### Erreur 404 sur les routes

**Cause**: Configuration Nginx SPA non appliquée  
**Solution**: Vérifier la config Nginx

```bash
ssh user@168.231.85.181
sudo nano /etc/nginx/sites-available/evrgrn

# Vérifier la présence de:
location / {
    try_files $uri $uri/ /index.html;
}
```

### Build échoue

**Cause**: Erreurs TypeScript ou imports manquants  
**Solution**: 

```bash
# Vérifier les erreurs
npm run build

# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Shop vide (pas de produits Printful)

**Cause**: API Printful non configurée ou erreur d'appel  
**Solution**: Vérifier la console navigateur pour erreurs API

---

## 📝 Checklist de déploiement

Avant chaque déploiement:

- [ ] Code testé en local (`npm run dev`)
- [ ] Build réussi (`npm run build`)
- [ ] Preview testé (`npm run preview`)
- [ ] Toutes les images présentes dans `/public/Cover Art/`
- [ ] Pas d'erreurs dans la console
- [ ] TASK.md mis à jour
- [ ] rapport.md mis à jour si changements majeurs

Après déploiement:

- [ ] Site accessible en production
- [ ] HTTPS fonctionne
- [ ] Toutes les pages testées
- [ ] Images visibles
- [ ] Aucune erreur 404 ou 500
- [ ] Performance acceptable (Lighthouse > 80)

---

## 🔄 Workflow de développement

### 1. Développement local

```bash
git pull origin main
npm install
npm run dev
# Faire les modifications
```

### 2. Test et validation

```bash
npm run build
npm run preview
# Tester toutes les fonctionnalités
```

### 3. Commit et push

```bash
git add .
git commit -m "Description des modifications"
git push origin main
```

### 4. Déploiement

```bash
./deploy-evrgrn.sh
```

### 5. Vérification

Ouvrir https://evrgrn.mathisoneblaze.com et tester

---

## 📞 Support

**Documentation complète**:
- PLANNING.md - Architecture et conventions
- TASK.md - Gestion des tâches
- rapport.md - Résumé des modifications

**Fichiers de déploiement**:
- deploy-evrgrn.sh - Script automatique
- DEPLOYMENT.md - Guide détaillé (si existe)

---

**Dernière mise à jour**: 2024-11-10 07:50
