import { Link } from 'react-router-dom';
import { Container } from '../layout/Container';
import type { Category } from '../../types/product';

export interface CategoriesProps {
  title?: string;
  subtitle?: string;
  categories: Category[];
  columns?: 2 | 3 | 4 | 6;
}

export function Categories({
  title = 'หมวดหมู่สินค้า',
  subtitle = 'เลือกดูสินค้าตามหมวดหมู่ที่คุณสนใจ',
  categories,
  columns = 4,
}: CategoriesProps) {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
  };

  return (
    <section className="py-16 bg-gray-50">
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
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.slug}`}
              className="group relative aspect-square rounded-xl overflow-hidden bg-gray-200"
            >
              {category.image && (
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="font-semibold text-lg">{category.name}</h3>
                {category.productCount !== undefined && (
                  <p className="text-sm text-white/80">{category.productCount} สินค้า</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
