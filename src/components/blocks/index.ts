// =============================================================================
// Blocks Export (Draftbit pattern)
// =============================================================================

// Core Blocks
export { ButtonBlock, ButtonBlockSchema } from './ButtonBlock';
export type { ButtonBlockProps } from './ButtonBlock';

export { ImageBlock, ImageBlockSchema } from './ImageBlock';
export type { ImageBlockProps } from './ImageBlock';

export { TextBlock, TextBlockSchema } from './TextBlock';
export type { TextBlockProps } from './TextBlock';

export { HeadingBlock, HeadingBlockSchema } from './HeadingBlock';
export type { HeadingBlockProps } from './HeadingBlock';

export { IconBlock, IconBlockSchema } from './IconBlock';
export type { IconBlockProps, IconName } from './IconBlock';

export { SpacerBlock, SpacerBlockSchema } from './SpacerBlock';
export type { SpacerBlockProps } from './SpacerBlock';

export { DividerBlock, DividerBlockSchema } from './DividerBlock';
export type { DividerBlockProps } from './DividerBlock';

export { VideoBlock, VideoBlockSchema } from './VideoBlock';
export type { VideoBlockProps } from './VideoBlock';

// Product Blocks
export { ProductCardBlock, ProductCardBlockSchema } from './ProductCardBlock';
export type { ProductCardBlockProps } from './ProductCardBlock';

export { ProductMediaGalleryBlock, ProductMediaGalleryBlockSchema } from './ProductMediaGalleryBlock';
export type { ProductMediaGalleryBlockProps } from './ProductMediaGalleryBlock';

export { PriceBlock, PriceBlockSchema } from './PriceBlock';
export type { PriceBlockProps } from './PriceBlock';

export { QuantityBlock, QuantityBlockSchema } from './QuantityBlock';
export type { QuantityBlockProps } from './QuantityBlock';

export { VariantPickerBlock, VariantPickerBlockSchema } from './VariantPickerBlock';
export type { VariantPickerBlockProps } from './VariantPickerBlock';

export { AddToCartBlock, AddToCartBlockSchema } from './AddToCartBlock';
export type { AddToCartBlockProps } from './AddToCartBlock';

export { BadgeBlock, BadgeBlockSchema } from './BadgeBlock';
export type { BadgeBlockProps } from './BadgeBlock';

export { RatingBlock, RatingBlockSchema } from './RatingBlock';
export type { RatingBlockProps } from './RatingBlock';

// Collection Blocks
export { CollectionCardBlock, CollectionCardBlockSchema } from './CollectionCardBlock';
export type { CollectionCardBlockProps } from './CollectionCardBlock';

// Blog Blocks
export { BlogPostCardBlock, BlogPostCardBlockSchema } from './BlogPostCardBlock';
export type { BlogPostCardBlockProps } from './BlogPostCardBlock';

// Cart Blocks
export { CartBlock, CartBlockSchema } from './CartBlock';
export type { CartBlockProps } from './CartBlock';

// Navigation Blocks
export { LogoBlock, LogoBlockSchema } from './LogoBlock';
export type { LogoBlockProps } from './LogoBlock';

export { MenuBlock, MenuBlockSchema } from './MenuBlock';
export type { MenuBlockProps } from './MenuBlock';

export { SearchInputBlock, SearchInputBlockSchema } from './SearchInputBlock';
export type { SearchInputBlockProps } from './SearchInputBlock';

export { BreadcrumbBlock, BreadcrumbBlockSchema } from './BreadcrumbBlock';
export type { BreadcrumbBlockProps, BreadcrumbItem } from './BreadcrumbBlock';

export { PaginationBlock, PaginationBlockSchema } from './PaginationBlock';
export type { PaginationBlockProps } from './PaginationBlock';

// Layout Blocks
export { ContainerBlock, ContainerBlockSchema } from './ContainerBlock';
export type { ContainerBlockProps } from './ContainerBlock';

