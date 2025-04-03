
import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface AlbumDetailProps {
  id: string;
  title: string;
  year: string;
  month?: string;
  collaborators?: string;
  image?: string;
  isUnreleased?: boolean;
  description?: string;
  musicCharacteristics?: {
    calmDancing: number; // 0 = calm, 100 = dancing
    engagedSilly: number; // 0 = engaged, 100 = silly
    realityFiction: number; // 0 = reality, 100 = fiction
  };
}

const AlbumDetail: React.FC<AlbumDetailProps> = ({
  id,
  title,
  year,
  month,
  collaborators,
  image = "/placeholder.svg",
  isUnreleased = false,
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  musicCharacteristics = {
    calmDancing: 50,
    engagedSilly: 30,
    realityFiction: 70
  }
}) => {
  return (
    <div className="bg-evrgrn-darker rounded-lg overflow-hidden border border-evrgrn-accent/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Album artwork */}
        <div className="relative aspect-square md:aspect-auto md:h-full bg-evrgrn-darker">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          
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
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-medium text-foreground mb-3">Description</h2>
            <p className="text-muted-foreground">{description}</p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-medium text-foreground mb-4">Caractéristiques</h2>
            
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
          </div>
          
          <div className="mt-auto flex space-x-4">
            {!isUnreleased ? (
              <>
                <Button 
                  className="flex-1 bg-evrgrn-accent text-black hover:bg-evrgrn-accent/80"
                >
                  Écouter
                </Button>
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
