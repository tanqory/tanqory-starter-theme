// =============================================================================
// Add To Cart Block (Draftbit pattern)
// =============================================================================

import React, { useState, useCallback } from 'react';
import { TanqoryTheme, ButtonStyles } from '../../themes';
import { QuantityBlock } from './QuantityBlock';
import type { ProductVariant } from '../../apis/ProductsApi';

// =============================================================================
// Types
// =============================================================================

export interface AddToCartBlockProps {
  variant?: ProductVariant;
  showQuantity?: boolean;
  defaultQuantity?: number;
  maxQuantity?: number;
  buttonText?: string;
  soldOutText?: string;
  unavailableText?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  onAddToCart?: (variantId: string, quantity: number) => void;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const AddToCartBlockSchema = {
  name: 'Add To Cart',
  tag: 'div',
  settings: [
    {
      id: 'showQuantity',
      type: 'checkbox',
      label: 'Show quantity selector',
      default: true,
    },
    {
      id: 'buttonText',
      type: 'text',
      label: 'Button text',
      default: 'Add to cart',
    },
    {
      id: 'soldOutText',
      type: 'text',
      label: 'Sold out text',
      default: 'Sold out',
    },
    {
      id: 'unavailableText',
      type: 'text',
      label: 'Unavailable text',
      default: 'Unavailable',
    },
    {
      id: 'size',
      type: 'select',
      label: 'Size',
      options: [
        { value: 'sm', label: 'Small' },
        { value: 'md', label: 'Medium' },
        { value: 'lg', label: 'Large' },
      ],
      default: 'md',
    },
    {
      id: 'fullWidth',
      type: 'checkbox',
      label: 'Full width',
      default: true,
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function AddToCartBlock({
  variant,
  showQuantity = true,
  defaultQuantity = 1,
  maxQuantity = 10,
  buttonText = 'Add to cart',
  soldOutText = 'Sold out',
  unavailableText = 'Unavailable',
  size = 'md',
  fullWidth = true,
  disabled = false,
  onAddToCart,
  className,
}: AddToCartBlockProps) {
  const theme = TanqoryTheme;
  const buttonStyles = ButtonStyles(theme);
  const [quantity, setQuantity] = useState(defaultQuantity);
  const [isLoading, setIsLoading] = useState(false);

  // Determine button state
  const isSoldOut = variant && (variant.quantityAvailable ?? 0) <= 0;
  const isUnavailable = !variant || !variant.availableForSale;
  const isDisabled = disabled || isLoading || isSoldOut || isUnavailable;

  // Get button text based on state
  const getButtonText = () => {
    if (!variant) return unavailableText;
    if (isSoldOut) return soldOutText;
    if (isUnavailable) return unavailableText;
    if (isLoading) return 'Adding...';
    return buttonText;
  };

  // Handle add to cart
  const handleAddToCart = useCallback(async () => {
    if (!variant || isDisabled) return;

    setIsLoading(true);
    try {
      await onAddToCart?.(variant.id, quantity);
    } finally {
      setIsLoading(false);
    }
  }, [variant, quantity, isDisabled, onAddToCart]);

  // Size mappings
  const sizeMap = {
    sm: {
      padding: `${theme.spacing.xs} ${theme.spacing.md}`,
      fontSize: theme.typography.fontSize.sm,
      gap: theme.spacing.sm,
    },
    md: {
      padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
      fontSize: theme.typography.fontSize.base,
      gap: theme.spacing.md,
    },
    lg: {
      padding: `${theme.spacing.md} ${theme.spacing.xl}`,
      fontSize: theme.typography.fontSize.lg,
      gap: theme.spacing.md,
    },
  };

  const sizes = sizeMap[size];

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: fullWidth ? 'column' : 'row',
    alignItems: fullWidth ? 'stretch' : 'center',
    gap: sizes.gap,
  };

  const buttonStyle: React.CSSProperties = {
    ...buttonStyles.primary,
    padding: sizes.padding,
    fontSize: sizes.fontSize,
    width: fullWidth ? '100%' : 'auto',
    opacity: isDisabled ? theme.disabledOpacity : 1,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.xs,
    border: 'none',
  };

  return (
    <div style={containerStyle} className={className}>
      {/* Quantity Selector */}
      {showQuantity && !isSoldOut && !isUnavailable && (
        <QuantityBlock
          value={quantity}
          min={1}
          max={Math.min(maxQuantity, variant?.quantityAvailable || maxQuantity)}
          size={size}
          disabled={isDisabled}
          onChange={setQuantity}
        />
      )}

      {/* Add to Cart Button */}
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={isDisabled}
        style={buttonStyle}
      >
        {isLoading && <LoadingSpinner />}
        {getButtonText()}
      </button>
    </div>
  );
}

// =============================================================================
// Loading Spinner
// =============================================================================

function LoadingSpinner() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={{ animation: 'spin 1s linear infinite' }}
    >
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="31.4"
        strokeDashoffset="10"
      />
    </svg>
  );
}

export default AddToCartBlock;
