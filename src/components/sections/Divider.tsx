import { cn } from '../../lib/utils';

// =============================================================================
// Types
// =============================================================================

export interface DividerProps {
  // Appearance
  style?: 'line' | 'dashed' | 'dotted' | 'none';
  thickness?: number;
  color?: string;
  width?: 'full' | 'page' | 'narrow';

  // Spacing
  paddingTop?: number;
  paddingBottom?: number;
}

// =============================================================================
// Component
// =============================================================================

export function Divider({
  style = 'line',
  thickness = 1,
  color,
  width = 'page',
  paddingTop = 24,
  paddingBottom = 24,
}: DividerProps) {
  const widthClasses = {
    full: 'w-full',
    page: 'container mx-auto px-4',
    narrow: 'max-w-md mx-auto px-4',
  };

  const styleClasses = {
    line: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
    none: 'border-none',
  };

  if (style === 'none') {
    return (
      <div
        style={{
          paddingTop: `${paddingTop}px`,
          paddingBottom: `${paddingBottom}px`,
        }}
      />
    );
  }

  return (
    <div
      className={cn(widthClasses[width])}
      style={{
        paddingTop: `${paddingTop}px`,
        paddingBottom: `${paddingBottom}px`,
      }}
    >
      <hr
        className={cn(
          'border-t',
          styleClasses[style],
          !color && 'border-gray-200'
        )}
        style={{
          borderTopWidth: `${thickness}px`,
          borderColor: color || undefined,
        }}
      />
    </div>
  );
}

// =============================================================================
// Section Definition (for Studio)
// =============================================================================

export const dividerDefinition = {
  id: 'divider',
  name: 'Divider',
  description: 'Visual separator between sections',
  category: 'content',
  icon: 'Minus',

  propsSchema: [
    // Appearance
    { type: 'header', label: 'Appearance' },
    {
      name: 'style',
      label: 'Style',
      type: 'select',
      options: [
        { value: 'line', label: 'Solid Line' },
        { value: 'dashed', label: 'Dashed' },
        { value: 'dotted', label: 'Dotted' },
        { value: 'none', label: 'None (Spacer)' },
      ],
      default: 'line'
    },
    { name: 'thickness', label: 'Thickness', type: 'range', min: 1, max: 8, default: 1 },
    { name: 'color', label: 'Color', type: 'color' },
    {
      name: 'width',
      label: 'Width',
      type: 'select',
      options: [
        { value: 'full', label: 'Full Width' },
        { value: 'page', label: 'Page Width' },
        { value: 'narrow', label: 'Narrow' },
      ],
      default: 'page'
    },

    // Spacing
    { type: 'header', label: 'Spacing' },
    { name: 'paddingTop', label: 'Top Padding', type: 'range', min: 0, max: 100, default: 24 },
    { name: 'paddingBottom', label: 'Bottom Padding', type: 'range', min: 0, max: 100, default: 24 },
  ],

  defaultProps: {
    style: 'line',
    thickness: 1,
    width: 'page',
  },

  component: Divider,
};
