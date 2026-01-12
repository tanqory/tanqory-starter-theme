// =============================================================================
// Cart Section (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme, SectionStyles } from '../../themes';
import { ContainerBlock } from '../blocks/ContainerBlock';
import { HeadingBlock } from '../blocks/HeadingBlock';
import { CartBlock } from '../blocks/CartBlock';
import { ButtonBlock } from '../blocks/ButtonBlock';
import type { Cart } from '../../apis/CartApi';

// =============================================================================
// Types
// =============================================================================

export interface CartSectionProps {
  cart?: Cart | null;
  title?: string;
  emptyMessage?: string;
  continueShopping?: {
    label: string;
    link: string;
  };
  loading?: boolean;
  onUpdateQuantity?: (lineId: string, quantity: number) => void;
  onRemoveLine?: (lineId: string) => void;
  onCheckout?: () => void;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const CartSectionSchema = {
  name: 'Cart',
  tag: 'section',
  settings: [
    {
      id: 'title',
      type: 'text',
      label: 'Title',
      default: 'Your Cart',
    },
    {
      id: 'emptyMessage',
      type: 'text',
      label: 'Empty cart message',
      default: 'Your cart is empty',
    },
    {
      id: 'continueShoppingLabel',
      type: 'text',
      label: 'Continue shopping label',
      default: 'Continue shopping',
    },
    {
      id: 'continueShoppingLink',
      type: 'url',
      label: 'Continue shopping link',
      default: '/collections/all',
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function CartSection({
  cart,
  title = 'Your Cart',
  emptyMessage = 'Your cart is empty',
  continueShopping = {
    label: 'Continue shopping',
    link: '/collections/all',
  },
  loading = false,
  onUpdateQuantity,
  onRemoveLine,
  onCheckout,
  className,
}: CartSectionProps) {
  const theme = TanqoryTheme;
  const sectionStyles = SectionStyles(theme);

  const sectionStyle: React.CSSProperties = {
    ...sectionStyles.base,
    backgroundColor: theme.colors.background,
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing['2xl'],
  };

  const contentStyle: React.CSSProperties = {
    maxWidth: '800px',
    margin: '0 auto',
  };

  if (loading) {
    return (
      <section style={sectionStyle} className={className}>
        <ContainerBlock>
          <div style={contentStyle}>
            <div style={headerStyle}>
              <HeadingBlock text={title} level="h1" />
            </div>
            <CartLoadingSkeleton />
          </div>
        </ContainerBlock>
      </section>
    );
  }

  const isEmpty = !cart || cart.lines.length === 0;

  return (
    <section style={sectionStyle} className={className}>
      <ContainerBlock>
        <div style={contentStyle}>
          {/* Header */}
          <div style={headerStyle}>
            <HeadingBlock text={title} level="h1" />
            {!isEmpty && (
              <ButtonBlock
                label={continueShopping.label}
                link={continueShopping.link}
                style="link"
              />
            )}
          </div>

          {/* Cart Content */}
          {isEmpty ? (
            <CartEmptyState
              message={emptyMessage}
              continueShopping={continueShopping}
            />
          ) : (
            <CartBlock
              cart={cart}
              showImage
              showQuantitySelector
              showRemoveButton
              showSubtotal
              onUpdateQuantity={onUpdateQuantity}
              onRemoveLine={onRemoveLine}
              onCheckout={onCheckout}
            />
          )}
        </div>
      </ContainerBlock>
    </section>
  );
}

// =============================================================================
// Empty State Component
// =============================================================================

interface CartEmptyStateProps {
  message: string;
  continueShopping: {
    label: string;
    link: string;
  };
}

function CartEmptyState({ message, continueShopping }: CartEmptyStateProps) {
  const theme = TanqoryTheme;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing['3xl'],
        textAlign: 'center',
      }}
    >
      <svg
        width="80"
        height="80"
        viewBox="0 0 24 24"
        fill="none"
        stroke={theme.colors.foregroundMuted}
        strokeWidth="1.5"
        style={{ marginBottom: theme.spacing.lg }}
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>

      <h2
        style={{
          fontSize: theme.typography.fontSize.xl,
          fontWeight: theme.typography.fontWeight.medium,
          color: theme.colors.foreground,
          margin: 0,
          marginBottom: theme.spacing.sm,
        }}
      >
        {message}
      </h2>

      <p
        style={{
          fontSize: theme.typography.fontSize.base,
          color: theme.colors.foregroundSecondary,
          margin: 0,
          marginBottom: theme.spacing.lg,
        }}
      >
        Looks like you haven't added anything to your cart yet.
      </p>

      <ButtonBlock
        label={continueShopping.label}
        link={continueShopping.link}
        style="primary"
      />
    </div>
  );
}

// =============================================================================
// Loading Skeleton Component
// =============================================================================

function CartLoadingSkeleton() {
  const theme = TanqoryTheme;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            gap: theme.spacing.md,
            padding: theme.spacing.md,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: theme.borderRadius.md,
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              backgroundColor: theme.colors.backgroundSecondary,
              borderRadius: theme.borderRadius.sm,
            }}
          />
          <div style={{ flex: 1 }}>
            <div
              style={{
                width: '60%',
                height: '16px',
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
      ))}
    </div>
  );
}

export default CartSection;
