
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

interface SubMenuItem {
  title: string;
  href: string;
}

interface MenuItem {
  title: string;
  href: string;
  submenu?: SubMenuItem[];
}

const MENU_ITEMS: MenuItem[] = [
  { title: 'Accueil', href: '/' },
  { title: 'Biographie', href: '/biographie' },
  { title: 'Musique', href: '/musique' },
  { 
    title: 'Médias', 
    href: '/publications',
    submenu: [
      { title: 'Publications', href: '/publications' },
      { title: 'Livres', href: '/publications#livres' },
      { title: 'Articles', href: '/publications#articles' },
      { title: 'Vidéos', href: '/publications#videos' },
      { title: 'Presse', href: '/publications#presse' },
    ]
  },
  { 
    title: 'Services', 
    href: '/services',
    submenu: [
      { title: 'Consulting Production', href: '/services#consulting' },
      { title: 'Formation Théorie', href: '/services#formation' },
      { title: 'Stratégie Carrière', href: '/services#strategie' },
      { title: 'Session Studio', href: '/services#studio' },
      { title: 'Ateliers', href: '/ateliers' },
      { title: 'FAQ', href: '/services#faq' },
    ]
  },
  { title: 'Shop', href: '/shop' },
  { title: 'Contact', href: '/contact' },
  { title: 'Jeu VRNCA LAG', href: '/game' },
];

interface NavigationMenuProps {
  className?: string;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ className }) => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (title: string) => {
    // Clear any existing timeout
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    
    // Set a small delay before showing the submenu
    const timeout = setTimeout(() => {
      setHoveredItem(title);
    }, 200); // 200ms delay
    
    setHoverTimeout(timeout as unknown as NodeJS.Timeout);
  };

  const handleMouseLeave = () => {
    // Clear any existing timeout
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    
    // Set a small delay before hiding the submenu
    const timeout = setTimeout(() => {
      setHoveredItem(null);
    }, 200); // 200ms delay
    
    setHoverTimeout(timeout as unknown as NodeJS.Timeout);
  };
  
  return (
    <nav className={cn("relative z-50", className)}>
      <ul className="flex items-center space-x-1 md:space-x-2">
        {MENU_ITEMS.map((item) => (
          <li 
            key={item.title} 
            className="relative"
            onMouseEnter={() => handleMouseEnter(item.title)}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              to={item.href}
              className={cn(
                "px-3 py-2 text-sm flex items-center rounded-md hover:bg-evrgrn-accent/20 transition-colors duration-200",
                location.pathname === item.href && "text-evrgrn-accent font-medium",
                item.submenu && "pr-6"
              )}
            >
              {item.title}
              {item.submenu && (
                <ChevronDown className="ml-1 h-4 w-4 opacity-70" />
              )}
            </Link>
            
            {/* Submenu */}
            {item.submenu && hoveredItem === item.title && (
              <div 
                className="absolute left-0 mt-1 w-48 origin-top-left rounded-md shadow-lg bg-evrgrn-muted border border-evrgrn-accent/20 overflow-hidden"
                onMouseEnter={() => setHoveredItem(item.title)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="py-1">
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.title}
                      to={subItem.href}
                      className="block px-4 py-2 text-sm hover:bg-evrgrn-accent/20 transition-colors duration-200"
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationMenu;
