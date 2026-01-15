// =============================================================================
// Header Section (Draftbit pattern)
// =============================================================================

import React, { useState } from 'react';
import { TanqoryTheme } from '../../themes';
import { LogoBlock } from '../blocks/LogoBlock';
import { MenuBlock } from '../blocks/MenuBlock';
import { SearchInputBlock } from '../blocks/SearchInputBlock';
import { IconBlock } from '../blocks/IconBlock';
import { DrawerBlock } from '../blocks/DrawerBlock';
import { ContainerBlock } from '../blocks/ContainerBlock';
import type { Menu, MenuItem } from '../../apis/StoreApi';

// =============================================================================
// Types
// =============================================================================

export interface HeaderSectionProps {
  logo?: {
    src?: string;
    alt?: string;
    text?: string;
    width?: number;
  };
  menu?: Menu;
  showSearch?: boolean;
  showCart?: boolean;
  showAccount?: boolean;
  cartCount?: number;
  sticky?: boolean;
  transparent?: boolean;
  onCartClick?: () => void;
  onAccountClick?: () => void;
  onSearchSubmit?: (query: string) => void;
  onMenuItemClick?: (item: MenuItem) => void;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const HeaderSectionSchema = {
  name: 'Header',
  tag: 'header',
  settings: [
    {
      type: 'header',
      content: 'Logo',
    },
    {
      id: 'logo_src',
      type: 'image_picker',
      label: 'Logo image',
    },
    {
      id: 'logo_text',
      type: 'text',
      label: 'Logo text (fallback)',
    },
    {
      id: 'logo_width',
      type: 'range',
      label: 'Logo width',
      min: 60,
      max: 200,
      step: 10,
      unit: 'px',
      default: 120,
    },
    {
      type: 'header',
      content: 'Navigation',
    },
    {
      id: 'menu',
      type: 'link_list',
      label: 'Navigation menu',
    },
    {
      type: 'header',
      content: 'Actions',
    },
    {
      id: 'showSearch',
      type: 'checkbox',
      label: 'Show search',
      default: true,
    },
    {
      id: 'showCart',
      type: 'checkbox',
      label: 'Show cart icon',
      default: true,
    },
    {
      id: 'showAccount',
      type: 'checkbox',
      label: 'Show account icon',
      default: true,
    },
    {
      type: 'header',
      content: 'Style',
    },
    {
      id: 'sticky',
      type: 'checkbox',
      label: 'Sticky header',
      default: true,
    },
    {
      id: 'transparent',
      type: 'checkbox',
      label: 'Transparent background',
      default: false,
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function HeaderSection({
  logo,
  menu,
  showSearch = true,
  showCart = true,
  showAccount = true,
  cartCount = 0,
  sticky = true,
  transparent = false,
  onCartClick,
  onAccountClick,
  onSearchSubmit,
  onMenuItemClick,
  className,
}: HeaderSectionProps) {
  const theme = TanqoryTheme;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const headerStyle: React.CSSProperties = {
    position: sticky ? 'sticky' : 'relative',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: transparent ? 'transparent' : theme.colors.background,
    borderBottom: transparent ? 'none' : `1px solid ${theme.colors.border}`,
    zIndex: theme.zIndex.sticky,
  };

  const innerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '64px',
    gap: theme.spacing.lg,
  };

  const leftStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.lg,
  };

  const rightStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.md,
  };

  const iconButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: theme.borderRadius.full,
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    position: 'relative',
  };

  return (
    <>
      <header data-section="HeaderSection" style={headerStyle} className={className}>
        <ContainerBlock>
          <div style={innerStyle}>
            {/* Left: Menu button (mobile) + Logo */}
            <div style={leftStyle}>
              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                style={{
                  ...iconButtonStyle,
                  display: 'none', // Show on mobile via CSS
                }}
                aria-label="Open menu"
                className="mobile-menu-button"
              >
                <IconBlock name="menu" size={24} />
              </button>

              {/* Logo */}
              <LogoBlock
                src={logo?.src}
                alt={logo?.alt}
                text={logo?.text}
                width={logo?.width || 120}
              />

              {/* Desktop Navigation */}
              <nav style={{ display: 'block' }} className="desktop-nav">
                <MenuBlock
                  menu={menu}
                  orientation="horizontal"
                  onItemClick={onMenuItemClick}
                />
              </nav>
            </div>

            {/* Right: Actions */}
            <div style={rightStyle}>
              {/* Search */}
              {showSearch && (
                <>
                  {/* Desktop search */}
                  <div style={{ width: '240px' }} className="desktop-search">
                    <SearchInputBlock
                      placeholder="Search..."
                      size="sm"
                      onSearch={onSearchSubmit}
                    />
                  </div>

                  {/* Mobile search button */}
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(true)}
                    style={iconButtonStyle}
                    aria-label="Search"
                    className="mobile-search-button"
                  >
                    <IconBlock name="search" size={24} />
                  </button>
                </>
              )}

              {/* Account */}
              {showAccount && (
                <button
                  type="button"
                  onClick={onAccountClick}
                  style={iconButtonStyle}
                  aria-label="Account"
                >
                  <IconBlock name="user" size={24} />
                </button>
              )}

              {/* Cart */}
              {showCart && (
                <button
                  type="button"
                  onClick={onCartClick}
                  style={iconButtonStyle}
                  aria-label="Cart"
                >
                  <IconBlock name="cart" size={24} />
                  {cartCount > 0 && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '2px',
                        right: '2px',
                        minWidth: '18px',
                        height: '18px',
                        borderRadius: theme.borderRadius.full,
                        backgroundColor: theme.colors.primary,
                        color: theme.colors.secondary,
                        fontSize: theme.typography.fontSize.xs,
                        fontWeight: theme.typography.fontWeight.medium,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: `0 ${theme.spacing['2xs']}`,
                      }}
                    >
                      {cartCount > 99 ? '99+' : cartCount}
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>
        </ContainerBlock>
      </header>

      {/* Mobile Menu Drawer */}
      <DrawerBlock
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        position="left"
        title="Menu"
      >
        <MenuBlock
          menu={menu}
          orientation="vertical"
          onItemClick={(item) => {
            setIsMobileMenuOpen(false);
            onMenuItemClick?.(item);
          }}
        />
      </DrawerBlock>

      {/* Mobile Search Drawer */}
      <DrawerBlock
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        position="right"
        title="Search"
      >
        <SearchInputBlock
          placeholder="Search products..."
          onSearch={(query) => {
            setIsSearchOpen(false);
            onSearchSubmit?.(query);
          }}
        />
      </DrawerBlock>

      {/* Responsive styles */}
      <style>
        {`
          @media (max-width: ${theme.breakpoints.md}) {
            .desktop-nav { display: none !important; }
            .desktop-search { display: none !important; }
            .mobile-menu-button { display: flex !important; }
          }
          @media (min-width: ${theme.breakpoints.md}) {
            .mobile-search-button { display: none !important; }
          }
        `}
      </style>
    </>
  );
}

export default HeaderSection;
