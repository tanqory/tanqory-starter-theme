import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

// =============================================================================
// Types
// =============================================================================

export interface CarouselItem {
  id: string;
  image?: string;
  title?: string;
  description?: string;
  link?: string;
}

export interface CarouselProps {
  // Content
  title?: string;
  items?: CarouselItem[];

  // Layout
  columns?: number;
  mobileColumns?: 1 | 2;
  sectionWidth?: 'page' | 'full';
  gap?: number;

  // Navigation
  showArrows?: boolean;
  arrowStyle?: 'arrow' | 'chevron';
  arrowBackground?: 'none' | 'circle' | 'square';

  // Appearance
  colorScheme?: 'light' | 'dark';

  // Spacing
  paddingTop?: number;
  paddingBottom?: number;
}

// =============================================================================
// Component
// =============================================================================

export function Carousel({
  // Content
  title,
  items = [],

  // Layout
  columns = 4,
  mobileColumns = 1,
  sectionWidth = 'page',
  gap = 12,

  // Navigation
  showArrows = true,
  arrowStyle = 'chevron',
  arrowBackground = 'none',

  // Appearance
  colorScheme = 'light',

  // Spacing
  paddingTop = 48,
  paddingBottom = 48,
}: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const ArrowIcon = arrowStyle === 'arrow' ? ChevronLeft : ChevronLeft;
  const ArrowIconRight = arrowStyle === 'arrow' ? ChevronRight : ChevronRight;

  const arrowButtonClass = cn(
    'flex items-center justify-center w-10 h-10 transition-colors',
    arrowBackground === 'circle' && 'rounded-full bg-white/80 hover:bg-white shadow-md',
    arrowBackground === 'square' && 'rounded-md bg-white/80 hover:bg-white shadow-md',
    arrowBackground === 'none' && 'hover:opacity-70',
    'disabled:opacity-30 disabled:cursor-not-allowed'
  );

  // Generate placeholder items if empty
  const displayItems = items.length > 0 ? items : [
    { id: '1', title: 'Card 1', description: 'Description here' },
    { id: '2', title: 'Card 2', description: 'Description here' },
    { id: '3', title: 'Card 3', description: 'Description here' },
    { id: '4', title: 'Card 4', description: 'Description here' },
  ];

  return (
    <section
      className={cn(
        colorScheme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      )}
      style={{
        paddingTop: `${paddingTop}px`,
        paddingBottom: `${paddingBottom}px`,
      }}
    >
      <div className={cn(
        sectionWidth === 'page' ? 'container mx-auto px-4' : 'px-4'
      )}>
        {/* Header */}
        {(title || showArrows) && (
          <div className="flex items-end justify-between mb-4">
            {title && (
              <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>
            )}
            {showArrows && (
              <div className="flex gap-2">
                <button
                  onClick={() => scroll('left')}
                  disabled={!canScrollLeft}
                  className={arrowButtonClass}
                  aria-label="Previous"
                >
                  <ArrowIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scroll('right')}
                  disabled={!canScrollRight}
                  className={arrowButtonClass}
                  aria-label="Next"
                >
                  <ArrowIconRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Carousel */}
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory"
          style={{ gap: `${gap}px` }}
        >
          {displayItems.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 snap-start"
              style={{
                width: `calc((100% - ${gap * (columns - 1)}px) / ${columns})`,
              }}
            >
              <div className="flex flex-col gap-3">
                {/* Image */}
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title || ''}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
                  )}
                </div>

                {/* Content */}
                {item.title && (
                  <h3 className="font-medium text-lg">{item.title}</h3>
                )}
                {item.description && (
                  <p className="text-sm opacity-70">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// Section Definition (for Studio)
// =============================================================================

export const carouselDefinition = {
  id: 'carousel',
  name: 'Carousel',
  description: 'Horizontal scrolling carousel with cards',
  category: 'storytelling',
  icon: 'LayoutGrid',

  propsSchema: [
    // Content
    { type: 'header', label: 'Content' },
    { name: 'title', label: 'Title', type: 'text' },

    // Layout
    { type: 'header', label: 'Layout' },
    { name: 'columns', label: 'Columns', type: 'range', min: 1, max: 8, default: 4 },
    {
      name: 'mobileColumns',
      label: 'Mobile Columns',
      type: 'select',
      options: [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
      ],
      default: 1
    },
    {
      name: 'sectionWidth',
      label: 'Width',
      type: 'select',
      options: [
        { value: 'page', label: 'Page Width' },
        { value: 'full', label: 'Full Width' },
      ],
      default: 'page'
    },
    { name: 'gap', label: 'Gap', type: 'range', min: 0, max: 48, default: 12 },

    // Navigation
    { type: 'header', label: 'Navigation' },
    { name: 'showArrows', label: 'Show Arrows', type: 'checkbox', default: true },
    {
      name: 'arrowStyle',
      label: 'Arrow Style',
      type: 'select',
      options: [
        { value: 'arrow', label: 'Arrows' },
        { value: 'chevron', label: 'Chevrons' },
      ],
      default: 'chevron'
    },
    {
      name: 'arrowBackground',
      label: 'Arrow Background',
      type: 'select',
      options: [
        { value: 'none', label: 'None' },
        { value: 'circle', label: 'Circle' },
        { value: 'square', label: 'Square' },
      ],
      default: 'none'
    },

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
      default: 'light'
    },

    // Spacing
    { type: 'header', label: 'Spacing' },
    { name: 'paddingTop', label: 'Top Padding', type: 'range', min: 0, max: 100, default: 48 },
    { name: 'paddingBottom', label: 'Bottom Padding', type: 'range', min: 0, max: 100, default: 48 },
  ],

  defaultProps: {
    columns: 4,
    mobileColumns: 1,
    showArrows: true,
    arrowStyle: 'chevron',
    colorScheme: 'light',
  },

  component: Carousel,
};
