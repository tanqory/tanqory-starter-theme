// =============================================================================
// API Client (Base)
// =============================================================================

import { handleApiResponse, cleanHeaders, encodeQueryParams } from '../utils/handleApiResponse';
import type { ApiResponse, ApiHandlers } from '../utils/handleApiResponse';
import type { GlobalVariables } from '../config/GlobalVariableContext';

export interface RequestOptions<T = unknown> {
  headers?: Record<string, string>;
  handlers?: ApiHandlers<T>;
}

/**
 * Base API client
 */
export class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseUrl: string, defaultHeaders: Record<string, string> = {}) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = defaultHeaders;
  }

  /**
   * Build full URL with query params
   */
  private buildUrl(
    path: string,
    params?: Record<string, unknown>
  ): string {
    const url = `${this.baseUrl}${path}`;
    return params ? `${url}${encodeQueryParams(params as Record<string, string | number | boolean | undefined | null>)}` : url;
  }

  /**
   * GET request
   */
  async get<T = unknown>(
    path: string,
    params?: Record<string, unknown>,
    options: RequestOptions<T> = {}
  ): Promise<ApiResponse<T>> {
    const response = await fetch(this.buildUrl(path, params as Record<string, unknown>), {
      method: 'GET',
      headers: cleanHeaders({
        'Content-Type': 'application/json',
        ...this.defaultHeaders,
        ...options.headers,
      }),
    });

    return handleApiResponse<T>(response, options.handlers);
  }

  /**
   * POST request
   */
  async post<T = unknown>(
    path: string,
    body?: unknown,
    options: RequestOptions<T> = {}
  ): Promise<ApiResponse<T>> {
    const response = await fetch(this.buildUrl(path), {
      method: 'POST',
      headers: cleanHeaders({
        'Content-Type': 'application/json',
        ...this.defaultHeaders,
        ...options.headers,
      }),
      body: body ? JSON.stringify(body) : undefined,
    });

    return handleApiResponse<T>(response, options.handlers);
  }

  /**
   * PUT request
   */
  async put<T = unknown>(
    path: string,
    body?: unknown,
    options: RequestOptions<T> = {}
  ): Promise<ApiResponse<T>> {
    const response = await fetch(this.buildUrl(path), {
      method: 'PUT',
      headers: cleanHeaders({
        'Content-Type': 'application/json',
        ...this.defaultHeaders,
        ...options.headers,
      }),
      body: body ? JSON.stringify(body) : undefined,
    });

    return handleApiResponse<T>(response, options.handlers);
  }

  /**
   * DELETE request
   */
  async delete<T = unknown>(
    path: string,
    options: RequestOptions<T> = {}
  ): Promise<ApiResponse<T>> {
    const response = await fetch(this.buildUrl(path), {
      method: 'DELETE',
      headers: cleanHeaders({
        'Content-Type': 'application/json',
        ...this.defaultHeaders,
        ...options.headers,
      }),
    });

    return handleApiResponse<T>(response, options.handlers);
  }

  /**
   * Set authorization header
   */
  setAuthToken(token: string | null) {
    if (token) {
      this.defaultHeaders['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.defaultHeaders['Authorization'];
    }
  }
}

/**
 * Create API client from global variables
 *
 * Uses X-Publishable-Key for SDK authentication (like Stripe's pk_live_*)
 * Falls back to X-Store-Id for backward compatibility
 */
export function createApiClient(Constants: GlobalVariables): ApiClient {
  const headers: Record<string, string> = {};

  // Prefer publishableKey for SDK authentication
  if (Constants.publishableKey) {
    headers['X-Publishable-Key'] = Constants.publishableKey;
  } else if (Constants.storeId) {
    // Fallback to X-Store-Id for backward compatibility
    headers['X-Store-Id'] = Constants.storeId;
  }

  const client = new ApiClient(Constants.apiUrl, headers);

  if (Constants.accessToken) {
    client.setAuthToken(Constants.accessToken);
  }

  return client;
}

export default ApiClient;
