// =============================================================================
// Pagination Block (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme } from '../../themes';

// =============================================================================
// Types
// =============================================================================

export interface PaginationBlockProps {
  currentPage: number;
  totalPages: number;
  maxVisiblePages?: number;
  showPrevNext?: boolean;
  showFirstLast?: boolean;
  prevLabel?: string;
  nextLabel?: string;
  onPageChange?: (page: number) => void;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const PaginationBlockSchema = {
  name: 'Pagination',
  tag: 'nav',
  settings: [
    {
      id: 'maxVisiblePages',
      type: 'range',
      label: 'Max visible pages',
      min: 3,
      max: 10,
      step: 1,
      default: 5,
    },
    {
      id: 'showPrevNext',
      type: 'checkbox',
      label: 'Show prev/next buttons',
      default: true,
    },
    {
      id: 'showFirstLast',
      type: 'checkbox',
      label: 'Show first/last buttons',
      default: false,
    },
    {
      id: 'prevLabel',
      type: 'text',
      label: 'Previous label',
      default: 'Previous',
    },
    {
      id: 'nextLabel',
      type: 'text',
      label: 'Next label',
      default: 'Next',
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function PaginationBlock({
  currentPage,
  totalPages,
  maxVisiblePages = 5,
  showPrevNext = true,
  showFirstLast = false,
  prevLabel = 'Previous',
  nextLabel = 'Next',
  onPageChange,
  className,
}: PaginationBlockProps) {
  const theme = TanqoryTheme;

  if (totalPages <= 1) return null;

  // Calculate visible page range
  const getPageRange = (): (number | 'ellipsis')[] => {
    const pages: (number | 'ellipsis')[] = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Add first page and ellipsis if needed
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('ellipsis');
      }
    }

    // Add visible pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add last page and ellipsis if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('ellipsis');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageRange();

  const buttonBaseStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '36px',
    height: '36px',
    padding: `0 ${theme.spacing.sm}`,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borderRadius.md,
    backgroundColor: 'transparent',
    color: theme.colors.foreground,
    fontSize: theme.typography.fontSize.sm,
    cursor: 'pointer',
    transition: `all ${theme.transitions.fast} ${theme.transitions.easing}`,
  };

  const activeButtonStyle: React.CSSProperties = {
    ...buttonBaseStyle,
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
    color: theme.colors.secondary,
  };

  const disabledButtonStyle: React.CSSProperties = {
    ...buttonBaseStyle,
    opacity: 0.5,
    cursor: 'not-allowed',
  };

  return (
    <nav aria-label="Pagination" className={className}>
      <ul
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.xs,
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }}
      >
        {/* First button */}
        {showFirstLast && (
          <li>
            <button
              type="button"
              onClick={() => onPageChange?.(1)}
              disabled={currentPage === 1}
              style={currentPage === 1 ? disabledButtonStyle : buttonBaseStyle}
              aria-label="Go to first page"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="11 17 6 12 11 7" />
                <polyline points="18 17 13 12 18 7" />
              </svg>
            </button>
          </li>
        )}

        {/* Previous button */}
        {showPrevNext && (
          <li>
            <button
              type="button"
              onClick={() => onPageChange?.(currentPage - 1)}
              disabled={currentPage === 1}
              style={currentPage === 1 ? disabledButtonStyle : buttonBaseStyle}
              aria-label="Go to previous page"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px' }}>
                <polyline points="15 18 9 12 15 6" />
              </svg>
              {prevLabel}
            </button>
          </li>
        )}

        {/* Page numbers */}
        {pages.map((page, index) =>
          page === 'ellipsis' ? (
            <li key={`ellipsis-${index}`}>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '36px',
                  height: '36px',
                  color: theme.colors.foregroundMuted,
                }}
              >
                ...
              </span>
            </li>
          ) : (
            <li key={page}>
              <button
                type="button"
                onClick={() => onPageChange?.(page)}
                style={page === currentPage ? activeButtonStyle : buttonBaseStyle}
                aria-label={`Go to page ${page}`}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            </li>
          )
        )}

        {/* Next button */}
        {showPrevNext && (
          <li>
            <button
              type="button"
              onClick={() => onPageChange?.(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={currentPage === totalPages ? disabledButtonStyle : buttonBaseStyle}
              aria-label="Go to next page"
            >
              {nextLabel}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '4px' }}>
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </li>
        )}

        {/* Last button */}
        {showFirstLast && (
          <li>
            <button
              type="button"
              onClick={() => onPageChange?.(totalPages)}
              disabled={currentPage === totalPages}
              style={currentPage === totalPages ? disabledButtonStyle : buttonBaseStyle}
              aria-label="Go to last page"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="13 17 18 12 13 7" />
                <polyline points="6 17 11 12 6 7" />
              </svg>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default PaginationBlock;
