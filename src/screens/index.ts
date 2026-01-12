// =============================================================================
// Screens Index (Draftbit pattern)
// =============================================================================

// Home & Navigation
export { HomeScreen } from './HomeScreen';
export type { HomeScreenProps } from './HomeScreen';

// Collection & Products
export { CollectionScreen } from './CollectionScreen';
export type { CollectionScreenProps } from './CollectionScreen';

export { ProductScreen } from './ProductScreen';
export type { ProductScreenProps } from './ProductScreen';

// Cart & Checkout
export { CartScreen } from './CartScreen';
export type { CartScreenProps } from './CartScreen';

// Search
export { SearchScreen } from './SearchScreen';
export type { SearchScreenProps } from './SearchScreen';

// Blog
export { BlogScreen } from './BlogScreen';
export type { BlogScreenProps } from './BlogScreen';

export { ArticleScreen } from './ArticleScreen';
export type { ArticleScreenProps } from './ArticleScreen';

// Pages
export { PageScreen } from './PageScreen';
export type { PageScreenProps } from './PageScreen';

// Account & Auth
export { AccountScreen } from './AccountScreen';
export type { AccountScreenProps } from './AccountScreen';

export { LoginScreen } from './LoginScreen';
export type { LoginScreenProps } from './LoginScreen';

export { RegisterScreen } from './RegisterScreen';
export type { RegisterScreenProps } from './RegisterScreen';

// Errors
export { NotFoundScreen } from './NotFoundScreen';
export type { NotFoundScreenProps } from './NotFoundScreen';

// =============================================================================
// Screen Registry
// =============================================================================

import { HomeScreen } from './HomeScreen';
import { CollectionScreen } from './CollectionScreen';
import { ProductScreen } from './ProductScreen';
import { CartScreen } from './CartScreen';
import { SearchScreen } from './SearchScreen';
import { BlogScreen } from './BlogScreen';
import { ArticleScreen } from './ArticleScreen';
import { PageScreen } from './PageScreen';
import { AccountScreen } from './AccountScreen';
import { LoginScreen } from './LoginScreen';
import { RegisterScreen } from './RegisterScreen';
import { NotFoundScreen } from './NotFoundScreen';

// Common screen props interface
export interface ScreenProps {
  navigation?: {
    navigate: (screen: string, params?: Record<string, unknown>) => void;
    goBack: () => void;
  };
  route?: {
    params?: Record<string, unknown>;
  };
}

export interface ScreenRegistryItem {
  name: string;
  component: React.ComponentType<ScreenProps>;
  path: string;
  requiresAuth?: boolean;
  hideFromNav?: boolean;
}

export const ScreenRegistry: Record<string, ScreenRegistryItem> = {
  Home: {
    name: 'Home',
    component: HomeScreen,
    path: '/',
  },
  Collection: {
    name: 'Collection',
    component: CollectionScreen ,
    path: '/collections/:handle',
  },
  Product: {
    name: 'Product',
    component: ProductScreen ,
    path: '/products/:handle',
  },
  Cart: {
    name: 'Cart',
    component: CartScreen ,
    path: '/cart',
  },
  Search: {
    name: 'Search',
    component: SearchScreen ,
    path: '/search',
  },
  Blog: {
    name: 'Blog',
    component: BlogScreen ,
    path: '/blog',
  },
  Article: {
    name: 'Article',
    component: ArticleScreen ,
    path: '/blogs/:blogHandle/:handle',
  },
  Page: {
    name: 'Page',
    component: PageScreen ,
    path: '/pages/:handle',
  },
  Account: {
    name: 'Account',
    component: AccountScreen ,
    path: '/account',
    requiresAuth: true,
  },
  Login: {
    name: 'Login',
    component: LoginScreen ,
    path: '/account/login',
    hideFromNav: true,
  },
  Register: {
    name: 'Register',
    component: RegisterScreen ,
    path: '/account/register',
    hideFromNav: true,
  },
  NotFound: {
    name: 'Not Found',
    component: NotFoundScreen ,
    path: '*',
    hideFromNav: true,
  },
};

// =============================================================================
// Helper Functions
// =============================================================================

export function getScreenByName(name: string): ScreenRegistryItem | undefined {
  return ScreenRegistry[name];
}

export function getScreenByPath(path: string): ScreenRegistryItem | undefined {
  return Object.values(ScreenRegistry).find((screen) => {
    // Simple path matching - for complex matching use a router library
    const pattern = screen.path
      .replace(/:[^/]+/g, '[^/]+')
      .replace(/\*/g, '.*');
    return new RegExp(`^${pattern}$`).test(path);
  });
}

export function getAllScreens(): ScreenRegistryItem[] {
  return Object.values(ScreenRegistry);
}

export function getNavigableScreens(): ScreenRegistryItem[] {
  return Object.values(ScreenRegistry).filter((screen) => !screen.hideFromNav);
}

export function getAuthRequiredScreens(): ScreenRegistryItem[] {
  return Object.values(ScreenRegistry).filter((screen) => screen.requiresAuth);
}
