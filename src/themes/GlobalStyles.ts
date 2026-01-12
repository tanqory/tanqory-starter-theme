// =============================================================================
// Global Styles (Draftbit pattern)
// =============================================================================

import { TanqoryTheme } from './Tanqory';

type Theme = typeof TanqoryTheme;

// =============================================================================
// Style Generators
// =============================================================================

export const ButtonStyles = (theme: Theme) => ({
  primary: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.secondary,
    borderRadius: theme.borderRadius.md,
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    fontWeight: theme.typography.fontWeight.medium,
    transition: `all ${theme.transitions.fast} ${theme.transitions.easing}`,
  },
  secondary: {
    backgroundColor: 'transparent',
    color: theme.colors.foreground,
    borderRadius: theme.borderRadius.md,
    border: `1px solid ${theme.colors.border}`,
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    fontWeight: theme.typography.fontWeight.medium,
    transition: `all ${theme.transitions.fast} ${theme.transitions.easing}`,
  },
  link: {
    backgroundColor: 'transparent',
    color: theme.colors.foreground,
    padding: 0,
    textDecoration: 'underline',
    textUnderlineOffset: '4px',
  },
});

export const TextStyles = (theme: Theme) => ({
  h1: {
    fontSize: theme.typography.fontSize['4xl'],
    fontWeight: theme.typography.fontWeight.bold,
    lineHeight: theme.typography.lineHeight.tight,
    color: theme.colors.foreground,
  },
  h2: {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.bold,
    lineHeight: theme.typography.lineHeight.tight,
    color: theme.colors.foreground,
  },
  h3: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.semibold,
    lineHeight: theme.typography.lineHeight.snug,
    color: theme.colors.foreground,
  },
  h4: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semibold,
    lineHeight: theme.typography.lineHeight.snug,
    color: theme.colors.foreground,
  },
  h5: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.medium,
    lineHeight: theme.typography.lineHeight.normal,
    color: theme.colors.foreground,
  },
  body: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.regular,
    lineHeight: theme.typography.lineHeight.normal,
    color: theme.colors.foreground,
  },
  bodySmall: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.regular,
    lineHeight: theme.typography.lineHeight.normal,
    color: theme.colors.foregroundSecondary,
  },
  caption: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.regular,
    lineHeight: theme.typography.lineHeight.normal,
    color: theme.colors.foregroundMuted,
  },
});

export const CardStyles = (theme: Theme) => ({
  base: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    border: `1px solid ${theme.colors.border}`,
    overflow: 'hidden',
  },
  elevated: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    boxShadow: theme.shadows.md,
    overflow: 'hidden',
  },
  interactive: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    border: `1px solid ${theme.colors.border}`,
    overflow: 'hidden',
    cursor: 'pointer',
    transition: `all ${theme.transitions.fast} ${theme.transitions.easing}`,
  },
});

export const InputStyles = (theme: Theme) => ({
  base: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
    border: `1px solid ${theme.colors.border}`,
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.foreground,
    outline: 'none',
    transition: `border-color ${theme.transitions.fast} ${theme.transitions.easing}`,
  },
  focus: {
    borderColor: theme.colors.primary,
  },
  error: {
    borderColor: theme.colors.error,
  },
});

export const ImageStyles = (theme: Theme) => ({
  cover: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  contain: {
    width: '100%',
    height: '100%',
    objectFit: 'contain' as const,
  },
  rounded: {
    borderRadius: theme.borderRadius.lg,
  },
});

export const ContainerStyles = (theme: Theme) => ({
  page: {
    maxWidth: '1280px',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },
  full: {
    width: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },
});

export const SectionStyles = (theme: Theme) => ({
  base: {
    paddingTop: theme.spacing['2xl'],
    paddingBottom: theme.spacing['2xl'],
  },
  light: {
    backgroundColor: theme.colors.background,
    color: theme.colors.foreground,
  },
  dark: {
    backgroundColor: theme.colors.dark.background,
    color: theme.colors.dark.foreground,
  },
});

// =============================================================================
// Export All Styles
// =============================================================================

export const GlobalStyles = {
  ButtonStyles,
  TextStyles,
  CardStyles,
  InputStyles,
  ImageStyles,
  ContainerStyles,
  SectionStyles,
};

export default GlobalStyles;
