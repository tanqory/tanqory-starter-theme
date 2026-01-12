// =============================================================================
// Search API (Draftbit 3-layer pattern)
// =============================================================================

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { createApiClient } from './client';
import { useGlobalVariables } from '../config/GlobalVariableContext';
import type { ApiHandlers } from '../utils/handleApiResponse';
import type { Product } from './ProductsApi';
import type { Collection } from './CollectionsApi';
import type { Article } from './BlogApi';

// =============================================================================
// Types
// =============================================================================

export interface SearchParams {
  query: string;
  types?: ('PRODUCT' | 'COLLECTION' | 'ARTICLE' | 'PAGE')[];
  limit?: number;
  cursor?: string;
}

export interface SearchResult {
  products: Product[];
  collections: Collection[];
  articles: Article[];
  pages: SearchPage[];
}

export interface SearchPage {
  id: string;
  title: string;
  handle: string;
  excerpt?: string;
}

export interface PredictiveSearchResult {
  products: Product[];
  collections: Collection[];
  articles: Article[];
  queries: string[];
}

// =============================================================================
// Layer 1: Raw Fetch Functions
// =============================================================================

/**
 * Full search
 */
export async function searchGET(
  Constants: ReturnType<typeof useGlobalVariables>,
  params: SearchParams,
  handlers: ApiHandlers<SearchResult> = {}
): Promise<SearchResult> {
  const client = createApiClient(Constants);
  const response = await client.get<SearchResult>('/storefront/search', params as unknown as Record<string, unknown>, { handlers });

  if (response.ok && response.data) {
    return response.data;
  }

  return { products: [], collections: [], articles: [], pages: [] };
}

/**
 * Predictive search (autocomplete)
 */
export async function predictiveSearchGET(
  Constants: ReturnType<typeof useGlobalVariables>,
  query: string,
  limit: number = 5,
  handlers: ApiHandlers<PredictiveSearchResult> = {}
): Promise<PredictiveSearchResult> {
  const client = createApiClient(Constants);
  const response = await client.get<PredictiveSearchResult>(
    '/storefront/search/predictive',
    { query, limit },
    { handlers }
  );

  if (response.ok && response.data) {
    return response.data;
  }

  return { products: [], collections: [], articles: [], queries: [] };
}

// =============================================================================
// Layer 2: React Query Hooks
// =============================================================================

/**
 * Hook for full search
 */
export function useSearchGET(
  params: SearchParams,
  options: { enabled?: boolean; handlers?: ApiHandlers<SearchResult> } = {}
) {
  const Constants = useGlobalVariables();

  return useQuery({
    queryKey: ['search', params],
    queryFn: () => searchGET(Constants, params, options.handlers),
    enabled: options.enabled !== false && !!params.query,
    staleTime: 60 * 1000, // 1 minute
  });
}

/**
 * Hook for predictive search
 */
export function usePredictiveSearchGET(
  query: string,
  limit: number = 5,
  options: { enabled?: boolean; handlers?: ApiHandlers<PredictiveSearchResult> } = {}
) {
  const Constants = useGlobalVariables();

  return useQuery({
    queryKey: ['predictiveSearch', query, limit],
    queryFn: () => predictiveSearchGET(Constants, query, limit, options.handlers),
    enabled: options.enabled !== false && query.length >= 2,
    staleTime: 30 * 1000, // 30 seconds
  });
}

// =============================================================================
// Layer 3: Wrapper Components (Render Props)
// =============================================================================

export interface FetchSearchProps {
  children: (result: {
    loading: boolean;
    data: SearchResult | undefined;
    error: Error | null;
    refetch: () => void;
  }) => React.ReactNode;
  query: string;
  types?: SearchParams['types'];
  limit?: number;
  onData?: (data: SearchResult) => void;
}

/**
 * Wrapper component for search
 */
export function FetchSearch({
  children,
  query,
  types,
  limit = 20,
  onData,
}: FetchSearchProps) {
  const { data, isLoading, error, refetch } = useSearchGET(
    { query, types, limit },
    { handlers: { onData } }
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

export interface FetchPredictiveSearchProps {
  children: (result: {
    loading: boolean;
    data: PredictiveSearchResult | undefined;
    error: Error | null;
  }) => React.ReactNode;
  query: string;
  limit?: number;
  onData?: (data: PredictiveSearchResult) => void;
}

/**
 * Wrapper component for predictive search
 */
export function FetchPredictiveSearch({
  children,
  query,
  limit = 5,
  onData,
}: FetchPredictiveSearchProps) {
  const { data, isLoading, error } = usePredictiveSearchGET(query, limit, {
    handlers: { onData },
  });

  return (
    <>
      {children({
        loading: isLoading,
        data,
        error: error as Error | null,
      })}
    </>
  );
}

// =============================================================================
// Export
// =============================================================================

export const SearchApi = {
  searchGET,
  predictiveSearchGET,
  useSearchGET,
  usePredictiveSearchGET,
  FetchSearch,
  FetchPredictiveSearch,
};

export default SearchApi;
