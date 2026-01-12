// =============================================================================
// Not Found Screen (Draftbit pattern)
// =============================================================================

import React from 'react';
import { useGlobalVariable, getLogoUrl } from '../config/GlobalVariableContext';
import { HeaderSection } from '../components/sections/HeaderSection';
import { FooterSection } from '../components/sections/FooterSection';
import { ContainerBlock } from '../components/blocks/ContainerBlock';
import { HeadingBlock } from '../components/blocks/HeadingBlock';
import { TextBlock } from '../components/blocks/TextBlock';
import { ButtonBlock } from '../components/blocks/ButtonBlock';
import { TanqoryTheme } from '../themes';

// =============================================================================
// Types
// =============================================================================

export interface NotFoundScreenProps {
  navigation?: {
    navigate: (screen: string, params?: Record<string, unknown>) => void;
    goBack: () => void;
  };
  route?: {
    params?: Record<string, unknown>;
  };
}

// =============================================================================
// Screen
// =============================================================================

export function NotFoundScreen({ navigation }: NotFoundScreenProps) {
  const theme = TanqoryTheme;
  const { STORE_CONFIG } = useGlobalVariable();
  const logoUrl = getLogoUrl(STORE_CONFIG);

  const handleNavigate = (href: string) => {
    if (href === '/') {
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
        onCartClick={() => handleNavigate('/cart')}
      />

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: theme.spacing['3xl'],
        }}
      >
        <ContainerBlock>
          <div style={{ textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
            {/* 404 Icon */}
            <div
              style={{
                fontSize: '120px',
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.backgroundSecondary,
                lineHeight: 1,
                marginBottom: theme.spacing.lg,
              }}
            >
              404
            </div>

            <HeadingBlock text="Page Not Found" level="h1" alignment="center" />

            <div style={{ marginTop: theme.spacing.md }}>
              <TextBlock
                text="Sorry, we couldn't find the page you're looking for. It may have been moved or no longer exists."
                preset="body"
                alignment="center"
                color={theme.colors.foregroundMuted}
              />
            </div>

            {/* Action Buttons */}
            <div
              style={{
                display: 'flex',
                gap: theme.spacing.md,
                justifyContent: 'center',
                marginTop: theme.spacing.xl,
              }}
            >
              <ButtonBlock
                label="Go Home"
                link="/"
                style="primary"
                onClick={() => navigation?.navigate('Home')}
              />
              <ButtonBlock
                label="Go Back"
                style="secondary"
                onClick={() => navigation?.goBack()}
              />
            </div>

            {/* Quick Links */}
            <div
              style={{
                marginTop: theme.spacing['2xl'],
                paddingTop: theme.spacing.xl,
                borderTop: `1px solid ${theme.colors.border}`,
              }}
            >
              <p
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.foregroundMuted,
                  marginBottom: theme.spacing.md,
                }}
              >
                You might want to check out:
              </p>
              <div
                style={{
                  display: 'flex',
                  gap: theme.spacing.lg,
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <a
                  href="/collections/all"
                  onClick={(e) => {
                    e.preventDefault();
                    navigation?.navigate('Collection', { handle: 'all' });
                  }}
                  style={{
                    color: theme.colors.primary,
                    fontSize: theme.typography.fontSize.sm,
                    textDecoration: 'none',
                  }}
                >
                  All Products
                </a>
                <a
                  href="/collections/new-arrivals"
                  onClick={(e) => {
                    e.preventDefault();
                    navigation?.navigate('Collection', { handle: 'new-arrivals' });
                  }}
                  style={{
                    color: theme.colors.primary,
                    fontSize: theme.typography.fontSize.sm,
                    textDecoration: 'none',
                  }}
                >
                  New Arrivals
                </a>
                <a
                  href="/search"
                  onClick={(e) => {
                    e.preventDefault();
                    navigation?.navigate('Search');
                  }}
                  style={{
                    color: theme.colors.primary,
                    fontSize: theme.typography.fontSize.sm,
                    textDecoration: 'none',
                  }}
                >
                  Search
                </a>
                <a
                  href="/pages/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    navigation?.navigate('Page', { handle: 'contact' });
                  }}
                  style={{
                    color: theme.colors.primary,
                    fontSize: theme.typography.fontSize.sm,
                    textDecoration: 'none',
                  }}
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </ContainerBlock>
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

export default NotFoundScreen;
