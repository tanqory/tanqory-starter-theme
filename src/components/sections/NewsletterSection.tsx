// =============================================================================
// Newsletter Section (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme, SectionStyles } from '../../themes';
import { ContainerBlock } from '../blocks/ContainerBlock';
import { HeadingBlock } from '../blocks/HeadingBlock';
import { TextBlock } from '../blocks/TextBlock';
import { EmailSignupBlock } from '../blocks/EmailSignupBlock';

// =============================================================================
// Types
// =============================================================================

export interface NewsletterSectionProps {
  title?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  successMessage?: string;
  alignment?: 'left' | 'center' | 'right';
  maxWidth?: 'narrow' | 'medium' | 'wide';
  backgroundColor?: string;
  backgroundImage?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  textColor?: 'light' | 'dark';
  onSubmit?: (email: string) => Promise<void>;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const NewsletterSectionSchema = {
  name: 'Newsletter',
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
      default: 'Subscribe to our newsletter',
    },
    {
      id: 'description',
      type: 'textarea',
      label: 'Description',
      default: 'Get the latest updates on new products and upcoming sales.',
    },
    {
      id: 'placeholder',
      type: 'text',
      label: 'Input placeholder',
      default: 'Enter your email',
    },
    {
      id: 'buttonText',
      type: 'text',
      label: 'Button text',
      default: 'Subscribe',
    },
    {
      id: 'successMessage',
      type: 'text',
      label: 'Success message',
      default: 'Thanks for subscribing!',
    },
    {
      type: 'header',
      content: 'Layout',
    },
    {
      id: 'alignment',
      type: 'text_alignment',
      label: 'Alignment',
      default: 'center',
    },
    {
      id: 'maxWidth',
      type: 'select',
      label: 'Form max width',
      options: [
        { value: 'narrow', label: 'Narrow (400px)' },
        { value: 'medium', label: 'Medium (500px)' },
        { value: 'wide', label: 'Wide (600px)' },
      ],
      default: 'medium',
    },
    {
      type: 'header',
      content: 'Background',
    },
    {
      id: 'backgroundColor',
      type: 'color',
      label: 'Background color',
    },
    {
      id: 'backgroundImage',
      type: 'image_picker',
      label: 'Background image',
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
      default: 50,
    },
    {
      id: 'textColor',
      type: 'select',
      label: 'Text color',
      options: [
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
      ],
      default: 'dark',
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function NewsletterSection({
  title = 'Subscribe to our newsletter',
  description = 'Get the latest updates on new products and upcoming sales.',
  placeholder = 'Enter your email',
  buttonText = 'Subscribe',
  successMessage = 'Thanks for subscribing!',
  alignment = 'center',
  maxWidth = 'medium',
  backgroundColor,
  backgroundImage,
  overlay = true,
  overlayOpacity = 50,
  textColor = 'dark',
  onSubmit,
  className,
}: NewsletterSectionProps) {
  const theme = TanqoryTheme;
  const sectionStyles = SectionStyles(theme);

  const isLight = textColor === 'light';

  // Max width mappings
  const maxWidthMap: Record<string, string> = {
    narrow: '400px',
    medium: '500px',
    wide: '600px',
  };

  const sectionStyle: React.CSSProperties = {
    ...sectionStyles.base,
    position: 'relative',
    backgroundColor: backgroundColor || (backgroundImage ? undefined : theme.colors.backgroundSecondary),
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
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

  const contentStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: alignment === 'center' ? 'center' : alignment === 'right' ? 'flex-end' : 'flex-start',
    textAlign: alignment,
    gap: theme.spacing.md,
  };

  const formContainerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: maxWidthMap[maxWidth],
  };

  const headingColor = isLight ? theme.colors.secondary : theme.colors.foreground;
  const textColorValue = isLight ? 'rgba(255,255,255,0.9)' : theme.colors.foregroundSecondary;

  return (
    <section data-section="NewsletterSection" style={sectionStyle} className={className}>
      {/* Overlay */}
      {overlay && backgroundImage && <div style={overlayStyle} />}

      <ContainerBlock>
        <div style={contentStyle}>
          {title && (
            <HeadingBlock text={title} level="h2" alignment={alignment} color={headingColor} />
          )}

          {description && (
            <TextBlock
              text={description}
              preset="body"
              alignment={alignment}
              color={textColorValue}
            />
          )}

          <div style={formContainerStyle}>
            <EmailSignupBlock
              placeholder={placeholder}
              buttonText={buttonText}
              successMessage={successMessage}
              layout="inline"
              size="lg"
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </ContainerBlock>
    </section>
  );
}

export default NewsletterSection;
