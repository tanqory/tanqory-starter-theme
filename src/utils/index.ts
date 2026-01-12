// =============================================================================
// Utils Exports
// =============================================================================

export {
  handleApiResponse,
  isOkStatus,
  cleanHeaders,
  encodeQueryParams,
} from './handleApiResponse';
export type { ApiResponse, ApiHandlers } from './handleApiResponse';

export {
  formatPrice,
  formatCompareAtPrice,
  numberWithCommas,
  parsePrice,
  calculateDiscount,
  formatPriceRange,
} from './formatPrice';
export type { FormatPriceOptions } from './formatPrice';

export { usePrevious } from './usePrevious';
export { useIsFocused } from './useIsFocused';

// Re-export cn from lib
export { cn } from '../lib/utils';
