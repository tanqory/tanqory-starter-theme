// =============================================================================
// Template API (Draftbit 3-layer pattern)
// =============================================================================

import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { createApiClient } from './client';
import { useGlobalVariables } from '../config/GlobalVariableContext';
import { usePrevious } from '../utils/usePrevious';
import { useIsFocused } from '../utils/useIsFocused';
import type { ApiHandlers } from '../utils/handleApiResponse';
import type { Template, ScreenType } from '../types/template';

// =============================================================================
// Types
// =============================================================================

export interface TemplateResponse {
  template: Template;
}

export interface TemplatesResponse {
  templates: Template[];
}

// =============================================================================
// Layer 1: Raw Fetch Functions
// =============================================================================

/**
 * Fetch template by screen type (for storefront)
 */
export async function templateByScreenTypeGET(
  Constants: ReturnType<typeof useGlobalVariables>,
  screenType: ScreenType,
  handlers: ApiHandlers<TemplateResponse> = {}
): Promise<Template | null> {
  const client = createApiClient(Constants);
  const response = await client.get<TemplateResponse>(
    `/storefront/templates/${screenType}`,
    undefined,
    { handlers }
  );

  if (response.ok && response.data) {
    return response.data.template;
  }

  return null;
}

/**
 * Fetch template by handle (for storefront)
 */
export async function templateByHandleGET(
  Constants: ReturnType<typeof useGlobalVariables>,
  handle: string,
  handlers: ApiHandlers<TemplateResponse> = {}
): Promise<Template | null> {
  const client = createApiClient(Constants);
  const response = await client.get<TemplateResponse>(
    `/storefront/templates/handle/${handle}`,
    undefined,
    { handlers }
  );

  if (response.ok && response.data) {
    return response.data.template;
  }

  return null;
}

/**
 * Fetch all templates (for studio/editor)
 */
export async function templatesGET(
  Constants: ReturnType<typeof useGlobalVariables>,
  handlers: ApiHandlers<TemplatesResponse> = {}
): Promise<Template[]> {
  const client = createApiClient(Constants);
  const response = await client.get<TemplatesResponse>(
    '/studio/templates',
    undefined,
    { handlers }
  );

  if (response.ok && response.data) {
    return response.data.templates;
  }

  return [];
}

// =============================================================================
// Layer 2: React Query Hooks
// =============================================================================

/**
 * Hook to fetch template by screen type
 */
export function useTemplateByScreenTypeGET(
  screenType: ScreenType,
  options: { handlers?: ApiHandlers<TemplateResponse> } = {}
) {
  const Constants = useGlobalVariables();

  return useQuery({
    queryKey: ['template', 'screenType', screenType],
    queryFn: () => templateByScreenTypeGET(Constants, screenType, options.handlers),
    enabled: !!screenType,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch template by handle
 */
export function useTemplateByHandleGET(
  handle: string,
  options: { handlers?: ApiHandlers<TemplateResponse> } = {}
) {
  const Constants = useGlobalVariables();

  return useQuery({
    queryKey: ['template', 'handle', handle],
    queryFn: () => templateByHandleGET(Constants, handle, options.handlers),
    enabled: !!handle,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch all templates
 */
export function useTemplatesGET(
  options: { handlers?: ApiHandlers<TemplatesResponse> } = {}
) {
  const Constants = useGlobalVariables();

  return useQuery({
    queryKey: ['templates'],
    queryFn: () => templatesGET(Constants, options.handlers),
    staleTime: 5 * 60 * 1000,
  });
}

// =============================================================================
// Layer 3: Wrapper Components (Render Props)
// =============================================================================

export interface FetchTemplateProps {
  children: (result: {
    loading: boolean;
    data: Template | null | undefined;
    error: Error | null;
    refetch: () => void;
  }) => React.ReactNode;
  screenType: ScreenType;
  onData?: (data: Template | null) => void;
  refetchOnFocus?: boolean;
}

/**
 * Wrapper component for fetching template by screen type
 */
export function FetchTemplate({
  children,
  screenType,
  onData,
  refetchOnFocus = true,
}: FetchTemplateProps) {
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { data, isLoading, error, refetch } = useTemplateByScreenTypeGET(screenType, {
    handlers: { onData: onData as never },
  });

  useEffect(() => {
    if (refetchOnFocus && !prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused, refetch, refetchOnFocus]);

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

export interface FetchTemplateByHandleProps {
  children: (result: {
    loading: boolean;
    data: Template | null | undefined;
    error: Error | null;
    refetch: () => void;
  }) => React.ReactNode;
  handle: string;
  onData?: (data: Template | null) => void;
}

/**
 * Wrapper component for fetching template by handle
 */
export function FetchTemplateByHandle({
  children,
  handle,
  onData,
}: FetchTemplateByHandleProps) {
  const { data, isLoading, error, refetch } = useTemplateByHandleGET(handle, {
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

export interface FetchTemplatesProps {
  children: (result: {
    loading: boolean;
    data: Template[] | undefined;
    error: Error | null;
    refetch: () => void;
  }) => React.ReactNode;
  onData?: (data: Template[]) => void;
}

/**
 * Wrapper component for fetching all templates
 */
export function FetchTemplates({
  children,
  onData,
}: FetchTemplatesProps) {
  const { data, isLoading, error, refetch } = useTemplatesGET({
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

// =============================================================================
// Export
// =============================================================================

export const TemplateApi = {
  templateByScreenTypeGET,
  templateByHandleGET,
  templatesGET,
  useTemplateByScreenTypeGET,
  useTemplateByHandleGET,
  useTemplatesGET,
  FetchTemplate,
  FetchTemplateByHandle,
  FetchTemplates,
};

export default TemplateApi;
