// =============================================================================
// Slideshow Section (Draftbit pattern)
// =============================================================================

import React, { useState, useEffect, useCallback } from 'react';
import { TanqoryTheme } from '../../themes';
import { HeadingBlock } from '../blocks/HeadingBlock';
import { TextBlock } from '../blocks/TextBlock';
import { ButtonBlock } from '../blocks/ButtonBlock';

// =============================================================================
// Types
// =============================================================================

export interface Slide {
  id: string;
  image: string;
  heading?: string;
  subheading?: string;
  description?: string;
  button?: {
    label: string;
    link: string;
  };
  secondaryButton?: {
    label: string;
    link: string;
  };
  textAlignment?: 'left' | 'center' | 'right';
  textColor?: 'light' | 'dark';
}

export interface SlideshowSectionProps {
  slides: Slide[];
  height?: 'small' | 'medium' | 'large' | 'full';
  autoplay?: boolean;
  autoplayInterval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  overlay?: boolean;
  overlayOpacity?: number;
  transition?: 'fade' | 'slide';
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const SlideshowSectionSchema = {
  name: 'Slideshow',
  tag: 'section',
  settings: [
    {
      type: 'header',
      content: 'Layout',
    },
    {
      id: 'height',
      type: 'select',
      label: 'Height',
      options: [
        { value: 'small', label: 'Small (400px)' },
        { value: 'medium', label: 'Medium (600px)' },
        { value: 'large', label: 'Large (800px)' },
        { value: 'full', label: 'Full viewport' },
      ],
      default: 'large',
    },
    {
      type: 'header',
      content: 'Autoplay',
    },
    {
      id: 'autoplay',
      type: 'checkbox',
      label: 'Autoplay',
      default: true,
    },
    {
      id: 'autoplayInterval',
      type: 'range',
      label: 'Autoplay interval',
      min: 2000,
      max: 10000,
      step: 500,
      unit: 'ms',
      default: 5000,
    },
    {
      type: 'header',
      content: 'Navigation',
    },
    {
      id: 'showArrows',
      type: 'checkbox',
      label: 'Show arrows',
      default: true,
    },
    {
      id: 'showDots',
      type: 'checkbox',
      label: 'Show dots',
      default: true,
    },
    {
      type: 'header',
      content: 'Overlay',
    },
    {
      id: 'overlay',
      type: 'checkbox',
      label: 'Show overlay',
      default: true,
    },
    {
      id: 'overlayOpacity',
      type: 'range',
      label: 'Overlay opacity',
      min: 0,
      max: 100,
      step: 5,
      unit: '%',
      default: 40,
    },
    {
      id: 'transition',
      type: 'select',
      label: 'Transition',
      options: [
        { value: 'fade', label: 'Fade' },
        { value: 'slide', label: 'Slide' },
      ],
      default: 'fade',
    },
  ],
  blocks: [
    {
      type: 'slide',
      name: 'Slide',
      settings: [
        {
          id: 'image',
          type: 'image_picker',
          label: 'Image',
        },
        {
          id: 'heading',
          type: 'text',
          label: 'Heading',
        },
        {
          id: 'subheading',
          type: 'text',
          label: 'Subheading',
        },
        {
          id: 'description',
          type: 'textarea',
          label: 'Description',
        },
        {
          id: 'button_label',
          type: 'text',
          label: 'Button label',
        },
        {
          id: 'button_link',
          type: 'url',
          label: 'Button link',
        },
        {
          id: 'textAlignment',
          type: 'text_alignment',
          label: 'Text alignment',
          default: 'center',
        },
        {
          id: 'textColor',
          type: 'select',
          label: 'Text color',
          options: [
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
          ],
          default: 'light',
        },
      ],
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function SlideshowSection({
  slides,
  height = 'large',
  autoplay = true,
  autoplayInterval = 5000,
  showArrows = true,
  showDots = true,
  overlay = true,
  overlayOpacity = 40,
  transition = 'fade',
  className,
}: SlideshowSectionProps) {
  const theme = TanqoryTheme;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Height mappings
  const heightMap: Record<string, string> = {
    small: '400px',
    medium: '600px',
    large: '800px',
    full: '100vh',
  };

  // Auto advance slides
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (autoplay && slides.length > 1) {
      const interval = setInterval(goToNext, autoplayInterval);
      return () => clearInterval(interval);
    }
  }, [autoplay, autoplayInterval, goToNext, slides.length]);

  if (slides.length === 0) {
    return null;
  }

  const sectionStyle: React.CSSProperties = {
    position: 'relative',
    height: heightMap[height],
    overflow: 'hidden',
  };

  const slideStyle = (index: number): React.CSSProperties => {
    const isActive = index === currentIndex;

    if (transition === 'fade') {
      return {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: isActive ? 1 : 0,
        transition: `opacity ${theme.transitions.slow} ${theme.transitions.easing}`,
        zIndex: isActive ? 1 : 0,
      };
    }

    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      transform: `translateX(${(index - currentIndex) * 100}%)`,
      transition: `transform ${theme.transitions.slow} ${theme.transitions.easing}`,
    };
  };

  const arrowStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '48px',
    height: '48px',
    borderRadius: theme.borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    transition: `all ${theme.transitions.fast} ${theme.transitions.easing}`,
  };

