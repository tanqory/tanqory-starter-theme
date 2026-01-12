// =============================================================================
// Search Input Block (Draftbit pattern)
// =============================================================================

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { TanqoryTheme, InputStyles } from '../../themes';
import { usePredictiveSearchGET } from '../../apis/SearchApi';
import type { Product } from '../../apis/ProductsApi';
import type { Collection } from '../../apis/CollectionsApi';

// =============================================================================
// Types
// =============================================================================

export interface SearchInputBlockProps {
  placeholder?: string;
  showPredictive?: boolean;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onSearch?: (query: string) => void;
  onResultClick?: (result: Product | Collection) => void;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const SearchInputBlockSchema = {
  name: 'Search Input',
  tag: 'div',
  settings: [
    {
      id: 'placeholder',
      type: 'text',
      label: 'Placeholder',
      default: 'Search products...',
    },
    {
      id: 'showPredictive',
      type: 'checkbox',
      label: 'Show predictive results',
      default: true,
    },
    {
      id: 'showIcon',
      type: 'checkbox',
      label: 'Show search icon',
      default: true,
    },
    {
      id: 'size',
      type: 'select',
      label: 'Size',
      options: [
        { value: 'sm', label: 'Small' },
        { value: 'md', label: 'Medium' },
        { value: 'lg', label: 'Large' },
      ],
      default: 'md',
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function SearchInputBlock({
  placeholder = 'Search products...',
  showPredictive = true,
  showIcon = true,
  size = 'md',
  onSearch,
  onResultClick,
  className,
}: SearchInputBlockProps) {
  const theme = TanqoryTheme;
  const inputStyles = InputStyles(theme);

  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Predictive search
  const { data: predictiveData, isLoading } = usePredictiveSearchGET(
    query,
    5,
    { enabled: showPredictive && query.length >= 2 }
  );

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) {
        onSearch?.(query.trim());
        setIsFocused(false);
      }
    },
    [query, onSearch]
  );

  const handleResultClick = useCallback(
    (result: Product | Collection) => {
      setQuery('');
      setIsFocused(false);
      onResultClick?.(result);
    },
    [onResultClick]
  );

  // Size mappings
  const sizeMap = {
    sm: {
      padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
      fontSize: theme.typography.fontSize.sm,
      iconSize: 16,
    },
    md: {
      padding: `${theme.spacing.sm} ${theme.spacing.md}`,
      fontSize: theme.typography.fontSize.base,
      iconSize: 20,
    },
    lg: {
      padding: `${theme.spacing.md} ${theme.spacing.lg}`,
      fontSize: theme.typography.fontSize.lg,
      iconSize: 24,
    },
  };

  const sizes = sizeMap[size];

  const showDropdown =
    showPredictive &&
    isFocused &&
    query.length >= 2 &&
    (predictiveData?.products?.length || predictiveData?.collections?.length);

  return (
    <div ref={containerRef} style={{ position: 'relative' }} className={className}>
      <form onSubmit={handleSubmit}>
        <div style={{ position: 'relative' }}>
          {/* Search Icon */}
          {showIcon && (
            <div
              style={{
                position: 'absolute',
                left: theme.spacing.md,
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
                color: theme.colors.foregroundMuted,
              }}
            >
              <svg
                width={sizes.iconSize}
                height={sizes.iconSize}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          )}

          {/* Input */}
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder={placeholder}
            style={{
              ...inputStyles.base,
              width: '100%',
              padding: sizes.padding,
              paddingLeft: showIcon ? `calc(${theme.spacing.md} + ${sizes.iconSize}px + ${theme.spacing.xs})` : sizes.padding,
              fontSize: sizes.fontSize,
              ...(isFocused && inputStyles.focus),
            }}
          />

          {/* Loading indicator */}
          {isLoading && (
            <div
              style={{
                position: 'absolute',
                right: theme.spacing.md,
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke={theme.colors.foregroundMuted}
                strokeWidth="2"
                style={{ animation: 'spin 1s linear infinite' }}
              >
                <circle cx="8" cy="8" r="6" strokeDasharray="31.4" strokeDashoffset="10" />
              </svg>
            </div>
          )}
        </div>
      </form>

      {/* Predictive Results Dropdown */}
      {showDropdown && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: theme.spacing.xs,
            backgroundColor: theme.colors.background,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: theme.borderRadius.md,
            boxShadow: theme.shadows.lg,
            zIndex: theme.zIndex.dropdown,
            maxHeight: '400px',
            overflow: 'auto',
          }}
        >
          {/* Collections */}
          {predictiveData?.collections && predictiveData.collections.length > 0 && (
            <div>
              <div
                style={{
                  padding: `${theme.spacing.xs} ${theme.spacing.md}`,
                  fontSize: theme.typography.fontSize.xs,
                  fontWeight: theme.typography.fontWeight.medium,
                  color: theme.colors.foregroundMuted,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  borderBottom: `1px solid ${theme.colors.border}`,
                }}
              >
                Collections
              </div>
              {predictiveData.collections.map((collection) => (
                <button
                  key={collection.id}
                  type="button"
                  onClick={() => handleResultClick(collection)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme.spacing.sm,
                    padding: theme.spacing.sm,
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  {collection.image && (
                    <img
                      src={collection.image.src}
                      alt=""
                      style={{
                        width: '40px',
                        height: '40px',
                        objectFit: 'cover',
                        borderRadius: theme.borderRadius.sm,
                      }}
                    />
                  )}
                  <span style={{ fontSize: theme.typography.fontSize.sm }}>
                    {collection.title}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Products */}
          {predictiveData?.products && predictiveData.products.length > 0 && (
            <div>
              <div
                style={{
                  padding: `${theme.spacing.xs} ${theme.spacing.md}`,
                  fontSize: theme.typography.fontSize.xs,
                  fontWeight: theme.typography.fontWeight.medium,
                  color: theme.colors.foregroundMuted,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  borderBottom: `1px solid ${theme.colors.border}`,
                  borderTop: predictiveData.collections?.length ? `1px solid ${theme.colors.border}` : undefined,
                }}
              >
                Products
              </div>
              {predictiveData.products.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => handleResultClick(product)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme.spacing.sm,
                    padding: theme.spacing.sm,
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  {product.featuredImage && (
                    <img
                      src={product.featuredImage.src}
                      alt=""
                      style={{
                        width: '40px',
                        height: '40px',
                        objectFit: 'cover',
                        borderRadius: theme.borderRadius.sm,
                      }}
                    />
                  )}
                  <div>
                    <div style={{ fontSize: theme.typography.fontSize.sm }}>
                      {product.title}
                    </div>
                    <div
                      style={{
                        fontSize: theme.typography.fontSize.xs,
                        color: theme.colors.foregroundMuted,
                      }}
                    >
                      ${product.price.toFixed(2)}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchInputBlock;
