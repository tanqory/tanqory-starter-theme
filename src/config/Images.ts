// =============================================================================
// Image Configuration
// =============================================================================

export const Images = {
  // Placeholders
  placeholder: '/images/placeholder.svg',
  productPlaceholder: '/images/product-placeholder.svg',
  collectionPlaceholder: '/images/collection-placeholder.svg',
  avatarPlaceholder: '/images/avatar-placeholder.svg',

  // Logo
  logo: '/images/logo.svg',
  logoLight: '/images/logo-light.svg',
  logoDark: '/images/logo-dark.svg',

  // Icons
  cartIcon: '/images/icons/cart.svg',
  searchIcon: '/images/icons/search.svg',
  menuIcon: '/images/icons/menu.svg',

  // Social
  facebook: '/images/social/facebook.svg',
  instagram: '/images/social/instagram.svg',
  twitter: '/images/social/twitter.svg',
  youtube: '/images/social/youtube.svg',
  line: '/images/social/line.svg',

  // Payment
  visa: '/images/payment/visa.svg',
  mastercard: '/images/payment/mastercard.svg',
  promptpay: '/images/payment/promptpay.svg',
};

/**
 * Get image URL with CDN prefix
 */
export function getImageUrl(path: string, width?: number): string {
  if (!path) return Images.placeholder;

  // Already a full URL
  if (path.startsWith('http://') || path.startsWith('https://')) {
    if (width) {
      // Add width parameter for Shopify-style CDN
      return path.replace(/(\.[^.]+)$/, `_${width}x$1`);
    }
    return path;
  }

  // Relative path
  return path;
}

/**
 * Generate srcset for responsive images
 */
export function getImageSrcSet(path: string, widths: number[] = [400, 800, 1200]): string {
  return widths
    .map((w) => `${getImageUrl(path, w)} ${w}w`)
    .join(', ');
}

export default Images;
