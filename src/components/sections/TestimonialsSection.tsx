// =============================================================================
// Testimonials Section (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme, SectionStyles } from '../../themes';
import { ContainerBlock } from '../blocks/ContainerBlock';
import { HeadingBlock } from '../blocks/HeadingBlock';
import { TextBlock } from '../blocks/TextBlock';
import { CarouselBlock } from '../blocks/CarouselBlock';
import { RatingBlock } from '../blocks/RatingBlock';

// =============================================================================
// Types
// =============================================================================

export interface Testimonial {
  id: string;
  content: string;
  author: string;
  title?: string;
  avatar?: string;
  rating?: number;
}

export interface TestimonialsSectionProps {
  title?: string;
  description?: string;
  testimonials: Testimonial[];
  layout?: 'grid' | 'carousel';
  columns?: number;
  showRating?: boolean;
  showAvatar?: boolean;
  backgroundColor?: string;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const TestimonialsSectionSchema = {
  name: 'Testimonials',
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
      default: 'What our customers say',
    },
    {
      id: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      type: 'header',
      content: 'Layout',
    },
    {
      id: 'layout',
      type: 'select',
      label: 'Layout',
      options: [
        { value: 'grid', label: 'Grid' },
        { value: 'carousel', label: 'Carousel' },
      ],
      default: 'carousel',
    },
    {
      id: 'columns',
      type: 'range',
      label: 'Columns',
      min: 1,
      max: 4,
      step: 1,
      default: 3,
    },
    {
      type: 'header',
      content: 'Options',
    },
    {
      id: 'showRating',
      type: 'checkbox',
      label: 'Show rating',
      default: true,
    },
    {
      id: 'showAvatar',
      type: 'checkbox',
      label: 'Show avatar',
      default: true,
    },
    {
      id: 'backgroundColor',
      type: 'color',
      label: 'Background color',
    },
  ],
  blocks: [
    {
      type: 'testimonial',
      name: 'Testimonial',
      settings: [
        {
          id: 'content',
          type: 'textarea',
          label: 'Content',
        },
        {
          id: 'author',
          type: 'text',
          label: 'Author name',
        },
        {
          id: 'title',
          type: 'text',
          label: 'Author title',
        },
        {
          id: 'avatar',
          type: 'image_picker',
          label: 'Avatar',
        },
        {
          id: 'rating',
          type: 'range',
          label: 'Rating',
          min: 1,
          max: 5,
          step: 1,
          default: 5,
        },
      ],
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function TestimonialsSection({
  title = 'What our customers say',
  description,
  testimonials,
  layout = 'carousel',
  columns = 3,
  showRating = true,
  showAvatar = true,
  backgroundColor,
  className,
}: TestimonialsSectionProps) {
  const theme = TanqoryTheme;
  const sectionStyles = SectionStyles(theme);

  const sectionStyle: React.CSSProperties = {
    ...sectionStyles.base,
    backgroundColor: backgroundColor || theme.colors.backgroundSecondary,
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: theme.spacing['2xl'],
    gap: theme.spacing.sm,
  };

  const testimonialCards = testimonials.map((testimonial) => (
    <TestimonialCard
      key={testimonial.id}
      testimonial={testimonial}
      showRating={showRating}
      showAvatar={showAvatar}
    />
  ));

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

        {/* Testimonials */}
        {layout === 'carousel' ? (
          <CarouselBlock
            slidesPerView={columns}
            gap={24}
            showArrows
            showDots
          >
            {testimonialCards}
          </CarouselBlock>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
              gap: theme.spacing.lg,
            }}
          >
            {testimonialCards}
          </div>
        )}
      </ContainerBlock>
    </section>
  );
}

// =============================================================================
// Testimonial Card Component
// =============================================================================

interface TestimonialCardProps {
  testimonial: Testimonial;
  showRating: boolean;
  showAvatar: boolean;
}

function TestimonialCard({ testimonial, showRating, showAvatar }: TestimonialCardProps) {
  const theme = TanqoryTheme;

  const cardStyle: React.CSSProperties = {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
    height: '100%',
  };

  return (
    <div style={cardStyle}>
      {/* Rating */}
      {showRating && testimonial.rating && (
        <RatingBlock value={testimonial.rating} max={5} size={16} />
      )}

      {/* Content */}
      <p
        style={{
          fontSize: theme.typography.fontSize.base,
          color: theme.colors.foreground,
          lineHeight: theme.typography.lineHeight.relaxed,
          margin: 0,
          flex: 1,
        }}
      >
        "{testimonial.content}"
      </p>

      {/* Author */}
      <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
        {showAvatar && (
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: theme.borderRadius.full,
              overflow: 'hidden',
              backgroundColor: theme.colors.backgroundSecondary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {testimonial.avatar ? (
              <img
                src={testimonial.avatar}
                alt={testimonial.author}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <span
                style={{
                  fontSize: theme.typography.fontSize.base,
                  fontWeight: theme.typography.fontWeight.medium,
                  color: theme.colors.foreground,
                }}
              >
                {testimonial.author.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        )}

        <div>
          <p
            style={{
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.medium,
              color: theme.colors.foreground,
              margin: 0,
            }}
          >
            {testimonial.author}
          </p>
          {testimonial.title && (
            <p
              style={{
                fontSize: theme.typography.fontSize.xs,
                color: theme.colors.foregroundMuted,
                margin: 0,
              }}
            >
              {testimonial.title}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TestimonialsSection;
