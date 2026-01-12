// =============================================================================
// Blog Post Card Block (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme, CardStyles } from '../../themes';
import type { Article } from '../../apis/BlogApi';

// =============================================================================
// Types
// =============================================================================

export interface BlogPostCardBlockProps {
  article?: Article;
  showImage?: boolean;
  showTitle?: boolean;
  showExcerpt?: boolean;
  showAuthor?: boolean;
  showDate?: boolean;
  showTags?: boolean;
  imageRatio?: 'adapt' | 'portrait' | 'square' | 'landscape' | 'wide';
  layout?: 'vertical' | 'horizontal';
  onClick?: (article: Article) => void;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const BlogPostCardBlockSchema = {
  name: 'Blog Post Card',
  tag: 'article',
  settings: [
    {
      id: 'showImage',
      type: 'checkbox',
      label: 'Show image',
      default: true,
    },
    {
      id: 'showTitle',
      type: 'checkbox',
      label: 'Show title',
      default: true,
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
      default: 'landscape',
    },
    {
      id: 'layout',
      type: 'select',
      label: 'Layout',
      options: [
        { value: 'vertical', label: 'Vertical' },
        { value: 'horizontal', label: 'Horizontal' },
      ],
      default: 'vertical',
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function BlogPostCardBlock({
  article,
  showImage = true,
  showTitle = true,
  showExcerpt = true,
  showAuthor = true,
  showDate = true,
  showTags = false,
  imageRatio = 'landscape',
  layout = 'vertical',
  onClick,
  className,
}: BlogPostCardBlockProps) {
  const theme = TanqoryTheme;
  const cardStyles = CardStyles(theme);

  if (!article) {
    return <BlogPostCardPlaceholder />;
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Get aspect ratio padding
  const getAspectRatio = () => {
    switch (imageRatio) {
      case 'portrait':
        return '133.33%';
      case 'square':
        return '100%';
      case 'landscape':
        return '75%';
      case 'wide':
        return '56.25%';
      default:
        return undefined;
    }
  };

  const isHorizontal = layout === 'horizontal';

  const containerStyle: React.CSSProperties = {
    ...cardStyles.interactive,
    display: isHorizontal ? 'flex' : 'block',
    gap: isHorizontal ? theme.spacing.md : undefined,
  };

  const imageContainerStyle: React.CSSProperties = {
    position: 'relative',
    width: isHorizontal ? '40%' : '100%',
    flexShrink: 0,
    overflow: 'hidden',
  };

  const aspectRatioStyle: React.CSSProperties = imageRatio !== 'adapt'
    ? {
        position: 'relative',
        paddingBottom: getAspectRatio(),
        height: 0,
      }
    : {};

  const imageStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    height: imageRatio !== 'adapt' ? '100%' : 'auto',
    objectFit: 'cover',
    ...(imageRatio !== 'adapt' && {
      position: 'absolute' as const,
      top: 0,
      left: 0,
    }),
  };

  const contentStyle: React.CSSProperties = {
    padding: theme.spacing.md,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm,
    flex: isHorizontal ? 1 : undefined,
  };

  return (
    <article
      style={containerStyle}
      className={className}
      onClick={() => onClick?.(article)}
    >
      {/* Image */}
      {showImage && article.image && (
        <div style={imageContainerStyle}>
          {imageRatio !== 'adapt' ? (
            <div style={aspectRatioStyle}>
              <img
                src={article.image.src}
                alt={article.image.altText || article.title}
                style={imageStyle}
                loading="lazy"
              />
            </div>
          ) : (
            <img
              src={article.image.src}
              alt={article.image.altText || article.title}
              style={imageStyle}
              loading="lazy"
            />
          )}
        </div>
      )}

      {/* Content */}
      <div style={contentStyle}>
        {/* Tags */}
        {showTags && article.tags && article.tags.length > 0 && (
          <div style={{ display: 'flex', gap: theme.spacing.xs, flexWrap: 'wrap' }}>
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: theme.typography.fontSize.xs,
                  color: theme.colors.primary,
                  backgroundColor: theme.colors.backgroundSecondary,
                  padding: `${theme.spacing['2xs']} ${theme.spacing.xs}`,
                  borderRadius: theme.borderRadius.sm,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        {showTitle && (
          <h3
            style={{
              fontSize: theme.typography.fontSize.lg,
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.foreground,
              margin: 0,
              lineHeight: theme.typography.lineHeight.snug,
            }}
          >
            {article.title}
          </h3>
        )}

        {/* Excerpt */}
        {showExcerpt && article.excerpt && (
          <p
            style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.foregroundSecondary,
              margin: 0,
              lineHeight: theme.typography.lineHeight.normal,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {article.excerpt}
          </p>
        )}

        {/* Meta */}
        {(showAuthor || showDate) && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.sm,
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.foregroundMuted,
            }}
          >
            {showAuthor && article.author && (
              <span>{article.author.name}</span>
            )}
            {showAuthor && showDate && article.author && (
              <span>•</span>
            )}
            {showDate && (
              <time dateTime={article.publishedAt}>
                {formatDate(article.publishedAt)}
              </time>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

// =============================================================================
// Placeholder Component
// =============================================================================

function BlogPostCardPlaceholder() {
  const theme = TanqoryTheme;
  const cardStyles = CardStyles(theme);

  return (
    <div style={cardStyles.base}>
      <div
        style={{
          position: 'relative',
          paddingBottom: '75%',
          backgroundColor: theme.colors.backgroundSecondary,
        }}
      />
      <div
        style={{
          padding: theme.spacing.md,
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing.sm,
        }}
      >
        <div
          style={{
            width: '80%',
            height: '18px',
            backgroundColor: theme.colors.backgroundSecondary,
            borderRadius: theme.borderRadius.sm,
          }}
        />
        <div
          style={{
            width: '100%',
            height: '14px',
            backgroundColor: theme.colors.backgroundSecondary,
            borderRadius: theme.borderRadius.sm,
          }}
        />
        <div
          style={{
            width: '40%',
            height: '12px',
            backgroundColor: theme.colors.backgroundSecondary,
            borderRadius: theme.borderRadius.sm,
          }}
        />
      </div>
    </div>
  );
}

export default BlogPostCardBlock;
