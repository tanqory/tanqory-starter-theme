// =============================================================================
// Account Screen (Draftbit pattern)
// =============================================================================

import React from 'react';
import { useGlobalVariable, useSetGlobalVariable, getLogoUrl } from '../config/GlobalVariableContext';
import { HeaderSection } from '../components/sections/HeaderSection';
import { FooterSection } from '../components/sections/FooterSection';
import { ContainerBlock } from '../components/blocks/ContainerBlock';
import { HeadingBlock } from '../components/blocks/HeadingBlock';
import { ButtonBlock } from '../components/blocks/ButtonBlock';
import { TanqoryTheme } from '../themes';

// =============================================================================
// Types
// =============================================================================

export interface AccountScreenProps {
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

export function AccountScreen({ navigation }: AccountScreenProps) {
  const theme = TanqoryTheme;
  const { STORE_CONFIG, AUTH_TOKEN, CUSTOMER } = useGlobalVariable();
  const logoUrl = getLogoUrl(STORE_CONFIG);
  const setGlobalVariable = useSetGlobalVariable();

  const isLoggedIn = !!AUTH_TOKEN;

  const handleNavigate = (href: string) => {
    if (href === '/') {
      navigation?.navigate('Home');
    } else if (href === '/cart') {
      navigation?.navigate('Cart');
    }
  };

  const handleLogout = () => {
    setGlobalVariable('AUTH_TOKEN', null);
    setGlobalVariable('CUSTOMER', null);
    navigation?.navigate('Home');
  };

  // Redirect to login if not authenticated
  if (!isLoggedIn) {
    navigation?.navigate('Login');
    return null;
  }

  const menuItems = [
    {
      id: 'orders',
      label: 'Order History',
      description: 'View your past orders',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M7 8h10M7 12h6" />
        </svg>
      ),
      href: '/account/orders',
    },
    {
      id: 'addresses',
      label: 'Addresses',
      description: 'Manage your addresses',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      href: '/account/addresses',
    },
    {
      id: 'profile',
      label: 'Profile',
      description: 'Edit your profile information',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      href: '/account/profile',
    },
    {
      id: 'wishlist',
      label: 'Wishlist',
      description: 'View your saved items',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      ),
      href: '/account/wishlist',
    },
  ];

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
      <main style={{ flex: 1, padding: `${theme.spacing['3xl']} 0` }}>
        <ContainerBlock>
          {/* Header */}
          <div style={{ marginBottom: theme.spacing['2xl'] }}>
            <HeadingBlock text="My Account" level="h1" />
            <p
              style={{
                marginTop: theme.spacing.sm,
                color: theme.colors.foregroundMuted,
                fontSize: theme.typography.fontSize.base,
              }}
            >
              Welcome back, {CUSTOMER?.firstName || 'Customer'}
            </p>
          </div>

          {/* Account Menu */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: theme.spacing.lg,
              marginBottom: theme.spacing['2xl'],
            }}
          >
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigation?.navigate(item.href)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: theme.spacing.md,
                  padding: theme.spacing.lg,
                  backgroundColor: theme.colors.background,
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: theme.borderRadius.lg,
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: `all ${theme.transitions.fast} ${theme.transitions.easing}`,
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: theme.borderRadius.md,
                    backgroundColor: theme.colors.backgroundSecondary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: theme.colors.primary,
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: theme.typography.fontSize.lg,
                      fontWeight: theme.typography.fontWeight.semibold,
                      color: theme.colors.foreground,
                      margin: 0,
                      marginBottom: theme.spacing.xs,
                    }}
                  >
                    {item.label}
                  </h3>
                  <p
                    style={{
                      fontSize: theme.typography.fontSize.sm,
                      color: theme.colors.foregroundMuted,
                      margin: 0,
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Logout Button */}
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={handleLogout}
              style={{
                padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
                backgroundColor: 'transparent',
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.borderRadius.md,
                color: theme.colors.foreground,
                fontSize: theme.typography.fontSize.sm,
                cursor: 'pointer',
                transition: `all ${theme.transitions.fast} ${theme.transitions.easing}`,
              }}
            >
              Sign Out
            </button>
          </div>
        </ContainerBlock>
      </main>

      {/* Footer */}
      <FooterSection
        logo={{ src: logoUrl, alt: STORE_CONFIG?.name || 'Store' }}
        columns={[]}
        copyrightText={`© ${new Date().getFullYear()} ${STORE_CONFIG?.name || 'Store'}. All rights reserved.`}
      />

      {/* Responsive styles */}
      <style>
        {`
          @media (max-width: ${theme.breakpoints.md}) {
            .account-menu {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export default AccountScreen;
