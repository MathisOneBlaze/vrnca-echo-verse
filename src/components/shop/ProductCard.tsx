
import React from 'react';
import { Link } from 'react-router-dom';
import { ShopItem } from './ShopData';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Info } from 'lucide-react';
import { CartItem } from '@/context/CartContext';

export interface ProductCardProps {
  product: ShopItem;
  addToCart: (item: CartItem) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  };

  return (
    <div className="bg-evrgrn-muted border border-evrgrn-accent/10 rounded-lg overflow-hidden transition-all duration-300 hover:border-evrgrn-accent/30 h-full flex flex-col">
      <Link to={`/shop/product/${product.id}`} className="block flex-grow">
        <div className="aspect-square relative overflow-hidden bg-evrgrn-darker">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          ) : (
            // Black rectangle placeholder
            <div className="w-full h-full bg-black flex items-center justify-center">
              <span className="text-evrgrn-accent/30 text-xs">Image produit</span>
            </div>
          )}
          
          {product.isFeatured && (
            <div className="absolute top-2 right-2 bg-evrgrn-accent text-black text-xs font-medium px-2 py-1 rounded">
              En vedette
            </div>
          )}
          
          {product.collection && (
            <div className="absolute bottom-0 left-0 w-full bg-evrgrn-darker/80 text-xs font-medium text-foreground py-1 px-2">
              Collection: {product.collection}
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-medium mb-1">{product.name}</h3>
          <p className="text-evrgrn-accent font-medium text-lg mb-2">{product.price.toFixed(2)} €</p>
          
          {product.shortDescription && (
            <p className="text-sm text-muted-foreground mb-4">{product.shortDescription}</p>
          )}
        </div>
      </Link>
      
      <div className="p-4 pt-0 mt-auto">
        <div className="flex space-x-2">
          <Button 
            onClick={handleAddToCart}
            className="flex-grow"
            variant="default"
            disabled={!product.isAvailable}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.isAvailable ? 'Ajouter' : 'Indisponible'}
          </Button>
          
          <Button 
            variant="outline" 
            size="icon"
            asChild
          >
            <Link to={`/shop/product/${product.id}`}>
              <Info className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
