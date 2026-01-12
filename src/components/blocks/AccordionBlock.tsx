// =============================================================================
// Accordion Block (Draftbit pattern)
// =============================================================================

import React, { useState, useCallback } from 'react';
import { TanqoryTheme } from '../../themes';

// =============================================================================
// Types
// =============================================================================

export interface AccordionItem {
  id: string;
  title: string;
  content: string | React.ReactNode;
}

export interface AccordionBlockProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpenIds?: string[];
  icon?: 'chevron' | 'plus';
  dividers?: boolean;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const AccordionBlockSchema = {
  name: 'Accordion',
  tag: 'div',
  settings: [
    {
      id: 'allowMultiple',
      type: 'checkbox',
      label: 'Allow multiple open',
      default: false,
    },
    {
      id: 'icon',
      type: 'select',
      label: 'Icon',
      options: [
        { value: 'chevron', label: 'Chevron' },
        { value: 'plus', label: 'Plus/Minus' },
      ],
      default: 'chevron',
    },
    {
      id: 'dividers',
      type: 'checkbox',
      label: 'Show dividers',
      default: true,
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function AccordionBlock({
  items,
  allowMultiple = false,
  defaultOpenIds = [],
  icon = 'chevron',
  dividers = true,
  className,
}: AccordionBlockProps) {
  const theme = TanqoryTheme;
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(defaultOpenIds));

  const toggleItem = useCallback(
    (id: string) => {
      setOpenIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          if (!allowMultiple) {
            next.clear();
          }
          next.add(id);
        }
        return next;
      });
    },
    [allowMultiple]
  );

  const containerStyle: React.CSSProperties = {
    width: '100%',
  };

  return (
    <div style={containerStyle} className={className}>
      {items.map((item, index) => (
        <AccordionItem
          key={item.id}
          item={item}
          isOpen={openIds.has(item.id)}
          onToggle={() => toggleItem(item.id)}
          icon={icon}
          showDivider={dividers && index < items.length - 1}
        />
      ))}
    </div>
  );
}

// =============================================================================
// Accordion Item Component
// =============================================================================

interface AccordionItemProps {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
  icon: 'chevron' | 'plus';
  showDivider: boolean;
}

function AccordionItem({
  item,
  isOpen,
  onToggle,
  icon,
  showDivider,
}: AccordionItemProps) {
  const theme = TanqoryTheme;

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: `${theme.spacing.md} 0`,
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.foreground,
  };

  const contentStyle: React.CSSProperties = {
    overflow: 'hidden',
    maxHeight: isOpen ? '1000px' : '0',
    opacity: isOpen ? 1 : 0,
    transition: `all ${theme.transitions.normal} ${theme.transitions.easing}`,
    paddingBottom: isOpen ? theme.spacing.md : 0,
  };

  const iconStyle: React.CSSProperties = {
    transition: `transform ${theme.transitions.fast} ${theme.transitions.easing}`,
    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
  };

  const renderIcon = () => {
    if (icon === 'plus') {
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {isOpen ? (
            <line x1="5" y1="12" x2="19" y2="12" />
          ) : (
            <>
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </>
          )}
        </svg>
      );
    }

    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={iconStyle}
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    );
  };

  return (
    <div
      style={{
        borderBottom: showDivider ? `1px solid ${theme.colors.border}` : undefined,
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        style={headerStyle}
        aria-expanded={isOpen}
      >
        <span>{item.title}</span>
        {renderIcon()}
      </button>

      <div style={contentStyle} aria-hidden={!isOpen}>
        {typeof item.content === 'string' ? (
          <p
            style={{
              margin: 0,
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.foregroundSecondary,
              lineHeight: theme.typography.lineHeight.relaxed,
            }}
          >
            {item.content}
          </p>
        ) : (
          item.content
        )}
      </div>
    </div>
  );
}

export default AccordionBlock;
