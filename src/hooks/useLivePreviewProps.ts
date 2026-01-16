/**
 * Live Preview Props Hook
 *
 * Enables real-time props updates from Studio Editor without full page reload.
 * Sections can use this hook to receive prop changes via postMessage.
 *
 * @example
 * ```tsx
 * function FeaturedCollectionSection({ collectionHandle, heading }: Props) {
 *   // Will override collectionHandle with Studio Editor's value when changed
 *   const liveProps = useLivePreviewProps('FeaturedCollectionSection', { collectionHandle, heading });
 *
 *   return (
 *     <FetchProducts collection={liveProps.collectionHandle}>
 *       {/* ... *\/}
 *     </FetchProducts>
 *   );
 * }
 * ```
 */

import { useState, useEffect, useRef, useCallback } from 'react';

interface LivePreviewEvent {
  sectionName: string;
  props: Record<string, unknown>;
}

/**
 * Hook to enable live preview props updates from Studio Editor
 *
 * @param sectionName - Name of the section (should match data-section attribute)
 * @param defaultProps - Default/initial props from parent component
 * @returns Merged props with live preview overrides
 */
export function useLivePreviewProps<T extends Record<string, unknown>>(
  sectionName: string,
  defaultProps: T
): T {
  // Store live props overrides
  const [liveOverrides, setLiveOverrides] = useState<Partial<T>>({});

  // Track if we're in Studio iframe
  const isInStudio = useRef(false);

  // Check if running in Studio iframe
  useEffect(() => {
    isInStudio.current = typeof window !== 'undefined' && window.parent !== window;
  }, []);

  // Listen for live preview updates
  useEffect(() => {
    if (!isInStudio.current) return;

    const handleLivePreviewUpdate = (event: CustomEvent<LivePreviewEvent>) => {
      const { sectionName: targetSection, props } = event.detail;

      // Only update if this is our section
      if (targetSection === sectionName) {
        console.log(`[LivePreview] ${sectionName} received props update:`, props);
        setLiveOverrides((prev) => ({
          ...prev,
          ...props,
        }));
      }
    };

    // Listen for the custom event dispatched by editor-bridge.ts
    window.addEventListener(
      'tanqory:section:props-update',
      handleLivePreviewUpdate as EventListener
    );

    return () => {
      window.removeEventListener(
        'tanqory:section:props-update',
        handleLivePreviewUpdate as EventListener
      );
    };
  }, [sectionName]);

  // Merge default props with live overrides
  // Live overrides take precedence
  return {
    ...defaultProps,
    ...liveOverrides,
  } as T;
}

/**
 * Hook to listen for all live preview updates (for debugging or global handlers)
 *
 * @param onUpdate - Callback when any section props are updated
 */
export function useLivePreviewListener(
  onUpdate: (sectionName: string, props: Record<string, unknown>) => void
): void {
  const callbackRef = useRef(onUpdate);
  callbackRef.current = onUpdate;

  useEffect(() => {
    const isInStudio = typeof window !== 'undefined' && window.parent !== window;
    if (!isInStudio) return;

    const handleUpdate = (event: CustomEvent<LivePreviewEvent>) => {
      const { sectionName, props } = event.detail;
      callbackRef.current(sectionName, props);
    };

    window.addEventListener(
      'tanqory:section:props-update',
      handleUpdate as EventListener
    );

    return () => {
      window.removeEventListener(
        'tanqory:section:props-update',
        handleUpdate as EventListener
      );
    };
  }, []);
}

/**
 * Hook to reset live preview overrides (e.g., when user cancels changes)
 *
 * @returns Function to reset all live preview overrides
 */
export function useLivePreviewReset(): () => void {
  const reset = useCallback(() => {
    // Dispatch reset event that all sections listen to
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('tanqory:section:props-reset');
      window.dispatchEvent(event);
    }
  }, []);

  return reset;
}

export default useLivePreviewProps;
