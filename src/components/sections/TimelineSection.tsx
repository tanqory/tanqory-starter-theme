// =============================================================================
// Timeline Section (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme, SectionStyles } from '../../themes';
import { ContainerBlock } from '../blocks/ContainerBlock';
import { HeadingBlock } from '../blocks/HeadingBlock';
import { TextBlock } from '../blocks/TextBlock';

// =============================================================================
// Types
// =============================================================================

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description?: string;
  image?: string;
  icon?: React.ReactNode;
}

export interface TimelineSectionProps {
  title?: string;
  description?: string;
  events: TimelineEvent[];
  layout?: 'vertical' | 'alternating';
  showLine?: boolean;
  showDots?: boolean;
  backgroundColor?: string;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const TimelineSectionSchema = {
  name: 'Timeline',
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
      content: 'Layout',
    },
    {
      id: 'layout',
      type: 'select',
      label: 'Layout',
      options: [
        { value: 'vertical', label: 'Vertical (left-aligned)' },
        { value: 'alternating', label: 'Alternating' },
      ],
      default: 'alternating',
    },
    {
      id: 'showLine',
      type: 'checkbox',
      label: 'Show connecting line',
      default: true,
    },
    {
      id: 'showDots',
      type: 'checkbox',
      label: 'Show dots',
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
      type: 'event',
      name: 'Timeline Event',
      settings: [
        {
          id: 'date',
          type: 'text',
          label: 'Date',
        },
        {
          id: 'title',
          type: 'text',
          label: 'Title',
        },
        {
          id: 'description',
          type: 'richtext',
          label: 'Description',
        },
        {
          id: 'image',
          type: 'image_picker',
          label: 'Image',
        },
      ],
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function TimelineSection({
  title,
  description,
  events,
  layout = 'alternating',
  showLine = true,
  showDots = true,
  backgroundColor,
  className,
}: TimelineSectionProps) {
  const theme = TanqoryTheme;
  const sectionStyles = SectionStyles(theme);

  const sectionStyle: React.CSSProperties = {
    ...sectionStyles.base,
    backgroundColor: backgroundColor || theme.colors.background,
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: theme.spacing['3xl'],
    gap: theme.spacing.sm,
  };

  const timelineContainerStyle: React.CSSProperties = {
    position: 'relative',
    maxWidth: layout === 'alternating' ? '900px' : '600px',
    margin: '0 auto',
    paddingLeft: layout === 'vertical' ? theme.spacing['2xl'] : 0,
  };

  // Vertical line style
  const lineStyle: React.CSSProperties = showLine
    ? {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '2px',
        backgroundColor: theme.colors.border,
        ...(layout === 'alternating'
          ? { left: '50%', transform: 'translateX(-50%)' }
          : { left: 0 }),
      }
    : {};

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

        {/* Timeline */}
        <div style={timelineContainerStyle}>
          {showLine && <div style={lineStyle} />}

          {events.map((event, index) => (
            <TimelineEventItem
              key={event.id}
              event={event}
              index={index}
              layout={layout}
              showDots={showDots}
              isLast={index === events.length - 1}
            />
          ))}
        </div>

        {/* Responsive styles */}
        <style>
          {`
            @media (max-width: ${theme.breakpoints.md}) {
              .timeline-item {
                flex-direction: column !important;
                text-align: left !important;
              }
              .timeline-content {
                padding-left: ${theme.spacing['2xl']} !important;
                padding-right: 0 !important;
              }
              .timeline-dot {
                left: 0 !important;
                right: auto !important;
                transform: translateX(-50%) !important;
              }
            }
          `}
        </style>
      </ContainerBlock>
    </section>
  );
}

// =============================================================================
// Timeline Event Item Component
// =============================================================================

interface TimelineEventItemProps {
  event: TimelineEvent;
  index: number;
  layout: 'vertical' | 'alternating';
  showDots: boolean;
  isLast: boolean;
}

function TimelineEventItem({ event, index, layout, showDots, isLast }: TimelineEventItemProps) {
  const theme = TanqoryTheme;
  const isEven = index % 2 === 0;
  const isAlternating = layout === 'alternating';

  const itemStyle: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    justifyContent: isAlternating ? (isEven ? 'flex-end' : 'flex-start') : 'flex-start',
    marginBottom: isLast ? 0 : theme.spacing['2xl'],
  };

  const contentStyle: React.CSSProperties = {
    width: isAlternating ? 'calc(50% - 30px)' : '100%',
    paddingLeft: !isAlternating ? theme.spacing.xl : isEven ? 0 : theme.spacing.xl,
    paddingRight: isAlternating && isEven ? theme.spacing.xl : 0,
    textAlign: isAlternating && isEven ? 'right' : 'left',
  };

  const dotStyle: React.CSSProperties = showDots
    ? {
        position: 'absolute',
        top: theme.spacing.xs,
        ...(isAlternating
          ? { left: '50%', transform: 'translateX(-50%)' }
          : { left: 0, transform: 'translateX(-50%)' }),
        width: '16px',
        height: '16px',
        borderRadius: theme.borderRadius.full,
        backgroundColor: theme.colors.primary,
        border: `3px solid ${theme.colors.background}`,
        boxShadow: `0 0 0 2px ${theme.colors.primary}`,
        zIndex: 1,
      }
    : {};

  const cardStyle: React.CSSProperties = {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    boxShadow: theme.shadows.sm,
  };

  return (
    <div style={itemStyle} className="timeline-item">
      {/* Dot */}
      {showDots && <div style={dotStyle} className="timeline-dot" />}

      {/* Content */}
      <div style={contentStyle} className="timeline-content">
        <div style={cardStyle}>
          {/* Date */}
          <span
            style={{
              display: 'inline-block',
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.medium,
              color: theme.colors.primary,
              marginBottom: theme.spacing.xs,
            }}
          >
            {event.date}
          </span>

          {/* Title */}
          <h4
            style={{
              fontSize: theme.typography.fontSize.lg,
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.foreground,
              margin: 0,
              marginBottom: event.description ? theme.spacing.sm : 0,
            }}
          >
            {event.title}
          </h4>

          {/* Description */}
          {event.description && (
            <p
              style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.foregroundSecondary,
                lineHeight: theme.typography.lineHeight.relaxed,
                margin: 0,
              }}
            >
              {event.description}
            </p>
          )}

          {/* Image */}
          {event.image && (
            <img
              src={event.image}
              alt={event.title}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: theme.borderRadius.md,
                marginTop: theme.spacing.md,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default TimelineSection;
