
# Guide d'intégration API Chatbot VRNCA

## Vue d'ensemble
Ce document décrit comment intégrer votre propre API de chatbot avec le système VRNCA pour remplacer les réponses aléatoires actuelles par un modèle d'IA entraîné.

## Architecture recommandée

### 1. Backend API
Créez un endpoint REST ou GraphQL qui :
- Reçoit les messages utilisateur
- Traite la requête avec votre modèle entraîné
- Retourne une réponse formatée

#### Exemple d'endpoint REST :
```
POST /api/vrnca/chat
Content-Type: application/json

{
  "message": "string",
  "conversation_history": [
    {
      "role": "user|assistant",
      "content": "string",
      "timestamp": "ISO 8601"
    }
  ],
  "user_context": {
    "session_id": "string",
    "user_preferences": {}
  }
}
```

#### Réponse attendue :
```json
{
  "response": "string",
  "confidence": 0.95,
  "emotion": "neutral|happy|thinking|surprised",
  "metadata": {
    "processing_time": "100ms",
    "model_version": "1.0.0"
  }
}
```

### 2. Intégration Frontend

#### Variables d'environnement requises :
```typescript
// À ajouter dans votre configuration
const VRNCA_API_URL = process.env.VRNCA_API_URL || 'http://localhost:3001/api/vrnca';
const VRNCA_API_KEY = process.env.VRNCA_API_KEY;
```

#### Modification du service ChatbotService.tsx :

1. **Remplacer la fonction getRandomResponse()** par :
```typescript
const callVrncaAPI = async (message: string, conversationHistory: any[]) => {
  try {
    const response = await fetch(`${VRNCA_API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VRNCA_API_KEY}`,
      },
      body: JSON.stringify({
        message,
        conversation_history: conversationHistory,
        user_context: {
          session_id: generateSessionId(),
          timestamp: new Date().toISOString()
        }
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return {
      content: data.response,
      emotion: data.emotion || 'neutral',
      confidence: data.confidence
    };
  } catch (error) {
    console.error('Erreur API VRNCA:', error);
    // Fallback sur les réponses aléatoires
    return {
      content: getRandomResponse(),
      emotion: 'neutral',
      confidence: 0.5
    };
  }
};
```

2. **Modifier le handleSubmit()** pour utiliser l'API :
```typescript
// Dans handleSubmit, remplacer :
// let response = getRandomResponse();
// Par :
const apiResponse = await callVrncaAPI(userInput, conversation);
let response = apiResponse.content;

// Adapter l'expression faciale selon l'émotion
switch(apiResponse.emotion) {
  case 'happy':
    setFaceExpression('laugh1');
    break;
  case 'thinking':
    setFaceExpression('neutral');
    break;
  case 'surprised':
    setFaceExpression('surprised');
    break;
  default:
    setFaceExpression('neutral');
}
```

### 3. Entraînement du modèle

#### Données d'entraînement recommandées :
```json
{
  "training_data": [
    {
      "input": "Qui est VRNCA ?",
      "output": "Je suis VRNCA, l'IA de l'écosystème EVRGRN...",
      "context": "identity",
      "emotion": "neutral"
    },
    {
      "input": "Parle-moi de la musique d'EVRGRN",
      "output": "L'univers musical d'EVRGRN explore...",
      "context": "music",
      "emotion": "happy"
    }
  ]
}
```

#### Contextes à entraîner :
- **Identity** : Questions sur VRNCA et l'écosystème EVRGRN
- **Music** : Catalogue musical, albums, collaborations
- **Services** : Consulting, formation, ateliers
- **Publications** : Livres, articles, médias
- **Games** : VRNCA-LAG, Good Run Evil
- **Philosophy** : Vision artistique, manifesto
- **Technical** : Questions sur le site, fonctionnalités

### 4. Configuration Supabase (recommandée)

Si vous utilisez Supabase pour le backend :

1. **Créer une Edge Function** :
```typescript
// functions/vrnca-chat/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  const { message, conversation_history } = await req.json()
  
  // Appel à votre modèle d'IA
  const response = await processWithAI(message, conversation_history)
  
  return new Response(
    JSON.stringify(response),
    { headers: { "Content-Type": "application/json" } },
  )
})
```

2. **Stocker la clé API** dans les secrets Supabase

### 5. Sécurité

- Utilisez HTTPS pour toutes les communications
- Implémentez un rate limiting (ex: 10 requêtes/minute/utilisateur)
- Validez et sanitisez toutes les entrées
- Loggez les conversations pour améliorer le modèle
- Implémentez une authentification si nécessaire

### 6. Monitoring et Analytics

Ajoutez des métriques pour suivre :
- Temps de réponse de l'API
- Taux de confiance des réponses
- Satisfaction utilisateur
- Erreurs et fallbacks

### 7. Déploiement

1. Déployez votre API backend
2. Configurez les variables d'environnement
3. Testez l'intégration en mode développement
4. Déployez en production avec monitoring

## Points d'attention

- **Fallback** : Toujours avoir un système de réponses de secours
- **Performance** : Temps de réponse < 2 secondes recommandé
- **Évolutivité** : Préparer la montée en charge
- **Personnalisation** : Adapter les réponses au contexte utilisateur

Cette architecture vous permettra d'avoir un chatbot VRNCA personnalisé tout en gardant une expérience utilisateur fluide.
