// =============================================================================
// Related Products Section (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme, SectionStyles } from '../../themes';
import { ContainerBlock } from '../blocks/ContainerBlock';
import { HeadingBlock } from '../blocks/HeadingBlock';
import { TextBlock } from '../blocks/TextBlock';
import { CarouselBlock } from '../blocks/CarouselBlock';
import { ProductCardBlock } from '../blocks/ProductCardBlock';
import { FetchProducts } from '../../apis';
import type { Product } from '../../apis';

// =============================================================================
// Types
// =============================================================================

export interface RelatedProductsSectionProps {
  title?: string;
  description?: string;
  productId?: string;
  collection?: string;
  maxProducts?: number;
  columns?: 2 | 3 | 4 | 5;
  layout?: 'grid' | 'carousel';
  showPrice?: boolean;
  showCompareAtPrice?: boolean;
  showQuickAdd?: boolean;
  backgroundColor?: string;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const RelatedProductsSectionSchema = {
  name: 'Related Products',
  tag: 'section',
  settings: [
    {
      type: 'header',
      content: 'Content',
    },
    {
      id: 'title',
      type: 'text',
      label: 'Title',
      default: 'You May Also Like',
    },
    {
      id: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      type: 'header',
      content: 'Products',
    },
    {
      id: 'productId',
      type: 'text',
      label: 'Related to product ID',
      info: 'Leave empty to use current product',
    },
    {
      id: 'collectionHandle',
      type: 'text',
      label: 'Or from collection',
    },
    {
      id: 'maxProducts',
      type: 'range',
      label: 'Maximum products',
      min: 2,
      max: 12,
      step: 1,
      default: 4,
    },
    {
      type: 'header',
      content: 'Layout',
    },
    {
      id: 'layout',
      type: 'select',
      label: 'Layout',
      options: [
        { value: 'grid', label: 'Grid' },
        { value: 'carousel', label: 'Carousel' },
      ],
      default: 'carousel',
    },
    {
      id: 'columns',
      type: 'range',
      label: 'Columns',
      min: 2,
      max: 5,
      step: 1,
      default: 4,
    },
    {
      type: 'header',
      content: 'Product Card',
    },
    {
      id: 'showPrice',
      type: 'checkbox',
      label: 'Show price',
      default: true,
    },
    {
      id: 'showComparePrice',
      type: 'checkbox',
      label: 'Show compare price',
      default: true,
    },
    {
      id: 'showRating',
      type: 'checkbox',
      label: 'Show rating',
      default: false,
    },
    {
      id: 'showQuickAdd',
      type: 'checkbox',
      label: 'Show quick add button',
      default: true,
    },
    {
      id: 'backgroundColor',
      type: 'color',
      label: 'Background color',
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function RelatedProductsSection({
  title = 'You May Also Like',
  description,
  productId,
  collection,
  maxProducts = 4,
  columns = 4,
  layout = 'carousel',
  showPrice = true,
  showCompareAtPrice = true,
  showQuickAdd = true,
  backgroundColor,
  className,
}: RelatedProductsSectionProps) {
  const theme = TanqoryTheme;
  const sectionStyles = SectionStyles(theme);

  const sectionStyle: React.CSSProperties = {
    ...sectionStyles.base,
    backgroundColor: backgroundColor || theme.colors.background,
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: theme.spacing['2xl'],
    gap: theme.spacing.sm,
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: theme.spacing.lg,
  };

  const renderProducts = (products: Product[]) => {
    // Filter out current product if productId is provided
    const filteredProducts = productId
      ? products.filter((p) => p.id !== productId).slice(0, maxProducts)
      : products.slice(0, maxProducts);

    const productCards = filteredProducts.map((product) => (
      <ProductCardBlock
        key={product.id}
        product={product}
        showPrice={showPrice}
        showCompareAtPrice={showCompareAtPrice}
      />
    ));

    if (layout === 'carousel') {
      return (
        <CarouselBlock
          slidesPerView={columns}
          gap={24}
          showArrows
          showDots
        >
          {productCards}
        </CarouselBlock>
      );
    }

    return (
      <div style={gridStyle} className="related-products-grid">
        {productCards}
      </div>
    );
  };

  return (
    <section style={sectionStyle} className={className}>
      <ContainerBlock>
        {/* Header */}
        {(title || description) && (
          <div style={headerStyle}>
            {title && <HeadingBlock text={title} level="h2" alignment="center" />}
            {description && (
              <TextBlock
                text={description}
                preset="body"
                alignment="center"
                maxWidth="60"
              />
            )}
          </div>
        )}

        {/* Products */}
        <FetchProducts
          collection={collection}
          limit={maxProducts + 1} // +1 to account for filtering out current product
        >
          {({ data, loading, error }) => {
            if (loading) {
              return (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    gap: theme.spacing.lg,
                  }}
                >
                  {Array.from({ length: columns }).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                  ))}
                </div>
              );
            }

            if (error || !data?.length) {
              return null;
            }

            return renderProducts(data);
          }}
        </FetchProducts>

        {/* Responsive styles */}
        <style>
          {`
            @media (max-width: ${theme.breakpoints.lg}) {
              .related-products-grid {
                grid-template-columns: repeat(${Math.min(columns, 3)}, 1fr) !important;
              }
            }
            @media (max-width: ${theme.breakpoints.md}) {
              .related-products-grid {
                grid-template-columns: repeat(2, 1fr) !important;
              }
            }
            @media (max-width: ${theme.breakpoints.sm}) {
              .related-products-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}
        </style>
      </ContainerBlock>
    </section>
  );
}

// =============================================================================
// Product Card Skeleton Component
// =============================================================================

function ProductCardSkeleton() {
  const theme = TanqoryTheme;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing.sm,
      }}
    >
      <div
        style={{
          width: '100%',
          paddingTop: '100%',
          backgroundColor: theme.colors.backgroundSecondary,
          borderRadius: theme.borderRadius.md,
        }}
      />
      <div
        style={{
          height: '16px',
          backgroundColor: theme.colors.backgroundSecondary,
          borderRadius: theme.borderRadius.sm,
          width: '80%',
        }}
      />
      <div
        style={{
          height: '14px',
          backgroundColor: theme.colors.backgroundSecondary,
          borderRadius: theme.borderRadius.sm,
          width: '40%',
        }}
      />
    </div>
  );
}

export default RelatedProductsSection;
