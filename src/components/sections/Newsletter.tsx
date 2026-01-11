import { useState } from 'react';
import { Send } from 'lucide-react';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export interface NewsletterProps {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  buttonText?: string;
  backgroundColor?: 'white' | 'gray' | 'primary';
  onSubscribe?: (email: string) => void | Promise<void>;
}

export function Newsletter({
  title = 'สมัครรับข่าวสาร',
  subtitle = 'รับโปรโมชั่นและข่าวสารสินค้าใหม่ก่อนใคร',
  placeholder = 'กรอกอีเมลของคุณ',
  buttonText = 'สมัคร',
  backgroundColor = 'gray',
  onSubscribe,
}: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const bgColors = {
    white: 'bg-white',
    gray: 'bg-gray-100',
    primary: 'bg-primary-600',
  };

  const textColors = {
    white: 'text-gray-900',
    gray: 'text-gray-900',
    primary: 'text-white',
  };

  const subtitleColors = {
    white: 'text-gray-600',
    gray: 'text-gray-600',
    primary: 'text-white/80',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      await onSubscribe?.(email);
      setSuccess(true);
      setEmail('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`py-16 ${bgColors[backgroundColor]}`}>
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${textColors[backgroundColor]}`}>
            {title}
          </h2>
          <p className={`mb-8 ${subtitleColors[backgroundColor]}`}>
            {subtitle}
          </p>

          {success ? (
            <div className={`p-4 rounded-lg ${backgroundColor === 'primary' ? 'bg-white/20 text-white' : 'bg-green-100 text-green-800'}`}>
              ขอบคุณที่สมัครรับข่าวสาร!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholder}
                className="sm:w-80"
                required
              />
              <Button type="submit" disabled={loading}>
                {loading ? (
                  'กำลังส่ง...'
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    {buttonText}
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
