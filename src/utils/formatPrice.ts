// =============================================================================
// Price Formatting Utilities
// =============================================================================

export interface FormatPriceOptions {
  currency?: string;
  locale?: string;
  showCurrency?: boolean;
  decimals?: number;
}

/**
 * Format price with currency
 */
export function formatPrice(
  amount: number,
  options: FormatPriceOptions = {}
): string {
  const {
    currency = 'THB',
    locale = 'th-TH',
    showCurrency = true,
    decimals = 0,
  } = options;

  try {
    const formatter = new Intl.NumberFormat(locale, {
      style: showCurrency ? 'currency' : 'decimal',
      currency: showCurrency ? currency : undefined,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

    return formatter.format(amount);
  } catch {
    // Fallback formatting
    const formatted = amount.toLocaleString(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    return showCurrency ? `฿${formatted}` : formatted;
  }
}

/**
 * Format price with comma separators
 */
export function numberWithCommas(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Parse price string to number
 */
export function parsePrice(value: string): number {
  const cleaned = value.replace(/[^\d.-]/g, '');
  return parseFloat(cleaned) || 0;
}

/**
 * Calculate discount percentage
 */
export function calculateDiscount(originalPrice: number, salePrice: number): number {
  if (originalPrice <= 0 || salePrice >= originalPrice) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

/**
 * Format compare-at price (original price before discount)
 */
export function formatCompareAtPrice(
  amount: number,
  options: FormatPriceOptions = {}
): string {
  return formatPrice(amount, options);
}

/**
 * Format price range
 */
export function formatPriceRange(
  minPrice: number,
  maxPrice: number,
  options: FormatPriceOptions = {}
): string {
  if (minPrice === maxPrice) {
    return formatPrice(minPrice, options);
  }
  return `${formatPrice(minPrice, options)} - ${formatPrice(maxPrice, options)}`;
}

export default formatPrice;
