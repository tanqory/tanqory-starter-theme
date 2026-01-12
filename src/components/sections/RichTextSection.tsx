// =============================================================================
// Rich Text Section (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme, SectionStyles } from '../../themes';
import { ContainerBlock } from '../blocks/ContainerBlock';
import { HeadingBlock } from '../blocks/HeadingBlock';

// =============================================================================
// Types
// =============================================================================

export interface RichTextSectionProps {
  title?: string;
  content?: string;
  alignment?: 'left' | 'center' | 'right';
  maxWidth?: 'narrow' | 'medium' | 'wide' | 'full';
  backgroundColor?: string;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const RichTextSectionSchema = {
  name: 'Rich Text',
  tag: 'section',
  settings: [
    {
      id: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      id: 'content',
      type: 'richtext',
      label: 'Content',
      default: '<p>Add your content here...</p>',
    },
    {
      id: 'alignment',
      type: 'text_alignment',
      label: 'Alignment',
      default: 'left',
    },
    {
      id: 'maxWidth',
      type: 'select',
      label: 'Max width',
      options: [
        { value: 'narrow', label: 'Narrow (600px)' },
        { value: 'medium', label: 'Medium (800px)' },
        { value: 'wide', label: 'Wide (1000px)' },
        { value: 'full', label: 'Full width' },
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

export function RichTextSection({
  title,
  content,
  alignment = 'left',
  maxWidth = 'medium',
  backgroundColor,
  className,
}: RichTextSectionProps) {
  const theme = TanqoryTheme;
  const sectionStyles = SectionStyles(theme);

  // Max width mappings
  const maxWidthMap: Record<string, string> = {
    narrow: '600px',
    medium: '800px',
    wide: '1000px',
    full: '100%',
  };

  const sectionStyle: React.CSSProperties = {
    ...sectionStyles.base,
    backgroundColor: backgroundColor || theme.colors.background,
  };

  const contentWrapperStyle: React.CSSProperties = {
    maxWidth: maxWidthMap[maxWidth],
    margin: alignment === 'center' ? '0 auto' : alignment === 'right' ? '0 0 0 auto' : '0',
    textAlign: alignment,
  };

  const proseStyle: React.CSSProperties = {
    color: theme.colors.foreground,
    fontSize: theme.typography.fontSize.base,
    lineHeight: theme.typography.lineHeight.relaxed,
  };

  return (
    <section style={sectionStyle} className={className}>
      <ContainerBlock>
        <div style={contentWrapperStyle}>
          {title && (
            <div style={{ marginBottom: theme.spacing.lg }}>
              <HeadingBlock text={title} level="h2" alignment={alignment} />
            </div>
          )}

          {content && (
            <div
              style={proseStyle}
              className="prose"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </div>
      </ContainerBlock>

      {/* Prose styles */}
      <style>
        {`
          .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
            font-weight: ${theme.typography.fontWeight.semibold};
            line-height: ${theme.typography.lineHeight.tight};
            margin-top: ${theme.spacing.lg};
            margin-bottom: ${theme.spacing.sm};
          }
          .prose h1 { font-size: ${theme.typography.fontSize['4xl']}; }
          .prose h2 { font-size: ${theme.typography.fontSize['3xl']}; }
          .prose h3 { font-size: ${theme.typography.fontSize['2xl']}; }
          .prose h4 { font-size: ${theme.typography.fontSize.xl}; }
          .prose h5 { font-size: ${theme.typography.fontSize.lg}; }
          .prose h6 { font-size: ${theme.typography.fontSize.base}; }
          .prose p {
            margin-bottom: ${theme.spacing.md};
          }
          .prose a {
            color: ${theme.colors.primary};
            text-decoration: underline;
            text-underline-offset: 4px;
          }
          .prose ul, .prose ol {
            margin-bottom: ${theme.spacing.md};
            padding-left: ${theme.spacing.lg};
          }
          .prose li {
            margin-bottom: ${theme.spacing.xs};
          }
          .prose blockquote {
            border-left: 4px solid ${theme.colors.border};
            padding-left: ${theme.spacing.md};
            margin: ${theme.spacing.lg} 0;
            font-style: italic;
            color: ${theme.colors.foregroundSecondary};
          }
          .prose img {
            max-width: 100%;
            height: auto;
            border-radius: ${theme.borderRadius.md};
            margin: ${theme.spacing.lg} 0;
          }
          .prose code {
            background: ${theme.colors.backgroundSecondary};
            padding: ${theme.spacing['2xs']} ${theme.spacing.xs};
            border-radius: ${theme.borderRadius.sm};
            font-family: ${theme.typography.fontFamily.mono};
            font-size: 0.875em;
          }
          .prose pre {
            background: ${theme.colors.dark.background};
            color: ${theme.colors.dark.foreground};
            padding: ${theme.spacing.md};
            border-radius: ${theme.borderRadius.md};
            overflow-x: auto;
            margin: ${theme.spacing.lg} 0;
          }
          .prose pre code {
            background: transparent;
            padding: 0;
          }
          .prose table {
            width: 100%;
            border-collapse: collapse;
            margin: ${theme.spacing.lg} 0;
          }
          .prose th, .prose td {
            border: 1px solid ${theme.colors.border};
            padding: ${theme.spacing.sm};
            text-align: left;
          }
          .prose th {
            background: ${theme.colors.backgroundSecondary};
            font-weight: ${theme.typography.fontWeight.medium};
          }
        `}
      </style>
    </section>
  );
}

export default RichTextSection;
