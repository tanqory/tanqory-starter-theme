// =============================================================================
// Sections Index (Draftbit pattern)
// =============================================================================

// Section Renderer (Dynamic template renderer)
export { SectionRenderer, TemplateRenderer } from './SectionRenderer';
export type { SectionRendererProps, TemplateRendererProps } from './SectionRenderer';

// Layout Sections
export { HeaderSection, HeaderSectionSchema } from './HeaderSection';
export type { HeaderSectionProps } from './HeaderSection';

export { FooterSection, FooterSectionSchema } from './FooterSection';
export type { FooterSectionProps, FooterColumn } from './FooterSection';

export { AnnouncementBarSection, AnnouncementBarSectionSchema } from './AnnouncementBarSection';
export type { AnnouncementBarSectionProps, Announcement } from './AnnouncementBarSection';

// Hero & Marketing Sections
export { HeroSection, HeroSectionSchema } from './HeroSection';
export type { HeroSectionProps } from './HeroSection';

export { SlideshowSection, SlideshowSectionSchema } from './SlideshowSection';
export type { SlideshowSectionProps, Slide } from './SlideshowSection';

export { BannerSection, BannerSectionSchema } from './BannerSection';
export type { BannerSectionProps } from './BannerSection';

export { CountdownSection, CountdownSectionSchema } from './CountdownSection';
export type { CountdownSectionProps } from './CountdownSection';

export { NewsletterSection, NewsletterSectionSchema } from './NewsletterSection';
export type { NewsletterSectionProps } from './NewsletterSection';

// Product Sections
export { FeaturedCollectionSection, FeaturedCollectionSectionSchema } from './FeaturedCollectionSection';
export type { FeaturedCollectionSectionProps } from './FeaturedCollectionSection';

export { CollectionListSection, CollectionListSectionSchema } from './CollectionListSection';
export type { CollectionListSectionProps } from './CollectionListSection';

export { ProductGridSection, ProductGridSectionSchema } from './ProductGridSection';
export type { ProductGridSectionProps } from './ProductGridSection';

export { ProductDetailSection, ProductDetailSectionSchema } from './ProductDetailSection';
export type { ProductDetailSectionProps } from './ProductDetailSection';

export { RecentlyViewedSection, RecentlyViewedSectionSchema } from './RecentlyViewedSection';
export type { RecentlyViewedSectionProps } from './RecentlyViewedSection';

export { RelatedProductsSection, RelatedProductsSectionSchema } from './RelatedProductsSection';
export type { RelatedProductsSectionProps } from './RelatedProductsSection';

// Cart & Checkout Sections
export { CartSection, CartSectionSchema } from './CartSection';
export type { CartSectionProps } from './CartSection';

// Search Section
export { SearchResultsSection, SearchResultsSectionSchema } from './SearchResultsSection';
export type { SearchResultsSectionProps } from './SearchResultsSection';

// Blog Sections
export { BlogGridSection, BlogGridSectionSchema } from './BlogGridSection';
export type { BlogGridSectionProps } from './BlogGridSection';

// Content Sections
export { RichTextSection, RichTextSectionSchema } from './RichTextSection';
export type { RichTextSectionProps } from './RichTextSection';

export { ImageWithTextSection, ImageWithTextSectionSchema } from './ImageWithTextSection';
export type { ImageWithTextSectionProps } from './ImageWithTextSection';

export { MultiColumnSection, MultiColumnSectionSchema } from './MultiColumnSection';
export type { MultiColumnSectionProps, Column } from './MultiColumnSection';

export { FAQSection, FAQSectionSchema } from './FAQSection';
export type { FAQSectionProps, FAQItem } from './FAQSection';

export { TestimonialsSection, TestimonialsSectionSchema } from './TestimonialsSection';
export type { TestimonialsSectionProps, Testimonial } from './TestimonialsSection';

export { TeamSection, TeamSectionSchema } from './TeamSection';
export type { TeamSectionProps, TeamMember } from './TeamSection';

export { TimelineSection, TimelineSectionSchema } from './TimelineSection';
export type { TimelineSectionProps, TimelineEvent } from './TimelineSection';

