import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink } from 'lucide-react';
import { Headphones, BookOpen, BarChart3, Mic2, Users, Music } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Services = () => {
  const [activeTab, setActiveTab] = useState('all');

  React.useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && ['consulting', 'formation', 'strategie', 'studio', 'faq'].includes(hash)) {
      setActiveTab(hash);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  const services = [
    {
      id: "consulting",
      title: "Consulting Production Musicale",
      icon: <Headphones className="w-10 h-10 text-evrgrn-accent" />,
      description: "Bénéficiez de nos conseils experts pour améliorer vos productions musicales. Notre équipe vous guide dans le choix des techniques de production, l'optimisation de vos arrangements et la finalisation de vos projets audio.",
      cta: "Obtenir un devis",
      to: "/contact?service=consulting"
    },
    {
      id: "formation",
      title: "Formation Théorie Musicale",
      icon: <BookOpen className="w-10 h-10 text-evrgrn-accent" />,
      description: "Apprenez les fondamentaux de la théorie musicale adaptés à vos projets créatifs. Nos formations sur mesure vous permettent de développer vos compétences en composition, harmonie et arrangements.",
      cta: "Demander plus d'infos",
      to: "/contact?service=formation"
    },
    {
      id: "strategie",
      title: "Stratégie Carrière Artistique",
      icon: <BarChart3 className="w-10 h-10 text-evrgrn-accent" />,
      description: "Développez votre carrière d'artiste avec notre accompagnement stratégique. Nous vous aidons à définir votre identité artistique, à élaborer votre plan de communication et à maximiser votre impact dans l'industrie musicale.",
      cta: "Planifier un entretien",
      to: "/contact?service=strategie"
    },
    {
      id: "studio",
      title: "Session Studio",
      icon: <Mic2 className="w-10 h-10 text-evrgrn-accent" />,
      description: "Enregistrez vos projets musicaux dans des conditions professionnelles. Notre studio vous offre un équipement de qualité et l'expertise technique nécessaire pour donner vie à vos créations sonores.",
      cta: "Réserver une session",
      to: "/contact?service=studio"
    }
  ];

  return (
    <div className="bg-evrgrn-dark text-foreground min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/4">
              <div className="bg-evrgrn-darker rounded-lg p-4 shadow-md sticky top-24">
                <h3 className="text-lg font-medium mb-4 text-evrgrn-accent">Services</h3>
                <ul className="space-y-2">
                  <li>
                    <a 
                      href="#consulting" 
                      className={`block py-2 px-3 rounded ${activeTab === 'consulting' ? 'bg-evrgrn-accent/20 text-evrgrn-accent' : 'hover:bg-evrgrn-accent/10'}`}
                      onClick={() => setActiveTab('consulting')}
                    >
                      Consulting Production
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#formation" 
                      className={`block py-2 px-3 rounded ${activeTab === 'formation' ? 'bg-evrgrn-accent/20 text-evrgrn-accent' : 'hover:bg-evrgrn-accent/10'}`}
                      onClick={() => setActiveTab('formation')}
                    >
                      Formation Théorie
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#strategie" 
                      className={`block py-2 px-3 rounded ${activeTab === 'strategie' ? 'bg-evrgrn-accent/20 text-evrgrn-accent' : 'hover:bg-evrgrn-accent/10'}`}
                      onClick={() => setActiveTab('strategie')}
                    >
                      Stratégie Carrière
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#studio" 
                      className={`block py-2 px-3 rounded ${activeTab === 'studio' ? 'bg-evrgrn-accent/20 text-evrgrn-accent' : 'hover:bg-evrgrn-accent/10'}`}
                      onClick={() => setActiveTab('studio')}
                    >
                      Session Studio
                    </a>
                  </li>
                  <li>
                    <a 
                      href="/ateliers" 
                      className={`block py-2 px-3 rounded hover:bg-evrgrn-accent/10`}
                    >
                      Ateliers
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#faq" 
                      className={`block py-2 px-3 rounded ${activeTab === 'faq' ? 'bg-evrgrn-accent/20 text-evrgrn-accent' : 'hover:bg-evrgrn-accent/10'}`}
                      onClick={() => setActiveTab('faq')}
                    >
                      FAQ
                    </a>
                  </li>
                  <li className="mt-4 pt-4 border-t border-evrgrn-accent/10">
                    <a 
                      href="/utils/apiIntegrationGuide.md" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center py-2 px-3 rounded text-evrgrn-accent hover:bg-evrgrn-accent/10"
                    >
                      Guide d'intégration API
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </li>
                </ul>

                <h3 className="text-lg font-medium mt-8 mb-4 text-evrgrn-accent">Ressources</h3>
                <ul className="space-y-2">
                  <li>
                    <Button asChild variant="outline" size="sm" className="w-full justify-start">
                      <a href="/atelier/Atelier Création & Production 2022.pdf" download>
                        <Download className="mr-2 h-4 w-4" />
                        Guide de Production
                      </a>
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="md:w-3/4">
              <h1 className="text-4xl font-serif mb-2">Services EVRGRN</h1>
              <p className="text-lg text-muted-foreground mb-8">Solutions professionnelles pour artistes et créateurs</p>
              
              <div className="flex justify-between items-center mb-12">
                <div>
                  <h1 className="text-4xl font-serif mb-2">Services</h1>
                  <p className="text-lg text-muted-foreground">
                    Expertise musicale et accompagnement artistique
                  </p>
                </div>
                <img 
                  src="/lovable-uploads/01e9bec9-0cde-4e57-a7c9-aa81659ce1c0.png" 
                  alt="EVRGRN Logo"
                  className="h-16"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {services.map((service, index) => (
                  <Card key={index} id={service.id} className="bg-evrgrn-muted border-evrgrn-accent/10 hover:border-evrgrn-accent/30 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="mb-4">
                        {service.icon}
                      </div>
                      <h2 className="text-xl font-medium mb-3">{service.title}</h2>
                      <p className="text-muted-foreground mb-6">{service.description}</p>
                      <Button asChild className="w-full bg-evrgrn-accent text-black hover:bg-evrgrn-accent/80">
                        <Link to={service.to}>{service.cta}</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="bg-evrgrn-muted border border-evrgrn-accent/10 rounded-lg p-8 mb-12">
                <h2 className="text-2xl font-serif mb-4">Services sur mesure</h2>
                <p className="text-muted-foreground mb-6">
                  Vous avez un projet spécifique qui nécessite une approche personnalisée ? 
                  Contactez-nous pour discuter de vos besoins et nous vous proposerons une solution adaptée.
                </p>
                <Button asChild className="bg-evrgrn-darker hover:bg-evrgrn-accent hover:text-black transition-colors">
                  <Link to="/contact?service=custom">Nous contacter</Link>
                </Button>
              </div>
              
              <div className="bg-evrgrn-muted border border-evrgrn-accent/10 rounded-lg p-8 mb-12">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-2/3">
                    <h2 className="text-2xl font-serif mb-4">Ateliers Création & Production Musicale</h2>
                    <p className="text-muted-foreground mb-4">
                      EVRGRN propose des ateliers collectifs de création et production musicale adaptés 
                      à tous les publics. Idéals pour les centres sociaux, établissements scolaires, 
                      structures culturelles et associations, ces ateliers permettent aux participants 
                      de découvrir l'univers de la musique et de développer leurs compétences artistiques.
                    </p>
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-evrgrn-accent mr-2" />
                        <span className="text-sm">Tous niveaux</span>
                      </div>
                      <div className="flex items-center">
                        <Music className="w-5 h-5 text-evrgrn-accent mr-2" />
                        <span className="text-sm">Hip-Hop/Rap, R&B, Pop, Afro, Dancehall</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-evrgrn-accent mr-2" />
                        <span className="text-sm">De 7 à 77 ans</span>
                      </div>
                    </div>
                    <Button asChild className="bg-evrgrn-accent text-black hover:bg-evrgrn-accent/80">
                      <Link to="/ateliers">Plus d'informations</Link>
                    </Button>
                  </div>
                  <div className="md:w-1/3">
                    <div className="bg-evrgrn-darker rounded-lg overflow-hidden h-full">
                      <img 
                        src="/P1320893_optimized.jpg" 
                        alt="Atelier de production musicale" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div id="faq" className="bg-evrgrn-muted border border-evrgrn-accent/10 rounded-lg p-8">
                <h2 className="text-2xl font-serif mb-4">Foire aux questions</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Comment se déroule une session de consulting ?</h3>
                    <p className="text-muted-foreground">
                      Les sessions de consulting débutent par un entretien initial pour comprendre vos besoins, 
                      suivi d'une analyse approfondie de vos projets. Nous vous fournissons ensuite des 
                      recommandations détaillées et un suivi personnalisé.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Les formations sont-elles accessibles aux débutants ?</h3>
                    <p className="text-muted-foreground">
                      Absolument ! Nos formations sont adaptées à tous les niveaux, du débutant au professionnel. 
                      Le contenu est personnalisé en fonction de vos connaissances préalables et de vos objectifs.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Quel est le délai pour obtenir un accompagnement ?</h3>
                    <p className="text-muted-foreground">
                      En fonction de nos disponibilités, nous pouvons généralement vous proposer un premier 
                      rendez-vous dans un délai de 1 à 2 semaines après votre demande initiale.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Comment organiser un atelier dans ma structure ?</h3>
                    <p className="text-muted-foreground">
                      Pour organiser un atelier, contactez-nous via notre formulaire en spécifiant vos besoins, 
                      le public concerné et les dates souhaitées. Nous vous proposerons un programme 
                      adapté et un devis personnalisé. Les ateliers 
                      sont modulables en durée et en contenu.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
