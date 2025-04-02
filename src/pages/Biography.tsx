
import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const Biography = () => {
  return (
    <div className="bg-evrgrn-dark text-foreground min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-serif mb-8">Biographie</h1>
          <p className="text-lg mb-6">
            Découvrez le parcours et l'histoire de Mathis OneBlaze, créateur d'EVRGRN.
          </p>
          
          <div className="mt-12 bg-evrgrn-muted p-6 rounded-lg border border-evrgrn-accent/20">
            <h3 className="text-xl mb-2">En construction</h3>
            <p className="text-muted-foreground">La biographie complète sera bientôt disponible.</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Biography;
