// =============================================================================
// Register Screen (Draftbit pattern)
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

export interface RegisterScreenProps {
  navigation?: {
    navigate: (screen: string, params?: Record<string, unknown>) => void;
    goBack: () => void;
  };
  route?: {
    params?: Record<string, unknown>;
  };
}

// =============================================================================
// Screen
// =============================================================================

export function RegisterScreen({ navigation }: RegisterScreenProps) {
  const theme = TanqoryTheme;
  const inputStyles = InputStyles(theme);
  const buttonStyles = ButtonStyles(theme);
  const { STORE_CONFIG } = useGlobalVariable();
  const logoUrl = getLogoUrl(STORE_CONFIG);
  const setGlobalVariable = useSetGlobalVariable();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleNavigate = (href: string) => {
    if (href === '/') {
      navigation?.navigate('Home');
    } else if (href === '/cart') {
      navigation?.navigate('Cart');
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      // Mock registration - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate successful registration and login
      setGlobalVariable('AUTH_TOKEN', 'mock-token-123');
      setGlobalVariable('CUSTOMER', {
        id: '1',
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });

      navigation?.navigate('Account');
    } catch {
      setError('An error occurred. Please try again.');
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
            maxWidth: '450px',
            padding: theme.spacing['2xl'],
            backgroundColor: theme.colors.background,
            borderRadius: theme.borderRadius.xl,
            boxShadow: theme.shadows.lg,
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: theme.spacing.xl }}>
            <HeadingBlock text="Create Account" level="h1" alignment="center" />
            <div style={{ marginTop: theme.spacing.sm }}>
              <TextBlock
                text="Join us and start shopping"
                preset="body"
                alignment="center"
                color={theme.colors.foregroundMuted}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Name Fields */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: theme.spacing.md,
                marginBottom: theme.spacing.md,
              }}
            >
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: theme.typography.fontSize.sm,
                    fontWeight: theme.typography.fontWeight.medium,
                    color: theme.colors.foreground,
                    marginBottom: theme.spacing.xs,
                  }}
                >
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  onFocus={() => setFocusedField('firstName')}
                  onBlur={() => setFocusedField(null)}
                  style={getInputStyle('firstName')}
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: theme.typography.fontSize.sm,
                    fontWeight: theme.typography.fontWeight.medium,
                    color: theme.colors.foreground,
                    marginBottom: theme.spacing.xs,
                  }}
                >
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  onFocus={() => setFocusedField('lastName')}
                  onBlur={() => setFocusedField(null)}
                  style={getInputStyle('lastName')}
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

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
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
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
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                style={getInputStyle('password')}
                placeholder="••••••••"
                required
                minLength={8}
              />
              <p
                style={{
                  fontSize: theme.typography.fontSize.xs,
                  color: theme.colors.foregroundMuted,
                  marginTop: theme.spacing.xs,
                }}
              >
                At least 8 characters
              </p>
            </div>

            {/* Confirm Password Field */}
            <div style={{ marginBottom: theme.spacing.lg }}>
              <label
                style={{
                  display: 'block',
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: theme.typography.fontWeight.medium,
                  color: theme.colors.foreground,
                  marginBottom: theme.spacing.xs,
                }}
              >
                Confirm Password
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                onFocus={() => setFocusedField('confirmPassword')}
                onBlur={() => setFocusedField(null)}
                style={getInputStyle('confirmPassword')}
                placeholder="••••••••"
                required
              />
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
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          {/* Login Link */}
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
              Already have an account?{' '}
            </span>
            <button
              type="button"
              onClick={() => navigation?.navigate('Login')}
              style={{
                background: 'none',
                border: 'none',
                color: theme.colors.primary,
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.medium,
                cursor: 'pointer',
              }}
            >
              Sign in
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

export default RegisterScreen;
