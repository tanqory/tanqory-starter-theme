// =============================================================================
// Social Links Block (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme } from '../../themes';
import { IconBlock, type IconName } from './IconBlock';

// =============================================================================
// Types
// =============================================================================

export interface SocialLink {
  platform: 'facebook' | 'instagram' | 'twitter' | 'pinterest' | 'youtube' | 'tiktok';
  url: string;
}

export interface SocialLinksBlockProps {
  links: SocialLink[];
  size?: number;
  color?: string;
  hoverColor?: string;
  gap?: number;
  showLabels?: boolean;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const SocialLinksBlockSchema = {
  name: 'Social Links',
  tag: 'div',
  settings: [
    {
      id: 'size',
      type: 'range',
      label: 'Icon size',
      min: 16,
      max: 48,
      step: 4,
      unit: 'px',
      default: 24,
    },
    {
      id: 'gap',
      type: 'range',
      label: 'Gap between icons',
      min: 4,
      max: 32,
      step: 4,
      unit: 'px',
      default: 16,
    },
    {
      id: 'color',
      type: 'color',
      label: 'Icon color',
    },
    {
      id: 'showLabels',
      type: 'checkbox',
      label: 'Show labels',
      default: false,
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function SocialLinksBlock({
  links,
  size = 24,
  color,
  hoverColor,
  gap = 16,
  showLabels = false,
  className,
}: SocialLinksBlockProps) {
  const theme = TanqoryTheme;

  if (!links || links.length === 0) {
    return null;
  }

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: `${gap}px`,
    flexWrap: 'wrap',
  };

  const linkStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
    color: color || theme.colors.foreground,
    textDecoration: 'none',
    transition: `color ${theme.transitions.fast} ${theme.transitions.easing}`,
  };

  // Platform labels
  const platformLabels: Record<SocialLink['platform'], string> = {
    facebook: 'Facebook',
    instagram: 'Instagram',
    twitter: 'Twitter',
    pinterest: 'Pinterest',
    youtube: 'YouTube',
    tiktok: 'TikTok',
  };

  return (
    <div style={containerStyle} className={className}>
      {links.map((link) => (
        <a
          key={link.platform}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
          aria-label={platformLabels[link.platform]}
          onMouseEnter={(e) => {
            if (hoverColor) {
              e.currentTarget.style.color = hoverColor;
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = color || theme.colors.foreground;
          }}
        >
          <IconBlock
            name={link.platform as IconName}
            size={size}
            color="currentColor"
          />
          {showLabels && (
            <span
              style={{
                fontSize: theme.typography.fontSize.sm,
              }}
            >
              {platformLabels[link.platform]}
            </span>
          )}
        </a>
      ))}
    </div>
  );
}

export default SocialLinksBlock;
