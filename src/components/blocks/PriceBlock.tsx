// =============================================================================
// Price Block (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme } from '../../themes';
import { formatPrice, formatCompareAtPrice, calculateDiscount } from '../../utils/formatPrice';

// =============================================================================
// Types
// =============================================================================

export interface PriceBlockProps {
  price: number;
  compareAtPrice?: number;
  currencyCode?: string;
  showCompareAt?: boolean;
  showDiscount?: boolean;
  discountFormat?: 'percentage' | 'amount';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  alignment?: 'left' | 'center' | 'right';
  layout?: 'inline' | 'stacked';
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const PriceBlockSchema = {
  name: 'Price',
  tag: 'div',
  settings: [
    {
      id: 'showCompareAt',
      type: 'checkbox',
      label: 'Show compare at price',
      default: true,
    },
    {
      id: 'showDiscount',
      type: 'checkbox',
      label: 'Show discount badge',
      default: true,
    },
    {
      id: 'discountFormat',
      type: 'select',
      label: 'Discount format',
      options: [
        { value: 'percentage', label: 'Percentage (20% off)' },
        { value: 'amount', label: 'Amount (Save $20)' },
      ],
      default: 'percentage',
    },
    {
      id: 'size',
      type: 'select',
      label: 'Size',
      options: [
        { value: 'sm', label: 'Small' },
        { value: 'md', label: 'Medium' },
        { value: 'lg', label: 'Large' },
        { value: 'xl', label: 'Extra large' },
      ],
      default: 'md',
    },
    {
      id: 'alignment',
      type: 'text_alignment',
      label: 'Alignment',
      default: 'left',
    },
    {
      id: 'layout',
      type: 'select',
      label: 'Layout',
      options: [
        { value: 'inline', label: 'Inline' },
        { value: 'stacked', label: 'Stacked' },
      ],
      default: 'inline',
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function PriceBlock({
  price,
  compareAtPrice,
  currencyCode = 'USD',
  showCompareAt = true,
  showDiscount = true,
  discountFormat = 'percentage',
  size = 'md',
  alignment = 'left',
  layout = 'inline',
  className,
}: PriceBlockProps) {
  const theme = TanqoryTheme;

  const hasDiscount = compareAtPrice && compareAtPrice > price;
  const discountPercentage = hasDiscount ? calculateDiscount(price, compareAtPrice) : 0;
  const discountAmount = hasDiscount ? compareAtPrice - price : 0;

  // Size mappings
  const sizeMap = {
    sm: {
      price: theme.typography.fontSize.sm,
      compareAt: theme.typography.fontSize.xs,
      badge: theme.typography.fontSize.xs,
    },
    md: {
      price: theme.typography.fontSize.lg,
      compareAt: theme.typography.fontSize.sm,
      badge: theme.typography.fontSize.xs,
    },
    lg: {
      price: theme.typography.fontSize.xl,
      compareAt: theme.typography.fontSize.base,
      badge: theme.typography.fontSize.sm,
    },
    xl: {
      price: theme.typography.fontSize['2xl'],
      compareAt: theme.typography.fontSize.lg,
      badge: theme.typography.fontSize.sm,
    },
  };

  const sizes = sizeMap[size];

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: layout === 'stacked' ? 'column' : 'row',
    alignItems: layout === 'stacked' ? (alignment === 'center' ? 'center' : alignment === 'right' ? 'flex-end' : 'flex-start') : 'center',
    gap: theme.spacing.xs,
    justifyContent: alignment === 'center' ? 'center' : alignment === 'right' ? 'flex-end' : 'flex-start',
    flexWrap: 'wrap',
  };

  const priceStyle: React.CSSProperties = {
    fontSize: sizes.price,
    fontWeight: theme.typography.fontWeight.semibold,
    color: hasDiscount ? theme.colors.sale : theme.colors.foreground,
    margin: 0,
  };

  const compareAtStyle: React.CSSProperties = {
    fontSize: sizes.compareAt,
    color: theme.colors.foregroundMuted,
    textDecoration: 'line-through',
    margin: 0,
  };

  const badgeStyle: React.CSSProperties = {
    fontSize: sizes.badge,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.sale,
    backgroundColor: theme.colors.saleBackground,
    padding: `${theme.spacing['2xs']} ${theme.spacing.xs}`,
    borderRadius: theme.borderRadius.sm,
    whiteSpace: 'nowrap',
  };

  return (
    <div style={containerStyle} className={className}>
      {/* Current Price */}
      <span style={priceStyle}>
        {formatPrice(price, { currency: currencyCode })}
      </span>

      {/* Compare At Price */}
      {showCompareAt && hasDiscount && (
        <span style={compareAtStyle}>
          {formatCompareAtPrice(compareAtPrice, { currency: currencyCode })}
        </span>
      )}

      {/* Discount Badge */}
      {showDiscount && hasDiscount && (
        <span style={badgeStyle}>
          {discountFormat === 'percentage'
            ? `${discountPercentage}% off`
            : `Save ${formatPrice(discountAmount, { currency: currencyCode })}`}
        </span>
      )}
    </div>
  );
}

export default PriceBlock;
