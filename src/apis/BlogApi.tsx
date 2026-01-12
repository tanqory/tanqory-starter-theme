// =============================================================================
// Blog API (Draftbit 3-layer pattern)
// =============================================================================

import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { createApiClient } from './client';
import { useGlobalVariables } from '../config/GlobalVariableContext';
import { usePrevious } from '../utils/usePrevious';
import { useIsFocused } from '../utils/useIsFocused';
import type { ApiHandlers } from '../utils/handleApiResponse';

// =============================================================================
// Types
// =============================================================================

export interface Blog {
  id: string;
  title: string;
  handle: string;
  articles?: Article[];
}

export interface Article {
  id: string;
  title: string;
  handle: string;
  excerpt?: string;
  content?: string;
  contentHtml?: string;
  author?: ArticleAuthor;
  image?: ArticleImage;
  tags?: string[];
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleAuthor {
  name: string;
  email?: string;
  bio?: string;
}

export interface ArticleImage {
  src: string;
  altText?: string;
  width?: number;
  height?: number;
}

export interface BlogsParams {
  limit?: number;
}

export interface ArticlesParams {
  blogHandle?: string;
  limit?: number;
  cursor?: string;
  tag?: string;
}

export interface ArticlesResponse {
  articles: Article[];
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
 * Fetch blogs list
 */
export async function blogsGET(
  Constants: ReturnType<typeof useGlobalVariables>,
  params: BlogsParams = {},
  handlers: ApiHandlers<Blog[]> = {}
): Promise<Blog[]> {
  const client = createApiClient(Constants);
  const response = await client.get<Blog[]>('/storefront/blogs', params as Record<string, unknown>, { handlers });

  if (response.ok && response.data) {
    return response.data;
  }

  return [];
}

/**
 * Fetch articles list
 */
export async function articlesGET(
  Constants: ReturnType<typeof useGlobalVariables>,
  params: ArticlesParams = {},
  handlers: ApiHandlers<ArticlesResponse> = {}
): Promise<ArticlesResponse> {
  const client = createApiClient(Constants);
  const response = await client.get<ArticlesResponse>('/storefront/articles', params as Record<string, unknown>, { handlers });

  if (response.ok && response.data) {
    return response.data;
  }

  return { articles: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } };
}

/**
 * Fetch single article by handle
 */
export async function articleByHandleGET(
  Constants: ReturnType<typeof useGlobalVariables>,
  blogHandle: string,
  articleHandle: string,
  handlers: ApiHandlers<Article> = {}
): Promise<Article | null> {
  const client = createApiClient(Constants);
  const response = await client.get<Article>(
    `/storefront/blogs/${blogHandle}/articles/${articleHandle}`,
    undefined,
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
 * Hook to fetch blogs
 */
export function useBlogsGET(
  params: BlogsParams = {},
  options: { handlers?: ApiHandlers<Blog[]> } = {}
) {
  const Constants = useGlobalVariables();

  return useQuery({
    queryKey: ['blogs', params],
    queryFn: () => blogsGET(Constants, params, options.handlers),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook to fetch articles
 */
export function useArticlesGET(
  params: ArticlesParams = {},
  options: { refetchInterval?: number; handlers?: ApiHandlers<ArticlesResponse> } = {}
) {
  const Constants = useGlobalVariables();

  return useQuery({
    queryKey: ['articles', params],
    queryFn: () => articlesGET(Constants, params, options.handlers),
    refetchInterval: options.refetchInterval,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch single article
 */
export function useArticleByHandleGET(
  blogHandle: string,
  articleHandle: string,
  options: { handlers?: ApiHandlers<Article> } = {}
) {
  const Constants = useGlobalVariables();

  return useQuery({
    queryKey: ['article', blogHandle, articleHandle],
    queryFn: () => articleByHandleGET(Constants, blogHandle, articleHandle, options.handlers),
    enabled: !!blogHandle && !!articleHandle,
    staleTime: 5 * 60 * 1000,
  });
}

// =============================================================================
// Layer 3: Wrapper Components (Render Props)
// =============================================================================

export interface FetchArticlesProps {
  children: (result: {
    loading: boolean;
    data: Article[] | undefined;
    error: Error | null;
    refetch: () => void;
    hasNextPage: boolean;
  }) => React.ReactNode;
  blogHandle?: string;
  limit?: number;
  tag?: string;
  onData?: (data: ArticlesResponse) => void;
  refetchOnFocus?: boolean;
}

/**
 * Wrapper component for fetching articles
 */
export function FetchArticles({
  children,
  blogHandle,
  limit = 12,
  tag,
  onData,
  refetchOnFocus = true,
}: FetchArticlesProps) {
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { data, isLoading, error, refetch } = useArticlesGET(
    { blogHandle, limit, tag },
    { handlers: { onData } }
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
        data: data?.articles,
        error: error as Error | null,
        refetch,
        hasNextPage: data?.pageInfo?.hasNextPage ?? false,
      })}
    </>
  );
}

export interface FetchArticleProps {
  children: (result: {
    loading: boolean;
    data: Article | null | undefined;
    error: Error | null;
    refetch: () => void;
  }) => React.ReactNode;
  blogHandle: string;
  articleHandle: string;
  onData?: (data: Article | null) => void;
}

/**
 * Wrapper component for fetching single article
 */
export function FetchArticle({
  children,
  blogHandle,
  articleHandle,
  onData,
}: FetchArticleProps) {
  const { data, isLoading, error, refetch } = useArticleByHandleGET(
    blogHandle,
    articleHandle,
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

export const BlogApi = {
  blogsGET,
  articlesGET,
  articleByHandleGET,
  useBlogsGET,
  useArticlesGET,
  useArticleByHandleGET,
  FetchArticles,
  FetchArticle,
};

export default BlogApi;
