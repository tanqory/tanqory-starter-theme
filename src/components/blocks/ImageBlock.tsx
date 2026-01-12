// =============================================================================
// Image Block (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme } from '../../themes';
import { getImageUrl, getImageSrcSet } from '../../config/Images';

// =============================================================================
// Types
// =============================================================================

export interface ImageBlockProps {
  src?: string;
  alt?: string;
  link?: string;
  openInNewTab?: boolean;
  ratio?: 'adapt' | 'portrait' | 'square' | 'landscape' | 'wide';
  width?: 'full' | 'custom';
  customWidth?: string;
  height?: 'fit' | 'fill';
  borderRadius?: keyof typeof TanqoryTheme.borderRadius;
  objectFit?: 'cover' | 'contain' | 'fill';
  loading?: 'lazy' | 'eager';
  className?: string;
  onClick?: () => void;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const ImageBlockSchema = {
  name: 'Image',
  tag: 'figure',
  settings: [
    {
      id: 'src',
      type: 'image_picker',
      label: 'Image',
    },
    {
      id: 'alt',
      type: 'text',
      label: 'Alt text',
    },
    {
      id: 'link',
      type: 'url',
      label: 'Link',
    },
    {
      id: 'openInNewTab',
      type: 'checkbox',
      label: 'Open in new tab',
      default: false,
    },
    {
      id: 'ratio',
      type: 'select',
      label: 'Aspect ratio',
      options: [
        { value: 'adapt', label: 'Adapt to image' },
        { value: 'portrait', label: 'Portrait (3:4)' },
        { value: 'square', label: 'Square (1:1)' },
        { value: 'landscape', label: 'Landscape (4:3)' },
        { value: 'wide', label: 'Wide (16:9)' },
      ],
      default: 'adapt',
    },
    {
      id: 'width',
      type: 'select',
      label: 'Width',
      options: [
        { value: 'full', label: 'Full width' },
        { value: 'custom', label: 'Custom' },
      ],
      default: 'full',
    },
    {
      id: 'customWidth',
      type: 'range',
      label: 'Custom width',
      min: 0,
      max: 100,
      step: 1,
      unit: '%',
      default: 100,
      visibleIf: "{{ settings.width == 'custom' }}",
    },
    {
      id: 'borderRadius',
      type: 'select',
      label: 'Border radius',
      options: [
        { value: 'none', label: 'None' },
        { value: 'sm', label: 'Small' },
        { value: 'md', label: 'Medium' },
        { value: 'lg', label: 'Large' },
        { value: 'xl', label: 'Extra large' },
      ],
      default: 'none',
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function ImageBlock({
  src,
  alt = '',
  link,
  openInNewTab = false,
  ratio = 'adapt',
  width = 'full',
  customWidth,
  height = 'fit',
  borderRadius = 'none',
  objectFit = 'cover',
  loading = 'lazy',
  className,
  onClick,
}: ImageBlockProps) {
  const theme = TanqoryTheme;

  // Get aspect ratio padding
  const getAspectRatio = () => {
    switch (ratio) {
      case 'portrait':
        return '133.33%'; // 3:4
      case 'square':
        return '100%'; // 1:1
      case 'landscape':
        return '75%'; // 4:3
      case 'wide':
        return '56.25%'; // 16:9
      default:
        return undefined;
    }
  };

  // Container styles
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: width === 'custom' && customWidth ? customWidth : '100%',
    overflow: 'hidden',
    borderRadius: theme.borderRadius[borderRadius],
  };

  // Aspect ratio wrapper styles
  const aspectRatioStyle: React.CSSProperties = ratio !== 'adapt'
    ? {
        position: 'relative',
        paddingBottom: getAspectRatio(),
        height: 0,
      }
    : {};

  // Image styles
  const imageStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    height: ratio !== 'adapt' ? '100%' : 'auto',
    objectFit,
    ...(ratio !== 'adapt' && {
      position: 'absolute' as const,
      top: 0,
      left: 0,
    }),
  };

  // Placeholder for no image
  if (!src) {
    return (
      <div
        style={{
          ...containerStyle,
          ...aspectRatioStyle,
          backgroundColor: theme.colors.backgroundSecondary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: ratio === 'adapt' ? '200px' : undefined,
        }}
        className={className}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke={theme.colors.foregroundMuted}
          strokeWidth="1.5"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      </div>
    );
  }

  const imageUrl = getImageUrl(src);
  const srcSet = getImageSrcSet(src);

  const imageElement = (
    <div style={containerStyle} className={className}>
      {ratio !== 'adapt' ? (
        <div style={aspectRatioStyle}>
          <img
            src={imageUrl}
            srcSet={srcSet}
            alt={alt}
            loading={loading}
            style={imageStyle}
          />
        </div>
      ) : (
        <img
          src={imageUrl}
          srcSet={srcSet}
          alt={alt}
          loading={loading}
          style={imageStyle}
        />
      )}
    </div>
  );

  // Wrap with link if provided
  if (link) {
    return (
      <a
        href={link}
        target={openInNewTab ? '_blank' : undefined}
        rel={openInNewTab ? 'noopener noreferrer' : undefined}
        style={{ display: 'block' }}
        onClick={onClick}
      >
        {imageElement}
      </a>
    );
  }

  return onClick ? (
    <div onClick={onClick} style={{ cursor: 'pointer' }}>
      {imageElement}
    </div>
  ) : (
    imageElement
  );
}

export default ImageBlock;
