// =============================================================================
// Footer Section (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme } from '../../themes';
import { ContainerBlock } from '../blocks/ContainerBlock';
import { LogoBlock } from '../blocks/LogoBlock';
import { EmailSignupBlock } from '../blocks/EmailSignupBlock';
import { SocialLinksBlock, SocialLink } from '../blocks/SocialLinksBlock';
import type { Menu } from '../../apis/StoreApi';

// =============================================================================
// Types
// =============================================================================

export interface FooterColumn {
  title: string;
  links: { label: string; url: string }[];
}

export interface FooterSectionProps {
  logo?: {
    src?: string;
    alt?: string;
    text?: string;
  };
  description?: string;
  columns?: FooterColumn[];
  menu?: Menu;
  showNewsletter?: boolean;
  newsletterTitle?: string;
  newsletterDescription?: string;
  socialLinks?: SocialLink[];
  copyrightText?: string;
  paymentIcons?: string[];
  onNewsletterSubmit?: (email: string) => Promise<void>;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const FooterSectionSchema = {
  name: 'Footer',
  tag: 'footer',
  settings: [
    {
      type: 'header',
      content: 'Logo & Description',
    },
    {
      id: 'logo_src',
      type: 'image_picker',
      label: 'Logo image',
    },
    {
      id: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      type: 'header',
      content: 'Newsletter',
    },
    {
      id: 'showNewsletter',
      type: 'checkbox',
      label: 'Show newsletter signup',
      default: true,
    },
    {
      id: 'newsletterTitle',
      type: 'text',
      label: 'Newsletter title',
      default: 'Subscribe to our newsletter',
    },
    {
      id: 'newsletterDescription',
      type: 'text',
      label: 'Newsletter description',
      default: 'Get the latest updates on new products and upcoming sales.',
    },
    {
      type: 'header',
      content: 'Legal',
    },
    {
      id: 'copyrightText',
      type: 'text',
      label: 'Copyright text',
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function FooterSection({
  logo,
  description,
  columns = [],
  menu,
  showNewsletter = true,
  newsletterTitle = 'Subscribe to our newsletter',
  newsletterDescription = 'Get the latest updates on new products and upcoming sales.',
  socialLinks = [],
  copyrightText,
  paymentIcons = [],
  onNewsletterSubmit,
  className,
}: FooterSectionProps) {
  const theme = TanqoryTheme;

  // Build columns from menu if not provided
  const footerColumns = columns.length > 0 ? columns : (menu?.items || []).map(item => ({
    title: item.title,
    links: (item.items || []).map(subItem => ({
      label: subItem.title,
      url: subItem.url || '#',
    })),
  }));

  const footerStyle: React.CSSProperties = {
    backgroundColor: theme.colors.backgroundSecondary,
    paddingTop: theme.spacing['3xl'],
    paddingBottom: theme.spacing['2xl'],
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: theme.spacing['2xl'],
    marginBottom: theme.spacing['2xl'],
  };

  const columnStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.foreground,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: theme.spacing.xs,
  };

  const linkStyle: React.CSSProperties = {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.foregroundSecondary,
    textDecoration: 'none',
    transition: `color ${theme.transitions.fast} ${theme.transitions.easing}`,
  };

  const bottomStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    borderTop: `1px solid ${theme.colors.border}`,
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer style={footerStyle} className={className}>
      <ContainerBlock>
        <div style={gridStyle}>
          {/* Logo & Description Column */}
          <div style={{ ...columnStyle, maxWidth: '300px' }}>
            <LogoBlock
              src={logo?.src}
              alt={logo?.alt}
              text={logo?.text}
              link="/"
            />
            {description && (
              <p
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.foregroundSecondary,
                  lineHeight: theme.typography.lineHeight.relaxed,
                  margin: `${theme.spacing.sm} 0 0 0`,
                }}
              >
                {description}
              </p>
            )}
            {socialLinks.length > 0 && (
              <div style={{ marginTop: theme.spacing.md }}>
                <SocialLinksBlock links={socialLinks} size={20} gap={12} />
              </div>
            )}
          </div>

          {/* Link Columns */}
          {footerColumns.map((column, index) => (
            <div key={index} style={columnStyle}>
              <h3 style={titleStyle}>{column.title}</h3>
              {column.links.map((link, linkIndex) => (
                <a
                  key={linkIndex}
                  href={link.url}
                  style={linkStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = theme.colors.foreground;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = theme.colors.foregroundSecondary;
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}

          {/* Newsletter Column */}
          {showNewsletter && (
            <div style={{ ...columnStyle, maxWidth: '320px' }}>
              <h3 style={titleStyle}>{newsletterTitle}</h3>
              {newsletterDescription && (
                <p
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.foregroundSecondary,
                    margin: 0,
                    marginBottom: theme.spacing.sm,
                  }}
                >
                  {newsletterDescription}
                </p>
              )}
              <EmailSignupBlock
                placeholder="Enter your email"
                buttonText="Subscribe"
                layout="stacked"
                size="sm"
                onSubmit={onNewsletterSubmit}
              />
            </div>
          )}
        </div>

        {/* Bottom */}
        <div style={bottomStyle}>
          <p
            style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.foregroundMuted,
              margin: 0,
            }}
          >
            {copyrightText || `© ${currentYear} All rights reserved.`}
          </p>

          {/* Payment Icons */}
          {paymentIcons.length > 0 && (
            <div style={{ display: 'flex', gap: theme.spacing.xs }}>
              {paymentIcons.map((icon, index) => (
                <img
                  key={index}
                  src={icon}
                  alt="Payment method"
                  style={{
                    height: '24px',
                    width: 'auto',
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </ContainerBlock>
    </footer>
  );
}

export default FooterSection;
