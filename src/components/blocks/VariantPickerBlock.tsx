// =============================================================================
// Variant Picker Block (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme } from '../../themes';
import type { ProductVariant, ProductOption } from '../../apis/ProductsApi';

// =============================================================================
// Types
// =============================================================================

export interface VariantPickerBlockProps {
  options: ProductOption[];
  selectedOptions: Record<string, string>;
  variants?: ProductVariant[];
  displayType?: 'dropdown' | 'buttons' | 'swatches';
  showLabel?: boolean;
  onOptionChange?: (optionName: string, value: string) => void;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const VariantPickerBlockSchema = {
  name: 'Variant Picker',
  tag: 'div',
  settings: [
    {
      id: 'displayType',
      type: 'select',
      label: 'Display type',
      options: [
        { value: 'dropdown', label: 'Dropdown' },
        { value: 'buttons', label: 'Buttons' },
        { value: 'swatches', label: 'Swatches' },
      ],
      default: 'buttons',
    },
    {
      id: 'showLabel',
      type: 'checkbox',
      label: 'Show label',
      default: true,
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function VariantPickerBlock({
  options,
  selectedOptions,
  variants,
  displayType = 'buttons',
  showLabel = true,
  onOptionChange,
  className,
}: VariantPickerBlockProps) {
  const theme = TanqoryTheme;

  if (!options || options.length === 0) {
    return null;
  }

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
  };

  return (
    <div style={containerStyle} className={className}>
      {options.map((option) => (
        <OptionSelector
          key={option.name}
          option={option}
          selectedValue={selectedOptions[option.name]}
          displayType={displayType}
          showLabel={showLabel}
          onSelect={(value) => onOptionChange?.(option.name, value)}
        />
      ))}
    </div>
  );
}

// =============================================================================
// Option Selector Component
// =============================================================================

interface OptionSelectorProps {
  option: ProductOption;
  selectedValue?: string;
  displayType: 'dropdown' | 'buttons' | 'swatches';
  showLabel: boolean;
  onSelect?: (value: string) => void;
}

function OptionSelector({
  option,
  selectedValue,
  displayType,
  showLabel,
  onSelect,
}: OptionSelectorProps) {
  const theme = TanqoryTheme;

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.foreground,
    marginBottom: theme.spacing.xs,
  };

  // Dropdown display
  if (displayType === 'dropdown') {
    return (
      <div>
        {showLabel && <label style={labelStyle}>{option.name}</label>}
        <select
          value={selectedValue || ''}
          onChange={(e) => onSelect?.(e.target.value)}
          style={{
            width: '100%',
            padding: `${theme.spacing.sm} ${theme.spacing.md}`,
            fontSize: theme.typography.fontSize.base,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: theme.borderRadius.md,
            backgroundColor: theme.colors.background,
            color: theme.colors.foreground,
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          <option value="">Select {option.name}</option>
          {option.values.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    );
  }

  // Swatches display (for colors)
  if (displayType === 'swatches' && option.name.toLowerCase() === 'color') {
    return (
      <div>
        {showLabel && (
          <label style={labelStyle}>
            {option.name}
            {selectedValue && (
              <span
                style={{
                  fontWeight: theme.typography.fontWeight.regular,
                  color: theme.colors.foregroundSecondary,
                }}
              >
                : {selectedValue}
              </span>
            )}
          </label>
        )}
        <div style={{ display: 'flex', gap: theme.spacing.xs, flexWrap: 'wrap' }}>
          {option.values.map((value) => {
            const isSelected = value === selectedValue;
            const colorValue = getColorValue(value);

            return (
              <button
                key={value}
                type="button"
                onClick={() => onSelect?.(value)}
                title={value}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: theme.borderRadius.full,
                  border: `2px solid ${isSelected ? theme.colors.foreground : theme.colors.border}`,
                  backgroundColor: colorValue,
                  cursor: 'pointer',
                  outline: 'none',
                  padding: '2px',
                  transition: `border-color ${theme.transitions.fast} ${theme.transitions.easing}`,
                }}
                aria-label={value}
                aria-pressed={isSelected}
              />
            );
          })}
        </div>
      </div>
    );
  }

  // Buttons display (default)
  return (
    <div>
      {showLabel && (
        <label style={labelStyle}>
          {option.name}
          {selectedValue && (
            <span
              style={{
                fontWeight: theme.typography.fontWeight.regular,
                color: theme.colors.foregroundSecondary,
              }}
            >
              : {selectedValue}
            </span>
          )}
        </label>
      )}
      <div style={{ display: 'flex', gap: theme.spacing.xs, flexWrap: 'wrap' }}>
        {option.values.map((value) => {
          const isSelected = value === selectedValue;

          return (
            <button
              key={value}
              type="button"
              onClick={() => onSelect?.(value)}
              style={{
                padding: `${theme.spacing.xs} ${theme.spacing.md}`,
                fontSize: theme.typography.fontSize.sm,
                border: `1px solid ${isSelected ? theme.colors.foreground : theme.colors.border}`,
                borderRadius: theme.borderRadius.md,
                backgroundColor: isSelected ? theme.colors.foreground : 'transparent',
                color: isSelected ? theme.colors.background : theme.colors.foreground,
                cursor: 'pointer',
                outline: 'none',
                transition: `all ${theme.transitions.fast} ${theme.transitions.easing}`,
              }}
              aria-pressed={isSelected}
            >
              {value}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// =============================================================================
// Utility Functions
// =============================================================================

// Map color names to actual color values
function getColorValue(colorName: string): string {
  const colorMap: Record<string, string> = {
    // Basic colors
    black: '#000000',
    white: '#FFFFFF',
    red: '#EF4444',
    blue: '#3B82F6',
    green: '#22C55E',
    yellow: '#EAB308',
    orange: '#F97316',
    purple: '#8B5CF6',
    pink: '#EC4899',
    gray: '#6B7280',
    grey: '#6B7280',
    brown: '#92400E',
    navy: '#1E3A8A',
    beige: '#D4C4B0',
    cream: '#FFFDD0',
    gold: '#FFD700',
    silver: '#C0C0C0',
    coral: '#FF7F50',
    teal: '#14B8A6',
    burgundy: '#722F37',
    olive: '#808000',
    maroon: '#800000',
    tan: '#D2B48C',
    khaki: '#C3B091',
    // Multi-word
    'light blue': '#93C5FD',
    'dark blue': '#1E40AF',
    'light gray': '#D1D5DB',
    'dark gray': '#374151',
  };

  const lowerColor = colorName.toLowerCase();
  return colorMap[lowerColor] || '#9CA3AF'; // Default to gray if not found
}

export default VariantPickerBlock;
