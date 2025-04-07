
# Guide d'intégration API pour EVRGRN

## Intégration de l'API Gemini pour le chatbot VRNCA

Pour connecter l'API Gemini au chatbot VRNCA, voici les étapes à suivre:

1. **Obtenir une clé API Gemini**
   - Créez un compte sur Google AI Studio (https://aistudio.google.com/)
   - Générez une clé API pour Gemini 2.0 Flash Thinking Experimental 01-21
   - Sécurisez cette clé API et ne l'exposez jamais dans le code front-end

2. **Création d'un backend sécurisé**
   - Utilisez une solution backend comme Supabase Edge Functions ou Firebase Cloud Functions
   - Créez une fonction qui servira de proxy pour les appels à l'API Gemini
   - Stockez la clé API en tant que variable d'environnement sécurisée

3. **Exemple d'implémentation avec Supabase Edge Functions**
   ```typescript
   // supabase/functions/gemini-proxy/index.ts
   import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

   serve(async (req) => {
     try {
       const { prompt } = await req.json();
       
       // Validation
       if (!prompt || typeof prompt !== 'string') {
         return new Response(
           JSON.stringify({ error: "Un prompt valide est requis" }),
           { status: 400, headers: { "Content-Type": "application/json" } }
         );
       }
       
       // Appel à l'API Gemini
       const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-thinking-001:generateContent", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
           "x-goog-api-key": Deno.env.get("GEMINI_API_KEY") || "",
         },
         body: JSON.stringify({
           contents: [
             {
               parts: [
                 { text: "Tu es VRNCA, l'assistant IA d'EVRGRN. Réponds de manière concise et avec la personnalité de VRNCA." },
                 { text: prompt }
               ]
             }
           ],
           generationConfig: {
             temperature: 0.4,
             topK: 32,
             topP: 0.95,
             maxOutputTokens: 1024,
           }
         }),
       });
       
       const data = await response.json();
       
       return new Response(
         JSON.stringify(data),
         { headers: { "Content-Type": "application/json" } }
       );
     } catch (error) {
       return new Response(
         JSON.stringify({ error: error.message }),
         { status: 500, headers: { "Content-Type": "application/json" } }
       );
     }
   });
   ```

4. **Modification du front-end pour utiliser l'API**
   ```typescript
   // Mise à jour de la fonction handleSubmit dans ChatbotService.tsx
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     
     if (!userInput.trim()) return;
     
     // Add user message to conversation
     setConversation(prev => [
       ...prev,
       { role: 'user', content: userInput }
     ]);
     
     // Play reaction animation
     await playTypingAnimation(setFaceExpression);
     
     setIsLoading(true);
     playThinkingAnimation(setFaceExpression);
     
     try {
       // Appel à votre fonction proxy Supabase
       const response = await fetch('https://your-project.supabase.co/functions/v1/gemini-proxy', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           // Ajoutez ici les en-têtes d'authentification Supabase si nécessaire
         },
         body: JSON.stringify({ prompt: userInput })
       });
       
       const data = await response.json();
       
       if (data.error) {
         throw new Error(data.error);
       }
       
       // Extraction de la réponse de Gemini
       const aiResponse = data.candidates[0].content.parts[0].text;
       
       setConversation(prev => [
         ...prev,
         { role: 'assistant', content: aiResponse }
       ]);
     } catch (error) {
       console.error('Error calling Gemini API:', error);
       setConversation(prev => [
         ...prev,
         { role: 'assistant', content: "Je rencontre des difficultés à me connecter. Veuillez réessayer plus tard." }
       ]);
     } finally {
       setFaceExpression('laugh1');
       setTimeout(() => {
         setFaceExpression('neutral');
       }, 500);
       
       setIsLoading(false);
       setUserInput('');
     }
   };
   ```

## Gestion des soumissions du formulaire de contact

Pour sauvegarder les informations envoyées via le formulaire de contact, voici les solutions recommandées:

### Option 1: Intégration avec un service d'email

1. **Utilisation de services comme EmailJS, FormSubmit ou Formspree**
   - Ces services permettent d'envoyer des emails directement depuis le frontend
   - Exemple avec EmailJS:

   ```typescript
   // Installation: npm install @emailjs/browser
   import emailjs from '@emailjs/browser';

   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     setIsSubmitting(true);
     
     emailjs.send(
       'YOUR_SERVICE_ID',  // Créez un service dans votre compte EmailJS
       'YOUR_TEMPLATE_ID', // Créez un template d'email
       {
         name: formData.name,
         email: formData.email,
         phone: formData.phone,
         message: formData.message,
         newsletter: formData.newsletter
       },
       'YOUR_PUBLIC_KEY'   // Votre clé publique EmailJS
     )
     .then(() => {
       toast.success('Message envoyé avec succès!');
       // Reset form
       setFormData({
         name: '',
         email: '',
         phone: '',
         message: '',
         newsletter: false
       });
     })
     .catch((error) => {
       console.error('Error sending email:', error);
       toast.error('Erreur lors de l\'envoi du message. Veuillez réessayer.');
     })
     .finally(() => {
       setIsSubmitting(false);
     });
   };
   ```

### Option 2: Stockage dans une base de données (avec Supabase)

1. **Création d'une table dans Supabase**
   - Créez une table `contact_submissions` avec les champs appropriés

2. **Intégration frontend**
   ```typescript
   import { createClient } from '@supabase/supabase-js';

   // Initialisez le client Supabase (avec les clés publiques uniquement)
   const supabaseUrl = 'YOUR_SUPABASE_URL';
   const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
   const supabase = createClient(supabaseUrl, supabaseKey);

   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setIsSubmitting(true);
     
     try {
       const { error } = await supabase
         .from('contact_submissions')
         .insert([
           {
             name: formData.name,
             email: formData.email,
             phone: formData.phone,
             message: formData.message,
             newsletter: formData.newsletter,
             submitted_at: new Date()
           }
         ]);
         
       if (error) throw error;
       
       toast.success('Message envoyé avec succès!');
       // Reset form
       setFormData({
         name: '',
         email: '',
         phone: '',
         message: '',
         newsletter: false
       });
     } catch (error) {
       console.error('Error saving contact submission:', error);
       toast.error('Erreur lors de l\'envoi du message. Veuillez réessayer.');
     } finally {
       setIsSubmitting(false);
     }
   };
   ```

### Option 3: Webhook vers un service externe (exemple avec Zapier)

1. **Création d'un webhook Zapier**
   - Créez un Zap qui commence par un webhook
   - Configurez des actions comme l'envoi d'emails ou le stockage dans Google Sheets

2. **Intégration frontend**
   ```typescript
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setIsSubmitting(true);
     
     try {
       const response = await fetch('YOUR_ZAPIER_WEBHOOK_URL', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({
           name: formData.name,
           email: formData.email,
           phone: formData.phone,
           message: formData.message,
           newsletter: formData.newsletter,
           timestamp: new Date().toISOString()
         })
       });
       
       if (!response.ok) throw new Error('Erreur réseau');
       
       toast.success('Message envoyé avec succès!');
       // Reset form
       setFormData({
         name: '',
         email: '',
         phone: '',
         message: '',
         newsletter: false
       });
     } catch (error) {
       console.error('Error sending to webhook:', error);
       toast.error('Erreur lors de l\'envoi du message. Veuillez réessayer.');
     } finally {
       setIsSubmitting(false);
     }
   };
   ```

## Intégration de l'API Printful pour la boutique

Pour connecter la boutique EVRGRN à Printful, voici les étapes à suivre:

1. **Création d'un compte Printful et obtention d'une clé API**
   - Créez un compte sur Printful (https://www.printful.com/)
   - Générez une clé API dans les paramètres de votre compte
   - Sécurisez cette clé dans un environnement backend

2. **Création d'un backend pour interagir avec l'API Printful**
   - Utilisez Supabase Edge Functions ou une solution similaire
   - Créez des endpoints pour les opérations suivantes:
     - Récupération des produits
     - Calcul des frais d'expédition
     - Traitement des commandes

3. **Exemple d'implémentation avec Supabase Edge Functions**
   ```typescript
   // supabase/functions/printful-products/index.ts
   import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

   serve(async (req) => {
     try {
       // Appel à l'API Printful pour récupérer les produits
       const response = await fetch("https://api.printful.com/store/products", {
         headers: {
           "Authorization": `Bearer ${Deno.env.get("PRINTFUL_API_KEY")}`,
         },
       });
       
       const data = await response.json();
       
       return new Response(
         JSON.stringify(data),
         { headers: { "Content-Type": "application/json" } }
       );
     } catch (error) {
       return new Response(
         JSON.stringify({ error: error.message }),
         { status: 500, headers: { "Content-Type": "application/json" } }
       );
     }
   });
   ```

4. **Intégration frontend pour la boutique**
   - Créez un service pour interagir avec votre API Printful
   - Implémentez les fonctionnalités de boutique en ligne
   - Gérez le panier et le processus de paiement

---

Ces recommandations sont des guides pour l'implémentation future. Leur mise en œuvre nécessite une configuration backend appropriée et une gestion sécurisée des clés API.