export { GridBlock, GridBlockSchema } from './GridBlock';
export type { GridBlockProps } from './GridBlock';

export { CarouselBlock, CarouselBlockSchema } from './CarouselBlock';
export type { CarouselBlockProps } from './CarouselBlock';

// Interaction Blocks
export { AccordionBlock, AccordionBlockSchema } from './AccordionBlock';
export type { AccordionBlockProps, AccordionItem } from './AccordionBlock';

export { TabsBlock, TabsBlockSchema } from './TabsBlock';
export type { TabsBlockProps, TabItem } from './TabsBlock';

export { ModalBlock, ModalBlockSchema } from './ModalBlock';
export type { ModalBlockProps } from './ModalBlock';

export { DrawerBlock, DrawerBlockSchema } from './DrawerBlock';
export type { DrawerBlockProps } from './DrawerBlock';

export { FiltersBlock, FiltersBlockSchema } from './FiltersBlock';
export type { FiltersBlockProps, Filter, FilterOption, ActiveFilters } from './FiltersBlock';

// Marketing Blocks
export { AnnouncementBlock, AnnouncementBlockSchema } from './AnnouncementBlock';
export type { AnnouncementBlockProps } from './AnnouncementBlock';

export { MarqueeBlock, MarqueeBlockSchema } from './MarqueeBlock';
export type { MarqueeBlockProps } from './MarqueeBlock';

export { EmailSignupBlock, EmailSignupBlockSchema } from './EmailSignupBlock';
export type { EmailSignupBlockProps } from './EmailSignupBlock';

export { SocialLinksBlock, SocialLinksBlockSchema } from './SocialLinksBlock';
export type { SocialLinksBlockProps, SocialLink } from './SocialLinksBlock';

// =============================================================================
// Block Registry
// =============================================================================

import { ButtonBlock, ButtonBlockSchema } from './ButtonBlock';
import { ImageBlock, ImageBlockSchema } from './ImageBlock';
import { TextBlock, TextBlockSchema } from './TextBlock';
import { HeadingBlock, HeadingBlockSchema } from './HeadingBlock';
import { IconBlock, IconBlockSchema } from './IconBlock';
import { SpacerBlock, SpacerBlockSchema } from './SpacerBlock';
import { DividerBlock, DividerBlockSchema } from './DividerBlock';
import { VideoBlock, VideoBlockSchema } from './VideoBlock';
import { ProductCardBlock, ProductCardBlockSchema } from './ProductCardBlock';
import { ProductMediaGalleryBlock, ProductMediaGalleryBlockSchema } from './ProductMediaGalleryBlock';
import { PriceBlock, PriceBlockSchema } from './PriceBlock';
import { QuantityBlock, QuantityBlockSchema } from './QuantityBlock';
import { VariantPickerBlock, VariantPickerBlockSchema } from './VariantPickerBlock';
import { AddToCartBlock, AddToCartBlockSchema } from './AddToCartBlock';
import { BadgeBlock, BadgeBlockSchema } from './BadgeBlock';
import { RatingBlock, RatingBlockSchema } from './RatingBlock';
import { CollectionCardBlock, CollectionCardBlockSchema } from './CollectionCardBlock';
import { BlogPostCardBlock, BlogPostCardBlockSchema } from './BlogPostCardBlock';
import { CartBlock, CartBlockSchema } from './CartBlock';
import { LogoBlock, LogoBlockSchema } from './LogoBlock';
import { MenuBlock, MenuBlockSchema } from './MenuBlock';
import { SearchInputBlock, SearchInputBlockSchema } from './SearchInputBlock';
import { BreadcrumbBlock, BreadcrumbBlockSchema } from './BreadcrumbBlock';
import { PaginationBlock, PaginationBlockSchema } from './PaginationBlock';
import { ContainerBlock, ContainerBlockSchema } from './ContainerBlock';
import { GridBlock, GridBlockSchema } from './GridBlock';
import { CarouselBlock, CarouselBlockSchema } from './CarouselBlock';
import { AccordionBlock, AccordionBlockSchema } from './AccordionBlock';
import { TabsBlock, TabsBlockSchema } from './TabsBlock';
import { ModalBlock, ModalBlockSchema } from './ModalBlock';
import { DrawerBlock, DrawerBlockSchema } from './DrawerBlock';
import { FiltersBlock, FiltersBlockSchema } from './FiltersBlock';
import { AnnouncementBlock, AnnouncementBlockSchema } from './AnnouncementBlock';
import { MarqueeBlock, MarqueeBlockSchema } from './MarqueeBlock';
import { EmailSignupBlock, EmailSignupBlockSchema } from './EmailSignupBlock';
import { SocialLinksBlock, SocialLinksBlockSchema } from './SocialLinksBlock';

