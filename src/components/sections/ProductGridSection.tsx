// =============================================================================
// Product Grid Section (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme, SectionStyles } from '../../themes';
import { ContainerBlock } from '../blocks/ContainerBlock';
import { HeadingBlock } from '../blocks/HeadingBlock';
import { GridBlock } from '../blocks/GridBlock';
import { ProductCardBlock } from '../blocks/ProductCardBlock';
import { FiltersBlock, Filter, ActiveFilters } from '../blocks/FiltersBlock';
import { PaginationBlock } from '../blocks/PaginationBlock';
import { FetchProducts } from '../../apis/ProductsApi';
import type { Product, ProductsParams } from '../../apis/ProductsApi';
import { useLivePreviewProps } from '../../hooks';

// =============================================================================
// Types
// =============================================================================

export interface ProductGridSectionProps {
  title?: string;
  /** Direct products data (skip API fetch) */
  products?: Product[];
  /** Collection handle for auto-fetch */
  collectionHandle?: string;
  /** Product handles for manual selection */
  productHandles?: string[];
  /** Products per page */
  limit?: number;
  /** Sort key */
  sortKey?: ProductsParams['sortKey'];
  filters?: Filter[];
  activeFilters?: ActiveFilters;
  columns?: number | { mobile: number; tablet: number; desktop: number };
  imageRatio?: 'adapt' | 'portrait' | 'square' | 'landscape';
  showVendor?: boolean;
  showFilters?: boolean;
  showPagination?: boolean;
  currentPage?: number;
  totalPages?: number;
  loading?: boolean;
  onProductClick?: (product: Product) => void;
  onFilterChange?: (filters: ActiveFilters) => void;
  onClearFilters?: () => void;
  onPageChange?: (page: number) => void;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const ProductGridSectionSchema = {
  name: 'Product Grid',
  tag: 'section',
  settings: [
    {
      type: 'header',
      content: 'Data Source',
    },
    {
      id: 'collection',
      type: 'collection',
      label: 'Collection',
    },
    {
      id: 'limit',
      type: 'range',
      label: 'Products per page',
      min: 4,
      max: 48,
      step: 4,
      default: 12,
    },
    {
      id: 'sortKey',
      type: 'select',
      label: 'Sort by',
      options: [
        { value: 'BEST_SELLING', label: 'Best selling' },
        { value: 'CREATED_AT', label: 'Date, new to old' },
        { value: 'PRICE', label: 'Price, low to high' },
        { value: 'TITLE', label: 'Alphabetically, A-Z' },
      ],
      default: 'BEST_SELLING',
    },
    {
      type: 'header',
      content: 'Layout',
    },
    {
      id: 'columns_desktop',
      type: 'range',
      label: 'Columns (Desktop)',
      min: 2,
      max: 6,
      step: 1,
      default: 4,
    },
    {
      id: 'columns_mobile',
      type: 'range',
      label: 'Columns (Mobile)',
      min: 1,
      max: 3,
      step: 1,
      default: 2,
    },
    {
      type: 'header',
      content: 'Product Card',
    },
    {
      id: 'imageRatio',
      type: 'select',
      label: 'Image ratio',
      options: [
        { value: 'adapt', label: 'Adapt to image' },
        { value: 'portrait', label: 'Portrait (3:4)' },
        { value: 'square', label: 'Square (1:1)' },
        { value: 'landscape', label: 'Landscape (4:3)' },
      ],
      default: 'portrait',
    },
    {
      id: 'showVendor',
      type: 'checkbox',
      label: 'Show vendor',
      default: false,
    },
    {
      type: 'header',
      content: 'Features',
    },
    {
      id: 'showFilters',
      type: 'checkbox',
      label: 'Show filters',
      default: true,
    },
    {
      id: 'showPagination',
      type: 'checkbox',
      label: 'Show pagination',
      default: true,
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function ProductGridSection(props: ProductGridSectionProps) {
  // Enable live preview updates from Studio Editor
  const liveProps = useLivePreviewProps('ProductGridSection', props);

  const {
    title,
    products: providedProducts,
    collectionHandle,
    productHandles,
    limit = 12,
    sortKey = 'BEST_SELLING',
    filters = [],
    activeFilters = {},
    columns = { mobile: 2, tablet: 3, desktop: 4 },
    imageRatio = 'portrait',
    showVendor = false,
    showFilters = true,
    showPagination = true,
    currentPage = 1,
    totalPages = 1,
    loading: externalLoading = false,
    onProductClick,
    onFilterChange,
    onClearFilters,
    onPageChange,
    className,
  } = liveProps;

  const theme = TanqoryTheme;
  const sectionStyles = SectionStyles(theme);

  const sectionStyle: React.CSSProperties = {
    ...sectionStyles.base,
    backgroundColor: theme.colors.background,
  };

  const layoutStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: showFilters && filters.length > 0 ? '250px 1fr' : '1fr',
    gap: theme.spacing['2xl'],
  };

  const gridColumns = typeof columns === 'number' ? columns : columns.desktop;

  // Render grid content
  const renderGridContent = (products: Product[], loading: boolean) => (
    <>
      {loading ? (
        // Loading skeleton
        <GridBlock columns={columns} gap={24}>
          {Array.from({ length: gridColumns * 2 }, (_, i) => (
            <ProductCardBlock key={i} imageRatio={imageRatio} />
          ))}
        </GridBlock>
      ) : products.length === 0 ? (
        // Empty state
        <div
          style={{
            textAlign: 'center',
            padding: theme.spacing['3xl'],
          }}
        >
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke={theme.colors.foregroundMuted}
            strokeWidth="1.5"
            style={{ marginBottom: theme.spacing.md }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <h3
            style={{
              fontSize: theme.typography.fontSize.lg,
              fontWeight: theme.typography.fontWeight.medium,
              color: theme.colors.foreground,
              margin: 0,
              marginBottom: theme.spacing.xs,
            }}
          >
            No products found
          </h3>
          <p
            style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.foregroundSecondary,
              margin: 0,
            }}
          >
            Try adjusting your filters or search terms
          </p>
        </div>
      ) : (
        // Products grid
        <GridBlock columns={columns} gap={24}>
          {products.map((product) => (
            <ProductCardBlock
              key={product.id}
              product={product}
              imageRatio={imageRatio}
              showVendor={showVendor}
              onClick={() => onProductClick?.(product)}
            />
          ))}
        </GridBlock>
      )}

      {/* Pagination */}
      {showPagination && totalPages > 1 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: theme.spacing['2xl'],
          }}
        >
          <PaginationBlock
            currentPage={currentPage}
            totalPages={totalPages}
            showPrevNext
            onPageChange={onPageChange}
          />
        </div>
      )}
    </>
  );

  // Full section content
  const renderContent = (products: Product[], loading: boolean) => (
    <>
      {/* Title */}
      {title && (
        <div style={{ marginBottom: theme.spacing['2xl'] }}>
          <HeadingBlock text={title} level="h1" />
        </div>
      )}

      <div style={layoutStyle}>
        {/* Filters Sidebar */}
        {showFilters && filters.length > 0 && (
          <aside className="filters-sidebar">
            <FiltersBlock
              filters={filters}
              activeFilters={activeFilters}
              layout="vertical"
              collapsible
              showCounts
              showClearAll
              onFilterChange={onFilterChange}
              onClearAll={onClearFilters}
            />
          </aside>
        )}

        {/* Products Grid */}
        <div>{renderGridContent(products, loading)}</div>
      </div>

      {/* Responsive styles */}
      <style>
        {`
          @media (max-width: ${theme.breakpoints.md}) {
            .filters-sidebar {
              display: none;
            }
          }
        `}
      </style>
    </>
  );

  return (
    <section data-section="ProductGridSection" style={sectionStyle} className={className}>
      <ContainerBlock>
        {providedProducts ? (
          // Use provided products directly
          renderContent(providedProducts, externalLoading)
        ) : collectionHandle ? (
          // Auto-fetch from collection
          <FetchProducts collection={collectionHandle} limit={limit} sortKey={sortKey}>
            {({ loading, data, error }) => {
              if (error) {
                return renderContent([], false);
              }
              return renderContent(data || [], loading);
            }}
          </FetchProducts>
        ) : (
          // No data source - show empty
          renderContent([], externalLoading)
        )}
      </ContainerBlock>
    </section>
  );
}

export default ProductGridSection;
