// =============================================================================
// Recently Viewed Section (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme, SectionStyles } from '../../themes';
import { ContainerBlock } from '../blocks/ContainerBlock';
import { HeadingBlock } from '../blocks/HeadingBlock';
import { TextBlock } from '../blocks/TextBlock';
import { CarouselBlock } from '../blocks/CarouselBlock';
import { ProductCardBlock } from '../blocks/ProductCardBlock';
import { useGlobalVariable } from '../../config/GlobalVariableContext';
import type { Product } from '../../apis';

// =============================================================================
// Types
// =============================================================================

export interface RecentlyViewedSectionProps {
  title?: string;
  description?: string;
  maxProducts?: number;
  columns?: 2 | 3 | 4 | 5 | 6;
  layout?: 'grid' | 'carousel';
  showPrice?: boolean;
  showCompareAtPrice?: boolean;
  backgroundColor?: string;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const RecentlyViewedSectionSchema = {
  name: 'Recently Viewed',
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
      default: 'Recently Viewed',
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
      id: 'maxProducts',
      type: 'range',
      label: 'Maximum products',
      min: 2,
      max: 12,
      step: 1,
      default: 6,
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
      max: 6,
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
      id: 'backgroundColor',
      type: 'color',
      label: 'Background color',
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function RecentlyViewedSection({
  title = 'Recently Viewed',
  description,
  maxProducts = 6,
  columns = 4,
  layout = 'carousel',
  showPrice = true,
  showCompareAtPrice = true,
  backgroundColor,
  className,
}: RecentlyViewedSectionProps) {
  const theme = TanqoryTheme;
  const sectionStyles = SectionStyles(theme);
  const { RECENTLY_VIEWED_PRODUCTS } = useGlobalVariable();

  // Get recently viewed products from global state
  const recentProducts = (RECENTLY_VIEWED_PRODUCTS || []).slice(0, maxProducts) as Product[];

  // Don't render if no products
  if (recentProducts.length === 0) {
    return null;
  }

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

  const productCards = recentProducts.map((product) => (
    <ProductCardBlock
      key={product.id}
      product={product}
      showPrice={showPrice}
      showCompareAtPrice={showCompareAtPrice}
    />
  ));

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
        {layout === 'carousel' ? (
          <CarouselBlock
            slidesPerView={columns}
            gap={24}
            showArrows
            showDots
          >
            {productCards}
          </CarouselBlock>
        ) : (
          <div style={gridStyle} className="recently-viewed-grid">
            {productCards}
          </div>
        )}

        {/* Responsive styles */}
        <style>
          {`
            @media (max-width: ${theme.breakpoints.lg}) {
              .recently-viewed-grid {
                grid-template-columns: repeat(${Math.min(columns, 3)}, 1fr) !important;
              }
            }
            @media (max-width: ${theme.breakpoints.md}) {
              .recently-viewed-grid {
                grid-template-columns: repeat(2, 1fr) !important;
              }
            }
            @media (max-width: ${theme.breakpoints.sm}) {
              .recently-viewed-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}
        </style>
      </ContainerBlock>
    </section>
  );
}

export default RecentlyViewedSection;
