import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { Store } from '../apis';

// =============================================================================
// Types
// =============================================================================

// StoreConfig can be either a simple config (for initialization) or the full Store type (from API)
export type StoreConfig = Store | {
  name?: string;
  logo?: string;
  currency?: string;
  locale?: string;
  apiBaseUrl?: string;
};

export interface Customer {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface GlobalVariables {
  // Store Configuration
  storeId: string;
  storeName: string;
  storeUrl: string;
  apiUrl: string;
  STORE_CONFIG: StoreConfig | null;
  ANNOUNCEMENT_BAR: unknown | null;

  // Authentication
  accessToken: string | null;
  customerId: string | null;
  AUTH_TOKEN: string | null;
  CUSTOMER: Customer | null;

  // Cart
  CART: unknown | null;
  CART_ID: string | null;
  CART_COUNT: number;

  // User Preferences
  currency: string;
  locale: string;

  // Recently Viewed
  RECENTLY_VIEWED_PRODUCTS: unknown[];

  // UI State
  cartDrawerOpen: boolean;
  searchDrawerOpen: boolean;
  menuDrawerOpen: boolean;

  // Environment
  __env__: 'development' | 'staging' | 'production';
  __loaded__: boolean;
}

type Action =
  | { type: 'RESET' }
  | { type: 'LOAD_FROM_STORAGE'; payload: Partial<GlobalVariables> }
  | { type: 'UPDATE'; payload: { key: keyof GlobalVariables; value: unknown } }
  | { type: 'UPDATE_MANY'; payload: Partial<GlobalVariables> };

// =============================================================================
// Default Values
// =============================================================================

// Device variables (persisted to localStorage)
export const DeviceVariables: Partial<GlobalVariables> = {
  accessToken: null,
  customerId: null,
  locale: 'th',
  currency: 'THB',
};

// App variables (memory only)
export const AppVariables: GlobalVariables = {
  // Store
  storeId: '',
  storeName: 'Tanqory Store',
  storeUrl: '',
  apiUrl: import.meta.env.VITE_API_URL || 'https://api.tanqory.com',
  STORE_CONFIG: null,
  ANNOUNCEMENT_BAR: null,

  // Auth
  accessToken: null,
  customerId: null,
  AUTH_TOKEN: null,
  CUSTOMER: null,

  // Cart
  CART: null,
  CART_ID: null,
  CART_COUNT: 0,

  // Preferences
  currency: 'THB',
  locale: 'th',

  // Recently Viewed
  RECENTLY_VIEWED_PRODUCTS: [],

  // UI
  cartDrawerOpen: false,
  searchDrawerOpen: false,
  menuDrawerOpen: false,

  // Environment
  __env__: (import.meta.env.MODE as GlobalVariables['__env__']) || 'development',
  __loaded__: false,
};

// =============================================================================
// Storage Helpers
// =============================================================================

const STORAGE_KEY = 'tanqory_global_variables';

const loadFromStorage = (): Partial<GlobalVariables> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load from storage:', e);
  }
  return {};
};

const saveToStorage = (values: GlobalVariables) => {
  try {
    // Only persist DeviceVariables
    const toStore: Partial<GlobalVariables> = {};
    for (const key of Object.keys(DeviceVariables) as (keyof GlobalVariables)[]) {
      if (key in values) {
        toStore[key] = values[key] as never;
      }
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  } catch (e) {
    console.error('Failed to save to storage:', e);
  }
};

// =============================================================================
// Reducer
// =============================================================================

const reducer = (state: GlobalVariables, action: Action): GlobalVariables => {
  switch (action.type) {
    case 'RESET':
      return { ...AppVariables, __loaded__: true };

    case 'LOAD_FROM_STORAGE':
      return { ...state, ...action.payload, __loaded__: true };

    case 'UPDATE':
      return state.__loaded__
        ? { ...state, [action.payload.key]: action.payload.value }
        : state;

    case 'UPDATE_MANY':
      return state.__loaded__
        ? { ...state, ...action.payload }
        : state;

    default:
      return state;
  }
};

// =============================================================================
// Context
// =============================================================================

const GlobalVariableContext = createContext<GlobalVariables>(AppVariables);
const GlobalVariableUpdater = createContext<React.Dispatch<Action>>(() => {});

// =============================================================================
// Provider
// =============================================================================

export interface GlobalVariableProviderProps {
  children: React.ReactNode;
  initialValues?: Partial<GlobalVariables>;
}

export function GlobalVariableProvider({ children, initialValues }: GlobalVariableProviderProps) {
  const [state, dispatch] = useReducer(reducer, { ...AppVariables, ...initialValues });

  // Load from storage on mount
  useEffect(() => {
    const stored = loadFromStorage();
    dispatch({ type: 'LOAD_FROM_STORAGE', payload: { ...stored, ...initialValues } });
  }, [initialValues]);

  // Save to storage on change
  useEffect(() => {
    if (state.__loaded__) {
      saveToStorage(state);
    }
  }, [state]);

  return (
    <GlobalVariableUpdater.Provider value={dispatch}>
      <GlobalVariableContext.Provider value={state}>
        {children}
      </GlobalVariableContext.Provider>
    </GlobalVariableUpdater.Provider>
  );
}

// =============================================================================
// Hooks
// =============================================================================

/**
 * Get all global variables
 */
export function useGlobalVariables(): GlobalVariables {
  return useContext(GlobalVariableContext);
}

/**
 * Alias for useGlobalVariables (Draftbit compatibility)
 */
export function useValues(): GlobalVariables {
  return useContext(GlobalVariableContext);
}

/**
 * Get global variable (simplified hook for accessing variables)
 */
export function useGlobalVariable(): GlobalVariables {
  return useContext(GlobalVariableContext);
}

/**
 * Set a global variable
 */
export function useSetGlobalVariable() {
  const dispatch = useContext(GlobalVariableUpdater);
  return <K extends keyof GlobalVariables>(key: K, value: GlobalVariables[K]) => {
    dispatch({ type: 'UPDATE', payload: { key, value } });
    return value;
  };
}

/**
 * Update a single global variable
 */
export function useSetValue() {
  const dispatch = useContext(GlobalVariableUpdater);
  return <K extends keyof GlobalVariables>({ key, value }: { key: K; value: GlobalVariables[K] }) => {
    dispatch({ type: 'UPDATE', payload: { key, value } });
    return value;
  };
}

/**
 * Update multiple global variables
 */
export function useSetValues() {
  const dispatch = useContext(GlobalVariableUpdater);
  return (values: Partial<GlobalVariables>) => {
    dispatch({ type: 'UPDATE_MANY', payload: values });
  };
}

/**
 * Reset all global variables to defaults
 */
export function useReset() {
  const dispatch = useContext(GlobalVariableUpdater);
  return () => {
    dispatch({ type: 'RESET' });
  };
}

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Get logo URL from StoreConfig (handles both string and StoreImage types)
 */
export function getLogoUrl(config: StoreConfig | null, fallback = '/logo.svg'): string {
  if (!config?.logo) return fallback;
  return typeof config.logo === 'string' ? config.logo : config.logo.src;
}

// =============================================================================
// Export as namespace (Draftbit compatibility)
// =============================================================================

export const GlobalVariables = {
  useValues,
  useSetValue,
  useSetValues,
  useReset,
};

// Export context for advanced use cases
export { GlobalVariableContext };

export default GlobalVariables;
