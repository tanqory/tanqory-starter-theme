// =============================================================================
// Pricing Section (Draftbit pattern)
// =============================================================================

import React, { useState } from 'react';
import { TanqoryTheme, SectionStyles } from '../../themes';
import { ContainerBlock } from '../blocks/ContainerBlock';
import { HeadingBlock } from '../blocks/HeadingBlock';
import { TextBlock } from '../blocks/TextBlock';
import { ButtonBlock } from '../blocks/ButtonBlock';
import { BadgeBlock } from '../blocks/BadgeBlock';

// =============================================================================
// Types
// =============================================================================

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  description?: string;
  monthlyPrice: number;
  yearlyPrice: number;
  currency?: string;
  features: PricingFeature[];
  buttonLabel?: string;
  buttonLink?: string;
  highlighted?: boolean;
  badge?: string;
}

export interface PricingSectionProps {
  title?: string;
  description?: string;
  plans: PricingPlan[];
  showToggle?: boolean;
  defaultBilling?: 'monthly' | 'yearly';
  yearlyDiscount?: number;
  backgroundColor?: string;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const PricingSectionSchema = {
  name: 'Pricing',
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
      default: 'Choose Your Plan',
    },
    {
      id: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      type: 'header',
      content: 'Billing',
    },
    {
      id: 'showToggle',
      type: 'checkbox',
      label: 'Show billing toggle',
      default: true,
    },
    {
      id: 'defaultBilling',
      type: 'select',
      label: 'Default billing',
      options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'yearly', label: 'Yearly' },
      ],
      default: 'monthly',
    },
    {
      id: 'yearlyDiscount',
      type: 'range',
      label: 'Yearly discount %',
      min: 0,
      max: 50,
      step: 5,
      default: 20,
    },
    {
      id: 'backgroundColor',
      type: 'color',
      label: 'Background color',
    },
  ],
  blocks: [
    {
      type: 'plan',
      name: 'Pricing Plan',
      settings: [
        {
          id: 'name',
          type: 'text',
          label: 'Plan name',
        },
        {
          id: 'description',
          type: 'text',
          label: 'Description',
        },
        {
          id: 'monthlyPrice',
          type: 'number',
          label: 'Monthly price',
        },
        {
          id: 'yearlyPrice',
          type: 'number',
          label: 'Yearly price',
        },
        {
          id: 'currency',
          type: 'text',
          label: 'Currency symbol',
          default: '$',
        },
        {
          id: 'features',
          type: 'textarea',
          label: 'Features (one per line, prefix with - for excluded)',
        },
        {
          id: 'buttonLabel',
          type: 'text',
          label: 'Button label',
          default: 'Get Started',
        },
        {
          id: 'buttonLink',
          type: 'url',
          label: 'Button link',
        },
        {
          id: 'highlighted',
          type: 'checkbox',
          label: 'Highlight this plan',
          default: false,
        },
        {
          id: 'badge',
          type: 'text',
          label: 'Badge text (e.g., "Popular")',
        },
      ],
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function PricingSection({
  title = 'Choose Your Plan',
  description,
  plans,
  showToggle = true,
  defaultBilling = 'monthly',
  yearlyDiscount = 20,
  backgroundColor,
  className,
}: PricingSectionProps) {
  const theme = TanqoryTheme;
  const sectionStyles = SectionStyles(theme);
  const [billing, setBilling] = useState<'monthly' | 'yearly'>(defaultBilling);

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
    gap: theme.spacing.md,
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${Math.min(plans.length, 3)}, 1fr)`,
    gap: theme.spacing.lg,
    alignItems: 'stretch',
  };

  return (
    <section style={sectionStyle} className={className}>
      <ContainerBlock>
        {/* Header */}
        <div style={headerStyle}>
          {title && <HeadingBlock text={title} level="h2" alignment="center" />}
          {description && (
            <TextBlock text={description} preset="body" alignment="center" maxWidth="60" />
          )}

          {/* Billing Toggle */}
          {showToggle && (
            <BillingToggle
              billing={billing}
              onChange={setBilling}
              yearlyDiscount={yearlyDiscount}
            />
          )}
        </div>

        {/* Pricing Cards */}
        <div style={gridStyle} className="pricing-grid">
          {plans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              billing={billing}
            />
          ))}
        </div>

        {/* Responsive styles */}
        <style>
          {`
            @media (max-width: ${theme.breakpoints.lg}) {
              .pricing-grid {
                grid-template-columns: repeat(2, 1fr) !important;
              }
            }
            @media (max-width: ${theme.breakpoints.md}) {
              .pricing-grid {
                grid-template-columns: 1fr !important;
                max-width: 400px;
                margin: 0 auto;
              }
            }
          `}
        </style>
      </ContainerBlock>
    </section>
  );
}

// =============================================================================
// Billing Toggle Component
// =============================================================================

interface BillingToggleProps {
  billing: 'monthly' | 'yearly';
  onChange: (billing: 'monthly' | 'yearly') => void;
  yearlyDiscount: number;
}

function BillingToggle({ billing, onChange, yearlyDiscount }: BillingToggleProps) {
  const theme = TanqoryTheme;

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.md,
    padding: theme.spacing.xs,
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.borderRadius.full,
  };

  const buttonStyle = (isActive: boolean): React.CSSProperties => ({
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    borderRadius: theme.borderRadius.full,
    border: 'none',
    backgroundColor: isActive ? theme.colors.background : 'transparent',
    color: isActive ? theme.colors.foreground : theme.colors.foregroundMuted,
    fontWeight: isActive ? theme.typography.fontWeight.medium : theme.typography.fontWeight.regular,
    fontSize: theme.typography.fontSize.sm,
    cursor: 'pointer',
    transition: `all ${theme.transitions.fast} ${theme.transitions.easing}`,
    boxShadow: isActive ? theme.shadows.sm : 'none',
  });

  return (
    <div style={containerStyle}>
      <button style={buttonStyle(billing === 'monthly')} onClick={() => onChange('monthly')}>
        Monthly
      </button>
      <button style={buttonStyle(billing === 'yearly')} onClick={() => onChange('yearly')}>
        Yearly
        {yearlyDiscount > 0 && (
          <span
            style={{
              marginLeft: theme.spacing.xs,
              color: theme.colors.success,
              fontWeight: theme.typography.fontWeight.medium,
            }}
          >
            -{yearlyDiscount}%
          </span>
        )}
      </button>
    </div>
  );
}

// =============================================================================
// Pricing Card Component
// =============================================================================

interface PricingCardProps {
  plan: PricingPlan;
  billing: 'monthly' | 'yearly';
}

function PricingCard({ plan, billing }: PricingCardProps) {
  const theme = TanqoryTheme;
  const price = billing === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  const currency = plan.currency || '$';

  const cardStyle: React.CSSProperties = {
    position: 'relative',
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    border: plan.highlighted
      ? `2px solid ${theme.colors.primary}`
      : `1px solid ${theme.colors.border}`,
    boxShadow: plan.highlighted ? theme.shadows.lg : theme.shadows.sm,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  };

  return (
    <div style={cardStyle}>
      {/* Badge */}
      {plan.badge && (
        <div
          style={{
            position: 'absolute',
            top: theme.spacing.md,
            right: theme.spacing.md,
          }}
        >
          <BadgeBlock text={plan.badge} variant="new" />
        </div>
      )}

      {/* Plan Name & Description */}
      <div style={{ marginBottom: theme.spacing.lg }}>
        <h3
          style={{
            fontSize: theme.typography.fontSize.xl,
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.foreground,
            margin: 0,
            marginBottom: theme.spacing.xs,
          }}
        >
          {plan.name}
        </h3>
        {plan.description && (
          <p
            style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.foregroundMuted,
              margin: 0,
            }}
          >
            {plan.description}
          </p>
        )}
      </div>

      {/* Price */}
      <div style={{ marginBottom: theme.spacing.lg }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: theme.spacing.xs }}>
          <span
            style={{
              fontSize: theme.typography.fontSize['4xl'],
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.foreground,
            }}
          >
            {currency}{price}
          </span>
          <span
            style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.foregroundMuted,
            }}
          >
            /{billing === 'monthly' ? 'mo' : 'yr'}
          </span>
        </div>
      </div>

      {/* Features */}
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          marginBottom: theme.spacing.xl,
          flex: 1,
        }}
      >
        {plan.features.map((feature, index) => (
          <li
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.sm,
              padding: `${theme.spacing.xs} 0`,
              fontSize: theme.typography.fontSize.sm,
              color: feature.included ? theme.colors.foreground : theme.colors.foregroundMuted,
              textDecoration: feature.included ? 'none' : 'line-through',
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={feature.included ? theme.colors.success : theme.colors.foregroundMuted}
              strokeWidth="2"
            >
              {feature.included ? (
                <polyline points="20 6 9 17 4 12" />
              ) : (
                <line x1="18" y1="6" x2="6" y2="18" />
              )}
            </svg>
            {feature.text}
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      {plan.buttonLabel && (
        <ButtonBlock
          label={plan.buttonLabel}
          link={plan.buttonLink || '#'}
          style={plan.highlighted ? 'primary' : 'secondary'}
          width="full"
        />
      )}
    </div>
  );
}

export default PricingSection;
