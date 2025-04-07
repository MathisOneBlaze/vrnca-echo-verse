import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '../context/CartContext';
import { ShopItem, shopItems } from '../components/shop/ShopData';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ShopItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();
  
  useEffect(() => {
    const foundProduct = shopItems.find(item => item.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id]);
  
  if (!product) {
    return (
      <div className="bg-evrgrn-dark text-foreground min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 flex items-center justify-center">
          <div className="text-center">
            <p className="text-evrgrn-accent text-xl">Produit non trouvé</p>
            <Link to="/shop" className="mt-4 inline-block text-sm underline">
              Retour à la boutique
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };
  
  const nextImage = () => {
    if (product.images && product.images.length > 0) {
      setCurrentImageIndex((currentImageIndex + 1) % product.images.length);
    }
  };
  
  const prevImage = () => {
    if (product.images && product.images.length > 0) {
      setCurrentImageIndex(currentImageIndex === 0 ? product.images.length - 1 : currentImageIndex - 1);
    }
  };
  
  const currentImage = product.images && product.images.length > 0 
    ? product.images[currentImageIndex] 
    : product.image || "/placeholder.svg";
  
  return (
    <div className="bg-evrgrn-dark text-foreground min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 py-8">
          <Link to="/shop" className="inline-flex items-center text-evrgrn-accent hover:text-evrgrn-light transition-colors mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Retour à la boutique</span>
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="bg-evrgrn-darker rounded-lg overflow-hidden border border-evrgrn-accent/10 relative aspect-square">
                <img 
                  src={currentImage} 
                  alt={product.name} 
                  className="w-full h-full object-contain p-4"
                />
                
                {product.images && product.images.length > 1 && (
                  <>
                    <button 
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-full p-2"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-full p-2"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </>
                )}
                
                {product.isNew && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-evrgrn-accent text-black font-medium">
                      Nouveau
                    </Badge>
                  </div>
                )}
              </div>
              
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-5 gap-2 mt-4">
                  {product.images.map((image, index) => (
                    <button 
                      key={index} 
                      className={`border rounded-md overflow-hidden ${
                        index === currentImageIndex ? 'border-evrgrn-accent' : 'border-evrgrn-accent/10'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img 
                        src={image} 
                        alt={`${product.name} - vue ${index + 1}`}
                        className="w-full h-full object-cover aspect-square"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div>
              <div className="mb-2">
                <Badge variant="outline" className="text-xs text-evrgrn-accent border-evrgrn-accent/30">
                  {product.category}
                </Badge>
                {product.collection && (
                  <Badge variant="outline" className="ml-2 text-xs text-muted-foreground border-evrgrn-accent/20">
                    {product.collection}
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl font-serif mb-2">{product.name}</h1>
              <p className="text-2xl font-mono text-evrgrn-accent mb-4">
                {product.price.toFixed(2)} {product.currency}
              </p>
              
              <div className="prose text-muted-foreground mb-6 max-w-none">
                <p>{product.description}</p>
              </div>
              
              <div className="mt-8 space-y-6">
                <div className="flex items-center">
                  <label htmlFor="quantity" className="block mr-4 text-sm text-muted-foreground">
                    Quantité
                  </label>
                  <div className="flex items-center">
                    <button 
                      className="p-2 border border-evrgrn-accent/20 rounded-l-md bg-evrgrn-muted"
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      className="w-12 h-full text-center border-y border-evrgrn-accent/20 bg-evrgrn-muted"
                      value={quantity}
                      onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      min="1"
                    />
                    <button 
                      className="p-2 border border-evrgrn-accent/20 rounded-r-md bg-evrgrn-muted"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
                
                <Button 
                  onClick={handleAddToCart} 
                  className="w-full bg-evrgrn-accent text-black hover:bg-evrgrn-light"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Ajouter au panier
                </Button>
              </div>
              
              <div className="mt-6 border-t border-evrgrn-accent/10 pt-6 text-sm text-muted-foreground">
                <p>Expédition sous 2-4 jours ouvrés</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
