import type { Product } from '../apis';

export const products: Product[] = [
  {
    id: '1',
    title: 'เสื้อยืดคอกลม Basic',
    handle: 'basic-round-neck-tshirt',
    name: 'เสื้อยืดคอกลม Basic',
    slug: 'basic-round-neck-tshirt',
    description: 'เสื้อยืดคอกลมผ้าฝ้าย 100% นุ่มสบาย ใส่ได้ทุกโอกาส',
    price: 299,
    compareAtPrice: 399,
    images: [
      { id: '1-1', src: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500', altText: 'เสื้อยืดคอกลม Basic' },
      { id: '1-2', src: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500', altText: 'เสื้อยืดคอกลม Basic' },
    ],
    variants: [],
    productType: 'เสื้อผ้า',
    sku: 'TSH-001',
    availableForSale: true,
    isNew: true,
  },
  {
    id: '2',
    title: 'กางเกงยีนส์ขาเดฟ',
    handle: 'slim-fit-jeans',
    name: 'กางเกงยีนส์ขาเดฟ',
    slug: 'slim-fit-jeans',
    description: 'กางเกงยีนส์ขาเดฟ ผ้ายืดหยุ่นดี ใส่สบาย',
    price: 890,
    images: [
      { id: '2-1', src: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500', altText: 'กางเกงยีนส์ขาเดฟ' },
    ],
    variants: [],
    productType: 'เสื้อผ้า',
    sku: 'JNS-001',
    availableForSale: true,
  },
  {
    id: '3',
    title: 'รองเท้าผ้าใบ Sneaker',
    handle: 'casual-sneaker',
    name: 'รองเท้าผ้าใบ Sneaker',
    slug: 'casual-sneaker',
    description: 'รองเท้าผ้าใบสไตล์ casual ใส่สบายเท้า',
    price: 1290,
    compareAtPrice: 1590,
    images: [
      { id: '3-1', src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', altText: 'รองเท้าผ้าใบ Sneaker' },
    ],
    variants: [],
    productType: 'รองเท้า',
    sku: 'SHO-001',
    availableForSale: true,
    isNew: true,
  },
  {
    id: '4',
    title: 'กระเป๋าสะพายข้าง',
    handle: 'crossbody-bag',
    name: 'กระเป๋าสะพายข้าง',
    slug: 'crossbody-bag',
    description: 'กระเป๋าสะพายข้างหนัง PU คุณภาพดี',
    price: 599,
    images: [
      { id: '4-1', src: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500', altText: 'กระเป๋าสะพายข้าง' },
    ],
    variants: [],
    productType: 'กระเป๋า',
    sku: 'BAG-001',
    availableForSale: true,
  },
  {
    id: '5',
    title: 'นาฬิกาข้อมือ Minimalist',
    handle: 'minimalist-watch',
    name: 'นาฬิกาข้อมือ Minimalist',
    slug: 'minimalist-watch',
    description: 'นาฬิกาข้อมือดีไซน์เรียบง่าย สายหนังแท้',
    price: 1990,
    compareAtPrice: 2490,
    images: [
      { id: '5-1', src: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500', altText: 'นาฬิกาข้อมือ Minimalist' },
    ],
    variants: [],
    productType: 'เครื่องประดับ',
    sku: 'WAT-001',
    availableForSale: true,
  },
  {
    id: '6',
    title: 'หมวกแก๊ป Classic',
    handle: 'classic-cap',
    name: 'หมวกแก๊ป Classic',
    slug: 'classic-cap',
    description: 'หมวกแก๊ปผ้าฝ้ายคุณภาพดี ปรับขนาดได้',
    price: 350,
    images: [
      { id: '6-1', src: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500', altText: 'หมวกแก๊ป Classic' },
    ],
    variants: [],
    productType: 'เครื่องประดับ',
    sku: 'HAT-001',
    availableForSale: false,
  },
  {
    id: '7',
    title: 'แว่นกันแดด Aviator',
    handle: 'aviator-sunglasses',
    name: 'แว่นกันแดด Aviator',
    slug: 'aviator-sunglasses',
    description: 'แว่นกันแดดทรง Aviator คลาสสิค ป้องกัน UV400',
    price: 890,
    images: [
      { id: '7-1', src: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500', altText: 'แว่นกันแดด Aviator' },
    ],
    variants: [],
    productType: 'เครื่องประดับ',
    sku: 'SUN-001',
    availableForSale: true,
    isNew: true,
  },
  {
    id: '8',
    title: 'เข็มขัดหนังแท้',
    handle: 'genuine-leather-belt',
    name: 'เข็มขัดหนังแท้',
    slug: 'genuine-leather-belt',
    description: 'เข็มขัดหนังวัวแท้ หัวเข็มขัดโลหะ',
    price: 590,
    compareAtPrice: 790,
    images: [
      { id: '8-1', src: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=500', altText: 'เข็มขัดหนังแท้' },
    ],
    variants: [],
    productType: 'เครื่องประดับ',
    sku: 'BLT-001',
    availableForSale: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.handle === slug || p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.productType === category);
}

export function getFeaturedProducts(count = 4): Product[] {
  return products.slice(0, count);
}

export function getNewProducts(count = 4): Product[] {
  return products.filter((p) => p.isNew).slice(0, count);
}
