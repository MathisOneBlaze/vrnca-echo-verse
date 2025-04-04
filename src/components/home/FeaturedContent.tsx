
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import GlitchText from '../ui/GlitchText';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface FeaturedContentProps {
  className?: string;
}

const FeaturedContent: React.FC<FeaturedContentProps> = ({ className }) => {
  return (
    <section className={cn('py-20 bg-evrgrn-dark', className)}>
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif mb-3">
            <span className="block text-muted-foreground text-lg mb-1">Découvrir</span>
            <GlitchText intensity="low" className="text-evrgrn-accent">
              L'UNIVERS EVRGRN
            </GlitchText>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explorez les différentes facettes de l'univers artistique de Mathis OneBlaze
          </p>
        </div>
        
        {/* Featured Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Music Feature */}
          <FeaturedCard 
            title="Dernières Sorties" 
            description="Découvrez les derniers projets musicaux, albums et singles d'EVRGRN"
            image="/placeholder.svg"
            link="/musique"
            gradient="from-blue-900/80 to-purple-900/80"
          />
          
          {/* Events Feature */}
          <FeaturedCard 
            title="Événements" 
            description="Agenda des live twitch, concerts et maasterclass"
            image="/placeholder.svg"
            link="/evenements"
            gradient="from-evrgrn-accent/80 to-emerald-900/80"
          />
          
          {/* Shop Feature */}
          <FeaturedCard 
            title="Shop EVRGRN" 
            description="Vinyles, livres et merchandise exclusifs de l'univers EVRGRN"
            image="/placeholder.svg"
            link="/shop"
            gradient="from-pink-900/80 to-orange-900/80"
          />
        </div>
      </div>
    </section>
  );
};

interface FeaturedCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  gradient?: string;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({ title, description, image, link, gradient = 'from-evrgrn-darker/80 to-evrgrn-darker/90' }) => {
  return (
    <div className="group relative overflow-hidden rounded-lg h-80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}></div>
      
      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-b ${gradient}`}></div>
      
      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <h3 className="text-xl font-medium text-white mb-2">{title}</h3>
        <p className="text-gray-200 text-sm mb-4">{description}</p>
        <Link to={link}>
          <Button variant="outline" className="border-white/20 bg-evrgrn-darker/50 backdrop-blur-sm hover:bg-white/10 text-white text-sm">
            Explorer <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedContent;
