// =============================================================================
// Stats Section (Draftbit pattern)
// =============================================================================

import React, { useState, useEffect, useRef } from 'react';
import { TanqoryTheme, SectionStyles } from '../../themes';
import { ContainerBlock } from '../blocks/ContainerBlock';
import { HeadingBlock } from '../blocks/HeadingBlock';
import { TextBlock } from '../blocks/TextBlock';

// =============================================================================
// Types
// =============================================================================

export interface Stat {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  description?: string;
}

export interface StatsSectionProps {
  title?: string;
  description?: string;
  stats: Stat[];
  columns?: 2 | 3 | 4;
  animate?: boolean;
  animationDuration?: number;
  backgroundColor?: string;
  backgroundImage?: string;
  textColor?: 'light' | 'dark';
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const StatsSectionSchema = {
  name: 'Stats',
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
      id: 'columns',
      type: 'range',
      label: 'Columns',
      min: 2,
      max: 4,
      step: 1,
      default: 4,
    },
    {
      type: 'header',
      content: 'Animation',
    },
    {
      id: 'animate',
      type: 'checkbox',
      label: 'Animate numbers',
      default: true,
    },
    {
      id: 'animationDuration',
      type: 'range',
      label: 'Animation duration',
      min: 500,
      max: 3000,
      step: 100,
      unit: 'ms',
      default: 2000,
    },
    {
      type: 'header',
      content: 'Background',
    },
    {
      id: 'backgroundColor',
      type: 'color',
      label: 'Background color',
    },
    {
      id: 'backgroundImage',
      type: 'image_picker',
      label: 'Background image',
    },
    {
      id: 'textColor',
      type: 'select',
      label: 'Text color',
      options: [
        { value: 'dark', label: 'Dark' },
        { value: 'light', label: 'Light' },
      ],
      default: 'dark',
    },
  ],
  blocks: [
    {
      type: 'stat',
      name: 'Stat',
      settings: [
        {
          id: 'value',
          type: 'number',
          label: 'Value',
        },
        {
          id: 'prefix',
          type: 'text',
          label: 'Prefix (e.g., $)',
        },
        {
          id: 'suffix',
          type: 'text',
          label: 'Suffix (e.g., +, %, K)',
        },
        {
          id: 'label',
          type: 'text',
          label: 'Label',
        },
        {
          id: 'description',
          type: 'text',
          label: 'Description',
        },
      ],
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function StatsSection({
  title,
  description,
  stats,
  columns = 4,
  animate = true,
  animationDuration = 2000,
  backgroundColor,
  backgroundImage,
  textColor = 'dark',
  className,
}: StatsSectionProps) {
  const theme = TanqoryTheme;
  const sectionStyles = SectionStyles(theme);
  const isLight = textColor === 'light';

  const sectionStyle: React.CSSProperties = {
    ...sectionStyles.base,
    position: 'relative',
    backgroundColor: backgroundColor || theme.colors.primary,
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const overlayStyle: React.CSSProperties = backgroundImage
    ? {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
      }
    : {};

  const contentStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 1,
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: theme.spacing['2xl'],
    gap: theme.spacing.sm,
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: theme.spacing.xl,
  };

  const headingColor = isLight ? 'white' : theme.colors.secondary;
  const textColorValue = isLight ? 'rgba(255,255,255,0.9)' : theme.colors.foregroundSecondary;

  return (
    <section style={sectionStyle} className={className}>
      {backgroundImage && <div style={overlayStyle} />}

      <ContainerBlock>
        <div style={contentStyle}>
          {/* Header */}
          {(title || description) && (
            <div style={headerStyle}>
              {title && <HeadingBlock text={title} level="h2" alignment="center" color={headingColor} />}
              {description && (
                <TextBlock
                  text={description}
                  preset="body"
                  alignment="center"
                  color={textColorValue}
                  maxWidth="60"
                />
              )}
            </div>
          )}

          {/* Stats Grid */}
          <div style={gridStyle} className="stats-grid">
            {stats.map((stat) => (
              <StatItem
                key={stat.id}
                stat={stat}
                animate={animate}
                animationDuration={animationDuration}
                isLight={isLight}
              />
            ))}
          </div>
        </div>
      </ContainerBlock>

      {/* Responsive styles */}
      <style>
        {`
          @media (max-width: ${theme.breakpoints.md}) {
            .stats-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
          @media (max-width: ${theme.breakpoints.sm}) {
            .stats-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </section>
  );
}

// =============================================================================
// Stat Item Component
// =============================================================================

interface StatItemProps {
  stat: Stat;
  animate: boolean;
  animationDuration: number;
  isLight: boolean;
}

function StatItem({ stat, animate, animationDuration, isLight }: StatItemProps) {
  const theme = TanqoryTheme;
  const [displayValue, setDisplayValue] = useState(animate ? 0 : stat.value);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animate || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);

          const startTime = Date.now();
          const startValue = 0;
          const endValue = stat.value;

          const animateValue = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / animationDuration, 1);

            // Easing function (easeOutQuart)
            const eased = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.round(startValue + (endValue - startValue) * eased);

            setDisplayValue(currentValue);

            if (progress < 1) {
              requestAnimationFrame(animateValue);
            }
          };

          requestAnimationFrame(animateValue);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [animate, animationDuration, hasAnimated, stat.value]);

  const itemStyle: React.CSSProperties = {
    textAlign: 'center',
  };

  const valueStyle: React.CSSProperties = {
    fontSize: theme.typography.fontSize['5xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: isLight ? 'white' : theme.colors.foreground,
    lineHeight: 1,
    marginBottom: theme.spacing.sm,
  };

  const labelStyle: React.CSSProperties = {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.medium,
    color: isLight ? 'rgba(255,255,255,0.9)' : theme.colors.foreground,
    marginBottom: stat.description ? theme.spacing.xs : 0,
  };

  const descStyle: React.CSSProperties = {
    fontSize: theme.typography.fontSize.sm,
    color: isLight ? 'rgba(255,255,255,0.7)' : theme.colors.foregroundMuted,
  };

  // Format number with commas
  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  return (
    <div ref={ref} style={itemStyle}>
      <div style={valueStyle}>
        {stat.prefix}
        {formatNumber(displayValue)}
        {stat.suffix}
      </div>
      <div style={labelStyle}>{stat.label}</div>
      {stat.description && <div style={descStyle}>{stat.description}</div>}
    </div>
  );
}

export default StatsSection;
