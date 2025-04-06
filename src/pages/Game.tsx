
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Game = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Set focus to the iframe when the component mounts
    if (iframeRef.current) {
      iframeRef.current.focus();
    }

    // Add event listener for keyboard and gamepad inputs going to the iframe
    const handleKeyDown = (e: KeyboardEvent) => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        // Prevent default browser behavior for certain keys
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="bg-evrgrn-dark text-foreground min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-4">
          <div className="mb-4 flex items-center">
            <Button asChild variant="outline" size="sm" className="mr-4">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour à l'accueil
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">VRNCA : Labyrinth Adventure Game</h1>
          </div>
          
          <div className="bg-evrgrn-darker rounded-lg overflow-hidden border border-evrgrn-accent/20">
            <div className="aspect-video w-full">
              <iframe 
                ref={iframeRef}
                src="/vrnca-lag/index.html" 
                className="w-full h-full"
                title="VRNCA Labyrinth Adventure Game"
                allow="fullscreen"
              />
            </div>
          </div>
          
          <div className="mt-6 bg-evrgrn-muted p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Instructions</h2>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Utilisez les flèches du clavier pour vous déplacer</li>
              <li>Explorez le labyrinthe pour trouver la sortie</li>
              <li>Interagissez avec VRNCA pour découvrir des indices</li>
              <li>Cliquez dans le jeu si les contrôles ne répondent pas</li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Game;
