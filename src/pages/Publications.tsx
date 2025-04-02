
import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const Publications = () => {
  return (
    <div className="bg-evrgrn-dark text-foreground min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-serif mb-8">Publications</h1>
          <p className="text-lg mb-6">
            Livres, articles et vidéos YouTube d'enseignement et d'analyses.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {/* Contenu publications à venir */}
            <div className="bg-evrgrn-muted p-6 rounded-lg border border-evrgrn-accent/20">
              <h3 className="text-xl mb-2">En construction</h3>
              <p className="text-muted-foreground">Les publications seront bientôt disponibles.</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Publications;
