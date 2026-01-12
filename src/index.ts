// =============================================================================
// Tanqory Starter Theme - Main Export (Draftbit pattern)
// =============================================================================
// A complete e-commerce theme built with Draftbit's architecture pattern
// combining Horizon theme's completeness with Draftbit's code structure

// =============================================================================
// App Entry
// =============================================================================

export { App, renderApp } from './App';

// =============================================================================
// Config
// =============================================================================

export {
  GlobalVariableProvider,
  useGlobalVariable,
  useSetGlobalVariable,
  GlobalVariableContext,
} from './config/GlobalVariableContext';

export { Fonts } from './config/Fonts';
export { Images } from './config/Images';

// =============================================================================
// Theme
// =============================================================================

export {
  TanqoryTheme,
  SectionStyles,
  InputStyles,
  ButtonStyles,
  CardStyles,
} from './themes';

export { GlobalStyles } from './themes/GlobalStyles';

// =============================================================================
// APIs (3-Layer Pattern)
// =============================================================================

// Products API
export {
  productsGET,
  productByHandleGET,
  productRecommendationsGET,
  useProductsGET,
  useProductByHandleGET,
  useProductRecommendationsGET,
  FetchProducts,
  FetchProduct,
  FetchProductRecommendations,
} from './apis/ProductsApi';

// Collections API
export {
  collectionsGET,
  collectionByHandleGET,
  useCollectionsGET,
  useCollectionByHandleGET,
  FetchCollections,
  FetchCollection,
} from './apis/CollectionsApi';

// Cart API
export {
  cartGET,
  cartCreatePOST,
  cartLinesAddPOST,
  cartLinesUpdatePUT,
  cartLinesRemoveDELETE,
  useCartGET,
  useCartCreatePOST,
  useCartLinesAddPOST,
  useCartLinesUpdatePUT,
  useCartLinesRemoveDELETE,
  FetchCart,
} from './apis/CartApi';

// Blog API
export {
  blogsGET,
  articlesGET,
  articleByHandleGET,
  useBlogsGET,
  useArticlesGET,
  useArticleByHandleGET,
  FetchArticles,
  FetchArticle,
} from './apis/BlogApi';

// Search API
export {
  searchGET,
  predictiveSearchGET,
  useSearchGET,
  usePredictiveSearchGET,
  FetchSearch,
  FetchPredictiveSearch,
} from './apis/SearchApi';

// Store API
export {
  storeGET,
  menuGET,
  useStoreGET,
  useMenuGET,
  FetchStore,
  FetchMenu,
} from './apis/StoreApi';

// Types
export type {
  Product,
  ProductVariant,
  ProductImage,
  ProductOption,
  Collection,
  CollectionImage,
  CartLine,
  Cart,
  CartCost,
  Article,
  Blog,
  Store,
  Menu,
  MenuItem,
  SearchResult,
} from './apis';

export type { ApiHandlers } from './utils/handleApiResponse';

// =============================================================================
// Blocks
// =============================================================================

export {
  // Core Blocks
  ButtonBlock,
  ImageBlock,
  TextBlock,
  HeadingBlock,
  IconBlock,
  SpacerBlock,
  DividerBlock,
  VideoBlock,

  // Product Blocks
  ProductCardBlock,
  ProductMediaGalleryBlock,
  PriceBlock,
  QuantityBlock,
  VariantPickerBlock,
  AddToCartBlock,
  BadgeBlock,
  RatingBlock,

  // Collection Blocks
  CollectionCardBlock,

  // Blog Blocks
  BlogPostCardBlock,

  // Cart Blocks
  CartBlock,

  // Navigation Blocks
  LogoBlock,
  MenuBlock,
  SearchInputBlock,
  BreadcrumbBlock,
  PaginationBlock,

  // Layout Blocks
  ContainerBlock,
  GridBlock,
  CarouselBlock,

  // Interaction Blocks
  AccordionBlock,
  TabsBlock,
  ModalBlock,
  DrawerBlock,
  FiltersBlock,

  // Marketing Blocks
  AnnouncementBlock,
  MarqueeBlock,
  EmailSignupBlock,
  SocialLinksBlock,

  // Registry
  BlockRegistry,
} from './components/blocks';

// =============================================================================
// Sections
// =============================================================================

export {
  // Layout
  HeaderSection,
  FooterSection,
  AnnouncementBarSection,

  // Hero & Marketing
  HeroSection,
  SlideshowSection,
  BannerSection,
  CountdownSection,
  NewsletterSection,

  // Products
  FeaturedCollectionSection,
  CollectionListSection,
  ProductGridSection,
  ProductDetailSection,
  RecentlyViewedSection,
  RelatedProductsSection,

  // Cart
  CartSection,

  // Search
  SearchResultsSection,

  // Blog
  BlogGridSection,

  // Content
  RichTextSection,
  ImageWithTextSection,
  MultiColumnSection,
  FAQSection,
  TestimonialsSection,
  TeamSection,
  TimelineSection,
  StatsSection,
  PricingSection,

  // Media
  VideoSection,
  GallerySection,
  ComparisonSection,
  LogoListSection,

  // Contact
  ContactFormSection,
  MapSection,

  // Utility
  CollapsibleSection,
  CustomHTMLSection,

  // Registry
  SectionRegistry,
  SectionCategories,
  getSectionsByCategory,
  getSectionByName,
  getAllSections,
} from './components/sections';

// =============================================================================
// Screens
// =============================================================================

export {
  HomeScreen,
  CollectionScreen,
  ProductScreen,
  CartScreen,
  SearchScreen,
  BlogScreen,
  ArticleScreen,
  PageScreen,
  AccountScreen,
  LoginScreen,
  RegisterScreen,
  NotFoundScreen,

  // Registry
  ScreenRegistry,
  getScreenByName,
  getScreenByPath,
  getAllScreens,
  getNavigableScreens,
  getAuthRequiredScreens,
} from './screens';

// =============================================================================
// Navigation
// =============================================================================

export {
  AppNavigator,
  useNavigation,
  Link,
  AuthGuard,
} from './navigators';

// =============================================================================
// Utils
// =============================================================================

export { handleApiResponse } from './utils/handleApiResponse';
export { formatPrice } from './utils/formatPrice';
export { usePrevious } from './utils/usePrevious';
export { useIsFocused } from './utils/useIsFocused';
