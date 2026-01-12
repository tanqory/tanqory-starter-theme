// =============================================================================
// Comparison Section (Draftbit pattern)
// =============================================================================

import React, { useState, useRef } from 'react';
import { TanqoryTheme, SectionStyles } from '../../themes';
import { ContainerBlock } from '../blocks/ContainerBlock';
import { HeadingBlock } from '../blocks/HeadingBlock';
import { TextBlock } from '../blocks/TextBlock';

// =============================================================================
// Types
// =============================================================================

export interface ComparisonSectionProps {
  title?: string;
  description?: string;
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  orientation?: 'horizontal' | 'vertical';
  initialPosition?: number;
  aspectRatio?: '16:9' | '4:3' | '1:1' | 'auto';
  backgroundColor?: string;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const ComparisonSectionSchema = {
  name: 'Image Comparison',
  tag: 'section',
  settings: [
    {
      type: 'header',
      content: 'Content',
    },
    {
      id: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      id: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      type: 'header',
      content: 'Images',
    },
    {
      id: 'beforeImage',
      type: 'image_picker',
      label: 'Before image',
    },
    {
      id: 'afterImage',
      type: 'image_picker',
      label: 'After image',
    },
    {
      id: 'beforeLabel',
      type: 'text',
      label: 'Before label',
      default: 'Before',
    },
    {
      id: 'afterLabel',
      type: 'text',
      label: 'After label',
      default: 'After',
    },
    {
      type: 'header',
      content: 'Layout',
    },
    {
      id: 'orientation',
      type: 'select',
      label: 'Orientation',
      options: [
        { value: 'horizontal', label: 'Horizontal' },
        { value: 'vertical', label: 'Vertical' },
      ],
      default: 'horizontal',
    },
    {
      id: 'initialPosition',
      type: 'range',
      label: 'Initial position',
      min: 0,
      max: 100,
      step: 1,
      unit: '%',
      default: 50,
    },
    {
      id: 'aspectRatio',
      type: 'select',
      label: 'Aspect ratio',
      options: [
        { value: '16:9', label: '16:9' },
        { value: '4:3', label: '4:3' },
        { value: '1:1', label: '1:1' },
        { value: 'auto', label: 'Auto' },
      ],
      default: '16:9',
    },
    {
      id: 'backgroundColor',
      type: 'color',
      label: 'Background color',
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function ComparisonSection({
  title,
  description,
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  orientation = 'horizontal',
  initialPosition = 50,
  aspectRatio = '16:9',
  backgroundColor,
  className,
}: ComparisonSectionProps) {
  const theme = TanqoryTheme;
  const sectionStyles = SectionStyles(theme);
  const [position, setPosition] = useState(initialPosition);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const sectionStyle: React.CSSProperties = {
    ...sectionStyles.base,
    backgroundColor: backgroundColor || theme.colors.background,
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: theme.spacing['2xl'],
    gap: theme.spacing.sm,
  };

  // Aspect ratio mappings
  const ratioMap: Record<string, string> = {
    '16:9': '56.25%',
    '4:3': '75%',
    '1:1': '100%',
    auto: 'auto',
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!containerRef.current || !isDragging.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    if (orientation === 'horizontal') {
      const x = clientX - rect.left;
      const newPosition = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setPosition(newPosition);
    } else {
      const y = clientY - rect.top;
      const newPosition = Math.max(0, Math.min(100, (y / rect.height) * 100));
      setPosition(newPosition);
    }
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const comparisonContainerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    maxWidth: '1000px',
    margin: '0 auto',
    paddingTop: aspectRatio === 'auto' ? undefined : ratioMap[aspectRatio],
    overflow: 'hidden',
    borderRadius: theme.borderRadius.lg,
    cursor: 'ew-resize',
    userSelect: 'none',
  };

  const imageStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const sliderStyle: React.CSSProperties = {
    position: 'absolute',
    ...(orientation === 'horizontal'
      ? {
          top: 0,
          bottom: 0,
          left: `${position}%`,
          width: '4px',
          transform: 'translateX(-50%)',
        }
      : {
          left: 0,
          right: 0,
          top: `${position}%`,
          height: '4px',
          transform: 'translateY(-50%)',
        }),
    backgroundColor: 'white',
    zIndex: 10,
    boxShadow: '0 0 10px rgba(0,0,0,0.3)',
  };

  const handleStyle: React.CSSProperties = {
    position: 'absolute',
    ...(orientation === 'horizontal'
      ? {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }
      : {
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }),
    width: '48px',
    height: '48px',
    borderRadius: theme.borderRadius.full,
    backgroundColor: 'white',
    boxShadow: theme.shadows.lg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: orientation === 'horizontal' ? 'ew-resize' : 'ns-resize',
  };

  const labelStyle = (side: 'before' | 'after'): React.CSSProperties => ({
    position: 'absolute',
    ...(orientation === 'horizontal'
      ? {
          bottom: theme.spacing.md,
          [side === 'before' ? 'left' : 'right']: theme.spacing.md,
        }
      : {
          [side === 'before' ? 'top' : 'bottom']: theme.spacing.md,
          left: theme.spacing.md,
        }),
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    borderRadius: theme.borderRadius.sm,
    zIndex: 5,
  });

  return (
    <section style={sectionStyle} className={className}>
      <ContainerBlock>
        {/* Header */}
        {(title || description) && (
          <div style={headerStyle}>
            {title && <HeadingBlock text={title} level="h2" alignment="center" />}
            {description && (
              <TextBlock
                text={description}
                preset="body"
                alignment="center"
                maxWidth="60"
              />
            )}
          </div>
        )}

        {/* Comparison Slider */}
        <div
          ref={containerRef}
          style={comparisonContainerStyle}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          onTouchMove={handleTouchMove}
        >
          {/* After Image (Background) */}
          <img src={afterImage} alt={afterLabel} style={imageStyle} />

          {/* Before Image (Clipped) */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              ...(orientation === 'horizontal'
                ? { clipPath: `inset(0 ${100 - position}% 0 0)` }
                : { clipPath: `inset(0 0 ${100 - position}% 0)` }),
            }}
          >
            <img src={beforeImage} alt={beforeLabel} style={imageStyle} />
          </div>

          {/* Slider Line */}
          <div style={sliderStyle}>
            <div style={handleStyle}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke={theme.colors.foreground}
                strokeWidth="2"
              >
                {orientation === 'horizontal' ? (
                  <>
                    <polyline points="15 18 9 12 15 6" />
                    <polyline points="9 18 15 12 9 6" transform="translate(6, 0)" />
                  </>
                ) : (
                  <>
                    <polyline points="18 15 12 9 6 15" />
                    <polyline points="18 9 12 15 6 9" transform="translate(0, 6)" />
                  </>
                )}
              </svg>
            </div>
          </div>

          {/* Labels */}
          {beforeLabel && <div style={labelStyle('before')}>{beforeLabel}</div>}
          {afterLabel && <div style={labelStyle('after')}>{afterLabel}</div>}
        </div>
      </ContainerBlock>
    </section>
  );
}

export default ComparisonSection;
