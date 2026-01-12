// =============================================================================
// Menu Block (Draftbit pattern)
// =============================================================================

import React, { useState } from 'react';
import { TanqoryTheme } from '../../themes';
import type { Menu, MenuItem } from '../../apis/StoreApi';

// =============================================================================
// Types
// =============================================================================

export interface MenuBlockProps {
  menu?: Menu;
  items?: MenuItem[];
  orientation?: 'horizontal' | 'vertical';
  showDropdown?: boolean;
  activeItem?: string;
  onItemClick?: (item: MenuItem) => void;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const MenuBlockSchema = {
  name: 'Menu',
  tag: 'nav',
  settings: [
    {
      id: 'orientation',
      type: 'select',
      label: 'Orientation',
      options: [
        { value: 'horizontal', label: 'Horizontal' },
        { value: 'vertical', label: 'Vertical' },
      ],
      default: 'horizontal',
    },
    {
      id: 'showDropdown',
      type: 'checkbox',
      label: 'Show dropdown for nested items',
      default: true,
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function MenuBlock({
  menu,
  items,
  orientation = 'horizontal',
  showDropdown = true,
  activeItem,
  onItemClick,
  className,
}: MenuBlockProps) {
  const theme = TanqoryTheme;
  const menuItems = items || menu?.items || [];

  if (menuItems.length === 0) {
    return null;
  }

  const isHorizontal = orientation === 'horizontal';

  const navStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: isHorizontal ? 'row' : 'column',
    gap: isHorizontal ? theme.spacing.lg : theme.spacing.sm,
    alignItems: isHorizontal ? 'center' : 'flex-start',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  };

  return (
    <nav className={className}>
      <ul style={navStyle} role="menubar">
        {menuItems.map((item) => (
          <MenuItemComponent
            key={item.id}
            item={item}
            isActive={activeItem === item.url}
            showDropdown={showDropdown}
            isHorizontal={isHorizontal}
            onItemClick={onItemClick}
          />
        ))}
      </ul>
    </nav>
  );
}

// =============================================================================
// Menu Item Component
// =============================================================================

interface MenuItemComponentProps {
  item: MenuItem;
  isActive: boolean;
  showDropdown: boolean;
  isHorizontal: boolean;
  onItemClick?: (item: MenuItem) => void;
}

function MenuItemComponent({
  item,
  isActive,
  showDropdown,
  isHorizontal,
  onItemClick,
}: MenuItemComponentProps) {
  const theme = TanqoryTheme;
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.items && item.items.length > 0;

  const linkStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing['2xs'],
    color: isActive ? theme.colors.foreground : theme.colors.foregroundSecondary,
    textDecoration: 'none',
    fontSize: theme.typography.fontSize.sm,
    fontWeight: isActive ? theme.typography.fontWeight.medium : theme.typography.fontWeight.regular,
    padding: `${theme.spacing.xs} 0`,
    transition: `color ${theme.transitions.fast} ${theme.transitions.easing}`,
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    fontFamily: 'inherit',
  };

  const dropdownStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    left: 0,
    minWidth: '200px',
    backgroundColor: theme.colors.background,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borderRadius.md,
    boxShadow: theme.shadows.lg,
    padding: theme.spacing.xs,
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? 'visible' : 'hidden',
    transform: isOpen ? 'translateY(0)' : 'translateY(-10px)',
    transition: `all ${theme.transitions.fast} ${theme.transitions.easing}`,
    zIndex: theme.zIndex.dropdown,
  };

  const handleClick = (e: React.MouseEvent) => {
    if (hasChildren && showDropdown) {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else {
      onItemClick?.(item);
    }
  };

  const handleMouseEnter = () => {
    if (hasChildren && showDropdown && isHorizontal) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (hasChildren && showDropdown && isHorizontal) {
      setIsOpen(false);
    }
  };

  return (
    <li
      style={{ position: 'relative' }}
      role="none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {item.url ? (
        <a
          href={item.url}
          style={linkStyle}
          role="menuitem"
          onClick={handleClick}
        >
          {item.title}
          {hasChildren && showDropdown && (
            <ChevronIcon isOpen={isOpen} />
          )}
        </a>
      ) : (
        <button
          type="button"
          style={linkStyle}
          role="menuitem"
          onClick={handleClick}
          aria-haspopup={hasChildren ? 'true' : undefined}
          aria-expanded={hasChildren ? isOpen : undefined}
        >
          {item.title}
          {hasChildren && showDropdown && (
            <ChevronIcon isOpen={isOpen} />
          )}
        </button>
      )}

      {/* Dropdown */}
      {hasChildren && showDropdown && (
        <ul style={dropdownStyle} role="menu">
          {item.items!.map((child) => (
            <li key={child.id} role="none">
              <a
                href={child.url}
                style={{
                  display: 'block',
                  padding: `${theme.spacing.xs} ${theme.spacing.md}`,
                  color: theme.colors.foreground,
                  textDecoration: 'none',
                  fontSize: theme.typography.fontSize.sm,
                  borderRadius: theme.borderRadius.sm,
                  transition: `background-color ${theme.transitions.fast} ${theme.transitions.easing}`,
                }}
                role="menuitem"
                onClick={() => onItemClick?.(child)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = theme.colors.backgroundSecondary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {child.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

// =============================================================================
// Chevron Icon
// =============================================================================

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  const theme = TanqoryTheme;

  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transition: `transform ${theme.transitions.fast} ${theme.transitions.easing}`,
        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default MenuBlock;
