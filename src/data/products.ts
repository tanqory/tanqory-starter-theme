/**
 * Sample Products Data
 * AI จะแก้ไขไฟล์นี้เพื่อเพิ่ม/แก้ไขสินค้าตามประเภทธุรกิจ
 */

import { Product } from '@/types';

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'สินค้าตัวอย่าง 1',
    price: 590,
    originalPrice: 790,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    badge: 'ขายดี',
    category: 'featured',
  },
  {
    id: '2',
    name: 'สินค้าตัวอย่าง 2',
    price: 1290,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    category: 'new',
  },
  {
    id: '3',
    name: 'สินค้าตัวอย่าง 3',
    price: 890,
    originalPrice: 1190,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
    category: 'sale',
  },
  {
    id: '4',
    name: 'สินค้าตัวอย่าง 4',
    price: 2490,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop',
    badge: 'ใหม่',
    category: 'new',
  },
];

export const featuredProducts = sampleProducts.filter(p => p.badge === 'ขายดี' || p.category === 'featured');
export const newProducts = sampleProducts.filter(p => p.badge === 'ใหม่' || p.category === 'new');
export const saleProducts = sampleProducts.filter(p => p.originalPrice && p.originalPrice > p.price);
