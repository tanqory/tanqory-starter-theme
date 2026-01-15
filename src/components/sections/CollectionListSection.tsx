// =============================================================================
// Collection List Section (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme, SectionStyles } from '../../themes';
import { ContainerBlock } from '../blocks/ContainerBlock';
import { HeadingBlock } from '../blocks/HeadingBlock';
import { TextBlock } from '../blocks/TextBlock';
import { GridBlock } from '../blocks/GridBlock';
import { CarouselBlock } from '../blocks/CarouselBlock';
import { CollectionCardBlock } from '../blocks/CollectionCardBlock';
import { FetchCollections } from '../../apis/CollectionsApi';
import type { Collection } from '../../apis/CollectionsApi';

// =============================================================================
// Types
// =============================================================================

export interface CollectionListSectionProps {
  title?: string;
  description?: string;
  collections?: Collection[];
  handles?: string[];
  limit?: number;
  layout?: 'grid' | 'carousel';
  columns?: number | { mobile: number; tablet: number; desktop: number };
  imageRatio?: 'adapt' | 'portrait' | 'square' | 'landscape' | 'wide';
  showDescription?: boolean;
  showProductCount?: boolean;
  textPosition?: 'below' | 'overlay-bottom' | 'overlay-center';
  onCollectionClick?: (collection: Collection) => void;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const CollectionListSectionSchema = {
  name: 'Collection List',
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
      default: 'Shop by Category',
    },
    {
      id: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      id: 'limit',
      type: 'range',
      label: 'Collections to show',
      min: 2,
      max: 12,
      step: 1,
      default: 4,
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
      default: 'grid',
    },
    {
      id: 'columns_desktop',
      type: 'range',
      label: 'Columns (Desktop)',
      min: 2,
      max: 6,
      step: 1,
      default: 4,
    },
    {
      type: 'header',
      content: 'Collection Card',
    },
    {
      id: 'imageRatio',
      type: 'select',
      label: 'Image ratio',
      options: [
        { value: 'adapt', label: 'Adapt to image' },
        { value: 'portrait', label: 'Portrait (3:4)' },
        { value: 'square', label: 'Square (1:1)' },
        { value: 'landscape', label: 'Landscape (4:3)' },
        { value: 'wide', label: 'Wide (16:9)' },
      ],
      default: 'square',
    },
    {
      id: 'textPosition',
      type: 'select',
      label: 'Text position',
      options: [
        { value: 'below', label: 'Below image' },
        { value: 'overlay-bottom', label: 'Overlay bottom' },
        { value: 'overlay-center', label: 'Overlay center' },
      ],
      default: 'below',
    },
    {
      id: 'showDescription',
      type: 'checkbox',
      label: 'Show description',
      default: false,
    },
    {
      id: 'showProductCount',
      type: 'checkbox',
      label: 'Show product count',
      default: false,
    },
  ],
  blocks: [
    {
      type: 'collection',
      name: 'Collection',
      settings: [
        {
          id: 'collection',
          type: 'collection',
          label: 'Collection',
        },
      ],
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function CollectionListSection({
  title = 'Shop by Category',
  description,
  collections: providedCollections,
  handles,
  limit = 4,
  layout = 'grid',
  columns = { mobile: 2, tablet: 3, desktop: 4 },
  imageRatio = 'square',
  showDescription = false,
  showProductCount = false,
  textPosition = 'below',
  onCollectionClick,
  className,
}: CollectionListSectionProps) {
  const theme = TanqoryTheme;
  const sectionStyles = SectionStyles(theme);

  const sectionStyle: React.CSSProperties = {
    ...sectionStyles.base,
    backgroundColor: theme.colors.background,
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: theme.spacing['2xl'],
    gap: theme.spacing.sm,
  };

  const renderCollections = (collections: Collection[]) => {
    const collectionCards = collections.map((collection) => (
      <CollectionCardBlock
        key={collection.id}
        collection={collection}
        imageRatio={imageRatio}
        showDescription={showDescription}
        showProductCount={showProductCount}
        textPosition={textPosition}
        overlay={textPosition.startsWith('overlay')}
        onClick={() => onCollectionClick?.(collection)}
      />
    ));

    if (layout === 'carousel') {
      return (
        <CarouselBlock
          slidesPerView={typeof columns === 'number' ? columns : columns.desktop}
          gap={16}
          showArrows
          showDots
        >
          {collectionCards}
        </CarouselBlock>
      );
    }

    return (
      <GridBlock columns={columns} gap={24}>
        {collectionCards}
      </GridBlock>
    );
  };

  const content = (collections: Collection[]) => (
    <>
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

      {/* Collections */}
      {renderCollections(collections)}
    </>
  );

  return (
    <section data-section="CollectionListSection" style={sectionStyle} className={className}>
      <ContainerBlock>
        {providedCollections ? (
          // Use provided collections
          content(providedCollections)
        ) : (
          // Fetch collections
          <FetchCollections limit={limit}>
            {({ loading, data, error }) => {
              if (loading) {
                return (
                  <>
                    {(title || description) && (
                      <div style={headerStyle}>
                        {title && <HeadingBlock text={title} level="h2" alignment="center" />}
                      </div>
                    )}
                    <GridBlock columns={columns} gap={24}>
                      {Array.from({ length: limit }, (_, i) => (
                        <CollectionCardBlock key={i} imageRatio={imageRatio} />
                      ))}
                    </GridBlock>
                  </>
                );
              }

              if (error || !data || data.length === 0) {
                return (
                  <div style={{ textAlign: 'center', padding: theme.spacing['2xl'] }}>
                    <TextBlock
                      text="No collections found"
                      preset="body"
                      alignment="center"
                    />
                  </div>
                );
              }

              return content(data);
            }}
          </FetchCollections>
        )}
      </ContainerBlock>
    </section>
  );
}

export default CollectionListSection;