export const BlockRegistry = {
  // Core
  button: { component: ButtonBlock, schema: ButtonBlockSchema },
  image: { component: ImageBlock, schema: ImageBlockSchema },
  text: { component: TextBlock, schema: TextBlockSchema },
  heading: { component: HeadingBlock, schema: HeadingBlockSchema },
  icon: { component: IconBlock, schema: IconBlockSchema },
  spacer: { component: SpacerBlock, schema: SpacerBlockSchema },
  divider: { component: DividerBlock, schema: DividerBlockSchema },
  video: { component: VideoBlock, schema: VideoBlockSchema },
  // Product
  'product-card': { component: ProductCardBlock, schema: ProductCardBlockSchema },
  'product-media-gallery': { component: ProductMediaGalleryBlock, schema: ProductMediaGalleryBlockSchema },
  price: { component: PriceBlock, schema: PriceBlockSchema },
  quantity: { component: QuantityBlock, schema: QuantityBlockSchema },
  'variant-picker': { component: VariantPickerBlock, schema: VariantPickerBlockSchema },
  'add-to-cart': { component: AddToCartBlock, schema: AddToCartBlockSchema },
  badge: { component: BadgeBlock, schema: BadgeBlockSchema },
  rating: { component: RatingBlock, schema: RatingBlockSchema },
  // Collection
  'collection-card': { component: CollectionCardBlock, schema: CollectionCardBlockSchema },
  // Blog
  'blog-post-card': { component: BlogPostCardBlock, schema: BlogPostCardBlockSchema },
  // Cart
  cart: { component: CartBlock, schema: CartBlockSchema },
  // Navigation
  logo: { component: LogoBlock, schema: LogoBlockSchema },
  menu: { component: MenuBlock, schema: MenuBlockSchema },
  'search-input': { component: SearchInputBlock, schema: SearchInputBlockSchema },
  breadcrumb: { component: BreadcrumbBlock, schema: BreadcrumbBlockSchema },
  pagination: { component: PaginationBlock, schema: PaginationBlockSchema },
  // Layout
  container: { component: ContainerBlock, schema: ContainerBlockSchema },
  grid: { component: GridBlock, schema: GridBlockSchema },
  carousel: { component: CarouselBlock, schema: CarouselBlockSchema },
  // Interaction
  accordion: { component: AccordionBlock, schema: AccordionBlockSchema },
  tabs: { component: TabsBlock, schema: TabsBlockSchema },
  modal: { component: ModalBlock, schema: ModalBlockSchema },
  drawer: { component: DrawerBlock, schema: DrawerBlockSchema },
  filters: { component: FiltersBlock, schema: FiltersBlockSchema },
  // Marketing
  announcement: { component: AnnouncementBlock, schema: AnnouncementBlockSchema },
  marquee: { component: MarqueeBlock, schema: MarqueeBlockSchema },
  'email-signup': { component: EmailSignupBlock, schema: EmailSignupBlockSchema },
  'social-links': { component: SocialLinksBlock, schema: SocialLinksBlockSchema },
} as const;

export type BlockType = keyof typeof BlockRegistry;
