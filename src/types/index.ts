/**
 * Shared Types
 */

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  description?: string;
  category?: string;
  inStock?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface NavItem {
  name: string;
  href: string;
  children?: NavItem[];
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  line?: string;
  twitter?: string;
  youtube?: string;
}
