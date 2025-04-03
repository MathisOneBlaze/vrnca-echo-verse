
import { Product } from './ProductCard';

export const shopItems: Product[] = [
  {
    id: "1",
    name: "VRNCA T-Shirt",
    price: 29.99,
    image: "/placeholder.svg",
    category: "clothing",
    collection: "VRNCA",
    isNew: true,
    source: 'printful'
  },
  {
    id: "2",
    name: "EVRGRN Hoodie",
    price: 49.99,
    image: "/placeholder.svg",
    category: "clothing",
    collection: "EVRGRN",
    isFeatured: true,
    source: 'printful'
  },
  {
    id: "3",
    name: "TEDDY BLAZE Cap",
    price: 24.99,
    image: "/placeholder.svg",
    category: "accessories",
    collection: "TEDDY BLAZE",
    source: 'printful'
  },
  {
    id: "4",
    name: "MAGNUM Vinyl",
    price: 19.99,
    image: "/placeholder.svg",
    category: "music",
    collection: "MAGNUM",
    source: 'shopify'
  },
  {
    id: "5",
    name: "EVRGRN Poster",
    price: 14.99,
    image: "/placeholder.svg",
    category: "merch",
    collection: "EVRGRN",
    source: 'printful'
  },
  {
    id: "6",
    name: "LETTERS II Digital Album",
    price: 9.99,
    image: "/placeholder.svg",
    category: "music",
    collection: "LETTERS II",
    isNew: true,
    source: 'woocommerce'
  }
];
