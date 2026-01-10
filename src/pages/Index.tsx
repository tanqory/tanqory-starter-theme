import { Hero } from '@/components/Hero';
import { ProductGrid } from '@/components/ProductGrid';
import { Truck, Shield, CreditCard, Headphones } from 'lucide-react';

// Sample products - AI will customize these
const sampleProducts = [
  {
    id: '1',
    name: 'สินค้าตัวอย่าง 1',
    price: 590,
    originalPrice: 790,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    badge: 'ขายดี',
  },
  {
    id: '2',
    name: 'สินค้าตัวอย่าง 2',
    price: 1290,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
  },
  {
    id: '3',
    name: 'สินค้าตัวอย่าง 3',
    price: 890,
    originalPrice: 1190,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
  },
  {
    id: '4',
    name: 'สินค้าตัวอย่าง 4',
    price: 2490,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop',
    badge: 'ใหม่',
  },
];

const features = [
  {
    icon: Truck,
    title: 'จัดส่งฟรี',
    description: 'เมื่อสั่งซื้อครบ 500 บาท',
  },
  {
    icon: Shield,
    title: 'สินค้าคุณภาพ',
    description: 'รับประกันสินค้าทุกชิ้น',
  },
  {
    icon: CreditCard,
    title: 'ชำระเงินปลอดภัย',
    description: 'รองรับทุกช่องทาง',
  },
  {
    icon: Headphones,
    title: 'บริการ 24/7',
    description: 'ทีมงานพร้อมช่วยเหลือ',
  },
];

export function IndexPage() {
  return (
    <div>
      {/* Hero Section */}
      <Hero
        title="ยินดีต้อนรับสู่ร้านค้าของเรา"
        subtitle="สินค้าคุณภาพ ราคาดี ส่งไวทั่วไทย พร้อมโปรโมชั่นพิเศษมากมาย"
        ctaText="เลือกซื้อสินค้า"
        ctaLink="/products"
      />

      {/* Features */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex p-3 bg-primary-100 rounded-xl mb-3">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <ProductGrid title="สินค้าแนะนำ" products={sampleProducts} />

      {/* Banner */}
      <section className="py-12 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            โปรโมชั่นพิเศษ!
          </h2>
          <p className="text-lg text-primary-100 mb-6">
            ลดสูงสุด 50% เฉพาะเดือนนี้เท่านั้น
          </p>
          <a
            href="/products"
            className="inline-flex items-center justify-center h-12 px-8 bg-white text-primary-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            ดูสินค้าลดราคา
          </a>
        </div>
      </section>

      {/* New Arrivals */}
      <ProductGrid title="สินค้ามาใหม่" products={sampleProducts.slice(0, 4)} />
    </div>
  );
}
