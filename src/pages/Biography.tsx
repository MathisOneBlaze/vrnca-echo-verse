
import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const Biography = () => {
  return (
    <div className="bg-evrgrn-dark text-foreground min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-serif mb-2">Biographie</h1>
              <p className="text-lg text-muted-foreground">
                L'histoire et la vision derrière EVRGRN
              </p>
            </div>
            <img 
              src="/lovable-uploads/01e9bec9-0cde-4e57-a7c9-aa81659ce1c0.png" 
              alt="EVRGRN Logo"
              className="h-16"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-1">
              <div className="mb-6">
                <img 
                  src="/P1320893_optimized.jpg" 
                  alt="Mathis OneBlaze" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
              
              <div className="bg-evrgrn-muted border border-evrgrn-accent/10 rounded-lg p-6">
                <h3 className="text-xl font-medium mb-4">Réseaux sociaux</h3>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-evrgrn-accent/30 text-evrgrn-accent hover:bg-evrgrn-accent/10"
                    onClick={() => window.open("https://instagram.com/mathisoneblaze", "_blank")}
                  >
                    <span className="mr-2">Instagram</span>
                    <ExternalLink className="h-4 w-4 ml-auto" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-evrgrn-accent/30 text-evrgrn-accent hover:bg-evrgrn-accent/10"
                    onClick={() => window.open("https://twitter.com/mathisoneblaze", "_blank")}
                  >
                    <span className="mr-2">Twitter</span>
                    <ExternalLink className="h-4 w-4 ml-auto" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-evrgrn-accent/30 text-evrgrn-accent hover:bg-evrgrn-accent/10"
                    onClick={() => window.open("https://tiktok.com/@mathisoneblaze", "_blank")}
                  >
                    <span className="mr-2">TikTok</span>
                    <ExternalLink className="h-4 w-4 ml-auto" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-evrgrn-accent/30 text-evrgrn-accent hover:bg-evrgrn-accent/10"
                    onClick={() => window.open("https://www.youtube.com/@MathisOneBlaze", "_blank")}
                  >
                    <span className="mr-2">YouTube</span>
                    <ExternalLink className="h-4 w-4 ml-auto" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <Tabs defaultValue="parcours">
                <TabsList className="bg-evrgrn-muted border border-evrgrn-accent/10 w-full flex justify-start overflow-x-auto mb-6">
                  <TabsTrigger value="parcours">Parcours Musical</TabsTrigger>
                  <TabsTrigger value="label">À propos d'EVRGRN</TabsTrigger>
                  <TabsTrigger value="projets">Projets</TabsTrigger>
                </TabsList>
                
                <TabsContent value="parcours" className="mt-0">
                  <div className="bg-evrgrn-muted border border-evrgrn-accent/10 rounded-lg p-8">
                    <h2 className="text-2xl font-serif mb-4">Parcours Musical</h2>
                    <p className="text-muted-foreground mb-4">
                      Mathis se fait connaître sur la scène rap antillaise sous le nom de OneBlaze. Inspiré par ses racines caribéennes et son déplacement en banlieue parisienne, après des projets en groupe comme la série #Konewing, il franchit une étape décisive avec l'univers Teddy Blaze puis développe son identité artistique à travers des œuvres telles que "MAGNUM (Œuvre au Noir)" qui explore l'alchimie intérieure.
                    </p>
                    <p className="text-muted-foreground">
                      Aspirant à une totale liberté créative, il fonde le label indépendant EVRGRN pour maîtriser chaque aspect de sa production. Au fil des années, son approche musicale évolue, se rapprochant d'une vision plus holistique où chaque projet s'inscrit dans une recherche sonore et conceptuelle plus large.
                    </p>
                  </div>
                  
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-evrgrn-muted border border-evrgrn-accent/10 rounded-lg p-6">
                      <h3 className="text-xl font-medium mb-3">Influences</h3>
                      <p className="text-muted-foreground">
                        Les influences musicales de Mathis OneBlaze sont diverses, allant du hip-hop classique de la côte Est à la trap moderne, en passant par les traditions musicales caribéennes. Cette fusion crée un style unique qui caractérise l'ensemble de son œuvre.
                      </p>
                    </div>
                    
                    <div className="bg-evrgrn-muted border border-evrgrn-accent/10 rounded-lg p-6">
                      <h3 className="text-xl font-medium mb-3">Approche Artistique</h3>
                      <p className="text-muted-foreground">
                        Plus qu'un simple artiste musical, Mathis conçoit chaque projet comme une œuvre totale, mélangeant narration, univers visuel et exploration sonore. Cette démarche holistique transforme chaque album en une expérience complète et immersive.
                      </p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="label" className="mt-0">
                  <div className="bg-evrgrn-muted border border-evrgrn-accent/10 rounded-lg p-8">
                    <h2 className="text-2xl font-serif mb-4">À propos d'EVRGRN</h2>
                    <p className="text-muted-foreground mb-4">
                      EVRGRN (prononcé "evergreen") est un label indépendant fondé par Mathis OneBlaze avec pour mission de créer un espace de liberté totale pour la création artistique. Le nom symbolise des œuvres intemporelles qui, comme les arbres à feuilles persistantes, conservent leur essence et leur impact à travers les années et les tendances.
                    </p>
                    <p className="text-muted-foreground mb-6">
                      Le label se distingue par sa volonté de maîtriser l'ensemble de la chaîne de création, de la production musicale au développement de concepts visuels et narratifs complets. Cette approche garantit l'intégrité artistique des projets et permet d'offrir aux auditeurs des expériences immersives et cohérentes.
                    </p>
                    <img
                      src="/LOGO/LOGO 4 EVGRN ligne blanc.png"
                      alt="EVRGRN Logo"
                      className="h-12 w-auto"
                    />
                  </div>
                  
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-evrgrn-muted border border-evrgrn-accent/10 rounded-lg p-6">
                      <h3 className="text-xl font-medium mb-3">Philosophie</h3>
                      <p className="text-muted-foreground">
                        La philosophie d'EVRGRN repose sur trois piliers : l'authenticité artistique, l'innovation narrative et l'indépendance créative. Le label encourage l'expérimentation et repousse constamment les frontières entre genres musicaux et médiums artistiques.
                      </p>
                    </div>
                    
                    <div className="bg-evrgrn-muted border border-evrgrn-accent/10 rounded-lg p-6">
                      <h3 className="text-xl font-medium mb-3">Communauté</h3>
                      <p className="text-muted-foreground">
                        Au-delà de la production musicale, EVRGRN cherche à créer une communauté de créateurs et d'auditeurs partageant les mêmes valeurs. Le label s'engage à soutenir les artistes émergents et à faciliter des collaborations qui enrichissent l'écosystème musical indépendant.
                      </p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="projets" className="mt-0">
                  <div className="bg-evrgrn-muted border border-evrgrn-accent/10 rounded-lg p-8">
                    <h2 className="text-2xl font-serif mb-4">Projets Actuels et Futurs</h2>
                    <p className="text-muted-foreground mb-6">
                      EVRGRN poursuit son développement à travers plusieurs axes créatifs, enrichissant constamment son univers musical et conceptuel. Voici un aperçu des projets en cours et à venir.
                    </p>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-medium mb-2">VRNCA</h3>
                        <p className="text-muted-foreground">
                          Le projet VRNCA explore l'intersection entre technologie et créativité humaine, interrogeant notre relation avec les systèmes numériques qui nous entourent. Après VRNCA.exe et le récent VRNCA Patch 1.2.exe, cette série continue d'évoluer vers de nouvelles formes d'expression.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-medium mb-2">Teddy Verse</h3>
                        <p className="text-muted-foreground">
                          Le Teddy Verse est un univers narratif complet qui se déploie à travers plusieurs albums et médiums. Ce concept explore les multiples facettes d'un alter ego artistique, chaque projet révélant une nouvelle dimension de cet univers en expansion.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-medium mb-2">Projets Pluridisciplinaires</h3>
                        <p className="text-muted-foreground">
                          EVRGRN s'engage dans des initiatives qui transcendent le cadre strictement musical, incluant des publications littéraires, des installations visuelles et des expériences numériques interactives qui complètent et enrichissent l'univers sonore.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Biography;