export { StatsSection, StatsSectionSchema } from './StatsSection';
export type { StatsSectionProps, Stat } from './StatsSection';

export { PricingSection, PricingSectionSchema } from './PricingSection';
export type { PricingSectionProps, PricingPlan, PricingFeature } from './PricingSection';

// Media Sections
export { VideoSection, VideoSectionSchema } from './VideoSection';
export type { VideoSectionProps } from './VideoSection';

export { GallerySection, GallerySectionSchema } from './GallerySection';
export type { GallerySectionProps, GalleryImage } from './GallerySection';

export { ComparisonSection, ComparisonSectionSchema } from './ComparisonSection';
export type { ComparisonSectionProps } from './ComparisonSection';

export { LogoListSection, LogoListSectionSchema } from './LogoListSection';
export type { LogoListSectionProps, Logo } from './LogoListSection';

// Contact & Forms
export { ContactFormSection, ContactFormSectionSchema } from './ContactFormSection';
export type { ContactFormSectionProps, ContactFormData } from './ContactFormSection';

export { MapSection, MapSectionSchema } from './MapSection';
export type { MapSectionProps } from './MapSection';

// Utility Sections
export { CollapsibleSection, CollapsibleSectionSchema } from './CollapsibleSection';
export type { CollapsibleSectionProps } from './CollapsibleSection';

export { CustomHTMLSection, CustomHTMLSectionSchema } from './CustomHTMLSection';
export type { CustomHTMLSectionProps } from './CustomHTMLSection';

// =============================================================================
// Section Registry (for Studio)
// =============================================================================

import { HeaderSectionSchema } from './HeaderSection';
import { FooterSectionSchema } from './FooterSection';
import { AnnouncementBarSectionSchema } from './AnnouncementBarSection';
import { HeroSectionSchema } from './HeroSection';
import { SlideshowSectionSchema } from './SlideshowSection';
import { BannerSectionSchema } from './BannerSection';
import { CountdownSectionSchema } from './CountdownSection';
import { NewsletterSectionSchema } from './NewsletterSection';
import { FeaturedCollectionSectionSchema } from './FeaturedCollectionSection';
import { CollectionListSectionSchema } from './CollectionListSection';
import { ProductGridSectionSchema } from './ProductGridSection';
import { ProductDetailSectionSchema } from './ProductDetailSection';
import { RecentlyViewedSectionSchema } from './RecentlyViewedSection';
import { RelatedProductsSectionSchema } from './RelatedProductsSection';
import { CartSectionSchema } from './CartSection';
import { SearchResultsSectionSchema } from './SearchResultsSection';
import { BlogGridSectionSchema } from './BlogGridSection';
import { RichTextSectionSchema } from './RichTextSection';
import { ImageWithTextSectionSchema } from './ImageWithTextSection';
import { MultiColumnSectionSchema } from './MultiColumnSection';
import { FAQSectionSchema } from './FAQSection';
import { TestimonialsSectionSchema } from './TestimonialsSection';
import { TeamSectionSchema } from './TeamSection';
import { TimelineSectionSchema } from './TimelineSection';
import { StatsSectionSchema } from './StatsSection';
import { PricingSectionSchema } from './PricingSection';
import { VideoSectionSchema } from './VideoSection';
import { GallerySectionSchema } from './GallerySection';
import { ComparisonSectionSchema } from './ComparisonSection';
import { LogoListSectionSchema } from './LogoListSection';
import { ContactFormSectionSchema } from './ContactFormSection';
import { MapSectionSchema } from './MapSection';
import { CollapsibleSectionSchema } from './CollapsibleSection';
import { CustomHTMLSectionSchema } from './CustomHTMLSection';

export interface SectionSchema {
  name: string;
  tag: string;
  settings: Array<{
    type: string;
    id?: string;
    content?: string;
    label?: string;
    default?: unknown;
    options?: Array<{ value: string; label: string }>;
    min?: number;
    max?: number;
    step?: number;
    unit?: string;
    placeholder?: string;
    info?: string;
  }>;
  blocks?: Array<{
    type: string;
    name: string;
    settings: Array<{
      type: string;
      id: string;
      label: string;
      default?: unknown;
      options?: Array<{ value: string; label: string }>;
    }>;
  }>;
}

