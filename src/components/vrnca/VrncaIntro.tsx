
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import VrncaAvatar from './VrncaAvatar';
import VrncaDialog from './VrncaDialog';
import GlitchText from '../ui/GlitchText';

interface VrncaIntroProps {
  onComplete: () => void;
  className?: string;
}

const VrncaIntro: React.FC<VrncaIntroProps> = ({ onComplete, className }) => {
  const [stage, setStage] = useState<'initial' | 'connecting' | 'scanning' | 'intro' | 'complete'>('initial');

  useEffect(() => {
    // Start connecting animation after a short delay
    const timer = setTimeout(() => {
      setStage('connecting');
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (stage === 'connecting') {
      // After "connecting" move to scanning
      const timer = setTimeout(() => {
        setStage('scanning');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
    
    if (stage === 'scanning') {
      // After "scanning" move to intro
      const timer = setTimeout(() => {
        setStage('intro');
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
        className
      )}
    >
      <div className="w-full max-w-md px-6">
        {stage === 'initial' && (
          <div className="text-center animate-fade-in">
            <div className="text-evrgrn-blue text-sm font-mono mb-2">INITIALIZING</div>
            <VrncaAvatar state="idle" size="lg" className="mx-auto mb-4" />
            <div className="h-1 w-full bg-evrgrn-muted rounded-full overflow-hidden">
              <div className="h-full bg-evrgrn-blue animate-pulse" style={{ width: '10%' }}></div>
            </div>
          </div>
        )}
        
        {stage === 'connecting' && (
          <div className="text-center animate-fade-in">
            <div className="text-evrgrn-blue text-sm font-mono mb-2">ESTABLISHING CONNECTION</div>
            <VrncaAvatar state="active" size="lg" className="mx-auto mb-4" />
            <div className="h-1 w-full bg-evrgrn-muted rounded-full overflow-hidden">
              <div className="h-full bg-evrgrn-blue animate-pulse" style={{ width: '40%' }}></div>
            </div>
            <div className="mt-4 font-mono text-xs text-evrgrn-blue">
              Connection to EVRGRN network: <GlitchText intensity="low">IN PROGRESS</GlitchText>
            </div>
          </div>
        )}
        
        {stage === 'scanning' && (
          <div className="text-center animate-fade-in">
            <div className="text-evrgrn-green text-sm font-mono mb-2">SCANNING VISITOR</div>
            <VrncaAvatar state="scanning" size="lg" className="mx-auto mb-4" />
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
            <VrncaDialog 
              messages={introMessages} 
              speed={20} 
              onComplete={handleIntroComplete} 
              avatarState="active"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VrncaIntro;
