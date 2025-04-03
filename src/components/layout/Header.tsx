
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import GlitchText from '../ui/GlitchText';
import VrncaInteractive from '../vrnca/VrncaInteractive';
import VrncaHead from '../vrnca/VrncaHead';
import { UserCircle } from 'lucide-react';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

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
          <img 
            src="/lovable-uploads/01e9bec9-0cde-4e57-a7c9-aa81659ce1c0.png"
            alt="EVRGRN Logo" 
            className="h-8 mr-2"
          />
          <GlitchText intensity="low" className="text-xl font-bold text-evrgrn-accent hidden md:block">
            EVRGRN
          </GlitchText>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" label="Accueil" currentPath={location.pathname} />
          <NavLink to="/musique" label="Catalogue" currentPath={location.pathname} />
          <NavLink to="/biographie" label="Artiste" currentPath={location.pathname} />
          <NavLink to="/publications" label="Médias" currentPath={location.pathname} />
          <NavLink to="/services" label="Services" currentPath={location.pathname} />
          <NavLink to="/shop" label="Shop" currentPath={location.pathname} />
          <NavLink to="/contact" label="Contact" currentPath={location.pathname} />
        </nav>

        {/* VRNCA Interactive Element et Login */}
        <div className="hidden md:flex items-center space-x-4">
          <VrncaHead size="sm" />
          <Link to="/login" className="text-foreground hover:text-evrgrn-accent transition-colors">
            <UserCircle className="w-6 h-6" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden flex items-center" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="sr-only">Menu</span>
          <div className="w-6 h-5 flex flex-col justify-between">
            <span 
              className={`w-full h-0.5 bg-evrgrn-accent block transition-transform ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            ></span>
            <span 
              className={`w-full h-0.5 bg-evrgrn-accent block transition-opacity ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            ></span>
            <span 
              className={`w-full h-0.5 bg-evrgrn-accent block transition-transform ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            ></span>
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden absolute w-full bg-evrgrn-darker/95 backdrop-blur-md transition-all duration-300 border-t border-evrgrn-accent/20 overflow-hidden ${
          isMenuOpen ? 'max-h-screen border-opacity-100' : 'max-h-0 border-opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col space-y-4">
            <MobileNavLink to="/" label="Accueil" onClick={() => setIsMenuOpen(false)} currentPath={location.pathname} />
            <MobileNavLink to="/musique" label="Catalogue" onClick={() => setIsMenuOpen(false)} currentPath={location.pathname} />
            <MobileNavLink to="/biographie" label="Artiste" onClick={() => setIsMenuOpen(false)} currentPath={location.pathname} />
            <MobileNavLink to="/publications" label="Médias" onClick={() => setIsMenuOpen(false)} currentPath={location.pathname} />
            <MobileNavLink to="/services" label="Services" onClick={() => setIsMenuOpen(false)} currentPath={location.pathname} />
            <MobileNavLink to="/shop" label="Shop" onClick={() => setIsMenuOpen(false)} currentPath={location.pathname} />
            <MobileNavLink to="/contact" label="Contact" onClick={() => setIsMenuOpen(false)} currentPath={location.pathname} />
            <MobileNavLink to="/login" label="Connexion" onClick={() => setIsMenuOpen(false)} currentPath={location.pathname} />
            
            <div className="pt-4 border-t border-evrgrn-accent/20 flex items-center">
              <VrncaHead size="sm" className="mr-3" />
              <span className="text-evrgrn-accent font-medium">Communiquer avec VRNCA</span>
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
  currentPath: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label, currentPath }) => {
  const isActive = currentPath === to || (to !== '/' && currentPath.startsWith(to));
  
  return (
    <Link 
      to={to} 
      className={`text-foreground hover:text-evrgrn-accent transition-colors duration-200 relative group text-sm ${isActive ? 'text-evrgrn-accent' : ''}`}
    >
      {label}
      <span 
        className={`absolute left-0 right-0 bottom-0 h-0.5 bg-evrgrn-accent transform ${isActive ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100 transition-transform duration-300 origin-left`}
      ></span>
    </Link>
  );
};

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, label, onClick, currentPath }) => {
  const isActive = currentPath === to || (to !== '/' && currentPath.startsWith(to));
  
  return (
    <Link 
      to={to} 
      className={`hover:text-evrgrn-accent transition-colors duration-200 text-lg font-medium ${isActive ? 'text-evrgrn-accent' : 'text-foreground'}`}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export default Header;
