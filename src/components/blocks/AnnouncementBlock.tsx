// =============================================================================
// Announcement Block (Draftbit pattern)
// =============================================================================

import React, { useState } from 'react';
import { TanqoryTheme } from '../../themes';

// =============================================================================
// Types
// =============================================================================

export interface AnnouncementBlockProps {
  message: string;
  link?: string;
  linkText?: string;
  backgroundColor?: string;
  textColor?: string;
  dismissible?: boolean;
  icon?: 'info' | 'warning' | 'success' | 'promo' | 'none';
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const AnnouncementBlockSchema = {
  name: 'Announcement',
  tag: 'div',
  settings: [
    {
      id: 'message',
      type: 'text',
      label: 'Message',
      default: 'Free shipping on orders over $50!',
    },
    {
      id: 'link',
      type: 'url',
      label: 'Link',
    },
    {
      id: 'linkText',
      type: 'text',
      label: 'Link text',
      default: 'Shop now',
    },
    {
      id: 'backgroundColor',
      type: 'color',
      label: 'Background color',
    },
    {
      id: 'textColor',
      type: 'color',
      label: 'Text color',
    },
    {
      id: 'dismissible',
      type: 'checkbox',
      label: 'Dismissible',
      default: false,
    },
    {
      id: 'icon',
      type: 'select',
      label: 'Icon',
      options: [
        { value: 'none', label: 'None' },
        { value: 'info', label: 'Info' },
        { value: 'warning', label: 'Warning' },
        { value: 'success', label: 'Success' },
        { value: 'promo', label: 'Promo' },
      ],
      default: 'none',
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function AnnouncementBlock({
  message,
  link,
  linkText = 'Shop now',
  backgroundColor,
  textColor,
  dismissible = false,
  icon = 'none',
  className,
}: AnnouncementBlockProps) {
  const theme = TanqoryTheme;
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) {
    return null;
  }

  const bgColor = backgroundColor || theme.colors.primary;
  const txtColor = textColor || theme.colors.secondary;

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    backgroundColor: bgColor,
    color: txtColor,
    fontSize: theme.typography.fontSize.sm,
    textAlign: 'center',
    position: 'relative',
  };

  const renderIcon = () => {
    if (icon === 'none') return null;

    const iconPaths: Record<string, React.ReactNode> = {
      info: (
        <>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </>
      ),
      warning: (
        <>
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </>
      ),
      success: <polyline points="20 6 9 17 4 12" />,
      promo: (
        <>
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </>
      ),
    };

    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {iconPaths[icon]}
      </svg>
    );
  };

  return (
    <div style={containerStyle} className={className} role="status">
      {renderIcon()}

      <span>{message}</span>

      {link && (
        <a
          href={link}
          style={{
            color: txtColor,
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
            fontWeight: theme.typography.fontWeight.medium,
          }}
        >
          {linkText}
        </a>
      )}

      {dismissible && (
        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          style={{
            position: 'absolute',
            right: theme.spacing.md,
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            color: txtColor,
            cursor: 'pointer',
            padding: theme.spacing.xs,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.8,
          }}
          aria-label="Dismiss announcement"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default AnnouncementBlock;