  return (
    <section style={sectionStyle} className={className}>
      {/* Slides */}
      {slides.map((slide, index) => (
        <div key={slide.id} style={slideStyle(index)}>
          {/* Background Image */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* Overlay */}
          {overlay && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: `rgba(0, 0, 0, ${overlayOpacity / 100})`,
              }}
            />
          )}

          {/* Content */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: theme.spacing['2xl'],
            }}
          >
            <SlideContent slide={slide} />
          </div>
        </div>
      ))}

      {/* Arrows */}
      {showArrows && slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={goToPrev}
            style={{ ...arrowStyle, left: theme.spacing.lg }}
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={theme.colors.foreground} strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goToNext}
            style={{ ...arrowStyle, right: theme.spacing.lg }}
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={theme.colors.foreground} strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && slides.length > 1 && (
        <div
          style={{
            position: 'absolute',
            bottom: theme.spacing.lg,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: theme.spacing.xs,
            zIndex: 10,
          }}
        >
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentIndex(index)}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: theme.borderRadius.full,
                border: 'none',
                backgroundColor: index === currentIndex ? 'white' : 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                transition: `background-color ${theme.transitions.fast} ${theme.transitions.easing}`,
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

// =============================================================================
// Slide Content Component
// =============================================================================

function SlideContent({ slide }: { slide: Slide }) {
  const theme = TanqoryTheme;
  const isLight = slide.textColor !== 'dark';

  const contentStyle: React.CSSProperties = {
    maxWidth: '800px',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
    alignItems: slide.textAlignment === 'center' ? 'center' : slide.textAlignment === 'right' ? 'flex-end' : 'flex-start',
    textAlign: slide.textAlignment || 'center',
  };

  const headingColor = isLight ? theme.colors.secondary : theme.colors.foreground;
  const textColor = isLight ? 'rgba(255,255,255,0.9)' : theme.colors.foregroundSecondary;

  return (
    <div style={contentStyle}>
      {slide.subheading && (
        <span
          style={{
            fontSize: theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.medium,
            color: textColor,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          {slide.subheading}
        </span>
      )}

      {slide.heading && (
        <HeadingBlock
          text={slide.heading}
          level="h1"
          color={headingColor}
          alignment={slide.textAlignment}
        />
      )}

      {slide.description && (
        <TextBlock
          text={slide.description}
          preset="body"
          color={textColor}
          alignment={slide.textAlignment}
        />
      )}

      {(slide.button || slide.secondaryButton) && (
        <div
          style={{
            display: 'flex',
            gap: theme.spacing.md,
            marginTop: theme.spacing.sm,
          }}
        >
          {slide.button && (
            <ButtonBlock
              label={slide.button.label}
              link={slide.button.link}
              style="primary"
            />
          )}
          {slide.secondaryButton && (
            <ButtonBlock
              label={slide.secondaryButton.label}
              link={slide.secondaryButton.link}
              style="secondary"
            />
          )}
        </div>
      )}
    </div>
  );
}

export default SlideshowSection;
