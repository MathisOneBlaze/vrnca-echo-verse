
import { Product } from './ProductCard';

export const shopItems: Product[] = [
  {
    id: "prod_01",
    name: "T-shirt EVRGRN Classic",
    description: "T-shirt noir avec logo EVRGRN",
    price: 29.99,
    currency: "EUR",
    images: ["/placeholder.svg"],
    category: "clothing",
    tags: ["t-shirt", "clothing", "merch"],
    isFeatured: true,
    inStock: true,
    collection: "Classic"
  },
  {
    id: "prod_02",
    name: "Hoodie VRNCA",
    description: "Hoodie noir avec design VRNCA sur le dos",
    price: 59.99,
    currency: "EUR",
    images: ["/placeholder.svg"],
    category: "clothing",
    tags: ["hoodie", "clothing", "merch"],
    isFeatured: true,
    inStock: true,
    collection: "VRNCA"
  },
  {
    id: "prod_03",
    name: "Casquette EVRGRN",
    description: "Casquette noire avec logo EVRGRN brodé",
    price: 24.99,
    currency: "EUR",
    images: ["/placeholder.svg"],
    category: "accessories",
    tags: ["cap", "accessories", "merch"],
    isFeatured: false,
    inStock: true,
    collection: "Classic"
  },
  {
    id: "prod_04",
    name: "Tote Bag EVRGRN",
    description: "Sac en toile avec logo EVRGRN",
    price: 15.99,
    currency: "EUR",
    images: ["/placeholder.svg"],
    category: "accessories",
    tags: ["bag", "accessories", "merch"],
    isFeatured: false,
    inStock: true,
    collection: "Classic"
  },
  {
    id: "prod_05",
    name: "Stickers Pack EVRGRN",
    description: "Pack de 5 stickers EVRGRN",
    price: 7.99,
    currency: "EUR",
    images: ["/placeholder.svg"],
    category: "accessories",
    tags: ["stickers", "accessories", "merch"],
    isFeatured: false,
    inStock: true,
    collection: "Classic"
  },
  {
    id: "prod_06",
    name: "Livre \"Le Trousseau\"",
    description: "Autobiographie de Mathis OneBlaze",
    price: 19.99,
    currency: "EUR",
    images: ["/livres/LE TROUSSEAU cover.jpg"],
    category: "music",
    tags: ["book", "autobiography", "merch"],
    isFeatured: true,
    inStock: true,
    collection: "Books"
  },
  {
    id: "prod_07",
    name: "Vinyle Letters II",
    description: "Edition limitée du projet Letters II sur vinyle",
    price: 29.99,
    currency: "EUR",
    images: ["/Cover Art/LETTERS ON FALLEN FALL LEAVES/02-D-T-R-m4a-image-1200x1200.jpg"],
    category: "music",
    tags: ["vinyl", "music", "letters II", "limited"],
    isFeatured: true,
    inStock: true,
    collection: "Music"
  }
];
