import { Link } from 'react-router-dom';
import { Facebook, Instagram, MessageCircle } from 'lucide-react';
import { themeConfig } from '@/config';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {themeConfig.store.name[0]}
                </span>
              </div>
              <span className="font-bold text-xl text-white">
                {themeConfig.store.name}
              </span>
            </Link>
            <p className="text-gray-400 mb-4">{themeConfig.store.tagline}</p>

            {/* Social Links */}
            <div className="flex gap-4">
              {themeConfig.footer.socialLinks.facebook && (
                <a
                  href={themeConfig.footer.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {themeConfig.footer.socialLinks.instagram && (
                <a
                  href={themeConfig.footer.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {themeConfig.footer.socialLinks.line && (
                <a
                  href={themeConfig.footer.socialLinks.line}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">ลิงก์ด่วน</h3>
            <ul className="space-y-2">
              {themeConfig.navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">ติดต่อเรา</h3>
            <ul className="space-y-2 text-gray-400">
              <li>โทร: 02-xxx-xxxx</li>
              <li>อีเมล: info@example.com</li>
              <li>เวลาทำการ: 9:00 - 18:00</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>{themeConfig.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
