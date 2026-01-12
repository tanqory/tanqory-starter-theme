// =============================================================================
// Container Block (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme, ContainerStyles } from '../../themes';

// =============================================================================
// Types
// =============================================================================

export interface ContainerBlockProps {
  children: React.ReactNode;
  variant?: 'page' | 'full' | 'narrow' | 'wide';
  padding?: boolean;
  backgroundColor?: string;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const ContainerBlockSchema = {
  name: 'Container',
  tag: 'div',
  settings: [
    {
      id: 'variant',
      type: 'select',
      label: 'Variant',
      options: [
        { value: 'page', label: 'Page (1280px max)' },
        { value: 'full', label: 'Full width' },
        { value: 'narrow', label: 'Narrow (800px max)' },
        { value: 'wide', label: 'Wide (1536px max)' },
      ],
      default: 'page',
    },
    {
      id: 'padding',
      type: 'checkbox',
      label: 'Include horizontal padding',
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

export function ContainerBlock({
  children,
  variant = 'page',
  padding = true,
  backgroundColor,
  className,
}: ContainerBlockProps) {
  const theme = TanqoryTheme;
  const containerStyles = ContainerStyles(theme);

  // Variant max widths
  const maxWidths: Record<string, string | undefined> = {
    page: '1280px',
    full: undefined,
    narrow: '800px',
    wide: '1536px',
  };

  const containerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: maxWidths[variant],
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: padding ? theme.spacing.md : undefined,
    paddingRight: padding ? theme.spacing.md : undefined,
    backgroundColor,
  };

  return (
    <div style={containerStyle} className={className}>
      {children}
    </div>
  );
}

export default ContainerBlock;
