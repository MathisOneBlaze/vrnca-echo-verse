
import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import FeaturedContent from '../components/home/FeaturedContent';
import VrncaIntro from '../components/vrnca/VrncaIntro';
import ParticleBackground from '../components/ui/ParticleBackground';

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [introComplete, setIntroComplete] = useState(false);

  // Handle intro completion
  const handleIntroComplete = () => {
    setIntroComplete(true);
    // Give time for exit animation
    setTimeout(() => {
      setShowIntro(false);
    }, 1000);
  };

  return (
    <div className="bg-evrgrn-dark text-foreground min-h-screen flex flex-col">
      {/* Introduction sequence */}
      {showIntro && <VrncaIntro onComplete={handleIntroComplete} />}

      {/* Main site content (only show after intro completes) */}
      <div className={`w-full min-h-screen flex flex-col ${introComplete ? 'animate-fade-in' : 'opacity-0'}`}>
        <Header />
        
        <main className="flex-grow">
          <Hero />
          <FeaturedContent />
        </main>
        
        <Footer />
      </div>
      
      {/* Interactive particle background */}
      <ParticleBackground />
    </div>
  );
};

export default Index;
