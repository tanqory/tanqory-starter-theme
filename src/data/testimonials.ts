// Define Testimonial type locally (matches TestimonialsSection's Testimonial interface)
export interface Testimonial {
  id: string;
  content: string;
  author: string;
  title?: string;
  avatar?: string;
  rating?: number;
  // Legacy fields for backwards compatibility
  name?: string;
  comment?: string;
  date?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    author: 'สมชาย ใจดี',
    name: 'สมชาย ใจดี',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    rating: 5,
    content: 'สินค้าคุณภาพดีมาก ส่งเร็วทันใจ จะกลับมาซื้ออีกแน่นอน!',
    comment: 'สินค้าคุณภาพดีมาก ส่งเร็วทันใจ จะกลับมาซื้ออีกแน่นอน!',
    date: '15 ม.ค. 2567',
  },
  {
    id: '2',
    author: 'สมหญิง รักสวย',
    name: 'สมหญิง รักสวย',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    rating: 5,
    content: 'ชอบมากค่ะ สีตรงปก เนื้อผ้าดี ใส่สบายมาก แนะนำเลย!',
    comment: 'ชอบมากค่ะ สีตรงปก เนื้อผ้าดี ใส่สบายมาก แนะนำเลย!',
    date: '12 ม.ค. 2567',
  },
  {
    id: '3',
    author: 'วิชัย นักช้อป',
    name: 'วิชัย นักช้อป',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    rating: 4,
    content: 'บริการดี พนักงานตอบไว ส่งตรงเวลา พอใจครับ',
    comment: 'บริการดี พนักงานตอบไว ส่งตรงเวลา พอใจครับ',
    date: '10 ม.ค. 2567',
  },
  {
    id: '4',
    author: 'มณี สุขใจ',
    name: 'มณี สุขใจ',
    rating: 5,
    content: 'ร้านนี้เป็นร้านประจำเลยค่ะ สินค้าดี ราคาไม่แพง',
    comment: 'ร้านนี้เป็นร้านประจำเลยค่ะ สินค้าดี ราคาไม่แพง',
    date: '8 ม.ค. 2567',
  },
  {
    id: '5',
    author: 'ปรีชา มั่นคง',
    name: 'ปรีชา มั่นคง',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    rating: 5,
    content: 'คุณภาพเกินราคา ส่งไว แพ็คอย่างดี ขอบคุณครับ',
    comment: 'คุณภาพเกินราคา ส่งไว แพ็คอย่างดี ขอบคุณครับ',
    date: '5 ม.ค. 2567',
  },
  {
    id: '6',
    author: 'รัตนา ดีงาม',
    name: 'รัตนา ดีงาม',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    rating: 4,
    content: 'สินค้าตรงปก ถูกใจมากค่ะ จะแนะนำให้เพื่อนๆ',
    comment: 'สินค้าตรงปก ถูกใจมากค่ะ จะแนะนำให้เพื่อนๆ',
    date: '3 ม.ค. 2567',
  },
];
