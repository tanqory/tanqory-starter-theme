// =============================================================================
// Carousel Block (Draftbit pattern)
// =============================================================================

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { TanqoryTheme } from '../../themes';

// =============================================================================
// Types
// =============================================================================

export interface CarouselBlockProps {
  children: React.ReactNode[];
  slidesPerView?: number | { mobile: number; tablet: number; desktop: number };
  gap?: number;
  showArrows?: boolean;
  showDots?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
  loop?: boolean;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const CarouselBlockSchema = {
  name: 'Carousel',
  tag: 'div',
  settings: [
    {
      id: 'slidesPerView',
      type: 'range',
      label: 'Slides per view (Desktop)',
      min: 1,
      max: 6,
      step: 1,
      default: 4,
    },
    {
      id: 'gap',
      type: 'range',
      label: 'Gap between slides',
      min: 0,
      max: 48,
      step: 4,
      unit: 'px',
      default: 16,
    },
    {
      id: 'showArrows',
      type: 'checkbox',
      label: 'Show navigation arrows',
      default: true,
    },
    {
      id: 'showDots',
      type: 'checkbox',
      label: 'Show pagination dots',
      default: true,
    },
    {
      id: 'autoplay',
      type: 'checkbox',
      label: 'Autoplay',
      default: false,
    },
    {
      id: 'autoplayInterval',
      type: 'range',
      label: 'Autoplay interval',
      min: 1000,
      max: 10000,
      step: 500,
      unit: 'ms',
      default: 5000,
      visibleIf: "{{ settings.autoplay }}",
    },
    {
      id: 'loop',
      type: 'checkbox',
      label: 'Loop slides',
      default: false,
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function CarouselBlock({
  children,
  slidesPerView = 4,
  gap = 16,
  showArrows = true,
  showDots = true,
  autoplay = false,
  autoplayInterval = 5000,
  loop = false,
  className,
}: CarouselBlockProps) {
  const theme = TanqoryTheme;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const slideCount = React.Children.count(children);

  // Get slides per view (use desktop value if number)
  const getVisibleSlides = () => {
    if (typeof slidesPerView === 'number') return slidesPerView;
    return slidesPerView.desktop;
  };

  const visibleSlides = getVisibleSlides();
  const maxIndex = Math.max(0, slideCount - visibleSlides);

  // Navigation
  const goToSlide = useCallback((index: number) => {
    let newIndex = index;
    if (loop) {
      if (index < 0) newIndex = maxIndex;
      else if (index > maxIndex) newIndex = 0;
    } else {
      newIndex = Math.max(0, Math.min(maxIndex, index));
    }
    setCurrentIndex(newIndex);
  }, [loop, maxIndex]);

  const goNext = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const goPrev = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  // Autoplay
  useEffect(() => {
    if (autoplay && !isDragging) {
      autoplayRef.current = setInterval(goNext, autoplayInterval);
    }
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay, autoplayInterval, goNext, isDragging]);

  // Touch/Mouse handlers
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const diff = clientX - startX;
    setTranslateX(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (Math.abs(translateX) > 50) {
      if (translateX > 0) {
        goPrev();
      } else {
        goNext();
      }
    }
    setTranslateX(0);
  };

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
  };

  const trackStyle: React.CSSProperties = {
    display: 'flex',
    gap: `${gap}px`,
    transform: `translateX(calc(-${currentIndex * (100 / visibleSlides)}% - ${currentIndex * gap}px + ${translateX}px))`,
    transition: isDragging ? 'none' : `transform ${theme.transitions.normal} ${theme.transitions.easing}`,
    cursor: isDragging ? 'grabbing' : 'grab',
  };

  const slideStyle: React.CSSProperties = {
    flexShrink: 0,
    width: `calc((100% - ${(visibleSlides - 1) * gap}px) / ${visibleSlides})`,
  };

  const arrowStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '40px',
    height: '40px',
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.background,
    border: `1px solid ${theme.colors.border}`,
    boxShadow: theme.shadows.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 10,
    transition: `all ${theme.transitions.fast} ${theme.transitions.easing}`,
  };

  const canGoPrev = loop || currentIndex > 0;
  const canGoNext = loop || currentIndex < maxIndex;

  return (
    <div style={containerStyle} className={className}>
      {/* Track */}
      <div
        ref={containerRef}
        style={trackStyle}
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
      >
        {React.Children.map(children, (child, index) => (
          <div key={index} style={slideStyle}>
            {child}
          </div>
        ))}
      </div>

      {/* Arrows */}
      {showArrows && slideCount > visibleSlides && (
        <>
          <button
            type="button"
            onClick={goPrev}
            style={{
              ...arrowStyle,
              left: theme.spacing.sm,
              opacity: canGoPrev ? 1 : 0.5,
              cursor: canGoPrev ? 'pointer' : 'not-allowed',
            }}
            disabled={!canGoPrev}
            aria-label="Previous slide"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={theme.colors.foreground}
              strokeWidth="2"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            type="button"
            onClick={goNext}
            style={{
              ...arrowStyle,
              right: theme.spacing.sm,
              opacity: canGoNext ? 1 : 0.5,
              cursor: canGoNext ? 'pointer' : 'not-allowed',
            }}
            disabled={!canGoNext}
            aria-label="Next slide"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={theme.colors.foreground}
              strokeWidth="2"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && slideCount > visibleSlides && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: theme.spacing.xs,
            marginTop: theme.spacing.md,
          }}
        >
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: theme.borderRadius.full,
                border: 'none',
                backgroundColor: index === currentIndex ? theme.colors.foreground : theme.colors.border,
                cursor: 'pointer',
                transition: `background-color ${theme.transitions.fast} ${theme.transitions.easing}`,
              }}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CarouselBlock;
