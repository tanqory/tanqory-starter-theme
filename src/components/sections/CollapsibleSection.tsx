// =============================================================================
// Collapsible Section (Draftbit pattern)
// =============================================================================

import React, { useState } from 'react';
import { TanqoryTheme, SectionStyles } from '../../themes';
import { ContainerBlock } from '../blocks/ContainerBlock';
import { HeadingBlock } from '../blocks/HeadingBlock';

// =============================================================================
// Types
// =============================================================================

export interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  icon?: 'chevron' | 'plus';
  headerSize?: 'h2' | 'h3' | 'h4';
  backgroundColor?: string;
  bordered?: boolean;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const CollapsibleSectionSchema = {
  name: 'Collapsible Section',
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
      type: 'header',
      content: 'Options',
    },
    {
      id: 'defaultOpen',
      type: 'checkbox',
      label: 'Open by default',
      default: false,
    },
    {
      id: 'icon',
      type: 'select',
      label: 'Icon',
      options: [
        { value: 'chevron', label: 'Chevron' },
        { value: 'plus', label: 'Plus/Minus' },
      ],
      default: 'chevron',
    },
    {
      id: 'headerSize',
      type: 'select',
      label: 'Header size',
      options: [
        { value: 'h2', label: 'Large (H2)' },
        { value: 'h3', label: 'Medium (H3)' },
        { value: 'h4', label: 'Small (H4)' },
      ],
      default: 'h3',
    },
    {
      id: 'bordered',
      type: 'checkbox',
      label: 'Show border',
      default: true,
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

export function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
  icon = 'chevron',
  headerSize = 'h3',
  backgroundColor,
  bordered = true,
  className,
}: CollapsibleSectionProps) {
  const theme = TanqoryTheme;
  const sectionStyles = SectionStyles(theme);
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const sectionStyle: React.CSSProperties = {
    ...sectionStyles.base,
    backgroundColor: backgroundColor || theme.colors.background,
    padding: theme.spacing.xl,
  };

  const wrapperStyle: React.CSSProperties = {
    border: bordered ? `1px solid ${theme.colors.border}` : 'none',
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.lg,
    cursor: 'pointer',
    backgroundColor: theme.colors.backgroundSecondary,
    transition: `background-color ${theme.transitions.fast} ${theme.transitions.easing}`,
  };

  const iconStyle: React.CSSProperties = {
    width: '24px',
    height: '24px',
    transition: `transform ${theme.transitions.fast} ${theme.transitions.easing}`,
    transform: icon === 'chevron' ? (isOpen ? 'rotate(180deg)' : 'rotate(0deg)') : 'none',
  };

  const contentStyle: React.CSSProperties = {
    padding: theme.spacing.lg,
    display: isOpen ? 'block' : 'none',
    borderTop: bordered && isOpen ? `1px solid ${theme.colors.border}` : 'none',
  };

  const renderIcon = () => {
    if (icon === 'plus') {
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke={theme.colors.foreground}
          strokeWidth="2"
        >
          {isOpen ? (
            <line x1="5" y1="12" x2="19" y2="12" />
          ) : (
            <>
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </>
          )}
        </svg>
      );
    }

    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke={theme.colors.foreground}
        strokeWidth="2"
        style={iconStyle}
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    );
  };

  return (
    <section style={sectionStyle} className={className}>
      <ContainerBlock>
        <div style={wrapperStyle}>
          <div
            style={headerStyle}
            onClick={() => setIsOpen(!isOpen)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsOpen(!isOpen);
              }
            }}
            aria-expanded={isOpen}
          >
            <HeadingBlock text={title} level={headerSize} />
            {renderIcon()}
          </div>

          <div style={contentStyle}>{children}</div>
        </div>
      </ContainerBlock>
    </section>
  );
}

export default CollapsibleSection;
