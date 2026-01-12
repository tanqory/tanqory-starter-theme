// =============================================================================
// Gallery Section (Draftbit pattern)
// =============================================================================

import React, { useState } from 'react';
import { TanqoryTheme, SectionStyles } from '../../themes';
import { ContainerBlock } from '../blocks/ContainerBlock';
import { HeadingBlock } from '../blocks/HeadingBlock';
import { TextBlock } from '../blocks/TextBlock';
import { ModalBlock } from '../blocks/ModalBlock';

// =============================================================================
// Types
// =============================================================================

export interface GalleryImage {
  id: string;
  src: string;
  alt?: string;
  caption?: string;
}

export interface GallerySectionProps {
  title?: string;
  description?: string;
  images: GalleryImage[];
  layout?: 'grid' | 'masonry' | 'carousel';
  columns?: 2 | 3 | 4 | 5;
  gap?: 'none' | 'small' | 'medium' | 'large';
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'auto';
  enableLightbox?: boolean;
  backgroundColor?: string;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const GallerySectionSchema = {
  name: 'Gallery',
  tag: 'section',
  settings: [
    {
      type: 'header',
      content: 'Content',
    },
    {
      id: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      id: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      type: 'header',
      content: 'Layout',
    },
    {
      id: 'layout',
      type: 'select',
      label: 'Layout',
      options: [
        { value: 'grid', label: 'Grid' },
        { value: 'masonry', label: 'Masonry' },
        { value: 'carousel', label: 'Carousel' },
      ],
      default: 'grid',
    },
    {
      id: 'columns',
      type: 'range',
      label: 'Columns',
      min: 2,
      max: 5,
      step: 1,
      default: 3,
    },
    {
      id: 'gap',
      type: 'select',
      label: 'Gap',
      options: [
        { value: 'none', label: 'None' },
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large', label: 'Large' },
      ],
      default: 'medium',
    },
    {
      id: 'aspectRatio',
      type: 'select',
      label: 'Aspect ratio',
      options: [
        { value: 'square', label: 'Square' },
        { value: 'portrait', label: 'Portrait' },
        { value: 'landscape', label: 'Landscape' },
        { value: 'auto', label: 'Auto' },
      ],
      default: 'square',
    },
    {
      id: 'enableLightbox',
      type: 'checkbox',
      label: 'Enable lightbox',
      default: true,
    },
    {
      id: 'backgroundColor',
      type: 'color',
      label: 'Background color',
    },
  ],
  blocks: [
    {
      type: 'image',
      name: 'Image',
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
          id: 'caption',
          type: 'text',
          label: 'Caption',
        },
      ],
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function GallerySection({
  title,
  description,
  images,
  layout = 'grid',
  columns = 3,
  gap = 'medium',
  aspectRatio = 'square',
  enableLightbox = true,
  backgroundColor,
  className,
}: GallerySectionProps) {
  const theme = TanqoryTheme;
  const sectionStyles = SectionStyles(theme);
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const sectionStyle: React.CSSProperties = {
    ...sectionStyles.base,
    backgroundColor: backgroundColor || theme.colors.background,
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: theme.spacing['2xl'],
    gap: theme.spacing.sm,
  };

  // Gap mappings
  const gapMap: Record<string, string> = {
    none: '0',
    small: theme.spacing.xs,
    medium: theme.spacing.md,
    large: theme.spacing.xl,
  };

  // Aspect ratio mappings
  const ratioMap: Record<string, string> = {
    square: '100%',
    portrait: '133%',
    landscape: '75%',
    auto: 'auto',
  };

  const gridStyle: React.CSSProperties = {
    display: layout === 'masonry' ? 'block' : 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: gapMap[gap],
    columnCount: layout === 'masonry' ? columns : undefined,
    columnGap: layout === 'masonry' ? gapMap[gap] : undefined,
  };

  const handleImageClick = (image: GalleryImage, index: number) => {
    if (enableLightbox) {
      setLightboxImage(image);
      setLightboxIndex(index);
    }
  };

  const handlePrev = () => {
    const newIndex = (lightboxIndex - 1 + images.length) % images.length;
    setLightboxIndex(newIndex);
    setLightboxImage(images[newIndex]);
  };

  const handleNext = () => {
    const newIndex = (lightboxIndex + 1) % images.length;
    setLightboxIndex(newIndex);
    setLightboxImage(images[newIndex]);
  };

  return (
    <section style={sectionStyle} className={className}>
      <ContainerBlock>
        {/* Header */}
        {(title || description) && (
          <div style={headerStyle}>
            {title && <HeadingBlock text={title} level="h2" alignment="center" />}
            {description && (
              <TextBlock
                text={description}
                preset="body"
                alignment="center"
                maxWidth="60"
              />
            )}
          </div>
        )}

        {/* Gallery Grid */}
        <div style={gridStyle} className="gallery-grid">
          {images.map((image, index) => (
            <div
              key={image.id}
              style={{
                position: 'relative',
                paddingBottom: aspectRatio === 'auto' ? undefined : ratioMap[aspectRatio],
                breakInside: layout === 'masonry' ? 'avoid' : undefined,
                marginBottom: layout === 'masonry' ? gapMap[gap] : undefined,
                cursor: enableLightbox ? 'pointer' : 'default',
                overflow: 'hidden',
                borderRadius: theme.borderRadius.md,
              }}
              onClick={() => handleImageClick(image, index)}
            >
              <img
                src={image.src}
                alt={image.alt || ''}
                style={{
                  position: aspectRatio === 'auto' ? 'relative' : 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: aspectRatio === 'auto' ? 'auto' : '100%',
                  objectFit: 'cover',
                  transition: `transform ${theme.transitions.normal} ${theme.transitions.easing}`,
                }}
                className="gallery-image"
              />
              {image.caption && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: theme.spacing.sm,
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                    color: 'white',
                    fontSize: theme.typography.fontSize.sm,
                  }}
                >
                  {image.caption}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {enableLightbox && lightboxImage && (
          <ModalBlock
            isOpen={!!lightboxImage}
            onClose={() => setLightboxImage(null)}
            size="full"
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                position: 'relative',
              }}
            >
              {/* Prev button */}
              <button
                onClick={handlePrev}
                style={{
                  position: 'absolute',
                  left: theme.spacing.lg,
                  background: 'rgba(255,255,255,0.9)',
                  border: 'none',
                  borderRadius: theme.borderRadius.full,
                  width: '48px',
                  height: '48px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              {/* Image */}
              <img
                src={lightboxImage.src}
                alt={lightboxImage.alt || ''}
                style={{
                  maxWidth: '90%',
                  maxHeight: '90vh',
                  objectFit: 'contain',
                }}
              />

              {/* Next button */}
              <button
                onClick={handleNext}
                style={{
                  position: 'absolute',
                  right: theme.spacing.lg,
                  background: 'rgba(255,255,255,0.9)',
                  border: 'none',
                  borderRadius: theme.borderRadius.full,
                  width: '48px',
                  height: '48px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>

              {/* Caption */}
              {lightboxImage.caption && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: theme.spacing.xl,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    color: 'white',
                    fontSize: theme.typography.fontSize.base,
                    textAlign: 'center',
                    maxWidth: '80%',
                  }}
                >
                  {lightboxImage.caption}
                </div>
              )}
            </div>
          </ModalBlock>
        )}

        {/* Hover styles */}
        <style>
          {`
            .gallery-image:hover {
              transform: scale(1.05);
            }
            @media (max-width: ${theme.breakpoints.md}) {
              .gallery-grid {
                grid-template-columns: repeat(2, 1fr) !important;
                column-count: 2 !important;
              }
            }
            @media (max-width: ${theme.breakpoints.sm}) {
              .gallery-grid {
                grid-template-columns: 1fr !important;
                column-count: 1 !important;
              }
            }
          `}
        </style>
      </ContainerBlock>
    </section>
  );
}

export default GallerySection;
