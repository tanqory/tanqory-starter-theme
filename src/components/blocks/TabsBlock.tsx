// =============================================================================
// Tabs Block (Draftbit pattern)
// =============================================================================

import React, { useState } from 'react';
import { TanqoryTheme } from '../../themes';

// =============================================================================
// Types
// =============================================================================

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsBlockProps {
  tabs: TabItem[];
  defaultTabId?: string;
  variant?: 'underline' | 'pills' | 'enclosed';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  onChange?: (tabId: string) => void;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const TabsBlockSchema = {
  name: 'Tabs',
  tag: 'div',
  settings: [
    {
      id: 'variant',
      type: 'select',
      label: 'Variant',
      options: [
        { value: 'underline', label: 'Underline' },
        { value: 'pills', label: 'Pills' },
        { value: 'enclosed', label: 'Enclosed' },
      ],
      default: 'underline',
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
    {
      id: 'fullWidth',
      type: 'checkbox',
      label: 'Full width tabs',
      default: false,
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function TabsBlock({
  tabs,
  defaultTabId,
  variant = 'underline',
  size = 'md',
  fullWidth = false,
  onChange,
  className,
}: TabsBlockProps) {
  const theme = TanqoryTheme;
  const [activeTabId, setActiveTabId] = useState(defaultTabId || tabs[0]?.id);

  const handleTabClick = (tabId: string) => {
    setActiveTabId(tabId);
    onChange?.(tabId);
  };

  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  // Size mappings
  const sizeMap = {
    sm: {
      padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
      fontSize: theme.typography.fontSize.sm,
    },
    md: {
      padding: `${theme.spacing.sm} ${theme.spacing.md}`,
      fontSize: theme.typography.fontSize.base,
    },
    lg: {
      padding: `${theme.spacing.md} ${theme.spacing.lg}`,
      fontSize: theme.typography.fontSize.lg,
    },
  };

  const sizes = sizeMap[size];

  // Variant styles
  const getTabListStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      display: 'flex',
      gap: variant === 'pills' ? theme.spacing.xs : 0,
    };

    switch (variant) {
      case 'underline':
        return {
          ...base,
          borderBottom: `1px solid ${theme.colors.border}`,
        };
      case 'enclosed':
        return {
          ...base,
          borderBottom: `1px solid ${theme.colors.border}`,
        };
      case 'pills':
        return {
          ...base,
          backgroundColor: theme.colors.backgroundSecondary,
          padding: theme.spacing['2xs'],
          borderRadius: theme.borderRadius.md,
        };
      default:
        return base;
    }
  };

  const getTabStyle = (isActive: boolean, isDisabled: boolean): React.CSSProperties => {
    const base: React.CSSProperties = {
      padding: sizes.padding,
      fontSize: sizes.fontSize,
      fontWeight: isActive ? theme.typography.fontWeight.medium : theme.typography.fontWeight.regular,
      border: 'none',
      background: 'transparent',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      opacity: isDisabled ? 0.5 : 1,
      transition: `all ${theme.transitions.fast} ${theme.transitions.easing}`,
      flex: fullWidth ? 1 : undefined,
      textAlign: 'center',
    };

    switch (variant) {
      case 'underline':
        return {
          ...base,
          color: isActive ? theme.colors.primary : theme.colors.foregroundSecondary,
          borderBottom: isActive ? `2px solid ${theme.colors.primary}` : '2px solid transparent',
          marginBottom: '-1px',
        };
      case 'enclosed':
        return {
          ...base,
          color: isActive ? theme.colors.foreground : theme.colors.foregroundSecondary,
          backgroundColor: isActive ? theme.colors.background : 'transparent',
          borderTopLeftRadius: theme.borderRadius.md,
          borderTopRightRadius: theme.borderRadius.md,
          border: isActive ? `1px solid ${theme.colors.border}` : '1px solid transparent',
          borderBottom: isActive ? `1px solid ${theme.colors.background}` : '1px solid transparent',
          marginBottom: '-1px',
        };
      case 'pills':
        return {
          ...base,
          color: isActive ? theme.colors.foreground : theme.colors.foregroundSecondary,
          backgroundColor: isActive ? theme.colors.background : 'transparent',
          borderRadius: theme.borderRadius.sm,
          boxShadow: isActive ? theme.shadows.sm : 'none',
        };
      default:
        return base;
    }
  };

  return (
    <div className={className}>
      {/* Tab List */}
      <div role="tablist" style={getTabListStyle()}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={tab.id === activeTabId}
            aria-controls={`tabpanel-${tab.id}`}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && handleTabClick(tab.id)}
            style={getTabStyle(tab.id === activeTabId, !!tab.disabled)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panel */}
      {activeTab && (
        <div
          role="tabpanel"
          id={`tabpanel-${activeTab.id}`}
          aria-labelledby={activeTab.id}
          style={{
            padding: `${theme.spacing.lg} 0`,
          }}
        >
          {activeTab.content}
        </div>
      )}
    </div>
  );
}

export default TabsBlock;
