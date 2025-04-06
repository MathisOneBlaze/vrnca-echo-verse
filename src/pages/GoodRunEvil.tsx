
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const GoodRunEvil = () => {
  return (
    <div className="bg-evrgrn-dark text-foreground min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-4">
          <div className="mb-4 flex items-center">
            <Button asChild variant="outline" size="sm" className="mr-4">
              <Link to="/jeux">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux jeux
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Good Run Evil</h1>
          </div>
          
          <div className="bg-evrgrn-darker rounded-lg overflow-hidden border border-evrgrn-accent/20 mb-6">
            <div className="aspect-video w-full">
              <img 
                src="/games/Good Run Evil/cd90842d-8fc0-4990-9930-19498c45566b.png" 
                alt="Good Run Evil"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="col-span-2 bg-evrgrn-muted p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">À propos du jeu</h2>
              <p className="mb-4 text-muted-foreground">
                <strong>Good Run Evil</strong> est un endless runner psychédélique qui se déroule dans les corridors cérébraux de l'esprit fracturé d'un personnage en pleine lutte intérieure.
              </p>
              <p className="mb-4 text-muted-foreground">
                Le jeu vous invite à incarner une entité qui peut alterner entre deux formes - bénéfique et maléfique - pour surmonter différents types d'obstacles. Cette mécanique représente la dualité présente dans l'univers "Evil Blazy / Vilain Teddy".
              </p>
              <p className="text-muted-foreground">
                Actuellement en développement, Good Run Evil intégrera des éléments narratifs qui enrichiront l'univers établi dans l'album "Evil Blazy: Vilain Teddy" et proposera une expérience immersive avec une esthétique visuelle unique et une bande sonore originale.
              </p>
            </div>
            
            <div className="bg-evrgrn-muted p-6 rounded-lg flex flex-col">
              <h2 className="text-xl font-semibold mb-4">Statut du développement</h2>
              <div className="flex items-center mb-4">
                <div className="h-3 w-3 rounded-full bg-blue-400 mr-2"></div>
                <span>En développement actif</span>
              </div>
              
              <div className="space-y-3 mb-6">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Conception</div>
                  <div className="w-full bg-evrgrn-darker rounded-full h-2">
                    <div className="bg-evrgrn-accent h-2 rounded-full" style={{ width: "90%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Programmation</div>
                  <div className="w-full bg-evrgrn-darker rounded-full h-2">
                    <div className="bg-evrgrn-accent h-2 rounded-full" style={{ width: "40%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Design visuel</div>
                  <div className="w-full bg-evrgrn-darker rounded-full h-2">
                    <div className="bg-evrgrn-accent h-2 rounded-full" style={{ width: "60%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Audio</div>
                  <div className="w-full bg-evrgrn-darker rounded-full h-2">
                    <div className="bg-evrgrn-accent h-2 rounded-full" style={{ width: "70%" }}></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-auto">
                <Button className="w-full" disabled>
                  Bientôt disponible
                </Button>
                <p className="text-xs text-center mt-2 text-muted-foreground">
                  Date de sortie estimée: Automne 2025
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <img 
              src="/games/Good Run Evil/other assets/gen-Evil-Blazy-Vilain-Teddy-benevolent-form-cerebral-c.webp" 
              alt="Concept art"
              className="rounded-lg object-cover w-full h-48"
            />
            <img 
              src="/games/Good Run Evil/other assets/gen-Evil-Blazy-Vilain-Teddy-dark-cerebral-corridor-neg.webp" 
              alt="Concept art"
              className="rounded-lg object-cover w-full h-48"
            />
            <img 
              src="/games/Good Run Evil/other assets/gen-brain-corridor-organic-environment-procedural-gene.webp" 
              alt="Concept art"
              className="rounded-lg object-cover w-full h-48"
            />
          </div>
          
          <div className="bg-evrgrn-muted p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Fonctionnalités prévues</h2>
            <ul className="space-y-2 text-muted-foreground list-disc pl-5">
              <li>Un système de jeu endless runner avec possibilité de changer de forme pour surmonter différents obstacles</li>
              <li>Une progression narrative qui révèle l'histoire de l'album "Evil Blazy: Vilain Teddy"</li>
              <li>Des environnements procéduraux qui évoluent au fil de votre progression</li>
              <li>Une bande sonore originale qui s'adapte à votre forme actuelle</li>
              <li>Des pouvoirs et capacités spéciales à débloquer</li>
              <li>Un système de classement mondial</li>
            </ul>
          </div>
          
          <div className="text-center mb-8">
            <Button asChild variant="outline">
              <a href="/games/Good Run Evil/other assets/Good Run Evil GDD.pdf" target="_blank" rel="noopener noreferrer">
                Consulter le document de conception (PDF)
              </a>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GoodRunEvil;
