// =============================================================================
// Team Section (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme, SectionStyles } from '../../themes';
import { ContainerBlock } from '../blocks/ContainerBlock';
import { HeadingBlock } from '../blocks/HeadingBlock';
import { TextBlock } from '../blocks/TextBlock';
import { SocialLinksBlock } from '../blocks/SocialLinksBlock';

// =============================================================================
// Types
// =============================================================================

export interface TeamMember {
  id: string;
  name: string;
  role?: string;
  bio?: string;
  image?: string;
  socials?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export interface TeamSectionProps {
  title?: string;
  description?: string;
  members: TeamMember[];
  columns?: 2 | 3 | 4;
  imageShape?: 'square' | 'circle' | 'rounded';
  showBio?: boolean;
  showSocials?: boolean;
  backgroundColor?: string;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const TeamSectionSchema = {
  name: 'Team',
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
      default: 'Meet Our Team',
    },
    {
      id: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      type: 'header',
      content: 'Layout',
    },
    {
      id: 'columns',
      type: 'range',
      label: 'Columns',
      min: 2,
      max: 4,
      step: 1,
      default: 3,
    },
    {
      id: 'imageShape',
      type: 'select',
      label: 'Image shape',
      options: [
        { value: 'square', label: 'Square' },
        { value: 'circle', label: 'Circle' },
        { value: 'rounded', label: 'Rounded' },
      ],
      default: 'circle',
    },
    {
      id: 'showBio',
      type: 'checkbox',
      label: 'Show bio',
      default: true,
    },
    {
      id: 'showSocials',
      type: 'checkbox',
      label: 'Show social links',
      default: true,
    },
    {
      id: 'backgroundColor',
      type: 'color',
      label: 'Background color',
    },
  ],
  blocks: [
    {
      type: 'team_member',
      name: 'Team Member',
      settings: [
        {
          id: 'name',
          type: 'text',
          label: 'Name',
        },
        {
          id: 'role',
          type: 'text',
          label: 'Role',
        },
        {
          id: 'bio',
          type: 'textarea',
          label: 'Bio',
        },
        {
          id: 'image',
          type: 'image_picker',
          label: 'Image',
        },
        {
          id: 'facebook',
          type: 'url',
          label: 'Facebook URL',
        },
        {
          id: 'twitter',
          type: 'url',
          label: 'Twitter URL',
        },
        {
          id: 'instagram',
          type: 'url',
          label: 'Instagram URL',
        },
        {
          id: 'linkedin',
          type: 'url',
          label: 'LinkedIn URL',
        },
      ],
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function TeamSection({
  title = 'Meet Our Team',
  description,
  members,
  columns = 3,
  imageShape = 'circle',
  showBio = true,
  showSocials = true,
  backgroundColor,
  className,
}: TeamSectionProps) {
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

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: theme.spacing.xl,
  };

  return (
    <section style={sectionStyle} className={className}>
      <ContainerBlock>
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

        {/* Team Grid */}
        <div style={gridStyle} className="team-grid">
          {members.map((member) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              imageShape={imageShape}
              showBio={showBio}
              showSocials={showSocials}
            />
          ))}
        </div>

        {/* Responsive styles */}
        <style>
          {`
            @media (max-width: ${theme.breakpoints.md}) {
              .team-grid {
                grid-template-columns: repeat(2, 1fr) !important;
              }
            }
            @media (max-width: ${theme.breakpoints.sm}) {
              .team-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}
        </style>
      </ContainerBlock>
    </section>
  );
}

// =============================================================================
// Team Member Card Component
// =============================================================================

interface TeamMemberCardProps {
  member: TeamMember;
  imageShape: 'square' | 'circle' | 'rounded';
  showBio: boolean;
  showSocials: boolean;
}

function TeamMemberCard({ member, imageShape, showBio, showSocials }: TeamMemberCardProps) {
  const theme = TanqoryTheme;

  const cardStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: theme.spacing.md,
  };

  const imageContainerStyle: React.CSSProperties = {
    width: imageShape === 'circle' ? '180px' : '100%',
    height: imageShape === 'circle' ? '180px' : undefined,
    aspectRatio: imageShape === 'circle' ? undefined : '1',
    borderRadius:
      imageShape === 'circle'
        ? theme.borderRadius.full
        : imageShape === 'rounded'
        ? theme.borderRadius.lg
        : theme.borderRadius.md,
    overflow: 'hidden',
    backgroundColor: theme.colors.backgroundSecondary,
  };

  const hasSocials = member.socials && Object.values(member.socials).some((v) => v);

  return (
    <div style={cardStyle}>
      {/* Image */}
      <div style={imageContainerStyle}>
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: theme.typography.fontSize['4xl'],
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.foregroundMuted,
            }}
          >
            {member.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Info */}
      <div>
        <h3
          style={{
            fontSize: theme.typography.fontSize.lg,
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.foreground,
            margin: 0,
            marginBottom: theme.spacing.xs,
          }}
        >
          {member.name}
        </h3>
        {member.role && (
          <p
            style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.primary,
              margin: 0,
            }}
          >
            {member.role}
          </p>
        )}
      </div>

      {/* Bio */}
      {showBio && member.bio && (
        <p
          style={{
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.foregroundSecondary,
            lineHeight: theme.typography.lineHeight.relaxed,
            margin: 0,
          }}
        >
          {member.bio}
        </p>
      )}

      {/* Socials */}
      {showSocials && hasSocials && (
        <SocialLinksBlock
          links={[
            ...(member.socials?.facebook ? [{ platform: 'facebook' as const, url: member.socials.facebook }] : []),
            ...(member.socials?.twitter ? [{ platform: 'twitter' as const, url: member.socials.twitter }] : []),
            ...(member.socials?.instagram ? [{ platform: 'instagram' as const, url: member.socials.instagram }] : []),
          ]}
          size={16}
          gap={12}
        />
      )}
    </div>
  );
}

export default TeamSection;
