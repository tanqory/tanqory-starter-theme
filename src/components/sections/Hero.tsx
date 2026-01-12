import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

// =============================================================================
// Types
// =============================================================================

export interface HeroProps {
  // Media
  mediaType1?: 'image' | 'video';
  image1?: string;
  video1?: string;
  mediaType2?: 'image' | 'video';
  image2?: string;
  video2?: string;

  // Content
  heading?: string;
  subheading?: string;
  buttonLabel?: string;
  buttonLink?: string;
  secondaryButtonLabel?: string;
  secondaryButtonLink?: string;

  // Layout
  contentDirection?: 'column' | 'row';
  horizontalAlignment?: 'left' | 'center' | 'right';
  verticalAlignment?: 'top' | 'center' | 'bottom';
  sectionWidth?: 'page' | 'full';
  sectionHeight?: 'auto' | 'small' | 'medium' | 'large' | 'full';

  // Appearance
  colorScheme?: 'light' | 'dark';
  overlay?: boolean;
  overlayOpacity?: number;
  overlayStyle?: 'solid' | 'gradient';
  gradientDirection?: 'up' | 'down';

  // Spacing
  paddingTop?: number;
  paddingBottom?: number;
}

// =============================================================================
// Component
// =============================================================================

export function Hero({
  // Media
  mediaType1 = 'image',
  image1,
  video1,
  mediaType2,
  image2,
  video2,

  // Content
  heading = 'ยินดีต้อนรับสู่ร้านค้าของเรา',
  subheading = 'ค้นพบสินค้าคุณภาพที่คัดสรรมาเพื่อคุณโดยเฉพาะ',
  buttonLabel = 'เลือกซื้อสินค้า',
  buttonLink = '/products',
  secondaryButtonLabel,
  secondaryButtonLink,

  // Layout
  contentDirection = 'column',
  horizontalAlignment = 'center',
  verticalAlignment = 'center',
  sectionWidth = 'page',
  sectionHeight = 'large',

  // Appearance
  colorScheme = 'dark',
  overlay = true,
  overlayOpacity = 40,
  overlayStyle = 'gradient',
  gradientDirection = 'up',

  // Spacing
  paddingTop = 40,
  paddingBottom = 40,
}: HeroProps) {
  const heightClasses = {
    auto: 'min-h-0',
    small: 'min-h-[300px]',
    medium: 'min-h-[500px]',
    large: 'min-h-[600px]',
    full: 'min-h-screen',
  };

  const alignmentClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  };

  const verticalClasses = {
    top: 'justify-start',
    center: 'justify-center',
    bottom: 'justify-end',
  };

  const hasMedia = image1 || video1 || image2 || video2;
  const hasTwoMedia = (image1 || video1) && (image2 || video2);

  return (
    <section
      className={cn(
        'relative flex overflow-hidden',
        heightClasses[sectionHeight],
        colorScheme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      )}
      style={{
        paddingTop: `${paddingTop}px`,
        paddingBottom: `${paddingBottom}px`,
      }}
    >
      {/* Media Background */}
      <div className={cn('absolute inset-0', hasTwoMedia ? 'grid grid-cols-2' : '')}>
        {/* Media 1 */}
        {mediaType1 === 'image' && image1 && (
          <img
            src={image1}
            alt=""
            className="w-full h-full object-cover"
          />
        )}
        {mediaType1 === 'video' && video1 && (
          <video
            src={video1}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        )}

        {/* Media 2 */}
        {mediaType2 === 'image' && image2 && (
          <img
            src={image2}
            alt=""
            className="w-full h-full object-cover"
          />
        )}
        {mediaType2 === 'video' && video2 && (
          <video
            src={video2}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        )}

        {/* Placeholder if no media */}
        {!hasMedia && (
          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900" />
        )}
      </div>

      {/* Overlay */}
      {overlay && (
        <div
          className="absolute inset-0"
          style={{
            background: overlayStyle === 'gradient'
              ? `linear-gradient(${gradientDirection === 'up' ? 'to top' : 'to bottom'}, rgba(0,0,0,${overlayOpacity / 100}) 0%, transparent 100%)`
              : `rgba(0,0,0,${overlayOpacity / 100})`,
          }}
        />
      )}

      {/* Content */}
      <div
        className={cn(
          'relative z-10 flex w-full',
          sectionWidth === 'page' ? 'container mx-auto px-4' : 'px-4',
          contentDirection === 'column' ? 'flex-col' : 'flex-row',
          alignmentClasses[horizontalAlignment],
          verticalClasses[verticalAlignment]
        )}
      >
        <div className={cn(
          'flex flex-col gap-4',
          contentDirection === 'row' ? 'max-w-xl' : 'max-w-2xl',
          alignmentClasses[horizontalAlignment]
        )}>
          {heading && (
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {heading}
            </h1>
          )}

          {subheading && (
            <p className="text-lg md:text-xl opacity-90">
              {subheading}
            </p>
          )}

          {(buttonLabel || secondaryButtonLabel) && (
            <div className={cn(
              'flex flex-wrap gap-4 mt-4',
              horizontalAlignment === 'center' && 'justify-center'
            )}>
              {buttonLabel && (
                <Button size="lg" onClick={() => window.location.href = buttonLink || '#'}>
                  {buttonLabel}
                </Button>
              )}
              {secondaryButtonLabel && secondaryButtonLink && (
                <Button variant="outline" size="lg" onClick={() => window.location.href = secondaryButtonLink}>
                  {secondaryButtonLabel}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// Section Definition (for Studio)
// =============================================================================

export const heroDefinition = {
  id: 'hero',
  name: 'Hero',
  description: 'Full-width banner with image/video background and text overlay',
  category: 'banners',
  icon: 'Image',

  propsSchema: [
    // Media 1
    { type: 'header', label: 'Media 1' },
    {
      name: 'mediaType1',
      label: 'Type',
      type: 'select',
      options: [
        { value: 'image', label: 'Image' },
        { value: 'video', label: 'Video' },
      ],
      default: 'image'
    },
    { name: 'image1', label: 'Image', type: 'image' },
    { name: 'video1', label: 'Video URL', type: 'url' },

    // Media 2
    { type: 'header', label: 'Media 2 (Optional)' },
    {
      name: 'mediaType2',
      label: 'Type',
      type: 'select',
      options: [
        { value: 'image', label: 'Image' },
        { value: 'video', label: 'Video' },
      ],
    },
    { name: 'image2', label: 'Image', type: 'image' },
    { name: 'video2', label: 'Video URL', type: 'url' },

    // Content
    { type: 'header', label: 'Content' },
    { name: 'heading', label: 'Heading', type: 'text', default: 'ยินดีต้อนรับสู่ร้านค้าของเรา' },
    { name: 'subheading', label: 'Subheading', type: 'textarea' },
    { name: 'buttonLabel', label: 'Button Label', type: 'text', default: 'เลือกซื้อสินค้า' },
    { name: 'buttonLink', label: 'Button Link', type: 'url', default: '/products' },
    { name: 'secondaryButtonLabel', label: 'Secondary Button', type: 'text' },
    { name: 'secondaryButtonLink', label: 'Secondary Link', type: 'url' },

    // Layout
    { type: 'header', label: 'Layout' },
    {
      name: 'contentDirection',
      label: 'Direction',
      type: 'select',
      options: [
        { value: 'column', label: 'Vertical' },
        { value: 'row', label: 'Horizontal' },
      ],
      default: 'column'
    },
    {
      name: 'horizontalAlignment',
      label: 'Alignment',
      type: 'select',
      options: [
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'right', label: 'Right' },
      ],
      default: 'center'
    },
    {
      name: 'verticalAlignment',
      label: 'Position',
      type: 'select',
      options: [
        { value: 'top', label: 'Top' },
        { value: 'center', label: 'Center' },
        { value: 'bottom', label: 'Bottom' },
      ],
      default: 'center'
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
    {
      name: 'sectionHeight',
      label: 'Height',
      type: 'select',
      options: [
        { value: 'auto', label: 'Auto' },
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large', label: 'Large' },
        { value: 'full', label: 'Full Screen' },
      ],
      default: 'large'
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
      default: 'dark'
    },
    { name: 'overlay', label: 'Show Overlay', type: 'checkbox', default: true },
    { name: 'overlayOpacity', label: 'Overlay Opacity', type: 'range', min: 0, max: 100, default: 40 },
    {
      name: 'overlayStyle',
      label: 'Overlay Style',
      type: 'select',
      options: [
        { value: 'solid', label: 'Solid' },
        { value: 'gradient', label: 'Gradient' },
      ],
      default: 'gradient'
    },
    {
      name: 'gradientDirection',
      label: 'Gradient Direction',
      type: 'select',
      options: [
        { value: 'up', label: 'Up' },
        { value: 'down', label: 'Down' },
      ],
      default: 'up'
    },

    // Spacing
    { type: 'header', label: 'Spacing' },
    { name: 'paddingTop', label: 'Top Padding', type: 'range', min: 0, max: 100, default: 40 },
    { name: 'paddingBottom', label: 'Bottom Padding', type: 'range', min: 0, max: 100, default: 40 },
  ],

  defaultProps: {
    heading: 'ยินดีต้อนรับสู่ร้านค้าของเรา',
    subheading: 'ค้นพบสินค้าคุณภาพที่คัดสรรมาเพื่อคุณโดยเฉพาะ',
    buttonLabel: 'เลือกซื้อสินค้า',
    buttonLink: '/products',
    sectionHeight: 'large',
    colorScheme: 'dark',
    overlay: true,
    overlayStyle: 'gradient',
  },

  component: Hero,
};
