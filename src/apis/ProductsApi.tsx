// =============================================================================
// Products API (Draftbit 3-layer pattern)
// =============================================================================

import React, { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createApiClient } from './client';
import { useGlobalVariables } from '../config/GlobalVariableContext';
import { usePrevious } from '../utils/usePrevious';
import { useIsFocused } from '../utils/useIsFocused';
import type { ApiHandlers } from '../utils/handleApiResponse';

// =============================================================================
// Types
// =============================================================================

export interface Product {
  id: string;
  title: string;
  handle: string;
  name?: string; // Alias for title
  slug?: string; // Alias for handle
  description?: string;
  descriptionHtml?: string;
  vendor?: string;
  productType?: string;
  tags?: string[];
  price: number;
  compareAtPrice?: number;
  currencyCode?: string;
  images: ProductImage[];
  featuredImage?: ProductImage;
  variants: ProductVariant[];
  options?: ProductOption[];
  availableForSale: boolean;
  isNew?: boolean;
  sku?: string;
  collections?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductImage {
  id: string;
  src: string;
  altText?: string;
  width?: number;
  height?: number;
}

export interface ProductVariant {
  id: string;
  title: string;
  price: number;
  compareAtPrice?: number;
  sku?: string;
  availableForSale: boolean;
  quantityAvailable?: number;
  image?: ProductImage;
  selectedOptions?: { name: string; value: string }[];
}

export interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface ProductsParams {
  collection?: string;
  limit?: number;
  cursor?: string;
  sortKey?: 'TITLE' | 'PRICE' | 'BEST_SELLING' | 'CREATED_AT';
  reverse?: boolean;
  query?: string;
}

export interface ProductsResponse {
  products: Product[];
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
  };
}

// =============================================================================
// Layer 1: Raw Fetch Functions
// =============================================================================

/**
 * Fetch products list
 */
export async function productsGET(
  Constants: ReturnType<typeof useGlobalVariables>,
  params: ProductsParams = {},
  handlers: ApiHandlers<ProductsResponse> = {}
): Promise<ProductsResponse> {
  const client = createApiClient(Constants);
  const response = await client.get<ProductsResponse>('/storefront/products', params as Record<string, unknown>, { handlers });

  if (response.ok && response.data) {
    return response.data;
  }

  // Return empty response on error
  return { products: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } };
}

/**
 * Fetch single product by handle
 */
export async function productByHandleGET(
  Constants: ReturnType<typeof useGlobalVariables>,
  handle: string,
  handlers: ApiHandlers<Product> = {}
): Promise<Product | null> {
  const client = createApiClient(Constants);
  const response = await client.get<Product>(`/storefront/products/${handle}`, undefined, { handlers });

  if (response.ok && response.data) {
    return response.data;
  }

  return null;
}

/**
 * Fetch product recommendations
 */
export async function productRecommendationsGET(
  Constants: ReturnType<typeof useGlobalVariables>,
  productId: string,
  limit: number = 4,
  handlers: ApiHandlers<Product[]> = {}
): Promise<Product[]> {
  const client = createApiClient(Constants);
  const response = await client.get<Product[]>(
    `/storefront/products/${productId}/recommendations`,
    { limit },
    { handlers }
  );

  if (response.ok && response.data) {
    return response.data;
  }

  return [];
}

// =============================================================================
// Layer 2: React Query Hooks
// =============================================================================

/**
 * Hook to fetch products list
 */
export function useProductsGET(
  params: ProductsParams = {},
  options: { refetchInterval?: number; handlers?: ApiHandlers<ProductsResponse> } = {}
) {
  const Constants = useGlobalVariables();
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productsGET(Constants, params, options.handlers),
    refetchInterval: options.refetchInterval,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch single product
 */
export function useProductByHandleGET(
  handle: string,
  options: { handlers?: ApiHandlers<Product> } = {}
) {
  const Constants = useGlobalVariables();

  return useQuery({
    queryKey: ['product', handle],
    queryFn: () => productByHandleGET(Constants, handle, options.handlers),
    enabled: !!handle,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch product recommendations
 */
export function useProductRecommendationsGET(
  productId: string,
  limit: number = 4,
  options: { handlers?: ApiHandlers<Product[]> } = {}
) {
  const Constants = useGlobalVariables();

  return useQuery({
    queryKey: ['productRecommendations', productId, limit],
    queryFn: () => productRecommendationsGET(Constants, productId, limit, options.handlers),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
  });
}

// =============================================================================
// Layer 3: Wrapper Components (Render Props)
// =============================================================================

export interface FetchProductsProps {
  children: (result: {
    loading: boolean;
    data: Product[] | undefined;
    error: Error | null;
    refetch: () => void;
    hasNextPage: boolean;
  }) => React.ReactNode;
  collection?: string;
  limit?: number;
  sortKey?: ProductsParams['sortKey'];
  onData?: (data: ProductsResponse) => void;
  refetchInterval?: number;
  refetchOnFocus?: boolean;
}

/**
 * Wrapper component for fetching products (Draftbit pattern)
 */
export function FetchProducts({
  children,
  collection,
  limit = 12,
  sortKey,
  onData,
  refetchInterval,
  refetchOnFocus = true,
}: FetchProductsProps) {
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { data, isLoading, error, refetch } = useProductsGET(
    { collection, limit, sortKey },
    { refetchInterval, handlers: { onData } }
  );

  // Refetch when screen comes into focus
  useEffect(() => {
    if (refetchOnFocus && !prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused, refetch, refetchOnFocus]);

  return (
    <>
      {children({
        loading: isLoading,
        data: data?.products,
        error: error as Error | null,
        refetch,
        hasNextPage: data?.pageInfo?.hasNextPage ?? false,
      })}
    </>
  );
}

export interface FetchProductProps {
  children: (result: {
    loading: boolean;
    data: Product | null | undefined;
    error: Error | null;
    refetch: () => void;
  }) => React.ReactNode;
  handle: string;
  onData?: (data: Product | null) => void;
}

/**
 * Wrapper component for fetching single product
 */
export function FetchProduct({
  children,
  handle,
  onData,
}: FetchProductProps) {
  const { data, isLoading, error, refetch } = useProductByHandleGET(handle, {
    handlers: { onData: onData as never },
  });

  return (
    <>
      {children({
        loading: isLoading,
        data,
        error: error as Error | null,
        refetch,
      })}
    </>
  );
}

export interface FetchProductRecommendationsProps {
  children: (result: {
    loading: boolean;
    data: Product[] | undefined;
    error: Error | null;
    refetch: () => void;
  }) => React.ReactNode;
  productId: string;
  limit?: number;
  onData?: (data: Product[]) => void;
}

/**
 * Wrapper component for fetching product recommendations
 */
export function FetchProductRecommendations({
  children,
  productId,
  limit = 4,
  onData,
}: FetchProductRecommendationsProps) {
  const { data, isLoading, error, refetch } = useProductRecommendationsGET(
    productId,
    limit,
    { handlers: { onData: onData as never } }
  );

  return (
    <>
      {children({
        loading: isLoading,
        data,
        error: error as Error | null,
        refetch,
      })}
    </>
  );
}

// =============================================================================
// Export
// =============================================================================

export const ProductsApi = {
  productsGET,
  productByHandleGET,
  productRecommendationsGET,
  useProductsGET,
  useProductByHandleGET,
  useProductRecommendationsGET,
  FetchProducts,
  FetchProduct,
  FetchProductRecommendations,
};

export default ProductsApi;
