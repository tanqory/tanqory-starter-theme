import { Users, Award, Clock, Heart } from 'lucide-react';

const stats = [
  { label: 'ลูกค้าที่พึงพอใจ', value: '10,000+', icon: Users },
  { label: 'ปีแห่งประสบการณ์', value: '5+', icon: Award },
  { label: 'สินค้าจัดส่งแล้ว', value: '50,000+', icon: Clock },
  { label: 'รีวิว 5 ดาว', value: '4,500+', icon: Heart },
];

export function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">เกี่ยวกับเรา</h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            เราคือร้านค้าออนไลน์ที่มุ่งมั่นส่งมอบสินค้าคุณภาพและบริการที่ดีที่สุดให้กับลูกค้า
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex p-3 bg-primary-100 rounded-xl mb-3">
                  <stat.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">เรื่องราวของเรา</h2>
            <div className="prose prose-lg mx-auto text-gray-600">
              <p>
                My Store เริ่มต้นจากความรักในสินค้าคุณภาพและความต้องการที่จะส่งมอบสิ่งดีๆ ให้กับลูกค้าชาวไทย
                เราเชื่อว่าทุกคนควรได้รับสินค้าที่ดีในราคาที่เข้าถึงได้
              </p>
              <p>
                ตลอดระยะเวลาที่ผ่านมา เราได้พัฒนาและเติบโตอย่างต่อเนื่อง
                โดยมีลูกค้ากว่า 10,000 คนที่ไว้วางใจเลือกซื้อสินค้ากับเรา
                ซึ่งเป็นแรงผลักดันให้เรามุ่งมั่นพัฒนาคุณภาพสินค้าและบริการอย่างไม่หยุดยั้ง
              </p>
              <p>
                วันนี้ เรายังคงยึดมั่นในหลักการเดิม นั่นคือ สินค้าคุณภาพ ราคาดี บริการประทับใจ
                และพร้อมที่จะเติบโตไปพร้อมกับลูกค้าทุกท่าน
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">คุณค่าของเรา</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">คุณภาพ</h3>
              <p className="text-gray-600">คัดสรรสินค้าคุณภาพจากแบรนด์ชั้นนำ</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">ใส่ใจ</h3>
              <p className="text-gray-600">ดูแลลูกค้าด้วยความใส่ใจในทุกรายละเอียด</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">รวดเร็ว</h3>
              <p className="text-gray-600">จัดส่งสินค้าอย่างรวดเร็วทั่วประเทศ</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
