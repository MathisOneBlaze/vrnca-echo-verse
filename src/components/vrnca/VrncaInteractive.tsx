
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import VrncaAvatar from './VrncaAvatar';

interface VrncaInteractiveProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const VrncaInteractive: React.FC<VrncaInteractiveProps> = ({
  size = 'md',
  className
}) => {
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !isHovered) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate the center of the element
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate how far the mouse is from the center (as a percentage)
      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;
      
      // Limit rotation to ±15 degrees
      const maxRotation = 15;
      setRotationX(-deltaY * maxRotation);
      setRotationY(deltaX * maxRotation);
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered]);

  const handleClick = () => {
    setIsActive(true);
    setTimeout(() => {
      setIsActive(false);
    }, 3000);
  };

  return (
    <div 
      className={cn(
        'relative inline-block cursor-pointer transition-transform duration-300',
        className
      )}
      ref={containerRef}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setRotationX(0);
        setRotationY(0);
      }}
      style={{
        transform: `perspective(500px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out'
      }}
    >
      <VrncaAvatar 
        state={isActive ? 'active' : 'idle'} 
        size={size} 
        pulseEffect={true}
      />
      
      {isActive && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 bg-evrgrn-darker p-2 rounded-md text-xs text-evrgrn-accent whitespace-nowrap animate-fade-in">
          VRNCA est actif
        </div>
      )}
    </div>
  );
};

export default VrncaInteractive;
