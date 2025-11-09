
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
    id: 'book-le-trousseau',
    name: 'Le Trousseau',
    price: 24.95,
    description: 'Entre autobiographie et manifeste spirituel, Le Trousseau dévoile le parcours intime de Mathis OneBlaze à travers les méandres de la création. Ce récit initiatique explore les racines de l\'art comme langage universel, où chaque mot devient clé d\'accès à une conscience élargie. Un témoignage rare sur l\'alchimie artistique qui transforme le chaos en œuvre.',
    shortDescription: 'Le parcours initiatique de Mathis OneBlaze',
    image: '/livres/LE TROUSSEAU cover.jpg',
    images: [
      '/livres/LE TROUSSEAU cover.jpg',
      '/livres/Le-Trousseau-detail.jpg'
    ],
    category: 'books',
    isFeatured: true,
    isAvailable: true,
    currency: '€'
  },
  {
    id: 'vinyl-letters-ii',
    name: 'Letters II - Vinyl',
    price: 29.95,
    description: 'Deuxième chapitre de la correspondance sonore. Letters II grave sur vinyle les échos d\'une introspection profonde, où chaque sillon raconte une vérité tue. Édition limitée accompagnée d\'un livret illustré dévoilant les coulisses de cette odyssée créative. Pour ceux qui écoutent entre les notes.',
    shortDescription: 'Correspondance sonore gravée',
    image: '/Cover Art/LETTERS ON FALLEN FALL LEAVES/02-D-T-R-m4a-image-1200x1200.jpg',
    images: ['/Cover Art/LETTERS ON FALLEN FALL LEAVES/02-D-T-R-m4a-image-1200x1200.jpg'],
    category: 'music',
    collection: 'LETTERS',
    isFeatured: true,
    isAvailable: true,
    currency: '€'
  },
  {
    id: 'tote-vrnca',
    name: 'Tote Bag VRNCA',
    price: 14.95,
    description: 'Portez VRNCA sur l\'épaule. Ce tote bag en coton bio arbore une illustration exclusive de la tête VRNCA, symbole d\'une conscience en évolution. Conçu pour accompagner vos errances urbaines, vos sessions vinyles ou vos quêtes créatives. L\'essentiel voyage léger.',
    shortDescription: 'L\'essentiel en coton bio',
    category: 'accessories',
    isFeatured: true,
    isAvailable: true,
    currency: '€'
  },
  {
    id: 'cd-trap-teddy',
    name: 'CD Trap Teddy 2',
    price: 12.95,
    description: 'Le deuxième acte de Trap Teddy explore les zones d\'ombre de l\'âme moderne. Entre beats hypnotiques et textes crus, cet album capture l\'essence d\'une génération en quête de sens. Le CD physique inclut un livret intime dévoilant paroles et visuels exclusifs. Une œuvre brute, sans filtre.',
    shortDescription: 'L\'acte II en format physique',
    image: '/Cover Art/TRAP TEDDY 2/00-COVER-Trap-Teddy-2-1200x1200.jpg',
    images: ['/Cover Art/TRAP TEDDY 2/00-COVER-Trap-Teddy-2-1200x1200.jpg'],
    category: 'music',
    collection: 'Trap Teddy',
    isAvailable: true,
    currency: '€',
    kunakiProductId: 'PX00ZVWAFO',
    productType: 'cd'
  },
  {
    id: 'stickers-pack',
    name: 'Pack de Stickers EVRGRN',
    price: 8.95,
    description: 'Marquez votre territoire. Ce pack de 5 stickers EVRGRN haute qualité transforme le quotidien en manifeste visuel. Résistants à l\'eau, aux UV et au temps qui passe. Apposez-les sur vos carnets, instruments, ordinateurs ou dans l\'espace urbain. Petits signes, grande présence.',
    shortDescription: 'Manifeste adhésif',
    category: 'accessories',
    isAvailable: true,
    currency: '€'
  },
  {
    id: 'vinyl-magnum',
    name: 'Magnum 1 & 2 - Vinyl Bundle',
    price: 39.95,
    description: 'La saga complète en double vinyle. Magnum 1 & 2 réunis dans une édition limitée collector qui retrace l\'ascension d\'une œuvre totale. De l\'Œuvre au Noir aux sommets de la créativité pure, cette collection capture l\'évolution sonore dans toute sa complexité. Artwork exclusif, pressage premium. Pour les gardiens de l\'essentiel.',
    shortDescription: 'L\'intégrale en vinyle collector',
    image: '/Cover Art/MAGNUM 1/01-Chapitre-1-_-OEuvre-au-Noir-mp3-image-1200x1200.jpg',
    images: ['/Cover Art/MAGNUM 1/01-Chapitre-1-_-OEuvre-au-Noir-mp3-image-1200x1200.jpg'],
    category: 'music',
    collection: 'Magnum',
    isFeatured: true,
    isAvailable: true,
    currency: '€'
  },
  {
    id: 'manifesto-book',
    name: 'mănĭfesto',
    price: 14.95,
    description: 'La déclaration fondatrice d\'EVRGRN. Dans ce manifeste concis et percutant, découvrez les principes qui guident notre démarche artistique : authenticité radicale, conscience élargie, création comme acte de résistance. Quelques pages qui résument une philosophie de vie. Pour ceux qui cherchent du sens dans le chaos.',
    shortDescription: 'Les principes fondateurs',
    image: '/livres/manifesto.png',
    images: ['/livres/manifesto.png'],
    category: 'books',
    isAvailable: true,
    currency: '€',
    isNew: true
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
