// =============================================================================
// Video Block (Draftbit pattern)
// =============================================================================

import React, { useState, useRef, useCallback } from 'react';
import { TanqoryTheme } from '../../themes';

// =============================================================================
// Types
// =============================================================================

export interface VideoBlockProps {
  src?: string;
  poster?: string;
  type?: 'video' | 'youtube' | 'vimeo';
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  ratio?: '16:9' | '4:3' | '1:1' | '9:16';
  borderRadius?: keyof typeof TanqoryTheme.borderRadius;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const VideoBlockSchema = {
  name: 'Video',
  tag: 'div',
  settings: [
    {
      id: 'src',
      type: 'text',
      label: 'Video URL',
    },
    {
      id: 'poster',
      type: 'image_picker',
      label: 'Poster image',
    },
    {
      id: 'type',
      type: 'select',
      label: 'Video type',
      options: [
        { value: 'video', label: 'Direct video' },
        { value: 'youtube', label: 'YouTube' },
        { value: 'vimeo', label: 'Vimeo' },
      ],
      default: 'video',
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
      id: 'ratio',
      type: 'select',
      label: 'Aspect ratio',
      options: [
        { value: '16:9', label: '16:9 (Widescreen)' },
        { value: '4:3', label: '4:3 (Standard)' },
        { value: '1:1', label: '1:1 (Square)' },
        { value: '9:16', label: '9:16 (Vertical)' },
      ],
      default: '16:9',
    },
    {
      id: 'borderRadius',
      type: 'select',
      label: 'Border radius',
      options: [
        { value: 'none', label: 'None' },
        { value: 'sm', label: 'Small' },
        { value: 'md', label: 'Medium' },
        { value: 'lg', label: 'Large' },
      ],
      default: 'none',
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function VideoBlock({
  src,
  poster,
  type = 'video',
  autoplay = false,
  loop = false,
  muted = false,
  controls = true,
  ratio = '16:9',
  borderRadius = 'none',
  className,
}: VideoBlockProps) {
  const theme = TanqoryTheme;
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Get aspect ratio padding
  const getAspectRatio = () => {
    switch (ratio) {
      case '4:3':
        return '75%';
      case '1:1':
        return '100%';
      case '9:16':
        return '177.78%';
      default:
        return '56.25%'; // 16:9
    }
  };

  // Extract video ID from YouTube/Vimeo URLs
  const getEmbedUrl = useCallback(() => {
    if (!src) return '';

    if (type === 'youtube') {
      const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
      const match = src.match(youtubeRegex);
      if (match && match[1]) {
        const params = new URLSearchParams({
          autoplay: autoplay ? '1' : '0',
          loop: loop ? '1' : '0',
          mute: muted ? '1' : '0',
          controls: controls ? '1' : '0',
        });
        return `https://www.youtube.com/embed/${match[1]}?${params.toString()}`;
      }
    }

    if (type === 'vimeo') {
      const vimeoRegex = /vimeo\.com\/(?:video\/)?(\d+)/;
      const match = src.match(vimeoRegex);
      if (match && match[1]) {
        const params = new URLSearchParams({
          autoplay: autoplay ? '1' : '0',
          loop: loop ? '1' : '0',
          muted: muted ? '1' : '0',
          controls: controls ? '1' : '0',
        });
        return `https://player.vimeo.com/video/${match[1]}?${params.toString()}`;
      }
    }

    return src;
  }, [src, type, autoplay, loop, muted, controls]);

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    paddingBottom: getAspectRatio(),
    height: 0,
    overflow: 'hidden',
    borderRadius: theme.borderRadius[borderRadius],
    backgroundColor: theme.colors.backgroundSecondary,
  };

  const mediaStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    border: 'none',
  };

  // No source placeholder
  if (!src) {
    return (
      <div style={containerStyle} className={className}>
        <div
          style={{
            ...mediaStyle,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: theme.spacing.sm,
          }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke={theme.colors.foregroundMuted}
            strokeWidth="1.5"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          <span
            style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.foregroundMuted,
            }}
          >
            Add a video URL
          </span>
        </div>
      </div>
    );
  }

  // YouTube or Vimeo embed
  if (type === 'youtube' || type === 'vimeo') {
    return (
      <div style={containerStyle} className={className}>
        <iframe
          src={getEmbedUrl()}
          style={mediaStyle}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Video player"
        />
      </div>
    );
  }

  // Direct video
  return (
    <div style={containerStyle} className={className}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoplay}
        loop={loop}
        muted={muted}
        controls={controls}
        playsInline
        style={mediaStyle}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Custom play button overlay when controls are hidden */}
      {!controls && !isPlaying && (
        <button
          type="button"
          onClick={handlePlayClick}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '64px',
            height: '64px',
            borderRadius: theme.borderRadius.full,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Play video"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
            stroke="white"
            strokeWidth="2"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default VideoBlock;
