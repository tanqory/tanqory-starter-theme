// =============================================================================
// Rating Block (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme } from '../../themes';

// =============================================================================
// Types
// =============================================================================

export interface RatingBlockProps {
  value: number;
  max?: number;
  size?: number;
  color?: string;
  emptyColor?: string;
  showValue?: boolean;
  showCount?: boolean;
  count?: number;
  interactive?: boolean;
  onChange?: (value: number) => void;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const RatingBlockSchema = {
  name: 'Rating',
  tag: 'div',
  settings: [
    {
      id: 'max',
      type: 'range',
      label: 'Max stars',
      min: 3,
      max: 10,
      step: 1,
      default: 5,
    },
    {
      id: 'size',
      type: 'range',
      label: 'Star size',
      min: 12,
      max: 48,
      step: 4,
      unit: 'px',
      default: 20,
    },
    {
      id: 'color',
      type: 'color',
      label: 'Star color',
    },
    {
      id: 'showValue',
      type: 'checkbox',
      label: 'Show rating value',
      default: false,
    },
    {
      id: 'showCount',
      type: 'checkbox',
      label: 'Show review count',
      default: false,
    },
    {
      id: 'interactive',
      type: 'checkbox',
      label: 'Interactive',
      default: false,
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function RatingBlock({
  value,
  max = 5,
  size = 20,
  color,
  emptyColor,
  showValue = false,
  showCount = false,
  count = 0,
  interactive = false,
  onChange,
  className,
}: RatingBlockProps) {
  const theme = TanqoryTheme;
  const starColor = color || '#FFB800';
  const starEmptyColor = emptyColor || theme.colors.border;

  const containerStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
  };

  const starsContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
  };

  const handleStarClick = (starIndex: number) => {
    if (interactive && onChange) {
      onChange(starIndex + 1);
    }
  };

  const renderStar = (index: number) => {
    const fillPercentage = Math.max(0, Math.min(1, value - index)) * 100;
    const uniqueId = `star-${index}-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <button
        key={index}
        type="button"
        onClick={() => handleStarClick(index)}
        disabled={!interactive}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: interactive ? 'pointer' : 'default',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-label={`${index + 1} of ${max} stars`}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={uniqueId}>
              <stop offset={`${fillPercentage}%`} stopColor={starColor} />
              <stop offset={`${fillPercentage}%`} stopColor={starEmptyColor} />
            </linearGradient>
          </defs>
          <polygon
            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            fill={`url(#${uniqueId})`}
            stroke={fillPercentage > 0 ? starColor : starEmptyColor}
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    );
  };

  return (
    <div style={containerStyle} className={className} role="img" aria-label={`Rating: ${value} out of ${max} stars`}>
      <div style={starsContainerStyle}>
        {Array.from({ length: max }, (_, index) => renderStar(index))}
      </div>

      {showValue && (
        <span
          style={{
            fontSize: theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.medium,
            color: theme.colors.foreground,
          }}
        >
          {value.toFixed(1)}
        </span>
      )}

      {showCount && count > 0 && (
        <span
          style={{
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.foregroundMuted,
          }}
        >
          ({count.toLocaleString()})
        </span>
      )}
    </div>
  );
}

export default RatingBlock;
