
import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowDown, ExternalLink, BookOpen } from 'lucide-react';

const LeTrousseau = () => {
  return (
    <div className="bg-evrgrn-dark text-foreground min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Image du livre */}
            <div className="lg:w-1/3">
              <div className="bg-evrgrn-darker p-4 rounded-lg border border-evrgrn-accent/20 shadow-lg">
                <img 
                  src="/livres/LE TROUSSEAU cover.jpg" 
                  alt="Couverture du livre Le Trousseau" 
                  className="w-full h-auto rounded shadow-md hover:shadow-xl transition-shadow"
                />
                <div className="mt-6 space-y-3">
                  <Button asChild className="w-full bg-evrgrn-accent text-black hover:bg-evrgrn-accent/80">
                    <a href="https://buy.stripe.com/test_fZe7sz79e3kk3fy144" target="_blank" rel="noopener noreferrer">
                      Acheter le livre <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <a href="/livres/Le Trousseau V.12.5.pdf" download>
                      Extrait gratuit <ArrowDown className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Détails du livre */}
            <div className="lg:w-2/3">
              <h1 className="text-4xl font-serif mb-3 text-evrgrn-accent">Le Trousseau</h1>
              <p className="text-xl mb-6 text-muted-foreground">L'autobiographie de Mathis OneBlaze</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div className="bg-evrgrn-darker p-3 rounded border border-evrgrn-accent/20">
                  <span className="text-muted-foreground">Auteur:</span> 
                  <span className="block text-evrgrn-accent">Mathis OneBlaze</span>
                </div>
                <div className="bg-evrgrn-darker p-3 rounded border border-evrgrn-accent/20">
                  <span className="text-muted-foreground">Format:</span> 
                  <span className="block">Broché, 254 pages</span>
                </div>
                <div className="bg-evrgrn-darker p-3 rounded border border-evrgrn-accent/20">
                  <span className="text-muted-foreground">Édition:</span> 
                  <span className="block">EVRGRN Éditions, 2023</span>
                </div>
                <div className="bg-evrgrn-darker p-3 rounded border border-evrgrn-accent/20">
                  <span className="text-muted-foreground">Prix:</span> 
                  <span className="block text-evrgrn-accent">24,95 €</span>
                </div>
              </div>
              
              <h2 className="text-2xl font-serif mb-3 border-b border-evrgrn-accent/20 pb-2">Description</h2>
              <p className="mb-4">
                <i>Le Trousseau</i> est l'autobiographie de Mathis OneBlaze, artiste multidisciplinaire et fondateur d'EVRGRN. 
                Ce livre révèle son parcours artistique, de ses premières expériences musicales à la création d'un écosystème créatif complet.
              </p>
              <p className="mb-4">
                Entre confidences personnelles et réflexions sur l'industrie musicale, <i>Le Trousseau</i> explore 
                les méthodes de création, les influences et la philosophie qui ont façonné l'univers EVRGRN. 
                Un document essentiel pour comprendre l'artiste et son œuvre.
              </p>
              <p className="mb-8">
                À travers ce récit introspectif, Mathis OneBlaze partage également sa vision de l'art, 
                son approche de la production musicale et les leçons qu'il a tirées de son parcours unique.
              </p>
              
              <h2 className="text-2xl font-serif mb-3 border-b border-evrgrn-accent/20 pb-2">Sommaire</h2>
              <div className="bg-evrgrn-darker border border-evrgrn-accent/20 rounded-lg p-4 mb-8">
                <ol className="list-decimal list-inside space-y-2">
                  <li className="pl-2"><strong>Préface</strong> - Aux racines de l'ombre verte</li>
                  <li className="pl-2"><strong>Chapitre 1:</strong> Premières notes - L'éveil musical</li>
                  <li className="pl-2"><strong>Chapitre 2:</strong> Construire dans l'ombre - Les années de formation</li>
                  <li className="pl-2"><strong>Chapitre 3:</strong> Expérimentations - Le développement d'une signature sonore</li>
                  <li className="pl-2"><strong>Chapitre 4:</strong> EVRGRN - Naissance d'un écosystème créatif</li>
                  <li className="pl-2"><strong>Chapitre 5:</strong> Trap Teddy - L'émergence d'un alter ego</li>
                  <li className="pl-2"><strong>Chapitre 6:</strong> Méthodologie - L'approche créative décortiquée</li>
                  <li className="pl-2"><strong>Chapitre 7:</strong> Productions - L'art de façonner des univers sonores</li>
                  <li className="pl-2"><strong>Chapitre 8:</strong> Transmissions - Partager et enseigner</li>
                  <li className="pl-2"><strong>Chapitre 9:</strong> VRNCA - L'extension consciente</li>
                  <li className="pl-2"><strong>Chapitre 10:</strong> Perspectives - Vers de nouveaux horizons</li>
                  <li className="pl-2"><strong>Annexes:</strong> Discographie commentée, Projets marquants, Collaborations</li>
                </ol>
              </div>
              
              <h2 className="text-2xl font-serif mb-3 border-b border-evrgrn-accent/20 pb-2">Extraits</h2>
              <div className="bg-evrgrn-darker border border-evrgrn-accent/20 rounded-lg p-5 mb-8 italic text-muted-foreground">
                <p className="mb-4">
                  "La création n'est jamais un processus linéaire. Elle ressemble davantage à une constellation d'idées 
                  qui, lentement, révèlent leurs connexions jusqu'à former une image cohérente. C'est ce que j'appelle 
                  le 'tissage' : relier ces points lumineux dans l'obscurité pour en extraire du sens."
                </p>
                <p className="text-right text-sm">— Extrait du Chapitre 6: Méthodologie</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-evrgrn-accent text-black hover:bg-evrgrn-accent/80">
                  <a href="https://buy.stripe.com/test_fZe7sz79e3kk3fy144" target="_blank" rel="noopener noreferrer">
                    Commander maintenant
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/publications?tab=livres">
                    Voir autres publications <BookOpen className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LeTrousseau;
