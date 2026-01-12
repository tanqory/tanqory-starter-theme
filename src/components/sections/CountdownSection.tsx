// =============================================================================
// Countdown Section (Draftbit pattern)
// =============================================================================

import React, { useState, useEffect } from 'react';
import { TanqoryTheme, SectionStyles } from '../../themes';
import { ContainerBlock } from '../blocks/ContainerBlock';
import { HeadingBlock } from '../blocks/HeadingBlock';
import { TextBlock } from '../blocks/TextBlock';
import { ButtonBlock } from '../blocks/ButtonBlock';

// =============================================================================
// Types
// =============================================================================

export interface CountdownSectionProps {
  title?: string;
  description?: string;
  endDate: string; // ISO date string
  expiredMessage?: string;
  showDays?: boolean;
  showHours?: boolean;
  showMinutes?: boolean;
  showSeconds?: boolean;
  style?: 'default' | 'compact' | 'card';
  button?: {
    label: string;
    link: string;
  };
  backgroundColor?: string;
  backgroundImage?: string;
  textColor?: 'light' | 'dark';
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const CountdownSectionSchema = {
  name: 'Countdown',
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
      default: 'Sale Ends In',
    },
    {
      id: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      id: 'endDate',
      type: 'datetime',
      label: 'End date',
    },
    {
      id: 'expiredMessage',
      type: 'text',
      label: 'Expired message',
      default: 'This offer has ended',
    },
    {
      type: 'header',
      content: 'Display',
    },
    {
      id: 'showDays',
      type: 'checkbox',
      label: 'Show days',
      default: true,
    },
    {
      id: 'showHours',
      type: 'checkbox',
      label: 'Show hours',
      default: true,
    },
    {
      id: 'showMinutes',
      type: 'checkbox',
      label: 'Show minutes',
      default: true,
    },
    {
      id: 'showSeconds',
      type: 'checkbox',
      label: 'Show seconds',
      default: true,
    },
    {
      id: 'style',
      type: 'select',
      label: 'Style',
      options: [
        { value: 'default', label: 'Default' },
        { value: 'compact', label: 'Compact' },
        { value: 'card', label: 'Card' },
      ],
      default: 'default',
    },
    {
      type: 'header',
      content: 'Button',
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
};

// =============================================================================
// Component
// =============================================================================

function calculateTimeLeft(endDate: string): TimeLeft {
  const difference = new Date(endDate).getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isExpired: false,
  };
}

