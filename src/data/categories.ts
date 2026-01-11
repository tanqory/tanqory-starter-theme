import type { Category } from '../types/product';

export const categories: Category[] = [
  {
    id: '1',
    name: 'เสื้อผ้า',
    slug: 'clothing',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500',
    productCount: 24,
  },
  {
    id: '2',
    name: 'รองเท้า',
    slug: 'shoes',
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500',
    productCount: 18,
  },
  {
    id: '3',
    name: 'กระเป๋า',
    slug: 'bags',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    productCount: 12,
  },
  {
    id: '4',
    name: 'เครื่องประดับ',
    slug: 'accessories',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500',
    productCount: 30,
  },
  {
    id: '5',
    name: 'นาฬิกา',
    slug: 'watches',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    productCount: 8,
  },
  {
    id: '6',
    name: 'แว่นตา',
    slug: 'eyewear',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500',
    productCount: 15,
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
