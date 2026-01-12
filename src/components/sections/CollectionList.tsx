import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

// =============================================================================
// Types
// =============================================================================

export interface Collection {
  id: string;
  title: string;
  handle: string;
  image?: string;
  description?: string;
  productsCount?: number;
}

export interface CollectionListProps {
  // Content
  title?: string;
  collections?: Collection[];

  // Layout
  columns?: number;
  sectionWidth?: 'page' | 'full';
  gap?: number;
  cardStyle?: 'overlay' | 'below';

  // Appearance
  colorScheme?: 'light' | 'dark';
  imageRatio?: '1:1' | '4:3' | '16:9' | '3:4';

  // Spacing
  paddingTop?: number;
  paddingBottom?: number;
}

// =============================================================================
// Component
// =============================================================================

export function CollectionList({
  title,
  collections = [],
  columns = 3,
  sectionWidth = 'page',
  gap = 24,
  cardStyle = 'overlay',
  colorScheme = 'light',
  imageRatio = '4:3',
  paddingTop = 48,
  paddingBottom = 48,
}: CollectionListProps) {
  const ratioClasses = {
    '1:1': 'aspect-square',
    '4:3': 'aspect-[4/3]',
    '16:9': 'aspect-video',
    '3:4': 'aspect-[3/4]',
  };

  // Default collections if empty
  const displayCollections: Collection[] = collections.length > 0 ? collections : [
    { id: '1', title: 'Collection 1', handle: 'collection-1' },
    { id: '2', title: 'Collection 2', handle: 'collection-2' },
    { id: '3', title: 'Collection 3', handle: 'collection-3' },
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
        {title && (
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">{title}</h2>
        )}

        {/* Grid */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            gap: `${gap}px`,
          }}
        >
          {displayCollections.map((collection) => (
            <Link
              key={collection.id}
              to={`/collections/${collection.handle}`}
              className="group relative"
            >
              {/* Image */}
              <div className={cn(
                'relative overflow-hidden rounded-lg',
                ratioClasses[imageRatio]
              )}>
                {collection.image ? (
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
                )}

                {/* Overlay Content */}
                {cardStyle === 'overlay' && (
                  <div className="absolute inset-0 bg-black/30 flex items-end p-4">
                    <h3 className="text-white text-xl font-semibold">
                      {collection.title}
                    </h3>
                  </div>
                )}
              </div>

              {/* Below Content */}
              {cardStyle === 'below' && (
                <div className="mt-3">
                  <h3 className="font-semibold group-hover:underline">
                    {collection.title}
                  </h3>
                  {collection.productsCount !== undefined && (
                    <p className="text-sm opacity-70">
                      {collection.productsCount} products
                    </p>
                  )}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// Section Definition (for Studio)
// =============================================================================

export const collectionListDefinition = {
  id: 'collection-list',
  name: 'Collection List',
  description: 'Grid of product collections',
  category: 'collections',
  icon: 'Grid',

  propsSchema: [
    // Content
    { type: 'header', label: 'Content' },
    { name: 'title', label: 'Title', type: 'text' },

    // Layout
    { type: 'header', label: 'Layout' },
    { name: 'columns', label: 'Columns', type: 'range', min: 2, max: 6, default: 3 },
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
    { name: 'gap', label: 'Gap', type: 'range', min: 8, max: 48, default: 24 },
    {
      name: 'cardStyle',
      label: 'Card Style',
      type: 'select',
      options: [
        { value: 'overlay', label: 'Text Overlay' },
        { value: 'below', label: 'Text Below' },
      ],
      default: 'overlay'
    },
    {
      name: 'imageRatio',
      label: 'Image Ratio',
      type: 'select',
      options: [
        { value: '1:1', label: 'Square (1:1)' },
        { value: '4:3', label: 'Standard (4:3)' },
        { value: '16:9', label: 'Wide (16:9)' },
        { value: '3:4', label: 'Portrait (3:4)' },
      ],
      default: '4:3'
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
    columns: 3,
    cardStyle: 'overlay',
    colorScheme: 'light',
  },

  component: CollectionList,
};
