
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import GlitchText from '../ui/GlitchText';

interface FeaturedContentProps {
  className?: string;
}

const FeaturedContent: React.FC<FeaturedContentProps> = ({ className }) => {
  return (
    <section className={cn('py-16 relative overflow-hidden', className)}>
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl font-serif font-bold relative">
            <GlitchText intensity="low">Univers EVRGRN</GlitchText>
          </h2>
          <div className="h-px w-24 bg-evrgrn-blue/60 my-4"></div>
          <p className="text-muted-foreground text-center max-w-xl">
            Explorez les différentes facettes de l'écosystème artistique de Mathis OneBlaze,
            à travers le portail digital VRNCA.
          </p>
        </div>
        
        {/* Featured grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            title="Musique"
            description="Le lab onirique : albums, singles et projets sonores"
            icon="music"
            type="primary"
          />
          <FeatureCard 
            title="Événements" 
            description="Agenda des concerts, battles et performances live"
            icon="calendar"
            type="secondary"
          />
          <FeatureCard 
            title="Publications"
            description="Livres, textes et œuvres littéraires publiées"
            icon="book"
            type="primary"
          />
          <FeatureCard 
            title="Formation"
            description="Cours, ateliers et ressources pédagogiques"
            icon="academic"
            type="secondary"
          />
        </div>
        
        {/* Featured highlights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* New release highlight */}
          <div className="glossy-card rounded-xl overflow-hidden h-full">
            <div className="relative h-full">
              <div className="absolute inset-0 bg-gradient-to-tr from-evrgrn-dark/80 via-transparent to-transparent z-10"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                <div className="text-evrgrn-blue text-sm font-mono mb-1">DERNIÈRE SORTIE</div>
                <h3 className="text-2xl font-serif font-bold mb-2">Titre de l'album</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  Description courte du projet musical avec quelques mots sur le concept
                </p>
                <div className="flex space-x-2">
                  <button className="btn-primary py-1.5 text-sm">Écouter</button>
                  <button className="btn-secondary py-1.5 text-sm">Plus d'infos</button>
                </div>
              </div>
              <div className="w-full h-full bg-evrgrn-muted/50">
                {/* This is a placeholder for album artwork */}
                <div className="h-full w-full bg-gradient-to-br from-evrgrn-blue/10 to-evrgrn-gold/5"></div>
              </div>
            </div>
          </div>
          
          {/* Upcoming event highlight */}
          <div className="glossy-card rounded-xl overflow-hidden h-full">
            <div className="relative h-full">
              <div className="absolute inset-0 bg-gradient-to-tr from-evrgrn-dark/80 via-transparent to-transparent z-10"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                <div className="text-evrgrn-gold text-sm font-mono mb-1">PROCHAIN ÉVÉNEMENT</div>
                <h3 className="text-2xl font-serif font-bold mb-2">Nom de l'événement</h3>
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 rounded-full bg-evrgrn-gold mr-2 animate-pulse"></div>
                  <p className="text-evrgrn-gold text-sm">
                    25 Novembre 2023 • Paris, France
                  </p>
                </div>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  Détail court de l'événement à venir avec informations essentielles.
                </p>
                <div className="flex space-x-2">
                  <button className="btn-secondary py-1.5 text-sm">Réserver</button>
                  <button className="bg-transparent border border-white/20 text-white px-4 py-1.5 rounded text-sm hover:bg-white/5 transition-colors">
                    Ajouter au calendrier
                  </button>
                </div>
              </div>
              <div className="w-full h-full bg-evrgrn-muted/50">
                {/* This is a placeholder for event artwork */}
                <div className="h-full w-full bg-gradient-to-br from-evrgrn-gold/10 to-evrgrn-blue/5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  type: 'primary' | 'secondary';
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, type }) => {
  return (
    <Card className="glossy-card border-white/5 card-hover overflow-hidden">
      <CardContent className="p-6">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
          type === 'primary' ? 'bg-evrgrn-blue/20' : 'bg-evrgrn-gold/20'
        }`}>
          <div className={`${
            type === 'primary' ? 'text-evrgrn-blue' : 'text-evrgrn-gold'
          }`}>
            {/* Icon placeholders */}
            {icon === 'music' && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18V5l12-2v13"></path>
                <circle cx="6" cy="18" r="3"></circle>
                <circle cx="18" cy="16" r="3"></circle>
              </svg>
            )}
            {icon === 'calendar' && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            )}
            {icon === 'book' && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
            )}
            {icon === 'academic' && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
            )}
          </div>
        </div>
        
        <h3 className={`text-xl font-medium mb-2 ${
          type === 'primary' ? 'text-evrgrn-blue' : 'text-evrgrn-gold'
        }`}>
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
        
        <button className={`text-sm flex items-center ${
          type === 'primary' ? 'text-evrgrn-blue hover:text-evrgrn-blue-light' : 'text-evrgrn-gold hover:text-evrgrn-gold-light'
        } transition-colors`}>
          <span className="mr-2">Explorer</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </CardContent>
    </Card>
  );
};

export default FeaturedContent;
