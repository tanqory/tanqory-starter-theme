// =============================================================================
// Map Section (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme, SectionStyles } from '../../themes';
import { ContainerBlock } from '../blocks/ContainerBlock';
import { HeadingBlock } from '../blocks/HeadingBlock';
import { TextBlock } from '../blocks/TextBlock';

// =============================================================================
// Types
// =============================================================================

export interface MapSectionProps {
  title?: string;
  description?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  zoom?: number;
  height?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  showAddressOverlay?: boolean;
  phone?: string;
  email?: string;
  hours?: string;
  backgroundColor?: string;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const MapSectionSchema = {
  name: 'Map',
  tag: 'section',
  settings: [
    {
      type: 'header',
      content: 'Content',
    },
    {
      id: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      id: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      type: 'header',
      content: 'Location',
    },
    {
      id: 'address',
      type: 'textarea',
      label: 'Address',
    },
    {
      id: 'latitude',
      type: 'number',
      label: 'Latitude',
    },
    {
      id: 'longitude',
      type: 'number',
      label: 'Longitude',
    },
    {
      id: 'zoom',
      type: 'range',
      label: 'Zoom level',
      min: 1,
      max: 20,
      step: 1,
      default: 15,
    },
    {
      type: 'header',
      content: 'Layout',
    },
    {
      id: 'height',
      type: 'select',
      label: 'Height',
      options: [
        { value: 'small', label: 'Small (300px)' },
        { value: 'medium', label: 'Medium (450px)' },
        { value: 'large', label: 'Large (600px)' },
      ],
      default: 'medium',
    },
    {
      id: 'fullWidth',
      type: 'checkbox',
      label: 'Full width',
      default: false,
    },
    {
      id: 'showAddressOverlay',
      type: 'checkbox',
      label: 'Show address overlay',
      default: true,
    },
    {
      type: 'header',
      content: 'Contact Info',
    },
    {
      id: 'phone',
      type: 'text',
      label: 'Phone',
    },
    {
      id: 'email',
      type: 'text',
      label: 'Email',
    },
    {
      id: 'hours',
      type: 'textarea',
      label: 'Opening hours',
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

export function MapSection({
  title,
  description,
  address,
  latitude = 13.7563,
  longitude = 100.5018,
  zoom = 15,
  height = 'medium',
  fullWidth = false,
  showAddressOverlay = true,
  phone,
  email,
  hours,
  backgroundColor,
  className,
}: MapSectionProps) {
  const theme = TanqoryTheme;
  const sectionStyles = SectionStyles(theme);

  const sectionStyle: React.CSSProperties = {
    ...sectionStyles.base,
    backgroundColor: backgroundColor || theme.colors.background,
    padding: fullWidth ? 0 : undefined,
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: theme.spacing['2xl'],
    gap: theme.spacing.sm,
    padding: fullWidth ? `0 ${theme.spacing['2xl']}` : 0,
  };

  // Height mappings
  const heightMap: Record<string, string> = {
    small: '300px',
    medium: '450px',
    large: '600px',
  };

  // Generate Google Maps embed URL
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${latitude},${longitude}&zoom=${zoom}`;

  // Fallback: OpenStreetMap embed (no API key needed)
  const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.01},${latitude - 0.01},${longitude + 0.01},${latitude + 0.01}&layer=mapnik&marker=${latitude},${longitude}`;

  const mapContainerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: heightMap[height],
    borderRadius: fullWidth ? 0 : theme.borderRadius.lg,
    overflow: 'hidden',
  };

  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: theme.spacing.lg,
    left: theme.spacing.lg,
    backgroundColor: 'white',
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    boxShadow: theme.shadows.lg,
    maxWidth: '320px',
    zIndex: 10,
  };

  return (
    <section style={sectionStyle} className={className}>
      {/* Header */}
      {(title || description) && (
        <ContainerBlock>
          <div style={headerStyle}>
            {title && <HeadingBlock text={title} level="h2" alignment="center" />}
            {description && (
              <TextBlock
                text={description}
                preset="body"
                alignment="center"
                maxWidth="60"
              />
            )}
          </div>
        </ContainerBlock>
      )}

      {/* Map */}
      {fullWidth ? (
        <div style={mapContainerStyle}>
          <iframe
            title="Location Map"
            src={osmUrl}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            loading="lazy"
            allowFullScreen
          />

          {/* Address Overlay */}
          {showAddressOverlay && (address || phone || email || hours) && (
            <div style={overlayStyle}>
              <AddressCard address={address} phone={phone} email={email} hours={hours} />
            </div>
          )}
        </div>
      ) : (
        <ContainerBlock>
          <div style={mapContainerStyle}>
            <iframe
              title="Location Map"
              src={osmUrl}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              loading="lazy"
              allowFullScreen
            />

            {/* Address Overlay */}
            {showAddressOverlay && (address || phone || email || hours) && (
              <div style={overlayStyle}>
                <AddressCard address={address} phone={phone} email={email} hours={hours} />
              </div>
            )}
          </div>
        </ContainerBlock>
      )}
    </section>
  );
}

// =============================================================================
// Address Card Component
// =============================================================================

interface AddressCardProps {
  address?: string;
  phone?: string;
  email?: string;
  hours?: string;
}

function AddressCard({ address, phone, email, hours }: AddressCardProps) {
  const theme = TanqoryTheme;

  const itemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  };

  const iconStyle: React.CSSProperties = {
    width: '20px',
    height: '20px',
    flexShrink: 0,
    color: theme.colors.primary,
  };

  const textStyle: React.CSSProperties = {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.foreground,
    lineHeight: theme.typography.lineHeight.normal,
    margin: 0,
  };

  return (
    <div>
      {address && (
        <div style={itemStyle}>
          <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <p style={textStyle}>{address}</p>
        </div>
      )}

      {phone && (
        <div style={itemStyle}>
          <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <a href={`tel:${phone}`} style={{ ...textStyle, textDecoration: 'none', color: theme.colors.primary }}>
            {phone}
          </a>
        </div>
      )}

      {email && (
        <div style={itemStyle}>
          <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <a href={`mailto:${email}`} style={{ ...textStyle, textDecoration: 'none', color: theme.colors.primary }}>
            {email}
          </a>
        </div>
      )}

      {hours && (
        <div style={itemStyle}>
          <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <p style={{ ...textStyle, whiteSpace: 'pre-line' }}>{hours}</p>
        </div>
      )}
    </div>
  );
}

export default MapSection;
