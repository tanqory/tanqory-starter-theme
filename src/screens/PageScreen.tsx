// =============================================================================
// Page Screen (Draftbit pattern)
// =============================================================================

import React from 'react';
import { useGlobalVariable, getLogoUrl } from '../config/GlobalVariableContext';
import { HeaderSection } from '../components/sections/HeaderSection';
import { FooterSection } from '../components/sections/FooterSection';
import { RichTextSection } from '../components/sections/RichTextSection';
import { BreadcrumbBlock } from '../components/blocks/BreadcrumbBlock';
import { ContainerBlock } from '../components/blocks/ContainerBlock';
import { HeadingBlock } from '../components/blocks/HeadingBlock';
import { TanqoryTheme } from '../themes';

// =============================================================================
// Types
// =============================================================================

export interface PageScreenProps {
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

interface PageData {
  title: string;
  body: string;
}

// Static pages data (in real app, this would come from an API)
const STATIC_PAGES: Record<string, PageData> = {
  about: {
    title: 'About Us',
    body: '<p>Welcome to our store. We are dedicated to providing the best products and services to our customers.</p>',
  },
  contact: {
    title: 'Contact Us',
    body: '<p>Get in touch with us at contact@store.com or call us at 1-800-STORE.</p>',
  },
  shipping: {
    title: 'Shipping Information',
    body: '<p>We offer free shipping on orders over $50. Standard shipping takes 3-5 business days.</p>',
  },
  returns: {
    title: 'Returns & Exchanges',
    body: '<p>We accept returns within 30 days of purchase. Items must be unworn and in original packaging.</p>',
  },
  faq: {
    title: 'Frequently Asked Questions',
    body: '<p>Find answers to common questions about our products, shipping, and policies.</p>',
  },
};

// =============================================================================
// Screen
// =============================================================================

export function PageScreen({ navigation, route }: PageScreenProps) {
  const theme = TanqoryTheme;
  const { STORE_CONFIG } = useGlobalVariable();
  const logoUrl = getLogoUrl(STORE_CONFIG);
  const pageHandle = route?.params?.handle || '';

  // Get page data from static pages
  const page = STATIC_PAGES[pageHandle];

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: page?.title || 'Page' },
  ];

  const handleNavigate = (href: string) => {
    if (href === '/') {
      navigation?.navigate('Home');
    } else if (href === '/cart') {
      navigation?.navigate('Cart');
    }
  };

  // Error state - page not found
  if (!page) {
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
              Page Not Found
            </h1>
            <p style={{ color: theme.colors.foregroundMuted, marginBottom: theme.spacing.lg }}>
              The page you're looking for doesn't exist or has been removed.
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

        {/* Page Content */}
        <section style={{ padding: `${theme.spacing['2xl']} 0` }}>
          <ContainerBlock>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <HeadingBlock text={page.title} level="h1" />
              <div style={{ marginTop: theme.spacing.xl }}>
                <RichTextSection
                  content={page.body}
                  maxWidth="full"
                />
              </div>
            </div>
          </ContainerBlock>
        </section>
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

export default PageScreen;
