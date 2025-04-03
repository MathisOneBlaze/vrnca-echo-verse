
import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import FeaturedContent from '../components/home/FeaturedContent';
import VrncaIntro from '../components/vrnca/VrncaIntro';
import ParticleBackground from '../components/ui/ParticleBackground';
import { Button } from '@/components/ui/button';

const Index = () => {
  // Check if intro has been seen before
  const [showIntro, setShowIntro] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [skipButtonVisible, setSkipButtonVisible] = useState(false);

  useEffect(() => {
    // Check localStorage to see if intro has been shown
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');
    
    if (!hasSeenIntro) {
      setShowIntro(true);
      // Show skip button after a short delay
      setTimeout(() => {
        setSkipButtonVisible(true);
      }, 2000);
    } else {
      // If user has seen intro, go straight to main content
      setIntroComplete(true);
    }
  }, []);

  // Handle intro completion
  const handleIntroComplete = () => {
    // Save that user has seen intro
    localStorage.setItem('hasSeenIntro', 'true');
    
    setIntroComplete(true);
    // Give time for exit animation
    setTimeout(() => {
      setShowIntro(false);
    }, 1000);
  };

  // Handle skip intro
  const handleSkipIntro = () => {
    // Save that user has seen intro
    localStorage.setItem('hasSeenIntro', 'true');
    
    setIntroComplete(true);
    setShowIntro(false);
  };

  // Reset intro (for testing purposes)
  const resetIntro = () => {
    localStorage.removeItem('hasSeenIntro');
    window.location.reload();
  };

  return (
    <div className="bg-evrgrn-dark text-foreground min-h-screen flex flex-col">
      {/* Introduction sequence */}
      {showIntro && (
        <>
          <VrncaIntro onComplete={handleIntroComplete} />
          {skipButtonVisible && (
            <div className="fixed bottom-8 right-8 z-50 animate-fade-in">
              <Button 
                onClick={handleSkipIntro}
                variant="outline"
                className="bg-evrgrn-darker/80 border border-evrgrn-accent text-evrgrn-accent hover:bg-evrgrn-accent hover:text-black"
              >
                Passer l'intro
              </Button>
            </div>
          )}
        </>
      )}

      {/* Main site content */}
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
      
      {/* Debug button to reset intro (only visible in development) */}
      {process.env.NODE_ENV === 'development' && (
        <button
          onClick={resetIntro}
          className="fixed bottom-4 left-4 bg-red-500 text-white px-2 py-1 text-xs rounded opacity-50 hover:opacity-100 z-50"
        >
          Reset Intro
        </button>
      )}
    </div>
  );
};

export default Index;
