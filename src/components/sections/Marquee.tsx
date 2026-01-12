import { cn } from '../../lib/utils';

// =============================================================================
// Types
// =============================================================================

export interface MarqueeProps {
  // Content
  text?: string;
  repeatCount?: number;

  // Behavior
  speed?: 'slow' | 'normal' | 'fast';
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;

  // Appearance
  colorScheme?: 'light' | 'dark';
  fontSize?: 'small' | 'medium' | 'large' | 'xlarge';

  // Spacing
  paddingTop?: number;
  paddingBottom?: number;
}

// =============================================================================
// Component
// =============================================================================

export function Marquee({
  text = 'Free shipping on orders over ฿1,500',
  repeatCount = 4,
  speed = 'normal',
  direction = 'left',
  pauseOnHover = true,
  colorScheme = 'dark',
  fontSize = 'medium',
  paddingTop = 12,
  paddingBottom = 12,
}: MarqueeProps) {
  const speedDurations = {
    slow: '40s',
    normal: '25s',
    fast: '15s',
  };

  const fontSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-xl',
    xlarge: 'text-2xl md:text-3xl',
  };

  const repeatedText = Array(repeatCount).fill(text);

  return (
    <section
      className={cn(
        'overflow-hidden',
        colorScheme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      )}
      style={{
        paddingTop: `${paddingTop}px`,
        paddingBottom: `${paddingBottom}px`,
      }}
    >
      <div
        className={cn(
          'flex whitespace-nowrap',
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
        style={{
          animation: `marquee ${speedDurations[speed]} linear infinite`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }}
      >
        {repeatedText.map((t, i) => (
          <span
            key={i}
            className={cn(
              'mx-8 font-medium',
              fontSizeClasses[fontSize]
            )}
          >
            {t}
          </span>
        ))}
        {/* Duplicate for seamless loop */}
        {repeatedText.map((t, i) => (
          <span
            key={`dup-${i}`}
            className={cn(
              'mx-8 font-medium',
              fontSizeClasses[fontSize]
            )}
          >
            {t}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}

// =============================================================================
// Section Definition (for Studio)
// =============================================================================

export const marqueeDefinition = {
  id: 'marquee',
  name: 'Marquee',
  description: 'Scrolling text announcement bar',
  category: 'content',
  icon: 'Type',

  propsSchema: [
    // Content
    { type: 'header', label: 'Content' },
    { name: 'text', label: 'Text', type: 'text', default: 'Free shipping on orders over ฿1,500' },
    { name: 'repeatCount', label: 'Repeat Count', type: 'range', min: 2, max: 10, default: 4 },

    // Behavior
    { type: 'header', label: 'Behavior' },
    {
      name: 'speed',
      label: 'Speed',
      type: 'select',
      options: [
        { value: 'slow', label: 'Slow' },
        { value: 'normal', label: 'Normal' },
        { value: 'fast', label: 'Fast' },
      ],
      default: 'normal'
    },
    {
      name: 'direction',
      label: 'Direction',
      type: 'select',
      options: [
        { value: 'left', label: 'Left' },
        { value: 'right', label: 'Right' },
      ],
      default: 'left'
    },
    { name: 'pauseOnHover', label: 'Pause on Hover', type: 'checkbox', default: true },

    // Appearance
    { type: 'header', label: 'Appearance' },
    {
      name: 'colorScheme',
      label: 'Color Scheme',
      type: 'select',
      options: [
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
      ],
      default: 'dark'
    },
    {
      name: 'fontSize',
      label: 'Font Size',
      type: 'select',
      options: [
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large', label: 'Large' },
        { value: 'xlarge', label: 'Extra Large' },
      ],
      default: 'medium'
    },

    // Spacing
    { type: 'header', label: 'Spacing' },
    { name: 'paddingTop', label: 'Top Padding', type: 'range', min: 0, max: 48, default: 12 },
    { name: 'paddingBottom', label: 'Bottom Padding', type: 'range', min: 0, max: 48, default: 12 },
  ],

  defaultProps: {
    text: 'Free shipping on orders over ฿1,500',
    speed: 'normal',
    direction: 'left',
    colorScheme: 'dark',
  },

  component: Marquee,
};
