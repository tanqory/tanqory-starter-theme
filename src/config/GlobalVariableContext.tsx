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
  publishableKey: string;  // SDK publishable key (pk_live_* or pk_test_*)
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
  | { type: 'UPDATE_MANY'; payload: Partial<GlobalVariables> }
  | { type: 'INJECT_CONFIG'; payload: Partial<GlobalVariables> };

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
  storeId: import.meta.env.VITE_STORE_ID || '',
  publishableKey: import.meta.env.VITE_PUBLISHABLE_KEY || '',
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
// URL Config Helper
// =============================================================================

/**
 * Extract config from URL search params or hash
 * Supports: ?storeId=xxx&pk=xxx or #storeId=xxx&pk=xxx
 */
const getConfigFromUrl = (): Partial<GlobalVariables> => {
  try {
    const config: Partial<GlobalVariables> = {};

    // Try URL search params first
    const urlParams = new URLSearchParams(window.location.search);

    // Try hash params as fallback (for SPA routing)
    const hashParams = window.location.hash.includes('?')
      ? new URLSearchParams(window.location.hash.split('?')[1])
      : null;

    const getParam = (key: string): string | null => {
      return urlParams.get(key) || hashParams?.get(key) || null;
    };

    const storeId = getParam('storeId') || getParam('store_id');
    const publishableKey = getParam('pk') || getParam('publishableKey');
    const apiUrl = getParam('apiUrl') || getParam('api_url');

    if (storeId) config.storeId = storeId;
    if (publishableKey) config.publishableKey = publishableKey;
    if (apiUrl) config.apiUrl = apiUrl;

    if (Object.keys(config).length > 0) {
      console.log('[GlobalVariables] Config from URL:', config);
    }

    return config;
  } catch (e) {
    console.warn('Failed to parse URL config:', e);
    return {};
  }
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

    // Config injection from Studio - always applies regardless of __loaded__ state
    case 'INJECT_CONFIG':
      return { ...state, ...action.payload };

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

  // Load from storage and URL config on mount
  useEffect(() => {
    const stored = loadFromStorage();
    const urlConfig = getConfigFromUrl();
    // Priority: URL params > initialValues > stored values
    dispatch({ type: 'LOAD_FROM_STORAGE', payload: { ...stored, ...initialValues, ...urlConfig } });
  }, [initialValues]);

  // Listen for config injection from Studio (via editor-bridge.ts)
  useEffect(() => {
    const handleConfigEvent = (event: Event) => {
      const customEvent = event as CustomEvent<{
        storeId?: string;
        publishableKey?: string;
        apiUrl?: string;
        accessToken?: string;
        storeName?: string;
      }>;
      const config = customEvent.detail;

      if (config) {
        console.log('[GlobalVariables] Received config from Studio:', config);
        // Use INJECT_CONFIG to bypass __loaded__ check
        const payload: Partial<GlobalVariables> = {};
        if (config.storeId) payload.storeId = config.storeId;
        if (config.publishableKey) payload.publishableKey = config.publishableKey;
        if (config.apiUrl) payload.apiUrl = config.apiUrl;
        if (config.accessToken) payload.accessToken = config.accessToken;
        if (config.storeName) payload.storeName = config.storeName;
        dispatch({ type: 'INJECT_CONFIG', payload });
      }
    };

    window.addEventListener('tanqory:config', handleConfigEvent);

    // Also check for config that was set before provider mounted
    const windowConfig = (window as unknown as { __TANQORY_CONFIG__?: {
      storeId?: string;
      publishableKey?: string;
      apiUrl?: string;
      accessToken?: string;
      storeName?: string;
    } }).__TANQORY_CONFIG__;

    if (windowConfig) {
      console.log('[GlobalVariables] Found existing config on window:', windowConfig);
      const payload: Partial<GlobalVariables> = {};
      if (windowConfig.storeId) payload.storeId = windowConfig.storeId;
      if (windowConfig.publishableKey) payload.publishableKey = windowConfig.publishableKey;
      if (windowConfig.apiUrl) payload.apiUrl = windowConfig.apiUrl;
      if (windowConfig.accessToken) payload.accessToken = windowConfig.accessToken;
      if (windowConfig.storeName) payload.storeName = windowConfig.storeName;
      dispatch({ type: 'INJECT_CONFIG', payload });
    }

    return () => {
      window.removeEventListener('tanqory:config', handleConfigEvent);
    };
  }, []); // Run once on mount

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
