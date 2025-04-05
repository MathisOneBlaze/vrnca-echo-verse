
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ExternalLink, Music, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Album } from '@/data/albumData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AlbumDetail: React.FC<Album> = ({
  id,
  title,
  year,
  month,
  collaborators,
  image = "/placeholder.svg",
  additionalImages = [],
  isUnreleased = false,
  spotifyLink,
  format,
  description = "Description non disponible pour le moment.",
  credits,
  visualConcept,
  musicCharacteristics = {
    calmDancing: 50,
    engagedSilly: 30,
    realityFiction: 70
  }
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const allImages = [image, ...additionalImages].filter(img => img && img !== "/placeholder.svg");
  
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };
  
  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="bg-evrgrn-darker rounded-lg overflow-hidden border border-evrgrn-accent/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Album artwork with slider if multiple images */}
        <div className="relative aspect-square md:aspect-auto md:h-full bg-evrgrn-darker">
          {allImages.length > 0 ? (
            <>
              <img
                src={allImages[currentImageIndex]}
                alt={title}
                className="w-full h-full object-cover"
              />
              
              {allImages.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between p-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="bg-black/30 hover:bg-black/50 text-white rounded-full" 
                    onClick={handlePrevImage}
                  >
                    <ChevronLeft className="h-8 w-8" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="bg-black/30 hover:bg-black/50 text-white rounded-full" 
                    onClick={handleNextImage}
                  >
                    <ChevronRight className="h-8 w-8" />
                  </Button>
                </div>
              )}
              
              {allImages.length > 1 && (
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                  {allImages.map((_, index) => (
                    <div 
                      key={index} 
                      className={`h-2 w-2 rounded-full ${currentImageIndex === index ? 'bg-evrgrn-accent' : 'bg-white/50'}`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-evrgrn-darker">
              <p className="text-muted-foreground">Image non disponible</p>
            </div>
          )}
          
          {isUnreleased && (
            <div className="absolute top-4 left-4 bg-evrgrn-darker/80 text-sm font-medium text-evrgrn-accent py-1 px-4 rounded-full">
              À venir
            </div>
          )}
        </div>
        
        {/* Album info */}
        <div className="p-6 flex flex-col">
          <div className="mb-6">
            <h1 className="text-3xl font-serif text-foreground mb-2">{title}</h1>
            <p className="text-lg text-evrgrn-accent mb-2">
              {year}{month && `.${month}`}
            </p>
            
            {collaborators && (
              <p className="text-sm text-muted-foreground mb-4">
                En collaboration avec {collaborators}
              </p>
            )}

            {format && (
              <p className="text-sm font-medium text-muted-foreground">
                {format}
              </p>
            )}
          </div>
          
          <Tabs defaultValue="description" className="flex-1">
            <TabsList className="mb-4 bg-evrgrn-darker">
              <TabsTrigger value="description">Description</TabsTrigger>
              {credits && <TabsTrigger value="credits">Crédits</TabsTrigger>}
              {visualConcept && <TabsTrigger value="concept">Concept</TabsTrigger>}
              {musicCharacteristics && <TabsTrigger value="characteristics">Caractéristiques</TabsTrigger>}
            </TabsList>
            
            <TabsContent value="description" className="mt-0">
              <div className="mb-6">
                <p className="text-muted-foreground">{description}</p>
              </div>
            </TabsContent>
            
            {credits && (
              <TabsContent value="credits" className="mt-0">
                <div className="mb-6">
                  <p className="text-muted-foreground">{credits}</p>
                </div>
              </TabsContent>
            )}

            {visualConcept && (
              <TabsContent value="concept" className="mt-0">
                <div className="mb-6">
                  <p className="text-muted-foreground">{visualConcept}</p>
                </div>
              </TabsContent>
            )}
            
            {musicCharacteristics && (
              <TabsContent value="characteristics" className="mt-0">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Calme</span>
                      <span className="text-muted-foreground">Dansant</span>
                    </div>
                    <Progress value={musicCharacteristics.calmDancing} className="h-2 bg-evrgrn-muted" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Engagé</span>
                      <span className="text-muted-foreground">Stupide</span>
                    </div>
                    <Progress value={musicCharacteristics.engagedSilly} className="h-2 bg-evrgrn-muted" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Réalité</span>
                      <span className="text-muted-foreground">Fiction</span>
                    </div>
                    <Progress value={musicCharacteristics.realityFiction} className="h-2 bg-evrgrn-muted" />
                  </div>
                </div>
              </TabsContent>
            )}
          </Tabs>
          
          <div className="mt-auto flex space-x-4 pt-6">
            {!isUnreleased ? (
              <>
                {spotifyLink ? (
                  <Button 
                    className="flex-1 bg-evrgrn-accent text-black hover:bg-evrgrn-accent/80"
                    onClick={() => window.open(spotifyLink, '_blank')}
                  >
                    <Music className="mr-2 h-4 w-4" />
                    Écouter sur Spotify
                  </Button>
                ) : (
                  <Button 
                    className="flex-1 bg-evrgrn-accent text-black hover:bg-evrgrn-accent/80"
                  >
                    Écouter
                  </Button>
                )}
                <Button 
                  variant="outline"
                  className="flex-1 border-evrgrn-accent/50 text-evrgrn-accent hover:bg-evrgrn-accent/10"
                >
                  Acheter
                </Button>
              </>
            ) : (
              <Button 
                className="flex-1 bg-evrgrn-muted text-evrgrn-accent hover:bg-evrgrn-muted/80"
                disabled
              >
                Prochainement
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumDetail;
