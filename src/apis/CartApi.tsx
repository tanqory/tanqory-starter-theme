// =============================================================================
// Cart API (Draftbit 3-layer pattern)
// =============================================================================

import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createApiClient } from './client';
import { useGlobalVariables } from '../config/GlobalVariableContext';
import type { ApiHandlers } from '../utils/handleApiResponse';
import type { Product, ProductVariant } from './ProductsApi';

// =============================================================================
// Types
// =============================================================================

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: CartLine[];
  cost: CartCost;
  note?: string;
  attributes?: CartAttribute[];
}

export interface CartLine {
  id: string;
  quantity: number;
  product: Product;
  variant: ProductVariant;
  cost: {
    totalAmount: number;
    compareAtAmount?: number;
  };
}

export interface CartCost {
  subtotalAmount: number;
  totalAmount: number;
  totalTaxAmount?: number;
  totalDutyAmount?: number;
}

export interface CartAttribute {
  key: string;
  value: string;
}

export interface AddToCartInput {
  variantId: string;
  quantity: number;
}

export interface UpdateCartLineInput {
  lineId: string;
  quantity: number;
}

// =============================================================================
// Layer 1: Raw Fetch Functions
// =============================================================================

/**
 * Get current cart
 */
export async function cartGET(
  Constants: ReturnType<typeof useGlobalVariables>,
  cartId?: string,
  handlers: ApiHandlers<Cart> = {}
): Promise<Cart | null> {
  if (!cartId) return null;

  const client = createApiClient(Constants);
  const response = await client.get<Cart>(`/storefront/cart/${cartId}`, undefined, { handlers });

  if (response.ok && response.data) {
    return response.data;
  }

  return null;
}

/**
 * Create new cart
 */
export async function cartCreatePOST(
  Constants: ReturnType<typeof useGlobalVariables>,
  lines: AddToCartInput[] = [],
  handlers: ApiHandlers<Cart> = {}
): Promise<Cart | null> {
  const client = createApiClient(Constants);
  const response = await client.post<Cart>('/storefront/cart', { lines }, { handlers });

  if (response.ok && response.data) {
    return response.data;
  }

  return null;
}

/**
 * Add lines to cart
 */
export async function cartLinesAddPOST(
  Constants: ReturnType<typeof useGlobalVariables>,
  cartId: string,
  lines: AddToCartInput[],
  handlers: ApiHandlers<Cart> = {}
): Promise<Cart | null> {
  const client = createApiClient(Constants);
  const response = await client.post<Cart>(`/storefront/cart/${cartId}/lines`, { lines }, { handlers });

  if (response.ok && response.data) {
    return response.data;
  }

  return null;
}

/**
 * Update cart lines
 */
export async function cartLinesUpdatePUT(
  Constants: ReturnType<typeof useGlobalVariables>,
  cartId: string,
  lines: UpdateCartLineInput[],
  handlers: ApiHandlers<Cart> = {}
): Promise<Cart | null> {
  const client = createApiClient(Constants);
  const response = await client.put<Cart>(`/storefront/cart/${cartId}/lines`, { lines }, { handlers });

  if (response.ok && response.data) {
    return response.data;
  }

  return null;
}

/**
 * Remove lines from cart
 */
export async function cartLinesRemoveDELETE(
  Constants: ReturnType<typeof useGlobalVariables>,
  cartId: string,
  lineIds: string[],
  handlers: ApiHandlers<Cart> = {}
): Promise<Cart | null> {
  const client = createApiClient(Constants);
  const response = await client.post<Cart>(
    `/storefront/cart/${cartId}/lines/remove`,
    { lineIds },
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
 * Hook to get cart
 */
export function useCartGET(
  cartId?: string,
  options: { handlers?: ApiHandlers<Cart> } = {}
) {
  const Constants = useGlobalVariables();

  return useQuery({
    queryKey: ['cart', cartId],
    queryFn: () => cartGET(Constants, cartId, options.handlers),
    enabled: !!cartId,
    staleTime: 0, // Always refetch cart
  });
}

/**
 * Hook to create cart
 */
export function useCartCreatePOST(options: { handlers?: ApiHandlers<Cart> } = {}) {
  const Constants = useGlobalVariables();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (lines: AddToCartInput[]) =>
      cartCreatePOST(Constants, lines, options.handlers),
    onSuccess: (data) => {
      if (data) {
        queryClient.setQueryData(['cart', data.id], data);
      }
    },
  });
}

/**
 * Hook to add to cart
 */
export function useCartLinesAddPOST(options: { handlers?: ApiHandlers<Cart> } = {}) {
  const Constants = useGlobalVariables();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cartId, lines }: { cartId: string; lines: AddToCartInput[] }) =>
      cartLinesAddPOST(Constants, cartId, lines, options.handlers),
    onSuccess: (data, variables) => {
      if (data) {
        queryClient.setQueryData(['cart', variables.cartId], data);
      }
    },
  });
}

/**
 * Hook to update cart lines
 */
export function useCartLinesUpdatePUT(options: { handlers?: ApiHandlers<Cart> } = {}) {
  const Constants = useGlobalVariables();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cartId, lines }: { cartId: string; lines: UpdateCartLineInput[] }) =>
      cartLinesUpdatePUT(Constants, cartId, lines, options.handlers),
    onSuccess: (data, variables) => {
      if (data) {
        queryClient.setQueryData(['cart', variables.cartId], data);
      }
    },
  });
}

/**
 * Hook to remove from cart
 */
export function useCartLinesRemoveDELETE(options: { handlers?: ApiHandlers<Cart> } = {}) {
  const Constants = useGlobalVariables();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cartId, lineIds }: { cartId: string; lineIds: string[] }) =>
      cartLinesRemoveDELETE(Constants, cartId, lineIds, options.handlers),
    onSuccess: (data, variables) => {
      if (data) {
        queryClient.setQueryData(['cart', variables.cartId], data);
      }
    },
  });
}

// =============================================================================
// Layer 3: Wrapper Components (Render Props)
// =============================================================================

export interface FetchCartProps {
  children: (result: {
    loading: boolean;
    data: Cart | null | undefined;
    error: Error | null;
    refetch: () => void;
  }) => React.ReactNode;
  cartId?: string;
  onData?: (data: Cart | null) => void;
}

/**
 * Wrapper component for fetching cart
 */
export function FetchCart({
  children,
  cartId,
  onData,
}: FetchCartProps) {
  const { data, isLoading, error, refetch } = useCartGET(cartId, {
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

export const CartApi = {
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
};

export default CartApi;
