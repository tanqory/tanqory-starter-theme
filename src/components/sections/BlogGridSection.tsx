// =============================================================================
// Blog Grid Section (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme, SectionStyles } from '../../themes';
import { ContainerBlock } from '../blocks/ContainerBlock';
import { HeadingBlock } from '../blocks/HeadingBlock';
import { TextBlock } from '../blocks/TextBlock';
import { GridBlock } from '../blocks/GridBlock';
import { BlogPostCardBlock } from '../blocks/BlogPostCardBlock';
import { PaginationBlock } from '../blocks/PaginationBlock';
import { FetchArticles } from '../../apis/BlogApi';
import type { Article } from '../../apis/BlogApi';

// =============================================================================
// Types
// =============================================================================

export interface BlogGridSectionProps {
  title?: string;
  description?: string;
  blogHandle?: string;
  articles?: Article[];
  limit?: number;
  columns?: number | { mobile: number; tablet: number; desktop: number };
  imageRatio?: 'adapt' | 'portrait' | 'square' | 'landscape' | 'wide';
  showExcerpt?: boolean;
  showAuthor?: boolean;
  showDate?: boolean;
  showTags?: boolean;
  showPagination?: boolean;
  currentPage?: number;
  totalPages?: number;
  onArticleClick?: (article: Article) => void;
  onPageChange?: (page: number) => void;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const BlogGridSectionSchema = {
  name: 'Blog Grid',
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
      default: 'Latest Articles',
    },
    {
      id: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      id: 'blog',
      type: 'blog',
      label: 'Blog',
    },
    {
      id: 'limit',
      type: 'range',
      label: 'Articles to show',
      min: 2,
      max: 12,
      step: 1,
      default: 6,
    },
    {
      type: 'header',
      content: 'Layout',
    },
    {
      id: 'columns_desktop',
      type: 'range',
      label: 'Columns (Desktop)',
      min: 2,
      max: 4,
      step: 1,
      default: 3,
    },
    {
      type: 'header',
      content: 'Article Card',
    },
    {
      id: 'imageRatio',
      type: 'select',
      label: 'Image ratio',
      options: [
        { value: 'adapt', label: 'Adapt to image' },
        { value: 'landscape', label: 'Landscape (4:3)' },
        { value: 'wide', label: 'Wide (16:9)' },
        { value: 'square', label: 'Square (1:1)' },
      ],
      default: 'landscape',
    },
    {
      id: 'showExcerpt',
      type: 'checkbox',
      label: 'Show excerpt',
      default: true,
    },
    {
      id: 'showAuthor',
      type: 'checkbox',
      label: 'Show author',
      default: true,
    },
    {
      id: 'showDate',
      type: 'checkbox',
      label: 'Show date',
      default: true,
    },
    {
      id: 'showTags',
      type: 'checkbox',
      label: 'Show tags',
      default: false,
    },
    {
      id: 'showPagination',
      type: 'checkbox',
      label: 'Show pagination',
      default: true,
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function BlogGridSection({
  title = 'Latest Articles',
  description,
  blogHandle,
  articles: providedArticles,
  limit = 6,
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  imageRatio = 'landscape',
  showExcerpt = true,
  showAuthor = true,
  showDate = true,
  showTags = false,
  showPagination = true,
  currentPage = 1,
  totalPages = 1,
  onArticleClick,
  onPageChange,
  className,
}: BlogGridSectionProps) {
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

  const renderArticles = (articles: Article[]) => (
    <GridBlock columns={columns} gap={32}>
      {articles.map((article) => (
        <BlogPostCardBlock
          key={article.id}
          article={article}
          imageRatio={imageRatio}
          showExcerpt={showExcerpt}
          showAuthor={showAuthor}
          showDate={showDate}
          showTags={showTags}
          onClick={() => onArticleClick?.(article)}
        />
      ))}
    </GridBlock>
  );

  const content = (articles: Article[]) => (
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

      {/* Articles */}
      {articles.length > 0 ? (
        renderArticles(articles)
      ) : (
        <div style={{ textAlign: 'center', padding: theme.spacing['2xl'] }}>
          <TextBlock
            text="No articles found"
            preset="body"
            alignment="center"
          />
        </div>
      )}

      {/* Pagination */}
      {showPagination && totalPages > 1 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: theme.spacing['2xl'],
          }}
        >
          <PaginationBlock
            currentPage={currentPage}
            totalPages={totalPages}
            showPrevNext
            onPageChange={onPageChange}
          />
        </div>
      )}
    </>
  );

  return (
    <section style={sectionStyle} className={className}>
      <ContainerBlock>
        {providedArticles ? (
          content(providedArticles)
        ) : (
          <FetchArticles blogHandle={blogHandle} limit={limit}>
            {({ loading, data, error }) => {
              if (loading) {
                return (
                  <>
                    {(title || description) && (
                      <div style={headerStyle}>
                        {title && <HeadingBlock text={title} level="h2" alignment="center" />}
                      </div>
                    )}
                    <GridBlock columns={columns} gap={32}>
                      {Array.from({ length: limit }, (_, i) => (
                        <BlogPostCardBlock key={i} imageRatio={imageRatio} />
                      ))}
                    </GridBlock>
                  </>
                );
              }

              if (error || !data) {
                return (
                  <div style={{ textAlign: 'center', padding: theme.spacing['2xl'] }}>
                    <TextBlock
                      text="Failed to load articles"
                      preset="body"
                      alignment="center"
                    />
                  </div>
                );
              }

              return content(data);
            }}
          </FetchArticles>
        )}
      </ContainerBlock>
    </section>
  );
}

export default BlogGridSection;
