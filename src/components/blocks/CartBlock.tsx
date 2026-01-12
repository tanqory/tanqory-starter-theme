// =============================================================================
// Cart Block (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme } from '../../themes';
import { formatPrice } from '../../utils/formatPrice';
import type { Cart, CartLine } from '../../apis/CartApi';

// =============================================================================
// Types
// =============================================================================

export interface CartBlockProps {
  cart?: Cart | null;
  showImage?: boolean;
  showQuantitySelector?: boolean;
  showRemoveButton?: boolean;
  showSubtotal?: boolean;
  onUpdateQuantity?: (lineId: string, quantity: number) => void;
  onRemoveLine?: (lineId: string) => void;
  onCheckout?: () => void;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const CartBlockSchema = {
  name: 'Cart',
  tag: 'div',
  settings: [
    {
      id: 'showImage',
      type: 'checkbox',
      label: 'Show product images',
      default: true,
    },
    {
      id: 'showQuantitySelector',
      type: 'checkbox',
      label: 'Show quantity selector',
      default: true,
    },
    {
      id: 'showRemoveButton',
      type: 'checkbox',
      label: 'Show remove button',
      default: true,
    },
    {
      id: 'showSubtotal',
      type: 'checkbox',
      label: 'Show subtotal',
      default: true,
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function CartBlock({
  cart,
  showImage = true,
  showQuantitySelector = true,
  showRemoveButton = true,
  showSubtotal = true,
  onUpdateQuantity,
  onRemoveLine,
  onCheckout,
  className,
}: CartBlockProps) {
  const theme = TanqoryTheme;

  if (!cart || cart.lines.length === 0) {
    return <CartEmptyState />;
  }

  return (
    <div className={className}>
      {/* Cart Lines */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing.md,
        }}
      >
        {cart.lines.map((line) => (
          <CartLineItem
            key={line.id}
            line={line}
            showImage={showImage}
            showQuantitySelector={showQuantitySelector}
            showRemoveButton={showRemoveButton}
            onUpdateQuantity={onUpdateQuantity}
            onRemoveLine={onRemoveLine}
          />
        ))}
      </div>

      {/* Cart Summary */}
      {showSubtotal && (
        <div
          style={{
            marginTop: theme.spacing.lg,
            paddingTop: theme.spacing.lg,
            borderTop: `1px solid ${theme.colors.border}`,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: theme.spacing.md,
            }}
          >
            <span
              style={{
                fontSize: theme.typography.fontSize.lg,
                fontWeight: theme.typography.fontWeight.medium,
              }}
            >
              Subtotal
            </span>
            <span
              style={{
                fontSize: theme.typography.fontSize.xl,
                fontWeight: theme.typography.fontWeight.semibold,
              }}
            >
              {formatPrice(cart.cost.subtotalAmount)}
            </span>
          </div>

          {onCheckout && (
            <button
              type="button"
              onClick={onCheckout}
              style={{
                width: '100%',
                backgroundColor: theme.colors.primary,
                color: theme.colors.secondary,
                padding: `${theme.spacing.md} ${theme.spacing.lg}`,
                borderRadius: theme.borderRadius.md,
                border: 'none',
                fontSize: theme.typography.fontSize.base,
                fontWeight: theme.typography.fontWeight.medium,
                cursor: 'pointer',
              }}
            >
              Checkout
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// Cart Line Item
// =============================================================================

interface CartLineItemProps {
  line: CartLine;
  showImage?: boolean;
  showQuantitySelector?: boolean;
  showRemoveButton?: boolean;
  onUpdateQuantity?: (lineId: string, quantity: number) => void;
  onRemoveLine?: (lineId: string) => void;
}

function CartLineItem({
  line,
  showImage = true,
  showQuantitySelector = true,
  showRemoveButton = true,
  onUpdateQuantity,
  onRemoveLine,
}: CartLineItemProps) {
  const theme = TanqoryTheme;

  return (
    <div
      style={{
        display: 'flex',
        gap: theme.spacing.md,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        border: `1px solid ${theme.colors.border}`,
      }}
    >
      {/* Image */}
      {showImage && line.variant.image && (
        <div
          style={{
            width: '80px',
            height: '80px',
            flexShrink: 0,
            borderRadius: theme.borderRadius.sm,
            overflow: 'hidden',
          }}
        >
          <img
            src={line.variant.image.src}
            alt={line.variant.image.altText || line.product.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      )}

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Title */}
        <h4
          style={{
            fontSize: theme.typography.fontSize.base,
            fontWeight: theme.typography.fontWeight.medium,
            color: theme.colors.foreground,
            margin: 0,
            marginBottom: theme.spacing['2xs'],
          }}
        >
          {line.product.title}
        </h4>

        {/* Variant */}
        {line.variant.title !== 'Default Title' && (
          <p
            style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.foregroundSecondary,
              margin: 0,
              marginBottom: theme.spacing.xs,
            }}
          >
            {line.variant.title}
          </p>
        )}

        {/* Price */}
        <p
          style={{
            fontSize: theme.typography.fontSize.base,
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.foreground,
            margin: 0,
          }}
        >
          {formatPrice(line.cost.totalAmount)}
        </p>
      </div>

      {/* Actions */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: theme.spacing.xs,
        }}
      >
        {/* Quantity Selector */}
        {showQuantitySelector && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.xs,
              border: `1px solid ${theme.colors.border}`,
              borderRadius: theme.borderRadius.sm,
            }}
          >
            <button
              type="button"
              onClick={() => onUpdateQuantity?.(line.id, line.quantity - 1)}
              disabled={line.quantity <= 1}
              style={{
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                background: 'transparent',
                cursor: line.quantity <= 1 ? 'not-allowed' : 'pointer',
                opacity: line.quantity <= 1 ? 0.5 : 1,
              }}
            >
              −
            </button>
            <span
              style={{
                minWidth: '24px',
                textAlign: 'center',
                fontSize: theme.typography.fontSize.sm,
              }}
            >
              {line.quantity}
            </span>
            <button
              type="button"
              onClick={() => onUpdateQuantity?.(line.id, line.quantity + 1)}
              style={{
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
              }}
            >
              +
            </button>
          </div>
        )}

        {/* Remove Button */}
        {showRemoveButton && (
          <button
            type="button"
            onClick={() => onRemoveLine?.(line.id)}
            style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.foregroundMuted,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
}

// =============================================================================
// Empty State
// =============================================================================

function CartEmptyState() {
  const theme = TanqoryTheme;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing['2xl'],
        textAlign: 'center',
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
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
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
        Your cart is empty
      </h3>
      <p
        style={{
          fontSize: theme.typography.fontSize.sm,
          color: theme.colors.foregroundSecondary,
          margin: 0,
        }}
      >
        Add items to your cart to see them here
      </p>
    </div>
  );
}

export default CartBlock;
