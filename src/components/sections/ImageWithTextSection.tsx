// =============================================================================
// Image With Text Section (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme, SectionStyles } from '../../themes';
import { ContainerBlock } from '../blocks/ContainerBlock';
import { ImageBlock } from '../blocks/ImageBlock';
import { HeadingBlock } from '../blocks/HeadingBlock';
import { TextBlock } from '../blocks/TextBlock';
import { ButtonBlock } from '../blocks/ButtonBlock';

// =============================================================================
// Types
// =============================================================================

export interface ImageWithTextSectionProps {
  image?: {
    src: string;
    alt?: string;
  };
  heading?: string;
  subheading?: string;
  content?: string;
  button?: {
    label: string;
    link: string;
  };
  secondaryButton?: {
    label: string;
    link: string;
  };
  imagePosition?: 'left' | 'right';
  imageWidth?: 'small' | 'medium' | 'large';
  imageRatio?: 'adapt' | 'portrait' | 'square' | 'landscape';
  verticalAlignment?: 'top' | 'center' | 'bottom';
  backgroundColor?: string;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const ImageWithTextSectionSchema = {
  name: 'Image With Text',
  tag: 'section',
  settings: [
    {
      type: 'header',
      content: 'Image',
    },
    {
      id: 'image',
      type: 'image_picker',
      label: 'Image',
    },
    {
      id: 'imagePosition',
      type: 'select',
      label: 'Image position',
      options: [
        { value: 'left', label: 'Left' },
        { value: 'right', label: 'Right' },
      ],
      default: 'left',
    },
    {
      id: 'imageWidth',
      type: 'select',
      label: 'Image width',
      options: [
        { value: 'small', label: 'Small (40%)' },
        { value: 'medium', label: 'Medium (50%)' },
        { value: 'large', label: 'Large (60%)' },
      ],
      default: 'medium',
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
      default: 'adapt',
    },
    {
      type: 'header',
      content: 'Content',
    },
    {
      id: 'subheading',
      type: 'text',
      label: 'Subheading',
    },
    {
      id: 'heading',
      type: 'text',
      label: 'Heading',
      default: 'Image with text',
    },
    {
      id: 'content',
      type: 'richtext',
      label: 'Content',
    },
    {
      type: 'header',
      content: 'Buttons',
    },
    {
      id: 'button_label',
      type: 'text',
      label: 'Button label',
    },
    {
      id: 'button_link',
      type: 'url',
      label: 'Button link',
    },
    {
      id: 'secondary_button_label',
      type: 'text',
      label: 'Secondary button label',
    },
    {
      id: 'secondary_button_link',
      type: 'url',
      label: 'Secondary button link',
    },
    {
      type: 'header',
      content: 'Layout',
    },
    {
      id: 'verticalAlignment',
      type: 'select',
      label: 'Vertical alignment',
      options: [
        { value: 'top', label: 'Top' },
        { value: 'center', label: 'Center' },
        { value: 'bottom', label: 'Bottom' },
      ],
      default: 'center',
    },
    {
      id: 'backgroundColor',
      type: 'color',
      label: 'Background color',
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function ImageWithTextSection({
  image,
  heading,
  subheading,
  content,
  button,
  secondaryButton,
  imagePosition = 'left',
  imageWidth = 'medium',
  imageRatio = 'adapt',
  verticalAlignment = 'center',
  backgroundColor,
  className,
}: ImageWithTextSectionProps) {
  const theme = TanqoryTheme;
  const sectionStyles = SectionStyles(theme);

  // Image width mappings
  const imageWidthMap: Record<string, string> = {
    small: '40%',
    medium: '50%',
    large: '60%',
  };

  // Vertical alignment mappings
  const alignmentMap: Record<string, string> = {
    top: 'flex-start',
    center: 'center',
    bottom: 'flex-end',
  };

  const sectionStyle: React.CSSProperties = {
    ...sectionStyles.base,
    backgroundColor: backgroundColor || theme.colors.background,
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: imagePosition === 'left'
      ? `${imageWidthMap[imageWidth]} 1fr`
      : `1fr ${imageWidthMap[imageWidth]}`,
    gap: theme.spacing['3xl'],
    alignItems: alignmentMap[verticalAlignment],
  };

  const imageContainerStyle: React.CSSProperties = {
    order: imagePosition === 'left' ? 0 : 1,
  };

  const contentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
    order: imagePosition === 'left' ? 1 : 0,
  };

  const buttonsStyle: React.CSSProperties = {
    display: 'flex',
    gap: theme.spacing.md,
    flexWrap: 'wrap',
    marginTop: theme.spacing.sm,
  };

  return (
    <section style={sectionStyle} className={className}>
      <ContainerBlock>
        <div style={gridStyle} className="image-with-text-grid">
          {/* Image */}
          <div style={imageContainerStyle}>
            {image ? (
              <ImageBlock
                src={image.src}
                alt={image.alt}
                ratio={imageRatio}
                borderRadius="lg"
              />
            ) : (
              <div
                style={{
                  aspectRatio: imageRatio === 'adapt' ? '4/3' : undefined,
                  paddingBottom: imageRatio !== 'adapt' ? getAspectRatio(imageRatio) : undefined,
                  backgroundColor: theme.colors.backgroundSecondary,
                  borderRadius: theme.borderRadius.lg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
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
            )}
          </div>

          {/* Content */}
          <div style={contentStyle}>
            {subheading && (
              <span
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: theme.typography.fontWeight.medium,
                  color: theme.colors.foregroundMuted,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                {subheading}
              </span>
            )}

            {heading && <HeadingBlock text={heading} level="h2" />}

            {content && (
              <TextBlock html={content} preset="body" />
            )}

            {(button || secondaryButton) && (
              <div style={buttonsStyle}>
                {button && (
                  <ButtonBlock
                    label={button.label}
                    link={button.link}
                    style="primary"
                  />
                )}
                {secondaryButton && (
                  <ButtonBlock
                    label={secondaryButton.label}
                    link={secondaryButton.link}
                    style="secondary"
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {/* Responsive styles */}
        <style>
          {`
            @media (max-width: ${theme.breakpoints.lg}) {
              .image-with-text-grid {
                grid-template-columns: 1fr !important;
              }
              .image-with-text-grid > div {
                order: 0 !important;
              }
            }
          `}
        </style>
      </ContainerBlock>
    </section>
  );
}

// Helper function
function getAspectRatio(ratio: string): string {
  switch (ratio) {
    case 'portrait':
      return '133.33%';
    case 'square':
      return '100%';
    case 'landscape':
      return '75%';
    default:
      return '75%';
  }
}

export default ImageWithTextSection;
