// =============================================================================
// Cart Screen (Draftbit pattern)
// =============================================================================

import React from 'react';
import { useGlobalVariable, getLogoUrl } from '../config/GlobalVariableContext';
import { HeaderSection } from '../components/sections/HeaderSection';
import { FooterSection } from '../components/sections/FooterSection';
import { CartSection } from '../components/sections/CartSection';
import { RecentlyViewedSection } from '../components/sections/RecentlyViewedSection';
import { BreadcrumbBlock } from '../components/blocks/BreadcrumbBlock';
import { ContainerBlock } from '../components/blocks/ContainerBlock';
import { TanqoryTheme } from '../themes';

// =============================================================================
// Types
// =============================================================================

export interface CartScreenProps {
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

export function CartScreen({ navigation }: CartScreenProps) {
  const theme = TanqoryTheme;
  const { STORE_CONFIG } = useGlobalVariable();
  const logoUrl = getLogoUrl(STORE_CONFIG);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Shopping Cart' },
  ];

  const handleNavigate = (href: string) => {
    if (href.startsWith('/products/')) {
      navigation?.navigate('Product', { handle: href.replace('/products/', '') });
    } else if (href.startsWith('/collections/')) {
      navigation?.navigate('Collection', { handle: href.replace('/collections/', '') });
    } else if (href === '/') {
      navigation?.navigate('Home');
    } else if (href === '/checkout') {
      // External checkout URL
      window.location.href = '/checkout';
    }
  };

  const handleCheckout = () => {
    // Redirect to checkout
    window.location.href = '/checkout';
  };

  const handleContinueShopping = () => {
    navigation?.navigate('Home');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <HeaderSection
        logo={{ src: logoUrl, alt: STORE_CONFIG?.name || 'Store' }}
        showSearch
        showCart
        sticky
        onCartClick={() => {}}
      />

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        {/* Breadcrumbs */}
        <div style={{ backgroundColor: theme.colors.backgroundSecondary, padding: `${theme.spacing.md} 0` }}>
          <ContainerBlock>
            <BreadcrumbBlock items={breadcrumbs} />
          </ContainerBlock>
        </div>

        {/* Cart Section */}
        <CartSection
          title="Shopping Cart"
          onCheckout={handleCheckout}
          continueShopping={{
            label: 'Continue Shopping',
            link: '/',
          }}
        />

        {/* Recently Viewed */}
        <RecentlyViewedSection
          title="Recently Viewed"
          description="Continue where you left off"
          maxProducts={4}
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

export default CartScreen;
