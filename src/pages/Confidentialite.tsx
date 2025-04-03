
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ParticleBackground from '@/components/ui/ParticleBackground';
import { Card } from '@/components/ui/card';

const Confidentialite = () => {
  return (
    <div className="min-h-screen flex flex-col bg-evrgrn-dark">
      <Header />
      <ParticleBackground />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Politique de confidentialité</h1>
          
          <Card className="p-6 md:p-8 mb-8 bg-evrgrn-darker/90 border-evrgrn-accent/20">
            <h2 className="text-xl md:text-2xl font-medium mb-4 text-evrgrn-accent">1. Collecte des données personnelles</h2>
            <p className="mb-4">
              EVRGRN Music collecte les données personnelles suivantes:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>Données d'identification: nom, prénom, adresse email, identifiants de connexion</li>
              <li>Données de contact: adresse postale, numéro de téléphone</li>
              <li>Données de paiement: informations de carte bancaire (via notre prestataire de paiement sécurisé)</li>
              <li>Données de navigation: adresse IP, cookies, données de trafic</li>
              <li>Préférences: historique d'écoute, produits consultés, centre d'intérêt</li>
            </ul>
            <p className="mb-4">
              Ces données sont collectées lorsque vous:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Créez un compte sur notre plateforme</li>
              <li>Effectuez un achat sur notre boutique en ligne</li>
              <li>Vous inscrivez à notre newsletter</li>
              <li>Participez à nos enquêtes ou concours</li>
              <li>Naviguez sur notre site web</li>
            </ul>
          </Card>
          
          <Card className="p-6 md:p-8 mb-8 bg-evrgrn-darker/90 border-evrgrn-accent/20">
            <h2 className="text-xl md:text-2xl font-medium mb-4 text-evrgrn-accent">2. Finalités du traitement</h2>
            <p className="mb-4">
              Vos données personnelles sont collectées et traitées pour les finalités suivantes:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Gestion de votre compte utilisateur et accès aux services</li>
              <li>Traitement et suivi de vos commandes</li>
              <li>Personnalisation de notre offre et de votre expérience sur le site</li>
              <li>Communication sur nos produits, services et événements</li>
              <li>Analyse statistique pour améliorer nos services</li>
              <li>Respect de nos obligations légales et réglementaires</li>
            </ul>
          </Card>
          
          <Card className="p-6 md:p-8 mb-8 bg-evrgrn-darker/90 border-evrgrn-accent/20">
            <h2 className="text-xl md:text-2xl font-medium mb-4 text-evrgrn-accent">3. Durée de conservation</h2>
            <p className="mb-4">
              Vos données personnelles sont conservées pour une durée limitée correspondant aux finalités pour lesquelles elles ont été collectées:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Données de compte: pendant la durée de votre inscription, puis 3 ans après votre dernière activité</li>
              <li>Données de commande: 10 ans à des fins comptables et fiscales</li>
              <li>Données de navigation: 13 mois maximum</li>
              <li>Données de prospection: 3 ans à compter du dernier contact</li>
            </ul>
          </Card>
          
          <Card className="p-6 md:p-8 mb-8 bg-evrgrn-darker/90 border-evrgrn-accent/20">
            <h2 className="text-xl md:text-2xl font-medium mb-4 text-evrgrn-accent">4. Vos droits</h2>
            <p className="mb-4">
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>Droit d'accès à vos données personnelles</li>
              <li>Droit de rectification des données inexactes</li>
              <li>Droit à l'effacement de vos données (droit à l'oubli)</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit à la portabilité de vos données</li>
              <li>Droit d'opposition au traitement de vos données</li>
              <li>Droit de définir des directives relatives au sort de vos données après votre décès</li>
            </ul>
            <p className="mb-4">
              Pour exercer ces droits, vous pouvez nous contacter à l'adresse suivante: privacy@evrgrn.com
            </p>
          </Card>
          
          <Card className="p-6 md:p-8 mb-8 bg-evrgrn-darker/90 border-evrgrn-accent/20">
            <h2 className="text-xl md:text-2xl font-medium mb-4 text-evrgrn-accent">5. Cookies</h2>
            <p className="mb-4">
              Notre site utilise des cookies et technologies similaires pour améliorer votre expérience de navigation.
              Vous pouvez configurer votre navigateur pour refuser tous les cookies ou être informé quand un cookie est envoyé.
            </p>
            <p>
              Pour plus d'informations sur notre utilisation des cookies, consultez notre politique dédiée accessible depuis notre bandeau cookies.
            </p>
          </Card>
          
          <Card className="p-6 md:p-8 bg-evrgrn-darker/90 border-evrgrn-accent/20">
            <h2 className="text-xl md:text-2xl font-medium mb-4 text-evrgrn-accent">6. Contact</h2>
            <p className="mb-4">
              Pour toute question relative à la présente politique de confidentialité, vous pouvez nous contacter à l'adresse suivante:
            </p>
            <p>
              Email: privacy@evrgrn.com<br />
              Adresse: 123 Avenue de la Musique, 75001 Paris, France<br />
              Délégué à la protection des données: dpo@evrgrn.com
            </p>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Confidentialite;
