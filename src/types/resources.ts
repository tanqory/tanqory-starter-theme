// =============================================================================
// Resource Types
// =============================================================================
// Types for resource bindings (collections, products, blogs, etc.)
// Used by sections to connect to backend data
// =============================================================================

// =============================================================================
// Base Resource Binding
// =============================================================================

/**
 * Resource types that can be bound to sections
 */
export type ResourceType =
  | 'collection'
  | 'product'
  | 'blog'
  | 'article'
  | 'page'
  | 'menu';

/**
 * Base resource binding structure
 * Used when editor selects a resource (e.g., Collection picker)
 */
export interface ResourceBinding {
  type: ResourceType;
  id: string;
  handle: string;
  label: string;

  // Optional preview data for editor
  preview?: {
    image?: string;
    description?: string;
    count?: number;
  };
}

// =============================================================================
// Specific Resource Types
// =============================================================================

/**
 * Collection resource
 */
export interface CollectionResource extends ResourceBinding {
  type: 'collection';
  preview?: {
    image?: string;
    description?: string;
    count?: number;  // Product count
  };
}

/**
 * Product resource
 */
export interface ProductResource extends ResourceBinding {
  type: 'product';
  preview?: {
    image?: string;
    price?: number;
    compareAtPrice?: number;
    available?: boolean;
  };
}

/**
 * Blog resource
 */
export interface BlogResource extends ResourceBinding {
  type: 'blog';
  preview?: {
    articleCount?: number;
  };
}

/**
 * Article resource
 */
export interface ArticleResource extends ResourceBinding {
  type: 'article';
  preview?: {
    image?: string;
    excerpt?: string;
    publishedAt?: string;
  };
}

/**
 * Page resource
 */
export interface PageResource extends ResourceBinding {
  type: 'page';
  preview?: {
    excerpt?: string;
  };
}

/**
 * Menu/Navigation resource
 */
export interface MenuResource extends ResourceBinding {
  type: 'menu';
  preview?: {
    itemCount?: number;
  };
}

// =============================================================================
// Resource Picker Types (for Editor UI)
// =============================================================================

/**
 * Options for resource picker in editor
 */
export interface ResourcePickerOptions {
  resourceType: ResourceType;
  multiple?: boolean;
  maxSelections?: number;

  // Filter options
  filter?: {
    // For collections
    hasProducts?: boolean;
    // For products
    collectionId?: string;
    available?: boolean;
    // For articles
    blogId?: string;
  };
}

/**
 * Resource picker result
 */
export interface ResourcePickerResult {
  selected: ResourceBinding[];
}

// =============================================================================
// Resource List Types (for API responses)
// =============================================================================

export interface CollectionListItem {
  id: string;
  title: string;
  handle: string;
  image?: {
    src: string;
    altText?: string;
  };
  productsCount?: number;
}

export interface ProductListItem {
  id: string;
  title: string;
  handle: string;
  featuredImage?: {
    src: string;
    altText?: string;
  };
  price: number;
  compareAtPrice?: number;
  availableForSale: boolean;
}

export interface BlogListItem {
  id: string;
  title: string;
  handle: string;
  articleCount?: number;
}

export interface ArticleListItem {
  id: string;
  title: string;
  handle: string;
  image?: {
    src: string;
    altText?: string;
  };
  excerpt?: string;
  publishedAt?: string;
  blog?: {
    id: string;
    handle: string;
  };
}

export interface PageListItem {
  id: string;
  title: string;
  handle: string;
}

export interface MenuListItem {
  id: string;
  title: string;
  handle: string;
  items: MenuItem[];
}

export interface MenuItem {
  id: string;
  title: string;
  url: string;
  type: 'link' | 'collection' | 'product' | 'page' | 'blog';
  resourceId?: string;
  items?: MenuItem[];  // Nested menu items
}

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Create a resource binding from API data
 */
export function createResourceBinding(
  type: ResourceType,
  data: { id: string; title?: string; handle: string; image?: { src: string } }
): ResourceBinding {
  return {
    type,
    id: data.id,
    handle: data.handle,
    label: data.title || data.handle,
    preview: data.image ? { image: data.image.src } : undefined,
  };
}

/**
 * Check if resource binding is valid
 */
export function isValidResource(resource: ResourceBinding | undefined): boolean {
  return !!(resource && resource.id && resource.handle);
}

/**
 * Get resource handle safely
 */
export function getResourceHandle(resource: ResourceBinding | undefined): string | undefined {
  return isValidResource(resource) ? resource!.handle : undefined;
}

/**
 * Get resource ID safely
 */
export function getResourceId(resource: ResourceBinding | undefined): string | undefined {
  return isValidResource(resource) ? resource!.id : undefined;
}
