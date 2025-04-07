
import React, { useState, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import GlitchText from '../ui/GlitchText';
import MiniVrncaModel from '../3d/MiniVrncaModel';
import VrncaVoiceChat from '../vrnca/VrncaVoiceChat';

interface FooterProps {
  className?: string;
}

const Footer = forwardRef<HTMLDivElement, FooterProps>(({ className }, ref) => {
  const [showVoiceChat, setShowVoiceChat] = useState(false);

  return (
    <footer ref={ref} className={cn('bg-evrgrn-darker border-t border-evrgrn-accent/10 py-12', className)}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/01e9bec9-0cde-4e57-a7c9-aa81659ce1c0.png"
                alt="EVRGRN Logo" 
                className="h-10 mr-2"
              />
              <GlitchText intensity="low" className="text-xl font-bold text-evrgrn-accent">
                EVRGRN
              </GlitchText>
            </div>
            <p className="text-muted-foreground mb-4 text-sm">
              Le hub digital de Mathis OneBlaze, artiste multidisciplinaire, producteur, enseignant et créateur de contenu.
            </p>
            <div className="flex space-x-4 mb-4">
              {/* Social icons avec vos vraies informations */}
              <SocialLink href="https://www.twitch.tv/mathisoneblaze" type="twitch" />
              <SocialLink href="https://www.youtube.com/@MathisOneBlaze" type="youtube" />
              <SocialLink href="https://www.instagram.com/mathisoneblaze" type="instagram" />
              <SocialLink href="https://twitter.com/mathisoneblaze" type="twitter" />
              <SocialLink href="https://www.tiktok.com/@mathisoneblaze" type="tiktok" />
            </div>
            {/* Liens d'authentification */}
            <div className="pt-4 border-t border-evrgrn-accent/10">
              <ul className="space-y-2 text-sm">
                <FooterLink to="/login" label="Se connecter" />
                <FooterLink to="/register" label="S'inscrire" />
              </ul>
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-evrgrn-accent font-medium mb-4 text-sm uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <FooterLink to="/" label="Accueil" />
              <FooterLink to="/biographie" label="Artiste" />
              <FooterLink to="/musique" label="Musique" />
              <FooterLink to="/publications" label="Médias" />
              <FooterLink to="/services" label="Services" />
              <FooterLink to="/shop" label="Shop" />
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-evrgrn-accent font-medium mb-4 text-sm uppercase tracking-wider">Ressources</h3>
            <ul className="space-y-2 text-sm">
              <FooterLink to="/publications" label="Publications" />
              <FooterLink to="/publications?tab=livres" label="Livres & Articles" />
              <FooterLink to="/services" label="Services Studio" />
              <FooterLink to="/services#design" label="Design & Direction Artistique" />
              <FooterLink to="/contact" label="Presse & Médias" />
            </ul>
          </div>
          
          {/* Contact & VRNCA */}
          <div>
            <h3 className="text-evrgrn-accent font-medium mb-4 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-2 text-sm">
              <FooterLink to="/contact" label="Formulaire de contact" />
              <FooterLink to="/contact" label="Contact pros" />
              <FooterLink to="/mentions-legales" label="Mentions légales" />
              <FooterLink to="/confidentialite" label="Confidentialité" />
            </ul>
            <div className="mt-4 pt-4 border-t border-evrgrn-accent/10 flex items-center">
              {/* Modèle 3D miniature qui tourne en remplacement de l'image statique */}
              <div className="mr-3">
                <MiniVrncaModel />
              </div>
              <button 
                className="text-sm text-evrgrn-accent hover:text-evrgrn-accent/80 transition-colors"
                onClick={() => setShowVoiceChat(!showVoiceChat)}
              >
                {showVoiceChat ? 'Désactiver VRNCA Guide' : 'Activer VRNCA Guide'}
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-evrgrn-accent/10 mt-8 pt-8 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} EVRGRN. Tous droits réservés.</p>
          <p className="mt-2">
            VRNCA Version 1.0.0 | L'extension consciente de celui qui est banni
          </p>
        </div>
      </div>
      
      {/* Voice chat component */}
      {showVoiceChat && <VrncaVoiceChat onClose={() => setShowVoiceChat(false)} />}
    </footer>
  );
});

Footer.displayName = "Footer";

interface FooterLinkProps {
  to: string;
  label: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ to, label }) => {
  return (
    <li>
      <Link 
        to={to} 
        className="text-muted-foreground hover:text-evrgrn-accent transition-colors duration-200"
      >
        {label}
      </Link>
    </li>
  );
};

interface SocialLinkProps {
  href: string;
  type: 'twitch' | 'youtube' | 'instagram' | 'twitter' | 'discord' | 'tiktok';
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, type }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-8 h-8 rounded-full flex items-center justify-center bg-evrgrn-muted hover:bg-evrgrn-accent/20 transition-colors duration-200"
    >
      <span className="sr-only">{type}</span>
      <div className="h-4 w-4 text-evrgrn-accent">
        {/* Icons for social media platforms */}
        {type === 'twitch' && (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"></path>
          </svg>
        )}
        {type === 'youtube' && (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
          </svg>
        )}
        {type === 'instagram' && (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        )}
        {type === 'twitter' && (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
          </svg>
        )}
        {type === 'discord' && (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 9a5 5 0 0 0-5-5H6a5 5 0 0 0-5 5v6a5 5 0 0 0 5 5h2l1 3l3-3h1a5 5 0 0 0 5-5V9z"></path>
            <path d="M9.09 9.45a.5.5 0 0 0 0 1 .5.5 0 0 0 0-1z"></path>
            <path d="M14.91 9.45a.5.5 0 0 0 0 1 .5.5 0 0 0 0-1z"></path>
          </svg>
        )}
        {type === 'tiktok' && (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
            <path d="M15 8c0 4.56-1.41 8.79-3.5 11.82"></path>
            <path d="M9 2h6v12h4"></path>
          </svg>
        )}
      </div>
    </a>
  );
};

export default Footer;
