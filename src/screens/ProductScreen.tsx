// =============================================================================
// Product Screen (Draftbit pattern)
// =============================================================================

import React, { useEffect } from 'react';
import { useGlobalVariable, useSetGlobalVariable, getLogoUrl } from '../config/GlobalVariableContext';
import { HeaderSection } from '../components/sections/HeaderSection';
import { FooterSection } from '../components/sections/FooterSection';
import { ProductDetailSection } from '../components/sections/ProductDetailSection';
import { RelatedProductsSection } from '../components/sections/RelatedProductsSection';
import { RecentlyViewedSection } from '../components/sections/RecentlyViewedSection';
import { BreadcrumbBlock } from '../components/blocks/BreadcrumbBlock';
import { ContainerBlock } from '../components/blocks/ContainerBlock';
import { useProductByHandleGET } from '../apis';
import { TanqoryTheme } from '../themes';
import type { Product } from '../apis';

// =============================================================================
// Types
// =============================================================================

export interface ProductScreenProps {
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

export function ProductScreen({ navigation, route }: ProductScreenProps) {
  const theme = TanqoryTheme;
  const { STORE_CONFIG, RECENTLY_VIEWED_PRODUCTS } = useGlobalVariable();
  const setGlobalVariable = useSetGlobalVariable();
  const productHandle = route?.params?.handle || '';

  const logoUrl = getLogoUrl(STORE_CONFIG);

  // Fetch product data
  const { data: product, isLoading: loading, error } = useProductByHandleGET(productHandle);

  // Add to recently viewed
  useEffect(() => {
    if (product) {
      const recentlyViewed = (RECENTLY_VIEWED_PRODUCTS || []) as Product[];
      const filtered = recentlyViewed.filter((p) => p.id !== product.id);
      const updated = [product, ...filtered].slice(0, 10);
      setGlobalVariable('RECENTLY_VIEWED_PRODUCTS', updated);
    }
  }, [product, RECENTLY_VIEWED_PRODUCTS, setGlobalVariable]);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/collections/all' },
    { label: product?.title || 'Product' },
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
        <main style={{ flex: 1 }}>
          <ContainerBlock>
            <div style={{ padding: `${theme.spacing['3xl']} 0` }}>
              <ProductDetailSkeleton />
            </div>
          </ContainerBlock>
        </main>
      </div>
    );
  }

  // Error state
  if (error || !product) {
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
              Product Not Found
            </h1>
            <p style={{ color: theme.colors.foregroundMuted, marginBottom: theme.spacing.lg }}>
              The product you're looking for doesn't exist or has been removed.
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

        {/* Product Detail */}
        <ProductDetailSection
          product={product}
          showBreadcrumbs={false}
          galleryLayout="thumbnails-left"
        />

        {/* Related Products */}
        <RelatedProductsSection
          title="You May Also Like"
          productId={product.id}
          maxProducts={4}
        />

        {/* Recently Viewed */}
        <RecentlyViewedSection
          title="Recently Viewed"
          maxProducts={6}
          layout="carousel"
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

// =============================================================================
// Product Detail Skeleton
// =============================================================================

function ProductDetailSkeleton() {
  const theme = TanqoryTheme;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: theme.spacing['2xl'] }}>
      {/* Gallery Skeleton */}
      <div>
        <div
          style={{
            width: '100%',
            paddingTop: '100%',
            backgroundColor: theme.colors.backgroundSecondary,
            borderRadius: theme.borderRadius.lg,
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />
        <div style={{ display: 'flex', gap: theme.spacing.sm, marginTop: theme.spacing.md }}>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                width: '80px',
                height: '80px',
                backgroundColor: theme.colors.backgroundSecondary,
                borderRadius: theme.borderRadius.md,
                animation: 'pulse 1.5s ease-in-out infinite',
              }}
            />
          ))}
        </div>
      </div>

      {/* Info Skeleton */}
      <div>
        <div
          style={{
            height: '40px',
            backgroundColor: theme.colors.backgroundSecondary,
            borderRadius: theme.borderRadius.md,
            marginBottom: theme.spacing.md,
            width: '70%',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />
        <div
          style={{
            height: '24px',
            backgroundColor: theme.colors.backgroundSecondary,
            borderRadius: theme.borderRadius.md,
            marginBottom: theme.spacing.lg,
            width: '30%',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />
        <div
          style={{
            height: '100px',
            backgroundColor: theme.colors.backgroundSecondary,
            borderRadius: theme.borderRadius.md,
            marginBottom: theme.spacing.lg,
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />
        <div
          style={{
            height: '48px',
            backgroundColor: theme.colors.backgroundSecondary,
            borderRadius: theme.borderRadius.md,
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />
      </div>

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}
      </style>
    </div>
  );
}

export default ProductScreen;
