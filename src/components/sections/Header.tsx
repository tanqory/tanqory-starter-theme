import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, Search, User } from 'lucide-react';
import { cn } from '../../lib/utils';

// =============================================================================
// Types
// =============================================================================

export interface MenuItem {
  label: string;
  href: string;
  children?: MenuItem[];
}

export interface HeaderProps {
  // Logo
  logoText?: string;
  logoImage?: string;
  logoPosition?: 'left' | 'center' | 'right';

  // Menu
  menuItems?: MenuItem[];
  menuPosition?: 'left' | 'center' | 'right';

  // Features
  showSearch?: boolean;
  showCart?: boolean;
  showAccount?: boolean;

  // Appearance
  stickyHeader?: 'always' | 'scroll-up' | 'never';
  sectionHeight?: 'compact' | 'standard';
  sectionWidth?: 'page' | 'full';
  colorScheme?: 'light' | 'dark';
  transparentOnHome?: boolean;

  // Border
  borderWidth?: number;

  // External state (from store)
  cartItemCount?: number;
}

// =============================================================================
// Component
// =============================================================================

export function Header({
  logoText = 'Store',
  logoImage,
  logoPosition = 'center',
  menuItems = [],
  menuPosition = 'left',
  showSearch = true,
  showCart = true,
  showAccount = false,
  stickyHeader = 'always',
  sectionHeight = 'standard',
  sectionWidth = 'page',
  colorScheme = 'light',
  borderWidth = 1,
  cartItemCount = 0,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Default menu items if empty
  const displayMenuItems: MenuItem[] = menuItems.length > 0 ? menuItems : [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Collections', href: '/collections' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const paddingY = sectionHeight === 'compact' ? 'py-2' : 'py-4';

  // Build column order based on positions
  const renderLogo = () => (
    <Link to="/" className="flex items-center gap-2">
      {logoImage ? (
        <img src={logoImage} alt={logoText} className="h-8" />
      ) : (
        <span className="font-bold text-xl">{logoText}</span>
      )}
    </Link>
  );

  const renderMenu = () => (
    <nav className="hidden md:flex items-center gap-6">
      {displayMenuItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className="text-sm font-medium hover:opacity-70 transition-opacity"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );

  const renderActions = () => (
    <div className="flex items-center gap-2">
      {showSearch && (
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="p-2 hover:opacity-70 transition-opacity"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>
      )}
      {showAccount && (
        <Link
          to="/account"
          className="p-2 hover:opacity-70 transition-opacity hidden md:block"
          aria-label="Account"
        >
          <User className="w-5 h-5" />
        </Link>
      )}
      {showCart && (
        <Link
          to="/cart"
          className="p-2 hover:opacity-70 transition-opacity relative"
          aria-label="Cart"
        >
          <ShoppingCart className="w-5 h-5" />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-xs rounded-full flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </Link>
      )}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="p-2 md:hidden hover:opacity-70 transition-opacity"
        aria-label="Menu"
      >
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
    </div>
  );

  return (
    <header
      className={cn(
        stickyHeader === 'always' && 'sticky top-0 z-50',
        colorScheme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      )}
      style={{
        borderBottomWidth: `${borderWidth}px`,
        borderBottomStyle: 'solid',
        borderBottomColor: colorScheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
      }}
    >
      <div
        className={cn(
          paddingY,
          sectionWidth === 'page' ? 'container mx-auto px-4' : 'px-4'
        )}
      >
        {/* Three-column layout */}
        <div className="grid grid-cols-3 items-center gap-4">
          {/* Left column */}
          <div className={cn(
            'flex items-center gap-6',
            logoPosition === 'left' && 'justify-start',
            menuPosition === 'left' && logoPosition !== 'left' && 'justify-start'
          )}>
            {logoPosition === 'left' && renderLogo()}
            {menuPosition === 'left' && logoPosition !== 'left' && renderMenu()}
          </div>

          {/* Center column */}
          <div className="flex items-center justify-center">
            {logoPosition === 'center' && renderLogo()}
            {menuPosition === 'center' && logoPosition !== 'center' && renderMenu()}
          </div>

          {/* Right column */}
          <div className="flex items-center justify-end gap-4">
            {logoPosition === 'right' && renderLogo()}
            {menuPosition === 'right' && logoPosition !== 'right' && renderMenu()}
            {renderActions()}
          </div>
        </div>
      </div>

      {/* Search overlay */}
      {isSearchOpen && (
        <div className={cn(
          'absolute top-full left-0 right-0 p-4',
          colorScheme === 'dark' ? 'bg-gray-900' : 'bg-white'
        )}>
          <div className={cn(
            sectionWidth === 'page' ? 'container mx-auto' : ''
          )}>
            <input
              type="search"
              placeholder="Search products..."
              className={cn(
                'w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2',
                colorScheme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-white focus:ring-white'
                  : 'bg-white border-gray-300 text-gray-900 focus:ring-black'
              )}
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300',
          colorScheme === 'dark' ? 'bg-gray-900' : 'bg-white',
          isMenuOpen ? 'max-h-96' : 'max-h-0'
        )}
      >
        <nav className="px-4 py-4 flex flex-col gap-2">
          {displayMenuItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="py-2 text-base font-medium hover:opacity-70 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {showAccount && (
            <Link
              to="/account"
              className="py-2 text-base font-medium hover:opacity-70 transition-opacity flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="w-5 h-5" />
              Account
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

// =============================================================================
// Section Definition (for Studio)
// =============================================================================

export const headerDefinition = {
  id: 'header',
  name: 'Header',
  description: 'Site header with logo, navigation, and actions',
  category: 'layout',
  icon: 'LayoutTop',

  propsSchema: [
    // Logo
    { type: 'header', label: 'Logo' },
    { name: 'logoText', label: 'Logo Text', type: 'text', default: 'Store' },
    { name: 'logoImage', label: 'Logo Image', type: 'image' },
    {
      name: 'logoPosition',
      label: 'Logo Position',
      type: 'select',
      options: [
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'right', label: 'Right' },
      ],
      default: 'center'
    },

    // Menu
    { type: 'header', label: 'Menu' },
    {
      name: 'menuPosition',
      label: 'Menu Position',
      type: 'select',
      options: [
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'right', label: 'Right' },
      ],
      default: 'left'
    },

    // Features
    { type: 'header', label: 'Features' },
    { name: 'showSearch', label: 'Show Search', type: 'checkbox', default: true },
    { name: 'showCart', label: 'Show Cart', type: 'checkbox', default: true },
    { name: 'showAccount', label: 'Show Account', type: 'checkbox', default: false },

    // Appearance
    { type: 'header', label: 'Appearance' },
    {
      name: 'sectionWidth',
      label: 'Width',
      type: 'select',
      options: [
        { value: 'page', label: 'Page Width' },
        { value: 'full', label: 'Full Width' },
      ],
      default: 'page'
    },
    {
      name: 'sectionHeight',
      label: 'Height',
      type: 'select',
      options: [
        { value: 'compact', label: 'Compact' },
        { value: 'standard', label: 'Standard' },
      ],
      default: 'standard'
    },
    {
      name: 'stickyHeader',
      label: 'Sticky Behavior',
      type: 'select',
      options: [
        { value: 'always', label: 'Always Sticky' },
        { value: 'scroll-up', label: 'On Scroll Up' },
        { value: 'never', label: 'Never' },
      ],
      default: 'always'
    },
    {
      name: 'colorScheme',
      label: 'Color Scheme',
      type: 'select',
      options: [
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
      ],
      default: 'light'
    },
    { name: 'borderWidth', label: 'Border Width', type: 'range', min: 0, max: 5, default: 1 },
  ],

  defaultProps: {
    logoText: 'Store',
    logoPosition: 'center',
    menuPosition: 'left',
    showSearch: true,
    showCart: true,
    showAccount: false,
    stickyHeader: 'always',
    sectionHeight: 'standard',
    sectionWidth: 'page',
    colorScheme: 'light',
    borderWidth: 1,
  },

  component: Header,
};
