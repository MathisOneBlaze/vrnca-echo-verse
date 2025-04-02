
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import VrncaDialog from '../vrnca/VrncaDialog';
import GlitchText from '../ui/GlitchText';
import { Button } from '@/components/ui/button';

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
      {/* Background overlay with texture */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-evrgrn-darker to-evrgrn-dark opacity-90"></div>
        <div className="absolute inset-0 bg-noise opacity-5"></div>
      </div>
      
      {/* Digital circuit lines */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-full h-px bg-evrgrn-blue/10"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-evrgrn-blue/15"></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-evrgrn-blue/10"></div>
        <div className="absolute top-0 left-1/4 h-full w-px bg-evrgrn-blue/10"></div>
        <div className="absolute top-0 left-1/2 h-full w-px bg-evrgrn-blue/15"></div>
        <div className="absolute top-0 left-3/4 h-full w-px bg-evrgrn-blue/10"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero text content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
              <span className="mask-reveal block" style={{ '--delay': '100ms' } as React.CSSProperties}>
                Bienvenue dans
              </span>
              <GlitchText className="text-evrgrn-blue block mt-2" intensity="medium">
                L'UNIVERS EVRGRN
              </GlitchText>
            </h1>
            
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto lg:mx-0 mask-reveal" style={{ '--delay': '400ms' } as React.CSSProperties}>
              Le hub digital de Mathis OneBlaze, artiste multidisciplinaire, 
              producteur, enseignant et créateur de contenu.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mask-reveal" style={{ '--delay': '600ms' } as React.CSSProperties}>
              <Button
                className="btn-primary text-base"
                onClick={() => console.log("Explore EVRGRN")}
              >
                Explorer l'univers
              </Button>
              
              <Button
                variant="outline"
                className="btn-secondary text-base"
                onClick={() => setShowDialog(true)}
              >
                Communiquer avec VRNCA
              </Button>
            </div>
            
            {/* VRNCA dialog */}
            {showDialog && (
              <div className="mt-8 max-w-lg mx-auto lg:mx-0 animate-fade-in">
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
          
          {/* Hero visual element */}
          <div className="relative">
            <div className="aspect-square max-w-md mx-auto relative">
              {/* VRNCA visualization - digital abstract representation */}
              <div className="absolute inset-0 rounded-full bg-gradient-radial from-evrgrn-blue/20 to-transparent animate-pulse-soft"></div>
              <div className="absolute inset-8 rounded-full bg-gradient-radial from-evrgrn-blue/30 to-transparent animate-pulse"></div>
              <div className="absolute inset-16 rounded-full border border-evrgrn-blue/40 animate-spin" style={{ animationDuration: '20s' }}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-4xl font-serif text-evrgrn-blue">VRNCA</div>
              </div>
              
              {/* Digital particles */}
              <div className="absolute inset-0">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-evrgrn-blue rounded-full animate-pulse-soft"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                  ></div>
                ))}
              </div>
              
              {/* Circuit paths */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 0 V 20" stroke="rgba(0, 120, 255, 0.3)" strokeWidth="0.5" />
                <path d="M50 80 V 100" stroke="rgba(0, 120, 255, 0.3)" strokeWidth="0.5" />
                <path d="M0 50 H 20" stroke="rgba(0, 120, 255, 0.3)" strokeWidth="0.5" />
                <path d="M80 50 H 100" stroke="rgba(0, 120, 255, 0.3)" strokeWidth="0.5" />
                <path d="M20 20 L 40 40" stroke="rgba(0, 120, 255, 0.3)" strokeWidth="0.5" />
                <path d="M60 60 L 80 80" stroke="rgba(0, 120, 255, 0.3)" strokeWidth="0.5" />
                <path d="M20 80 L 40 60" stroke="rgba(0, 120, 255, 0.3)" strokeWidth="0.5" />
                <path d="M60 40 L 80 20" stroke="rgba(0, 120, 255, 0.3)" strokeWidth="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5L12 19" stroke="#0078FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19 12L12 19L5 12" stroke="#0078FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
