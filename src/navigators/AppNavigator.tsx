// =============================================================================
// App Navigator (Draftbit pattern)
// =============================================================================

import React, { useState, useEffect, createContext, useContext } from 'react';
import { useGlobalVariable } from '../config/GlobalVariableContext';
import { ScreenRegistry, getScreenByName } from '../screens';

// =============================================================================
// Types
// =============================================================================

interface NavigationState {
  currentScreen: string;
  params: Record<string, unknown>;
  history: Array<{ screen: string; params: Record<string, unknown> }>;
}

interface NavigationContextType {
  state: NavigationState;
  navigate: (screen: string, params?: Record<string, unknown>) => void;
  goBack: () => void;
  reset: (screen: string, params?: Record<string, unknown>) => void;
  canGoBack: boolean;
}

// =============================================================================
// Context
// =============================================================================

const NavigationContext = createContext<NavigationContextType | null>(null);

export function useNavigation(): NavigationContextType {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within AppNavigator');
  }
  return context;
}

// =============================================================================
// Helper Functions (moved before component for hoisting)
// =============================================================================

function parsePathToScreen(path: string): { screen: string; params: Record<string, unknown> } | null {
  // Check specific routes first (before wildcard)
  for (const [name, config] of Object.entries(ScreenRegistry)) {
    // Skip wildcard route in first pass
    if (config.path === '*') continue;

    const pattern = config.path
      .replace(/:([^/]+)/g, '(?<$1>[^/]+)')
      .replace(/\*/g, '.*');
    const regex = new RegExp(`^${pattern}$`);
    const match = path.match(regex);

    if (match) {
      return {
        screen: name,
        params: match.groups || {},
      };
    }
  }

  // If no match found, return NotFound
  if (path !== '/') {
    return {
      screen: 'NotFound',
      params: {},
    };
  }

  return null;
}

function buildUrl(pattern: string, params: Record<string, unknown>): string {
  let url = pattern;
  for (const [key, value] of Object.entries(params)) {
    url = url.replace(`:${key}`, String(value));
  }
  // Remove any remaining placeholders
  url = url.replace(/:[^/]+/g, '');
  // Clean up trailing slashes
  url = url.replace(/\/+$/, '') || '/';
  return url;
}

// =============================================================================
// Component
// =============================================================================

interface AppNavigatorProps {
  initialScreen?: string;
  onStateChange?: (state: NavigationState) => void;
}

export function AppNavigator({ initialScreen = 'Home', onStateChange }: AppNavigatorProps) {
  const { AUTH_TOKEN } = useGlobalVariable();

  // Parse initial URL on mount
  const getInitialState = (): NavigationState => {
    const path = window.location.pathname;
    const screenEntry = parsePathToScreen(path);
    if (screenEntry) {
      return {
        currentScreen: screenEntry.screen,
        params: screenEntry.params,
        history: [],
      };
    }
    return {
      currentScreen: initialScreen,
      params: {},
      history: [],
    };
  };

  const [state, setState] = useState<NavigationState>(getInitialState);

  // Handle URL changes (browser back/forward)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const screenEntry = parsePathToScreen(path);
      if (screenEntry) {
        setState((prev) => ({
          ...prev,
          currentScreen: screenEntry.screen,
          params: screenEntry.params,
        }));
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update URL when screen changes
  useEffect(() => {
    const screenConfig = getScreenByName(state.currentScreen);
    if (screenConfig) {
      const url = buildUrl(screenConfig.path, state.params);
      if (window.location.pathname !== url) {
        window.history.pushState({ screen: state.currentScreen, params: state.params }, '', url);
      }
    }
    onStateChange?.(state);
  }, [state, onStateChange]);

  // Navigation functions
  const navigate = (screen: string, params: Record<string, unknown> = {}) => {
    const screenConfig = getScreenByName(screen);

    // Check auth requirements
    if (screenConfig?.requiresAuth && !AUTH_TOKEN) {
      setState((prev) => ({
        ...prev,
        currentScreen: 'Login',
        params: { redirect: screen },
        history: [...prev.history, { screen: prev.currentScreen, params: prev.params }],
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      currentScreen: screen,
      params,
      history: [...prev.history, { screen: prev.currentScreen, params: prev.params }],
    }));
  };

  const goBack = () => {
    if (state.history.length > 0) {
      const previous = state.history[state.history.length - 1];
      setState((prev) => ({
        ...prev,
        currentScreen: previous.screen,
        params: previous.params,
        history: prev.history.slice(0, -1),
      }));
      window.history.back();
    }
  };

  const reset = (screen: string, params: Record<string, unknown> = {}) => {
    setState({
      currentScreen: screen,
      params,
      history: [],
    });
    window.history.replaceState({ screen, params }, '', buildUrl(getScreenByName(screen)?.path || '/', params));
  };

  const canGoBack = state.history.length > 0;

  // Get current screen component
  const screenConfig = getScreenByName(state.currentScreen);
  const ScreenComponent = screenConfig?.component || ScreenRegistry.NotFound.component;

  return (
    <NavigationContext.Provider value={{ state, navigate, goBack, reset, canGoBack }}>
      <ScreenComponent
        navigation={{ navigate, goBack }}
        route={{ params: state.params }}
      />
    </NavigationContext.Provider>
  );
}

// =============================================================================
// Link Component
// =============================================================================

interface LinkProps {
  to: string;
  params?: Record<string, unknown>;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export function Link({ to, params = {}, children, style, className }: LinkProps) {
  const { navigate } = useNavigation();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(to, params);
  };

  const screenConfig = getScreenByName(to);
  const href = screenConfig ? buildUrl(screenConfig.path, params) : '/';

  return (
    <a href={href} onClick={handleClick} style={style} className={className}>
      {children}
    </a>
  );
}

// =============================================================================
// Auth Guard
// =============================================================================

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { AUTH_TOKEN } = useGlobalVariable();
  const { navigate } = useNavigation();

  useEffect(() => {
    if (!AUTH_TOKEN && !fallback) {
      navigate('Login');
    }
  }, [AUTH_TOKEN, fallback, navigate]);

  if (!AUTH_TOKEN) {
    return fallback ? <>{fallback}</> : null;
  }

  return <>{children}</>;
}

export default AppNavigator;
