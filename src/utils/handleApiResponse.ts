// =============================================================================
// API Response Handler (Draftbit pattern)
// =============================================================================

export interface ApiResponse<T = unknown> {
  status: number;
  statusText: string;
  ok: boolean;
  data: T | null;
  error: string | null;
}

export interface ApiHandlers<T = unknown> {
  onData?: (data: T) => void;
  on2xx?: (response: ApiResponse<T>) => void;
  on401?: (response: ApiResponse<T>) => void;
  on403?: (response: ApiResponse<T>) => void;
  on404?: (response: ApiResponse<T>) => void;
  on4xx?: (response: ApiResponse<T>) => void;
  on5xx?: (response: ApiResponse<T>) => void;
  onError?: (error: Error) => void;
}

/**
 * Check if status code is successful
 */
export function isOkStatus(status: number): boolean {
  return status >= 200 && status < 300;
}

/**
 * Handle API response with status-specific callbacks (Draftbit pattern)
 */
export async function handleApiResponse<T = unknown>(
  response: Response,
  handlers: ApiHandlers<T> = {}
): Promise<ApiResponse<T>> {
  const { status, statusText, ok } = response;

  let data: T | null = null;
  let error: string | null = null;

  try {
    const text = await response.text();
    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        // Response is not JSON
        data = text as unknown as T;
      }
    }
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to parse response';
  }

  const result: ApiResponse<T> = {
    status,
    statusText,
    ok,
    data,
    error,
  };

  // Call status-specific handlers
  if (data && handlers.onData) {
    handlers.onData(data);
  }

  if (isOkStatus(status)) {
    handlers.on2xx?.(result);
  } else if (status === 401) {
    handlers.on401?.(result);
  } else if (status === 403) {
    handlers.on403?.(result);
  } else if (status === 404) {
    handlers.on404?.(result);
  } else if (status >= 400 && status < 500) {
    handlers.on4xx?.(result);
  } else if (status >= 500) {
    handlers.on5xx?.(result);
  }

  return result;
}

/**
 * Clean headers by removing undefined values
 */
export function cleanHeaders(
  headers: Record<string, string | undefined>
): Record<string, string> {
  const cleaned: Record<string, string> = {};
  for (const [key, value] of Object.entries(headers)) {
    if (value !== undefined && value !== null) {
      cleaned[key] = value;
    }
  }
  return cleaned;
}

/**
 * Encode query parameters
 */
export function encodeQueryParams(
  params: Record<string, string | number | boolean | undefined | null>
): string {
  const encoded = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&');
  return encoded ? `?${encoded}` : '';
}

export default handleApiResponse;
