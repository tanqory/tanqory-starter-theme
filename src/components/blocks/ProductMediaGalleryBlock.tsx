// =============================================================================
// Product Media Gallery Block (Draftbit pattern)
// =============================================================================

import React, { useState } from 'react';
import { TanqoryTheme } from '../../themes';
import type { ProductImage } from '../../apis/ProductsApi';

// =============================================================================
// Types
// =============================================================================

export interface ProductMediaGalleryBlockProps {
  images: ProductImage[];
  layout?: 'thumbnails-left' | 'thumbnails-bottom' | 'grid' | 'carousel';
  imageRatio?: 'adapt' | 'portrait' | 'square' | 'landscape';
  thumbnailSize?: number;
  enableZoom?: boolean;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const ProductMediaGalleryBlockSchema = {
  name: 'Product Media Gallery',
  tag: 'div',
  settings: [
    {
      id: 'layout',
      type: 'select',
      label: 'Layout',
      options: [
        { value: 'thumbnails-left', label: 'Thumbnails left' },
        { value: 'thumbnails-bottom', label: 'Thumbnails bottom' },
        { value: 'grid', label: 'Grid' },
        { value: 'carousel', label: 'Carousel' },
      ],
      default: 'thumbnails-left',
    },
    {
      id: 'imageRatio',
      type: 'select',
      label: 'Image ratio',
      options: [
        { value: 'adapt', label: 'Adapt to image' },
        { value: 'portrait', label: 'Portrait (3:4)' },
        { value: 'square', label: 'Square (1:1)' },
        { value: 'landscape', label: 'Landscape (4:3)' },
      ],
      default: 'square',
    },
    {
      id: 'thumbnailSize',
      type: 'range',
      label: 'Thumbnail size',
      min: 40,
      max: 120,
      step: 10,
      unit: 'px',
      default: 80,
    },
    {
      id: 'enableZoom',
      type: 'checkbox',
      label: 'Enable zoom on hover',
      default: true,
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function ProductMediaGalleryBlock({
  images,
  layout = 'thumbnails-left',
  imageRatio = 'square',
  thumbnailSize = 80,
  enableZoom = true,
  className,
}: ProductMediaGalleryBlockProps) {
  const theme = TanqoryTheme;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  if (!images || images.length === 0) {
    return <GalleryPlaceholder />;
  }

  const selectedImage = images[selectedIndex];

  // Get aspect ratio padding
  const getAspectRatio = () => {
    switch (imageRatio) {
      case 'portrait':
        return '133.33%';
      case 'square':
        return '100%';
      case 'landscape':
        return '75%';
      default:
        return undefined;
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableZoom) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const isThumbsLeft = layout === 'thumbnails-left';
  const isThumbsBottom = layout === 'thumbnails-bottom';
  const isGrid = layout === 'grid';

  // Grid layout
  if (isGrid) {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: theme.spacing.sm,
        }}
        className={className}
      >
        {images.map((image, index) => (
          <div
            key={image.id || index}
            style={{
              position: 'relative',
              paddingBottom: getAspectRatio(),
              overflow: 'hidden',
              borderRadius: theme.borderRadius.md,
            }}
          >
            <img
              src={image.src}
              alt={image.altText || ''}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              loading={index > 3 ? 'lazy' : 'eager'}
            />
          </div>
        ))}
      </div>
    );
  }

  // Thumbnails layout
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: isThumbsLeft ? 'row' : 'column',
    gap: theme.spacing.md,
  };

  const thumbnailsStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: isThumbsLeft ? 'column' : 'row',
    gap: theme.spacing.xs,
    order: isThumbsLeft ? -1 : 1,
    overflowX: isThumbsBottom ? 'auto' : undefined,
    overflowY: isThumbsLeft ? 'auto' : undefined,
    maxHeight: isThumbsLeft ? '500px' : undefined,
  };

  const mainImageStyle: React.CSSProperties = {
    flex: 1,
    position: 'relative',
    paddingBottom: imageRatio !== 'adapt' ? getAspectRatio() : undefined,
    overflow: 'hidden',
    borderRadius: theme.borderRadius.lg,
    cursor: enableZoom ? 'zoom-in' : undefined,
  };

  return (
    <div style={containerStyle} className={className}>
      {/* Main Image */}
      <div
        style={mainImageStyle}
        onMouseEnter={() => enableZoom && setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={selectedImage.src}
          alt={selectedImage.altText || ''}
          style={{
            position: imageRatio !== 'adapt' ? 'absolute' : undefined,
            top: 0,
            left: 0,
            width: '100%',
            height: imageRatio !== 'adapt' ? '100%' : 'auto',
            objectFit: 'cover',
            transform: isZoomed ? 'scale(2)' : 'scale(1)',
            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
            transition: isZoomed ? 'none' : `transform ${theme.transitions.fast} ${theme.transitions.easing}`,
          }}
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div style={thumbnailsStyle}>
          {images.map((image, index) => (
            <button
              key={image.id || index}
              type="button"
              onClick={() => setSelectedIndex(index)}
              style={{
                width: thumbnailSize,
                height: thumbnailSize,
                flexShrink: 0,
                borderRadius: theme.borderRadius.sm,
                overflow: 'hidden',
                border: index === selectedIndex
                  ? `2px solid ${theme.colors.foreground}`
                  : `2px solid transparent`,
                padding: 0,
                cursor: 'pointer',
                background: 'none',
                transition: `border-color ${theme.transitions.fast} ${theme.transitions.easing}`,
              }}
              aria-label={`View image ${index + 1}`}
              aria-current={index === selectedIndex}
            >
              <img
                src={image.src}
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// Placeholder Component
// =============================================================================

function GalleryPlaceholder() {
  const theme = TanqoryTheme;

  return (
    <div
      style={{
        position: 'relative',
        paddingBottom: '100%',
        backgroundColor: theme.colors.backgroundSecondary,
        borderRadius: theme.borderRadius.lg,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <svg
          width="64"
          height="64"
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
    </div>
  );
}

export default ProductMediaGalleryBlock;
