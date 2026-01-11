import { Layout } from '../components/layout/Layout';
import { Hero } from '../components/sections/Hero';
import { FeaturedProducts } from '../components/sections/FeaturedProducts';
import { Categories } from '../components/sections/Categories';
import { Testimonials } from '../components/sections/Testimonials';
import { Newsletter } from '../components/sections/Newsletter';
import { getFeaturedProducts } from '../data/products';
import { categories } from '../data/categories';
import { testimonials } from '../data/testimonials';
import { useCartStore } from '../stores/cart';
import type { Product } from '../types/product';

export function HomePage() {
  const addItem = useCartStore((state) => state.addItem);
  const featuredProducts = getFeaturedProducts(8);

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
  };

  return (
    <Layout>
      <Hero
        title="ยินดีต้อนรับสู่ร้านค้าของเรา"
        subtitle="ค้นพบสินค้าคุณภาพที่คัดสรรมาเพื่อคุณโดยเฉพาะ ด้วยราคาที่คุ้มค่า"
        ctaText="เลือกซื้อสินค้า"
        ctaLink="/products"
        secondaryCtaText="ดูหมวดหมู่"
        secondaryCtaLink="/categories"
      />

      <FeaturedProducts
        title="สินค้าแนะนำ"
        subtitle="สินค้ายอดนิยมที่คุณไม่ควรพลาด"
        products={featuredProducts}
        onAddToCart={handleAddToCart}
      />

      <Categories
        title="หมวดหมู่สินค้า"
        subtitle="เลือกดูสินค้าตามหมวดหมู่ที่คุณสนใจ"
        categories={categories}
        columns={3}
      />

      <Testimonials
        title="รีวิวจากลูกค้า"
        subtitle="ความคิดเห็นจากลูกค้าที่ไว้วางใจเรา"
        testimonials={testimonials.slice(0, 3)}
        columns={3}
      />

      <Newsletter
        title="สมัครรับข่าวสาร"
        subtitle="รับโปรโมชั่นและข่าวสารสินค้าใหม่ก่อนใคร"
        backgroundColor="primary"
      />
    </Layout>
  );
}
