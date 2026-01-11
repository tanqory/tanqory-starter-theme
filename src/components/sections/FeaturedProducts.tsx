import { Link } from 'react-router-dom';
import { Container } from '../layout/Container';
import { ProductCard } from '../product/ProductCard';
import { Button } from '../ui/Button';
import type { Product } from '../../types/product';

export interface FeaturedProductsProps {
  title?: string;
  subtitle?: string;
  products: Product[];
  showViewAll?: boolean;
  viewAllLink?: string;
  columns?: 2 | 3 | 4;
}

export function FeaturedProducts({
  title = 'สินค้าแนะนำ',
  subtitle = 'สินค้ายอดนิยมที่คุณไม่ควรพลาด',
  products,
  showViewAll = true,
  viewAllLink = '/products',
  columns = 4,
}: FeaturedProductsProps) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className={`grid ${gridCols[columns]} gap-6`}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {showViewAll && (
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link to={viewAllLink}>ดูสินค้าทั้งหมด</Link>
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}
