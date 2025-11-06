
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Tag } from 'lucide-react';

const Jeux = () => {
  return (
    <div className="bg-evrgrn-dark text-foreground min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-serif mb-2">EVRGRN Games Studio</h1>
              <p className="text-lg text-muted-foreground">Découvrez les jeux développés par EVRGRN Games Studio</p>
            </div>
            <div className="text-evrgrn-accent">
              <Tag size={32} />
            </div>
          </div>
          
          <h2 className="text-2xl font-serif mb-6">À propos des jeux EVRGRN GAMES STUDIO</h2>
          <p className="mb-8 text-muted-foreground">
            EVRGRN Games Studio est la branche de création de jeux vidéo de l'écosystème EVRGRN. 
            Nos jeux explorent des univers narratifs riches et proposent des expériences immersives uniques, 
            en cohérence avec notre direction artistique et notre philosophie créative.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* VRNCA-LAG */}
            <div className="bg-evrgrn-darker border border-evrgrn-accent/20 rounded-lg overflow-hidden">
              <div className="aspect-video bg-black relative">
                <img 
                  src="/games/VRNCA-LAG/other assets/VRNCA-LAG concept 1.jpg" 
                  alt="VRNCA-LAG Game" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-evrgrn-darker to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-evrgrn-accent text-black text-xs px-2 py-1 rounded">Disponible</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-medium mb-2 text-evrgrn-accent">VRNCA-LAG</h3>
                <p className="text-sm mb-4 text-muted-foreground">Labyrinth Adventure Game</p>
                <p className="mb-6">
                  Un jeu de labyrinthe pixel art inspiré des classiques des années 80. Naviguez dans un monde 
                  cyberpunk et découvrez les secrets cachés de VRNCA.
                </p>
                <div className="flex gap-3">
                  <Button asChild>
                    <Link to="/VRNCA-Lag">Jouer maintenant</Link>
                  </Button>
                  <Button variant="outline">
                    <a href="https://buy.stripe.com/test_00g5kt0rG1cc0Xm000" target="_blank" rel="noopener noreferrer">Soutenir</a>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Good Run Evil */}
            <div className="bg-evrgrn-darker border border-evrgrn-accent/20 rounded-lg overflow-hidden">
              <div className="aspect-video bg-black relative">
                <img 
                  src="/games/Good Run Evil/cd90842d-8fc0-4990-9930-19498c45566b.png" 
                  alt="Good Run Evil Game" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-evrgrn-darker to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-evrgrn-darker/80 text-evrgrn-accent text-xs px-2 py-1 rounded border border-evrgrn-accent/30">En développement</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-medium mb-2 text-evrgrn-accent">Good Run Evil</h3>
                <p className="text-sm mb-4 text-muted-foreground">Endless Runner Psychologique</p>
                <p className="mb-6">
                  Un endless runner qui explore les thèmes de la dualité et du choix moral. Traversez un univers 
                  cérébral en constante évolution et faites face à vos propres démons.
                </p>
                <div className="flex gap-3">
                  <Button asChild>
                    <Link to="/good-run-evil">En savoir plus</Link>
                  </Button>
                  <Button variant="outline" disabled>
                    Alpha prévue fin 2025
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Studio section */}
          <div className="mt-24 mb-12">
            <h2 className="text-2xl font-serif mb-6">L'équipe derrière les jeux</h2>
            <div className="bg-evrgrn-darker border border-evrgrn-accent/20 rounded-lg p-6">
              <p className="mb-4">
                EVRGRN Games Studio est dirigé par Mathis OneBlaze, assisté par une équipe de développeurs indépendants 
                et d'artistes partageant une vision commune de créer des expériences de jeu uniques et significatives.
              </p>
              <p>
                Tous nos jeux sont développés avec une attention particulière à l'esthétique, à la narration et à l'immersion, 
                dans le but de créer des expériences mémorables qui font réfléchir.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Jeux;
