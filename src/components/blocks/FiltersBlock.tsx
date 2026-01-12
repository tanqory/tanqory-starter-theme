// =============================================================================
// Filters Block (Draftbit pattern)
// =============================================================================

import React, { useState } from 'react';
import { TanqoryTheme } from '../../themes';

// =============================================================================
// Types
// =============================================================================

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface Filter {
  id: string;
  label: string;
  type: 'checkbox' | 'radio' | 'range' | 'color';
  options?: FilterOption[];
  min?: number;
  max?: number;
  unit?: string;
}

export interface ActiveFilters {
  [filterId: string]: string | string[] | [number, number];
}

// Re-export ActiveFilters as FilterState for backward compatibility
export type FilterState = ActiveFilters;

export interface FiltersBlockProps {
  filters: Filter[];
  activeFilters?: ActiveFilters;
  layout?: 'vertical' | 'horizontal';
  collapsible?: boolean;
  showCounts?: boolean;
  showClearAll?: boolean;
  onFilterChange?: (filters: ActiveFilters) => void;
  onClearAll?: () => void;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const FiltersBlockSchema = {
  name: 'Filters',
  tag: 'aside',
  settings: [
    {
      id: 'layout',
      type: 'select',
      label: 'Layout',
      options: [
        { value: 'vertical', label: 'Vertical' },
        { value: 'horizontal', label: 'Horizontal' },
      ],
      default: 'vertical',
    },
    {
      id: 'collapsible',
      type: 'checkbox',
      label: 'Collapsible sections',
      default: true,
    },
    {
      id: 'showCounts',
      type: 'checkbox',
      label: 'Show option counts',
      default: true,
    },
    {
      id: 'showClearAll',
      type: 'checkbox',
      label: 'Show clear all button',
      default: true,
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function FiltersBlock({
  filters,
  activeFilters = {},
  layout = 'vertical',
  collapsible = true,
  showCounts = true,
  showClearAll = true,
  onFilterChange,
  onClearAll,
  className,
}: FiltersBlockProps) {
  const theme = TanqoryTheme;
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(filters.map((f) => f.id))
  );

  const hasActiveFilters = Object.keys(activeFilters).length > 0;

  const toggleSection = (filterId: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(filterId)) {
        next.delete(filterId);
      } else {
        next.add(filterId);
      }
      return next;
    });
  };

  const handleCheckboxChange = (filterId: string, value: string, checked: boolean) => {
    const current = (activeFilters[filterId] as string[]) || [];
    let updated: string[];

    if (checked) {
      updated = [...current, value];
    } else {
      updated = current.filter((v) => v !== value);
    }

    onFilterChange?.({
      ...activeFilters,
      [filterId]: updated.length > 0 ? updated : undefined,
    } as ActiveFilters);
  };

  const handleRadioChange = (filterId: string, value: string) => {
    onFilterChange?.({
      ...activeFilters,
      [filterId]: value,
    });
  };

  const isHorizontal = layout === 'horizontal';

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: isHorizontal ? 'row' : 'column',
    gap: isHorizontal ? theme.spacing.lg : theme.spacing.md,
    flexWrap: isHorizontal ? 'wrap' : undefined,
  };

  return (
    <aside style={containerStyle} className={className}>
      {/* Clear All Button */}
      {showClearAll && hasActiveFilters && (
        <div
          style={{
            width: isHorizontal ? '100%' : undefined,
            marginBottom: theme.spacing.sm,
          }}
        >
          <button
            type="button"
            onClick={onClearAll}
            style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.foregroundSecondary,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
            }}
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Filter Sections */}
      {filters.map((filter) => (
        <FilterSection
          key={filter.id}
          filter={filter}
          isOpen={openSections.has(filter.id)}
          onToggle={() => collapsible && toggleSection(filter.id)}
          activeValue={activeFilters[filter.id]}
          showCounts={showCounts}
          collapsible={collapsible}
          isHorizontal={isHorizontal}
          onCheckboxChange={(value, checked) =>
            handleCheckboxChange(filter.id, value, checked)
          }
          onRadioChange={(value) => handleRadioChange(filter.id, value)}
        />
      ))}
    </aside>
  );
}

// =============================================================================
// Filter Section Component
// =============================================================================

interface FilterSectionProps {
  filter: Filter;
  isOpen: boolean;
  onToggle: () => void;
  activeValue?: string | string[] | [number, number];
  showCounts: boolean;
  collapsible: boolean;
  isHorizontal: boolean;
  onCheckboxChange: (value: string, checked: boolean) => void;
  onRadioChange: (value: string) => void;
}

function FilterSection({
  filter,
  isOpen,
  onToggle,
  activeValue,
  showCounts,
  collapsible,
  isHorizontal,
  onCheckboxChange,
  onRadioChange,
}: FilterSectionProps) {
  const theme = TanqoryTheme;

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: `${theme.spacing.sm} 0`,
    border: 'none',
    background: 'transparent',
    cursor: collapsible ? 'pointer' : 'default',
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.foreground,
  };

  const contentStyle: React.CSSProperties = {
    overflow: 'hidden',
    maxHeight: isOpen ? '1000px' : '0',
    opacity: isOpen ? 1 : 0,
    transition: `all ${theme.transitions.normal} ${theme.transitions.easing}`,
    paddingBottom: isOpen ? theme.spacing.sm : 0,
  };

  const renderOptions = () => {
    if (!filter.options) return null;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing.xs,
        }}
      >
        {filter.options.map((option) => {
          const isChecked =
            filter.type === 'checkbox'
              ? (activeValue as string[] | undefined)?.includes(option.value)
              : activeValue === option.value;

          return (
            <label
              key={option.value}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.sm,
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.foreground,
                cursor: 'pointer',
              }}
            >
              <input
                type={filter.type === 'checkbox' ? 'checkbox' : 'radio'}
                name={filter.id}
                value={option.value}
                checked={isChecked}
                onChange={(e) =>
                  filter.type === 'checkbox'
                    ? onCheckboxChange(option.value, e.target.checked)
                    : onRadioChange(option.value)
                }
                style={{
                  width: '16px',
                  height: '16px',
                  margin: 0,
                  accentColor: theme.colors.primary,
                }}
              />
              <span style={{ flex: 1 }}>{option.label}</span>
              {showCounts && option.count !== undefined && (
                <span style={{ color: theme.colors.foregroundMuted }}>
                  ({option.count})
                </span>
              )}
            </label>
          );
        })}
      </div>
    );
  };

  return (
    <div
      style={{
        borderBottom: !isHorizontal ? `1px solid ${theme.colors.border}` : undefined,
        minWidth: isHorizontal ? '150px' : undefined,
      }}
    >
      {collapsible ? (
        <button type="button" onClick={onToggle} style={headerStyle}>
          <span>{filter.label}</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: `transform ${theme.transitions.fast} ${theme.transitions.easing}`,
            }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      ) : (
        <div style={headerStyle}>{filter.label}</div>
      )}

      <div style={contentStyle}>{renderOptions()}</div>
    </div>
  );
}

export default FiltersBlock;
