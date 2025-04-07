
import React, { useEffect, useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '@/components/ui/button';
import { extractGame } from '../utils/extractGame';
import { Download, Play, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Game = () => {
  const [isGameLoading, setIsGameLoading] = useState(true);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadGame = async () => {
      try {
        setIsGameLoading(true);
        await extractGame('/VRNCA_LAG - Labyrinth Adventure Game.zip', 'game-container');
        setIsGameLoading(false);
      } catch (error) {
        console.error('Failed to load game:', error);
        setLoadingError(error instanceof Error ? error.message : 'Failed to load game');
        setIsGameLoading(false);
      }
    };
    
    loadGame();
  }, []);
  
  // Game screenshots
  const screenshots = [
    '/games/VRNCA-LAG/other assets/VRNCA-LAG Background 1.jpg',
    '/games/VRNCA-LAG/other assets/VRNCA-LAG Background 2.jpg',
    '/games/VRNCA-LAG/other assets/VRNCA-LAG Background 3.jpg',
    '/games/VRNCA-LAG/other assets/VRNCA-LAG concept 1.jpg',
    '/games/VRNCA-LAG/other assets/VRNCA-LAG concept 2.jpg',
    '/games/VRNCA-LAG/other assets/Winning Screen 1.jpg',
  ];

  return (
    <div className="bg-evrgrn-dark text-foreground min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-serif mb-2">VRNCA-LAG</h1>
              <p className="text-lg text-muted-foreground">
                Labyrinth Adventure Game - Une expérience d'arcade rétro
              </p>
            </div>
            <img 
              src="/lovable-uploads/01e9bec9-0cde-4e57-a7c9-aa81659ce1c0.png" 
              alt="EVRGRN Logo" 
              className="h-16 mb-4 md:mb-0" 
            />
          </div>
          
          {/* Game container */}
          <div className="bg-evrgrn-darker border border-evrgrn-accent/20 rounded-lg overflow-hidden mb-12">
            <div id="game-container" className="h-[600px] flex items-center justify-center bg-black">
              {isGameLoading && (
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-evrgrn-accent/20 border-t-evrgrn-accent rounded-full animate-spin mb-4 mx-auto"></div>
                  <p className="text-evrgrn-accent">Chargement du jeu...</p>
                </div>
              )}
              
              {loadingError && (
                <div className="p-4 bg-red-900/50 border border-red-500 rounded-lg text-white max-w-md mx-auto">
                  <h3 className="text-lg font-medium mb-2">Erreur lors du chargement du jeu</h3>
                  <p>{loadingError}</p>
                  <Button 
                    onClick={() => window.location.reload()} 
                    className="mt-4"
                  >
                    Réessayer
                  </Button>
                </div>
              )}
            </div>
            
            <div className="bg-evrgrn-darker p-4 border-t border-evrgrn-accent/20 flex flex-col sm:flex-row justify-between">
              <div className="flex items-center mb-4 sm:mb-0">
                <Play className="h-4 w-4 text-evrgrn-accent mr-2" />
                <span className="text-sm text-muted-foreground">
                  Utilisez les flèches du clavier pour vous déplacer et échapper au labyrinthe
                </span>
              </div>
              <a 
                href="/VRNCA_LAG - Labyrinth Adventure Game.zip" 
                download 
                className="flex items-center text-evrgrn-accent text-sm hover:underline"
              >
                <Download className="h-4 w-4 mr-1" /> Télécharger le jeu
              </a>
            </div>
          </div>
          
          {/* Game description */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-serif mb-6">À propos de VRNCA-LAG</h2>
              <div className="prose prose-invert max-w-none">
                <p>
                  VRNCA-LAG (Labyrinth Adventure Game) est un jeu de labyrinthe en pixel art inspiré des classiques 
                  des années 80. Naviguez dans un monde cyberpunk et découvrez les secrets cachés de VRNCA.
                </p>
                
                <p>
                  Ce jeu est développé dans le cadre de l'univers EVRGRN et constitue une expérience 
                  interactive complémentaire aux créations musicales et visuelles de Mathis OneBlaze.
                </p>
                
                <h3 className="text-xl mt-8 mb-4">Comment jouer</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Utilisez les flèches du clavier pour vous déplacer dans le labyrinthe</li>
                  <li>Évitez les obstacles et les pièges</li>
                  <li>Trouvez la sortie pour passer au niveau suivant</li>
                  <li>Collectez les fragments pour débloquer des éléments narratifs</li>
                </ul>
                
                <h3 className="text-xl mt-8 mb-4">Contexte artistique</h3>
                <p>
                  VRNCA-LAG s'inscrit dans la continuité de l'album "VRNCA-PATCH 1.2.exe" et approfondit 
                  l'univers narratif de cette entité mystérieuse. Le jeu offre une expérience immersive qui 
                  complète la dimension sonore par une interaction ludique.
                </p>
              </div>
              
              <div className="mt-8 flex space-x-4">
                <Button asChild variant="outline">
                  <a href="/VRNCA_LAG - Labyrinth Adventure Game.zip" download>
                    <Download className="h-4 w-4 mr-2" /> 
                    Télécharger
                  </a>
                </Button>
                <Button asChild>
                  <Link to="/jeux">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Voir tous les jeux
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="bg-evrgrn-darker border border-evrgrn-accent/20 rounded-lg p-6">
              <h3 className="text-xl font-medium mb-6 text-evrgrn-accent">Détails techniques</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Version</div>
                  <div>1.0.0</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Développeur</div>
                  <div>EVRGRN Games Studio</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Date de sortie</div>
                  <div>2023</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Plateforme</div>
                  <div>Web (HTML5, JavaScript)</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Genre</div>
                  <div>Arcade, Labyrinthe, Pixel Art</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Univers</div>
                  <div>VRNCA, Cyberpunk, Digital Consciousness</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Screenshots gallery */}
          <div className="mb-16">
            <h2 className="text-2xl font-serif mb-6">Captures d'écran</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {screenshots.map((screenshot, index) => (
                <div key={index} className="aspect-video overflow-hidden rounded-lg border border-evrgrn-accent/20">
                  <img 
                    src={screenshot} 
                    alt={`VRNCA-LAG Screenshot ${index + 1}`} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Related content */}
          <div>
            <h2 className="text-2xl font-serif mb-6">Contenu associé</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-evrgrn-darker border border-evrgrn-accent/20 rounded-lg overflow-hidden">
                <div className="aspect-video bg-black relative">
                  <img 
                    src="/Cover Art/VRNCA-PATCH 1.2.exe ;/COVER-VRNCA-1.2.exe3-1200x1200.jpeg" 
                    alt="VRNCA-PATCH 1.2.exe" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-evrgrn-darker to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-2 text-evrgrn-accent">VRNCA-PATCH 1.2.exe</h3>
                  <p className="text-sm mb-4 text-muted-foreground">Album, 2023</p>
                  <p className="mb-6">
                    L'album qui a inspiré la création du jeu VRNCA-LAG, explorant l'univers sonore 
                    de cette entité numérique mystérieuse.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/musique">
                      Découvrir l'album
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="bg-evrgrn-darker border border-evrgrn-accent/20 rounded-lg overflow-hidden">
                <div className="aspect-video bg-black relative">
                  <img 
                    src="/games/Good Run Evil/cd90842d-8fc0-4990-9930-19498c45566b.png" 
                    alt="Good Run Evil" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-evrgrn-darker to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-evrgrn-darker/80 text-evrgrn-accent text-xs px-2 py-1 rounded border border-evrgrn-accent/30">
                      En développement
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-2 text-evrgrn-accent">Good Run Evil</h3>
                  <p className="text-sm mb-4 text-muted-foreground">Prochain jeu EVRGRN Games Studio</p>
                  <p className="mb-6">
                    Le prochain titre en développement par EVRGRN Games Studio. Un endless runner 
                    psychologique explorant les thèmes de la dualité et du choix moral.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/good-run-evil">
                      En savoir plus
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Game;
