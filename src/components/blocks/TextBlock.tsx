// =============================================================================
// Text Block (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme, TextStyles } from '../../themes';

// =============================================================================
// Types
// =============================================================================

export interface TextBlockProps {
  text?: string;
  html?: string;
  preset?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'body' | 'bodySmall' | 'caption';
  alignment?: 'left' | 'center' | 'right';
  color?: string;
  maxWidth?: string;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const TextBlockSchema = {
  name: 'Text',
  tag: 'div',
  settings: [
    {
      id: 'text',
      type: 'richtext',
      label: 'Text',
      default: 'Enter your text here',
    },
    {
      id: 'preset',
      type: 'select',
      label: 'Style preset',
      options: [
        { value: 'h1', label: 'Heading 1' },
        { value: 'h2', label: 'Heading 2' },
        { value: 'h3', label: 'Heading 3' },
        { value: 'h4', label: 'Heading 4' },
        { value: 'h5', label: 'Heading 5' },
        { value: 'body', label: 'Body' },
        { value: 'bodySmall', label: 'Body Small' },
        { value: 'caption', label: 'Caption' },
      ],
      default: 'body',
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

export function TextBlock({
  text,
  html,
  preset = 'body',
  alignment = 'left',
  color,
  maxWidth,
  className,
}: TextBlockProps) {
  const theme = TanqoryTheme;
  const styles = TextStyles(theme);

  // Get style based on preset
  const textStyle: React.CSSProperties = {
    ...styles[preset],
    textAlign: alignment,
    maxWidth: maxWidth ? `${maxWidth}%` : undefined,
    ...(color && { color }),
    margin: 0,
  };

  // Get element tag based on preset
  const getTag = (): keyof JSX.IntrinsicElements => {
    switch (preset) {
      case 'h1':
        return 'h1';
      case 'h2':
        return 'h2';
      case 'h3':
        return 'h3';
      case 'h4':
        return 'h4';
      case 'h5':
        return 'h5';
      default:
        return 'p';
    }
  };

  const Tag = getTag();

  // Render HTML if provided
  if (html) {
    return (
      <div
        style={textStyle}
        className={className}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <Tag style={textStyle} className={className}>
      {text}
    </Tag>
  );
}

export default TextBlock;
