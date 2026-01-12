// =============================================================================
// Tanqory Starter Theme - App Entry (Draftbit pattern)
// =============================================================================

import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalVariableProvider } from './config/GlobalVariableContext';
import { AppNavigator } from './navigators';

// =============================================================================
// Query Client Configuration
// =============================================================================

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
      retry: 1,
    },
    mutations: {
      retry: 0,
    },
  },
});

// =============================================================================
// App Component
// =============================================================================

export interface AppProps {
  initialScreen?: string;
  storeConfig?: {
    name?: string;
    logo?: string;
    currency?: string;
    locale?: string;
    apiBaseUrl?: string;
  };
  onNavigationStateChange?: (state: {
    currentScreen: string;
    params: Record<string, unknown>;
  }) => void;
}

export function App({
  initialScreen = 'Home',
  storeConfig,
  onNavigationStateChange,
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalVariableProvider
        initialValues={
          storeConfig
            ? {
                STORE_CONFIG: storeConfig,
              }
            : undefined
        }
      >
        <AppNavigator
          initialScreen={initialScreen}
          onStateChange={onNavigationStateChange}
        />
      </GlobalVariableProvider>
    </QueryClientProvider>
  );
}

// =============================================================================
// Render Helper
// =============================================================================

export function renderApp(
  container: HTMLElement | string,
  props?: AppProps
): void {
  const rootElement =
    typeof container === 'string' ? document.querySelector(container) : container;

  if (!rootElement) {
    throw new Error(`Container not found: ${container}`);
  }

  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App {...props} />
    </React.StrictMode>
  );
}

export default App;
