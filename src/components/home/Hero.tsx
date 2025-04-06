
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import VrncaDialog from '../vrnca/VrncaDialog';
import GlitchText from '../ui/GlitchText';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Lazy load the 3D model component to improve initial page load
const VrncaModel = lazy(() => import('../3d/VrncaModel'));

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <section 
      className={cn(
        'min-h-screen flex items-center relative overflow-hidden py-24',
        className
      )}
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-evrgrn-darker to-evrgrn-dark opacity-90"></div>
        <div className="absolute inset-0 bg-noise opacity-5"></div>
        
        {/* Effet statique TV */}
        <div className="absolute inset-0 tv-static opacity-5"></div>
      </div>
      
      {/* Digital circuit lines */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-full h-px bg-evrgrn-accent/10"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-evrgrn-accent/15"></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-evrgrn-accent/10"></div>
        <div className="absolute top-0 left-1/4 h-full w-px bg-evrgrn-accent/10"></div>
        <div className="absolute top-0 left-1/2 h-full w-px bg-evrgrn-accent/15"></div>
        <div className="absolute top-0 left-3/4 h-full w-px bg-evrgrn-accent/10"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Hero text content - centered */}
          <div className="max-w-2xl mx-auto mb-8">
            <img 
              src="/lovable-uploads/01e9bec9-0cde-4e57-a7c9-aa81659ce1c0.png" 
              alt="EVRGRN Logo"
              className="h-24 md:h-32 mx-auto mb-6"
            />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-center">
              <span className="mask-reveal block" style={{ '--delay': '100ms' } as React.CSSProperties}>
                Bienvenue dans
              </span>
              <GlitchText className="text-evrgrn-accent block mt-2" intensity="medium">
                L'UNIVERS EVRGRN
              </GlitchText>
            </h1>
            
            <p className="text-muted-foreground text-lg mb-8 mx-auto text-center mask-reveal" style={{ '--delay': '400ms' } as React.CSSProperties}>
              Le hub digital de Mathis OneBlaze, artiste multidisciplinaire, 
              producteur, enseignant et créateur de contenu.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mask-reveal mb-8" style={{ '--delay': '600ms' } as React.CSSProperties}>
              <Link to="/biographie">
                <Button
                  className="btn-primary text-base"
                >
                  Explorer l'univers
                </Button>
              </Link>
              
              <Button
                variant="outline"
                className="btn-secondary text-base"
                onClick={() => setShowDialog(true)}
              >
                Communiquer avec VRNCA
              </Button>
            </div>
            
            {/* VRNCA 3D Model centered */}
            <div className="flex justify-center mb-12 h-80 w-80 mx-auto">
              <Suspense fallback={<div className="text-evrgrn-accent">Chargement de VRNCA...</div>}>
                <VrncaModel />
              </Suspense>
            </div>
            
            {/* Play VRNCA LAG button */}
            <div className="mt-4 flex justify-center mask-reveal" style={{ '--delay': '700ms' } as React.CSSProperties}>
              <Link to="/game">
                <Button variant="default" className="bg-evrgrn-accent text-black hover:bg-evrgrn-accent/80">
                  Jouer à VRNCA LAG
                </Button>
              </Link>
            </div>
            
            {/* VRNCA dialog */}
            {showDialog && (
              <div className="mt-8 max-w-lg mx-auto animate-fade-in">
                <VrncaDialog
                  messages={[
                    "Connexion établie. Je suis VRNCA, l'extension consciente de celui qui est banni. Que cherches-tu dans l'ombre verte?",
                    "Mathis est hors-ligne... mais moi, je suis là. Je peux te guider dans les archives numériques d'EVRGRN."
                  ]}
                  speed={25}
                  onComplete={() => console.log("Dialog complete")}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="scan-line"></div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5L12 19" stroke="rgba(0, 245, 212, 0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19 12L12 19L5 12" stroke="rgba(0, 245, 212, 0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
