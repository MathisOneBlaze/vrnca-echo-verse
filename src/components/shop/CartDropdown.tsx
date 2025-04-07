
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Minus, Plus, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const CartDropdown: React.FC = () => {
  const { items, totalItems, totalPrice, removeFromCart, updateQuantity } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Cart button with badge */}
      <button 
        className="bg-evrgrn-muted hover:bg-evrgrn-light p-2 rounded-full transition-colors relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ShoppingCart className="h-5 w-5 text-evrgrn-accent" />
        {totalItems > 0 && (
          <Badge 
            className="absolute -top-1 -right-1 bg-evrgrn-accent text-black text-xs min-w-[18px] h-[18px] flex items-center justify-center p-0 rounded-full"
          >
            {totalItems}
          </Badge>
        )}
      </button>
      
      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-evrgrn-dark border border-evrgrn-accent/20 rounded-md shadow-lg z-50">
          <div className="p-3 border-b border-evrgrn-accent/10">
            <h3 className="font-medium text-foreground">Votre Panier ({totalItems})</h3>
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            {items.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                Votre panier est vide
              </div>
            ) : (
              items.map(item => (
                <div key={item.id} className="p-3 border-b border-evrgrn-accent/10 flex items-center">
                  <div className="h-12 w-12 bg-evrgrn-muted overflow-hidden mr-3 flex-shrink-0">
                    <img 
                      src={item.image || (item.product.images && item.product.images.length > 0 ? item.product.images[0] : "/placeholder.svg")} 
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center space-x-2">
                        <button 
                          className="text-xs p-1 rounded-full bg-evrgrn-muted"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs">{item.quantity}</span>
                        <button 
                          className="text-xs p-1 rounded-full bg-evrgrn-muted"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      
                      <div className="text-xs text-evrgrn-accent">
                        {(item.price * item.quantity).toFixed(2)} {item.product.currency || "€"}
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    className="ml-2 text-muted-foreground hover:text-foreground"
                    onClick={() => removeFromCart(item.productId)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))
            )}
          </div>
          
          {items.length > 0 && (
            <div className="p-3">
              <div className="flex justify-between mb-3">
                <span className="text-sm">Total:</span>
                <span className="text-sm font-medium text-evrgrn-accent">{totalPrice.toFixed(2)} EUR</span>
              </div>
              
              <Link to="/shop/cart" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-evrgrn-accent text-black hover:bg-evrgrn-light">
                  Voir le panier
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartDropdown;
