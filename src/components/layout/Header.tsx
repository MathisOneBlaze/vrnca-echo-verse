
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import GlitchText from '../ui/GlitchText';
import VrncaAvatar from '../vrnca/VrncaAvatar';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 w-full z-40 transition-all duration-300',
        isScrolled ? 'bg-evrgrn-darker/90 backdrop-blur-md shadow-md' : 'bg-transparent',
        className
      )}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <GlitchText intensity="low" className="text-xl font-bold">
            EVRGRN
          </GlitchText>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" label="Accueil" />
          <NavLink to="/musique" label="Musique" />
          <NavLink to="/evenements" label="Événements" />
          <NavLink to="/shop" label="Shop" />
          <NavLink to="/contact" label="Contact" />
        </nav>

        {/* VRNCA Interactive Element */}
        <div className="hidden md:flex items-center">
          <button 
            className="vrnca-button text-sm px-4 py-1.5"
            onClick={() => console.log('VRNCA interaction')}
          >
            <span className="mr-2">Communiquer</span>
            <VrncaAvatar size="sm" className="inline-block" />
          </button>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden flex items-center" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="sr-only">Menu</span>
          <div className="w-6 h-5 flex flex-col justify-between">
            <span 
              className={`w-full h-0.5 bg-evrgrn-blue block transition-transform ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            ></span>
            <span 
              className={`w-full h-0.5 bg-evrgrn-blue block transition-opacity ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            ></span>
            <span 
              className={`w-full h-0.5 bg-evrgrn-blue block transition-transform ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            ></span>
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden absolute w-full bg-evrgrn-darker/95 backdrop-blur-md transition-all duration-300 border-t border-evrgrn-blue/20 overflow-hidden ${
          isMenuOpen ? 'max-h-96 border-opacity-100' : 'max-h-0 border-opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col space-y-4">
            <MobileNavLink to="/" label="Accueil" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink to="/musique" label="Musique" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink to="/evenements" label="Événements" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink to="/shop" label="Shop" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink to="/contact" label="Contact" onClick={() => setIsMenuOpen(false)} />
            
            <div className="pt-4 border-t border-evrgrn-blue/20">
              <button 
                className="flex items-center text-evrgrn-blue font-medium"
                onClick={() => {
                  console.log('Mobile VRNCA interaction');
                  setIsMenuOpen(false);
                }}
              >
                <VrncaAvatar size="sm" className="mr-2" />
                <span>Communiquer avec VRNCA</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label }) => {
  return (
    <Link 
      to={to} 
      className="text-foreground hover:text-evrgrn-blue transition-colors duration-200 relative group text-sm"
    >
      {label}
      <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-evrgrn-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
    </Link>
  );
};

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, label, onClick }) => {
  return (
    <Link 
      to={to} 
      className="text-foreground hover:text-evrgrn-blue transition-colors duration-200 text-lg font-medium"
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export default Header;
