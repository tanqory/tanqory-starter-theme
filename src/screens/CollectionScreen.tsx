// =============================================================================
// Collection Screen (Draftbit pattern)
// =============================================================================

import React, { useState, useEffect } from 'react';
import { useGlobalVariable, getLogoUrl } from '../config/GlobalVariableContext';
import { HeaderSection } from '../components/sections/HeaderSection';
import { FooterSection } from '../components/sections/FooterSection';
import { ProductGridSection } from '../components/sections/ProductGridSection';
import { BreadcrumbBlock } from '../components/blocks/BreadcrumbBlock';
import { ContainerBlock } from '../components/blocks/ContainerBlock';
import { HeadingBlock } from '../components/blocks/HeadingBlock';
import { TextBlock } from '../components/blocks/TextBlock';
import { useCollectionByHandleGET } from '../apis';
import { TanqoryTheme } from '../themes';

// =============================================================================
// Types
// =============================================================================

export interface CollectionScreenProps {
  navigation?: {
    navigate: (screen: string, params?: Record<string, unknown>) => void;
    goBack: () => void;
  };
  route?: {
    params?: {
      handle?: string;
    };
  };
}

// =============================================================================
// Screen
// =============================================================================

export function CollectionScreen({ navigation, route }: CollectionScreenProps) {
  const theme = TanqoryTheme;
  const { STORE_CONFIG } = useGlobalVariable();
  const logoUrl = getLogoUrl(STORE_CONFIG);
  const collectionHandle = route?.params?.handle || 'all';

  // Fetch collection data
  const { data: collection, isLoading: loading, error } = useCollectionByHandleGET({
    handle: collectionHandle,
  });

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Collections', href: '/collections' },
    { label: collection?.title || 'Collection' },
  ];

  const handleNavigate = (href: string) => {
    if (href.startsWith('/products/')) {
      navigation?.navigate('Product', { handle: href.replace('/products/', '') });
    } else if (href.startsWith('/collections/')) {
      navigation?.navigate('Collection', { handle: href.replace('/collections/', '') });
    } else if (href === '/') {
      navigation?.navigate('Home');
    } else if (href === '/cart') {
      navigation?.navigate('Cart');
    }
  };

  // Loading state
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <HeaderSection
          logo={{ src: logoUrl, alt: STORE_CONFIG?.name || 'Store' }}
          showSearch
          showCart
        />
        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                border: `3px solid ${theme.colors.border}`,
                borderTopColor: theme.colors.primary,
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto',
              }}
            />
            <p style={{ marginTop: theme.spacing.md, color: theme.colors.foregroundMuted }}>
              Loading collection...
            </p>
          </div>
          <style>
            {`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}
          </style>
        </main>
      </div>
    );
  }

  // Error state
  if (error || !collection) {
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
              Collection Not Found
            </h1>
            <p style={{ color: theme.colors.foregroundMuted, marginBottom: theme.spacing.lg }}>
              The collection you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={() => navigation?.navigate('Home')}
              style={{
                padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
                backgroundColor: theme.colors.primary,
                color: 'white',
                border: 'none',
                borderRadius: theme.borderRadius.md,
                cursor: 'pointer',
              }}
            >
              Back to Home
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

        {/* Collection Header */}
        <section style={{ padding: `${theme.spacing['2xl']} 0`, textAlign: 'center' }}>
          <ContainerBlock>
            <HeadingBlock text={collection.title} level="h1" alignment="center" />
            {collection.description && (
              <div style={{ marginTop: theme.spacing.md }}>
                <TextBlock
                  text={collection.description}
                  preset="body"
                  alignment="center"
                  maxWidth="60"
                />
              </div>
            )}
            {collection.image && (
              <div
                style={{
                  marginTop: theme.spacing.xl,
                  maxWidth: '800px',
                  margin: '0 auto',
                  borderRadius: theme.borderRadius.lg,
                  overflow: 'hidden',
                }}
              >
                <img
                  src={collection.image.src}
                  alt={collection.image.altText || collection.title}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            )}
          </ContainerBlock>
        </section>

        {/* Product Grid */}
        <ProductGridSection
          products={collection.products || []}
          showFilters
          columns={4}
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

export default CollectionScreen;
