import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="font-bold text-xl text-white">My Store</span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              ร้านค้าออนไลน์คุณภาพ สินค้าหลากหลาย ส่งไวทั่วไทย
            </p>
            <div className="flex gap-3">
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">ลิงก์ด่วน</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products" className="hover:text-primary-400 transition-colors">สินค้าทั้งหมด</Link></li>
              <li><Link to="/about" className="hover:text-primary-400 transition-colors">เกี่ยวกับเรา</Link></li>
              <li><Link to="/contact" className="hover:text-primary-400 transition-colors">ติดต่อเรา</Link></li>
              <li><Link to="/faq" className="hover:text-primary-400 transition-colors">คำถามที่พบบ่อย</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-white mb-4">บริการลูกค้า</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary-400 transition-colors">วิธีการสั่งซื้อ</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">การจัดส่ง</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">การคืนสินค้า</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">นโยบายความเป็นส่วนตัว</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">ติดต่อเรา</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary-400" />
                <span>02-xxx-xxxx</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-400" />
                <span>contact@mystore.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary-400 mt-0.5" />
                <span>123 ถนนสุขุมวิท กรุงเทพฯ 10110</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} My Store. All rights reserved. Powered by Tanqory</p>
        </div>
      </div>
    </footer>
  );
}
