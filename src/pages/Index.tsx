import { Hero } from '@/components/Hero';
import { ProductGrid } from '@/components/ProductGrid';
import { Truck, Shield, CreditCard, Headphones } from 'lucide-react';
import { themeConfig } from '@/config';
import { sampleProducts } from '@/data/products';

// Icon mapping for dynamic features
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Truck,
  Shield,
  CreditCard,
  Headphones,
};

export function IndexPage() {
  return (
    <div>
      {/* Hero Section */}
      <Hero
        title={themeConfig.hero.title}
        subtitle={themeConfig.hero.subtitle}
        ctaText={themeConfig.hero.ctaText}
        ctaLink={themeConfig.hero.ctaLink}
      />

      {/* Features */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {themeConfig.features.map((feature, index) => {
              const IconComponent = iconMap[feature.icon] || Shield;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex p-3 bg-primary-100 rounded-xl mb-3">
                    <IconComponent className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              );
            })}
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
