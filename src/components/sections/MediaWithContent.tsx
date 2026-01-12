import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

// =============================================================================
// Types
// =============================================================================

export interface MediaWithContentProps {
  // Media
  mediaType?: 'image' | 'video';
  image?: string;
  video?: string;
  mediaPosition?: 'left' | 'right';

  // Content
  heading?: string;
  subheading?: string;
  description?: string;
  buttonLabel?: string;
  buttonLink?: string;

  // Layout
  sectionWidth?: 'page' | 'full';
  contentAlignment?: 'left' | 'center' | 'right';
  verticalAlignment?: 'top' | 'center' | 'bottom';
  mediaRatio?: '1:1' | '4:3' | '16:9' | '3:4';

  // Appearance
  colorScheme?: 'light' | 'dark';

  // Spacing
  paddingTop?: number;
  paddingBottom?: number;
  gap?: number;
}

// =============================================================================
// Component
// =============================================================================

export function MediaWithContent({
  // Media
  mediaType = 'image',
  image,
  video,
  mediaPosition = 'left',

  // Content
  heading = 'Featured Content',
  subheading,
  description = 'Add a compelling description here to engage your visitors.',
  buttonLabel,
  buttonLink,

  // Layout
  sectionWidth = 'page',
  contentAlignment = 'left',
  verticalAlignment = 'center',
  mediaRatio = '1:1',

  // Appearance
  colorScheme = 'light',

  // Spacing
  paddingTop = 48,
  paddingBottom = 48,
  gap = 32,
}: MediaWithContentProps) {
  const ratioClasses = {
    '1:1': 'aspect-square',
    '4:3': 'aspect-[4/3]',
    '16:9': 'aspect-video',
    '3:4': 'aspect-[3/4]',
  };

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const verticalClasses = {
    top: 'items-start',
    center: 'items-center',
    bottom: 'items-end',
  };

  const MediaComponent = () => (
    <div className={cn('w-full md:w-1/2 flex-shrink-0', ratioClasses[mediaRatio])}>
      {mediaType === 'image' && image && (
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover rounded-lg"
        />
      )}
      {mediaType === 'video' && video && (
        <video
          src={video}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover rounded-lg"
        />
      )}
      {!image && !video && (
        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg" />
      )}
    </div>
  );

  const ContentComponent = () => (
    <div className={cn(
      'w-full md:w-1/2 flex flex-col justify-center',
      alignmentClasses[contentAlignment]
    )}>
      {subheading && (
        <p className="text-sm uppercase tracking-wide opacity-70 mb-2">
          {subheading}
        </p>
      )}
      {heading && (
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {heading}
        </h2>
      )}
      {description && (
        <p className="text-lg opacity-80 mb-6">
          {description}
        </p>
      )}
      {buttonLabel && buttonLink && (
        <div className={cn(
          contentAlignment === 'center' && 'flex justify-center',
          contentAlignment === 'right' && 'flex justify-end'
        )}>
          <Button onClick={() => window.location.href = buttonLink}>
            {buttonLabel}
          </Button>
        </div>
      )}
    </div>
  );

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
        <div
          className={cn(
            'flex flex-col md:flex-row',
            verticalClasses[verticalAlignment],
            mediaPosition === 'right' && 'md:flex-row-reverse'
          )}
          style={{ gap: `${gap}px` }}
        >
          <MediaComponent />
          <ContentComponent />
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// Section Definition (for Studio)
// =============================================================================

export const mediaWithContentDefinition = {
  id: 'media-with-content',
  name: 'Media with Content',
  description: 'Image or video paired with text content',
  category: 'storytelling',
  icon: 'LayoutGrid',

  propsSchema: [
    // Media
    { type: 'header', label: 'Media' },
    {
      name: 'mediaType',
      label: 'Type',
      type: 'select',
      options: [
        { value: 'image', label: 'Image' },
        { value: 'video', label: 'Video' },
      ],
      default: 'image'
    },
    { name: 'image', label: 'Image', type: 'image' },
    { name: 'video', label: 'Video URL', type: 'url' },
    {
      name: 'mediaPosition',
      label: 'Position',
      type: 'select',
      options: [
        { value: 'left', label: 'Left' },
        { value: 'right', label: 'Right' },
      ],
      default: 'left'
    },
    {
      name: 'mediaRatio',
      label: 'Aspect Ratio',
      type: 'select',
      options: [
        { value: '1:1', label: 'Square (1:1)' },
        { value: '4:3', label: 'Standard (4:3)' },
        { value: '16:9', label: 'Wide (16:9)' },
        { value: '3:4', label: 'Portrait (3:4)' },
      ],
      default: '1:1'
    },

    // Content
    { type: 'header', label: 'Content' },
    { name: 'subheading', label: 'Subheading', type: 'text' },
    { name: 'heading', label: 'Heading', type: 'text', default: 'Featured Content' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'buttonLabel', label: 'Button Label', type: 'text' },
    { name: 'buttonLink', label: 'Button Link', type: 'url' },

    // Layout
    { type: 'header', label: 'Layout' },
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
    {
      name: 'contentAlignment',
      label: 'Text Alignment',
      type: 'select',
      options: [
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'right', label: 'Right' },
      ],
      default: 'left'
    },
    {
      name: 'verticalAlignment',
      label: 'Vertical Alignment',
      type: 'select',
      options: [
        { value: 'top', label: 'Top' },
        { value: 'center', label: 'Center' },
        { value: 'bottom', label: 'Bottom' },
      ],
      default: 'center'
    },
    { name: 'gap', label: 'Gap', type: 'range', min: 0, max: 64, default: 32 },

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
    mediaType: 'image',
    mediaPosition: 'left',
    heading: 'Featured Content',
    colorScheme: 'light',
  },

  component: MediaWithContent,
};
