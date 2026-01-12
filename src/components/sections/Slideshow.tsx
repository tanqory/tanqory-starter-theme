import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

// =============================================================================
// Types
// =============================================================================

export interface SlideshowSlide {
  id: string;
  image?: string;
  video?: string;
  heading?: string;
  subheading?: string;
  buttonLabel?: string;
  buttonLink?: string;
}

export interface SlideshowProps {
  // Content
  slides?: SlideshowSlide[];

  // Behavior
  autoplay?: boolean;
  autoplayInterval?: number;
  showNavigation?: boolean;
  showPagination?: boolean;

  // Layout
  sectionHeight?: 'small' | 'medium' | 'large' | 'full';
  contentAlignment?: 'left' | 'center' | 'right';

  // Appearance
  colorScheme?: 'light' | 'dark';
  overlay?: boolean;
  overlayOpacity?: number;

  // Spacing
  paddingTop?: number;
  paddingBottom?: number;
}

// =============================================================================
// Component
// =============================================================================

export function Slideshow({
  slides = [],
  autoplay = true,
  autoplayInterval = 5000,
  showNavigation = true,
  showPagination = true,
  sectionHeight = 'large',
  contentAlignment = 'center',
  colorScheme = 'dark',
  overlay = true,
  overlayOpacity = 40,
  paddingTop = 0,
  paddingBottom = 0,
}: SlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const heightClasses = {
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

  // Default slides if empty
  const displaySlides = slides.length > 0 ? slides : [
    { id: '1', heading: 'Slide 1', subheading: 'Description for slide 1' },
    { id: '2', heading: 'Slide 2', subheading: 'Description for slide 2' },
    { id: '3', heading: 'Slide 3', subheading: 'Description for slide 3' },
  ];

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? displaySlides.length - 1 : prev - 1));
  }, [displaySlides.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === displaySlides.length - 1 ? 0 : prev + 1));
  }, [displaySlides.length]);

  // Autoplay
  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(goToNext, autoplayInterval);
    return () => clearInterval(interval);
  }, [autoplay, autoplayInterval, goToNext]);

  const currentSlide = displaySlides[currentIndex];

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
      {/* Slides */}
      <div className="absolute inset-0">
        {displaySlides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              'absolute inset-0 transition-opacity duration-500',
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            )}
          >
            {slide.image && (
              <img
                src={slide.image}
                alt=""
                className="w-full h-full object-cover"
              />
            )}
            {slide.video && (
              <video
                src={slide.video}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            )}
            {!slide.image && !slide.video && (
              <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900" />
            )}
          </div>
        ))}
      </div>

      {/* Overlay */}
      {overlay && (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: `rgba(0,0,0,${overlayOpacity / 100})` }}
        />
      )}

      {/* Content */}
      <div className={cn(
        'relative z-10 flex flex-col justify-center w-full container mx-auto px-4',
        alignmentClasses[contentAlignment]
      )}>
        <div className="max-w-2xl">
          {currentSlide.heading && (
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {currentSlide.heading}
            </h2>
          )}
          {currentSlide.subheading && (
            <p className="text-lg md:text-xl opacity-90 mb-6">
              {currentSlide.subheading}
            </p>
          )}
          {currentSlide.buttonLabel && currentSlide.buttonLink && (
            <Button size="lg" onClick={() => window.location.href = currentSlide.buttonLink!}>
              {currentSlide.buttonLabel}
            </Button>
          )}
        </div>
      </div>

      {/* Navigation Arrows */}
      {showNavigation && displaySlides.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </>
      )}

      {/* Pagination Dots */}
      {showPagination && displaySlides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {displaySlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                'w-2 h-2 rounded-full transition-all',
                index === currentIndex
                  ? 'bg-white w-6'
                  : 'bg-white/50 hover:bg-white/70'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

// =============================================================================
// Section Definition (for Studio)
// =============================================================================

export const slideshowDefinition = {
  id: 'slideshow',
  name: 'Slideshow',
  description: 'Full-width slideshow with auto-play and navigation',
  category: 'banners',
  icon: 'Play',

  propsSchema: [
    // Behavior
    { type: 'header', label: 'Behavior' },
    { name: 'autoplay', label: 'Auto-play', type: 'checkbox', default: true },
    { name: 'autoplayInterval', label: 'Interval (ms)', type: 'number', default: 5000 },
    { name: 'showNavigation', label: 'Show Arrows', type: 'checkbox', default: true },
    { name: 'showPagination', label: 'Show Dots', type: 'checkbox', default: true },

    // Layout
    { type: 'header', label: 'Layout' },
    {
      name: 'sectionHeight',
      label: 'Height',
      type: 'select',
      options: [
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large', label: 'Large' },
        { value: 'full', label: 'Full Screen' },
      ],
      default: 'large'
    },
    {
      name: 'contentAlignment',
      label: 'Content Alignment',
      type: 'select',
      options: [
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'right', label: 'Right' },
      ],
      default: 'center'
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

    // Spacing
    { type: 'header', label: 'Spacing' },
    { name: 'paddingTop', label: 'Top Padding', type: 'range', min: 0, max: 100, default: 0 },
    { name: 'paddingBottom', label: 'Bottom Padding', type: 'range', min: 0, max: 100, default: 0 },
  ],

  defaultProps: {
    autoplay: true,
    autoplayInterval: 5000,
    showNavigation: true,
    showPagination: true,
    sectionHeight: 'large',
    contentAlignment: 'center',
    overlay: true,
  },

  component: Slideshow,
};
