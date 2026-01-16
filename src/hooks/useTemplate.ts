// =============================================================================
// useTemplate Hook
// =============================================================================
// Hook for screens to load and use templates
// =============================================================================

import { useMemo } from 'react';
import { useTemplateByScreenTypeGET } from '../apis/TemplateApi';
import type { Template, TemplateSection, ScreenType } from '../types/template';
import { DEFAULT_HOME_TEMPLATE, DEFAULT_PRODUCT_TEMPLATE, DEFAULT_COLLECTION_TEMPLATE } from '../types/template';

// =============================================================================
// Types
// =============================================================================

export interface UseTemplateOptions {
  /** Fallback to default template if API fails */
  useFallback?: boolean;
}

export interface UseTemplateResult {
  /** Template data */
  template: Template | null;
  /** Sorted sections (enabled only) */
  sections: TemplateSection[];
  /** All sections including disabled */
  allSections: TemplateSection[];
  /** Loading state */
  loading: boolean;
  /** Error if any */
  error: Error | null;
  /** Refetch function */
  refetch: () => void;
  /** Check if template is ready */
  isReady: boolean;
}

// =============================================================================
// Default Templates Map
// =============================================================================

const DEFAULT_TEMPLATES: Partial<Record<ScreenType, Template>> = {
  home: DEFAULT_HOME_TEMPLATE,
  product: DEFAULT_PRODUCT_TEMPLATE,
  collection: DEFAULT_COLLECTION_TEMPLATE,
};

// =============================================================================
// Hook
// =============================================================================

/**
 * Hook for screens to load template configuration
 *
 * @example
 * ```tsx
 * function HomeScreen() {
 *   const { sections, loading, isReady } = useTemplate('home');
 *
 *   if (!isReady) return <Loading />;
 *
 *   return (
 *     <TemplateRenderer sections={sections} />
 *   );
 * }
 * ```
 */
export function useTemplate(
  screenType: ScreenType,
  options: UseTemplateOptions = {}
): UseTemplateResult {
  const { useFallback = true } = options;

  const { data, isLoading, error, refetch } = useTemplateByScreenTypeGET(screenType);

  // Use API data or fallback to default
  const template = useMemo(() => {
    if (data) return data;
    if (useFallback && DEFAULT_TEMPLATES[screenType]) {
      return DEFAULT_TEMPLATES[screenType] || null;
    }
    return null;
  }, [data, useFallback, screenType]);

  // Sort sections by position
  const allSections = useMemo(() => {
    if (!template?.sections) return [];
    return [...template.sections].sort((a, b) => a.position - b.position);
  }, [template]);

  // Filter enabled sections only
  const sections = useMemo(() => {
    return allSections.filter((section) => section.enabled);
  }, [allSections]);

  return {
    template,
    sections,
    allSections,
    loading: isLoading,
    error: error as Error | null,
    refetch,
    isReady: !isLoading && !!template,
  };
}

// =============================================================================
// Helper Hooks
// =============================================================================

/**
 * Get sections by type from template
 */
export function useSectionsByType(
  template: Template | null,
  type: string
): TemplateSection[] {
  return useMemo(() => {
    if (!template?.sections) return [];
    return template.sections.filter((s) => s.type === type && s.enabled);
  }, [template, type]);
}

/**
 * Get a specific section by ID from template
 */
export function useSectionById(
  template: Template | null,
  sectionId: string
): TemplateSection | undefined {
  return useMemo(() => {
    if (!template?.sections) return undefined;
    return template.sections.find((s) => s.id === sectionId);
  }, [template, sectionId]);
}

export default useTemplate;
