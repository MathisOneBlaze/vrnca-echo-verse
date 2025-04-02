import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart, Filter } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  collection?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  source: 'printful' | 'shopify' | 'woocommerce';
}

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [activeCategory, setActiveCategory] = useState("all");

  const shopItems: Product[] = [
    {
      id: "1",
      name: "VRNCA T-Shirt",
      price: 29.99,
      image: "/placeholder.svg",
      category: "clothing",
      collection: "VRNCA",
      isNew: true,
      source: 'printful'
    },
    {
      id: "2",
      name: "EVRGRN Hoodie",
      price: 49.99,
      image: "/placeholder.svg",
      category: "clothing",
      collection: "EVRGRN",
      isFeatured: true,
      source: 'printful'
    },
    {
      id: "3",
      name: "TEDDY BLAZE Cap",
      price: 24.99,
      image: "/placeholder.svg",
      category: "accessories",
      collection: "TEDDY BLAZE",
      source: 'printful'
    },
    {
      id: "4",
      name: "MAGNUM Vinyl",
      price: 19.99,
      image: "/placeholder.svg",
      category: "music",
      collection: "MAGNUM",
      source: 'shopify'
    },
    {
      id: "5",
      name: "EVRGRN Poster",
      price: 14.99,
      image: "/placeholder.svg",
      category: "merch",
      collection: "EVRGRN",
      source: 'printful'
    },
    {
      id: "6",
      name: "LETTERS II Digital Album",
      price: 9.99,
      image: "/placeholder.svg",
      category: "music",
      collection: "LETTERS II",
      isNew: true,
      source: 'woocommerce'
    }
  ];

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
              <button className="bg-evrgrn-muted hover:bg-evrgrn-light p-2 rounded-full transition-colors">
                <ShoppingCart className="h-5 w-5 text-evrgrn-accent" />
              </button>
            </div>
          </div>
          
          <div className="bg-evrgrn-muted border border-evrgrn-accent/10 rounded-lg p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full pl-10 pr-4 py-2 bg-evrgrn-dark border border-evrgrn-accent/20 rounded-md focus:outline-none focus:border-evrgrn-accent/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex space-x-4">
                <div className="w-40">
                  <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger>
                      <SelectValue placeholder="Trier par" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Plus récent</SelectItem>
                      <SelectItem value="price-asc">Prix croissant</SelectItem>
                      <SelectItem value="price-desc">Prix décroissant</SelectItem>
                      <SelectItem value="name">Alphabétique</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-40">
                  <Select value={activeCategory} onValueChange={setActiveCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes</SelectItem>
                      <SelectItem value="clothing">Vêtements</SelectItem>
                      <SelectItem value="accessories">Accessoires</SelectItem>
                      <SelectItem value="music">Musique</SelectItem>
                      <SelectItem value="merch">Merch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="bg-evrgrn-muted border border-evrgrn-accent/10 w-full flex justify-start overflow-x-auto">
              <TabsTrigger value="all" className="flex-shrink-0">Tous les produits</TabsTrigger>
              <TabsTrigger value="featured" className="flex-shrink-0">En vedette</TabsTrigger>
              <TabsTrigger value="clothing" className="flex-shrink-0">Vêtements</TabsTrigger>
              <TabsTrigger value="accessories" className="flex-shrink-0">Accessoires</TabsTrigger>
              <TabsTrigger value="music" className="flex-shrink-0">Musique</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">Aucun produit trouvé</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="featured" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.filter(p => p.isFeatured).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="clothing" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.filter(p => p.category === 'clothing').map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="accessories" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.filter(p => p.category === 'accessories').map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="music" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.filter(p => p.category === 'music').map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-16 bg-evrgrn-muted border border-evrgrn-accent/20 rounded-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="flex space-x-4 items-center">
                <img 
                  src="/lovable-uploads/ab3f2594-f0b8-44d7-a839-d3a957a32f1b.png" 
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

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="overflow-hidden bg-evrgrn-muted border border-evrgrn-accent/10 hover:border-evrgrn-accent/30 transition-all duration-300 card-hover">
      <div className="relative h-48 overflow-hidden bg-evrgrn-darker">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        
        <div className="absolute bottom-2 right-2">
          <Badge variant="outline" className="bg-evrgrn-dark/80 border-evrgrn-accent/30 text-xs">
            {product.source}
          </Badge>
        </div>
        
        {product.isNew && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-evrgrn-accent text-black font-medium">
              Nouveau
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-foreground">{product.name}</h3>
            <p className="text-sm text-muted-foreground">{product.collection}</p>
          </div>
          <span className="font-mono text-evrgrn-accent">{product.price.toFixed(2)} €</span>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xs text-muted-foreground">{product.category}</span>
          <button className="bg-evrgrn-dark hover:bg-evrgrn-light p-1.5 rounded-md transition-colors">
            <ShoppingCart className="h-4 w-4 text-evrgrn-accent" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Shop;