export interface SectionRegistryItem {
  name: string;
  component: React.ComponentType<unknown>;
  schema: SectionSchema;
  category: string;
  description?: string;
  icon?: string;
}

import { HeaderSection } from './HeaderSection';
import { FooterSection } from './FooterSection';
import { AnnouncementBarSection } from './AnnouncementBarSection';
import { HeroSection } from './HeroSection';
import { SlideshowSection } from './SlideshowSection';
import { BannerSection } from './BannerSection';
import { CountdownSection } from './CountdownSection';
import { NewsletterSection } from './NewsletterSection';
import { FeaturedCollectionSection } from './FeaturedCollectionSection';
import { CollectionListSection } from './CollectionListSection';
import { ProductGridSection } from './ProductGridSection';
import { ProductDetailSection } from './ProductDetailSection';
import { RecentlyViewedSection } from './RecentlyViewedSection';
import { RelatedProductsSection } from './RelatedProductsSection';
import { CartSection } from './CartSection';
import { SearchResultsSection } from './SearchResultsSection';
import { BlogGridSection } from './BlogGridSection';
import { RichTextSection } from './RichTextSection';
import { ImageWithTextSection } from './ImageWithTextSection';
import { MultiColumnSection } from './MultiColumnSection';
import { FAQSection } from './FAQSection';
import { TestimonialsSection } from './TestimonialsSection';
import { TeamSection } from './TeamSection';
import { TimelineSection } from './TimelineSection';
import { StatsSection } from './StatsSection';
import { PricingSection } from './PricingSection';
import { VideoSection } from './VideoSection';
import { GallerySection } from './GallerySection';
import { ComparisonSection } from './ComparisonSection';
import { LogoListSection } from './LogoListSection';
import { ContactFormSection } from './ContactFormSection';
import { MapSection } from './MapSection';
import { CollapsibleSection } from './CollapsibleSection';
import { CustomHTMLSection } from './CustomHTMLSection';

