import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { useCartStore } from '../stores/cart';
import { formatPrice } from '../lib/utils';

export function CartPage() {
  const { items, totalPrice, updateQuantity, removeItem, clearCart } =
    useCartStore();

  if (items.length === 0) {
    return (
      <Layout>
        <Container className="py-16 text-center">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            ตะกร้าสินค้าว่างเปล่า
          </h1>
          <p className="text-gray-600 mb-8">
            คุณยังไม่มีสินค้าในตะกร้า เริ่มเลือกซื้อสินค้าได้เลย
          </p>
          <Link to="/products">
            <Button size="lg">เลือกซื้อสินค้า</Button>
          </Link>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container className="py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">ตะกร้าสินค้า</h1>
          <Button variant="ghost" onClick={clearCart} className="text-red-600">
            ล้างตะกร้า
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 bg-white rounded-lg border p-4"
              >
                {/* Image */}
                <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                  {item.product.images[0] && (
                    <img
                      src={item.product.images[0].src}
                      alt={item.product.name || item.product.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">
                    {item.product.name}
                  </h3>
                  <p className="text-primary-600 font-semibold mt-1">
                    {formatPrice(item.product.price)}
                  </p>

                  {/* Quantity */}
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-100"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Price & Remove */}
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="p-2 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <p className="font-semibold text-gray-900">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border p-6 sticky top-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                สรุปคำสั่งซื้อ
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">ยอดรวมสินค้า</span>
                  <span className="font-medium">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ค่าจัดส่ง</span>
                  <span className="font-medium text-green-600">ฟรี</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-base font-semibold">
                    <span>ยอดรวมทั้งหมด</span>
                    <span className="text-primary-600">{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              </div>

              <Button className="w-full mt-6" size="lg">
                ดำเนินการชำระเงิน
              </Button>

              <Link
                to="/products"
                className="block text-center text-sm text-gray-600 hover:text-gray-900 mt-4"
              >
                ← เลือกซื้อสินค้าต่อ
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
}
