// =============================================================================
// Home Screen (Template-driven)
// =============================================================================

import React, { useEffect } from 'react';
import { useGlobalVariable, useSetGlobalVariable, getLogoUrl } from '../config/GlobalVariableContext';
import { HeaderSection } from '../components/sections/HeaderSection';
import { FooterSection } from '../components/sections/FooterSection';
import { AnnouncementBarSection } from '../components/sections/AnnouncementBarSection';
import { TemplateRenderer } from '../components/sections/SectionRenderer';
import { useTemplate } from '../hooks/useTemplate';
import { useStoreGET } from '../apis';

// =============================================================================
// Types
// =============================================================================

export interface HomeScreenProps {
  navigation?: {
    navigate: (screen: string, params?: Record<string, unknown>) => void;
  };
  route?: {
    params?: Record<string, unknown>;
  };
}

// =============================================================================
// Screen
// =============================================================================

export function HomeScreen({ navigation }: HomeScreenProps) {
  const { STORE_CONFIG, ANNOUNCEMENT_BAR } = useGlobalVariable();
  const setGlobalVariable = useSetGlobalVariable();
  const logoUrl = getLogoUrl(STORE_CONFIG);

  // Load template for home screen
  const { sections, loading: templateLoading, isReady } = useTemplate('home');

  // Fetch store config on mount
  const { data: storeData } = useStoreGET({});

  useEffect(() => {
    if (storeData) {
      setGlobalVariable('STORE_CONFIG', storeData);
    }
  }, [storeData, setGlobalVariable]);

  // Sample announcements
  const announcements = (ANNOUNCEMENT_BAR as { announcements?: { message: string; link?: string; linkText?: string }[] })?.announcements || [
    { message: 'Free shipping on orders over $50', link: '/shipping' },
    { message: 'New collection just dropped!', link: '/collections/new' },
  ];

  // Footer columns (from store config or default)
  const footerColumns = [
    {
      title: 'Shop',
      links: [
        { label: 'All Products', url: '/collections/all' },
        { label: 'New Arrivals', url: '/collections/new-arrivals' },
        { label: 'Best Sellers', url: '/collections/best-sellers' },
        { label: 'Sale', url: '/collections/sale' },
      ],
    },
    {
      title: 'Help',
      links: [
        { label: 'Contact Us', url: '/pages/contact' },
        { label: 'FAQs', url: '/pages/faq' },
        { label: 'Shipping', url: '/pages/shipping' },
        { label: 'Returns', url: '/pages/returns' },
      ],
    },
    {
      title: 'About',
      links: [
        { label: 'Our Story', url: '/pages/about' },
        { label: 'Sustainability', url: '/pages/sustainability' },
        { label: 'Careers', url: '/pages/careers' },
        { label: 'Press', url: '/pages/press' },
      ],
    },
  ];

  // Social links
  const socialLinks = [
    { platform: 'facebook' as const, url: 'https://facebook.com' },
    { platform: 'instagram' as const, url: 'https://instagram.com' },
    { platform: 'twitter' as const, url: 'https://twitter.com' },
  ];

  const handleNavigate = (href: string) => {
    if (href.startsWith('/products/')) {
      navigation?.navigate('Product', { handle: href.replace('/products/', '') });
    } else if (href.startsWith('/collections/')) {
      navigation?.navigate('Collection', { handle: href.replace('/collections/', '') });
    } else if (href.startsWith('/pages/')) {
      navigation?.navigate('Page', { handle: href.replace('/pages/', '') });
    } else if (href === '/cart') {
      navigation?.navigate('Cart');
    } else if (href === '/search') {
      navigation?.navigate('Search');
    }
  };

  const handleProductClick = (product: unknown) => {
    const p = product as { handle?: string };
    if (p.handle) {
      navigation?.navigate('Product', { handle: p.handle });
    }
  };

  const handleCollectionClick = (collection: unknown) => {
    const c = collection as { handle?: string };
    if (c.handle) {
      navigation?.navigate('Collection', { handle: c.handle });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Announcement Bar */}
      <AnnouncementBarSection
        announcements={announcements}
        style="carousel"
        autoRotate
        dismissible
      />

      {/* Header */}
      <HeaderSection
        logo={{
          src: logoUrl,
          alt: STORE_CONFIG?.name || 'Store',
        }}
        showSearch
        showCart
        sticky
        onCartClick={() => handleNavigate('/cart')}
        onSearchSubmit={(query) => navigation?.navigate('Search', { query })}
      />

      {/* Main Content - Template Driven */}
      <main style={{ flex: 1 }}>
        {templateLoading ? (
          // Loading state
          <div style={{ padding: '40px', textAlign: 'center' }}>
            Loading...
          </div>
        ) : (
          // Render sections from template
          <TemplateRenderer
            sections={sections}
            onProductClick={handleProductClick}
            onCollectionClick={handleCollectionClick}
          />
        )}
      </main>

      {/* Footer */}
      <FooterSection
        logo={{
          src: logoUrl,
          alt: STORE_CONFIG?.name || 'Store',
        }}
        columns={footerColumns}
        showNewsletter={false}
        socialLinks={socialLinks}
        copyrightText={`© ${new Date().getFullYear()} ${STORE_CONFIG?.name || 'Store'}. All rights reserved.`}
      />
    </div>
  );
}

export default HomeScreen;
