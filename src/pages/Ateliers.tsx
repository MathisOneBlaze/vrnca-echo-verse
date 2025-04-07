
import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronRight, Download } from 'lucide-react';

const Ateliers = () => {
  const atelierImages = [
    '/atelier/photo atelier/IMG_1726 anonymous.jpg',
    '/atelier/photo atelier/IMG_1747.png',
    '/atelier/photo atelier/IMG_1761.png',
    '/atelier/photo atelier/IMG_3344 anonymous.jpg',
    '/atelier/photo atelier/IMG_3346 anonymous.jpg',
  ];

  return (
    <div className="bg-evrgrn-dark text-foreground min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-serif mb-2">Ateliers</h1>
              <p className="text-lg text-muted-foreground">
                Formations et ateliers en production musicale et développement artistique
              </p>
            </div>
            <img 
              src="/lovable-uploads/01e9bec9-0cde-4e57-a7c9-aa81659ce1c0.png" 
              alt="EVRGRN Logo" 
              className="h-16 mb-4 md:mb-0" 
            />
          </div>
          
          {/* Carousel of workshop photos */}
          <div className="mb-16">
            <h2 className="text-2xl font-serif mb-6">En images</h2>
            <Carousel className="w-full" opts={{ loop: true }}>
              <CarouselContent>
                {atelierImages.map((img, index) => (
                  <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3">
                    <div className="aspect-video overflow-hidden rounded-lg border border-evrgrn-accent/20 p-1">
                      <img 
                        src={img} 
                        alt={`Atelier EVRGRN ${index + 1}`} 
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
          
          {/* Main content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-serif mb-6">À propos des ateliers</h2>
              <div className="prose prose-invert max-w-none">
                <p>
                  Les ateliers EVRGRN proposent une approche pédagogique unique, combinant théorie musicale, techniques 
                  de production et développement de la créativité. Dirigés par Mathis OneBlaze, ces sessions offrent un 
                  accompagnement personnalisé pour les artistes de tous niveaux.
                </p>
                
                <h3 className="text-xl mt-8 mb-4">Approche pédagogique</h3>
                <p>
                  Notre philosophie d'enseignement se base sur le principe que chaque artiste possède une voix unique. 
                  Nous ne cherchons pas à imposer une méthode standardisée, mais plutôt à vous donner les outils 
                  pour exprimer votre vision artistique avec plus d'efficacité et de clarté.
                </p>
                
                <h3 className="text-xl mt-8 mb-4">Format des ateliers</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Sessions individuelles ou en petits groupes (maximum 5 personnes)</li>
                  <li>Ateliers intensifs d'une journée ou programmes sur plusieurs semaines</li>
                  <li>Possibilité de sessions à distance ou en présentiel dans notre studio</li>
                  <li>Suivi personnalisé et retours détaillés sur vos projets</li>
                </ul>
                
                <h3 className="text-xl mt-8 mb-4">Thématiques abordées</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Production musicale (Ableton Live, Logic Pro, FL Studio)</li>
                  <li>Sound design et synthèse sonore</li>
                  <li>Théorie musicale appliquée à la production électronique</li>
                  <li>Développement de votre identité artistique</li>
                  <li>Stratégies de sortie et promotion de vos créations</li>
                </ul>
              </div>
              
              <div className="mt-8">
                <Button asChild>
                  <Link to="/contact">Demander des informations</Link>
                </Button>
              </div>
            </div>
            
            <div className="bg-evrgrn-darker border border-evrgrn-accent/20 rounded-lg p-6">
              <h3 className="text-xl font-medium mb-6 text-evrgrn-accent">Prochain atelier</h3>
              <div className="mb-6 relative">
                <div className="aspect-video rounded-lg overflow-hidden bg-evrgrn-dark mb-4">
                  <img 
                    src="/atelier/photo atelier/IMG_1747.png" 
                    alt="Prochain atelier EVRGRN" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg font-medium mb-2">Création & Production 2023</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Un atelier intensif de deux jours pour maîtriser les fondamentaux de la production musicale
                </p>
                <ul className="text-sm space-y-2 mb-4">
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-evrgrn-accent" />
                    <span>Date: Septembre 2023</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-evrgrn-accent" />
                    <span>Lieu: Studio EVRGRN, Paris</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-evrgrn-accent" />
                    <span>Places: 5 maximum</span>
                  </li>
                </ul>
                <a 
                  href="/atelier/Atelier Création & Production 2022.pdf" 
                  download 
                  className="flex items-center text-evrgrn-accent text-sm hover:underline"
                >
                  <Download className="h-4 w-4 mr-1" /> Télécharger la brochure 2022
                </a>
              </div>
              
              <div className="border-t border-evrgrn-accent/20 pt-6 mt-6">
                <h4 className="font-medium mb-4">Témoignages</h4>
                <div className="space-y-4">
                  <blockquote className="text-sm italic">
                    "L'atelier m'a permis de débloquer ma créativité et de comprendre comment transformer mes idées en morceaux aboutis."
                    <footer className="mt-1 text-evrgrn-accent">— Alex, producteur</footer>
                  </blockquote>
                  <blockquote className="text-sm italic">
                    "J'ai plus appris en deux jours qu'en six mois de tutoriels sur YouTube. Une approche pratique et efficace."
                    <footer className="mt-1 text-evrgrn-accent">— Sarah, compositrice</footer>
                  </blockquote>
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

export default Ateliers;
