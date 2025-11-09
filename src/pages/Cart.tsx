
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, X, ArrowLeft, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { createCheckoutSession } from '../services/StripeService';

const Cart = () => {
  const { items, totalItems, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart();
  const { toast } = useToast();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    console.log('🛒 Checkout button clicked');
    console.log('📦 Cart items:', items);
    
    if (items.length === 0) {
      toast({
        title: "Panier vide",
        description: "Ajoutez des articles à votre panier avant de procéder au paiement.",
        variant: "destructive"
      });
      return;
    }
    
    setIsCheckingOut(true);
    
    try {
      // Transform cart items to checkout format
      const checkoutItems = items.map(item => {
        // Convert relative image path to absolute URL for Stripe
        let imageUrl = item.image;
        if (imageUrl && !imageUrl.startsWith('http')) {
          imageUrl = `https://evrgrn.mathisoneblaze.com${imageUrl}`;
        }
        
        return {
          id: item.id,
          name: item.name,
          description: item.product.description || '',
          price: item.price,
          quantity: item.quantity,
          image: imageUrl,
          printfulId: (item.product as any).printfulId,
          kunakiProductId: (item.product as any).kunakiProductId,
          productType: (item.product as any).productType || 'physical',
          productId: item.productId,
          variantId: item.id
        };
      });

      console.log('💳 Creating checkout session with:', checkoutItems);

      // Create Stripe checkout session and redirect
      await createCheckoutSession(checkoutItems);
      
    } catch (error: any) {
      console.error('❌ Checkout error:', error);
      toast({
        title: "Erreur de paiement",
        description: error.message || "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive"
      });
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="bg-evrgrn-dark text-foreground min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-8 pt-8">
            <Link to="/shop" className="flex items-center text-evrgrn-accent hover:text-evrgrn-light transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span>Continuer mes achats</span>
            </Link>
            <h1 className="text-2xl md:text-3xl font-serif ml-auto">Panier</h1>
          </div>
          
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="flex justify-center mb-4">
                <ShoppingCart className="h-16 w-16 text-evrgrn-accent/30" />
              </div>
              <h2 className="text-xl mb-4">Votre panier est vide</h2>
              <p className="text-muted-foreground mb-8">Découvrez notre collection de produits dans la boutique</p>
              <Link to="/shop">
                <Button className="bg-evrgrn-accent text-black hover:bg-evrgrn-light">
                  Voir la boutique
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-evrgrn-muted rounded-lg overflow-hidden border border-evrgrn-accent/10">
                  <div className="p-4 border-b border-evrgrn-accent/10 flex justify-between">
                    <h2 className="font-medium">Articles ({totalItems})</h2>
                    <button 
                      className="text-sm text-evrgrn-accent hover:text-evrgrn-light transition-colors"
                      onClick={clearCart}
                    >
                      Vider le panier
                    </button>
                  </div>
                  
                  <div className="divide-y divide-evrgrn-accent/10">
                    {items.map(item => (
                      <div key={item.id} className="p-4 flex items-center">
                        <div className="h-20 w-20 bg-evrgrn-darker overflow-hidden mr-4 flex-shrink-0">
                          <img 
                            src={item.image || (item.product.images && item.product.images.length > 0 ? item.product.images[0] : "/placeholder.svg")} 
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-medium mb-1">{item.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{item.product.collection}</p>
                          
                          <div className="flex items-center">
                            <button 
                              className="text-xs p-1.5 rounded-full bg-evrgrn-darker"
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-sm mx-3 w-6 text-center">{item.quantity}</span>
                            <button 
                              className="text-xs p-1.5 rounded-full bg-evrgrn-darker"
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-mono text-evrgrn-accent mb-2">
                            {(item.price * item.quantity).toFixed(2)} {item.product.currency || "€"}
                          </div>
                          <button 
                            className="text-muted-foreground hover:text-foreground"
                            onClick={() => removeFromCart(item.productId)}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-evrgrn-muted rounded-lg overflow-hidden border border-evrgrn-accent/10 sticky top-24">
                  <div className="p-4 border-b border-evrgrn-accent/10">
                    <h2 className="font-medium">Résumé de la commande</h2>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Sous-total</span>
                      <span>{totalPrice.toFixed(2)} EUR</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Livraison</span>
                      <span>Calculé à l'étape suivante</span>
                    </div>
                    <div className="border-t border-evrgrn-accent/10 my-4 pt-4 flex justify-between font-medium">
                      <span>Total</span>
                      <span className="text-evrgrn-accent">{totalPrice.toFixed(2)} EUR</span>
                    </div>
                    
                    <Button 
                      className="w-full bg-evrgrn-accent text-black hover:bg-evrgrn-light"
                      onClick={handleCheckout}
                      disabled={isCheckingOut}
                    >
                      {isCheckingOut ? 'Traitement en cours...' : 'Procéder au paiement'}
                    </Button>
                    
                    <p className="text-xs text-center text-muted-foreground mt-4">
                      En procédant au paiement, vous acceptez nos <Link to="/mentions-legales" className="text-evrgrn-accent hover:underline">conditions générales</Link>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
