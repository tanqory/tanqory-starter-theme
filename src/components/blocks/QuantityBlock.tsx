// =============================================================================
// Quantity Block (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme } from '../../themes';

// =============================================================================
// Types
// =============================================================================

export interface QuantityBlockProps {
  value: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (value: number) => void;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const QuantityBlockSchema = {
  name: 'Quantity',
  tag: 'div',
  settings: [
    {
      id: 'min',
      type: 'range',
      label: 'Minimum',
      min: 0,
      max: 100,
      step: 1,
      default: 1,
    },
    {
      id: 'max',
      type: 'range',
      label: 'Maximum',
      min: 1,
      max: 1000,
      step: 1,
      default: 100,
    },
    {
      id: 'size',
      type: 'select',
      label: 'Size',
      options: [
        { value: 'sm', label: 'Small' },
        { value: 'md', label: 'Medium' },
        { value: 'lg', label: 'Large' },
      ],
      default: 'md',
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function QuantityBlock({
  value,
  min = 1,
  max = 100,
  disabled = false,
  size = 'md',
  onChange,
  className,
}: QuantityBlockProps) {
  const theme = TanqoryTheme;

  // Size mappings
  const sizeMap = {
    sm: {
      buttonSize: '28px',
      fontSize: theme.typography.fontSize.sm,
      padding: theme.spacing.xs,
    },
    md: {
      buttonSize: '36px',
      fontSize: theme.typography.fontSize.base,
      padding: theme.spacing.sm,
    },
    lg: {
      buttonSize: '44px',
      fontSize: theme.typography.fontSize.lg,
      padding: theme.spacing.md,
    },
  };

  const sizes = sizeMap[size];

  const handleDecrement = () => {
    if (value > min && onChange) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max && onChange) {
      onChange(value + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= min && newValue <= max && onChange) {
      onChange(newValue);
    }
  };

  const containerStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    opacity: disabled ? theme.disabledOpacity : 1,
  };

  const buttonStyle: React.CSSProperties = {
    width: sizes.buttonSize,
    height: sizes.buttonSize,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    background: 'transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: sizes.fontSize,
    color: theme.colors.foreground,
    transition: `background-color ${theme.transitions.fast} ${theme.transitions.easing}`,
  };

  const inputStyle: React.CSSProperties = {
    width: '48px',
    height: sizes.buttonSize,
    textAlign: 'center',
    border: 'none',
    borderLeft: `1px solid ${theme.colors.border}`,
    borderRight: `1px solid ${theme.colors.border}`,
    fontSize: sizes.fontSize,
    color: theme.colors.foreground,
    background: 'transparent',
    outline: 'none',
  };

  return (
    <div style={containerStyle} className={className}>
      <button
        type="button"
        onClick={handleDecrement}
        disabled={disabled || value <= min}
        style={{
          ...buttonStyle,
          opacity: value <= min ? 0.5 : 1,
        }}
        aria-label="Decrease quantity"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        disabled={disabled}
        min={min}
        max={max}
        style={inputStyle}
        aria-label="Quantity"
      />

      <button
        type="button"
        onClick={handleIncrement}
        disabled={disabled || value >= max}
        style={{
          ...buttonStyle,
          opacity: value >= max ? 0.5 : 1,
        }}
        aria-label="Increase quantity"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </div>
  );
}

export default QuantityBlock;
