// =============================================================================
// Blog Screen (Draftbit pattern)
// =============================================================================

import React from 'react';
import { useGlobalVariable, getLogoUrl } from '../config/GlobalVariableContext';
import { HeaderSection } from '../components/sections/HeaderSection';
import { FooterSection } from '../components/sections/FooterSection';
import { BlogGridSection } from '../components/sections/BlogGridSection';
import { BreadcrumbBlock } from '../components/blocks/BreadcrumbBlock';
import { ContainerBlock } from '../components/blocks/ContainerBlock';
import { HeadingBlock } from '../components/blocks/HeadingBlock';
import { TextBlock } from '../components/blocks/TextBlock';
import { TanqoryTheme } from '../themes';

// =============================================================================
// Types
// =============================================================================

export interface BlogScreenProps {
  navigation?: {
    navigate: (screen: string, params?: Record<string, unknown>) => void;
    goBack: () => void;
  };
  route?: {
    params?: {
      tag?: string;
    };
  };
}

// =============================================================================
// Screen
// =============================================================================

export function BlogScreen({ navigation, route }: BlogScreenProps) {
  const theme = TanqoryTheme;
  const { STORE_CONFIG } = useGlobalVariable();
  const logoUrl = getLogoUrl(STORE_CONFIG);
  const tag = route?.params?.tag;

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blog' },
    ...(tag ? [{ label: tag }] : []),
  ];

  const handleNavigate = (href: string) => {
    if (href.startsWith('/blogs/') || href.startsWith('/articles/')) {
      const handle = href.split('/').pop();
      navigation?.navigate('Article', { handle });
    } else if (href === '/') {
      navigation?.navigate('Home');
    } else if (href === '/cart') {
      navigation?.navigate('Cart');
    }
  };

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

        {/* Blog Header */}
        <section style={{ padding: `${theme.spacing['2xl']} 0`, textAlign: 'center' }}>
          <ContainerBlock>
            <HeadingBlock text={tag ? `Posts tagged "${tag}"` : 'Blog'} level="h1" alignment="center" />
            <div style={{ marginTop: theme.spacing.md }}>
              <TextBlock
                text="Stories, tips, and inspiration from our team"
                preset="body"
                alignment="center"
                color={theme.colors.foregroundMuted}
              />
            </div>
          </ContainerBlock>
        </section>

        {/* Blog Grid */}
        <BlogGridSection
          blogHandle="news"
          limit={12}
          columns={3}
          showExcerpt
          showAuthor
          showDate
          showTags
          showPagination
        />
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

export default BlogScreen;
