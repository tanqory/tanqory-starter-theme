/**
 * Theme Configuration
 * AI จะแก้ไขไฟล์นี้เพื่อปรับแต่ง theme ตาม prompt ของ user
 */

export const themeConfig = {
  // ข้อมูลร้านค้า
  store: {
    name: 'My Store',
    tagline: 'สินค้าคุณภาพ ราคาดี',
    logo: '/logo.svg',
    favicon: '/favicon.ico',
  },

  // สีหลัก (Tailwind CSS)
  colors: {
    primary: 'violet', // violet, blue, green, red, orange, pink
    accent: 'amber',
  },

  // Navigation
  navigation: [
    { name: 'หน้าแรก', href: '/' },
    { name: 'สินค้า', href: '/products' },
    { name: 'เกี่ยวกับเรา', href: '/about' },
    { name: 'ติดต่อ', href: '/contact' },
  ],

  // Hero Section
  hero: {
    title: 'ยินดีต้อนรับสู่ร้านค้าของเรา',
    subtitle: 'สินค้าคุณภาพ ราคาดี ส่งไวทั่วไทย พร้อมโปรโมชั่นพิเศษมากมาย',
    backgroundImage: '',
    ctaText: 'เลือกซื้อสินค้า',
    ctaLink: '/products',
  },

  // Features Section
  features: [
    {
      icon: 'Truck',
      title: 'จัดส่งฟรี',
      description: 'เมื่อสั่งซื้อครบ 500 บาท',
    },
    {
      icon: 'Shield',
      title: 'สินค้าคุณภาพ',
      description: 'รับประกันสินค้าทุกชิ้น',
    },
    {
      icon: 'CreditCard',
      title: 'ชำระเงินปลอดภัย',
      description: 'รองรับทุกช่องทาง',
    },
    {
      icon: 'Headphones',
      title: 'บริการ 24/7',
      description: 'ทีมงานพร้อมช่วยเหลือ',
    },
  ],

  // Footer
  footer: {
    copyright: '© 2024 My Store. All rights reserved.',
    socialLinks: {
      facebook: '',
      instagram: '',
      line: '',
    },
  },

  // SEO
  seo: {
    title: 'My Store - ร้านค้าออนไลน์',
    description: 'ร้านค้าออนไลน์คุณภาพ สินค้าดี ราคาถูก ส่งไวทั่วไทย',
    keywords: ['ร้านค้าออนไลน์', 'สินค้า', 'ช้อปปิ้ง'],
  },
};

export type ThemeConfig = typeof themeConfig;
