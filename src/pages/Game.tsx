
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Game = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [activeTab, setActiveTab] = useState("game");

  const gameAssets = [
    { id: 1, src: "/games/VRNCA-LAG/other assets/VRNCA-LAG Background 1.jpg", alt: "VRNCA-LAG Background 1" },
    { id: 2, src: "/games/VRNCA-LAG/other assets/VRNCA-LAG Background 2.jpg", alt: "VRNCA-LAG Background 2" },
    { id: 3, src: "/games/VRNCA-LAG/other assets/VRNCA-LAG Background 3.jpg", alt: "VRNCA-LAG Background 3" },
    { id: 4, src: "/games/VRNCA-LAG/other assets/VRNCA-LAG concept 1.jpg", alt: "VRNCA-LAG Concept Art 1" },
    { id: 5, src: "/games/VRNCA-LAG/other assets/VRNCA-LAG concept 2.jpg", alt: "VRNCA-LAG Concept Art 2" },
    { id: 6, src: "/games/VRNCA-LAG/other assets/Winning Screen 1.jpg", alt: "VRNCA-LAG Winning Screen" },
  ];

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
              <Link to="/jeux">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour au catalogue
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">VRNCA : Labyrinth Adventure Game</h1>
          </div>
          
          <Tabs defaultValue="game" value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="game">Jouer</TabsTrigger>
              <TabsTrigger value="about">À propos</TabsTrigger>
              <TabsTrigger value="gallery">Galerie</TabsTrigger>
            </TabsList>
            
            <TabsContent value="game" className="mt-4">
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
            </TabsContent>
            
            <TabsContent value="about" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-evrgrn-muted p-6 rounded-lg">
                  <h2 className="text-xl font-bold mb-4 text-evrgrn-accent">VRNCA : Labyrinth Adventure Game</h2>
                  <p className="mb-4">
                    VRNCA LAG (Labyrinth Adventure Game) est une expérience interactive qui vous plonge 
                    dans un labyrinthe cybernétique créé par VRNCA, l'entité numérique qui accompagne 
                    l'univers EVRGRN.
                  </p>
                  <p className="mb-4">
                    Dans ce jeu, vous devez explorer un labyrinthe complexe dont les murs 
                    semblent changer au fil de votre progression. L'objectif est de trouver la sortie, 
                    mais le chemin est parsemé d'énigmes et de défis à relever.
                  </p>
                  <p>
                    VRNCA vous accompagne tout au long de votre voyage, vous offrant des indices cryptiques 
                    et des perspectives uniques sur votre environnement. Est-elle votre alliée ou vous 
                    guide-t-elle vers une autre forme de piège ?
                  </p>
                </div>
                
                <div className="bg-evrgrn-darker overflow-hidden rounded-lg border border-evrgrn-accent/20">
                  <img 
                    src="/games/VRNCA-LAG/VRNCA-LAG environement concept 3.jpg" 
                    alt="VRNCA LAG Environment" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 gap-6">
                <div className="bg-evrgrn-muted p-6 rounded-lg">
                  <h2 className="text-xl font-bold mb-4 text-evrgrn-accent">Caractéristiques du jeu</h2>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-evrgrn-accent mr-2">•</span>
                      <span>Un labyrinthe généré procéduralement qui offre une expérience unique à chaque partie</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-evrgrn-accent mr-2">•</span>
                      <span>Une ambiance visuelle inspirée de l'esthétique cyberpunk et vaporwave</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-evrgrn-accent mr-2">•</span>
                      <span>Des interactions avec VRNCA qui révèlent des éléments de la narration d'EVRGRN</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-evrgrn-accent mr-2">•</span>
                      <span>Une bande sonore immersive qui évolue en fonction de vos actions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-evrgrn-accent mr-2">•</span>
                      <span>Des défis de logique et d'observation pour tester votre perspicacité</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="gallery" className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {gameAssets.map(asset => (
                  <div key={asset.id} className="bg-evrgrn-darker rounded-lg overflow-hidden border border-evrgrn-accent/10 hover:border-evrgrn-accent/30 transition-duration-300">
                    <div className="aspect-video">
                      <img 
                        src={asset.src} 
                        alt={asset.alt} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-2 text-center text-sm text-muted-foreground">
                      {asset.alt}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Captures d'écran du jeu</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-evrgrn-darker rounded-lg overflow-hidden border border-evrgrn-accent/10">
                    <img 
                      src="/games/VRNCA-LAG/other assets/screencapture-file-Users-macbook-Documents-CURSOR-VRNCA-LAG-Labyrinth-Adventure-Game-index-html-2025-04-06-02_11_26.png" 
                      alt="VRNCA LAG Gameplay Screenshot 1" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="bg-evrgrn-darker rounded-lg overflow-hidden border border-evrgrn-accent/10">
                    <img 
                      src="/games/VRNCA-LAG/other assets/screencapture-file-Users-macbook-Documents-CURSOR-VRNCA-LAG-Labyrinth-Adventure-Game-index-html-2025-04-06-02_12_09.png" 
                      alt="VRNCA LAG Gameplay Screenshot 2" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Game;
