// =============================================================================
// Template System Types
// =============================================================================
// Shopify-like template system for dynamic section composition
// =============================================================================

import type { ResourceBinding } from './resources';

// =============================================================================
// Template Types
// =============================================================================

/**
 * Screen types that can have templates
 */
export type ScreenType =
  | 'home'
  | 'product'
  | 'collection'
  | 'cart'
  | 'search'
  | 'page'
  | 'blog'
  | 'article'
  | 'account'
  | 'login'
  | 'register'
  | '404';

/**
 * Main Template structure
 */
export interface Template {
  id: string;
  name: string;
  handle: string;
  screenType: ScreenType;
  sections: TemplateSection[];

  // Metadata
  createdAt?: string;
  updatedAt?: string;

  // For specific pages (e.g., specific product or collection)
  resourceId?: string;
  resourceHandle?: string;
}

/**
 * Section within a template
 */
export interface TemplateSection {
  id: string;
  type: string;           // Section type from registry (e.g., 'hero', 'featured-collection')
  position: number;       // Display order
  enabled: boolean;       // Whether to render this section

  // Dynamic settings from schema
  settings: Record<string, unknown>;

  // Resource bindings (collection, product, blog, etc.)
  resources?: SectionResources;

  // Blocks within section (for sections that support blocks)
  blocks?: TemplateBlock[];
}

/**
 * Block within a section
 */
export interface TemplateBlock {
  id: string;
  type: string;
  position: number;
  settings: Record<string, unknown>;
}

/**
 * Resource bindings for sections
 */
export interface SectionResources {
  collection?: ResourceBinding;
  collections?: ResourceBinding[];
  product?: ResourceBinding;
  products?: ResourceBinding[];
  blog?: ResourceBinding;
  article?: ResourceBinding;
  page?: ResourceBinding;
  menu?: ResourceBinding;
}

// =============================================================================
// Schema Types (for Editor UI)
// =============================================================================

/**
 * Setting types supported by the editor
 */
export type SettingType =
  | 'header'
  | 'text'
  | 'textarea'
  | 'richtext'
  | 'number'
  | 'range'
  | 'checkbox'
  | 'select'
  | 'radio'
  | 'image_picker'
  | 'video_picker'
  | 'color'
  | 'color_background'
  | 'url'
  | 'collection'
  | 'collection_list'
  | 'product'
  | 'product_list'
  | 'blog'
  | 'article'
  | 'page'
  | 'menu'
  | 'link_list'
  | 'html'
  | 'liquid';

/**
 * Setting definition for editor
 */
export interface SettingDefinition {
  id?: string;
  type: SettingType;
  label?: string;
  default?: unknown;
  info?: string;
  placeholder?: string;

  // For header type
  content?: string;

  // For select/radio types
  options?: Array<{ value: string | number; label: string }>;

  // For range/number types
  min?: number;
  max?: number;
  step?: number;
  unit?: string;

  // Conditional visibility
  visibleIf?: string;
}

/**
 * Block definition within schema
 */
export interface BlockDefinition {
  type: string;
  name: string;
  limit?: number;
  settings: SettingDefinition[];
}

/**
 * Section schema for editor
 */
export interface SectionSchema {
  name: string;
  tag?: string;
  class?: string;
  limit?: number;
  settings: SettingDefinition[];
  blocks?: BlockDefinition[];
  presets?: SectionPreset[];

  // Metadata for editor
  category?: string;
  icon?: string;
  description?: string;
}

/**
 * Preset for quick-adding sections
 */
export interface SectionPreset {
  name: string;
  settings?: Record<string, unknown>;
  blocks?: Array<{
    type: string;
    settings?: Record<string, unknown>;
  }>;
}

// =============================================================================
// Template API Types
// =============================================================================

export interface GetTemplateRequest {
  screenType: ScreenType;
  resourceHandle?: string;  // For specific product/collection pages
}

export interface GetTemplateResponse {
  template: Template;
}

export interface UpdateTemplateRequest {
  templateId: string;
  sections?: TemplateSection[];
  name?: string;
}

export interface UpdateSectionRequest {
  templateId: string;
  sectionId: string;
  settings?: Record<string, unknown>;
  resources?: SectionResources;
  enabled?: boolean;
}

export interface ReorderSectionsRequest {
  templateId: string;
  sectionIds: string[];  // Ordered list of section IDs
}

// =============================================================================
// Helper Types
// =============================================================================

/**
 * Resolved section with data
 * Used after fetching resources
 */
export interface ResolvedSection extends TemplateSection {
  resolvedData?: {
    products?: unknown[];
    collections?: unknown[];
    articles?: unknown[];
    [key: string]: unknown;
  };
}

/**
 * Template context for screens
 */
export interface TemplateContext {
  template: Template | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

// =============================================================================
// Default Templates
// =============================================================================

export const DEFAULT_HOME_TEMPLATE: Template = {
  id: 'default-home',
  name: 'Home Page',
  handle: 'home',
  screenType: 'home',
  sections: [
    {
      id: 'hero-1',
      type: 'hero',
      position: 1,
      enabled: true,
      settings: {
        heading: 'Welcome to our store',
        subheading: 'Discover amazing products',
        layout: 'center',
        height: 'large',
      },
    },
    {
      id: 'featured-1',
      type: 'featured-collection',
      position: 2,
      enabled: true,
      settings: {
        title: 'Featured Products',
        limit: 8,
        layout: 'grid',
        columns: 4,
      },
      resources: {
        collection: {
          type: 'collection',
          id: '',
          handle: 'all',
          label: 'All Products',
        },
      },
    },
    {
      id: 'collection-list-1',
      type: 'collection-list',
      position: 3,
      enabled: true,
      settings: {
        title: 'Shop by Category',
        columns: 3,
      },
    },
    {
      id: 'newsletter-1',
      type: 'newsletter',
      position: 4,
      enabled: true,
      settings: {
        title: 'Subscribe to our newsletter',
        description: 'Get the latest updates and offers',
        buttonText: 'Subscribe',
      },
    },
  ],
};

export const DEFAULT_PRODUCT_TEMPLATE: Template = {
  id: 'default-product',
  name: 'Product Page',
  handle: 'product',
  screenType: 'product',
  sections: [
    {
      id: 'product-detail-1',
      type: 'product-detail',
      position: 1,
      enabled: true,
      settings: {
        showVendor: true,
        showSku: false,
        showQuantity: true,
      },
    },
    {
      id: 'related-products-1',
      type: 'related-products',
      position: 2,
      enabled: true,
      settings: {
        title: 'You may also like',
        limit: 4,
      },
    },
    {
      id: 'recently-viewed-1',
      type: 'recently-viewed',
      position: 3,
      enabled: true,
      settings: {
        title: 'Recently Viewed',
        limit: 4,
      },
    },
  ],
};

export const DEFAULT_COLLECTION_TEMPLATE: Template = {
  id: 'default-collection',
  name: 'Collection Page',
  handle: 'collection',
  screenType: 'collection',
  sections: [
    {
      id: 'collection-header-1',
      type: 'collection-header',
      position: 1,
      enabled: true,
      settings: {
        showDescription: true,
        showImage: true,
      },
    },
    {
      id: 'product-grid-1',
      type: 'product-grid',
      position: 2,
      enabled: true,
      settings: {
        columns: 4,
        showFilters: true,
        showPagination: true,
        productsPerPage: 24,
      },
    },
  ],
};
