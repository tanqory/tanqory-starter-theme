import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/Button';

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
}

export function Hero({
  title = 'ยินดีต้อนรับสู่ร้านค้าของเรา',
  subtitle = 'สินค้าคุณภาพ ราคาดี ส่งไวทั่วไทย',
  ctaText = 'เลือกซื้อสินค้า',
  ctaLink = '/products',
  backgroundImage,
}: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white">
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-primary-100 mb-8">
            {subtitle}
          </p>
          <Link to={ctaLink}>
            <Button size="lg" className="bg-white text-primary-700 hover:bg-gray-100">
              {ctaText}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
