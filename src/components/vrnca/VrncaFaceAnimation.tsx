
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export type VrncaFaceExpression = 'neutral' | 'laugh1' | 'laugh2' | 'sad' | 'surprised' | 'shook1' | 'shook2';

interface VrncaFaceAnimationProps {
  expression?: VrncaFaceExpression;
  autoAnimate?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onAnimationComplete?: () => void;
}

const expressionMap: Record<VrncaFaceExpression, string> = {
  neutral: '/VRNCA-pixel-art/chatbot/VRNCA FACES - Base.jpeg',
  laugh1: '/VRNCA-pixel-art/chatbot/VRNCA FACES - Laugh 1.jpeg',
  laugh2: '/VRNCA-pixel-art/chatbot/VRNCA FACES - Laugh 2.jpeg',
  sad: '/VRNCA-pixel-art/chatbot/VRNCA FACES - Sad.jpeg',
  surprised: '/VRNCA-pixel-art/chatbot/VRNCA FACES - Surprised.jpeg',
  shook1: '/VRNCA-pixel-art/chatbot/VRNCA FACES - Shook 1.jpeg',
  shook2: '/VRNCA-pixel-art/chatbot/VRNCA FACES - Shook 2.jpeg',
};

const VrncaFaceAnimation: React.FC<VrncaFaceAnimationProps> = ({
  expression = 'neutral',
  autoAnimate = false,
  size = 'md',
  className,
  onAnimationComplete
}) => {
  const [currentExpression, setCurrentExpression] = useState<VrncaFaceExpression>(expression);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Handle expression change via props
  useEffect(() => {
    if (!isAnimating) {
      setCurrentExpression(expression);
    }
  }, [expression, isAnimating]);
  
  // Auto animation sequence on component mount
  useEffect(() => {
    if (autoAnimate && !isAnimating) {
      const startAnimation = async () => {
        setIsAnimating(true);
        
        // Define animation sequence
        const sequence: VrncaFaceExpression[] = ['neutral', 'surprised', 'laugh1', 'laugh2', 'neutral'];
        
        // Play through sequence
        for (const expr of sequence) {
          setCurrentExpression(expr);
          // Wait for animation transition
          await new Promise(resolve => setTimeout(resolve, 250));
        }
        
        setIsAnimating(false);
        
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      };
      
      // Add slight delay before starting animation
      const timer = setTimeout(() => {
        startAnimation();
      }, 600);
      
      return () => clearTimeout(timer);
    }
  }, [autoAnimate, onAnimationComplete]);
  
  // Random glitch/blink effect
  useEffect(() => {
    if (!isAnimating) {
      const glitchInterval = setInterval(() => {
        if (Math.random() > 0.85) {
          // Quick blink animation
          const originalExpression = currentExpression;
          setCurrentExpression('shook1');
          
          setTimeout(() => {
            setCurrentExpression(originalExpression);
          }, 150);
        }
      }, 3000);
      
      return () => clearInterval(glitchInterval);
    }
  }, [currentExpression, isAnimating]);
  
  // Size mapping
  const sizeClass = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };
  
  return (
    <div className={cn('relative', sizeClass[size], className)}>
      <img 
        src={expressionMap[currentExpression]} 
        alt={`VRNCA ${currentExpression} expression`}
        className="w-full h-full object-contain transition-opacity duration-200 pixelated"
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  );
};

// Animation sequences for common interactions
export const playTypingAnimation = async (
  setExpression: React.Dispatch<React.SetStateAction<VrncaFaceExpression>>
) => {
  const sequence: VrncaFaceExpression[] = ['surprised', 'shook1', 'laugh1'];
  
  for (const expr of sequence) {
    setExpression(expr);
    // Wait for animation transition
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  // Return to neutral
  setExpression('neutral');
};

export const playThinkingAnimation = async (
  setExpression: React.Dispatch<React.SetStateAction<VrncaFaceExpression>>
) => {
  const sequence: VrncaFaceExpression[] = ['shook1', 'shook2', 'shook1', 'neutral'];
  
  for (const expr of sequence) {
    setExpression(expr);
    // Wait for animation transition
    await new Promise(resolve => setTimeout(resolve, 250));
  }
};

export default VrncaFaceAnimation;
