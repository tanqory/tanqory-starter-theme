// =============================================================================
// Multi Column Section (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme, SectionStyles } from '../../themes';
import { ContainerBlock } from '../blocks/ContainerBlock';
import { HeadingBlock } from '../blocks/HeadingBlock';
import { TextBlock } from '../blocks/TextBlock';
import { ImageBlock } from '../blocks/ImageBlock';
import { ButtonBlock } from '../blocks/ButtonBlock';

// =============================================================================
// Types
// =============================================================================

export interface Column {
  id: string;
  image?: string;
  icon?: React.ReactNode;
  heading?: string;
  description?: string;
  button?: {
    label: string;
    link: string;
  };
}

export interface MultiColumnSectionProps {
  title?: string;
  description?: string;
  columns: Column[];
  columnsPerRow?: 2 | 3 | 4 | 5 | 6;
  columnAlignment?: 'left' | 'center' | 'right';
  imageStyle?: 'square' | 'circle' | 'rounded';
  imageRatio?: 'square' | 'portrait' | 'landscape' | 'adapt';
  showButton?: boolean;
  backgroundColor?: string;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const MultiColumnSectionSchema = {
  name: 'Multi Column',
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
      id: 'columnsPerRow',
      type: 'range',
      label: 'Columns per row',
      min: 2,
      max: 6,
      step: 1,
      default: 3,
    },
    {
      id: 'columnAlignment',
      type: 'text_alignment',
      label: 'Column alignment',
      default: 'center',
    },
    {
      type: 'header',
      content: 'Image',
    },
    {
      id: 'imageStyle',
      type: 'select',
      label: 'Image style',
      options: [
        { value: 'square', label: 'Square' },
        { value: 'circle', label: 'Circle' },
        { value: 'rounded', label: 'Rounded' },
      ],
      default: 'square',
    },
    {
      id: 'imageRatio',
      type: 'select',
      label: 'Image ratio',
      options: [
        { value: 'square', label: 'Square (1:1)' },
        { value: 'portrait', label: 'Portrait (2:3)' },
        { value: 'landscape', label: 'Landscape (3:2)' },
        { value: 'adapt', label: 'Adapt to image' },
      ],
      default: 'square',
    },
    {
      id: 'backgroundColor',
      type: 'color',
      label: 'Background color',
    },
  ],
  blocks: [
    {
      type: 'column',
      name: 'Column',
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
          id: 'description',
          type: 'richtext',
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
      ],
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function MultiColumnSection({
  title,
  description,
  columns,
  columnsPerRow = 3,
  columnAlignment = 'center',
  imageStyle = 'square',
  imageRatio = 'square',
  showButton = true,
  backgroundColor,
  className,
}: MultiColumnSectionProps) {
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
    marginBottom: theme.spacing['2xl'],
    gap: theme.spacing.sm,
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columnsPerRow}, 1fr)`,
    gap: theme.spacing.xl,
  };

  // Image ratio mappings
  const ratioMap: Record<string, string> = {
    square: '100%',
    portrait: '150%',
    landscape: '66.67%',
  };

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

        {/* Columns Grid */}
        <div style={gridStyle} className="multi-column-grid">
          {columns.map((column) => (
            <ColumnItem
              key={column.id}
              column={column}
              alignment={columnAlignment}
              imageStyle={imageStyle}
              imageRatio={imageRatio}
              ratioMap={ratioMap}
              showButton={showButton}
            />
          ))}
        </div>

        {/* Responsive styles */}
        <style>
          {`
            @media (max-width: ${theme.breakpoints.lg}) {
              .multi-column-grid {
                grid-template-columns: repeat(${Math.min(columnsPerRow, 3)}, 1fr) !important;
              }
            }
            @media (max-width: ${theme.breakpoints.md}) {
              .multi-column-grid {
                grid-template-columns: repeat(2, 1fr) !important;
              }
            }
            @media (max-width: ${theme.breakpoints.sm}) {
              .multi-column-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}
        </style>
      </ContainerBlock>
    </section>
  );
}

// =============================================================================
// Column Item Component
// =============================================================================

interface ColumnItemProps {
  column: Column;
  alignment: 'left' | 'center' | 'right';
  imageStyle: 'square' | 'circle' | 'rounded';
  imageRatio: 'square' | 'portrait' | 'landscape' | 'adapt';
  ratioMap: Record<string, string>;
  showButton: boolean;
}

function ColumnItem({ column, alignment, imageStyle, imageRatio, ratioMap, showButton }: ColumnItemProps) {
  const theme = TanqoryTheme;

  const columnStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: alignment === 'center' ? 'center' : alignment === 'right' ? 'flex-end' : 'flex-start',
    textAlign: alignment,
    gap: theme.spacing.md,
  };

  const imageContainerStyle: React.CSSProperties = {
    width: '100%',
    position: 'relative',
    paddingTop: imageRatio === 'adapt' ? undefined : ratioMap[imageRatio],
    overflow: 'hidden',
    borderRadius:
      imageStyle === 'circle'
        ? theme.borderRadius.full
        : imageStyle === 'rounded'
        ? theme.borderRadius.lg
        : theme.borderRadius.md,
  };

  return (
    <div style={columnStyle}>
      {/* Image or Icon */}
      {column.image ? (
        <div style={imageContainerStyle}>
          <ImageBlock
            src={column.image}
            alt={column.heading || ''}
            ratio={imageRatio === 'adapt' ? 'adapt' : imageRatio}
            objectFit="cover"
          />
        </div>
      ) : column.icon ? (
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: theme.borderRadius.full,
            backgroundColor: theme.colors.backgroundSecondary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {column.icon}
        </div>
      ) : null}

      {/* Text Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.xs }}>
        {column.heading && (
          <HeadingBlock text={column.heading} level="h4" alignment={alignment} />
        )}
        {column.description && (
          <TextBlock text={column.description} preset="body" alignment={alignment} />
        )}
      </div>

      {/* Button */}
      {showButton && column.button && (
        <ButtonBlock
          label={column.button.label}
          link={column.button.link}
          style="secondary"
        />
      )}
    </div>
  );
}

export default MultiColumnSection;
