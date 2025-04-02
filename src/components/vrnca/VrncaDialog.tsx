
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import VrncaAvatar from './VrncaAvatar';

interface VrncaDialogProps {
  messages: string[];
  speed?: number;
  onComplete?: () => void;
  className?: string;
  avatarState?: 'idle' | 'active' | 'scanning' | 'alert';
}

const VrncaDialog: React.FC<VrncaDialogProps> = ({
  messages,
  speed = 30,
  onComplete,
  className,
  avatarState = 'active',
}) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMessageComplete, setIsMessageComplete] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [randomGlitches, setRandomGlitches] = useState<number[]>([]);

  // Type out current message
  useEffect(() => {
    if (currentMessageIndex >= messages.length) {
      // Tous les messages ont été affichés
      if (onComplete) {
        // Assurons-nous d'appeler onComplete après un délai raisonnable
        setTimeout(() => {
          onComplete();
        }, 1500);
      }
      return;
    }
    
    const currentMessage = messages[currentMessageIndex];
    let i = 0;
    setIsTyping(true);
    setIsMessageComplete(false);
    
    // Generate random glitch positions
    const numberOfGlitches = Math.floor(currentMessage.length / 50) + 1;
    const glitchPositions = Array.from({ length: numberOfGlitches }, () => 
      Math.floor(Math.random() * currentMessage.length)
    );
    setRandomGlitches(glitchPositions);

    const typingInterval = setInterval(() => {
      if (i < currentMessage.length) {
        setDisplayedText(currentMessage.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        setIsMessageComplete(true);
        
        // Wait before showing next message
        if (currentMessageIndex < messages.length - 1) {
          setTimeout(() => {
            setCurrentMessageIndex(prev => prev + 1);
            setDisplayedText('');
          }, 2000);
        } else {
          // C'est le dernier message, on appelle onComplete après un délai
          if (onComplete) {
            setTimeout(() => {
              onComplete();
            }, 2000);
          }
        }
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [currentMessageIndex, messages, speed, onComplete]);

  // Scroll to bottom when text updates
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [displayedText]);

  // Check for glitch characters
  const shouldGlitch = (index: number) => {
    return randomGlitches.includes(index);
  };

  // Ajoute une vibration d'effet vidéo
  const [offsetX, setOffsetX] = useState(0);
  
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.85) {
        setOffsetX(Math.random() * 3 - 1.5);
        setTimeout(() => setOffsetX(0), 150);
      }
    }, 2000);
    
    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div 
      className={cn('terminal-window', className)}
      style={{ transform: `translateX(${offsetX}px)` }}
    >
      <div className="terminal-header">
        <div className="flex space-x-2">
          <div className="window-button window-close"></div>
          <div className="window-button window-minimize"></div>
          <div className="window-button window-maximize"></div>
        </div>
        <div className="text-xs text-evrgrn-accent ml-3">VRNCA Terminal</div>
      </div>
      
      <div className="flex items-start gap-4">
        <VrncaAvatar state={avatarState} size="sm" />
        
        <div className="flex-1">
          <div className="text-xs text-evrgrn-accent mb-1">VRNCA@EVRGRN:~$ </div>
          <div className="terminal-text text-sm md:text-base">
            {displayedText.split('').map((char, index) => (
              shouldGlitch(index) ? 
                <span key={index} className="text-evrgrn-red animate-glitch-subtle">{char}</span> : 
                <span key={index}>{char}</span>
            ))}
            {isTyping && <span className="terminal-cursor"></span>}
          </div>
          <div ref={messageEndRef} />
          
          {/* Indicateur pour continuer si le message est complet */}
          {isMessageComplete && currentMessageIndex === messages.length - 1 && (
            <div className="mt-3 text-xs text-evrgrn-accent/70 animate-pulse">
              [Cliquez n'importe où pour continuer]
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VrncaDialog;
