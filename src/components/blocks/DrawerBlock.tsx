// =============================================================================
// Drawer Block (Draftbit pattern)
// =============================================================================

import React, { useEffect, useCallback } from 'react';
import { TanqoryTheme } from '../../themes';

// =============================================================================
// Types
// =============================================================================

export interface DrawerBlockProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  position?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg' | 'full';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const DrawerBlockSchema = {
  name: 'Drawer',
  tag: 'div',
  settings: [
    {
      id: 'position',
      type: 'select',
      label: 'Position',
      options: [
        { value: 'left', label: 'Left' },
        { value: 'right', label: 'Right' },
      ],
      default: 'right',
    },
    {
      id: 'size',
      type: 'select',
      label: 'Size',
      options: [
        { value: 'sm', label: 'Small (300px)' },
        { value: 'md', label: 'Medium (400px)' },
        { value: 'lg', label: 'Large (500px)' },
        { value: 'full', label: 'Full width' },
      ],
      default: 'md',
    },
    {
      id: 'showCloseButton',
      type: 'checkbox',
      label: 'Show close button',
      default: true,
    },
    {
      id: 'closeOnOverlayClick',
      type: 'checkbox',
      label: 'Close on overlay click',
      default: true,
    },
    {
      id: 'closeOnEscape',
      type: 'checkbox',
      label: 'Close on Escape key',
      default: true,
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function DrawerBlock({
  isOpen,
  onClose,
  title,
  children,
  position = 'right',
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className,
}: DrawerBlockProps) {
  const theme = TanqoryTheme;

  // Handle escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === 'Escape') {
        onClose();
      }
    },
    [closeOnEscape, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  // Size mappings
  const sizeMap: Record<string, string> = {
    sm: '300px',
    md: '400px',
    lg: '500px',
    full: '100%',
  };

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.overlay,
    zIndex: theme.zIndex.modal,
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? 'visible' : 'hidden',
    transition: `opacity ${theme.transitions.normal} ${theme.transitions.easing}, visibility ${theme.transitions.normal}`,
  };

  const drawerStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    [position]: 0,
    width: '100%',
    maxWidth: sizeMap[size],
    backgroundColor: theme.colors.background,
    boxShadow: theme.shadows.xl,
    display: 'flex',
    flexDirection: 'column',
    zIndex: theme.zIndex.modal + 1,
    transform: isOpen
      ? 'translateX(0)'
      : position === 'right'
      ? 'translateX(100%)'
      : 'translateX(-100%)',
    transition: `transform ${theme.transitions.normal} ${theme.transitions.easing}`,
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
    borderBottom: `1px solid ${theme.colors.border}`,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.foreground,
    margin: 0,
  };

  const closeButtonStyle: React.CSSProperties = {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    borderRadius: theme.borderRadius.sm,
    color: theme.colors.foregroundMuted,
    transition: `all ${theme.transitions.fast} ${theme.transitions.easing}`,
  };

  const bodyStyle: React.CSSProperties = {
    flex: 1,
    padding: theme.spacing.md,
    overflow: 'auto',
  };

  return (
    <>
      {/* Overlay */}
      <div
        style={overlayStyle}
        onClick={closeOnOverlayClick ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        style={drawerStyle}
        className={className}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'drawer-title' : undefined}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div style={headerStyle}>
            {title && (
              <h2 id="drawer-title" style={titleStyle}>
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                style={closeButtonStyle}
                aria-label="Close drawer"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div style={bodyStyle}>{children}</div>
      </div>
    </>
  );
}

export default DrawerBlock;