export function CountdownSection({
  title = 'Sale Ends In',
  description,
  endDate,
  expiredMessage = 'This offer has ended',
  showDays = true,
  showHours = true,
  showMinutes = true,
  showSeconds = true,
  style = 'default',
  button,
  backgroundColor,
  backgroundImage,
  textColor = 'dark',
  className,
}: CountdownSectionProps) {
  const theme = TanqoryTheme;
  const sectionStyles = SectionStyles(theme);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(endDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(endDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  const isLight = textColor === 'light';

  const sectionStyle: React.CSSProperties = {
    ...sectionStyles.base,
    position: 'relative',
    backgroundColor: backgroundColor || theme.colors.background,
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }
    : {};

  const contentStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: theme.spacing.lg,
  };

  const headingColor = isLight ? theme.colors.secondary : theme.colors.foreground;
  const textColorValue = isLight ? 'rgba(255,255,255,0.9)' : theme.colors.foregroundSecondary;

  if (timeLeft.isExpired) {
    return (
      <section style={sectionStyle} className={className}>
        {backgroundImage && <div style={overlayStyle} />}
        <ContainerBlock>
          <div style={contentStyle}>
            <HeadingBlock text={expiredMessage} level="h2" alignment="center" color={headingColor} />
          </div>
        </ContainerBlock>
      </section>
    );
  }

  return (
    <section style={sectionStyle} className={className}>
      {backgroundImage && <div style={overlayStyle} />}
      <ContainerBlock>
        <div style={contentStyle}>
          {title && <HeadingBlock text={title} level="h2" alignment="center" color={headingColor} />}
          {description && (
            <TextBlock text={description} preset="body" alignment="center" color={textColorValue} />
          )}

          {/* Countdown Display */}
          <CountdownDisplay
            timeLeft={timeLeft}
            showDays={showDays}
            showHours={showHours}
            showMinutes={showMinutes}
            showSeconds={showSeconds}
            style={style}
            isLight={isLight}
          />

          {button && (
            <ButtonBlock label={button.label} link={button.link} style="primary" />
          )}
        </div>
      </ContainerBlock>
    </section>
  );
}

// =============================================================================
// Countdown Display Component
// =============================================================================

interface CountdownDisplayProps {
  timeLeft: TimeLeft;
  showDays: boolean;
  showHours: boolean;
  showMinutes: boolean;
  showSeconds: boolean;
  style: 'default' | 'compact' | 'card';
  isLight: boolean;
}

function CountdownDisplay({
  timeLeft,
  showDays,
  showHours,
  showMinutes,
  showSeconds,
  style,
  isLight,
}: CountdownDisplayProps) {
  const theme = TanqoryTheme;

  const units: { label: string; value: number; show: boolean }[] = [
    { label: 'Days', value: timeLeft.days, show: showDays },
    { label: 'Hours', value: timeLeft.hours, show: showHours },
    { label: 'Minutes', value: timeLeft.minutes, show: showMinutes },
    { label: 'Seconds', value: timeLeft.seconds, show: showSeconds },
  ].filter((unit) => unit.show);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    gap: style === 'compact' ? theme.spacing.md : theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  };

  if (style === 'card') {
    return (
      <div style={containerStyle}>
        {units.map((unit, index) => (
          <React.Fragment key={unit.label}>
            <div
              style={{
                backgroundColor: isLight ? 'rgba(255,255,255,0.2)' : theme.colors.backgroundSecondary,
                borderRadius: theme.borderRadius.lg,
                padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
                minWidth: '100px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: theme.typography.fontSize['4xl'],
                  fontWeight: theme.typography.fontWeight.bold,
                  color: isLight ? 'white' : theme.colors.foreground,
                  lineHeight: 1,
                }}
              >
                {String(unit.value).padStart(2, '0')}
              </div>
              <div
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: isLight ? 'rgba(255,255,255,0.8)' : theme.colors.foregroundMuted,
                  marginTop: theme.spacing.xs,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                {unit.label}
              </div>
            </div>
            {index < units.length - 1 && (
              <span
                style={{
                  fontSize: theme.typography.fontSize['3xl'],
                  fontWeight: theme.typography.fontWeight.bold,
                  color: isLight ? 'white' : theme.colors.foreground,
                }}
              >
                :
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }

  if (style === 'compact') {
    return (
      <div style={containerStyle}>
        {units.map((unit, index) => (
          <React.Fragment key={unit.label}>
            <span
              style={{
                fontSize: theme.typography.fontSize['2xl'],
                fontWeight: theme.typography.fontWeight.bold,
                color: isLight ? 'white' : theme.colors.foreground,
              }}
            >
              {String(unit.value).padStart(2, '0')}
            </span>
            {index < units.length - 1 && (
              <span
                style={{
                  fontSize: theme.typography.fontSize['2xl'],
                  fontWeight: theme.typography.fontWeight.bold,
                  color: isLight ? 'rgba(255,255,255,0.6)' : theme.colors.foregroundMuted,
                }}
              >
                :
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }

  // Default style
  return (
    <div style={containerStyle}>
      {units.map((unit) => (
        <div key={unit.label} style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: theme.typography.fontSize['5xl'],
              fontWeight: theme.typography.fontWeight.bold,
              color: isLight ? 'white' : theme.colors.foreground,
              lineHeight: 1,
            }}
          >
            {String(unit.value).padStart(2, '0')}
          </div>
          <div
            style={{
              fontSize: theme.typography.fontSize.sm,
              color: isLight ? 'rgba(255,255,255,0.8)' : theme.colors.foregroundMuted,
              marginTop: theme.spacing.xs,
            }}
          >
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CountdownSection;
