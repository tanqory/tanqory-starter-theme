import { ProductGrid } from '@/components/ProductGrid';
import { Search, SlidersHorizontal } from 'lucide-react';

const allProducts = [
  {
    id: '1',
    name: 'สินค้าตัวอย่าง 1',
    price: 590,
    originalPrice: 790,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    badge: 'ขายดี',
  },
  {
    id: '2',
    name: 'สินค้าตัวอย่าง 2',
    price: 1290,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
  },
  {
    id: '3',
    name: 'สินค้าตัวอย่าง 3',
    price: 890,
    originalPrice: 1190,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
  },
  {
    id: '4',
    name: 'สินค้าตัวอย่าง 4',
    price: 2490,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop',
    badge: 'ใหม่',
  },
  {
    id: '5',
    name: 'สินค้าตัวอย่าง 5',
    price: 1590,
    image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=400&fit=crop',
  },
  {
    id: '6',
    name: 'สินค้าตัวอย่าง 6',
    price: 990,
    originalPrice: 1290,
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop',
  },
  {
    id: '7',
    name: 'สินค้าตัวอย่าง 7',
    price: 790,
    image: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400&h=400&fit=crop',
  },
  {
    id: '8',
    name: 'สินค้าตัวอย่าง 8',
    price: 1890,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop',
  },
];

export function ProductsPage() {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">สินค้าทั้งหมด</h1>
          <p className="text-gray-600">พบสินค้า {allProducts.length} รายการ</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="ค้นหาสินค้า..."
              className="w-full h-10 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center justify-center gap-2 h-10 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <SlidersHorizontal className="w-5 h-5" />
            <span>ตัวกรอง</span>
          </button>
        </div>

        {/* Product Grid */}
        <ProductGrid products={allProducts} columns={4} />
      </div>
    </div>
  );
}
