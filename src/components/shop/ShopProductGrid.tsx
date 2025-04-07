
import React from 'react';
import { ShopItem } from './ShopData';
import ProductCard from './ProductCard';
import { useCart } from '@/context/CartContext';

interface ShopProductGridProps {
  products: ShopItem[];
}

const ShopProductGrid: React.FC<ShopProductGridProps> = ({ products }) => {
  const { addToCart } = useCart();
  
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">Aucun produit trouvé</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          addToCart={addToCart}
        />
      ))}
    </div>
  );
};

export default ShopProductGrid;
