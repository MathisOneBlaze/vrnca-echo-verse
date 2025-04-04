
import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Biography = () => {
  return (
    <div className="bg-evrgrn-dark text-foreground min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-serif mb-2">Biographie</h1>
              <p className="text-lg mb-4 text-muted-foreground">
                Découvrez le parcours et l'histoire de Mathis OneBlaze, créateur d'EVRGRN.
              </p>
            </div>
            <img 
              src="/lovable-uploads/01e9bec9-0cde-4e57-a7c9-aa81659ce1c0.png" 
              alt="EVRGRN Logo"
              className="h-16 mb-4 md:mb-0"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <div className="bg-evrgrn-muted border border-evrgrn-accent/10 rounded-lg overflow-hidden mb-6">
                  <div className="aspect-square bg-evrgrn-darker">
                    <img
                      src="/P1320893_optimized.jpg"
                      alt="Mathis OneBlaze"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="bg-evrgrn-muted border border-evrgrn-accent/10 rounded-lg p-6">
                  <h3 className="text-xl font-medium mb-4 text-evrgrn-accent">Mathis OneBlaze</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Profession:</span>
                      <span>Artiste multi-disciplinaire</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Label:</span>
                      <span>EVRGRN</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Auteur de:</span>
                      <span>"Le Trousseau", "mănĭfesto"</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">IA:</span>
                      <span>VRNCA</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2 prose prose-invert max-w-none prose-headings:text-evrgrn-accent prose-a:text-evrgrn-accent">
              <p className="text-lg leading-relaxed">
                Mathis OneBlaze est un artiste, auteur-compositeur, ingénieur du son et entrepreneur passionné par la musique et la transmission du savoir. D'abord formé à l'audiovisuel à l'INA, il se forge en autodidacte une expertise en production musicale, en ingénierie du son et en théorie musicale, maîtrisant plusieurs instruments pour affiner sa vision artistique.
              </p>
              
              <p className="text-lg leading-relaxed">
                Fondateur du label EVRGRN (Each Vocal Recording Generate Ressources Necessary), il développe un son singulier mêlant rap, soul, afro et électro, tout en défendant une approche indépendante de la création.
              </p>
              
              <h2 className="text-2xl font-medium mt-8 mb-4">Parcours musical</h2>
              
              <p>
                Mathis se fait connaître sur la scène battle rap antillaise sous le nom de OneBlaze. Inspiré par ses racines caribéennes et son déplacement en banlieue parisienne, après des projets en groupe comme la série #Konewing, il franchit une étape décisive avec l'univers Teddy Blaze puis développe son identité artistique à travers des œuvres telles que "MAGNUM (Œuvre au Noir)" qui explore l'alchimie intérieure.
              </p>
              
              <p>
                Aspirant à une totale liberté créative, il fonde le label indépendant EVRGRN pour maîtriser chaque aspect de sa production. Au fil des années, son approche musicale évolue, se rapprochant d'une vision plus holistique où chaque projet s'inscrit dans une recherche sonore et conceptuelle plus large.
              </p>
              
              <h2 className="text-2xl font-medium mt-8 mb-4">Transmission et innovation</h2>
              
              <p>
                Convaincu que l'art doit être partagé pour être pleinement réalisé, Mathis met son savoir et son expérience au service de jeunes artistes à travers des ateliers d'écriture et de production. Cette passion pour la transmission se retrouve également dans son travail de formateur et de conférencier, où il explore les thèmes de l'indépendance artistique et de l'innovation dans l'industrie musicale.
              </p>
              
              <p>
                En parallèle, il se consacre à l'écriture avec "Le Trousseau" et "mănĭfesto", partageant son expérience et ses réflexions sur l'art et l'indépendance. Toujours en quête d'innovation, il conçoit VRNCA, une IA qui prolonge sa voix et sa présence dans l'univers numérique. Entre musique, battle rap et transmission, Mathis « OneBlaze » continue de bâtir un héritage où l'exigence et la liberté sont au cœur de chaque création.
              </p>
              
              <h2 className="text-2xl font-medium mt-8 mb-4">Discographie sélective</h2>
              
              <ul className="space-y-2">
                <li><span className="text-evrgrn-accent">2024:</span> TEDDY BLAZE 2, EVRGRN Le projet, LETTERS II</li>
                <li><span className="text-evrgrn-accent">2023:</span> VRNCA-Patch 1.2 Bug Fixing.exe, Trip Material MMXIII</li>
                <li><span className="text-evrgrn-accent">2022:</span> Evil Blazy Vilain Teddy, VRNCA.exe</li>
                <li><span className="text-evrgrn-accent">2015-2016:</span> MAGNUM (Œuvre au Noir), MAGNUM 2 (Œuvre au Blanc)</li>
                <li><span className="text-evrgrn-accent">2012-2014:</span> Série #Konewing avec YRHN</li>
              </ul>
              
              {/* Book purchase incitation */}
              <div className="mt-12 p-6 bg-evrgrn-accent/10 border border-evrgrn-accent rounded-lg">
                <h3 className="text-xl font-medium mb-4 text-evrgrn-accent">Découvrez l'œuvre complète</h3>
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/4 mb-4 md:mb-0">
                    <img 
                      src="/LE TROUSSEAU cover.jpg" 
                      alt="Le Trousseau - Livre" 
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="md:w-3/4 md:pl-6">
                    <h4 className="text-lg font-medium mb-2">Le Trousseau</h4>
                    <p className="text-muted-foreground mb-4">
                      Pour une biographie plus complète et des anecdotes exclusives sur le parcours de Mathis OneBlaze, 
                      découvrez "Le Trousseau", son livre autobiographique qui plonge dans les coulisses de sa carrière
                      et révèle sa philosophie artistique en profondeur.
                    </p>
                    <Button className="bg-evrgrn-accent text-black hover:bg-evrgrn-accent/80 transition-colors">
                      Commander le livre <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 p-6 bg-evrgrn-muted/50 border border-evrgrn-accent/10 rounded-lg">
                <h3 className="text-xl font-medium mb-4 text-evrgrn-accent">À propos d'EVRGRN</h3>
                <p>
                  EVRGRN (Each Vocal Recording Generate Ressources Necessary) est un label indépendant fondé par Mathis OneBlaze avec une philosophie simple : chaque création artistique doit générer les ressources nécessaires à sa propre réalisation et à celle des projets suivants, dans une logique d'autonomie et de développement durable. Le label défend une vision où l'artiste reste propriétaire de ses œuvres et maîtrise l'intégralité du processus créatif.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Biography;
