// =============================================================================
// Store API (Draftbit 3-layer pattern)
// =============================================================================

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { createApiClient } from './client';
import { useGlobalVariables } from '../config/GlobalVariableContext';
import type { ApiHandlers } from '../utils/handleApiResponse';

// =============================================================================
// Types
// =============================================================================

export interface Store {
  id: string;
  name: string;
  description?: string;
  primaryDomain: string;
  email?: string;
  phone?: string;
  address?: StoreAddress;
  currencyCode: string;
  languageCode: string;
  moneyFormat: string;
  logo?: StoreImage;
  socialLinks?: StoreSocialLinks;
  paymentSettings?: StorePaymentSettings;
}

export interface StoreAddress {
  address1?: string;
  address2?: string;
  city?: string;
  province?: string;
  country?: string;
  zip?: string;
}

export interface StoreImage {
  src: string;
  altText?: string;
}

export interface StoreSocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  tiktok?: string;
  line?: string;
}

export interface StorePaymentSettings {
  acceptedCardBrands: string[];
  supportedDigitalWallets: string[];
  enabledPresentmentCurrencies: string[];
}

export interface Menu {
  id: string;
  handle: string;
  title: string;
  items: MenuItem[];
}

export interface MenuItem {
  id: string;
  title: string;
  url: string;
  type: 'LINK' | 'COLLECTION' | 'PRODUCT' | 'PAGE' | 'BLOG';
  items?: MenuItem[];
}

// =============================================================================
// Layer 1: Raw Fetch Functions
// =============================================================================

/**
 * Get store info
 */
export async function storeGET(
  Constants: ReturnType<typeof useGlobalVariables>,
  handlers: ApiHandlers<Store> = {}
): Promise<Store | null> {
  const client = createApiClient(Constants);
  const response = await client.get<Store>('/storefront/store', undefined, { handlers });

  if (response.ok && response.data) {
    return response.data;
  }

  return null;
}

/**
 * Get menu by handle
 */
export async function menuGET(
  Constants: ReturnType<typeof useGlobalVariables>,
  handle: string,
  handlers: ApiHandlers<Menu> = {}
): Promise<Menu | null> {
  const client = createApiClient(Constants);
  const response = await client.get<Menu>(`/storefront/menus/${handle}`, undefined, { handlers });

  if (response.ok && response.data) {
    return response.data;
  }

  return null;
}

// =============================================================================
// Layer 2: React Query Hooks
// =============================================================================

/**
 * Hook to get store info
 */
export function useStoreGET(options: { handlers?: ApiHandlers<Store> } = {}) {
  const Constants = useGlobalVariables();

  return useQuery({
    queryKey: ['store'],
    queryFn: () => storeGET(Constants, options.handlers),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}

/**
 * Hook to get menu
 */
export function useMenuGET(
  handle: string,
  options: { handlers?: ApiHandlers<Menu> } = {}
) {
  const Constants = useGlobalVariables();

  return useQuery({
    queryKey: ['menu', handle],
    queryFn: () => menuGET(Constants, handle, options.handlers),
    enabled: !!handle,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}

// =============================================================================
// Layer 3: Wrapper Components (Render Props)
// =============================================================================

export interface FetchStoreProps {
  children: (result: {
    loading: boolean;
    data: Store | null | undefined;
    error: Error | null;
    refetch: () => void;
  }) => React.ReactNode;
  onData?: (data: Store | null) => void;
}

/**
 * Wrapper component for fetching store info
 */
export function FetchStore({
  children,
  onData,
}: FetchStoreProps) {
  const { data, isLoading, error, refetch } = useStoreGET({
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

export interface FetchMenuProps {
  children: (result: {
    loading: boolean;
    data: Menu | null | undefined;
    error: Error | null;
    refetch: () => void;
  }) => React.ReactNode;
  handle: string;
  onData?: (data: Menu | null) => void;
}

/**
 * Wrapper component for fetching menu
 */
export function FetchMenu({
  children,
  handle,
  onData,
}: FetchMenuProps) {
  const { data, isLoading, error, refetch } = useMenuGET(handle, {
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

export const StoreApi = {
  storeGET,
  menuGET,
  useStoreGET,
  useMenuGET,
  FetchStore,
  FetchMenu,
};

export default StoreApi;
