import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Container } from '../layout/Container';

export interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundImage?: string;
  overlay?: boolean;
}

export function Hero({
  title = 'ยินดีต้อนรับสู่ร้านค้าของเรา',
  subtitle = 'ค้นพบสินค้าคุณภาพที่คัดสรรมาเพื่อคุณโดยเฉพาะ',
  ctaText = 'เลือกซื้อสินค้า',
  ctaLink = '/products',
  secondaryCtaText,
  secondaryCtaLink,
  backgroundImage,
  overlay = true,
}: HeroProps) {
  return (
    <section
      className="relative min-h-[500px] flex items-center bg-gray-100"
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
          : undefined
      }
    >
      {backgroundImage && overlay && (
        <div className="absolute inset-0 bg-black/40" />
      )}

      <Container className="relative z-10">
        <div className="max-w-2xl">
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${backgroundImage ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h1>
          <p className={`text-lg md:text-xl mb-8 ${backgroundImage ? 'text-white/90' : 'text-gray-600'}`}>
            {subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link to={ctaLink}>{ctaText}</Link>
            </Button>
            {secondaryCtaText && secondaryCtaLink && (
              <Button asChild variant="outline" size="lg" className={backgroundImage ? 'border-white text-white hover:bg-white/10' : ''}>
                <Link to={secondaryCtaLink}>{secondaryCtaText}</Link>
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