export const SectionRegistry: Record<string, SectionRegistryItem> = {
  // Layout
  header: {
    name: 'Header',
    component: HeaderSection as React.ComponentType<unknown>,
    schema: HeaderSectionSchema as SectionSchema,
    category: 'layout',
    description: 'Site header with navigation',
    icon: 'layout-navbar',
  },
  footer: {
    name: 'Footer',
    component: FooterSection as React.ComponentType<unknown>,
    schema: FooterSectionSchema as SectionSchema,
    category: 'layout',
    description: 'Site footer with links',
    icon: 'layout-footer',
  },
  announcement_bar: {
    name: 'Announcement Bar',
    component: AnnouncementBarSection as React.ComponentType<unknown>,
    schema: AnnouncementBarSectionSchema as SectionSchema,
    category: 'layout',
    description: 'Promotional announcement bar',
    icon: 'megaphone',
  },

  // Hero & Marketing
  hero: {
    name: 'Hero',
    component: HeroSection as React.ComponentType<unknown>,
    schema: HeroSectionSchema as SectionSchema,
    category: 'hero',
    description: 'Large hero banner with text and CTA',
    icon: 'photo-star',
  },
  slideshow: {
    name: 'Slideshow',
    component: SlideshowSection as React.ComponentType<unknown>,
    schema: SlideshowSectionSchema as SectionSchema,
    category: 'hero',
    description: 'Auto-playing image slideshow',
    icon: 'slideshow',
  },
  banner: {
    name: 'Banner',
    component: BannerSection as React.ComponentType<unknown>,
    schema: BannerSectionSchema as SectionSchema,
    category: 'marketing',
    description: 'Promotional banner',
    icon: 'rectangle-horizontal',
  },
  countdown: {
    name: 'Countdown',
    component: CountdownSection as React.ComponentType<unknown>,
    schema: CountdownSectionSchema as SectionSchema,
    category: 'marketing',
    description: 'Countdown timer for sales',
    icon: 'clock',
  },
  newsletter: {
    name: 'Newsletter',
    component: NewsletterSection as React.ComponentType<unknown>,
    schema: NewsletterSectionSchema as SectionSchema,
    category: 'marketing',
    description: 'Email signup form',
    icon: 'mail',
  },

  // Products
  featured_collection: {
    name: 'Featured Collection',
    component: FeaturedCollectionSection as React.ComponentType<unknown>,
    schema: FeaturedCollectionSectionSchema as SectionSchema,
    category: 'products',
    description: 'Display products from a collection',
    icon: 'star',
  },
  collection_list: {
    name: 'Collection List',
    component: CollectionListSection as React.ComponentType<unknown>,
    schema: CollectionListSectionSchema as SectionSchema,
    category: 'products',
    description: 'Display multiple collections',
    icon: 'layout-grid',
  },
  product_grid: {
    name: 'Product Grid',
    component: ProductGridSection as React.ComponentType<unknown>,
    schema: ProductGridSectionSchema as SectionSchema,
    category: 'products',
    description: 'Filterable product grid',
    icon: 'grid-dots',
  },
  product_detail: {
    name: 'Product Detail',
    component: ProductDetailSection as React.ComponentType<unknown>,
    schema: ProductDetailSectionSchema as SectionSchema,
    category: 'products',
    description: 'Full product page layout',
    icon: 'package',
  },
  recently_viewed: {
    name: 'Recently Viewed',
    component: RecentlyViewedSection as React.ComponentType<unknown>,
    schema: RecentlyViewedSectionSchema as SectionSchema,
    category: 'products',
    description: 'Recently viewed products',
    icon: 'history',
  },
  related_products: {
    name: 'Related Products',
    component: RelatedProductsSection as React.ComponentType<unknown>,
    schema: RelatedProductsSectionSchema as SectionSchema,
    category: 'products',
    description: 'Related product recommendations',
    icon: 'arrows-shuffle',
  },

  // Cart
  cart: {
    name: 'Cart',
    component: CartSection as React.ComponentType<unknown>,
    schema: CartSectionSchema as SectionSchema,
    category: 'cart',
    description: 'Shopping cart content',
    icon: 'shopping-cart',
  },

  // Search
  search_results: {
    name: 'Search Results',
    component: SearchResultsSection as React.ComponentType<unknown>,
    schema: SearchResultsSectionSchema as SectionSchema,
    category: 'search',
    description: 'Search results display',
    icon: 'search',
  },

  // Blog
  blog_grid: {
    name: 'Blog Grid',
    component: BlogGridSection as React.ComponentType<unknown>,
    schema: BlogGridSectionSchema as SectionSchema,
    category: 'blog',
    description: 'Blog posts grid',
    icon: 'article',
  },

  // Content
  rich_text: {
    name: 'Rich Text',
    component: RichTextSection as React.ComponentType<unknown>,
    schema: RichTextSectionSchema as SectionSchema,
    category: 'content',
    description: 'WYSIWYG text content',
    icon: 'align-left',
  },
  image_with_text: {
    name: 'Image with Text',
    component: ImageWithTextSection as React.ComponentType<unknown>,
    schema: ImageWithTextSectionSchema as SectionSchema,
    category: 'content',
    description: 'Split layout with image and text',
    icon: 'layout-sidebar-right',
  },
  multi_column: {
    name: 'Multi Column',
    component: MultiColumnSection as React.ComponentType<unknown>,
    schema: MultiColumnSectionSchema as SectionSchema,
    category: 'content',
    description: 'Multiple columns with icons/images',
    icon: 'columns',
  },
  faq: {
    name: 'FAQ',
    component: FAQSection as React.ComponentType<unknown>,
    schema: FAQSectionSchema as SectionSchema,
    category: 'content',
    description: 'Frequently asked questions',
    icon: 'help-circle',
  },
  testimonials: {
    name: 'Testimonials',
    component: TestimonialsSection as React.ComponentType<unknown>,
    schema: TestimonialsSectionSchema as SectionSchema,
    category: 'content',
    description: 'Customer testimonials',
    icon: 'quote',
  },
  team: {
    name: 'Team',
    component: TeamSection as React.ComponentType<unknown>,
    schema: TeamSectionSchema as SectionSchema,
    category: 'content',
    description: 'Team member profiles',
    icon: 'users',
  },
  timeline: {
    name: 'Timeline',
    component: TimelineSection as React.ComponentType<unknown>,
    schema: TimelineSectionSchema as SectionSchema,
    category: 'content',
    description: 'Chronological timeline',
    icon: 'git-branch',
  },
  stats: {
    name: 'Stats',
    component: StatsSection as React.ComponentType<unknown>,
    schema: StatsSectionSchema as SectionSchema,
    category: 'content',
    description: 'Key statistics display',
    icon: 'chart-bar',
  },
  pricing: {
    name: 'Pricing',
    component: PricingSection as React.ComponentType<unknown>,
    schema: PricingSectionSchema as SectionSchema,
    category: 'content',
    description: 'Pricing plans comparison',
    icon: 'currency-dollar',
  },

  // Media
  video: {
    name: 'Video',
    component: VideoSection as React.ComponentType<unknown>,
    schema: VideoSectionSchema as SectionSchema,
    category: 'media',
    description: 'Video embed section',
    icon: 'player-play',
  },
  gallery: {
    name: 'Gallery',
    component: GallerySection as React.ComponentType<unknown>,
    schema: GallerySectionSchema as SectionSchema,
    category: 'media',
    description: 'Image gallery with lightbox',
    icon: 'photo',
  },
  comparison: {
    name: 'Image Comparison',
    component: ComparisonSection as React.ComponentType<unknown>,
    schema: ComparisonSectionSchema as SectionSchema,
    category: 'media',
    description: 'Before/after image comparison',
    icon: 'arrows-horizontal',
  },
  logo_list: {
    name: 'Logo List',
    component: LogoListSection as React.ComponentType<unknown>,
    schema: LogoListSectionSchema as SectionSchema,
    category: 'media',
    description: 'Partner/brand logos',
    icon: 'badge',
  },

  // Contact
  contact_form: {
    name: 'Contact Form',
    component: ContactFormSection as React.ComponentType<unknown>,
    schema: ContactFormSectionSchema as SectionSchema,
    category: 'contact',
    description: 'Contact form with fields',
    icon: 'message-circle',
  },
  map: {
    name: 'Map',
    component: MapSection as React.ComponentType<unknown>,
    schema: MapSectionSchema as SectionSchema,
    category: 'contact',
    description: 'Location map with address',
    icon: 'map-pin',
  },

  // Utility
  collapsible: {
    name: 'Collapsible',
    component: CollapsibleSection as React.ComponentType<unknown>,
    schema: CollapsibleSectionSchema as SectionSchema,
    category: 'utility',
    description: 'Expandable content section',
    icon: 'chevrons-down',
  },
  custom_html: {
    name: 'Custom HTML',
    component: CustomHTMLSection as React.ComponentType<unknown>,
    schema: CustomHTMLSectionSchema as SectionSchema,
    category: 'utility',
    description: 'Custom HTML/embed code',
    icon: 'code',
  },
};

// =============================================================================
// Section Categories
// =============================================================================

export const SectionCategories = [
  { id: 'layout', name: 'Layout', icon: 'layout' },
  { id: 'hero', name: 'Hero', icon: 'photo-star' },
  { id: 'marketing', name: 'Marketing', icon: 'speakerphone' },
  { id: 'products', name: 'Products', icon: 'shopping-bag' },
  { id: 'cart', name: 'Cart', icon: 'shopping-cart' },
  { id: 'search', name: 'Search', icon: 'search' },
  { id: 'blog', name: 'Blog', icon: 'article' },
  { id: 'content', name: 'Content', icon: 'file-text' },
  { id: 'media', name: 'Media', icon: 'photo-video' },
  { id: 'contact', name: 'Contact', icon: 'address-book' },
  { id: 'utility', name: 'Utility', icon: 'tool' },
];

// =============================================================================
// Helper Functions
// =============================================================================

export function getSectionsByCategory(category: string): SectionRegistryItem[] {
  return Object.values(SectionRegistry).filter((section) => section.category === category);
}

export function getSectionByName(name: string): SectionRegistryItem | undefined {
  return SectionRegistry[name];
}

export function getAllSections(): SectionRegistryItem[] {
  return Object.values(SectionRegistry);
}
