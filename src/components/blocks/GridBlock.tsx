// =============================================================================
// Grid Block (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme } from '../../themes';

// =============================================================================
// Types
// =============================================================================

export interface GridBlockProps {
  children: React.ReactNode;
  columns?: number | { mobile: number; tablet: number; desktop: number };
  gap?: number | string;
  rowGap?: number | string;
  columnGap?: number | string;
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  justifyItems?: 'start' | 'center' | 'end' | 'stretch';
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const GridBlockSchema = {
  name: 'Grid',
  tag: 'div',
  settings: [
    {
      id: 'columns',
      type: 'range',
      label: 'Columns (Desktop)',
      min: 1,
      max: 12,
      step: 1,
      default: 4,
    },
    {
      id: 'columnsTablet',
      type: 'range',
      label: 'Columns (Tablet)',
      min: 1,
      max: 8,
      step: 1,
      default: 3,
    },
    {
      id: 'columnsMobile',
      type: 'range',
      label: 'Columns (Mobile)',
      min: 1,
      max: 4,
      step: 1,
      default: 2,
    },
    {
      id: 'gap',
      type: 'range',
      label: 'Gap',
      min: 0,
      max: 64,
      step: 4,
      unit: 'px',
      default: 16,
    },
    {
      id: 'alignItems',
      type: 'select',
      label: 'Align items',
      options: [
        { value: 'start', label: 'Start' },
        { value: 'center', label: 'Center' },
        { value: 'end', label: 'End' },
        { value: 'stretch', label: 'Stretch' },
      ],
      default: 'stretch',
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function GridBlock({
  children,
  columns = 4,
  gap = 16,
  rowGap,
  columnGap,
  alignItems = 'stretch',
  justifyItems = 'stretch',
  className,
}: GridBlockProps) {
  const theme = TanqoryTheme;
  const uniqueId = React.useId();

  // Normalize gap values
  const normalizeGap = (value: number | string | undefined): string => {
    if (value === undefined) return '';
    if (typeof value === 'number') return `${value}px`;
    return value;
  };

  // Get column values for responsive
  const getColumns = () => {
    if (typeof columns === 'number') {
      return { mobile: Math.min(2, columns), tablet: Math.min(3, columns), desktop: columns };
    }
    return columns;
  };

  const cols = getColumns();
  const gapValue = normalizeGap(gap);
  const rowGapValue = normalizeGap(rowGap) || gapValue;
  const columnGapValue = normalizeGap(columnGap) || gapValue;

  return (
    <>
      <style>
        {`
          .grid-${uniqueId.replace(/:/g, '')} {
            display: grid;
            grid-template-columns: repeat(${cols.mobile}, 1fr);
            gap: ${gapValue};
            row-gap: ${rowGapValue};
            column-gap: ${columnGapValue};
            align-items: ${alignItems};
            justify-items: ${justifyItems};
          }

          @media (min-width: ${theme.breakpoints.md}) {
            .grid-${uniqueId.replace(/:/g, '')} {
              grid-template-columns: repeat(${cols.tablet}, 1fr);
            }
          }

          @media (min-width: ${theme.breakpoints.lg}) {
            .grid-${uniqueId.replace(/:/g, '')} {
              grid-template-columns: repeat(${cols.desktop}, 1fr);
            }
          }
        `}
      </style>
      <div className={`grid-${uniqueId.replace(/:/g, '')} ${className || ''}`}>
        {children}
      </div>
    </>
  );
}

export default GridBlock;
