
import { CartItem } from '../../context/CartContext';

export interface ShopItem {
  id: string;
  name: string;
  price: number;
  description: string;
  shortDescription?: string;
  image?: string;
  category: 'clothing' | 'accessories' | 'music' | 'books' | 'other';
  collection?: string;
  isFeatured?: boolean;
  isAvailable?: boolean;
  isNew?: boolean; // Added this property
  quantity?: number;
  variations?: ShopItemVariation[];
  relatedProducts?: string[];
  currency?: string;
  images?: string[];
  kunakiProductId?: string; // Kunaki fulfillment ID
  printfulId?: number; // Printful product ID
  productType?: 'cd' | 'vinyl' | 'clothing' | 'book' | 'accessory' | 'physical';
}

export interface ShopItemVariation {
  id: string;
  name: string;
  price?: number;
  image?: string;
  isAvailable?: boolean;
}

export const shopItems: ShopItem[] = [
  {
    id: 'cd-teddy-blaze',
    name: 'CD Single Teddy Blaze',
    price: 12.95,
    description: 'Le CD Single Teddy Blaze marque le début d\'une aventure musicale unique. Cet album introductif esquisse les premières lignes de l\'univers Teddy qui sera développé dans les projets futurs. Le format physique inclut un livret avec visuels exclusifs et paroles. Pour les collectionneurs et les amateurs de rap caribéen authentique.',
    shortDescription: 'Le début du Teddy Verse',
    image: '/Cover Art/Teddy Blaze/00-Cover-TEDDYBLAZE-1200x1200.jpg',
    images: ['/Cover Art/Teddy Blaze/00-Cover-TEDDYBLAZE-1200x1200.jpg'],
    category: 'music',
    collection: 'Teddy Verse',
    isFeatured: true,
    isAvailable: true,
    currency: '€',
    kunakiProductId: 'TEDDY_BLAZE_CD',
    productType: 'cd'
  }
];

export const getItemById = (id: string): ShopItem | undefined => {
  return shopItems.find(item => item.id === id);
};

export const addToCartAdapter = (item: ShopItem, quantity: number = 1): CartItem => {
  return {
    id: item.id,
    productId: item.id,
    name: item.name,
    price: item.price,
    image: item.image,
    quantity,
    product: item
  };
};
