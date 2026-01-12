import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail } from 'lucide-react';
import { cn } from '../../lib/utils';

// =============================================================================
// Types
// =============================================================================

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterProps {
  // Content
  columns?: FooterColumn[];
  showNewsletter?: boolean;
  newsletterHeading?: string;
  newsletterText?: string;

  // Social
  showSocialLinks?: boolean;
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  youtubeUrl?: string;

  // Copyright
  copyrightText?: string;
  showPaymentIcons?: boolean;

  // Layout
  sectionWidth?: 'page' | 'full';
  gap?: number;

  // Appearance
  colorScheme?: 'light' | 'dark';

  // Spacing
  paddingTop?: number;
  paddingBottom?: number;
}

// =============================================================================
// Component
// =============================================================================

export function Footer({
  columns = [],
  showNewsletter = true,
  newsletterHeading = 'Subscribe to our newsletter',
  newsletterText = 'Get exclusive offers and early access to new products',
  showSocialLinks = true,
  facebookUrl,
  instagramUrl,
  twitterUrl,
  youtubeUrl,
  copyrightText,
  showPaymentIcons = true,
  sectionWidth = 'page',
  gap = 32,
  colorScheme = 'dark',
  paddingTop = 48,
  paddingBottom = 24,
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  // Default columns if empty
  const displayColumns: FooterColumn[] = columns.length > 0 ? columns : [
    {
      title: 'Shop',
      links: [
        { label: 'All Products', href: '/products' },
        { label: 'New Arrivals', href: '/collections/new' },
        { label: 'Best Sellers', href: '/collections/best-sellers' },
        { label: 'Sale', href: '/collections/sale' },
      ],
    },
    {
      title: 'Help',
      links: [
        { label: 'Contact Us', href: '/contact' },
        { label: 'Shipping & Returns', href: '/shipping' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Track Order', href: '/track-order' },
      ],
    },
    {
      title: 'About',
      links: [
        { label: 'Our Story', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Press', href: '/press' },
        { label: 'Blog', href: '/blog' },
      ],
    },
  ];

  const hasSocialLinks = facebookUrl || instagramUrl || twitterUrl || youtubeUrl;

  return (
    <footer
      className={cn(
        colorScheme === 'dark' ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-600'
      )}
      style={{
        paddingTop: `${paddingTop}px`,
        paddingBottom: `${paddingBottom}px`,
      }}
    >
      <div className={cn(
        sectionWidth === 'page' ? 'container mx-auto px-4' : 'px-4'
      )}>
        {/* Main footer content */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          style={{ gap: `${gap}px` }}
        >
          {/* Newsletter column */}
          {showNewsletter && (
            <div className="lg:col-span-1">
              <h3 className={cn(
                'font-semibold mb-4',
                colorScheme === 'dark' ? 'text-white' : 'text-gray-900'
              )}>
                {newsletterHeading}
              </h3>
              <p className="text-sm mb-4">{newsletterText}</p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className={cn(
                    'flex-1 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2',
                    colorScheme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white focus:ring-white'
                      : 'bg-white border-gray-300 text-gray-900 focus:ring-black'
                  )}
                />
                <button
                  type="submit"
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    colorScheme === 'dark'
                      ? 'bg-white text-gray-900 hover:bg-gray-100'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  )}
                >
                  <Mail className="w-5 h-5" />
                </button>
              </form>
            </div>
          )}

          {/* Link columns */}
          {displayColumns.map((column, index) => (
            <div key={index}>
              <h3 className={cn(
                'font-semibold mb-4',
                colorScheme === 'dark' ? 'text-white' : 'text-gray-900'
              )}>
                {column.title}
              </h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.href}
                      className="text-sm hover:opacity-70 transition-opacity"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className={cn(
            'mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4',
            colorScheme === 'dark' ? 'border-t border-gray-800' : 'border-t border-gray-300'
          )}
        >
          {/* Social links */}
          {showSocialLinks && hasSocialLinks && (
            <div className="flex items-center gap-4">
              {facebookUrl && (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {twitterUrl && (
                <a
                  href={twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {youtubeUrl && (
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              )}
            </div>
          )}

          {/* Copyright */}
          <p className="text-sm">
            {copyrightText || `© ${currentYear} Store. All rights reserved.`}
          </p>

          {/* Payment icons placeholder */}
          {showPaymentIcons && (
            <div className="flex items-center gap-2">
              {['Visa', 'MC', 'Amex', 'PayPal'].map((payment) => (
                <div
                  key={payment}
                  className={cn(
                    'px-2 py-1 rounded text-xs font-medium',
                    colorScheme === 'dark' ? 'bg-gray-800' : 'bg-white'
                  )}
                >
                  {payment}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

// =============================================================================
// Section Definition (for Studio)
// =============================================================================

export const footerDefinition = {
  id: 'footer',
  name: 'Footer',
  description: 'Site footer with links, newsletter, and social',
  category: 'layout',
  icon: 'LayoutBottom',

  propsSchema: [
    // Newsletter
    { type: 'header', label: 'Newsletter' },
    { name: 'showNewsletter', label: 'Show Newsletter', type: 'checkbox', default: true },
    { name: 'newsletterHeading', label: 'Heading', type: 'text', default: 'Subscribe to our newsletter' },
    { name: 'newsletterText', label: 'Text', type: 'text', default: 'Get exclusive offers and early access to new products' },

    // Social Links
    { type: 'header', label: 'Social Links' },
    { name: 'showSocialLinks', label: 'Show Social Links', type: 'checkbox', default: true },
    { name: 'facebookUrl', label: 'Facebook URL', type: 'url' },
    { name: 'instagramUrl', label: 'Instagram URL', type: 'url' },
    { name: 'twitterUrl', label: 'Twitter URL', type: 'url' },
    { name: 'youtubeUrl', label: 'YouTube URL', type: 'url' },

    // Copyright
    { type: 'header', label: 'Copyright' },
    { name: 'copyrightText', label: 'Copyright Text', type: 'text' },
    { name: 'showPaymentIcons', label: 'Show Payment Icons', type: 'checkbox', default: true },

    // Layout
    { type: 'header', label: 'Layout' },
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
    { name: 'gap', label: 'Gap', type: 'range', min: 0, max: 64, default: 32 },

    // Appearance
    { type: 'header', label: 'Appearance' },
    {
      name: 'colorScheme',
      label: 'Color Scheme',
      type: 'select',
      options: [
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
      ],
      default: 'dark'
    },

    // Spacing
    { type: 'header', label: 'Spacing' },
    { name: 'paddingTop', label: 'Top Padding', type: 'range', min: 0, max: 100, default: 48 },
    { name: 'paddingBottom', label: 'Bottom Padding', type: 'range', min: 0, max: 100, default: 24 },
  ],

  defaultProps: {
    showNewsletter: true,
    newsletterHeading: 'Subscribe to our newsletter',
    newsletterText: 'Get exclusive offers and early access to new products',
    showSocialLinks: true,
    showPaymentIcons: true,
    sectionWidth: 'page',
    gap: 32,
    colorScheme: 'dark',
    paddingTop: 48,
    paddingBottom: 24,
  },

  component: Footer,
};
