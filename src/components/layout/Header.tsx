
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import GlitchText from '../ui/GlitchText';
import VrncaInteractive from '../vrnca/VrncaInteractive';
import { UserCircle, ChevronDown } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

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

        {/* Desktop Navigation with dropdowns */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="space-x-6">
            <NavigationMenuItem>
              <Link to="/" className={`text-foreground hover:text-evrgrn-accent transition-colors duration-200 relative group text-sm ${location.pathname === '/' ? 'text-evrgrn-accent' : ''}`}>
                Accueil
                <span className={`absolute left-0 right-0 bottom-0 h-0.5 bg-evrgrn-accent transform ${location.pathname === '/' ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100 transition-transform duration-300 origin-left`}></span>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/biographie" className={`text-foreground hover:text-evrgrn-accent transition-colors duration-200 relative group text-sm ${location.pathname === '/biographie' ? 'text-evrgrn-accent' : ''}`}>
                Artiste
                <span className={`absolute left-0 right-0 bottom-0 h-0.5 bg-evrgrn-accent transform ${location.pathname === '/biographie' ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100 transition-transform duration-300 origin-left`}></span>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/musique" className={`text-foreground hover:text-evrgrn-accent transition-colors duration-200 relative group text-sm ${location.pathname === '/musique' ? 'text-evrgrn-accent' : ''}`}>
                Musique
                <span className={`absolute left-0 right-0 bottom-0 h-0.5 bg-evrgrn-accent transform ${location.pathname.startsWith('/musique') ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100 transition-transform duration-300 origin-left`}></span>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className={`text-sm bg-transparent hover:bg-transparent focus:bg-transparent ${location.pathname.startsWith('/publications') ? 'text-evrgrn-accent' : 'text-foreground'}`}>
                Médias
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-evrgrn-darker/95 backdrop-blur-md border border-evrgrn-accent/20 p-2 rounded-md">
                <ul className="grid w-[200px] gap-1">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/publications?tab=presse" className="block px-3 py-2 text-sm hover:bg-evrgrn-muted rounded-md">
                        Presse
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/publications?tab=livres" className="block px-3 py-2 text-sm hover:bg-evrgrn-muted rounded-md">
                        Livres
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/publications?tab=articles" className="block px-3 py-2 text-sm hover:bg-evrgrn-muted rounded-md">
                        Articles
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/publications?tab=videos" className="block px-3 py-2 text-sm hover:bg-evrgrn-muted rounded-md">
                        Vidéos
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className={`text-sm bg-transparent hover:bg-transparent focus:bg-transparent ${location.pathname.startsWith('/services') ? 'text-evrgrn-accent' : 'text-foreground'}`}>
                Services
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-evrgrn-darker/95 backdrop-blur-md border border-evrgrn-accent/20 p-2 rounded-md">
                <ul className="grid w-[260px] gap-1">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/services#consulting" className="block px-3 py-2 text-sm hover:bg-evrgrn-muted rounded-md">
                        Consulting Production Musicale
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/services#formation" className="block px-3 py-2 text-sm hover:bg-evrgrn-muted rounded-md">
                        Formation Théorie Musicale
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/services#strategie" className="block px-3 py-2 text-sm hover:bg-evrgrn-muted rounded-md">
                        Stratégie Carrière Artistique
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/services#studio" className="block px-3 py-2 text-sm hover:bg-evrgrn-muted rounded-md">
                        Session Studio
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/ateliers" className="block px-3 py-2 text-sm hover:bg-evrgrn-muted rounded-md">
                        Ateliers Création & Production
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/services#faq" className="block px-3 py-2 text-sm hover:bg-evrgrn-muted rounded-md">
                        FAQ
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/shop" className={`text-foreground hover:text-evrgrn-accent transition-colors duration-200 relative group text-sm ${location.pathname === '/shop' ? 'text-evrgrn-accent' : ''}`}>
                Shop
                <span className={`absolute left-0 right-0 bottom-0 h-0.5 bg-evrgrn-accent transform ${location.pathname.startsWith('/shop') ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100 transition-transform duration-300 origin-left`}></span>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/contact" className={`text-foreground hover:text-evrgrn-accent transition-colors duration-200 relative group text-sm ${location.pathname === '/contact' ? 'text-evrgrn-accent' : ''}`}>
                Contact
                <span className={`absolute left-0 right-0 bottom-0 h-0.5 bg-evrgrn-accent transform ${location.pathname === '/contact' ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100 transition-transform duration-300 origin-left`}></span>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/game" className={`text-foreground hover:text-evrgrn-accent transition-colors duration-200 relative group text-sm ${location.pathname === '/game' ? 'text-evrgrn-accent' : ''}`}>
                VRNCA LAG
                <span className={`absolute left-0 right-0 bottom-0 h-0.5 bg-evrgrn-accent transform ${location.pathname === '/game' ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100 transition-transform duration-300 origin-left`}></span>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Login icon */}
        <div className="hidden md:flex items-center">
          <Link to="/login" className="text-foreground hover:text-evrgrn-accent transition-colors">
            <UserCircle className="w-6 h-6" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden flex items-center" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
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

      {/* Mobile menu - with submenus */}
      <div 
        className={`md:hidden absolute w-full bg-evrgrn-darker/95 backdrop-blur-md transition-all duration-300 border-t border-evrgrn-accent/20 overflow-hidden ${
          isMenuOpen ? 'max-h-screen border-opacity-100' : 'max-h-0 border-opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col space-y-4">
            <MobileNavLink to="/" label="Accueil" onClick={() => setIsMenuOpen(false)} currentPath={location.pathname} />
            <MobileNavLink to="/biographie" label="Artiste" onClick={() => setIsMenuOpen(false)} currentPath={location.pathname} />
            <MobileNavLink to="/musique" label="Musique" onClick={() => setIsMenuOpen(false)} currentPath={location.pathname} />
            
            {/* Media dropdown */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <MobileNavLink to="/publications" label="Médias" onClick={(e) => {e.preventDefault()}} currentPath={location.pathname} />
                <ChevronDown className="w-4 h-4 text-evrgrn-accent" />
              </div>
              <div className="pl-4 space-y-2 border-l border-evrgrn-accent/20">
                <MobileNavLink to="/publications?tab=presse" label="Presse" onClick={() => setIsMenuOpen(false)} currentPath={location.pathname} nested />
                <MobileNavLink to="/publications?tab=livres" label="Livres" onClick={() => setIsMenuOpen(false)} currentPath={location.pathname} nested />
                <MobileNavLink to="/publications?tab=articles" label="Articles" onClick={() => setIsMenuOpen(false)} currentPath={location.pathname} nested />
                <MobileNavLink to="/publications?tab=videos" label="Vidéos" onClick={() => setIsMenuOpen(false)} currentPath={location.pathname} nested />
              </div>
            </div>
            
            {/* Services dropdown */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <MobileNavLink to="/services" label="Services" onClick={(e) => {e.preventDefault()}} currentPath={location.pathname} />
                <ChevronDown className="w-4 h-4 text-evrgrn-accent" />
              </div>
              <div className="pl-4 space-y-2 border-l border-evrgrn-accent/20">
                <MobileNavLink to="/services#consulting" label="Consulting Production Musicale" onClick={() => setIsMenuOpen(false)} currentPath={location.pathname} nested />
                <MobileNavLink to="/services#formation" label="Formation Théorie Musicale" onClick={() => setIsMenuOpen(false)} currentPath={location.pathname} nested />
                <MobileNavLink to="/services#strategie" label="Stratégie Carrière Artistique" onClick={() => setIsMenuOpen(false)} currentPath={location.pathname} nested />
                <MobileNavLink to="/services#studio" label="Session Studio" onClick={() => setIsMenuOpen(false)} currentPath={location.pathname} nested />
                <MobileNavLink to="/ateliers" label="Ateliers Création & Production" onClick={() => setIsMenuOpen(false)} currentPath={location.pathname} nested />
                <MobileNavLink to="/services#faq" label="FAQ" onClick={() => setIsMenuOpen(false)} currentPath={location.pathname} nested />
              </div>
            </div>
            
            <MobileNavLink to="/shop" label="Shop" onClick={() => setIsMenuOpen(false)} currentPath={location.pathname} />
            <MobileNavLink to="/contact" label="Contact" onClick={() => setIsMenuOpen(false)} currentPath={location.pathname} />
            <MobileNavLink to="/game" label="VRNCA LAG" onClick={() => setIsMenuOpen(false)} currentPath={location.pathname} />
            <MobileNavLink to="/login" label="Connexion" onClick={() => setIsMenuOpen(false)} currentPath={location.pathname} />
            
            <div className="pt-4 border-t border-evrgrn-accent/20 flex items-center">
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
  onClick: (e: React.MouseEvent) => void;
  nested?: boolean;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, label, onClick, currentPath, nested = false }) => {
  const isActive = currentPath === to || (to !== '/' && currentPath.startsWith(to));
  
  return (
    <Link 
      to={to} 
      className={`hover:text-evrgrn-accent transition-colors duration-200 ${nested ? 'text-sm' : 'text-lg font-medium'} ${isActive ? 'text-evrgrn-accent' : 'text-foreground'}`}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export default Header;
