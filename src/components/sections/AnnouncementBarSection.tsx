// =============================================================================
// Announcement Bar Section (Draftbit pattern)
// =============================================================================

import React from 'react';
import { AnnouncementBlock } from '../blocks/AnnouncementBlock';
import { MarqueeBlock } from '../blocks/MarqueeBlock';

// =============================================================================
// Types
// =============================================================================

export interface Announcement {
  message: string;
  link?: string;
  linkText?: string;
}

export interface AnnouncementBarSectionProps {
  announcements: Announcement[];
  style?: 'static' | 'marquee' | 'carousel';
  backgroundColor?: string;
  textColor?: string;
  dismissible?: boolean;
  autoRotate?: boolean;
  rotateInterval?: number;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const AnnouncementBarSectionSchema = {
  name: 'Announcement Bar',
  tag: 'section',
  settings: [
    {
      id: 'style',
      type: 'select',
      label: 'Style',
      options: [
        { value: 'static', label: 'Static' },
        { value: 'marquee', label: 'Marquee (scrolling)' },
        { value: 'carousel', label: 'Carousel (rotating)' },
      ],
      default: 'static',
    },
    {
      id: 'backgroundColor',
      type: 'color',
      label: 'Background color',
    },
    {
      id: 'textColor',
      type: 'color',
      label: 'Text color',
    },
    {
      id: 'dismissible',
      type: 'checkbox',
      label: 'Dismissible',
      default: false,
    },
    {
      id: 'autoRotate',
      type: 'checkbox',
      label: 'Auto rotate (carousel)',
      default: true,
      visibleIf: "{{ settings.style == 'carousel' }}",
    },
    {
      id: 'rotateInterval',
      type: 'range',
      label: 'Rotate interval',
      min: 2000,
      max: 10000,
      step: 500,
      unit: 'ms',
      default: 5000,
      visibleIf: "{{ settings.style == 'carousel' }}",
    },
  ],
  blocks: [
    {
      type: 'announcement',
      name: 'Announcement',
      settings: [
        {
          id: 'message',
          type: 'text',
          label: 'Message',
          default: 'Free shipping on orders over $50!',
        },
        {
          id: 'link',
          type: 'url',
          label: 'Link',
        },
        {
          id: 'linkText',
          type: 'text',
          label: 'Link text',
          default: 'Shop now',
        },
      ],
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function AnnouncementBarSection({
  announcements,
  style = 'static',
  backgroundColor,
  textColor,
  dismissible = false,
  autoRotate = true,
  rotateInterval = 5000,
  className,
}: AnnouncementBarSectionProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isDismissed, setIsDismissed] = React.useState(false);

  // Auto rotate for carousel
  React.useEffect(() => {
    if (style === 'carousel' && autoRotate && announcements.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % announcements.length);
      }, rotateInterval);
      return () => clearInterval(interval);
    }
  }, [style, autoRotate, rotateInterval, announcements.length]);

  if (isDismissed || announcements.length === 0) {
    return null;
  }

  // Marquee style
  if (style === 'marquee') {
    return (
      <div
        data-section="AnnouncementBarSection"
        style={{
          backgroundColor,
          color: textColor,
        }}
        className={className}
      >
        <MarqueeBlock
          items={announcements.map((a) => a.message)}
          speed={30}
          pauseOnHover
        />
      </div>
    );
  }

  // Carousel or static style
  const currentAnnouncement = announcements[currentIndex];

  return (
    <div data-section="AnnouncementBarSection">
      <AnnouncementBlock
        message={currentAnnouncement.message}
        link={currentAnnouncement.link}
        linkText={currentAnnouncement.linkText}
        backgroundColor={backgroundColor}
        textColor={textColor}
        dismissible={dismissible}
        className={className}
      />
    </div>
  );
}

export default AnnouncementBarSection;
