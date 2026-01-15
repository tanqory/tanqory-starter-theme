// =============================================================================
// Featured Collection Section (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme, SectionStyles } from '../../themes';
import { ContainerBlock } from '../blocks/ContainerBlock';
import { HeadingBlock } from '../blocks/HeadingBlock';
import { TextBlock } from '../blocks/TextBlock';
import { ButtonBlock } from '../blocks/ButtonBlock';
import { GridBlock } from '../blocks/GridBlock';
import { CarouselBlock } from '../blocks/CarouselBlock';
import { ProductCardBlock } from '../blocks/ProductCardBlock';
import { FetchProducts } from '../../apis/ProductsApi';
import type { Product } from '../../apis/ProductsApi';

// =============================================================================
// Types
// =============================================================================

export interface FeaturedCollectionSectionProps {
  title?: string;
  description?: string;
  collectionHandle?: string;
  products?: Product[];
  limit?: number;
  layout?: 'grid' | 'carousel';
  columns?: number | { mobile: number; tablet: number; desktop: number };
  showViewAll?: boolean;
  viewAllLink?: string;
  viewAllText?: string;
  imageRatio?: 'adapt' | 'portrait' | 'square' | 'landscape';
  showVendor?: boolean;
  onProductClick?: (product: Product) => void;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const FeaturedCollectionSectionSchema = {
  name: 'Featured Collection',
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
      default: 'Featured Products',
    },
    {
      id: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      id: 'collection',
      type: 'collection',
      label: 'Collection',
    },
    {
      id: 'limit',
      type: 'range',
      label: 'Products to show',
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
      default: 'grid',
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
      content: 'View All Button',
    },
    {
      id: 'showViewAll',
      type: 'checkbox',
      label: 'Show view all button',
      default: true,
    },
    {
      id: 'viewAllText',
      type: 'text',
      label: 'View all text',
      default: 'View all',
    },
    {
      id: 'viewAllLink',
      type: 'url',
      label: 'View all link',
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function FeaturedCollectionSection({
  title = 'Featured Products',
  description,
  collectionHandle,
  products: providedProducts,
  limit = 4,
  layout = 'grid',
  columns = { mobile: 2, tablet: 3, desktop: 4 },
  showViewAll = true,
  viewAllLink,
  viewAllText = 'View all',
  imageRatio = 'portrait',
  showVendor = false,
  onProductClick,
  className,
}: FeaturedCollectionSectionProps) {
  const theme = TanqoryTheme;
  const sectionStyles = SectionStyles(theme);

  const sectionStyle: React.CSSProperties = {
    ...sectionStyles.base,
    backgroundColor: theme.colors.background,
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: theme.spacing['2xl'],
    gap: theme.spacing.sm,
  };

  const renderProducts = (products: Product[]) => {
    const productCards = products.map((product) => (
      <ProductCardBlock
        key={product.id}
        product={product}
        imageRatio={imageRatio}
        showVendor={showVendor}
        onClick={() => onProductClick?.(product)}
      />
    ));

    if (layout === 'carousel') {
      return (
        <CarouselBlock
          slidesPerView={typeof columns === 'number' ? columns : columns.desktop}
          gap={16}
          showArrows
          showDots
        >
          {productCards}
        </CarouselBlock>
      );
    }

    return (
      <GridBlock columns={columns} gap={24}>
        {productCards}
      </GridBlock>
    );
  };

  const content = (products: Product[]) => (
    <>
      {/* Header */}
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

      {/* Products */}
      {renderProducts(products)}

      {/* View All Button */}
      {showViewAll && viewAllLink && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: theme.spacing['2xl'],
          }}
        >
          <ButtonBlock
            label={viewAllText}
            link={viewAllLink}
            style="secondary"
          />
        </div>
      )}
    </>
  );

  return (
    <section data-section="FeaturedCollectionSection" style={sectionStyle} className={className}>
      <ContainerBlock>
        {providedProducts ? (
          // Use provided products
          content(providedProducts)
        ) : (
          // Fetch products
          <FetchProducts collection={collectionHandle} limit={limit}>
            {({ loading, data, error }) => {
              if (loading) {
                return (
                  <>
                    <div style={headerStyle}>
                      {title && <HeadingBlock text={title} level="h2" alignment="center" />}
                    </div>
                    <GridBlock columns={columns} gap={24}>
                      {Array.from({ length: limit }, (_, i) => (
                        <ProductCardBlock key={i} imageRatio={imageRatio} />
                      ))}
                    </GridBlock>
                  </>
                );
              }

              if (error || !data || data.length === 0) {
                return (
                  <div style={{ textAlign: 'center', padding: theme.spacing['2xl'] }}>
                    <TextBlock
                      text="No products found"
                      preset="body"
                      alignment="center"
                    />
                  </div>
                );
              }

              return content(data);
            }}
          </FetchProducts>
        )}
      </ContainerBlock>
    </section>
  );
}

export default FeaturedCollectionSection;
