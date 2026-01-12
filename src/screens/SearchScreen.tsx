// =============================================================================
// Search Screen (Draftbit pattern)
// =============================================================================

import React, { useState, useCallback, useEffect } from 'react';
import { useGlobalVariable, getLogoUrl } from '../config/GlobalVariableContext';
import { HeaderSection } from '../components/sections/HeaderSection';
import { FooterSection } from '../components/sections/FooterSection';
import { SearchResultsSection } from '../components/sections/SearchResultsSection';
import { ContainerBlock } from '../components/blocks/ContainerBlock';
import { HeadingBlock } from '../components/blocks/HeadingBlock';
import { TanqoryTheme } from '../themes';

// =============================================================================
// Types
// =============================================================================

export interface SearchScreenProps {
  navigation?: {
    navigate: (screen: string, params?: Record<string, unknown>) => void;
    goBack: () => void;
  };
  route?: {
    params?: {
      query?: string;
    };
  };
}

// =============================================================================
// Screen
// =============================================================================

export function SearchScreen({ navigation, route }: SearchScreenProps) {
  const theme = TanqoryTheme;
  const { STORE_CONFIG } = useGlobalVariable();
  const logoUrl = getLogoUrl(STORE_CONFIG);
  const initialQuery = route?.params?.query || '';
  const [query, setQuery] = useState(initialQuery);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Popular searches
  const popularSearches = [
    'Dresses',
    'Shirts',
    'Jeans',
    'Sneakers',
    'Jackets',
    'Accessories',
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

  const handleSearch = (value: string) => {
    setQuery(value);
  };

  const handlePopularSearchClick = (term: string) => {
    setQuery(term);
    setSearchQuery(term);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <HeaderSection
        logo={{ src: logoUrl, alt: STORE_CONFIG?.name || 'Store' }}
        showSearch={false}
        showCart
        sticky
        onCartClick={() => handleNavigate('/cart')}
      />

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        {/* Search Header */}
        <section
          style={{
            backgroundColor: theme.colors.backgroundSecondary,
            padding: `${theme.spacing['3xl']} 0`,
          }}
        >
          <ContainerBlock>
            <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
              <HeadingBlock text="Search" level="h1" alignment="center" />
              <div style={{ marginTop: theme.spacing.lg }}>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  autoFocus
                  style={{
                    width: '100%',
                    padding: `${theme.spacing.md} ${theme.spacing.lg}`,
                    fontSize: theme.typography.fontSize.lg,
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: theme.borderRadius.lg,
                    outline: 'none',
                  }}
                />
              </div>

              {/* Popular Searches */}
              {!searchQuery && (
                <div style={{ marginTop: theme.spacing.lg }}>
                  <p
                    style={{
                      fontSize: theme.typography.fontSize.sm,
                      color: theme.colors.foregroundMuted,
                      marginBottom: theme.spacing.sm,
                    }}
                  >
                    Popular searches:
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: theme.spacing.sm,
                      justifyContent: 'center',
                    }}
                  >
                    {popularSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => handlePopularSearchClick(term)}
                        style={{
                          padding: `${theme.spacing.xs} ${theme.spacing.md}`,
                          backgroundColor: theme.colors.background,
                          border: `1px solid ${theme.colors.border}`,
                          borderRadius: theme.borderRadius.full,
                          fontSize: theme.typography.fontSize.sm,
                          color: theme.colors.foreground,
                          cursor: 'pointer',
                          transition: `all ${theme.transitions.fast} ${theme.transitions.easing}`,
                        }}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ContainerBlock>
        </section>

        {/* Search Results */}
        {searchQuery ? (
          <SearchResultsSection
            query={searchQuery}
            showFilters
            showSort
            columns={4}
            productsPerPage={24}
          />
        ) : (
          <section style={{ padding: `${theme.spacing['3xl']} 0` }}>
            <ContainerBlock>
              <div style={{ textAlign: 'center', color: theme.colors.foregroundMuted }}>
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  style={{ margin: '0 auto', marginBottom: theme.spacing.lg, opacity: 0.5 }}
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <p style={{ fontSize: theme.typography.fontSize.lg }}>
                  Start typing to search for products
                </p>
              </div>
            </ContainerBlock>
          </section>
        )}
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

export default SearchScreen;
