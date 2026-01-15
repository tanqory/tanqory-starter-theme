// =============================================================================
// Banner Section (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme, SectionStyles } from '../../themes';
import { ContainerBlock } from '../blocks/ContainerBlock';
import { HeadingBlock } from '../blocks/HeadingBlock';
import { TextBlock } from '../blocks/TextBlock';
import { ButtonBlock } from '../blocks/ButtonBlock';

// =============================================================================
// Types
// =============================================================================

export interface BannerSectionProps {
  title: string;
  description?: string;
  button?: {
    label: string;
    link: string;
  };
  secondaryButton?: {
    label: string;
    link: string;
  };
  alignment?: 'left' | 'center' | 'right';
  layout?: 'horizontal' | 'vertical';
  backgroundColor?: string;
  backgroundGradient?: string;
  backgroundImage?: string;
  overlayOpacity?: number;
  textColor?: 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  rounded?: boolean;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const BannerSectionSchema = {
  name: 'Banner',
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
      content: 'Buttons',
    },
    {
      id: 'button_label',
      type: 'text',
      label: 'Primary button label',
    },
    {
      id: 'button_link',
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
      content: 'Layout',
    },
    {
      id: 'alignment',
      type: 'text_alignment',
      label: 'Alignment',
      default: 'center',
    },
    {
      id: 'layout',
      type: 'select',
      label: 'Layout',
      options: [
        { value: 'horizontal', label: 'Horizontal' },
        { value: 'vertical', label: 'Vertical' },
      ],
      default: 'vertical',
    },
    {
      id: 'size',
      type: 'select',
      label: 'Size',
      options: [
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large', label: 'Large' },
      ],
      default: 'medium',
    },
    {
      id: 'fullWidth',
      type: 'checkbox',
      label: 'Full width',
      default: false,
    },
    {
      id: 'rounded',
      type: 'checkbox',
      label: 'Rounded corners',
      default: true,
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
      id: 'backgroundGradient',
      type: 'text',
      label: 'Background gradient',
      placeholder: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      id: 'backgroundImage',
      type: 'image_picker',
      label: 'Background image',
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
      default: 'light',
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function BannerSection({
  title,
  description,
  button,
  secondaryButton,
  alignment = 'center',
  layout = 'vertical',
  backgroundColor,
  backgroundGradient,
  backgroundImage,
  overlayOpacity = 50,
  textColor = 'light',
  size = 'medium',
  fullWidth = false,
  rounded = true,
  className,
}: BannerSectionProps) {
  const theme = TanqoryTheme;
  const sectionStyles = SectionStyles(theme);
  const isLight = textColor === 'light';

  // Padding mappings based on size
  const paddingMap: Record<string, string> = {
    small: theme.spacing.lg,
    medium: theme.spacing['2xl'],
    large: theme.spacing['3xl'],
  };

  const sectionStyle: React.CSSProperties = {
    ...sectionStyles.base,
    padding: fullWidth ? `${theme.spacing.xl} 0` : theme.spacing.xl,
  };

  const bannerStyle: React.CSSProperties = {
    position: 'relative',
    padding: paddingMap[size],
    borderRadius: rounded ? theme.borderRadius.xl : 0,
    overflow: 'hidden',
    backgroundColor: backgroundColor || theme.colors.primary,
    backgroundImage: backgroundGradient
      ? backgroundGradient
      : backgroundImage
      ? `url(${backgroundImage})`
      : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const overlayStyle: React.CSSProperties = backgroundImage
    ? {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: `rgba(0, 0, 0, ${overlayOpacity / 100})`,
        pointerEvents: 'none',
      }
    : {};

  const contentStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: layout === 'horizontal' ? 'row' : 'column',
    alignItems: layout === 'horizontal' ? 'center' : alignment === 'center' ? 'center' : alignment === 'right' ? 'flex-end' : 'flex-start',
    justifyContent: layout === 'horizontal' ? 'space-between' : 'center',
    gap: theme.spacing.lg,
    textAlign: layout === 'horizontal' ? 'left' : alignment,
  };

  const textContainerStyle: React.CSSProperties = {
    flex: layout === 'horizontal' ? 1 : undefined,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm,
    alignItems: layout === 'horizontal' ? 'flex-start' : alignment === 'center' ? 'center' : alignment === 'right' ? 'flex-end' : 'flex-start',
  };

  const buttonsStyle: React.CSSProperties = {
    display: 'flex',
    gap: theme.spacing.md,
    flexWrap: 'wrap',
    justifyContent: layout === 'horizontal' ? 'flex-end' : alignment === 'center' ? 'center' : alignment === 'right' ? 'flex-end' : 'flex-start',
  };

  const headingColor = isLight ? 'white' : theme.colors.foreground;
  const textColorValue = isLight ? 'rgba(255,255,255,0.9)' : theme.colors.foregroundSecondary;

  return (
    <section data-section="BannerSection" style={sectionStyle} className={className}>
      <ContainerBlock variant={fullWidth ? 'full' : 'page'}>
        <div style={bannerStyle}>
          {backgroundImage && <div style={overlayStyle} />}

          <div style={contentStyle}>
            {/* Text Content */}
            <div style={textContainerStyle}>
              <HeadingBlock
                text={title}
                level={size === 'small' ? 'h4' : size === 'large' ? 'h2' : 'h3'}
                color={headingColor}
                alignment={layout === 'horizontal' ? 'left' : alignment}
              />
              {description && (
                <TextBlock
                  text={description}
                  preset="body"
                  color={textColorValue}
                  alignment={layout === 'horizontal' ? 'left' : alignment}
                />
              )}
            </div>

            {/* Buttons */}
            {(button || secondaryButton) && (
              <div style={buttonsStyle}>
                {button && (
                  <ButtonBlock
                    label={button.label}
                    link={button.link}
                    style={isLight ? 'secondary' : 'primary'}
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
      </ContainerBlock>

      {/* Responsive styles */}
      <style>
        {`
          @media (max-width: ${theme.breakpoints.md}) {
            .banner-content {
              flex-direction: column !important;
              text-align: center !important;
            }
          }
        `}
      </style>
    </section>
  );
}

export default BannerSection;
