// =============================================================================
// Breadcrumb Block (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme } from '../../themes';

// =============================================================================
// Types
// =============================================================================

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

export interface BreadcrumbBlockProps {
  items: BreadcrumbItem[];
  separator?: 'chevron' | 'slash' | 'arrow';
  showHome?: boolean;
  homeLabel?: string;
  homeUrl?: string;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const BreadcrumbBlockSchema = {
  name: 'Breadcrumb',
  tag: 'nav',
  settings: [
    {
      id: 'separator',
      type: 'select',
      label: 'Separator',
      options: [
        { value: 'chevron', label: 'Chevron (>)' },
        { value: 'slash', label: 'Slash (/)' },
        { value: 'arrow', label: 'Arrow (→)' },
      ],
      default: 'chevron',
    },
    {
      id: 'showHome',
      type: 'checkbox',
      label: 'Show home link',
      default: true,
    },
    {
      id: 'homeLabel',
      type: 'text',
      label: 'Home label',
      default: 'Home',
    },
    {
      id: 'homeUrl',
      type: 'url',
      label: 'Home URL',
      default: '/',
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function BreadcrumbBlock({
  items,
  separator = 'chevron',
  showHome = true,
  homeLabel = 'Home',
  homeUrl = '/',
  className,
}: BreadcrumbBlockProps) {
  const theme = TanqoryTheme;

  // Build full breadcrumb list
  const allItems: BreadcrumbItem[] = showHome
    ? [{ label: homeLabel, url: homeUrl }, ...items]
    : items;

  // Separator icons
  const separators: Record<string, React.ReactNode> = {
    chevron: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    ),
    slash: <span>/</span>,
    arrow: <span>→</span>,
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.foregroundSecondary,
  };

  const linkStyle: React.CSSProperties = {
    color: 'inherit',
    textDecoration: 'none',
    transition: `color ${theme.transitions.fast} ${theme.transitions.easing}`,
  };

  const currentStyle: React.CSSProperties = {
    color: theme.colors.foreground,
    fontWeight: theme.typography.fontWeight.medium,
  };

  const separatorStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    color: theme.colors.foregroundMuted,
  };

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol
        style={{
          ...containerStyle,
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }}
      >
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;

          return (
            <li
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.xs,
              }}
            >
              {index > 0 && <span style={separatorStyle}>{separators[separator]}</span>}

              {isLast || !item.url ? (
                <span style={isLast ? currentStyle : undefined} aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.url}
                  style={linkStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = theme.colors.foreground;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = theme.colors.foregroundSecondary;
                  }}
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default BreadcrumbBlock;
