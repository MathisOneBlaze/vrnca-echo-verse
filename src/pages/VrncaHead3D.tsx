
import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import VrncaHead from '../components/vrnca/VrncaHead';
import VrncaModel from '../components/3d/VrncaModel';

const VrncaHead3D = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Track mouse movement for the VrncaHead
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        // Calculate mouse position relative to container
        const x = ((e.clientX - left) / width) * 2 - 1; // -1 to 1
        const y = ((e.clientY - top) / height) * 2 - 1; // -1 to 1
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="bg-evrgrn-dark text-foreground min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-serif mb-8 text-center">VRNCA Head 3D</h1>
          <p className="text-lg mb-12 text-center text-muted-foreground">
            Déplacez votre souris pour voir VRNCA suivre votre curseur.
          </p>
          
          <div 
            ref={containerRef}
            className="flex items-center justify-center h-[70vh] bg-evrgrn-darker/50 rounded-lg relative overflow-hidden"
          >
            {/* Utilisation de l'image directement pour garantir l'affichage */}
            <div className="relative w-64 h-64 md:w-96 md:h-96">
              <VrncaHead 
                size="lg"
                initialRotation={{ 
                  x: mousePosition.y * -20, // Invert Y for natural feel
                  y: mousePosition.x * 20 
                }}
              />
            </div>
            
            {/* Background elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <div className="absolute inset-0 bg-noise opacity-5"></div>
              <div className="absolute inset-0 tv-static opacity-5"></div>
              
              {/* Digital circuit lines */}
              <div className="absolute top-1/4 left-0 w-full h-px bg-evrgrn-accent/10"></div>
              <div className="absolute top-1/2 left-0 w-full h-px bg-evrgrn-accent/15"></div>
              <div className="absolute top-3/4 left-0 w-full h-px bg-evrgrn-accent/10"></div>
              <div className="absolute top-0 left-1/4 h-full w-px bg-evrgrn-accent/10"></div>
              <div className="absolute top-0 left-1/2 h-full w-px bg-evrgrn-accent/15"></div>
              <div className="absolute top-0 left-3/4 h-full w-px bg-evrgrn-accent/10"></div>
            </div>
          </div>
          
          <div className="mt-12 flex flex-col items-center">
            <h3 className="text-xl font-serif mb-4">Modèle 3D VRNCA</h3>
            <div className="h-[400px] w-full md:w-[600px] bg-evrgrn-darker/30 rounded-lg overflow-hidden">
              <VrncaModel />
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Coordonnées du curseur: X: {mousePosition.x.toFixed(2)}, Y: {mousePosition.y.toFixed(2)}
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VrncaHead3D;
