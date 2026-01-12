// =============================================================================
// Icon Block (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme } from '../../themes';

// =============================================================================
// Types
// =============================================================================

export type IconName =
  | 'cart'
  | 'search'
  | 'user'
  | 'menu'
  | 'close'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-down'
  | 'chevron-up'
  | 'heart'
  | 'heart-filled'
  | 'star'
  | 'star-filled'
  | 'check'
  | 'plus'
  | 'minus'
  | 'trash'
  | 'edit'
  | 'share'
  | 'facebook'
  | 'instagram'
  | 'twitter'
  | 'pinterest'
  | 'youtube'
  | 'tiktok';

export interface IconBlockProps {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
  onClick?: () => void;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const IconBlockSchema = {
  name: 'Icon',
  tag: 'span',
  settings: [
    {
      id: 'name',
      type: 'select',
      label: 'Icon',
      options: [
        { value: 'cart', label: 'Cart' },
        { value: 'search', label: 'Search' },
        { value: 'user', label: 'User' },
        { value: 'menu', label: 'Menu' },
        { value: 'close', label: 'Close' },
        { value: 'chevron-left', label: 'Chevron Left' },
        { value: 'chevron-right', label: 'Chevron Right' },
        { value: 'chevron-down', label: 'Chevron Down' },
        { value: 'chevron-up', label: 'Chevron Up' },
        { value: 'heart', label: 'Heart' },
        { value: 'heart-filled', label: 'Heart Filled' },
        { value: 'star', label: 'Star' },
        { value: 'star-filled', label: 'Star Filled' },
        { value: 'check', label: 'Check' },
        { value: 'plus', label: 'Plus' },
        { value: 'minus', label: 'Minus' },
        { value: 'trash', label: 'Trash' },
        { value: 'edit', label: 'Edit' },
        { value: 'share', label: 'Share' },
        { value: 'facebook', label: 'Facebook' },
        { value: 'instagram', label: 'Instagram' },
        { value: 'twitter', label: 'Twitter' },
        { value: 'pinterest', label: 'Pinterest' },
        { value: 'youtube', label: 'YouTube' },
        { value: 'tiktok', label: 'TikTok' },
      ],
      default: 'cart',
    },
    {
      id: 'size',
      type: 'range',
      label: 'Size',
      min: 12,
      max: 64,
      step: 4,
      unit: 'px',
      default: 24,
    },
    {
      id: 'color',
      type: 'color',
      label: 'Color',
    },
  ],
};

// =============================================================================
// Icon Paths
// =============================================================================

const iconPaths: Record<IconName, React.ReactNode> = {
  cart: (
    <>
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </>
  ),
  user: (
    <>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
  menu: (
    <>
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </>
  ),
  close: (
    <>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </>
  ),
  'chevron-left': <polyline points="15 18 9 12 15 6" />,
  'chevron-right': <polyline points="9 18 15 12 9 6" />,
  'chevron-down': <polyline points="6 9 12 15 18 9" />,
  'chevron-up': <polyline points="18 15 12 9 6 15" />,
  heart: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
  'heart-filled': <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="currentColor" />,
  star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
  'star-filled': <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor" />,
  check: <polyline points="20 6 9 17 4 12" />,
  plus: (
    <>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </>
  ),
  minus: <line x1="5" y1="12" x2="19" y2="12" />,
  trash: (
    <>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </>
  ),
  edit: (
    <>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </>
  ),
  share: (
    <>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </>
  ),
  facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </>
  ),
  twitter: <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />,
  pinterest: <path d="M8 12a4 4 0 1 1 8 0c0 1.48-.8 2.77-2 3.46l1.5 4.54h-3l-1-3h-2l-1 3h-3l1.5-4.54A4 4 0 0 1 8 12z M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />,
  youtube: (
    <>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </>
  ),
  tiktok: <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />,
};

// =============================================================================
// Component
// =============================================================================

export function IconBlock({
  name,
  size = 24,
  color,
  strokeWidth = 2,
  className,
  onClick,
}: IconBlockProps) {
  const theme = TanqoryTheme;
  const iconColor = color || theme.colors.foreground;

  const isFilled = name.includes('filled');

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: onClick ? 'pointer' : undefined,
      }}
      className={className}
      onClick={onClick}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={isFilled ? iconColor : 'none'}
        stroke={iconColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {iconPaths[name]}
      </svg>
    </span>
  );
}

export default IconBlock;
