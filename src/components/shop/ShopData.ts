
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
  quantity?: number;
  variations?: ShopItemVariation[];
  relatedProducts?: string[];
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
    id: 'book-le-trousseau',
    name: 'Le Trousseau',
    price: 24.95,
    description: 'Autobiographie de Mathis OneBlaze qui révèle son parcours artistique et sa philosophie de création. Un document essentiel pour comprendre l\'univers EVRGRN.',
    shortDescription: 'L\'autobiographie de Mathis OneBlaze',
    image: '/livres/LE TROUSSEAU cover.jpg',
    category: 'books',
    isFeatured: true,
    isAvailable: true
  },
  {
    id: 'vinyl-letters-ii',
    name: 'Letters II - Vinyl',
    price: 29.95,
    description: 'Édition limitée du vinyle Letters II, incluant des illustrations exclusives et des notes de production.',
    shortDescription: 'Édition limitée en vinyle',
    image: '/Cover Art/LETTERS ON FALLEN FALL LEAVES/02-D-T-R-m4a-image-1200x1200.jpg',
    category: 'music',
    collection: 'LETTERS',
    isFeatured: true,
    isAvailable: true
  },
  {
    id: 'tshirt-evrgrn-logo',
    name: 'T-shirt EVRGRN Logo',
    price: 24.95,
    description: 'T-shirt en coton bio avec le logo EVRGRN brodé. Coupe unisexe.',
    shortDescription: 'T-shirt coton bio premium',
    category: 'clothing',
    isAvailable: true,
    variations: [
      { id: 'sm', name: 'S' },
      { id: 'md', name: 'M' },
      { id: 'lg', name: 'L' },
      { id: 'xl', name: 'XL' }
    ]
  },
  {
    id: 'hoodie-evrgrn',
    name: 'Hoodie EVRGRN',
    price: 59.95,
    description: 'Hoodie en coton bio avec le logo EVRGRN imprimé au dos et une petite broderie sur la poitrine. Coupe unisexe.',
    shortDescription: 'Hoodie coton bio premium',
    category: 'clothing',
    isAvailable: true,
    variations: [
      { id: 'sm', name: 'S' },
      { id: 'md', name: 'M' },
      { id: 'lg', name: 'L' },
      { id: 'xl', name: 'XL' }
    ]
  },
  {
    id: 'tote-vrnca',
    name: 'Tote Bag VRNCA',
    price: 14.95,
    description: 'Tote bag en coton bio avec une illustration VRNCA. Idéal pour transporter vos vinyles.',
    shortDescription: 'Tote bag coton bio',
    category: 'accessories',
    isFeatured: true,
    isAvailable: true
  },
  {
    id: 'cd-trap-teddy',
    name: 'CD Trap Teddy 2',
    price: 12.95,
    description: 'CD physique de l\'album Trap Teddy 2 incluant un livret avec les paroles et des illustrations.',
    shortDescription: 'Album physique avec livret',
    image: '/Cover Art/TRAP TEDDY 2/00-COVER-Trap-Teddy-2-1200x1200.jpg',
    category: 'music',
    collection: 'Trap Teddy',
    isAvailable: true
  },
  {
    id: 'stickers-pack',
    name: 'Pack de Stickers EVRGRN',
    price: 8.95,
    description: 'Pack de 5 stickers EVRGRN de haute qualité, résistants à l\'eau et aux UV.',
    shortDescription: 'Pack de 5 stickers',
    category: 'accessories',
    isAvailable: true
  },
  {
    id: 'beanie-evrgrn',
    name: 'Bonnet EVRGRN',
    price: 19.95,
    description: 'Bonnet en coton bio avec logo EVRGRN brodé. Parfait pour l\'hiver.',
    shortDescription: 'Bonnet en coton bio',
    category: 'clothing',
    isAvailable: true
  },
  {
    id: 'vinyl-magnum',
    name: 'Magnum 1 & 2 - Vinyl Bundle',
    price: 39.95,
    description: 'Bundle des vinyles Magnum 1 et Magnum 2. Édition limitée avec artwork exclusif.',
    shortDescription: 'Bundle vinyles Magnum 1 & 2',
    image: '/Cover Art/MAGNUM 1/01-Chapitre-1-_-OEuvre-au-Noir-mp3-image-1200x1200.jpg',
    category: 'music',
    collection: 'Magnum',
    isFeatured: true,
    isAvailable: true
  },
  {
    id: 'manifesto-book',
    name: 'mănĭfesto',
    price: 14.95,
    description: 'Le manifeste artistique et philosophique d\'EVRGRN. Un livre concis qui explicite la vision et les valeurs du collectif.',
    shortDescription: 'Manifeste artistique EVRGRN',
    image: '/livres/mănĭfesto.png',
    category: 'books',
    isAvailable: true
  }
];

export const getItemById = (id: string): ShopItem | undefined => {
  return shopItems.find(item => item.id === id);
};

export const addToCartAdapter = (item: ShopItem, quantity: number = 1, variation?: string): CartItem => {
  return {
    id: variation ? `${item.id}-${variation}` : item.id,
    productId: item.id,
    name: item.name,
    price: item.price,
    image: item.image,
    quantity,
    variation: variation ? item.variations?.find(v => v.id === variation)?.name : undefined
  };
};
