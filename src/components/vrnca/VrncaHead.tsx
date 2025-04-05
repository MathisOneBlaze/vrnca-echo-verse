
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface VrncaHeadProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  initialRotation?: { x: number, y: number };
  fixed?: boolean;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'custom';
}

const VrncaHead: React.FC<VrncaHeadProps> = ({
  className,
  size = 'md',
  initialRotation = { x: 0, y: 0 },
  fixed = false,
  position = 'custom'
}) => {
  const [rotation, setRotation] = useState(initialRotation);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      // Get the viewport dimensions
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Calculate how far the mouse is from the center of the viewport (as a percentage)
      const mouseXPercent = (e.clientX / viewportWidth) * 2 - 1; // -1 to 1
      const mouseYPercent = (e.clientY / viewportHeight) * 2 - 1; // -1 to 1
      
      // Limit rotation to ±20 degrees
      const maxRotation = 20;
      setRotation({
        x: -mouseYPercent * maxRotation, // Inverted for natural feel
        y: mouseXPercent * maxRotation
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
  };

  const positionClasses = {
    'bottom-right': 'fixed bottom-8 right-8',
    'bottom-left': 'fixed bottom-8 left-8',
    'top-right': 'fixed top-8 right-8',
    'top-left': 'fixed top-8 left-8',
    'custom': '',
  };

  // Use the placeholder image since we don't have the actual asset
  const placeholderImage = "/lovable-uploads/01e9bec9-0cde-4e57-a7c9-aa81659ce1c0.png";

  return (
    <div 
      ref={containerRef}
      className={cn(
        'relative cursor-pointer transition-transform duration-100',
        sizeClasses[size],
        fixed ? positionClasses[position] : '',
        className
      )}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        zIndex: fixed ? 50 : 'auto',
      }}
    >
      <img 
        src={placeholderImage} 
        alt="VRNCA" 
        className="w-full h-full object-contain"
        style={{ 
          transition: 'transform 0.1s ease-out',
          transform: `translateZ(10px)`
        }}
      />
    </div>
  );
};

export default VrncaHead;
