
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
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [randomGlitches, setRandomGlitches] = useState<number[]>([]);

  // Type out current message
  useEffect(() => {
    if (currentMessageIndex >= messages.length) {
      onComplete?.();
      return;
    }
    
    const currentMessage = messages[currentMessageIndex];
    let i = 0;
    setIsTyping(true);
    
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
        
        // Wait before showing next message
        if (currentMessageIndex < messages.length - 1) {
          setTimeout(() => {
            setCurrentMessageIndex(prev => prev + 1);
            setDisplayedText('');
          }, 2000);
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

  return (
    <div className={cn('bg-evrgrn-darker/80 backdrop-blur-sm border border-evrgrn-blue/30 rounded-lg p-4', className)}>
      <div className="flex items-start gap-4">
        <VrncaAvatar state={avatarState} size="sm" />
        
        <div className="flex-1">
          <div className="text-xs text-evrgrn-blue mb-1">VRNCA</div>
          <div className="terminal-text text-sm md:text-base">
            {displayedText.split('').map((char, index) => (
              shouldGlitch(index) ? 
                <span key={index} className="text-evrgrn-red animate-glitch-subtle">{char}</span> : 
                <span key={index}>{char}</span>
            ))}
            {isTyping && <span className="terminal-cursor"></span>}
          </div>
          <div ref={messageEndRef} />
        </div>
      </div>
    </div>
  );
};

export default VrncaDialog;
