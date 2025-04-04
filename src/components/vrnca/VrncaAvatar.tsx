
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface VrncaAvatarProps {
  state?: 'idle' | 'active' | 'scanning' | 'alert';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  pulseEffect?: boolean;
}

const VrncaAvatar: React.FC<VrncaAvatarProps> = ({
  state = 'idle',
  size = 'md',
  className,
  pulseEffect = true,
}) => {
  const [isGlitching, setIsGlitching] = useState(false);

  // Random glitch effect
  useEffect(() => {
    if (state === 'idle' || state === 'active') {
      const glitchInterval = setInterval(() => {
        const shouldGlitch = Math.random() > 0.7;
        if (shouldGlitch) {
          setIsGlitching(true);
          setTimeout(() => setIsGlitching(false), 200);
        }
      }, state === 'active' ? 3000 : 5000);
      
      return () => clearInterval(glitchInterval);
    }
    
    // For alert state, more frequent glitches
    if (state === 'alert') {
      const glitchInterval = setInterval(() => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 300);
      }, 1500);
      
      return () => clearInterval(glitchInterval);
    }
  }, [state]);

  // Size mapping
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
  };

  // State colors
  const stateColors = {
    idle: 'from-evrgrn-accent/40 to-evrgrn-accent/20',
    active: 'from-evrgrn-accent to-evrgrn-accent/60',
    scanning: 'from-evrgrn-green to-evrgrn-green/60',
    alert: 'from-evrgrn-red to-evrgrn-red/60',
  };

  // Pulse animation based on state
  const pulseAnimationClass = pulseEffect ? 
    state === 'active' ? 'animate-pulse' : 
    state === 'alert' ? 'animate-pulse-fast' : 
    'animate-pulse-soft' : '';

  return (
    <div className={cn('relative', className)}>
      {/* Core avatar */}
      <div 
        className={cn(
          'rounded-full bg-gradient-radial z-10 flex items-center justify-center overflow-hidden border',
          sizeClasses[size],
          stateColors[state],
          pulseAnimationClass,
          isGlitching ? 'animate-glitch-subtle' : '',
          state === 'idle' ? 'border-evrgrn-accent/30' : 'border-evrgrn-accent/60'
        )}
      >
        {/* Avatar face/symbol */}
        <div className="text-white">
          {state === 'scanning' ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-3/4 h-[2px] bg-evrgrn-green/70 animate-scan"></div>
            </div>
          ) : (
            <div className="font-mono text-xs md:text-sm tracking-wider">
              VRNCA
            </div>
          )}
        </div>
      </div>
      
      {/* Outer ring/effect */}
      <div 
        className={cn(
          'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full -z-10',
          pulseAnimationClass,
          isGlitching ? 'animate-glitch-subtle' : ''
        )}
        style={{
          width: `calc(${size === 'sm' ? '2.5rem' : size === 'md' ? '4rem' : size === 'lg' ? '6rem' : '8rem'} + 8px)`,
          height: `calc(${size === 'sm' ? '2.5rem' : size === 'md' ? '4rem' : size === 'lg' ? '6rem' : '8rem'} + 8px)`,
          background: `radial-gradient(circle, 
            ${state === 'alert' ? 'rgba(255,58,75,0.2)' : 
              state === 'scanning' ? 'rgba(0,200,150,0.2)' : 
              'rgba(0,245,212,0.2)'} 0%, 
            transparent 70%)`,
        }}
      ></div>
      
      {/* Scanning effect for scanning state */}
      {state === 'scanning' && (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-full">
          <div className="scan-line"></div>
        </div>
      )}
    </div>
  );
};

export default VrncaAvatar;
