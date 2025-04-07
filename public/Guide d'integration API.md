
# Guide d'intégration API EVRGRN

## Introduction

Ce guide décrit comment intégrer l'API EVRGRN à vos applications et services. L'API EVRGRN permet d'accéder aux données musicales, aux événements, aux produits de la boutique et bien plus encore.

## Authentification

Toutes les requêtes à l'API EVRGRN nécessitent une authentification. Pour obtenir une clé API, contactez-nous via le formulaire de contact en spécifiant votre cas d'utilisation.

## Points de terminaison disponibles

- `/api/v1/music` - Accès au catalogue musical
- `/api/v1/events` - Événements à venir
- `/api/v1/products` - Produits de la boutique
- `/api/v1/publications` - Publications et articles

## Exemples d'utilisation

### Récupérer la liste des albums

```javascript
fetch('https://api.evrgrn.com/api/v1/music/albums', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})
.then(response => response.json())
.then(data => console.log(data));
```

### Récupérer les produits de la boutique

```javascript
fetch('https://api.evrgrn.com/api/v1/products', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})
.then(response => response.json())
.then(data => console.log(data));
```

## Intégration avec Printful

Pour l'intégration avec Printful, suivez ces étapes :

1. Créez un compte sur [Printful](https://www.printful.com/)
2. Générez une clé API dans les paramètres de votre compte Printful
3. Utilisez notre middleware d'intégration pour connecter votre boutique EVRGRN à Printful

```javascript
// Exemple d'intégration Printful
const printfulClient = require('printful-client');

const client = new printfulClient({
  apiKey: 'YOUR_PRINTFUL_API_KEY'
});

// Synchroniser un produit EVRGRN avec Printful
client.products.create({
  name: 'T-shirt EVRGRN',
  variants: [
    {
      name: 'S',
      price: '19.99',
      retail_price: '29.99'
    },
    {
      name: 'M',
      price: '19.99',
      retail_price: '29.99'
    },
    {
      name: 'L',
      price: '19.99',
      retail_price: '29.99'
    }
  ]
});
```

## Limites de taux

L'API EVRGRN impose des limites de taux pour assurer la stabilité du service. Les limites actuelles sont :

- 100 requêtes par minute pour les clés API standard
- 1000 requêtes par minute pour les clés API premium

## Support

Pour toute question concernant l'API EVRGRN, contactez notre équipe de support technique à l'adresse api-support@evrgrn.com.
