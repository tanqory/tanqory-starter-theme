// =============================================================================
// Section Renderer
// =============================================================================
// Dynamically renders sections based on template configuration
// =============================================================================

import React from 'react';
import { SectionRegistry } from './index';
import type { TemplateSection } from '../../types/template';
import { getResourceHandle } from '../../types/resources';

// =============================================================================
// Types
// =============================================================================

export interface SectionRendererProps {
  section: TemplateSection;

  // Context data (passed from screen)
  context?: {
    productHandle?: string;
    collectionHandle?: string;
    pageHandle?: string;
    blogHandle?: string;
    articleHandle?: string;
    searchQuery?: string;
  };

  // Callbacks
  onProductClick?: (product: unknown) => void;
  onCollectionClick?: (collection: unknown) => void;

  // Editor mode
  isEditing?: boolean;
  onSectionSelect?: (sectionId: string) => void;
}

// =============================================================================
// Component
// =============================================================================

export function SectionRenderer({
  section,
  context,
  onProductClick,
  onCollectionClick,
  isEditing = false,
  onSectionSelect,
}: SectionRendererProps) {
  // Don't render disabled sections (unless editing)
  if (!section.enabled && !isEditing) {
    return null;
  }

  // Get section definition from registry
  const sectionDef = SectionRegistry[section.type];

  if (!sectionDef) {
    console.warn(`[SectionRenderer] Unknown section type: ${section.type}`);
    return isEditing ? (
      <div
        style={{
          padding: '20px',
          background: '#fee',
          border: '1px dashed #f00',
          textAlign: 'center',
        }}
      >
        Unknown section type: {section.type}
      </div>
    ) : null;
  }

  const Component = sectionDef.component;

  // Build props from settings and resources
  const props = buildSectionProps(section, context, {
    onProductClick,
    onCollectionClick,
  });

  // Wrapper for editor interaction
  const wrapperStyle: React.CSSProperties = isEditing
    ? {
        position: 'relative',
        outline: '2px dashed transparent',
        cursor: 'pointer',
        transition: 'outline-color 0.2s',
      }
    : {};

  const handleClick = (e: React.MouseEvent) => {
    if (isEditing && onSectionSelect) {
      e.stopPropagation();
      onSectionSelect(section.id);
    }
  };

  // Disabled overlay for editor
  const disabledOverlay = !section.enabled && isEditing && (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '14px',
        fontWeight: 500,
        zIndex: 10,
      }}
    >
      Section Disabled
    </div>
  );

  return (
    <div
      data-section-id={section.id}
      data-section-type={section.type}
      style={wrapperStyle}
      onClick={handleClick}
    >
      {disabledOverlay}
      <Component {...props} />
    </div>
  );
}

// =============================================================================
// Helper: Build Section Props
// =============================================================================

interface CallbackProps {
  onProductClick?: (product: unknown) => void;
  onCollectionClick?: (collection: unknown) => void;
}

function buildSectionProps(
  section: TemplateSection,
  context?: SectionRendererProps['context'],
  callbacks?: CallbackProps
): Record<string, unknown> {
  const props: Record<string, unknown> = {
    // Spread all settings
    ...section.settings,
  };

  // Add callbacks
  if (callbacks?.onProductClick) {
    props.onProductClick = callbacks.onProductClick;
  }
  if (callbacks?.onCollectionClick) {
    props.onCollectionClick = callbacks.onCollectionClick;
  }

  // Resource bindings → props
  if (section.resources) {
    // Collection → collectionHandle
    if (section.resources.collection) {
      props.collectionHandle = getResourceHandle(section.resources.collection);
    }

    // Collections → collectionHandles (for collection list)
    if (section.resources.collections) {
      props.collectionHandles = section.resources.collections
        .map(c => getResourceHandle(c))
        .filter(Boolean);
    }

    // Product → productHandle
    if (section.resources.product) {
      props.productHandle = getResourceHandle(section.resources.product);
    }

    // Products → productHandles (for manual product selection)
    if (section.resources.products) {
      props.productHandles = section.resources.products
        .map(p => getResourceHandle(p))
        .filter(Boolean);
    }

    // Blog → blogHandle
    if (section.resources.blog) {
      props.blogHandle = getResourceHandle(section.resources.blog);
    }

    // Article → articleHandle
    if (section.resources.article) {
      props.articleHandle = getResourceHandle(section.resources.article);
    }

    // Page → pageHandle
    if (section.resources.page) {
      props.pageHandle = getResourceHandle(section.resources.page);
    }

    // Menu → menuHandle
    if (section.resources.menu) {
      props.menuHandle = getResourceHandle(section.resources.menu);
    }
  }

  // Context overrides (for dynamic pages like /products/:handle)
  if (context) {
    // Product page context
    if (context.productHandle && section.type === 'product-detail') {
      props.productHandle = context.productHandle;
    }

    // Collection page context
    if (context.collectionHandle && section.type === 'product-grid') {
      props.collectionHandle = context.collectionHandle;
    }

    // Search context
    if (context.searchQuery && section.type === 'search-results') {
      props.query = context.searchQuery;
    }

    // Blog context
    if (context.blogHandle && section.type === 'blog-grid') {
      props.blogHandle = context.blogHandle;
    }

    // Article context
    if (context.articleHandle && section.type === 'article-detail') {
      props.articleHandle = context.articleHandle;
    }

    // Page context
    if (context.pageHandle && section.type === 'page-content') {
      props.pageHandle = context.pageHandle;
    }
  }

  return props;
}

// =============================================================================
// Template Renderer (renders all sections)
// =============================================================================

export interface TemplateRendererProps {
  sections: TemplateSection[];
  context?: SectionRendererProps['context'];
  onProductClick?: (product: unknown) => void;
  onCollectionClick?: (collection: unknown) => void;
  isEditing?: boolean;
  onSectionSelect?: (sectionId: string) => void;
}

export function TemplateRenderer({
  sections,
  context,
  onProductClick,
  onCollectionClick,
  isEditing = false,
  onSectionSelect,
}: TemplateRendererProps) {
  // Sort sections by position
  const sortedSections = [...sections].sort((a, b) => a.position - b.position);

  return (
    <>
      {sortedSections.map((section) => (
        <SectionRenderer
          key={section.id}
          section={section}
          context={context}
          onProductClick={onProductClick}
          onCollectionClick={onCollectionClick}
          isEditing={isEditing}
          onSectionSelect={onSectionSelect}
        />
      ))}
    </>
  );
}

export default SectionRenderer;
