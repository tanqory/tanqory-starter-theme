// =============================================================================
// Logo Block (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme } from '../../themes';

// =============================================================================
// Types
// =============================================================================

export interface LogoBlockProps {
  src?: string;
  alt?: string;
  text?: string;
  width?: number | string;
  height?: number | string;
  link?: string;
  className?: string;
  onClick?: () => void;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const LogoBlockSchema = {
  name: 'Logo',
  tag: 'div',
  settings: [
    {
      id: 'src',
      type: 'image_picker',
      label: 'Logo image',
    },
    {
      id: 'alt',
      type: 'text',
      label: 'Alt text',
      default: 'Logo',
    },
    {
      id: 'text',
      type: 'text',
      label: 'Text fallback',
      info: 'Displayed when no image is set',
    },
    {
      id: 'width',
      type: 'range',
      label: 'Width',
      min: 40,
      max: 300,
      step: 10,
      unit: 'px',
      default: 120,
    },
    {
      id: 'height',
      type: 'range',
      label: 'Max height',
      min: 20,
      max: 100,
      step: 5,
      unit: 'px',
      default: 40,
    },
    {
      id: 'link',
      type: 'url',
      label: 'Link',
      default: '/',
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function LogoBlock({
  src,
  alt = 'Logo',
  text,
  width = 120,
  height = 40,
  link = '/',
  className,
  onClick,
}: LogoBlockProps) {
  const theme = TanqoryTheme;

  const normalizeSize = (value: number | string): string => {
    if (typeof value === 'number') return `${value}px`;
    return value;
  };

  const containerStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'inherit',
  };

  const imageStyle: React.CSSProperties = {
    width: normalizeSize(width),
    height: 'auto',
    maxHeight: normalizeSize(height),
    objectFit: 'contain',
  };

  const textStyle: React.CSSProperties = {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.foreground,
    whiteSpace: 'nowrap',
  };

  const content = src ? (
    <img src={src} alt={alt} style={imageStyle} />
  ) : text ? (
    <span style={textStyle}>{text}</span>
  ) : (
    <span style={textStyle}>Logo</span>
  );

  if (link) {
    return (
      <a href={link} style={containerStyle} className={className} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <div style={containerStyle} className={className} onClick={onClick}>
      {content}
    </div>
  );
}

export default LogoBlock;
