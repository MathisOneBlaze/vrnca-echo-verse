
import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ParticleBackground from '../components/ui/ParticleBackground';

interface GameItem {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  status: 'available' | 'coming-soon' | 'in-development';
}

const gamesList: GameItem[] = [
  {
    id: 'vrnca-lag',
    title: 'VRNCA LAG',
    description: 'Labyrinth Adventure Game - Un jeu d\'exploration dans un labyrinthe cybernétique. Explorez les profondeurs du labyrinthe et découvrez les secrets de VRNCA.',
    image: '/games/VRNCA-LAG/VRNCA-LAG environement concept 3.jpg',
    link: '/game',
    status: 'available'
  },
  {
    id: 'good-run-evil',
    title: 'Good Run Evil',
    description: 'Un endless runner psychédélique où vous incarnez une entité qui traverse des corridors cérébraux, alternant entre la forme bénéfique et maléfique pour surmonter les obstacles.',
    image: '/games/Good Run Evil/cd90842d-8fc0-4990-9930-19498c45566b.png',
    link: '/good-run-evil',
    status: 'in-development'
  }
];

const Jeux = () => {
  return (
    <div className="bg-evrgrn-dark text-foreground min-h-screen flex flex-col relative overflow-hidden">
      <Header />
      
      {/* Background animation */}
      <ParticleBackground />
      
      <main className="flex-grow pt-24 z-10 relative">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-serif mb-2">Jeux EVRGRN</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Découvrez des expériences interactives uniques qui étendent l'univers EVRGRN au-delà de la musique et des mots.
              </p>
            </div>
            <img 
              src="/lovable-uploads/01e9bec9-0cde-4e57-a7c9-aa81659ce1c0.png" 
              alt="EVRGRN Logo"
              className="h-16 mb-4 md:mb-0 md:ml-4"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {gamesList.map(game => (
              <div 
                key={game.id}
                className="bg-evrgrn-muted border border-evrgrn-accent/10 rounded-lg overflow-hidden hover:border-evrgrn-accent/30 transition-all duration-300 flex flex-col"
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={game.image} 
                    alt={game.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-medium">{game.title}</h2>
                    <div className={`
                      px-3 py-1 text-xs font-medium rounded-full
                      ${game.status === 'available' ? 'bg-green-500/20 text-green-300' : 
                        game.status === 'coming-soon' ? 'bg-yellow-500/20 text-yellow-300' : 
                        'bg-blue-500/20 text-blue-300'}
                    `}>
                      {game.status === 'available' ? 'Disponible' : 
                       game.status === 'coming-soon' ? 'Bientôt disponible' : 
                       'En développement'}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 flex-1">{game.description}</p>
                  
                  <div className="mt-auto">
                    {game.status === 'available' ? (
                      <Button asChild className="w-full bg-evrgrn-accent text-black hover:bg-evrgrn-accent/80">
                        <Link to={game.link}>Jouer maintenant</Link>
                      </Button>
                    ) : (
                      <Button asChild className="w-full" variant="outline" disabled={game.status === 'in-development'}>
                        <Link to={game.link}>
                          {game.status === 'coming-soon' ? 'Bientôt disponible' : 'En développement'}
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 bg-evrgrn-muted border border-evrgrn-accent/10 rounded-lg p-6">
            <h2 className="text-2xl font-medium mb-4">À propos des jeux EVRGRN</h2>
            <p className="text-muted-foreground mb-4">
              Les jeux EVRGRN sont des expériences interactives qui prolongent l'univers narratif et conceptuel de mes projets musicaux. Ils offrent une nouvelle façon d'explorer les thèmes et les esthétiques qui définissent ma vision créative.
            </p>
            <p className="text-muted-foreground">
              Chaque jeu est conçu comme une porte d'entrée vers un aspect spécifique de l'univers EVRGRN, permettant aux joueurs de s'immerger dans ces mondes d'une manière active et engageante.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Jeux;
