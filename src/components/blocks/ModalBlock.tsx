// =============================================================================
// Modal Block (Draftbit pattern)
// =============================================================================

import React, { useEffect, useCallback } from 'react';
import { TanqoryTheme } from '../../themes';

// =============================================================================
// Types
// =============================================================================

export interface ModalBlockProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const ModalBlockSchema = {
  name: 'Modal',
  tag: 'div',
  settings: [
    {
      id: 'size',
      type: 'select',
      label: 'Size',
      options: [
        { value: 'sm', label: 'Small (400px)' },
        { value: 'md', label: 'Medium (500px)' },
        { value: 'lg', label: 'Large (700px)' },
        { value: 'xl', label: 'Extra large (900px)' },
        { value: 'full', label: 'Full screen' },
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

export function ModalBlock({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className,
}: ModalBlockProps) {
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

  if (!isOpen) return null;

  // Size mappings
  const sizeMap: Record<string, string> = {
    sm: '400px',
    md: '500px',
    lg: '700px',
    xl: '900px',
    full: '100%',
  };

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.overlay,
    display: 'flex',
    alignItems: size === 'full' ? 'stretch' : 'center',
    justifyContent: 'center',
    padding: size === 'full' ? 0 : theme.spacing.lg,
    zIndex: theme.zIndex.modal,
    animation: 'fadeIn 0.2s ease-out',
  };

  const modalStyle: React.CSSProperties = {
    backgroundColor: theme.colors.background,
    borderRadius: size === 'full' ? 0 : theme.borderRadius.lg,
    boxShadow: theme.shadows.xl,
    width: '100%',
    maxWidth: sizeMap[size],
    maxHeight: size === 'full' ? '100%' : '90vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    animation: 'slideIn 0.2s ease-out',
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
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideIn {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>

      <div
        style={overlayStyle}
        onClick={closeOnOverlayClick ? onClose : undefined}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        <div
          style={modalStyle}
          className={className}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div style={headerStyle}>
              {title && (
                <h2 id="modal-title" style={titleStyle}>
                  {title}
                </h2>
              )}
              {showCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  style={closeButtonStyle}
                  aria-label="Close modal"
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
      </div>
    </>
  );
}

export default ModalBlock;
