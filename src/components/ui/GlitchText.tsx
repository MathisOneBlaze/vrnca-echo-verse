
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface GlitchTextProps {
  text?: string;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  variant?: 'primary' | 'accent';
  children?: React.ReactNode;
}

const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  className,
  intensity = 'medium',
  variant = 'primary',
  children
}) => {
  const [isGlitching, setIsGlitching] = useState(false);
  
  // Randomly trigger glitch effect
  useEffect(() => {
    const triggerRandomGlitch = () => {
      // Calculate interval based on intensity
      const intervalBase = intensity === 'high' ? 2000 : intensity === 'medium' ? 4000 : 8000;
      const randomInterval = Math.random() * intervalBase + 1000;
      
      setTimeout(() => {
        setIsGlitching(true);
        // Glitch duration based on intensity
        const glitchDuration = intensity === 'high' ? 800 : intensity === 'medium' ? 500 : 300;
        
        setTimeout(() => {
          setIsGlitching(false);
          triggerRandomGlitch();
        }, glitchDuration);
      }, randomInterval);
    };
    
    triggerRandomGlitch();
    
    return () => {
      setIsGlitching(false);
    };
  }, [intensity]);

  const variantClasses = {
    primary: 'text-evrgrn-blue',
    accent: 'text-evrgrn-gold',
  };
  
  // Get the content to display and use for data-text attribute
  const content = children || text;
  
  if (!content) {
    console.warn('GlitchText needs either text prop or children');
    return null;
  }
  
  return (
    <span 
      className={cn(
        isGlitching ? 'text-glitch' : '',
        variantClasses[variant],
        className
      )}
      data-text={content}
    >
      {content}
    </span>
  );
};

export default GlitchText;
