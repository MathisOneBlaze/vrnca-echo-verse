
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import GlitchText from '../ui/GlitchText';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import CartDropdown from '../shop/CartDropdown';
import { useCart } from '@/context/CartContext';
import MiniVrncaModel from '../3d/MiniVrncaModel';
import NavigationMenu from './NavigationMenu';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { totalItems } = useCart();
  const navigate = useNavigate();
  
  // Monitor scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    // Create a listener function that will be called when navigation happens
    const unlisten = navigate(() => {
      setMobileMenuOpen(false);
    });
    
    // Return a cleanup function that calls the unlisten function
    return () => {
      if (typeof unlisten === 'function') {
        unlisten();
      }
    };
  }, [navigate]);
  
  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-evrgrn-darker/80 backdrop-blur-md',
        isScrolled ? 'py-3 shadow-lg' : 'py-5'
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="flex items-center">
            <img src="/lovable-uploads/01e9bec9-0cde-4e57-a7c9-aa81659ce1c0.png" alt="EVRGRN Logo" className="h-8 mr-2" />
            <GlitchText className="text-lg md:text-xl font-bold text-evrgrn-accent" intensity="low">
              EVRGRN
            </GlitchText>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <NavigationMenu />
        </div>
        
        {/* Right side - Cart and Login*/}
        <div className="flex items-center gap-2">
          {/* Cart Icon with dropdown */}
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => setCartOpen(!cartOpen)}
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-evrgrn-accent text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
            
            {cartOpen && (
              <CartDropdown />
            )}
          </div>
          
          {/* VRNCA Mini Model */}
          <Link to="/game" className="hidden md:flex ml-2 items-center justify-center hover:bg-evrgrn-accent/10 rounded-full p-1">
            <MiniVrncaModel />
          </Link>
          
          {/* Login Button */}
          <Button asChild size="sm" variant="ghost" className="hidden md:flex ml-2">
            <Link to="/login">Connexion</Link>
          </Button>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-evrgrn-darker/95 backdrop-blur-md border-t border-evrgrn-accent/10 pt-4 pb-6 overflow-auto max-h-[80vh]">
          <div className="container mx-auto px-4">
            <ul className="space-y-2">
              <MobileLink to="/" label="Accueil" onClick={() => setMobileMenuOpen(false)} />
              <MobileLink to="/biographie" label="Biographie" onClick={() => setMobileMenuOpen(false)} />
              <MobileLink to="/musique" label="Musique" onClick={() => setMobileMenuOpen(false)} />
              
              {/* Media with submenu */}
              <li className="border-b border-evrgrn-accent/10 pb-2">
                <MobileLink to="/publications" label="Médias" onClick={() => setMobileMenuOpen(false)} />
                <ul className="pl-4 mt-1 space-y-1">
                  <MobileLink to="/publications#livres" label="Livres" onClick={() => setMobileMenuOpen(false)} />
                  <MobileLink to="/publications#articles" label="Articles" onClick={() => setMobileMenuOpen(false)} />
                  <MobileLink to="/publications#videos" label="Vidéos" onClick={() => setMobileMenuOpen(false)} />
                  <MobileLink to="/publications#presse" label="Presse" onClick={() => setMobileMenuOpen(false)} />
                </ul>
              </li>
              
              {/* Services with submenu */}
              <li className="border-b border-evrgrn-accent/10 pb-2">
                <MobileLink to="/services" label="Services" onClick={() => setMobileMenuOpen(false)} />
                <ul className="pl-4 mt-1 space-y-1">
                  <MobileLink to="/services#consulting" label="Consulting Production" onClick={() => setMobileMenuOpen(false)} />
                  <MobileLink to="/services#formation" label="Formation Théorie" onClick={() => setMobileMenuOpen(false)} />
                  <MobileLink to="/services#strategie" label="Stratégie Carrière" onClick={() => setMobileMenuOpen(false)} />
                  <MobileLink to="/services#studio" label="Session Studio" onClick={() => setMobileMenuOpen(false)} />
                  <MobileLink to="/ateliers" label="Ateliers" onClick={() => setMobileMenuOpen(false)} />
                  <MobileLink to="/services#faq" label="FAQ" onClick={() => setMobileMenuOpen(false)} />
                </ul>
              </li>
              
              <MobileLink to="/shop" label="Shop" onClick={() => setMobileMenuOpen(false)} />
              <MobileLink to="/contact" label="Contact" onClick={() => setMobileMenuOpen(false)} />
              <MobileLink to="/game" label="Jeu VRNCA LAG" onClick={() => setMobileMenuOpen(false)} />
              
              {/* Login and Register */}
              <li className="pt-4 border-t border-evrgrn-accent/10 mt-4">
                <div className="flex gap-4">
                  <Button asChild size="sm" className="flex-1 bg-evrgrn-accent text-black hover:bg-evrgrn-accent/80">
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Connexion</Link>
                  </Button>
                  <Button asChild size="sm" variant="outline" className="flex-1">
                    <Link to="/register" onClick={() => setMobileMenuOpen(false)}>Inscription</Link>
                  </Button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

interface MobileLinkProps {
  to: string;
  label: string;
  onClick: () => void;
}

const MobileLink: React.FC<MobileLinkProps> = ({ to, label, onClick }) => {
  return (
    <li>
      <Link 
        to={to} 
        className="block py-2 hover:text-evrgrn-accent transition-colors duration-200"
        onClick={onClick}
      >
        {label}
      </Link>
    </li>
  );
};

export default Header;
