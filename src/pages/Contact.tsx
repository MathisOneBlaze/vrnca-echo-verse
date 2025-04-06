
import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    newsletter: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      toast.success('Message envoyé avec succès!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        newsletter: false
      });
      setIsSubmitting(false);
    }, 1500);
  };
  
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
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Nom</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-evrgrn-muted border border-evrgrn-accent/30 rounded-md p-3 focus:ring-2 focus:ring-evrgrn-accent focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-evrgrn-muted border border-evrgrn-accent/30 rounded-md p-3 focus:ring-2 focus:ring-evrgrn-accent focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">Téléphone <span className="text-xs text-muted-foreground">(facultatif)</span></label>
                <input 
                  type="tel" 
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-evrgrn-muted border border-evrgrn-accent/30 rounded-md p-3 focus:ring-2 focus:ring-evrgrn-accent focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full bg-evrgrn-muted border border-evrgrn-accent/30 rounded-md p-3 focus:ring-2 focus:ring-evrgrn-accent focus:border-transparent"
                  required
                ></textarea>
              </div>
              
              <div className="flex items-start">
                <input 
                  id="newsletter"
                  name="newsletter"
                  type="checkbox"
                  checked={formData.newsletter}
                  onChange={handleCheckboxChange}
                  className="h-5 w-5 rounded border-evrgrn-accent/30 bg-evrgrn-muted text-evrgrn-accent mt-0.5 mr-2"
                />
                <label htmlFor="newsletter" className="text-sm">
                  S'abonner à la newsletter pour recevoir les dernières actualités EVRGRN
                </label>
              </div>
              
              <div>
                <Button 
                  type="submit" 
                  className="btn-primary w-full flex justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                </Button>
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
