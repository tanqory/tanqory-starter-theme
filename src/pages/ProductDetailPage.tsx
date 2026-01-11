import { useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Container } from '../components/layout/Container';
import { ProductGallery } from '../components/product/ProductGallery';
import { ProductInfo } from '../components/product/ProductInfo';
import { FeaturedProducts } from '../components/sections/FeaturedProducts';
import { getProductBySlug, getFeaturedProducts } from '../data/products';
import { useCartStore } from '../stores/cart';
import type { Product } from '../types/product';

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const addItem = useCartStore((state) => state.addItem);

  const product = slug ? getProductBySlug(slug) : undefined;
  const relatedProducts = getFeaturedProducts(4);

  const handleAddToCart = (product: Product, quantity: number) => {
    addItem(product, quantity);
  };

  if (!product) {
    return (
      <Layout>
        <Container className="py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">ไม่พบสินค้า</h1>
          <p className="text-gray-600 mb-8">สินค้าที่คุณค้นหาไม่มีอยู่ในระบบ</p>
          <Link
            to="/products"
            className="text-primary-600 hover:text-primary-700"
          >
            ← กลับไปหน้าสินค้าทั้งหมด
          </Link>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container className="py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-gray-700">
            หน้าแรก
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/products" className="hover:text-gray-700">
            สินค้า
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">{product.name}</span>
        </nav>

        {/* Product Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <ProductGallery images={product.images} productName={product.name} />
          <ProductInfo product={product} onAddToCart={handleAddToCart} />
        </div>
      </Container>

      {/* Related Products */}
      <FeaturedProducts
        title="สินค้าที่คุณอาจชอบ"
        products={relatedProducts}
        showViewAll={false}
      />
    </Layout>
  );
}
