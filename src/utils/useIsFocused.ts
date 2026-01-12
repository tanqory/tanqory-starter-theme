import { useState, useEffect } from 'react';

// =============================================================================
// useIsFocused Hook (Draftbit pattern)
// =============================================================================

/**
 * Track if the current page/tab is focused
 * Useful for refetching data when user returns to page
 */
export function useIsFocused(): boolean {
  const [isFocused, setIsFocused] = useState(!document.hidden);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsFocused(!document.hidden);
    };

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  return isFocused;
}

export default useIsFocused;
