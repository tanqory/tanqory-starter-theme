// =============================================================================
// Login Screen (Draftbit pattern)
// =============================================================================

import React, { useState } from 'react';
import { useGlobalVariable, useSetGlobalVariable, getLogoUrl } from '../config/GlobalVariableContext';
import { HeaderSection } from '../components/sections/HeaderSection';
import { FooterSection } from '../components/sections/FooterSection';
import { ContainerBlock } from '../components/blocks/ContainerBlock';
import { HeadingBlock } from '../components/blocks/HeadingBlock';
import { TextBlock } from '../components/blocks/TextBlock';
import { TanqoryTheme, InputStyles, ButtonStyles } from '../themes';

// =============================================================================
// Types
// =============================================================================

export interface LoginScreenProps {
  navigation?: {
    navigate: (screen: string, params?: Record<string, unknown>) => void;
    goBack: () => void;
  };
  route?: {
    params?: {
      redirect?: string;
    };
  };
}

// =============================================================================
// Screen
// =============================================================================

export function LoginScreen({ navigation, route }: LoginScreenProps) {
  const theme = TanqoryTheme;
  const inputStyles = InputStyles(theme);
  const buttonStyles = ButtonStyles(theme);
  const { STORE_CONFIG } = useGlobalVariable();
  const logoUrl = getLogoUrl(STORE_CONFIG);
  const setGlobalVariable = useSetGlobalVariable();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const redirectUrl = route?.params?.redirect || '/account';

  const handleNavigate = (href: string) => {
    if (href === '/') {
      navigation?.navigate('Home');
    } else if (href === '/cart') {
      navigation?.navigate('Cart');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Mock login - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate successful login
      setGlobalVariable('AUTH_TOKEN', 'mock-token-123');
      setGlobalVariable('CUSTOMER', {
        id: '1',
        email,
        firstName: 'John',
        lastName: 'Doe',
      });

      navigation?.navigate('Account');
    } catch {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const getInputStyle = (field: string): React.CSSProperties => ({
    ...inputStyles.base,
    width: '100%',
    ...(focusedField === field && inputStyles.focus),
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <HeaderSection
        logo={{ src: logoUrl, alt: STORE_CONFIG?.name || 'Store' }}
        showSearch={false}
        showCart
        onCartClick={() => handleNavigate('/cart')}
      />

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: theme.spacing['3xl'],
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '400px',
            padding: theme.spacing['2xl'],
            backgroundColor: theme.colors.background,
            borderRadius: theme.borderRadius.xl,
            boxShadow: theme.shadows.lg,
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: theme.spacing.xl }}>
            <HeadingBlock text="Welcome Back" level="h1" alignment="center" />
            <div style={{ marginTop: theme.spacing.sm }}>
              <TextBlock
                text="Sign in to your account to continue"
                preset="body"
                alignment="center"
                color={theme.colors.foregroundMuted}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div style={{ marginBottom: theme.spacing.md }}>
              <label
                style={{
                  display: 'block',
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: theme.typography.fontWeight.medium,
                  color: theme.colors.foreground,
                  marginBottom: theme.spacing.xs,
                }}
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                style={getInputStyle('email')}
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: theme.spacing.md }}>
              <label
                style={{
                  display: 'block',
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: theme.typography.fontWeight.medium,
                  color: theme.colors.foreground,
                  marginBottom: theme.spacing.xs,
                }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                style={getInputStyle('password')}
                placeholder="••••••••"
                required
              />
            </div>

            {/* Forgot Password */}
            <div style={{ textAlign: 'right', marginBottom: theme.spacing.lg }}>
              <button
                type="button"
                onClick={() => navigation?.navigate('ForgotPassword')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: theme.colors.primary,
                  fontSize: theme.typography.fontSize.sm,
                  cursor: 'pointer',
                }}
              >
                Forgot password?
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <p
                style={{
                  color: theme.colors.error,
                  fontSize: theme.typography.fontSize.sm,
                  marginBottom: theme.spacing.md,
                  textAlign: 'center',
                }}
              >
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                ...buttonStyles.primary,
                width: '100%',
                padding: theme.spacing.md,
                border: 'none',
                cursor: loading ? 'wait' : 'pointer',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Register Link */}
          <div
            style={{
              textAlign: 'center',
              marginTop: theme.spacing.xl,
              paddingTop: theme.spacing.lg,
              borderTop: `1px solid ${theme.colors.border}`,
            }}
          >
            <span
              style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.foregroundMuted,
              }}
            >
              Don't have an account?{' '}
            </span>
            <button
              type="button"
              onClick={() => navigation?.navigate('Register')}
              style={{
                background: 'none',
                border: 'none',
                color: theme.colors.primary,
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.medium,
                cursor: 'pointer',
              }}
            >
              Create one
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <FooterSection
        logo={{ src: logoUrl, alt: STORE_CONFIG?.name || 'Store' }}
        columns={[]}
        copyrightText={`© ${new Date().getFullYear()} ${STORE_CONFIG?.name || 'Store'}. All rights reserved.`}
      />
    </div>
  );
}

export default LoginScreen;
