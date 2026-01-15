// =============================================================================
// Hero Section (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme, SectionStyles } from '../../themes';
import { ContainerBlock } from '../blocks/ContainerBlock';
import { HeadingBlock } from '../blocks/HeadingBlock';
import { TextBlock } from '../blocks/TextBlock';
import { ButtonBlock } from '../blocks/ButtonBlock';
import { ImageBlock } from '../blocks/ImageBlock';

// =============================================================================
// Types
// =============================================================================

export interface HeroSectionProps {
  heading?: string;
  subheading?: string;
  description?: string;
  primaryButton?: {
    label: string;
    link: string;
  };
  secondaryButton?: {
    label: string;
    link: string;
  };
  image?: {
    src: string;
    alt?: string;
  };
  backgroundImage?: string;
  layout?: 'left' | 'center' | 'right' | 'split';
  height?: 'small' | 'medium' | 'large' | 'full';
  overlay?: boolean;
  overlayOpacity?: number;
  textColor?: 'light' | 'dark';
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const HeroSectionSchema = {
  name: 'Hero',
  tag: 'section',
  settings: [
    {
      type: 'header',
      content: 'Content',
    },
    {
      id: 'heading',
      type: 'text',
      label: 'Heading',
      default: 'Welcome to our store',
    },
    {
      id: 'subheading',
      type: 'text',
      label: 'Subheading',
    },
    {
      id: 'description',
      type: 'richtext',
      label: 'Description',
    },
    {
      type: 'header',
      content: 'Buttons',
    },
    {
      id: 'primary_button_label',
      type: 'text',
      label: 'Primary button label',
      default: 'Shop now',
    },
    {
      id: 'primary_button_link',
      type: 'url',
      label: 'Primary button link',
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
      content: 'Media',
    },
    {
      id: 'image',
      type: 'image_picker',
      label: 'Image',
    },
    {
      id: 'backgroundImage',
      type: 'image_picker',
      label: 'Background image',
    },
    {
      type: 'header',
      content: 'Layout',
    },
    {
      id: 'layout',
      type: 'select',
      label: 'Content alignment',
      options: [
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'right', label: 'Right' },
        { value: 'split', label: 'Split (text + image)' },
      ],
      default: 'center',
    },
    {
      id: 'height',
      type: 'select',
      label: 'Height',
      options: [
        { value: 'small', label: 'Small (400px)' },
        { value: 'medium', label: 'Medium (600px)' },
        { value: 'large', label: 'Large (800px)' },
        { value: 'full', label: 'Full viewport' },
      ],
      default: 'medium',
    },
    {
      id: 'overlay',
      type: 'checkbox',
      label: 'Show overlay',
      default: true,
    },
    {
      id: 'overlayOpacity',
      type: 'range',
      label: 'Overlay opacity',
      min: 0,
      max: 100,
      step: 5,
      unit: '%',
      default: 40,
      visibleIf: '{{ settings.overlay }}',
    },
    {
      id: 'textColor',
      type: 'select',
      label: 'Text color',
      options: [
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
      ],
      default: 'light',
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function HeroSection({
  heading = 'Welcome to our store',
  subheading,
  description,
  primaryButton,
  secondaryButton,
  image,
  backgroundImage,
  layout = 'center',
  height = 'medium',
  overlay = true,
  overlayOpacity = 40,
  textColor = 'light',
  className,
}: HeroSectionProps) {
  const theme = TanqoryTheme;
  const sectionStyles = SectionStyles(theme);

  // Height mappings
  const heightMap: Record<string, string> = {
    small: '400px',
    medium: '600px',
    large: '800px',
    full: '100vh',
  };

  const isLight = textColor === 'light';
  const isSplit = layout === 'split';

  const sectionStyle: React.CSSProperties = {
    position: 'relative',
    minHeight: heightMap[height],
    display: 'flex',
    alignItems: 'center',
    backgroundColor: backgroundImage ? undefined : theme.colors.backgroundSecondary,
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    overflow: 'hidden',
  };

  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: `rgba(0, 0, 0, ${overlayOpacity / 100})`,
    pointerEvents: 'none',
  };

  const contentContainerStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    display: isSplit ? 'grid' : 'flex',
    gridTemplateColumns: isSplit ? '1fr 1fr' : undefined,
    gap: theme.spacing['2xl'],
    alignItems: 'center',
    justifyContent: layout === 'center' ? 'center' : undefined,
    textAlign: layout === 'center' ? 'center' : 'left',
    padding: `${theme.spacing['2xl']} 0`,
  };

  const textContentStyle: React.CSSProperties = {
    maxWidth: isSplit ? undefined : '700px',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
    alignItems: layout === 'center' ? 'center' : 'flex-start',
    order: layout === 'right' ? 1 : 0,
  };

  const buttonsStyle: React.CSSProperties = {
    display: 'flex',
    gap: theme.spacing.md,
    flexWrap: 'wrap',
    marginTop: theme.spacing.md,
    justifyContent: layout === 'center' ? 'center' : 'flex-start',
  };

  const headingColor = isLight ? theme.colors.secondary : theme.colors.foreground;
  const textColorValue = isLight ? 'rgba(255,255,255,0.9)' : theme.colors.foregroundSecondary;

  return (
    <section style={sectionStyle} className={className} data-section="HeroSection">
      {/* Overlay */}
      {overlay && backgroundImage && <div style={overlayStyle} />}

      <ContainerBlock>
        <div style={contentContainerStyle}>
          {/* Text Content */}
          <div style={textContentStyle}>
            {subheading && (
              <span
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: theme.typography.fontWeight.medium,
                  color: textColorValue,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                {subheading}
              </span>
            )}

            <HeadingBlock
              text={heading}
              level="h1"
              color={headingColor}
              alignment={layout === 'center' ? 'center' : 'left'}
            />

            {description && (
              <TextBlock
                text={description}
                preset="body"
                color={textColorValue}
                maxWidth="90"
                alignment={layout === 'center' ? 'center' : 'left'}
              />
            )}

            {(primaryButton || secondaryButton) && (
              <div style={buttonsStyle}>
                {primaryButton && (
                  <ButtonBlock
                    label={primaryButton.label}
                    link={primaryButton.link}
                    style="primary"
                  />
                )}
                {secondaryButton && (
                  <ButtonBlock
                    label={secondaryButton.label}
                    link={secondaryButton.link}
                    style={isLight ? 'secondary' : 'secondary'}
                  />
                )}
              </div>
            )}
          </div>

          {/* Image (for split layout) */}
          {isSplit && image && (
            <div style={{ order: 1 }}>
              <ImageBlock
                src={image.src}
                alt={image.alt}
                ratio="square"
                borderRadius="lg"
              />
            </div>
          )}
        </div>
      </ContainerBlock>
    </section>
  );
}

export default HeroSection;
