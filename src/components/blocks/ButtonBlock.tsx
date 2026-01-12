// =============================================================================
// Button Block (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme, ButtonStyles } from '../../themes';

// =============================================================================
// Types
// =============================================================================

export interface ButtonBlockProps {
  label?: string;
  link?: string;
  openInNewTab?: boolean;
  style?: 'primary' | 'secondary' | 'link';
  width?: 'fit-content' | 'full' | 'custom';
  customWidth?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const ButtonBlockSchema = {
  name: 'Button',
  tag: 'button',
  settings: [
    {
      id: 'label',
      type: 'text',
      label: 'Label',
      default: 'Button',
    },
    {
      id: 'link',
      type: 'url',
      label: 'Link',
    },
    {
      id: 'openInNewTab',
      type: 'checkbox',
      label: 'Open in new tab',
      default: false,
    },
    {
      id: 'style',
      type: 'select',
      label: 'Style',
      options: [
        { value: 'primary', label: 'Primary' },
        { value: 'secondary', label: 'Secondary' },
        { value: 'link', label: 'Link' },
      ],
      default: 'primary',
    },
    {
      id: 'width',
      type: 'select',
      label: 'Width',
      options: [
        { value: 'fit-content', label: 'Fit content' },
        { value: 'full', label: 'Full width' },
        { value: 'custom', label: 'Custom' },
      ],
      default: 'fit-content',
    },
    {
      id: 'customWidth',
      type: 'range',
      label: 'Custom width',
      min: 0,
      max: 100,
      step: 1,
      unit: '%',
      default: 50,
      visibleIf: "{{ settings.width == 'custom' }}",
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function ButtonBlock({
  label = 'Button',
  link,
  openInNewTab = false,
  style = 'primary',
  width = 'fit-content',
  customWidth,
  disabled = false,
  loading = false,
  onClick,
  className,
}: ButtonBlockProps) {
  const theme = TanqoryTheme;
  const styles = ButtonStyles(theme);

  // Get style based on variant
  const getButtonStyle = () => {
    const baseStyle = styles[style] || styles.primary;

    let widthStyle: React.CSSProperties = {};
    if (width === 'full') {
      widthStyle = { width: '100%' };
    } else if (width === 'custom' && customWidth) {
      widthStyle = { width: customWidth };
    }

    return {
      ...baseStyle,
      ...widthStyle,
      opacity: disabled ? theme.disabledOpacity : 1,
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing.xs,
      border: 'none',
      textDecoration: style === 'link' ? 'underline' : 'none',
    };
  };

  // If link is provided, render as anchor
  if (link && !disabled) {
    return (
      <a
        href={link}
        target={openInNewTab ? '_blank' : undefined}
        rel={openInNewTab ? 'noopener noreferrer' : undefined}
        style={getButtonStyle()}
        className={className}
        onClick={onClick}
      >
        {loading && <LoadingSpinner />}
        {label}
      </a>
    );
  }

  // Otherwise render as button
  return (
    <button
      type="button"
      style={getButtonStyle()}
      className={className}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && <LoadingSpinner />}
      {label}
    </button>
  );
}

// =============================================================================
// Sub-components
// =============================================================================

function LoadingSpinner() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={{
        animation: 'spin 1s linear infinite',
      }}
    >
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="31.4"
        strokeDashoffset="10"
      />
    </svg>
  );
}

export default ButtonBlock;
