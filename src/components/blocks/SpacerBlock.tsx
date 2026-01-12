// =============================================================================
// Spacer Block (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme } from '../../themes';

// =============================================================================
// Types
// =============================================================================

export interface SpacerBlockProps {
  height?: string | number;
  mobileHeight?: string | number;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const SpacerBlockSchema = {
  name: 'Spacer',
  tag: 'div',
  settings: [
    {
      id: 'height',
      type: 'range',
      label: 'Height (Desktop)',
      min: 0,
      max: 200,
      step: 4,
      unit: 'px',
      default: 48,
    },
    {
      id: 'mobileHeight',
      type: 'range',
      label: 'Height (Mobile)',
      min: 0,
      max: 200,
      step: 4,
      unit: 'px',
      default: 24,
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function SpacerBlock({
  height = 48,
  mobileHeight,
  className,
}: SpacerBlockProps) {
  const theme = TanqoryTheme;

  // Normalize height value
  const normalizeHeight = (value: string | number | undefined): string => {
    if (value === undefined) return '48px';
    if (typeof value === 'number') return `${value}px`;
    return value;
  };

  const desktopHeight = normalizeHeight(height);
  const mobileHeightValue = normalizeHeight(mobileHeight ?? height);

  // Use CSS custom properties for responsive height
  const spacerStyle: React.CSSProperties = {
    height: desktopHeight,
    width: '100%',
  };

  // Generate unique ID for responsive styles
  const uniqueId = React.useId();

  return (
    <>
      <style>
        {`
          @media (max-width: ${theme.breakpoints.md}) {
            .spacer-${uniqueId.replace(/:/g, '')} {
              height: ${mobileHeightValue} !important;
            }
          }
        `}
      </style>
      <div
        style={spacerStyle}
        className={`spacer-${uniqueId.replace(/:/g, '')} ${className || ''}`}
        aria-hidden="true"
      />
    </>
  );
}

export default SpacerBlock;
