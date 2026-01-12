// =============================================================================
// Collections API (Draftbit 3-layer pattern)
// =============================================================================

import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { createApiClient } from './client';
import { useGlobalVariables } from '../config/GlobalVariableContext';
import { usePrevious } from '../utils/usePrevious';
import { useIsFocused } from '../utils/useIsFocused';
import type { ApiHandlers } from '../utils/handleApiResponse';
import type { Product } from './ProductsApi';

// =============================================================================
// Types
// =============================================================================

export interface Collection {
  id: string;
  title: string;
  handle: string;
  description?: string;
  descriptionHtml?: string;
  image?: CollectionImage;
  productsCount?: number;
  products?: Product[];
}

export interface CollectionImage {
  src: string;
  altText?: string;
  width?: number;
  height?: number;
}

export interface CollectionsParams {
  limit?: number;
  cursor?: string;
}

export interface CollectionsResponse {
  collections: Collection[];
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
  };
}

export interface CollectionWithProductsParams {
  handle: string;
  productsLimit?: number;
  productsCursor?: string;
  sortKey?: 'TITLE' | 'PRICE' | 'BEST_SELLING' | 'CREATED_AT';
  reverse?: boolean;
}

// =============================================================================
// Layer 1: Raw Fetch Functions
// =============================================================================

/**
 * Fetch collections list
 */
export async function collectionsGET(
  Constants: ReturnType<typeof useGlobalVariables>,
  params: CollectionsParams = {},
  handlers: ApiHandlers<CollectionsResponse> = {}
): Promise<CollectionsResponse> {
  const client = createApiClient(Constants);
  const response = await client.get<CollectionsResponse>('/storefront/collections', params as Record<string, unknown>, { handlers });

  if (response.ok && response.data) {
    return response.data;
  }

  return { collections: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } };
}

/**
 * Fetch single collection by handle (with products)
 */
export async function collectionByHandleGET(
  Constants: ReturnType<typeof useGlobalVariables>,
  params: CollectionWithProductsParams,
  handlers: ApiHandlers<Collection> = {}
): Promise<Collection | null> {
  const client = createApiClient(Constants);
  const { handle, ...queryParams } = params;
  const response = await client.get<Collection>(
    `/storefront/collections/${handle}`,
    queryParams,
    { handlers }
  );

  if (response.ok && response.data) {
    return response.data;
  }

  return null;
}

// =============================================================================
// Layer 2: React Query Hooks
// =============================================================================

/**
 * Hook to fetch collections list
 */
export function useCollectionsGET(
  params: CollectionsParams = {},
  options: { refetchInterval?: number; handlers?: ApiHandlers<CollectionsResponse> } = {}
) {
  const Constants = useGlobalVariables();

  return useQuery({
    queryKey: ['collections', params],
    queryFn: () => collectionsGET(Constants, params, options.handlers),
    refetchInterval: options.refetchInterval,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch single collection with products
 */
export function useCollectionByHandleGET(
  params: CollectionWithProductsParams,
  options: { handlers?: ApiHandlers<Collection> } = {}
) {
  const Constants = useGlobalVariables();

  return useQuery({
    queryKey: ['collection', params.handle, params],
    queryFn: () => collectionByHandleGET(Constants, params, options.handlers),
    enabled: !!params.handle,
    staleTime: 5 * 60 * 1000,
  });
}

// =============================================================================
// Layer 3: Wrapper Components (Render Props)
// =============================================================================

export interface FetchCollectionsProps {
  children: (result: {
    loading: boolean;
    data: Collection[] | undefined;
    error: Error | null;
    refetch: () => void;
    hasNextPage: boolean;
  }) => React.ReactNode;
  limit?: number;
  onData?: (data: CollectionsResponse) => void;
  refetchInterval?: number;
  refetchOnFocus?: boolean;
}

/**
 * Wrapper component for fetching collections
 */
export function FetchCollections({
  children,
  limit = 12,
  onData,
  refetchInterval,
  refetchOnFocus = true,
}: FetchCollectionsProps) {
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { data, isLoading, error, refetch } = useCollectionsGET(
    { limit },
    { refetchInterval, handlers: { onData } }
  );

  useEffect(() => {
    if (refetchOnFocus && !prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused, refetch, refetchOnFocus]);

  return (
    <>
      {children({
        loading: isLoading,
        data: data?.collections,
        error: error as Error | null,
        refetch,
        hasNextPage: data?.pageInfo?.hasNextPage ?? false,
      })}
    </>
  );
}

export interface FetchCollectionProps {
  children: (result: {
    loading: boolean;
    data: Collection | null | undefined;
    error: Error | null;
    refetch: () => void;
  }) => React.ReactNode;
  handle: string;
  productsLimit?: number;
  sortKey?: CollectionWithProductsParams['sortKey'];
  onData?: (data: Collection | null) => void;
}

/**
 * Wrapper component for fetching single collection
 */
export function FetchCollection({
  children,
  handle,
  productsLimit = 12,
  sortKey,
  onData,
}: FetchCollectionProps) {
  const { data, isLoading, error, refetch } = useCollectionByHandleGET(
    { handle, productsLimit, sortKey },
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

export const CollectionsApi = {
  collectionsGET,
  collectionByHandleGET,
  useCollectionsGET,
  useCollectionByHandleGET,
  FetchCollections,
  FetchCollection,
};

export default CollectionsApi;
