// =============================================================================
// Tanqory Theme Configuration (Draftbit pattern)
// =============================================================================

export const TanqoryTheme = {
  // Base
  disabledOpacity: 0.5,
  roundness: 8,

  // Colors
  colors: {
    // Brand
    primary: 'rgb(0, 0, 0)',
    primaryHover: 'rgb(30, 30, 30)',
    secondary: 'rgb(255, 255, 255)',
    secondaryHover: 'rgb(245, 245, 245)',

    // Background
    background: 'rgb(255, 255, 255)',
    backgroundSecondary: 'rgb(249, 250, 251)',
    backgroundTertiary: 'rgb(243, 244, 246)',

    // Foreground
    foreground: 'rgb(17, 24, 39)',
    foregroundSecondary: 'rgb(107, 114, 128)',
    foregroundMuted: 'rgb(156, 163, 175)',

    // Border
    border: 'rgb(229, 231, 235)',
    borderSecondary: 'rgb(209, 213, 219)',

    // Status
    success: 'rgb(34, 197, 94)',
    successLight: 'rgb(220, 252, 231)',
    warning: 'rgb(234, 179, 8)',
    warningLight: 'rgb(254, 249, 195)',
    error: 'rgb(239, 68, 68)',
    errorLight: 'rgb(254, 226, 226)',
    info: 'rgb(59, 130, 246)',
    infoLight: 'rgb(219, 234, 254)',

    // Sale
    sale: 'rgb(220, 38, 38)',
    saleBackground: 'rgb(254, 226, 226)',

    // Overlay
    overlay: 'rgba(0, 0, 0, 0.5)',
    overlayLight: 'rgba(0, 0, 0, 0.3)',

    // Dark mode variants
    dark: {
      background: 'rgb(17, 24, 39)',
      backgroundSecondary: 'rgb(31, 41, 55)',
      foreground: 'rgb(255, 255, 255)',
      foregroundSecondary: 'rgb(156, 163, 175)',
      border: 'rgb(55, 65, 81)',
    },
  },

  // Spacing
  spacing: {
    '3xs': '2px',
    '2xs': '4px',
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
    '4xl': '96px',
  },

  // Typography
  typography: {
    fontFamily: {
      heading: 'system-ui, -apple-system, sans-serif',
      body: 'system-ui, -apple-system, sans-serif',
      mono: 'ui-monospace, monospace',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
  },

  // Border radius
  borderRadius: {
    none: '0px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '24px',
    full: '9999px',
  },

  // Shadows
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },

  // Transitions
  transitions: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Z-index
  zIndex: {
    base: 0,
    dropdown: 100,
    sticky: 200,
    overlay: 300,
    modal: 400,
    popover: 500,
    tooltip: 600,
  },
};

export type Theme = typeof TanqoryTheme;

export default TanqoryTheme;
