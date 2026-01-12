// =============================================================================
// Collection Card Block (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme, CardStyles } from '../../themes';
import type { Collection } from '../../apis/CollectionsApi';

// =============================================================================
// Types
// =============================================================================

export interface CollectionCardBlockProps {
  collection?: Collection;
  showImage?: boolean;
  showTitle?: boolean;
  showDescription?: boolean;
  showProductCount?: boolean;
  imageRatio?: 'adapt' | 'portrait' | 'square' | 'landscape' | 'wide';
  overlay?: boolean;
  overlayOpacity?: number;
  textPosition?: 'below' | 'overlay-bottom' | 'overlay-center';
  onClick?: (collection: Collection) => void;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const CollectionCardBlockSchema = {
  name: 'Collection Card',
  tag: 'article',
  settings: [
    {
      id: 'collection',
      type: 'collection',
      label: 'Collection',
    },
    {
      id: 'showImage',
      type: 'checkbox',
      label: 'Show image',
      default: true,
    },
    {
      id: 'showTitle',
      type: 'checkbox',
      label: 'Show title',
      default: true,
    },
    {
      id: 'showDescription',
      type: 'checkbox',
      label: 'Show description',
      default: false,
    },
    {
      id: 'showProductCount',
      type: 'checkbox',
      label: 'Show product count',
      default: false,
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
        { value: 'wide', label: 'Wide (16:9)' },
      ],
      default: 'square',
    },
    {
      id: 'overlay',
      type: 'checkbox',
      label: 'Show overlay',
      default: false,
    },
    {
      id: 'textPosition',
      type: 'select',
      label: 'Text position',
      options: [
        { value: 'below', label: 'Below image' },
        { value: 'overlay-bottom', label: 'Overlay bottom' },
        { value: 'overlay-center', label: 'Overlay center' },
      ],
      default: 'below',
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function CollectionCardBlock({
  collection,
  showImage = true,
  showTitle = true,
  showDescription = false,
  showProductCount = false,
  imageRatio = 'square',
  overlay = false,
  overlayOpacity = 0.3,
  textPosition = 'below',
  onClick,
  className,
}: CollectionCardBlockProps) {
  const theme = TanqoryTheme;
  const cardStyles = CardStyles(theme);

  if (!collection) {
    return <CollectionCardPlaceholder />;
  }

  // Get aspect ratio padding
  const getAspectRatio = () => {
    switch (imageRatio) {
      case 'portrait':
        return '133.33%';
      case 'square':
        return '100%';
      case 'landscape':
        return '75%';
      case 'wide':
        return '56.25%';
      default:
        return undefined;
    }
  };

  const isOverlayText = textPosition.startsWith('overlay');

  const containerStyle: React.CSSProperties = {
    ...cardStyles.interactive,
    position: 'relative',
  };

  const imageContainerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
  };

  const aspectRatioStyle: React.CSSProperties = imageRatio !== 'adapt'
    ? {
        position: 'relative',
        paddingBottom: getAspectRatio(),
        height: 0,
      }
    : {};

  const imageStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    height: imageRatio !== 'adapt' ? '100%' : 'auto',
    objectFit: 'cover',
    ...(imageRatio !== 'adapt' && {
      position: 'absolute' as const,
      top: 0,
      left: 0,
    }),
  };

  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
    pointerEvents: 'none',
  };

  const getTextContainerStyle = (): React.CSSProperties => {
    if (textPosition === 'overlay-center') {
      return {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        color: theme.colors.secondary,
        padding: theme.spacing.md,
        width: '100%',
      };
    }
    if (textPosition === 'overlay-bottom') {
      return {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        color: theme.colors.secondary,
        padding: theme.spacing.md,
        background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
      };
    }
    return {
      padding: theme.spacing.md,
      color: theme.colors.foreground,
    };
  };

  return (
    <article
      style={containerStyle}
      className={className}
      onClick={() => onClick?.(collection)}
    >
      {/* Image */}
      {showImage && (
        <div style={imageContainerStyle}>
          {imageRatio !== 'adapt' ? (
            <div style={aspectRatioStyle}>
              {collection.image ? (
                <img
                  src={collection.image.src}
                  alt={collection.image.altText || collection.title}
                  style={imageStyle}
                  loading="lazy"
                />
              ) : (
                <div
                  style={{
                    ...imageStyle,
                    backgroundColor: theme.colors.backgroundSecondary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
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
              )}
              {(overlay || isOverlayText) && <div style={overlayStyle} />}
            </div>
          ) : (
            <>
              {collection.image ? (
                <img
                  src={collection.image.src}
                  alt={collection.image.altText || collection.title}
                  style={imageStyle}
                  loading="lazy"
                />
              ) : (
                <div
                  style={{
                    ...imageStyle,
                    backgroundColor: theme.colors.backgroundSecondary,
                    minHeight: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
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
              )}
              {(overlay || isOverlayText) && <div style={overlayStyle} />}
            </>
          )}

          {/* Overlay text */}
          {isOverlayText && (
            <div style={getTextContainerStyle()}>
              {showTitle && (
                <h3
                  style={{
                    fontSize: theme.typography.fontSize.xl,
                    fontWeight: theme.typography.fontWeight.semibold,
                    margin: 0,
                    marginBottom: showDescription ? theme.spacing.xs : 0,
                  }}
                >
                  {collection.title}
                </h3>
              )}
              {showDescription && collection.description && (
                <p
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    margin: 0,
                    opacity: 0.9,
                  }}
                >
                  {collection.description}
                </p>
              )}
              {showProductCount && collection.productsCount !== undefined && (
                <span
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    opacity: 0.8,
                  }}
                >
                  {collection.productsCount} products
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Text below image */}
      {!isOverlayText && (showTitle || showDescription || showProductCount) && (
        <div style={getTextContainerStyle()}>
          {showTitle && (
            <h3
              style={{
                fontSize: theme.typography.fontSize.lg,
                fontWeight: theme.typography.fontWeight.medium,
                color: theme.colors.foreground,
                margin: 0,
                marginBottom: showDescription ? theme.spacing.xs : 0,
              }}
            >
              {collection.title}
            </h3>
          )}
          {showDescription && collection.description && (
            <p
              style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.foregroundSecondary,
                margin: 0,
              }}
            >
              {collection.description}
            </p>
          )}
          {showProductCount && collection.productsCount !== undefined && (
            <span
              style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.foregroundMuted,
              }}
            >
              {collection.productsCount} products
            </span>
          )}
        </div>
      )}
    </article>
  );
}

// =============================================================================
// Placeholder Component
// =============================================================================

function CollectionCardPlaceholder() {
  const theme = TanqoryTheme;
  const cardStyles = CardStyles(theme);

  return (
    <div style={cardStyles.base}>
      <div
        style={{
          position: 'relative',
          paddingBottom: '100%',
          backgroundColor: theme.colors.backgroundSecondary,
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
      </div>
      <div style={{ padding: theme.spacing.md }}>
        <div
          style={{
            width: '50%',
            height: '16px',
            backgroundColor: theme.colors.backgroundSecondary,
            borderRadius: theme.borderRadius.sm,
          }}
        />
      </div>
    </div>
  );
}

export default CollectionCardBlock;
