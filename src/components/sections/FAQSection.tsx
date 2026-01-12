// =============================================================================
// FAQ Section (Draftbit pattern)
// =============================================================================

import React from 'react';
import { TanqoryTheme, SectionStyles } from '../../themes';
import { ContainerBlock } from '../blocks/ContainerBlock';
import { HeadingBlock } from '../blocks/HeadingBlock';
import { TextBlock } from '../blocks/TextBlock';
import { AccordionBlock, AccordionItem } from '../blocks/AccordionBlock';

// =============================================================================
// Types
// =============================================================================

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQSectionProps {
  title?: string;
  description?: string;
  items: FAQItem[];
  layout?: 'single' | 'two-column';
  icon?: 'chevron' | 'plus';
  allowMultiple?: boolean;
  backgroundColor?: string;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const FAQSectionSchema = {
  name: 'FAQ',
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
      default: 'Frequently Asked Questions',
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
      id: 'layout',
      type: 'select',
      label: 'Layout',
      options: [
        { value: 'single', label: 'Single column' },
        { value: 'two-column', label: 'Two columns' },
      ],
      default: 'single',
    },
    {
      id: 'icon',
      type: 'select',
      label: 'Icon',
      options: [
        { value: 'chevron', label: 'Chevron' },
        { value: 'plus', label: 'Plus/Minus' },
      ],
      default: 'plus',
    },
    {
      id: 'allowMultiple',
      type: 'checkbox',
      label: 'Allow multiple open',
      default: false,
    },
    {
      id: 'backgroundColor',
      type: 'color',
      label: 'Background color',
    },
  ],
  blocks: [
    {
      type: 'faq',
      name: 'FAQ Item',
      settings: [
        {
          id: 'question',
          type: 'text',
          label: 'Question',
        },
        {
          id: 'answer',
          type: 'richtext',
          label: 'Answer',
        },
      ],
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function FAQSection({
  title = 'Frequently Asked Questions',
  description,
  items,
  layout = 'single',
  icon = 'plus',
  allowMultiple = false,
  backgroundColor,
  className,
}: FAQSectionProps) {
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

  // Convert FAQ items to accordion items
  const accordionItems: AccordionItem[] = items.map((item) => ({
    id: item.id,
    title: item.question,
    content: item.answer,
  }));

  // Split items for two-column layout
  const splitItems = (items: AccordionItem[]) => {
    const mid = Math.ceil(items.length / 2);
    return [items.slice(0, mid), items.slice(mid)];
  };

  const [leftItems, rightItems] = layout === 'two-column' ? splitItems(accordionItems) : [accordionItems, []];

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

        {/* FAQ Items */}
        {layout === 'two-column' ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: theme.spacing['2xl'],
            }}
            className="faq-grid"
          >
            <AccordionBlock
              items={leftItems}
              icon={icon}
              allowMultiple={allowMultiple}
              dividers
            />
            <AccordionBlock
              items={rightItems}
              icon={icon}
              allowMultiple={allowMultiple}
              dividers
            />
          </div>
        ) : (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <AccordionBlock
              items={accordionItems}
              icon={icon}
              allowMultiple={allowMultiple}
              dividers
            />
          </div>
        )}

        {/* Responsive styles */}
        <style>
          {`
            @media (max-width: ${theme.breakpoints.md}) {
              .faq-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}
        </style>
      </ContainerBlock>
    </section>
  );
}

export default FAQSection;
