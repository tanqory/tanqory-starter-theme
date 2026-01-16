// =============================================================================
// APIs Export (Draftbit pattern)
// =============================================================================

// Client
export { ApiClient, createApiClient } from './client';

// Products
export {
  ProductsApi,
  productsGET,
  productByHandleGET,
  productRecommendationsGET,
  useProductsGET,
  useProductByHandleGET,
  useProductRecommendationsGET,
  FetchProducts,
  FetchProduct,
  FetchProductRecommendations,
} from './ProductsApi';
export type {
  Product,
  ProductImage,
  ProductVariant,
  ProductOption,
  ProductsParams,
  ProductsResponse,
} from './ProductsApi';

// Collections
export {
  CollectionsApi,
  collectionsGET,
  collectionByHandleGET,
  useCollectionsGET,
  useCollectionByHandleGET,
  FetchCollections,
  FetchCollection,
} from './CollectionsApi';
export type {
  Collection,
  CollectionImage,
  CollectionsParams,
  CollectionsResponse,
} from './CollectionsApi';

// Cart
export {
  CartApi,
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
} from './CartApi';
export type {
  Cart,
  CartLine,
  CartCost,
  AddToCartInput,
  UpdateCartLineInput,
} from './CartApi';

// Blog
export {
  BlogApi,
  blogsGET,
  articlesGET,
  articleByHandleGET,
  useBlogsGET,
  useArticlesGET,
  useArticleByHandleGET,
  FetchArticles,
  FetchArticle,
} from './BlogApi';
export type {
  Blog,
  Article,
  ArticleAuthor,
  ArticleImage,
  ArticlesParams,
  ArticlesResponse,
} from './BlogApi';

// Search
export {
  SearchApi,
  searchGET,
  predictiveSearchGET,
  useSearchGET,
  usePredictiveSearchGET,
  FetchSearch,
  FetchPredictiveSearch,
} from './SearchApi';
export type {
  SearchParams,
  SearchResult,
  PredictiveSearchResult,
} from './SearchApi';

// Store
export {
  StoreApi,
  storeGET,
  menuGET,
  useStoreGET,
  useMenuGET,
  FetchStore,
  FetchMenu,
} from './StoreApi';
export type {
  Store,
  StoreAddress,
  StoreImage,
  StoreSocialLinks,
  Menu,
  MenuItem,
} from './StoreApi';

// Template
export {
  TemplateApi,
  templateByScreenTypeGET,
  templateByHandleGET,
  templatesGET,
  useTemplateByScreenTypeGET,
  useTemplateByHandleGET,
  useTemplatesGET,
  FetchTemplate,
  FetchTemplateByHandle,
  FetchTemplates,
} from './TemplateApi';
export type {
  TemplateResponse,
  TemplatesResponse,
} from './TemplateApi';
