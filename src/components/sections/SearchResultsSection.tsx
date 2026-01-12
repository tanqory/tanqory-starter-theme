// =============================================================================
// Search Results Section (Draftbit pattern)
// =============================================================================

import React, { useState } from 'react';
import { TanqoryTheme, SectionStyles } from '../../themes';
import { ContainerBlock } from '../blocks/ContainerBlock';
import { HeadingBlock } from '../blocks/HeadingBlock';
import { TextBlock } from '../blocks/TextBlock';
import { ProductCardBlock } from '../blocks/ProductCardBlock';
import { PaginationBlock } from '../blocks/PaginationBlock';
import { FiltersBlock, type ActiveFilters } from '../blocks/FiltersBlock';
import { useSearchGET } from '../../apis';
import type { Product } from '../../apis';

// =============================================================================
// Types
// =============================================================================

export interface SearchResultsSectionProps {
  query: string;
  showFilters?: boolean;
  showSort?: boolean;
  columns?: 2 | 3 | 4;
  productsPerPage?: number;
  showPrice?: boolean;
  showCompareAtPrice?: boolean;
  backgroundColor?: string;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const SearchResultsSectionSchema = {
  name: 'Search Results',
  tag: 'section',
  settings: [
    {
      type: 'header',
      content: 'Layout',
    },
    {
      id: 'showFilters',
      type: 'checkbox',
      label: 'Show filters',
      default: true,
    },
    {
      id: 'showSort',
      type: 'checkbox',
      label: 'Show sort',
      default: true,
    },
    {
      id: 'columns',
      type: 'range',
      label: 'Columns',
      min: 2,
      max: 4,
      step: 1,
      default: 3,
    },
    {
      id: 'productsPerPage',
      type: 'range',
      label: 'Products per page',
      min: 8,
      max: 48,
      step: 4,
      default: 12,
    },
    {
      type: 'header',
      content: 'Product Card',
    },
    {
      id: 'showPrice',
      type: 'checkbox',
      label: 'Show price',
      default: true,
    },
    {
      id: 'showComparePrice',
      type: 'checkbox',
      label: 'Show compare price',
      default: true,
    },
    {
      id: 'showRating',
      type: 'checkbox',
      label: 'Show rating',
      default: false,
    },
    {
      id: 'backgroundColor',
      type: 'color',
      label: 'Background color',
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function SearchResultsSection({
  query,
  showFilters = true,
  showSort = true,
  columns = 3,
  productsPerPage = 12,
  showPrice = true,
  showCompareAtPrice = true,
  backgroundColor,
  className,
}: SearchResultsSectionProps) {
  const theme = TanqoryTheme;
  const sectionStyles = SectionStyles(theme);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('relevance');
  const [filters, setFilters] = useState<ActiveFilters>({});

  // Search API call
  const { data, isLoading: loading, error, refetch } = useSearchGET({
    query,
    limit: productsPerPage,
  });

  const sectionStyle: React.CSSProperties = {
    ...sectionStyles.base,
    backgroundColor: backgroundColor || theme.colors.background,
  };

  const headerStyle: React.CSSProperties = {
    marginBottom: theme.spacing.xl,
  };

  const layoutStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: showFilters ? '280px 1fr' : '1fr',
    gap: theme.spacing.xl,
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: theme.spacing.lg,
  };

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest' },
    { value: 'best-selling', label: 'Best Selling' },
  ];

  const handleFilterChange = (newFilters: ActiveFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  const products = data?.products || [];
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <section style={sectionStyle} className={className}>
      <ContainerBlock>
        {/* Header */}
        <div style={headerStyle}>
          <HeadingBlock
            text={`Search results for "${query}"`}
            level="h1"
          />
          <TextBlock
            text={loading ? 'Searching...' : `${totalProducts} results found`}
            preset="body"
            color={theme.colors.foregroundMuted}
          />
        </div>

        {/* Layout */}
        <div style={layoutStyle} className="search-layout">
          {/* Filters Sidebar */}
          {showFilters && (
            <aside>
              <FiltersBlock
                filters={[]}
                activeFilters={filters}
                onFilterChange={handleFilterChange}
              />
            </aside>
          )}

          {/* Main Content */}
          <div>
            {/* Sort Bar */}
            {showSort && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: theme.spacing.lg,
                  paddingBottom: theme.spacing.md,
                  borderBottom: `1px solid ${theme.colors.border}`,
                }}
              >
                <span
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.foregroundMuted,
                  }}
                >
                  {totalProducts} products
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
                  <label
                    style={{
                      fontSize: theme.typography.fontSize.sm,
                      color: theme.colors.foregroundMuted,
                    }}
                  >
                    Sort by:
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    style={{
                      padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                      borderRadius: theme.borderRadius.md,
                      border: `1px solid ${theme.colors.border}`,
                      backgroundColor: theme.colors.background,
                      fontSize: theme.typography.fontSize.sm,
                      color: theme.colors.foreground,
                      cursor: 'pointer',
                    }}
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Results */}
            {loading ? (
              <div style={gridStyle}>
                {Array.from({ length: productsPerPage }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </div>
            ) : error ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: theme.spacing['3xl'],
                  color: theme.colors.foregroundMuted,
                }}
              >
                <p>Something went wrong. Please try again.</p>
                <button
                  onClick={() => refetch()}
                  style={{
                    marginTop: theme.spacing.md,
                    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
                    backgroundColor: theme.colors.primary,
                    color: 'white',
                    border: 'none',
                    borderRadius: theme.borderRadius.md,
                    cursor: 'pointer',
                  }}
                >
                  Retry
                </button>
              </div>
            ) : products.length === 0 ? (
              <NoResults query={query} />
            ) : (
              <>
                <div style={gridStyle} className="search-results-grid">
                  {products.map((product: Product) => (
                    <ProductCardBlock
                      key={product.id}
                      product={product}
                      showPrice={showPrice}
                      showCompareAtPrice={showCompareAtPrice}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div style={{ marginTop: theme.spacing['2xl'] }}>
                    <PaginationBlock
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Responsive styles */}
        <style>
          {`
            @media (max-width: ${theme.breakpoints.lg}) {
              .search-layout {
                grid-template-columns: 1fr !important;
              }
              .search-results-grid {
                grid-template-columns: repeat(${Math.min(columns, 3)}, 1fr) !important;
              }
            }
            @media (max-width: ${theme.breakpoints.md}) {
              .search-results-grid {
                grid-template-columns: repeat(2, 1fr) !important;
              }
            }
            @media (max-width: ${theme.breakpoints.sm}) {
              .search-results-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}
        </style>
      </ContainerBlock>
    </section>
  );
}

// =============================================================================
// No Results Component
// =============================================================================

function NoResults({ query }: { query: string }) {
  const theme = TanqoryTheme;

  return (
    <div
      style={{
        textAlign: 'center',
        padding: theme.spacing['3xl'],
      }}
    >
      <svg
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke={theme.colors.foregroundMuted}
        strokeWidth="1"
        style={{ margin: '0 auto', marginBottom: theme.spacing.lg }}
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <h3
        style={{
          fontSize: theme.typography.fontSize.xl,
          fontWeight: theme.typography.fontWeight.semibold,
          color: theme.colors.foreground,
          marginBottom: theme.spacing.sm,
        }}
      >
        No results found
      </h3>
      <p
        style={{
          fontSize: theme.typography.fontSize.base,
          color: theme.colors.foregroundMuted,
          marginBottom: theme.spacing.lg,
        }}
      >
        We couldn't find any products matching "{query}"
      </p>
      <p
        style={{
          fontSize: theme.typography.fontSize.sm,
          color: theme.colors.foregroundMuted,
        }}
      >
        Try checking your spelling or using different keywords
      </p>
    </div>
  );
}

// =============================================================================
// Product Card Skeleton Component
// =============================================================================

function ProductCardSkeleton() {
  const theme = TanqoryTheme;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing.sm,
      }}
    >
      <div
        style={{
          width: '100%',
          paddingTop: '100%',
          backgroundColor: theme.colors.backgroundSecondary,
          borderRadius: theme.borderRadius.md,
          animation: 'pulse 1.5s ease-in-out infinite',
        }}
      />
      <div
        style={{
          height: '16px',
          backgroundColor: theme.colors.backgroundSecondary,
          borderRadius: theme.borderRadius.sm,
          width: '80%',
          animation: 'pulse 1.5s ease-in-out infinite',
        }}
      />
      <div
        style={{
          height: '14px',
          backgroundColor: theme.colors.backgroundSecondary,
          borderRadius: theme.borderRadius.sm,
          width: '40%',
          animation: 'pulse 1.5s ease-in-out infinite',
        }}
      />
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

export default SearchResultsSection;
