// =============================================================================
// Video Section (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme, SectionStyles } from '../../themes';
import { ContainerBlock } from '../blocks/ContainerBlock';
import { HeadingBlock } from '../blocks/HeadingBlock';
import { TextBlock } from '../blocks/TextBlock';
import { VideoBlock } from '../blocks/VideoBlock';

// =============================================================================
// Types
// =============================================================================

export interface VideoSectionProps {
  title?: string;
  description?: string;
  videoUrl: string;
  videoType?: 'youtube' | 'vimeo' | 'video';
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  posterImage?: string;
  aspectRatio?: '16:9' | '4:3' | '21:9' | '1:1';
  fullWidth?: boolean;
  backgroundColor?: string;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const VideoSectionSchema = {
  name: 'Video',
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
      content: 'Video',
    },
    {
      id: 'videoUrl',
      type: 'video_url',
      label: 'Video URL',
      accept: ['youtube', 'vimeo', 'file'],
    },
    {
      id: 'posterImage',
      type: 'image_picker',
      label: 'Cover image',
    },
    {
      type: 'header',
      content: 'Options',
    },
    {
      id: 'autoplay',
      type: 'checkbox',
      label: 'Autoplay',
      default: false,
    },
    {
      id: 'loop',
      type: 'checkbox',
      label: 'Loop',
      default: false,
    },
    {
      id: 'muted',
      type: 'checkbox',
      label: 'Muted',
      default: false,
    },
    {
      id: 'controls',
      type: 'checkbox',
      label: 'Show controls',
      default: true,
    },
    {
      type: 'header',
      content: 'Layout',
    },
    {
      id: 'aspectRatio',
      type: 'select',
      label: 'Aspect ratio',
      options: [
        { value: '16:9', label: '16:9 (Widescreen)' },
        { value: '4:3', label: '4:3 (Standard)' },
        { value: '21:9', label: '21:9 (Cinematic)' },
        { value: '1:1', label: '1:1 (Square)' },
      ],
      default: '16:9',
    },
    {
      id: 'fullWidth',
      type: 'checkbox',
      label: 'Full width',
      default: false,
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

export function VideoSection({
  title,
  description,
  videoUrl,
  videoType,
  autoplay = false,
  loop = false,
  muted = false,
  controls = true,
  posterImage,
  aspectRatio = '16:9',
  fullWidth = false,
  backgroundColor,
  className,
}: VideoSectionProps) {
  const theme = TanqoryTheme;
  const sectionStyles = SectionStyles(theme);

  const sectionStyle: React.CSSProperties = {
    ...sectionStyles.base,
    backgroundColor: backgroundColor || theme.colors.background,
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: theme.spacing['2xl'],
    gap: theme.spacing.sm,
  };

  const videoContainerStyle: React.CSSProperties = {
    maxWidth: fullWidth ? '100%' : '1000px',
    margin: '0 auto',
    borderRadius: fullWidth ? 0 : theme.borderRadius.lg,
    overflow: 'hidden',
    boxShadow: fullWidth ? 'none' : theme.shadows.lg,
  };

  return (
    <section style={sectionStyle} className={className}>
      <ContainerBlock variant={fullWidth ? 'full' : 'page'}>
        {/* Header */}
        {(title || description) && (
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
        )}

        {/* Video */}
        <div style={videoContainerStyle}>
          <VideoBlock
            src={videoUrl}
            type={videoType}
            ratio={aspectRatio === '21:9' ? '16:9' : aspectRatio}
            autoplay={autoplay}
            loop={loop}
            muted={muted}
            controls={controls}
            poster={posterImage}
          />
        </div>
      </ContainerBlock>
    </section>
  );
}

export default VideoSection;
