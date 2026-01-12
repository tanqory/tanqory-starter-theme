// =============================================================================
// Article Screen (Draftbit pattern)
// =============================================================================

import React from 'react';
import { useGlobalVariable, getLogoUrl } from '../config/GlobalVariableContext';
import { HeaderSection } from '../components/sections/HeaderSection';
import { FooterSection } from '../components/sections/FooterSection';
import { RichTextSection } from '../components/sections/RichTextSection';
import { BreadcrumbBlock } from '../components/blocks/BreadcrumbBlock';
import { ContainerBlock } from '../components/blocks/ContainerBlock';
import { HeadingBlock } from '../components/blocks/HeadingBlock';
import { TextBlock } from '../components/blocks/TextBlock';
import { SocialLinksBlock } from '../components/blocks/SocialLinksBlock';
import { useArticleByHandleGET } from '../apis';
import { TanqoryTheme } from '../themes';

// =============================================================================
// Types
// =============================================================================

export interface ArticleScreenProps {
  navigation?: {
    navigate: (screen: string, params?: Record<string, unknown>) => void;
    goBack: () => void;
  };
  route?: {
    params?: {
      handle?: string;
      blogHandle?: string;
    };
  };
}

// =============================================================================
// Screen
// =============================================================================

export function ArticleScreen({ navigation, route }: ArticleScreenProps) {
  const theme = TanqoryTheme;
  const { STORE_CONFIG } = useGlobalVariable();
  const logoUrl = getLogoUrl(STORE_CONFIG);
  const articleHandle = route?.params?.handle || '';
  const blogHandle = route?.params?.blogHandle || 'news';

  // Fetch article data
  const { data: article, isLoading, error } = useArticleByHandleGET(
    blogHandle,
    articleHandle
  );

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: article?.title || 'Article' },
  ];

  const handleNavigate = (href: string) => {
    if (href === '/') {
      navigation?.navigate('Home');
    } else if (href === '/blog') {
      navigation?.navigate('Blog');
    } else if (href === '/cart') {
      navigation?.navigate('Cart');
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <HeaderSection
          logo={{ src: logoUrl, alt: STORE_CONFIG?.name || 'Store' }}
          showSearch
          showCart
        />
        <main style={{ flex: 1 }}>
          <ContainerBlock>
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: `${theme.spacing['3xl']} 0` }}>
              <div
                style={{
                  height: '40px',
                  backgroundColor: theme.colors.backgroundSecondary,
                  borderRadius: theme.borderRadius.md,
                  marginBottom: theme.spacing.md,
                  animation: 'pulse 1.5s ease-in-out infinite',
                }}
              />
              <div
                style={{
                  height: '300px',
                  backgroundColor: theme.colors.backgroundSecondary,
                  borderRadius: theme.borderRadius.lg,
                  marginBottom: theme.spacing.xl,
                  animation: 'pulse 1.5s ease-in-out infinite',
                }}
              />
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  style={{
                    height: '16px',
                    backgroundColor: theme.colors.backgroundSecondary,
                    borderRadius: theme.borderRadius.sm,
                    marginBottom: theme.spacing.sm,
                    width: `${100 - i * 10}%`,
                    animation: 'pulse 1.5s ease-in-out infinite',
                  }}
                />
              ))}
              <style>
                {`
                  @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                  }
                `}
              </style>
            </div>
          </ContainerBlock>
        </main>
      </div>
    );
  }

  // Error state
  if (error || !article) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <HeaderSection
          logo={{ src: logoUrl, alt: STORE_CONFIG?.name || 'Store' }}
          showSearch
          showCart
        />
        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', padding: theme.spacing['3xl'] }}>
            <h1 style={{ fontSize: theme.typography.fontSize['2xl'], marginBottom: theme.spacing.md }}>
              Article Not Found
            </h1>
            <p style={{ color: theme.colors.foregroundMuted, marginBottom: theme.spacing.lg }}>
              The article you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={() => navigation?.navigate('Blog')}
              style={{
                padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
                backgroundColor: theme.colors.primary,
                color: 'white',
                border: 'none',
                borderRadius: theme.borderRadius.md,
                cursor: 'pointer',
              }}
            >
              Back to Blog
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <HeaderSection
        logo={{ src: logoUrl, alt: STORE_CONFIG?.name || 'Store' }}
        showSearch
        showCart
        sticky
        onCartClick={() => handleNavigate('/cart')}
      />

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        {/* Breadcrumbs */}
        <div style={{ backgroundColor: theme.colors.backgroundSecondary, padding: `${theme.spacing.md} 0` }}>
          <ContainerBlock>
            <BreadcrumbBlock items={breadcrumbs} />
          </ContainerBlock>
        </div>

        {/* Article */}
        <article style={{ padding: `${theme.spacing['2xl']} 0` }}>
          <ContainerBlock>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              {/* Header */}
              <header style={{ textAlign: 'center', marginBottom: theme.spacing['2xl'] }}>
                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div style={{ marginBottom: theme.spacing.md }}>
                    {article.tags.map((tag: string) => (
                      <span
                        key={tag}
                        style={{
                          display: 'inline-block',
                          padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                          backgroundColor: theme.colors.backgroundTertiary,
                          color: theme.colors.primary,
                          fontSize: theme.typography.fontSize.xs,
                          fontWeight: theme.typography.fontWeight.medium,
                          borderRadius: theme.borderRadius.full,
                          marginRight: theme.spacing.xs,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <HeadingBlock text={article.title} level="h1" alignment="center" />

                {/* Meta */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: theme.spacing.md,
                    marginTop: theme.spacing.md,
                    color: theme.colors.foregroundMuted,
                    fontSize: theme.typography.fontSize.sm,
                  }}
                >
                  {article.author && (
                    <span>By {article.author.name}</span>
                  )}
                  {article.publishedAt && (
                    <>
                      <span>•</span>
                      <span>{formatDate(article.publishedAt)}</span>
                    </>
                  )}
                </div>
              </header>

              {/* Featured Image */}
              {article.image && (
                <div
                  style={{
                    marginBottom: theme.spacing['2xl'],
                    borderRadius: theme.borderRadius.lg,
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={article.image.src}
                    alt={article.image.altText || article.title}
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
              )}

              {/* Content */}
              <RichTextSection
                content={article.content}
                maxWidth="full"
              />

              {/* Share */}
              <div
                style={{
                  marginTop: theme.spacing['2xl'],
                  paddingTop: theme.spacing.xl,
                  borderTop: `1px solid ${theme.colors.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    fontWeight: theme.typography.fontWeight.medium,
                    color: theme.colors.foreground,
                  }}
                >
                  Share this article
                </span>
                <SocialLinksBlock
                  links={[
                    { platform: 'facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}` },
                    { platform: 'twitter', url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}` },
                  ]}
                  size={16}
                />
              </div>
            </div>
          </ContainerBlock>
        </article>
      </main>

      {/* Footer */}
      <FooterSection
        logo={{ src: logoUrl, alt: STORE_CONFIG?.name || 'Store' }}
        columns={[]}
        copyrightText={`© ${new Date().getFullYear()} ${STORE_CONFIG?.name || 'Store'}. All rights reserved.`}
      />
    </div>
  );
}

export default ArticleScreen;
