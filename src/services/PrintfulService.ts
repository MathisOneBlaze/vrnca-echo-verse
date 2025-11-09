/**
 * Printful API Service
 * Fetches products from Printful store
 */

const PRINTFUL_STORE_ID = '17178269';
const PRINTFUL_API_KEY = 'tumEKubWmCQ5McUUY6yWnPfP7649bHc92D37TQng';
const PRINTFUL_API_BASE = 'https://api.printful.com';

export interface PrintfulProduct {
  id: number;
  external_id: string;
  name: string;
  variants: number;
  synced: number;
  thumbnail_url: string;
  is_ignored: boolean;
}

export interface PrintfulVariant {
  id: number;
  external_id: string;
  sync_product_id: number;
  name: string;
  synced: boolean;
  variant_id: number;
  retail_price: string;
  currency: string;
  is_ignored: boolean;
  sku: string;
  product: {
    variant_id: number;
    product_id: number;
    image: string;
    name: string;
  };
  files: Array<{
    id: number;
    type: string;
    hash: string;
    url: string;
    filename: string;
    mime_type: string;
    size: number;
    width: number;
    height: number;
    dpi: number;
    status: string;
    created: number;
    thumbnail_url: string;
    preview_url: string;
    visible: boolean;
  }>;
}

export interface PrintfulProductDetail {
  sync_product: PrintfulProduct;
  sync_variants: PrintfulVariant[];
}

/**
 * Fetch all products from Printful store
 * Using static JSON file to avoid CORS issues
 */
export async function fetchPrintfulProducts(): Promise<any[]> {
  try {
    const response = await fetch('/printful-products.json');
    
    if (!response.ok) {
      throw new Error(`Failed to load products: ${response.status}`);
    }

    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error('Error fetching Printful products:', error);
    return [];
  }
}

/**
 * Fetch detailed product information including variants
 */
export async function fetchPrintfulProductDetail(productId: number): Promise<PrintfulProductDetail | null> {
  try {
    const response = await fetch(
      `${PRINTFUL_API_BASE}/sync/products/${productId}?store_id=${PRINTFUL_STORE_ID}`,
      {
        headers: {
          'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Printful API error: ${response.status}`);
    }

    const data = await response.json();
    return data.result || null;
  } catch (error) {
    console.error('Error fetching Printful product detail:', error);
    return null;
  }
}

/**
 * Transform Printful product to shop item format
 */
export function transformPrintfulProduct(product: PrintfulProduct, variants: PrintfulVariant[] = []) {
  // Get the lowest price from variants
  const prices = variants.map(v => parseFloat(v.retail_price)).filter(p => !isNaN(p));
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;

  // Transform to match ShopItem interface
  return {
    id: `printful-${product.id}`,
    name: product.name,
    price: minPrice,
    description: `Premium quality ${product.name}. Available in multiple sizes.`,
    image: product.thumbnail_url,
    category: "clothing" as const, // Proper type for ShopItem
    collection: "EVRGRN",
    isFeatured: false,
    isAvailable: product.synced > 0,
    isNew: true,
    currency: "EUR",
    variations: variants.map((v, index) => ({
      id: `${product.id}-${v.id}`,
      name: extractSize(v.name),
      price: parseFloat(v.retail_price),
      image: v.product?.image || product.thumbnail_url,
      isAvailable: v.synced
    })),
    // Store Printful-specific data separately
    printfulId: product.id,
    printfulVariants: variants
  };
}

/**
 * Extract size from variant name (e.g., "Product Name / S" -> "S")
 */
function extractSize(variantName: string): string {
  const sizeMatch = variantName.match(/\/ (S|M|L|XL|2XL|3XL|XS)$/);
  return sizeMatch ? sizeMatch[1] : 'ONE SIZE';
}

/**
 * Create order in Printful
 */
export async function createPrintfulOrder(orderData: any) {
  try {
    const response = await fetch(
      `${PRINTFUL_API_BASE}/orders?store_id=${PRINTFUL_STORE_ID}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      }
    );

    if (!response.ok) {
      throw new Error(`Printful API error: ${response.status}`);
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error creating Printful order:', error);
    throw error;
  }
}
