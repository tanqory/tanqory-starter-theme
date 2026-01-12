// =============================================================================
// Product Card Block (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme, CardStyles } from '../../themes';
import { formatPrice, formatCompareAtPrice } from '../../utils/formatPrice';
import type { Product } from '../../apis/ProductsApi';

// =============================================================================
// Types
// =============================================================================

export interface ProductCardBlockProps {
  product?: Product;
  showImage?: boolean;
  showTitle?: boolean;
  showPrice?: boolean;
  showCompareAtPrice?: boolean;
  showVendor?: boolean;
  showDescription?: boolean;
  imageRatio?: 'adapt' | 'portrait' | 'square' | 'landscape';
  layout?: 'vertical' | 'horizontal';
  onClick?: (product: Product) => void;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const ProductCardBlockSchema = {
  name: 'Product Card',
  tag: 'article',
  settings: [
    {
      id: 'product',
      type: 'product',
      label: 'Product',
    },
    {
      id: 'showImage',
      type: 'checkbox',
      label: 'Show image',
      default: true,
    },
    {
      id: 'showTitle',
      type: 'checkbox',
      label: 'Show title',
      default: true,
    },
    {
      id: 'showPrice',
      type: 'checkbox',
      label: 'Show price',
      default: true,
    },
    {
      id: 'showCompareAtPrice',
      type: 'checkbox',
      label: 'Show compare at price',
      default: true,
    },
    {
      id: 'showVendor',
      type: 'checkbox',
      label: 'Show vendor',
      default: false,
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
      id: 'layout',
      type: 'select',
      label: 'Layout',
      options: [
        { value: 'vertical', label: 'Vertical' },
        { value: 'horizontal', label: 'Horizontal' },
      ],
      default: 'vertical',
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function ProductCardBlock({
  product,
  showImage = true,
  showTitle = true,
  showPrice = true,
  showCompareAtPrice = true,
  showVendor = false,
  showDescription = false,
  imageRatio = 'portrait',
  layout = 'vertical',
  onClick,
  className,
}: ProductCardBlockProps) {
  const theme = TanqoryTheme;
  const cardStyles = CardStyles(theme);

  if (!product) {
    return <ProductCardPlaceholder />;
  }

  // Get aspect ratio padding
  const getAspectRatio = () => {
    switch (imageRatio) {
      case 'portrait':
        return '133.33%';
      case 'square':
        return '100%';
      case 'landscape':
        return '75%';
      default:
        return undefined;
    }
  };

  const isHorizontal = layout === 'horizontal';
  const hasCompareAtPrice = product.compareAtPrice && product.compareAtPrice > product.price;

  const containerStyle: React.CSSProperties = {
    ...cardStyles.interactive,
    display: isHorizontal ? 'flex' : 'block',
    gap: isHorizontal ? theme.spacing.md : undefined,
  };

  const imageContainerStyle: React.CSSProperties = {
    position: 'relative',
    width: isHorizontal ? '40%' : '100%',
    flexShrink: 0,
  };

  const aspectRatioStyle: React.CSSProperties = imageRatio !== 'adapt'
    ? {
        position: 'relative',
        paddingBottom: getAspectRatio(),
        height: 0,
      }
    : {};

  const imageStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    height: imageRatio !== 'adapt' ? '100%' : 'auto',
    objectFit: 'cover',
    ...(imageRatio !== 'adapt' && {
      position: 'absolute' as const,
      top: 0,
      left: 0,
    }),
  };

  const contentStyle: React.CSSProperties = {
    padding: theme.spacing.md,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.xs,
    flex: isHorizontal ? 1 : undefined,
  };

  return (
    <article
      style={containerStyle}
      className={className}
      onClick={() => onClick?.(product)}
    >
      {/* Image */}
      {showImage && product.featuredImage && (
        <div style={imageContainerStyle}>
          {imageRatio !== 'adapt' ? (
            <div style={aspectRatioStyle}>
              <img
                src={product.featuredImage.src}
                alt={product.featuredImage.altText || product.title}
                style={imageStyle}
                loading="lazy"
              />
            </div>
          ) : (
            <img
              src={product.featuredImage.src}
              alt={product.featuredImage.altText || product.title}
              style={imageStyle}
              loading="lazy"
            />
          )}
        </div>
      )}

      {/* Content */}
      <div style={contentStyle}>
        {/* Vendor */}
        {showVendor && product.vendor && (
          <span
            style={{
              fontSize: theme.typography.fontSize.xs,
              color: theme.colors.foregroundMuted,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {product.vendor}
          </span>
        )}

        {/* Title */}
        {showTitle && (
          <h3
            style={{
              fontSize: theme.typography.fontSize.base,
              fontWeight: theme.typography.fontWeight.medium,
              color: theme.colors.foreground,
              margin: 0,
              lineHeight: theme.typography.lineHeight.snug,
            }}
          >
            {product.title}
          </h3>
        )}

        {/* Description */}
        {showDescription && product.description && (
          <p
            style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.foregroundSecondary,
              margin: 0,
              lineHeight: theme.typography.lineHeight.normal,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {product.description}
          </p>
        )}

        {/* Price */}
        {showPrice && (
          <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.xs }}>
            <span
              style={{
                fontSize: theme.typography.fontSize.base,
                fontWeight: theme.typography.fontWeight.semibold,
                color: hasCompareAtPrice ? theme.colors.sale : theme.colors.foreground,
              }}
            >
              {formatPrice(product.price, { currency: product.currencyCode })}
            </span>

            {showCompareAtPrice && hasCompareAtPrice && (
              <span
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.foregroundMuted,
                  textDecoration: 'line-through',
                }}
              >
                {formatCompareAtPrice(product.compareAtPrice!, { currency: product.currencyCode })}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

// =============================================================================
// Placeholder Component
// =============================================================================

function ProductCardPlaceholder() {
  const theme = TanqoryTheme;
  const cardStyles = CardStyles(theme);

  return (
    <div style={cardStyles.base}>
      {/* Image placeholder */}
      <div
        style={{
          position: 'relative',
          paddingBottom: '133.33%',
          backgroundColor: theme.colors.backgroundSecondary,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke={theme.colors.foregroundMuted}
            strokeWidth="1.5"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </div>
      </div>

      {/* Content placeholder */}
      <div style={{ padding: theme.spacing.md }}>
        <div
          style={{
            width: '60%',
            height: '14px',
            backgroundColor: theme.colors.backgroundSecondary,
            borderRadius: theme.borderRadius.sm,
            marginBottom: theme.spacing.xs,
          }}
        />
        <div
          style={{
            width: '40%',
            height: '14px',
            backgroundColor: theme.colors.backgroundSecondary,
            borderRadius: theme.borderRadius.sm,
          }}
        />
      </div>
    </div>
  );
}

export default ProductCardBlock;
