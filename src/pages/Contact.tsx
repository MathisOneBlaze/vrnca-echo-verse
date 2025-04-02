
import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const Contact = () => {
  return (
    <div className="bg-evrgrn-dark text-foreground min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-serif mb-8">Contact</h1>
          <p className="text-lg mb-6">
            Vous souhaitez nous contacter ? Remplissez le formulaire ci-dessous.
          </p>
          
          <div className="mt-12 max-w-xl mx-auto">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Nom</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full bg-evrgrn-muted border border-evrgrn-accent/30 rounded-md p-3 focus:ring-2 focus:ring-evrgrn-accent focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-evrgrn-muted border border-evrgrn-accent/30 rounded-md p-3 focus:ring-2 focus:ring-evrgrn-accent focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={5}
                  className="w-full bg-evrgrn-muted border border-evrgrn-accent/30 rounded-md p-3 focus:ring-2 focus:ring-evrgrn-accent focus:border-transparent"
                ></textarea>
              </div>
              
              <div>
                <button 
                  type="submit" 
                  className="btn-primary w-full flex justify-center"
                >
                  Envoyer
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
