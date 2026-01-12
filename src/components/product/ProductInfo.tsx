import { useState } from 'react';
import { ShoppingCart, Heart, Minus, Plus, Share2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { formatPrice } from '../../lib/utils';
import type { Product } from '../../apis';

export interface ProductInfoProps {
  product: Product;
  onAddToCart?: (product: Product, quantity: number) => void;
  onAddToWishlist?: (product: Product) => void;
}

export function ProductInfo({
  product,
  onAddToCart,
  onAddToWishlist,
}: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);

  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0;

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => setQuantity((q) => Math.max(1, q - 1));

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Badges */}
      <div className="flex gap-2">
        {hasDiscount && (
          <Badge variant="error">ลด {discountPercent}%</Badge>
        )}
        {product.isNew && (
          <Badge variant="success">สินค้าใหม่</Badge>
        )}
        {!product.availableForSale && (
          <Badge variant="default">สินค้าหมด</Badge>
        )}
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
        {product.name}
      </h1>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-primary-600">
          {formatPrice(product.price)}
        </span>
        {hasDiscount && (
          <span className="text-xl text-gray-400 line-through">
            {formatPrice(product.compareAtPrice!)}
          </span>
        )}
      </div>

      {/* Description */}
      {product.description && (
        <p className="text-gray-600 leading-relaxed">
          {product.description}
        </p>
      )}

      {/* Quantity Selector */}
      {product.availableForSale && (
        <div className="flex items-center gap-4">
          <span className="text-gray-600">จำนวน:</span>
          <div className="flex items-center border rounded-lg">
            <button
              onClick={decrementQuantity}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100"
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-12 text-center font-medium">{quantity}</span>
            <button
              onClick={incrementQuantity}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        {product.availableForSale ? (
          <Button
            onClick={() => onAddToCart?.(product, quantity)}
            className="flex-1"
            size="lg"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            เพิ่มลงตะกร้า
          </Button>
        ) : (
          <Button disabled className="flex-1" size="lg">
            สินค้าหมด
          </Button>
        )}

        <Button
          variant="outline"
          size="lg"
          onClick={() => onAddToWishlist?.(product)}
        >
          <Heart className="w-5 h-5" />
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={handleShare}
        >
          <Share2 className="w-5 h-5" />
        </Button>
      </div>

      {/* SKU */}
      {product.sku && (
        <p className="text-sm text-gray-500">
          SKU: {product.sku}
        </p>
      )}
    </div>
  );
}
