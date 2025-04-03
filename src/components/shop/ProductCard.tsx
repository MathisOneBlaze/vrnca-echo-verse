
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from 'lucide-react';

export interface Product {
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

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
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

export default ProductCard;
