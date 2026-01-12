// =============================================================================
// Custom HTML Section (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme, SectionStyles } from '../../themes';
import { ContainerBlock } from '../blocks/ContainerBlock';

// =============================================================================
// Types
// =============================================================================

export interface CustomHTMLSectionProps {
  html: string;
  fullWidth?: boolean;
  backgroundColor?: string;
  maxWidth?: 'narrow' | 'medium' | 'wide' | 'full';
  padding?: 'none' | 'small' | 'medium' | 'large';
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const CustomHTMLSectionSchema = {
  name: 'Custom HTML',
  tag: 'section',
  settings: [
    {
      type: 'header',
      content: 'Content',
    },
    {
      id: 'html',
      type: 'html',
      label: 'Custom HTML',
      default: '<div>Your custom HTML here</div>',
    },
    {
      type: 'header',
      content: 'Layout',
    },
    {
      id: 'fullWidth',
      type: 'checkbox',
      label: 'Full width',
      default: false,
    },
    {
      id: 'maxWidth',
      type: 'select',
      label: 'Max width',
      options: [
        { value: 'narrow', label: 'Narrow (600px)' },
        { value: 'medium', label: 'Medium (900px)' },
        { value: 'wide', label: 'Wide (1200px)' },
        { value: 'full', label: 'Full' },
      ],
      default: 'wide',
    },
    {
      id: 'padding',
      type: 'select',
      label: 'Padding',
      options: [
        { value: 'none', label: 'None' },
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large', label: 'Large' },
      ],
      default: 'medium',
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

export function CustomHTMLSection({
  html,
  fullWidth = false,
  backgroundColor,
  maxWidth = 'wide',
  padding = 'medium',
  className,
}: CustomHTMLSectionProps) {
  const theme = TanqoryTheme;
  const sectionStyles = SectionStyles(theme);

  // Padding mappings
  const paddingMap: Record<string, string> = {
    none: '0',
    small: theme.spacing.md,
    medium: theme.spacing.xl,
    large: theme.spacing['3xl'],
  };

  // Max width mappings
  const maxWidthMap: Record<string, string> = {
    narrow: '600px',
    medium: '900px',
    wide: '1200px',
    full: '100%',
  };

  const sectionStyle: React.CSSProperties = {
    ...sectionStyles.base,
    backgroundColor: backgroundColor || theme.colors.background,
    padding: `${paddingMap[padding]} 0`,
  };

  const contentStyle: React.CSSProperties = {
    maxWidth: maxWidthMap[maxWidth],
    margin: '0 auto',
  };

  // Sanitize HTML (basic - for production, use a proper sanitizer like DOMPurify)
  const createMarkup = () => {
    return { __html: html };
  };

  return (
    <section style={sectionStyle} className={className}>
      {fullWidth ? (
        <div
          style={contentStyle}
          dangerouslySetInnerHTML={createMarkup()}
        />
      ) : (
        <ContainerBlock>
          <div
            style={contentStyle}
            dangerouslySetInnerHTML={createMarkup()}
          />
        </ContainerBlock>
      )}
    </section>
  );
}

export default CustomHTMLSection;
