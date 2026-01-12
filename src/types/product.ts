// Re-export Product from APIs for consistency
export type { Product, ProductImage, ProductVariant, ProductOption } from '../apis/ProductsApi';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  productCount: number;
}

export interface ProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  search?: string;
  sortBy?: 'price-asc' | 'price-desc' | 'name' | 'newest';
}
