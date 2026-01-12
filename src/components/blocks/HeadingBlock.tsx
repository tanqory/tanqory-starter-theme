// =============================================================================
// Heading Block (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme, TextStyles } from '../../themes';

// =============================================================================
// Types
// =============================================================================

export interface HeadingBlockProps {
  text?: string;
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  alignment?: 'left' | 'center' | 'right';
  color?: string;
  maxWidth?: string;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const HeadingBlockSchema = {
  name: 'Heading',
  tag: 'heading',
  settings: [
    {
      id: 'text',
      type: 'text',
      label: 'Heading text',
      default: 'Heading',
    },
    {
      id: 'level',
      type: 'select',
      label: 'Heading level',
      options: [
        { value: 'h1', label: 'H1' },
        { value: 'h2', label: 'H2' },
        { value: 'h3', label: 'H3' },
        { value: 'h4', label: 'H4' },
        { value: 'h5', label: 'H5' },
        { value: 'h6', label: 'H6' },
      ],
      default: 'h2',
    },
    {
      id: 'alignment',
      type: 'text_alignment',
      label: 'Alignment',
      default: 'left',
    },
    {
      id: 'color',
      type: 'color',
      label: 'Color',
    },
    {
      id: 'maxWidth',
      type: 'range',
      label: 'Max width',
      min: 0,
      max: 100,
      step: 1,
      unit: '%',
      default: 100,
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function HeadingBlock({
  text = 'Heading',
  level = 'h2',
  alignment = 'left',
  color,
  maxWidth,
  className,
}: HeadingBlockProps) {
  const theme = TanqoryTheme;
  const styles = TextStyles(theme);

  // Map heading level to style preset
  const styleMap: Record<string, keyof ReturnType<typeof TextStyles>> = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h5', // Use h5 style for h6
  };

  const headingStyle: React.CSSProperties = {
    ...styles[styleMap[level]],
    textAlign: alignment,
    maxWidth: maxWidth ? `${maxWidth}%` : undefined,
    ...(color && { color }),
    margin: 0,
  };

  const Tag = level as keyof JSX.IntrinsicElements;

  return (
    <Tag style={headingStyle} className={className}>
      {text}
    </Tag>
  );
}

export default HeadingBlock;
