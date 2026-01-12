import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

// =============================================================================
// Types
// =============================================================================

export interface RecommendedProduct {
  id: string;
  title: string;
  handle: string;
  price: number;
  compareAtPrice?: number;
  image?: string;
}

export interface ProductRecommendationsProps {
  // Content
  title?: string;
  products?: RecommendedProduct[];
  productId?: string;

  // Layout
  columns?: number;
  sectionWidth?: 'page' | 'full';
  gap?: number;

  // Appearance
  colorScheme?: 'light' | 'dark';

  // Spacing
  paddingTop?: number;
  paddingBottom?: number;
}

// =============================================================================
// Component
// =============================================================================

export function ProductRecommendations({
  title = 'You may also like',
  products = [],
  columns = 4,
  sectionWidth = 'page',
  gap = 24,
  colorScheme = 'light',
  paddingTop = 48,
  paddingBottom = 48,
}: ProductRecommendationsProps) {
  // Default products if empty
  const displayProducts: RecommendedProduct[] = products.length > 0 ? products : [
    { id: '1', title: 'Recommended 1', handle: 'rec-1', price: 1990 },
    { id: '2', title: 'Recommended 2', handle: 'rec-2', price: 2490 },
    { id: '3', title: 'Recommended 3', handle: 'rec-3', price: 1290 },
    { id: '4', title: 'Recommended 4', handle: 'rec-4', price: 3990 },
  ];

  return (
    <section
      className={cn(
        colorScheme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      )}
      style={{
        paddingTop: `${paddingTop}px`,
        paddingBottom: `${paddingBottom}px`,
      }}
    >
      <div className={cn(
        sectionWidth === 'page' ? 'container mx-auto px-4' : 'px-4'
      )}>
        {/* Header */}
        {title && (
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">{title}</h2>
        )}

        {/* Grid */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            gap: `${gap}px`,
          }}
        >
          {displayProducts.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.handle}`}
              className="group"
            >
              <div className="flex flex-col gap-3">
                {/* Image */}
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
                  )}
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-medium group-hover:underline">
                    {product.title}
                  </h3>
                  <p className="mt-1">฿{product.price.toLocaleString()}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// Section Definition (for Studio)
// =============================================================================

export const productRecommendationsDefinition = {
  id: 'product-recommendations',
  name: 'Product Recommendations',
  description: 'Recommended products based on current product',
  category: 'products',
  icon: 'Sparkles',

  propsSchema: [
    // Content
    { type: 'header', label: 'Content' },
    { name: 'title', label: 'Title', type: 'text', default: 'You may also like' },
    { name: 'productId', label: 'Source Product', type: 'product' },

    // Layout
    { type: 'header', label: 'Layout' },
    { name: 'columns', label: 'Columns', type: 'range', min: 2, max: 6, default: 4 },
    {
      name: 'sectionWidth',
      label: 'Width',
      type: 'select',
      options: [
        { value: 'page', label: 'Page Width' },
        { value: 'full', label: 'Full Width' },
      ],
      default: 'page'
    },
    { name: 'gap', label: 'Gap', type: 'range', min: 8, max: 48, default: 24 },

    // Appearance
    { type: 'header', label: 'Appearance' },
    {
      name: 'colorScheme',
      label: 'Color Scheme',
      type: 'select',
      options: [
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
      ],
      default: 'light'
    },

    // Spacing
    { type: 'header', label: 'Spacing' },
    { name: 'paddingTop', label: 'Top Padding', type: 'range', min: 0, max: 100, default: 48 },
    { name: 'paddingBottom', label: 'Bottom Padding', type: 'range', min: 0, max: 100, default: 48 },
  ],

  defaultProps: {
    title: 'You may also like',
    columns: 4,
    colorScheme: 'light',
  },

  component: ProductRecommendations,
};
