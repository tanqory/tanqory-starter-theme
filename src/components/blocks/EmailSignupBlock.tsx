// =============================================================================
// Email Signup Block (Draftbit pattern)
// =============================================================================

import React, { useState, useCallback } from 'react';
import { TanqoryTheme, ButtonStyles, InputStyles } from '../../themes';

// =============================================================================
// Types
// =============================================================================

export interface EmailSignupBlockProps {
  placeholder?: string;
  buttonText?: string;
  successMessage?: string;
  errorMessage?: string;
  layout?: 'inline' | 'stacked';
  size?: 'sm' | 'md' | 'lg';
  onSubmit?: (email: string) => Promise<void>;
  className?: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const EmailSignupBlockSchema = {
  name: 'Email Signup',
  tag: 'form',
  settings: [
    {
      id: 'placeholder',
      type: 'text',
      label: 'Placeholder',
      default: 'Enter your email',
    },
    {
      id: 'buttonText',
      type: 'text',
      label: 'Button text',
      default: 'Subscribe',
    },
    {
      id: 'successMessage',
      type: 'text',
      label: 'Success message',
      default: 'Thank you for subscribing!',
    },
    {
      id: 'errorMessage',
      type: 'text',
      label: 'Error message',
      default: 'Something went wrong. Please try again.',
    },
    {
      id: 'layout',
      type: 'select',
      label: 'Layout',
      options: [
        { value: 'inline', label: 'Inline' },
        { value: 'stacked', label: 'Stacked' },
      ],
      default: 'inline',
    },
    {
      id: 'size',
      type: 'select',
      label: 'Size',
      options: [
        { value: 'sm', label: 'Small' },
        { value: 'md', label: 'Medium' },
        { value: 'lg', label: 'Large' },
      ],
      default: 'md',
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function EmailSignupBlock({
  placeholder = 'Enter your email',
  buttonText = 'Subscribe',
  successMessage = 'Thank you for subscribing!',
  errorMessage = 'Something went wrong. Please try again.',
  layout = 'inline',
  size = 'md',
  onSubmit,
  className,
}: EmailSignupBlockProps) {
  const theme = TanqoryTheme;
  const buttonStyles = ButtonStyles(theme);
  const inputStyles = InputStyles(theme);

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isFocused, setIsFocused] = useState(false);

  // Size mappings
  const sizeMap = {
    sm: {
      padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
      fontSize: theme.typography.fontSize.sm,
    },
    md: {
      padding: `${theme.spacing.sm} ${theme.spacing.md}`,
      fontSize: theme.typography.fontSize.base,
    },
    lg: {
      padding: `${theme.spacing.md} ${theme.spacing.lg}`,
      fontSize: theme.typography.fontSize.lg,
    },
  };

  const sizes = sizeMap[size];

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!email.trim() || status === 'loading') return;

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setStatus('error');
        return;
      }

      setStatus('loading');

      try {
        await onSubmit?.(email);
        setStatus('success');
        setEmail('');
      } catch {
        setStatus('error');
      }
    },
    [email, status, onSubmit]
  );

  const isInline = layout === 'inline';

  const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: isInline ? 'row' : 'column',
    gap: theme.spacing.sm,
    width: '100%',
  };

  const inputStyle: React.CSSProperties = {
    ...inputStyles.base,
    flex: isInline ? 1 : undefined,
    padding: sizes.padding,
    fontSize: sizes.fontSize,
    ...(isFocused && inputStyles.focus),
    ...(status === 'error' && inputStyles.error),
  };

  const buttonStyle: React.CSSProperties = {
    ...buttonStyles.primary,
    padding: sizes.padding,
    fontSize: sizes.fontSize,
    border: 'none',
    cursor: status === 'loading' ? 'wait' : 'pointer',
    opacity: status === 'loading' ? theme.disabledOpacity : 1,
    whiteSpace: 'nowrap',
  };

  // Success state
  if (status === 'success') {
    return (
      <div
        style={{
          padding: sizes.padding,
          backgroundColor: theme.colors.successLight,
          borderRadius: theme.borderRadius.md,
          color: theme.colors.success,
          fontSize: sizes.fontSize,
          textAlign: 'center',
        }}
        className={className}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ display: 'inline-block', marginRight: theme.spacing.xs, verticalAlign: 'middle' }}
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
        {successMessage}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={formStyle} className={className}>
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status === 'error') setStatus('idle');
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        style={inputStyle}
        aria-label="Email address"
        disabled={status === 'loading'}
      />

      <button
        type="submit"
        style={buttonStyle}
        disabled={status === 'loading'}
      >
        {status === 'loading' ? (
          <span style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.xs }}>
            <LoadingSpinner />
            Subscribing...
          </span>
        ) : (
          buttonText
        )}
      </button>

      {/* Error message */}
      {status === 'error' && (
        <div
          style={{
            gridColumn: isInline ? '1 / -1' : undefined,
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.error,
            marginTop: isInline ? 0 : theme.spacing.xs,
          }}
        >
          {errorMessage}
        </div>
      )}
    </form>
  );
}

// =============================================================================
// Loading Spinner
// =============================================================================

function LoadingSpinner() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={{ animation: 'spin 1s linear infinite' }}
    >
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="31.4"
        strokeDashoffset="10"
      />
    </svg>
  );
}

export default EmailSignupBlock;
