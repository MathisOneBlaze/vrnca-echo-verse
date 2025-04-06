
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Headphones, Users, Music, BookOpen, ArrowRight, Download } from 'lucide-react';

const Ateliers = () => {
  const workshopImages = [
    "/atelier/photo atelier/IMG_1726 anonymous.jpg",
    "/atelier/photo atelier/IMG_1747.png",
    "/atelier/photo atelier/IMG_1761.png",
    "/atelier/photo atelier/IMG_3344 anonymous.jpg",
    "/atelier/photo atelier/IMG_3346 anonymous.jpg"
  ];

  return (
    <div className="bg-evrgrn-dark text-foreground min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
            <div>
              <h1 className="text-4xl font-serif mb-2">Ateliers Création & Production Musicale</h1>
              <p className="text-lg text-muted-foreground">
                Accompagnement collectif pour tous niveaux
              </p>
            </div>
            <img 
              src="/lovable-uploads/01e9bec9-0cde-4e57-a7c9-aa81659ce1c0.png" 
              alt="EVRGRN Logo"
              className="h-16"
            />
          </div>
          
          {/* Image gallery - New section with workshop photos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {workshopImages.map((img, index) => (
              <div 
                key={index} 
                className={`rounded-lg overflow-hidden ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
              >
                <img 
                  src={img} 
                  alt={`Atelier de production musicale ${index + 1}`} 
                  className="w-full h-full object-cover"
                  style={{ height: index === 0 ? '500px' : '250px' }}
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-serif mb-4 text-evrgrn-accent">Présentation des ateliers</h2>
              <p className="mb-4 text-muted-foreground">
                Les ateliers de création et production musicale EVRGRN sont conçus pour accompagner 
                les participants dans le développement de leurs compétences artistiques et techniques. 
                Que vous soyez débutant ou musicien confirmé, ces ateliers collectifs vous permettent 
                d'explorer votre créativité et d'acquérir les bases essentielles de la production musicale.
              </p>
              <p className="mb-6 text-muted-foreground">
                Chaque atelier est animé par Mathis OneBlaze, artiste professionnel et formateur 
                expérimenté, qui partage son expertise et sa passion pour la musique dans une 
                ambiance collaborative et bienveillante.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Button asChild className="bg-evrgrn-accent text-black hover:bg-evrgrn-accent/80">
                  <a href="/atelier/Atelier Création & Production 2022.pdf" target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger la brochure
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/contact?subject=Ateliers">Demander un devis</Link>
                </Button>
              </div>
            </div>
            
            <div className="bg-evrgrn-muted rounded-lg overflow-hidden">
              <div className="relative aspect-video w-full">
                <img 
                  src="/P1320893_optimized.jpg" 
                  alt="Atelier de production musicale" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-evrgrn-darker to-transparent opacity-70"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium">Atelier 2022 - Maison de quartier</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="bg-evrgrn-muted border-evrgrn-accent/10 hover:border-evrgrn-accent/30 transition-all duration-300">
              <CardContent className="p-6">
                <div className="mb-4">
                  <Users className="w-10 h-10 text-evrgrn-accent" />
                </div>
                <h3 className="text-lg font-medium mb-2">Pour tous les publics</h3>
                <p className="text-sm text-muted-foreground">
                  Accessibles à tous, quel que soit le niveau musical : jeunes, adultes, seniors, débutants ou musiciens confirmés. De 7 à 77 ans !
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-evrgrn-muted border-evrgrn-accent/10 hover:border-evrgrn-accent/30 transition-all duration-300">
              <CardContent className="p-6">
                <div className="mb-4">
                  <Music className="w-10 h-10 text-evrgrn-accent" />
                </div>
                <h3 className="text-lg font-medium mb-2">Styles musicaux variés</h3>
                <p className="text-sm text-muted-foreground">
                  Hip-Hop/Rap, R&B, Pop, Afro, Dancehall... Les ateliers s'adaptent à vos goûts et vos influences musicales.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-evrgrn-muted border-evrgrn-accent/10 hover:border-evrgrn-accent/30 transition-all duration-300">
              <CardContent className="p-6">
                <div className="mb-4">
                  <Headphones className="w-10 h-10 text-evrgrn-accent" />
                </div>
                <h3 className="text-lg font-medium mb-2">Équipement de qualité</h3>
                <p className="text-sm text-muted-foreground">
                  Utilisation d'ordinateurs, interfaces audio, claviers MIDI, microphones et logiciels de production musicale professionnels.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-evrgrn-muted border-evrgrn-accent/10 hover:border-evrgrn-accent/30 transition-all duration-300">
              <CardContent className="p-6">
                <div className="mb-4">
                  <BookOpen className="w-10 h-10 text-evrgrn-accent" />
                </div>
                <h3 className="text-lg font-medium mb-2">Suivi personnalisé</h3>
                <p className="text-sm text-muted-foreground">
                  Accompagnement adapté à chaque participant, avec des objectifs concrets et un suivi sur la durée de l'atelier.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-evrgrn-muted rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-serif mb-6">Contenu des ateliers</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-4 text-evrgrn-accent">Création musicale</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ArrowRight className="w-4 h-4 text-evrgrn-accent mr-2 mt-1 flex-shrink-0" />
                    <span>Écriture et composition : techniques et méthodes pour structurer vos idées</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-4 h-4 text-evrgrn-accent mr-2 mt-1 flex-shrink-0" />
                    <span>Théorie musicale appliquée : comprendre les accords, mélodies et rythmes</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-4 h-4 text-evrgrn-accent mr-2 mt-1 flex-shrink-0" />
                    <span>Techniques vocales et d'écriture pour les rappeurs et chanteurs</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-4 h-4 text-evrgrn-accent mr-2 mt-1 flex-shrink-0" />
                    <span>Expression artistique et développement d'un univers personnel</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4 text-evrgrn-accent">Production musicale</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ArrowRight className="w-4 h-4 text-evrgrn-accent mr-2 mt-1 flex-shrink-0" />
                    <span>Initiation aux logiciels de production (FL Studio, Ableton Live)</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-4 h-4 text-evrgrn-accent mr-2 mt-1 flex-shrink-0" />
                    <span>Techniques d'enregistrement et de mixage audio</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-4 h-4 text-evrgrn-accent mr-2 mt-1 flex-shrink-0" />
                    <span>Création de beats et programmation rythmique</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-4 h-4 text-evrgrn-accent mr-2 mt-1 flex-shrink-0" />
                    <span>Finalisation et mastering de projets musicaux</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-evrgrn-muted rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-serif mb-6">Pour qui sont ces ateliers ?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-4 text-evrgrn-accent">Structures</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ArrowRight className="w-4 h-4 text-evrgrn-accent mr-2 mt-1 flex-shrink-0" />
                    <span>Centres sociaux et maisons de quartier</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-4 h-4 text-evrgrn-accent mr-2 mt-1 flex-shrink-0" />
                    <span>Établissements scolaires et périscolaires</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-4 h-4 text-evrgrn-accent mr-2 mt-1 flex-shrink-0" />
                    <span>Structures culturelles et MJC</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-4 h-4 text-evrgrn-accent mr-2 mt-1 flex-shrink-0" />
                    <span>Associations et collectivités territoriales</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4 text-evrgrn-accent">Objectifs</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ArrowRight className="w-4 h-4 text-evrgrn-accent mr-2 mt-1 flex-shrink-0" />
                    <span>Développer l'expression créative et artistique</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-4 h-4 text-evrgrn-accent mr-2 mt-1 flex-shrink-0" />
                    <span>Promouvoir la cohésion sociale et favoriser les échanges</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-4 h-4 text-evrgrn-accent mr-2 mt-1 flex-shrink-0" />
                    <span>Acquérir des compétences techniques et artistiques</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="w-4 h-4 text-evrgrn-accent mr-2 mt-1 flex-shrink-0" />
                    <span>Réaliser des projets collectifs valorisants</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center text-center bg-evrgrn-darker border border-evrgrn-accent/20 rounded-lg p-8">
            <h2 className="text-2xl font-serif mb-4">Vous souhaitez organiser un atelier ?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl">
              Les ateliers sont modulables et adaptables à vos besoins spécifiques. 
              Contactez-nous pour discuter de votre projet et obtenir un devis personnalisé.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-evrgrn-accent text-black hover:bg-evrgrn-accent/80">
                <Link to="/contact?subject=Ateliers">Demander un devis</Link>
              </Button>
              <Button asChild variant="outline">
                <a href="/atelier/Atelier Création & Production 2022.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" />
                  Télécharger la brochure
                </a>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Ateliers;
