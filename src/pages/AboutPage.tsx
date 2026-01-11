import { Store, Truck, Shield, Headphones } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Container } from '../components/layout/Container';
import { Newsletter } from '../components/sections/Newsletter';

const features = [
  {
    icon: Store,
    title: 'สินค้าคุณภาพ',
    description: 'คัดสรรสินค้าคุณภาพดีจากแหล่งผลิตที่เชื่อถือได้',
  },
  {
    icon: Truck,
    title: 'จัดส่งรวดเร็ว',
    description: 'จัดส่งทั่วประเทศภายใน 1-3 วันทำการ',
  },
  {
    icon: Shield,
    title: 'รับประกันสินค้า',
    description: 'สินค้าทุกชิ้นมีรับประกันคุณภาพ 30 วัน',
  },
  {
    icon: Headphones,
    title: 'บริการหลังการขาย',
    description: 'ทีมงานพร้อมให้บริการทุกวัน 9:00-18:00 น.',
  },
];

export function AboutPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gray-100 py-16">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              เกี่ยวกับเรา
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              เราคือร้านค้าออนไลน์ที่มุ่งมั่นนำเสนอสินค้าคุณภาพดีในราคาที่คุ้มค่า
              พร้อมบริการที่เป็นเลิศเพื่อความพึงพอใจสูงสุดของลูกค้า
            </p>
          </div>
        </Container>
      </section>

      {/* Story */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600"
                alt="Our Story"
                className="rounded-xl shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                เรื่องราวของเรา
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  ก่อตั้งขึ้นในปี 2020 ด้วยความตั้งใจที่จะสร้างประสบการณ์การช้อปปิ้งออนไลน์ที่ดีที่สุดให้กับคนไทย
                </p>
                <p>
                  เราเริ่มต้นจากทีมงานเล็กๆ ที่มีความรักในการคัดสรรสินค้าคุณภาพ
                  และพัฒนาเติบโตมาจนถึงวันนี้ที่เราได้รับความไว้วางใจจากลูกค้ามากกว่า
                  10,000 คนทั่วประเทศ
                </p>
                <p>
                  ทุกวันนี้เรายังคงมุ่งมั่นในการพัฒนาบริการและคัดสรรสินค้าใหม่ๆ
                  เพื่อตอบสนองความต้องการของลูกค้าอย่างต่อเนื่อง
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <Container>
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            ทำไมต้องเลือกเรา
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl p-6 text-center"
              >
                <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Newsletter backgroundColor="primary" />
    </Layout>
  );
}
