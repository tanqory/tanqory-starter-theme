// =============================================================================
// Badge Block (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme } from '../../themes';

// =============================================================================
// Types
// =============================================================================

export interface BadgeBlockProps {
  text: string;
  variant?: 'default' | 'sale' | 'new' | 'soldout' | 'custom';
  size?: 'sm' | 'md' | 'lg';
  backgroundColor?: string;
  textColor?: string;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const BadgeBlockSchema = {
  name: 'Badge',
  tag: 'span',
  settings: [
    {
      id: 'text',
      type: 'text',
      label: 'Text',
      default: 'Badge',
    },
    {
      id: 'variant',
      type: 'select',
      label: 'Variant',
      options: [
        { value: 'default', label: 'Default' },
        { value: 'sale', label: 'Sale' },
        { value: 'new', label: 'New' },
        { value: 'soldout', label: 'Sold Out' },
        { value: 'custom', label: 'Custom' },
      ],
      default: 'default',
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
      id: 'backgroundColor',
      type: 'color',
      label: 'Background color',
      visibleIf: "{{ settings.variant == 'custom' }}",
    },
    {
      id: 'textColor',
      type: 'color',
      label: 'Text color',
      visibleIf: "{{ settings.variant == 'custom' }}",
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function BadgeBlock({
  text,
  variant = 'default',
  size = 'md',
  backgroundColor,
  textColor,
  className,
}: BadgeBlockProps) {
  const theme = TanqoryTheme;

  // Variant colors
  const variantStyles: Record<string, { bg: string; text: string }> = {
    default: {
      bg: theme.colors.backgroundSecondary,
      text: theme.colors.foreground,
    },
    sale: {
      bg: theme.colors.saleBackground,
      text: theme.colors.sale,
    },
    new: {
      bg: theme.colors.primary,
      text: theme.colors.secondary,
    },
    soldout: {
      bg: theme.colors.foregroundMuted,
      text: theme.colors.secondary,
    },
    custom: {
      bg: backgroundColor || theme.colors.backgroundSecondary,
      text: textColor || theme.colors.foreground,
    },
  };

  // Size styles
  const sizeStyles: Record<string, { padding: string; fontSize: string }> = {
    sm: {
      padding: `${theme.spacing['2xs']} ${theme.spacing.xs}`,
      fontSize: theme.typography.fontSize.xs,
    },
    md: {
      padding: `${theme.spacing['2xs']} ${theme.spacing.sm}`,
      fontSize: theme.typography.fontSize.sm,
    },
    lg: {
      padding: `${theme.spacing.xs} ${theme.spacing.md}`,
      fontSize: theme.typography.fontSize.base,
    },
  };

  const colors = variantStyles[variant] || variantStyles.default;
  const sizes = sizeStyles[size];

  const badgeStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg,
    color: colors.text,
    padding: sizes.padding,
    fontSize: sizes.fontSize,
    fontWeight: theme.typography.fontWeight.medium,
    borderRadius: theme.borderRadius.sm,
    whiteSpace: 'nowrap',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  };

  return (
    <span style={badgeStyle} className={className}>
      {text}
    </span>
  );
}

export default BadgeBlock;
