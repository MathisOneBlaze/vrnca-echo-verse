
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ShopItem } from '../components/shop/ShopData';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
  product: ShopItem; // Add this to match the usage in components
  variation?: string; // Add this to match usage in ShopData
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: ShopItem) => void; // Changed from CartItem to ShopItem
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  
  // Load cart from localStorage when component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem('evrgrnCart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
        localStorage.removeItem('evrgrnCart');
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('evrgrnCart', JSON.stringify(items));
  }, [items]);
  
  const addToCart = (product: ShopItem) => {
    setItems(prevItems => {
      // Check if the product already exists in the cart
      const existingItemIndex = prevItems.findIndex(i => i.productId === product.id);
      
      if (existingItemIndex >= 0) {
        // If product already exists, increase quantity
        return prevItems.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // If product doesn't exist, add it with quantity 1
        const newItem: CartItem = {
          id: product.id,
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
          product: product
        };
        return [...prevItems, newItem];
      }
    });
  };
  
  const removeFromCart = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.productId !== productId));
  };
  
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setItems(prevItems => 
        prevItems.map(item => 
          item.productId === productId 
            ? { ...item, quantity } 
            : item
        )
      );
    }
  };
  
  const clearCart = () => {
    setItems([]);
  };
  
  // Calculate total number of items
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  // Calculate total price
  const totalPrice = items.reduce(
    (sum, item) => sum + (item.price * item.quantity), 
    0
  );
  
  return (
    <CartContext.Provider 
      value={{ 
        items, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
