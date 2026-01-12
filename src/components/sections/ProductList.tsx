import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

// =============================================================================
// Types
// =============================================================================

export interface Product {
  id: string;
  title: string;
  handle: string;
  price: number;
  compareAtPrice?: number;
  image?: string;
  vendor?: string;
}

export interface ProductListProps {
  // Content
  title?: string;
  products?: Product[];
  collection?: string;

  // Layout
  columns?: number;
  mobileColumns?: 1 | 2;
  sectionWidth?: 'page' | 'full';
  gap?: number;

  // Display
  showVendor?: boolean;
  showComparePrice?: boolean;

  // Appearance
  colorScheme?: 'light' | 'dark';

  // Spacing
  paddingTop?: number;
  paddingBottom?: number;
}

// =============================================================================
// Product Card Component
// =============================================================================

function ProductCard({
  product,
  showVendor,
  showComparePrice,
}: {
  product: Product;
  showVendor?: boolean;
  showComparePrice?: boolean;
}) {
  const hasDiscount = showComparePrice && product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <Link to={`/products/${product.handle}`} className="group">
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
        <div className="flex flex-col gap-1">
          {showVendor && product.vendor && (
            <p className="text-xs uppercase tracking-wide opacity-60">
              {product.vendor}
            </p>
          )}
          <h3 className="font-medium group-hover:underline">
            {product.title}
          </h3>
          <div className="flex items-center gap-2">
            <span className={cn(hasDiscount && 'text-red-600')}>
              ฿{product.price.toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-sm line-through opacity-60">
                ฿{product.compareAtPrice!.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

// =============================================================================
// Component
// =============================================================================

export function ProductList({
  // Content
  title,
  products = [],

  // Layout
  columns = 4,
  mobileColumns = 2,
  sectionWidth = 'page',
  gap = 24,

  // Display
  showVendor = false,
  showComparePrice = true,

  // Appearance
  colorScheme = 'light',

  // Spacing
  paddingTop = 48,
  paddingBottom = 48,
}: ProductListProps) {
  // Default products if empty
  const displayProducts: Product[] = products.length > 0 ? products : [
    { id: '1', title: 'Product 1', handle: 'product-1', price: 1990 },
    { id: '2', title: 'Product 2', handle: 'product-2', price: 2490, compareAtPrice: 2990 },
    { id: '3', title: 'Product 3', handle: 'product-3', price: 1290 },
    { id: '4', title: 'Product 4', handle: 'product-4', price: 3990 },
  ];

  return (
    <section
      className={cn(
        colorScheme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
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
            <ProductCard
              key={product.id}
              product={product}
              showVendor={showVendor}
              showComparePrice={showComparePrice}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// Section Definition (for Studio)
// =============================================================================

export const productListDefinition = {
  id: 'product-list',
  name: 'Product List',
  description: 'Grid of products from a collection',
  category: 'products',
  icon: 'ShoppingBag',

  propsSchema: [
    // Content
    { type: 'header', label: 'Content' },
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'collection', label: 'Collection', type: 'collection' },

    // Layout
    { type: 'header', label: 'Layout' },
    { name: 'columns', label: 'Columns', type: 'range', min: 2, max: 6, default: 4 },
    {
      name: 'mobileColumns',
      label: 'Mobile Columns',
      type: 'select',
      options: [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
      ],
      default: 2
    },
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

    // Display
    { type: 'header', label: 'Display' },
    { name: 'showVendor', label: 'Show Vendor', type: 'checkbox', default: false },
    { name: 'showComparePrice', label: 'Show Compare Price', type: 'checkbox', default: true },

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
    columns: 4,
    mobileColumns: 2,
    showComparePrice: true,
    colorScheme: 'light',
  },

  component: ProductList,
};
