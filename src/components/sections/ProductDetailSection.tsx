// =============================================================================
// Product Detail Section (Draftbit pattern)
// =============================================================================

import React, { useState, useMemo } from 'react';
import { TanqoryTheme, SectionStyles } from '../../themes';
import { ContainerBlock } from '../blocks/ContainerBlock';
import { ProductMediaGalleryBlock } from '../blocks/ProductMediaGalleryBlock';
import { HeadingBlock } from '../blocks/HeadingBlock';
import { TextBlock } from '../blocks/TextBlock';
import { PriceBlock } from '../blocks/PriceBlock';
import { VariantPickerBlock } from '../blocks/VariantPickerBlock';
import { AddToCartBlock } from '../blocks/AddToCartBlock';
import { AccordionBlock } from '../blocks/AccordionBlock';
import { BadgeBlock } from '../blocks/BadgeBlock';
import { BreadcrumbBlock, BreadcrumbItem } from '../blocks/BreadcrumbBlock';
import type { Product, ProductVariant } from '../../apis/ProductsApi';

// =============================================================================
// Types
// =============================================================================

export interface ProductDetailSectionProps {
  product?: Product;
  breadcrumbs?: BreadcrumbItem[];
  showBreadcrumbs?: boolean;
  galleryLayout?: 'thumbnails-left' | 'thumbnails-bottom' | 'grid';
  showVendor?: boolean;
  showSku?: boolean;
  showDescription?: boolean;
  showAccordions?: boolean;
  accordionItems?: { id: string; title: string; content: string }[];
  onAddToCart?: (variantId: string, quantity: number) => void;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const ProductDetailSectionSchema = {
  name: 'Product Detail',
  tag: 'section',
  settings: [
    {
      type: 'header',
      content: 'Layout',
    },
    {
      id: 'galleryLayout',
      type: 'select',
      label: 'Gallery layout',
      options: [
        { value: 'thumbnails-left', label: 'Thumbnails left' },
        { value: 'thumbnails-bottom', label: 'Thumbnails bottom' },
        { value: 'grid', label: 'Grid' },
      ],
      default: 'thumbnails-left',
    },
    {
      type: 'header',
      content: 'Content',
    },
    {
      id: 'showBreadcrumbs',
      type: 'checkbox',
      label: 'Show breadcrumbs',
      default: true,
    },
    {
      id: 'showVendor',
      type: 'checkbox',
      label: 'Show vendor',
      default: true,
    },
    {
      id: 'showSku',
      type: 'checkbox',
      label: 'Show SKU',
      default: false,
    },
    {
      id: 'showDescription',
      type: 'checkbox',
      label: 'Show description',
      default: true,
    },
    {
      id: 'showAccordions',
      type: 'checkbox',
      label: 'Show accordions',
      default: true,
    },
  ],
  blocks: [
    {
      type: 'accordion',
      name: 'Accordion',
      settings: [
        {
          id: 'title',
          type: 'text',
          label: 'Title',
          default: 'Details',
        },
        {
          id: 'content',
          type: 'richtext',
          label: 'Content',
        },
      ],
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function ProductDetailSection({
  product,
  breadcrumbs,
  showBreadcrumbs = true,
  galleryLayout = 'thumbnails-left',
  showVendor = true,
  showSku = false,
  showDescription = true,
  showAccordions = true,
  accordionItems,
  onAddToCart,
  className,
}: ProductDetailSectionProps) {
  const theme = TanqoryTheme;
  const sectionStyles = SectionStyles(theme);

  // Selected options state
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    if (!product?.options) return {};
    const initial: Record<string, string> = {};
    product.options.forEach((option) => {
      if (option.values.length > 0) {
        initial[option.name] = option.values[0];
      }
    });
    return initial;
  });

  // Find selected variant
  const selectedVariant = useMemo(() => {
    if (!product?.variants) return undefined;
    return product.variants.find((variant) =>
      variant.selectedOptions?.every(
        (opt) => selectedOptions[opt.name] === opt.value
      )
    ) || product.variants[0];
  }, [product?.variants, selectedOptions]);

  // Handle option change
  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionName]: value,
    }));
  };

  // Default accordion items
  const defaultAccordions = [
    {
      id: 'description',
      title: 'Description',
      content: product?.descriptionHtml || product?.description || '',
    },
    {
      id: 'shipping',
      title: 'Shipping & Returns',
      content: 'Free shipping on orders over $50. Easy 30-day returns.',
    },
  ];

  const finalAccordions = accordionItems || defaultAccordions;

  if (!product) {
    return <ProductDetailPlaceholder />;
  }

  const sectionStyle: React.CSSProperties = {
    ...sectionStyles.base,
    backgroundColor: theme.colors.background,
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: theme.spacing['3xl'],
    alignItems: 'start',
  };

  const infoStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.lg,
  };

  // Build breadcrumbs
  const productBreadcrumbs: BreadcrumbItem[] = breadcrumbs || [
    { label: 'Products', url: '/collections/all' },
    { label: product.title },
  ];

  const hasDiscount = selectedVariant?.compareAtPrice && selectedVariant.compareAtPrice > selectedVariant.price;
  const isSoldOut = selectedVariant && (selectedVariant.quantityAvailable ?? 0) <= 0;

  return (
    <section style={sectionStyle} className={className}>
      <ContainerBlock>
        {/* Breadcrumbs */}
        {showBreadcrumbs && (
          <div style={{ marginBottom: theme.spacing.lg }}>
            <BreadcrumbBlock items={productBreadcrumbs} />
          </div>
        )}

        <div style={gridStyle} className="product-detail-grid">
          {/* Gallery */}
          <ProductMediaGalleryBlock
            images={product.images}
            layout={galleryLayout}
            imageRatio="square"
            enableZoom
          />

          {/* Product Info */}
          <div style={infoStyle}>
            {/* Badges */}
            <div style={{ display: 'flex', gap: theme.spacing.xs }}>
              {hasDiscount && <BadgeBlock text="Sale" variant="sale" />}
              {isSoldOut && <BadgeBlock text="Sold out" variant="soldout" />}
            </div>

            {/* Vendor */}
            {showVendor && product.vendor && (
              <span
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.foregroundMuted,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {product.vendor}
              </span>
            )}

            {/* Title */}
            <HeadingBlock text={product.title} level="h1" />

            {/* Price */}
            <PriceBlock
              price={selectedVariant?.price || product.price}
              compareAtPrice={selectedVariant?.compareAtPrice || product.compareAtPrice}
              currencyCode={product.currencyCode}
              size="xl"
              showDiscount
            />

            {/* SKU */}
            {showSku && selectedVariant?.sku && (
              <span
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.foregroundMuted,
                }}
              >
                SKU: {selectedVariant.sku}
              </span>
            )}

            {/* Variant Picker */}
            {product.options && product.options.length > 0 && (
              <VariantPickerBlock
                options={product.options}
                selectedOptions={selectedOptions}
                variants={product.variants}
                displayType="buttons"
                onOptionChange={handleOptionChange}
              />
            )}

            {/* Add to Cart */}
            <AddToCartBlock
              variant={selectedVariant}
              showQuantity
              fullWidth
              size="lg"
              onAddToCart={onAddToCart}
            />

            {/* Short Description */}
            {showDescription && product.description && !showAccordions && (
              <TextBlock
                text={product.description}
                preset="body"
              />
            )}

            {/* Accordions */}
            {showAccordions && finalAccordions.length > 0 && (
              <AccordionBlock
                items={finalAccordions.filter((item) => item.content)}
                icon="plus"
                dividers
              />
            )}
          </div>
        </div>

        {/* Responsive styles */}
        <style>
          {`
            @media (max-width: ${theme.breakpoints.lg}) {
              .product-detail-grid {
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
// Placeholder Component
// =============================================================================

function ProductDetailPlaceholder() {
  const theme = TanqoryTheme;

  return (
    <section style={{ padding: `${theme.spacing['2xl']} 0` }}>
      <ContainerBlock>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: theme.spacing['3xl'],
          }}
        >
          {/* Gallery placeholder */}
          <div
            style={{
              aspectRatio: '1',
              backgroundColor: theme.colors.backgroundSecondary,
              borderRadius: theme.borderRadius.lg,
            }}
          />

          {/* Info placeholder */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
            <div
              style={{
                width: '30%',
                height: '14px',
                backgroundColor: theme.colors.backgroundSecondary,
                borderRadius: theme.borderRadius.sm,
              }}
            />
            <div
              style={{
                width: '80%',
                height: '32px',
                backgroundColor: theme.colors.backgroundSecondary,
                borderRadius: theme.borderRadius.sm,
              }}
            />
            <div
              style={{
                width: '40%',
                height: '24px',
                backgroundColor: theme.colors.backgroundSecondary,
                borderRadius: theme.borderRadius.sm,
              }}
            />
          </div>
        </div>
      </ContainerBlock>
    </section>
  );
}

export default ProductDetailSection;
