
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ParticleBackground from '@/components/ui/ParticleBackground';
import { Card } from '@/components/ui/card';

const MentionsLegales = () => {
  return (
    <div className="min-h-screen flex flex-col bg-evrgrn-dark">
      <Header />
      <ParticleBackground />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Mentions Légales</h1>
          
          <Card className="p-6 md:p-8 mb-8 bg-evrgrn-darker/90 border-evrgrn-accent/20">
            <h2 className="text-xl md:text-2xl font-medium mb-4 text-evrgrn-accent">1. Informations sur l'éditeur</h2>
            <p className="mb-4">
              Le site EVRGRN est édité par EVRGRN Music, société à responsabilité limitée au capital de 10 000 €, 
              immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro 123 456 789, 
              dont le siège social est situé au 123 Avenue de la Musique, 75001 Paris, France.
            </p>
            <p className="mb-4">
              Numéro de TVA intracommunautaire : FR 12 123 456 789
            </p>
          </Card>
          
          <Card className="p-6 md:p-8 mb-8 bg-evrgrn-darker/90 border-evrgrn-accent/20">
            <h2 className="text-xl md:text-2xl font-medium mb-4 text-evrgrn-accent">2. Directeur de la publication</h2>
            <p className="mb-4">
              Le directeur de la publication du site est Mathis OneBlaze en qualité de fondateur d'EVRGRN.
            </p>
            <p className="mb-4">
              Contact : direction@evrgrn.com
            </p>
          </Card>
          
          <Card className="p-6 md:p-8 mb-8 bg-evrgrn-darker/90 border-evrgrn-accent/20">
            <h2 className="text-xl md:text-2xl font-medium mb-4 text-evrgrn-accent">3. Hébergement</h2>
            <p className="mb-4">
              Le site EVRGRN est hébergé par:
            </p>
            <p className="mb-4">
              Lovable App<br />
              100 Digital Avenue<br />
              10000 Web City<br />
              Email: support@lovable.app
            </p>
          </Card>
          
          <Card className="p-6 md:p-8 mb-8 bg-evrgrn-darker/90 border-evrgrn-accent/20">
            <h2 className="text-xl md:text-2xl font-medium mb-4 text-evrgrn-accent">4. Propriété intellectuelle</h2>
            <p className="mb-4">
              L'ensemble du contenu du site EVRGRN (structure, textes, logos, images, vidéos, sons, etc.) est la propriété exclusive
              d'EVRGRN Music ou de ses partenaires et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.
            </p>
            <p className="mb-4">
              Toute reproduction totale ou partielle de ce contenu est strictement interdite sans autorisation préalable.
            </p>
          </Card>
          
          <Card className="p-6 md:p-8 mb-8 bg-evrgrn-darker/90 border-evrgrn-accent/20">
            <h2 className="text-xl md:text-2xl font-medium mb-4 text-evrgrn-accent">5. Conditions d'utilisation</h2>
            <p className="mb-4">
              L'utilisation du site EVRGRN implique l'acceptation pleine et entière des conditions générales d'utilisation décrites ci-après.
              Ces conditions d'utilisation sont susceptibles d'être modifiées ou complétées à tout moment.
            </p>
          </Card>
          
          <Card className="p-6 md:p-8 bg-evrgrn-darker/90 border-evrgrn-accent/20">
            <h2 className="text-xl md:text-2xl font-medium mb-4 text-evrgrn-accent">6. Contact</h2>
            <p className="mb-4">
              Pour toute question relative aux présentes mentions légales, vous pouvez nous contacter à l'adresse suivante:
            </p>
            <p>
              Email: legal@evrgrn.com<br />
              Adresse: 123 Avenue de la Musique, 75001 Paris, France<br />
              Téléphone: +33 (0)1 23 45 67 89
            </p>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MentionsLegales;
