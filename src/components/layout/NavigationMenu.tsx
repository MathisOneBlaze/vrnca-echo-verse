
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

const MainNav = () => {
  const navigate = useNavigate();
  
  return (
    <NavigationMenu>
      <NavigationMenuList className="space-x-1">
        <NavigationMenuItem>
          <Link to="/" className={navigationMenuTriggerStyle()}>
            Accueil
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link to="/biographie" className={navigationMenuTriggerStyle()}>
            Biographie
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="/musique" className={navigationMenuTriggerStyle()}>
            Musique
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent hover:bg-evrgrn-accent/10 cursor-pointer">
            <Link to="/publications" className="flex items-center">Médias</Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[250px] gap-1 p-2">
              <ListItem title="Presse" href="/publications?tab=presse" />
              <ListItem title="Livres" href="/publications?tab=livres" />
              <ListItem title="Articles" href="/publications?tab=articles" />
              <ListItem title="Clips" href="/publications?tab=clips" />
              <ListItem title="Le Trousseau" href="/le-trousseau" />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent hover:bg-evrgrn-accent/10 cursor-pointer">
            <Link to="/services" className="flex items-center">Services</Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[250px] gap-1 p-2">
              <ListItem title="Consulting Production" href="/services#consulting" />
              <ListItem title="Formation Théorie" href="/services#formation" />
              <ListItem title="Stratégie Carrière" href="/services#strategie" />
              <ListItem title="Session Studio" href="/services#studio" />
              <ListItem title="Ateliers" href="/ateliers" />
              <ListItem title="FAQ" href="/services#faq" />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="/shop" className={navigationMenuTriggerStyle()}>
            Shop
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link to="/contact" className={navigationMenuTriggerStyle()}>
            Contact
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent hover:bg-evrgrn-accent/10 cursor-pointer">
            <Link to="/jeux" className="flex items-center">Jeux</Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[250px] gap-1 p-2">
              <ListItem title="VRNCA-LAG" href="/VRNCA-Lag" />
              <ListItem title="Good Run Evil" href="/good-run-evil" />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

interface ListItemProps {
  title: string;
  href: string;
  children?: React.ReactNode;
}

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ title, href, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            to={href}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-evrgrn-accent/10 hover:text-accent-foreground focus:bg-evrgrn-accent/10 focus:text-accent-foreground",
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            {children && (
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {children}
              </p>
            )}
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

export default MainNav;
