// =============================================================================
// Marquee Block (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme } from '../../themes';

// =============================================================================
// Types
// =============================================================================

export interface MarqueeBlockProps {
  items: string[];
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  separator?: string;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const MarqueeBlockSchema = {
  name: 'Marquee',
  tag: 'div',
  settings: [
    {
      id: 'speed',
      type: 'range',
      label: 'Speed',
      min: 10,
      max: 100,
      step: 5,
      default: 30,
      info: 'Duration in seconds for one complete cycle',
    },
    {
      id: 'direction',
      type: 'select',
      label: 'Direction',
      options: [
        { value: 'left', label: 'Left' },
        { value: 'right', label: 'Right' },
      ],
      default: 'left',
    },
    {
      id: 'pauseOnHover',
      type: 'checkbox',
      label: 'Pause on hover',
      default: true,
    },
    {
      id: 'separator',
      type: 'text',
      label: 'Separator',
      default: '•',
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function MarqueeBlock({
  items,
  speed = 30,
  direction = 'left',
  pauseOnHover = true,
  separator = '•',
  className,
}: MarqueeBlockProps) {
  const theme = TanqoryTheme;
  const uniqueId = React.useId();

  if (!items || items.length === 0) {
    return null;
  }

  // Create repeated content for seamless loop
  const content = items.map((item, index) => (
    <React.Fragment key={index}>
      <span style={{ whiteSpace: 'nowrap' }}>{item}</span>
      <span
        style={{
          margin: `0 ${theme.spacing.lg}`,
          opacity: 0.5,
        }}
      >
        {separator}
      </span>
    </React.Fragment>
  ));

  const animationName = `marquee-${uniqueId.replace(/:/g, '')}`;
  const animationDirection = direction === 'right' ? 'reverse' : 'normal';

  return (
    <>
      <style>
        {`
          @keyframes ${animationName} {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .marquee-container-${uniqueId.replace(/:/g, '')} {
            animation-play-state: running;
          }

          .marquee-wrapper-${uniqueId.replace(/:/g, '')}:hover .marquee-container-${uniqueId.replace(/:/g, '')} {
            animation-play-state: ${pauseOnHover ? 'paused' : 'running'};
          }
        `}
      </style>

      <div
        className={`marquee-wrapper-${uniqueId.replace(/:/g, '')} ${className || ''}`}
        style={{
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <div
          className={`marquee-container-${uniqueId.replace(/:/g, '')}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            whiteSpace: 'nowrap',
            animation: `${animationName} ${speed}s linear infinite`,
            animationDirection,
          }}
        >
          {/* Repeat content twice for seamless loop */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {content}
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {content}
          </div>
        </div>
      </div>
    </>
  );
}

export default MarqueeBlock;
