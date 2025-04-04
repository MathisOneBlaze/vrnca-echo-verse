
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/shop/ProductCard';
import ShopFilters from '../components/shop/ShopFilters';
import ShopProductGrid from '../components/shop/ShopProductGrid';
import CartDropdown from '../components/shop/CartDropdown';
import { shopItems } from '../components/shop/ShopData';
import { useCart } from '../context/CartContext';

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [activeCategory, setActiveCategory] = useState("all");
  const { addToCart } = useCart();

  const filteredProducts = shopItems.filter(item => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        (item.collection && item.collection.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      case "newest":
      default:
        return b.id.localeCompare(a.id);
    }
  });

  return (
    <div className="bg-evrgrn-dark text-foreground min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
              <img 
                src="/lovable-uploads/01e9bec9-0cde-4e57-a7c9-aa81659ce1c0.png" 
                alt="EVRGRN Logo" 
                className="h-16 mb-4"
              />
              <h1 className="text-4xl font-serif mb-2">EVRGRN Shop</h1>
              <p className="text-lg mb-4 text-center md:text-left">
                Découvrez notre collection de produits dérivés, matériel audio et ouvrages.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="hidden md:inline text-evrgrn-accent">Panier</span>
              <CartDropdown />
            </div>
          </div>
          
          <ShopFilters 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortOption={sortOption}
            setSortOption={setSortOption}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          
          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="bg-evrgrn-muted border border-evrgrn-accent/10 w-full flex justify-start overflow-x-auto">
              <TabsTrigger value="all" className="flex-shrink-0">Tous les produits</TabsTrigger>
              <TabsTrigger value="featured" className="flex-shrink-0">En vedette</TabsTrigger>
              <TabsTrigger value="clothing" className="flex-shrink-0">Vêtements</TabsTrigger>
              <TabsTrigger value="accessories" className="flex-shrink-0">Accessoires</TabsTrigger>
              <TabsTrigger value="music" className="flex-shrink-0">Musique</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} addToCart={addToCart} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="featured" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.filter(p => p.isFeatured).map((product) => (
                  <ProductCard key={product.id} product={product} addToCart={addToCart} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="clothing" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.filter(p => p.category === 'clothing').map((product) => (
                  <ProductCard key={product.id} product={product} addToCart={addToCart} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="accessories" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.filter(p => p.category === 'accessories').map((product) => (
                  <ProductCard key={product.id} product={product} addToCart={addToCart} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="music" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.filter(p => p.category === 'music').map((product) => (
                  <ProductCard key={product.id} product={product} addToCart={addToCart} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-16 bg-evrgrn-muted border border-evrgrn-accent/20 rounded-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="flex space-x-4 items-center">
                <img 
                  src="/lovable-uploads/01e9bec9-0cde-4e57-a7c9-aa81659ce1c0.png" 
                  alt="EVRGRN Logo" 
                  className="h-10"
                />
                <span className="text-xl">+</span>
                <div className="text-xl font-bold">printful</div>
              </div>
            </div>
            <h3 className="text-xl font-medium mb-2">Boutique en cours d'intégration</h3>
            <p className="text-muted-foreground">
              Notre boutique est en cours d'intégration avec Printful pour vous offrir une expérience d'achat optimale.
              <br />Les produits seront bientôt disponibles !
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Shop;
