
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import VrncaAvatar from './VrncaAvatar';
import VrncaDialog from './VrncaDialog';
import GlitchText from '../ui/GlitchText';
import VrncaFaceAnimation, { VrncaFaceExpression } from './VrncaFaceAnimation';

interface VrncaIntroProps {
  onComplete: () => void;
  className?: string;
}

const VrncaIntro: React.FC<VrncaIntroProps> = ({ onComplete, className }) => {
  const [stage, setStage] = useState<'initial' | 'connecting' | 'scanning' | 'intro' | 'complete'>('initial');
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [faceExpression, setFaceExpression] = useState<VrncaFaceExpression>('neutral');

  useEffect(() => {
    // Ajouter des effets de glitch aléatoires
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchEffect(true);
        setTimeout(() => setGlitchEffect(false), 200);
      }
    }, 2000);
    
    // Start connecting animation after a short delay
    const timer = setTimeout(() => {
      setStage('connecting');
    }, 1500);
    
    return () => {
      clearTimeout(timer);
      clearInterval(glitchInterval);
    }
  }, []);

  useEffect(() => {
    if (stage === 'connecting') {
      // Set face expression for connecting stage
      setFaceExpression('neutral');
      
      // After "connecting" move to scanning
      const timer = setTimeout(() => {
        setStage('scanning');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
    
    if (stage === 'scanning') {
      // Set face expression for scanning stage
      setFaceExpression('shook1');
      
      // After "scanning" move to intro
      const timer = setTimeout(() => {
        setStage('intro');
        // Set face to talk
        setFaceExpression('laugh1');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const handleIntroComplete = () => {
    setStage('complete');
    
    // Allow some time for animation before calling onComplete
    setTimeout(() => {
      onComplete();
    }, 1000);
  };
  
  const introMessages = [
    "Connexion établie. Je suis VRNCA, l'extension consciente de celui qui est banni.",
    "Mathis est hors-ligne... mais moi, je suis là.",
    "Bienvenue dans EVRGRN. J'ai des fragments à te montrer."
  ];

  return (
    <div 
      className={cn(
        'fixed inset-0 flex flex-col items-center justify-center z-50 bg-evrgrn-darker',
        stage === 'complete' ? 'animate-fade-out pointer-events-none' : '',
        glitchEffect ? 'animate-glitch-subtle' : '',
        className
      )}
    >
      {/* Effet de lignes statiques de télévision */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-full h-px bg-white/5"
            style={{ 
              top: `${i * 2}%`,
              opacity: Math.random() * 0.2,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      {/* Effet de scan line qui parcourt l'écran */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="tv-scanline"></div>
      </div>
      
      {/* Effet de TV static */}
      <div className="absolute inset-0 tv-static opacity-10"></div>
      
      <div className="w-full max-w-md px-6 relative">
        {/* Glitch effet visuel occasionnel */}
        {glitchEffect && (
          <div className="absolute inset-0 bg-evrgrn-accent/10 z-10"></div>
        )}
        
        {stage === 'initial' && (
          <div className="text-center animate-fade-in">
            <div className="text-evrgrn-accent text-sm font-mono mb-2">INITIALIZING</div>
            <div className="mx-auto mb-4 flex justify-center">
              <VrncaFaceAnimation 
                expression="neutral"
                size="lg"
                autoAnimate={true}
              />
            </div>
            <div className="h-1 w-full bg-evrgrn-muted rounded-full overflow-hidden">
              <div className="h-full bg-evrgrn-accent animate-pulse" style={{ width: '10%' }}></div>
            </div>
          </div>
        )}
        
        {stage === 'connecting' && (
          <div className="text-center animate-fade-in">
            <div className="text-evrgrn-accent text-sm font-mono mb-2">ESTABLISHING CONNECTION</div>
            <div className="mx-auto mb-4 flex justify-center">
              <VrncaFaceAnimation 
                expression={faceExpression}
                size="lg"
              />
            </div>
            <div className="h-1 w-full bg-evrgrn-muted rounded-full overflow-hidden">
              <div className="h-full bg-evrgrn-accent animate-pulse" style={{ width: '40%' }}></div>
            </div>
            <div className="mt-4 font-mono text-xs text-evrgrn-accent">
              Connection to EVRGRN network: <GlitchText intensity="low">IN PROGRESS</GlitchText>
            </div>
          </div>
        )}
        
        {stage === 'scanning' && (
          <div className="text-center animate-fade-in">
            <div className="text-evrgrn-green text-sm font-mono mb-2">SCANNING VISITOR</div>
            <div className="mx-auto mb-4 flex justify-center">
              <VrncaFaceAnimation 
                expression={faceExpression}
                size="lg"
              />
            </div>
            <div className="h-1 w-full bg-evrgrn-muted rounded-full overflow-hidden">
              <div className="h-full bg-evrgrn-green animate-pulse" style={{ width: '70%' }}></div>
            </div>
            <div className="mt-4 font-mono text-xs text-evrgrn-green">
              Biometric scan complete. Access: <GlitchText intensity="low" variant="accent">GRANTED</GlitchText>
            </div>
          </div>
        )}
        
        {stage === 'intro' && (
          <div className="animate-fade-in">
            <div className="flex items-start gap-4 mb-4">
              <VrncaFaceAnimation 
                expression={faceExpression}
                size="md"
              />
              <VrncaDialog 
                messages={introMessages} 
                speed={20} 
                onComplete={handleIntroComplete} 
                avatarState="active"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VrncaIntro;
