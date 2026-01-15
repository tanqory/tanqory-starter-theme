// =============================================================================
// Contact Form Section (Draftbit pattern)
// =============================================================================

import React, { useState } from 'react';
import { TanqoryTheme, SectionStyles, InputStyles, ButtonStyles } from '../../themes';
import { ContainerBlock } from '../blocks/ContainerBlock';
import { HeadingBlock } from '../blocks/HeadingBlock';
import { TextBlock } from '../blocks/TextBlock';

// =============================================================================
// Types
// =============================================================================

export interface ContactFormSectionProps {
  title?: string;
  description?: string;
  showName?: boolean;
  showPhone?: boolean;
  showSubject?: boolean;
  submitText?: string;
  successMessage?: string;
  onSubmit?: (data: ContactFormData) => Promise<void>;
  className?: string;
}

export interface ContactFormData {
  name?: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

// =============================================================================
// Schema (for Studio customization)
// =============================================================================

export const ContactFormSectionSchema = {
  name: 'Contact Form',
  tag: 'section',
  settings: [
    {
      type: 'header',
      content: 'Content',
    },
    {
      id: 'title',
      type: 'text',
      label: 'Title',
      default: 'Contact Us',
    },
    {
      id: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      type: 'header',
      content: 'Form Fields',
    },
    {
      id: 'showName',
      type: 'checkbox',
      label: 'Show name field',
      default: true,
    },
    {
      id: 'showPhone',
      type: 'checkbox',
      label: 'Show phone field',
      default: false,
    },
    {
      id: 'showSubject',
      type: 'checkbox',
      label: 'Show subject field',
      default: true,
    },
    {
      type: 'header',
      content: 'Messages',
    },
    {
      id: 'submitText',
      type: 'text',
      label: 'Submit button text',
      default: 'Send Message',
    },
    {
      id: 'successMessage',
      type: 'text',
      label: 'Success message',
      default: 'Thank you for your message. We will get back to you soon!',
    },
  ],
};

// =============================================================================
// Component
// =============================================================================

export function ContactFormSection({
  title = 'Contact Us',
  description,
  showName = true,
  showPhone = false,
  showSubject = true,
  submitText = 'Send Message',
  successMessage = 'Thank you for your message. We will get back to you soon!',
  onSubmit,
  className,
}: ContactFormSectionProps) {
  const theme = TanqoryTheme;
  const sectionStyles = SectionStyles(theme);
  const inputStyles = InputStyles(theme);
  const buttonStyles = ButtonStyles(theme);

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await onSubmit?.(formData);
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const sectionStyle: React.CSSProperties = {
    ...sectionStyles.base,
    backgroundColor: theme.colors.background,
  };

  const formStyle: React.CSSProperties = {
    maxWidth: '600px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.foreground,
    marginBottom: theme.spacing.xs,
  };

  const getInputStyle = (field: string): React.CSSProperties => ({
    ...inputStyles.base,
    width: '100%',
    ...(focusedField === field && inputStyles.focus),
  });

  if (status === 'success') {
    return (
      <section data-section="ContactFormSection" style={sectionStyle} className={className}>
        <ContainerBlock>
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: theme.borderRadius.full,
                backgroundColor: theme.colors.successLight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                marginBottom: theme.spacing.lg,
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke={theme.colors.success}
                strokeWidth="2"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <HeadingBlock text="Message Sent" level="h2" alignment="center" />
            <TextBlock
              text={successMessage}
              preset="body"
              alignment="center"
            />
          </div>
        </ContainerBlock>
      </section>
    );
  }

  return (
    <section data-section="ContactFormSection" style={sectionStyle} className={className}>
      <ContainerBlock>
        {/* Header */}
        {(title || description) && (
          <div style={{ textAlign: 'center', marginBottom: theme.spacing['2xl'] }}>
            {title && <HeadingBlock text={title} level="h2" alignment="center" />}
            {description && (
              <TextBlock
                text={description}
                preset="body"
                alignment="center"
              />
            )}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={formStyle}>
          {/* Name Field */}
          {showName && (
            <div>
              <label style={labelStyle}>Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                style={getInputStyle('name')}
                placeholder="Your name"
              />
            </div>
          )}

          {/* Email Field */}
          <div>
            <label style={labelStyle}>Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              style={getInputStyle('email')}
              placeholder="your@email.com"
              required
            />
          </div>

          {/* Phone Field */}
          {showPhone && (
            <div>
              <label style={labelStyle}>Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                onFocus={() => setFocusedField('phone')}
                onBlur={() => setFocusedField(null)}
                style={getInputStyle('phone')}
                placeholder="Your phone number"
              />
            </div>
          )}

          {/* Subject Field */}
          {showSubject && (
            <div>
              <label style={labelStyle}>Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
                onFocus={() => setFocusedField('subject')}
                onBlur={() => setFocusedField(null)}
                style={getInputStyle('subject')}
                placeholder="Subject of your message"
              />
            </div>
          )}

          {/* Message Field */}
          <div>
            <label style={labelStyle}>Message *</label>
            <textarea
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              style={{
                ...getInputStyle('message'),
                minHeight: '150px',
                resize: 'vertical',
              }}
              placeholder="Your message..."
              required
            />
          </div>

          {/* Error Message */}
          {status === 'error' && (
            <p
              style={{
                color: theme.colors.error,
                fontSize: theme.typography.fontSize.sm,
                margin: 0,
              }}
            >
              Something went wrong. Please try again.
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              ...buttonStyles.primary,
              width: '100%',
              padding: `${theme.spacing.md} ${theme.spacing.lg}`,
              border: 'none',
              cursor: status === 'loading' ? 'wait' : 'pointer',
              opacity: status === 'loading' ? 0.7 : 1,
            }}
          >
            {status === 'loading' ? 'Sending...' : submitText}
          </button>
        </form>
      </ContainerBlock>
    </section>
  );
}

export default ContactFormSection;
