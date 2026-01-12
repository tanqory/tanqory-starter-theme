// =============================================================================
// Logo List Section (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme, SectionStyles } from '../../themes';
import { ContainerBlock } from '../blocks/ContainerBlock';
import { HeadingBlock } from '../blocks/HeadingBlock';

// =============================================================================
// Types
// =============================================================================

export interface Logo {
  id: string;
  image: string;
  alt?: string;
  link?: string;
}

export interface LogoListSectionProps {
  title?: string;
  logos: Logo[];
  layout?: 'grid' | 'marquee';
  columns?: 4 | 5 | 6 | 7 | 8;
  logoWidth?: number;
  grayscale?: boolean;
  showOnHover?: boolean;
  backgroundColor?: string;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const LogoListSectionSchema = {
  name: 'Logo List',
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
      type: 'header',
      content: 'Layout',
    },
    {
      id: 'layout',
      type: 'select',
      label: 'Layout',
      options: [
        { value: 'grid', label: 'Grid' },
        { value: 'marquee', label: 'Marquee' },
      ],
      default: 'grid',
    },
    {
      id: 'columns',
      type: 'range',
      label: 'Logos per row',
      min: 4,
      max: 8,
      step: 1,
      default: 6,
    },
    {
      id: 'logoWidth',
      type: 'range',
      label: 'Logo width',
      min: 80,
      max: 200,
      step: 10,
      unit: 'px',
      default: 120,
    },
    {
      type: 'header',
      content: 'Style',
    },
    {
      id: 'grayscale',
      type: 'checkbox',
      label: 'Grayscale logos',
      default: true,
    },
    {
      id: 'showOnHover',
      type: 'checkbox',
      label: 'Color on hover',
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
      type: 'logo',
      name: 'Logo',
      settings: [
        {
          id: 'image',
          type: 'image_picker',
          label: 'Logo image',
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
      ],
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function LogoListSection({
  title,
  logos,
  layout = 'grid',
  columns = 6,
  logoWidth = 120,
  grayscale = true,
  showOnHover = true,
  backgroundColor,
  className,
}: LogoListSectionProps) {
  const theme = TanqoryTheme;
  const sectionStyles = SectionStyles(theme);

  const sectionStyle: React.CSSProperties = {
    ...sectionStyles.base,
    backgroundColor: backgroundColor || theme.colors.background,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  };

  const logoStyle: React.CSSProperties = {
    width: `${logoWidth}px`,
    height: 'auto',
    maxHeight: '60px',
    objectFit: 'contain',
    filter: grayscale ? 'grayscale(100%)' : 'none',
    opacity: grayscale ? 0.6 : 1,
    transition: `all ${theme.transitions.fast} ${theme.transitions.easing}`,
  };

  const logoHoverStyle: React.CSSProperties = showOnHover
    ? {
        filter: 'grayscale(0%)',
        opacity: 1,
      }
    : {};

  const renderLogo = (logo: Logo) => {
    const LogoImage = (
      <img
        src={logo.image}
        alt={logo.alt || ''}
        style={logoStyle}
        className="logo-item"
      />
    );

    if (logo.link) {
      return (
        <a
          key={logo.id}
          href={logo.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {LogoImage}
        </a>
      );
    }

    return (
      <div
        key={logo.id}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {LogoImage}
      </div>
    );
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: theme.spacing.lg,
    alignItems: 'center',
    justifyItems: 'center',
  };

  return (
    <section style={sectionStyle} className={className}>
      <ContainerBlock>
        {/* Title */}
        {title && (
          <div style={{ marginBottom: theme.spacing.lg, textAlign: 'center' }}>
            <HeadingBlock text={title} level="h3" alignment="center" />
          </div>
        )}

        {/* Logos */}
        {layout === 'marquee' ? (
          <div className="logo-marquee-wrapper" style={{ overflow: 'hidden', width: '100%' }}>
            <div
              className="logo-marquee-content"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: `${theme.spacing.xl}`,
                animation: 'logo-marquee 40s linear infinite',
                whiteSpace: 'nowrap',
              }}
            >
              {logos.map(renderLogo)}
              {logos.map((logo) => renderLogo({ ...logo, id: `${logo.id}-duplicate` }))}
            </div>
            <style>
              {`
                @keyframes logo-marquee {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                .logo-marquee-wrapper:hover .logo-marquee-content {
                  animation-play-state: paused;
                }
              `}
            </style>
          </div>
        ) : (
          <div style={gridStyle} className="logo-grid">
            {logos.map(renderLogo)}
          </div>
        )}

        {/* Hover styles */}
        <style>
          {`
            .logo-item:hover {
              ${showOnHover ? `filter: grayscale(0%); opacity: 1;` : ''}
            }
            @media (max-width: ${theme.breakpoints.lg}) {
              .logo-grid {
                grid-template-columns: repeat(${Math.min(columns, 4)}, 1fr) !important;
              }
            }
            @media (max-width: ${theme.breakpoints.md}) {
              .logo-grid {
                grid-template-columns: repeat(3, 1fr) !important;
              }
            }
            @media (max-width: ${theme.breakpoints.sm}) {
              .logo-grid {
                grid-template-columns: repeat(2, 1fr) !important;
              }
            }
          `}
        </style>
      </ContainerBlock>
    </section>
  );
}

export default LogoListSection;
