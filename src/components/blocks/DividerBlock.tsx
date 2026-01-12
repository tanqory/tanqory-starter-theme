// =============================================================================
// Divider Block (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme } from '../../themes';

// =============================================================================
// Types
// =============================================================================

export interface DividerBlockProps {
  orientation?: 'horizontal' | 'vertical';
  thickness?: number;
  color?: string;
  margin?: string;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const DividerBlockSchema = {
  name: 'Divider',
  tag: 'hr',
  settings: [
    {
      id: 'orientation',
      type: 'select',
      label: 'Orientation',
      options: [
        { value: 'horizontal', label: 'Horizontal' },
        { value: 'vertical', label: 'Vertical' },
      ],
      default: 'horizontal',
    },
    {
      id: 'thickness',
      type: 'range',
      label: 'Thickness',
      min: 1,
      max: 10,
      step: 1,
      unit: 'px',
      default: 1,
    },
    {
      id: 'color',
      type: 'color',
      label: 'Color',
    },
    {
      id: 'margin',
      type: 'range',
      label: 'Margin',
      min: 0,
      max: 100,
      step: 4,
      unit: 'px',
      default: 16,
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function DividerBlock({
  orientation = 'horizontal',
  thickness = 1,
  color,
  margin = '16px',
  className,
}: DividerBlockProps) {
  const theme = TanqoryTheme;
  const dividerColor = color || theme.colors.border;

  const isHorizontal = orientation === 'horizontal';

  const dividerStyle: React.CSSProperties = isHorizontal
    ? {
        width: '100%',
        height: `${thickness}px`,
        backgroundColor: dividerColor,
        border: 'none',
        margin: `${margin} 0`,
      }
    : {
        width: `${thickness}px`,
        height: '100%',
        minHeight: '24px',
        backgroundColor: dividerColor,
        border: 'none',
        margin: `0 ${margin}`,
      };

  return (
    <hr
      style={dividerStyle}
      className={className}
      role="separator"
      aria-orientation={orientation}
    />
  );
}

export default DividerBlock;
