import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { Card, CardImage, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { formatPrice } from '../../lib/utils';
import type { Product } from '../../types/product';

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
  showQuickActions?: boolean;
}

export function ProductCard({
  product,
  onAddToCart,
  onAddToWishlist,
  showQuickActions = true,
}: ProductCardProps) {
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0;

  return (
    <Card className="group relative">
      <Link to={`/products/${product.slug}`}>
        <div className="relative">
          <CardImage
            src={product.images[0] || '/placeholder.jpg'}
            alt={product.name}
            aspectRatio="4/5"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {hasDiscount && (
              <Badge variant="danger">-{discountPercent}%</Badge>
            )}
            {!product.inStock && (
              <Badge variant="secondary">สินค้าหมด</Badge>
            )}
            {product.isNew && (
              <Badge variant="success">ใหม่</Badge>
            )}
          </div>

          {/* Quick Actions */}
          {showQuickActions && (
            <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {onAddToWishlist && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onAddToWishlist(product);
                  }}
                  className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100"
                >
                  <Heart className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <Link to={`/products/${product.slug}`}>
          <h3 className="font-medium text-gray-900 line-clamp-2 hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold text-primary-600">
            {formatPrice(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.compareAtPrice!)}
            </span>
          )}
        </div>

        {showQuickActions && onAddToCart && product.inStock && (
          <Button
            onClick={() => onAddToCart(product)}
            className="w-full mt-3"
            size="sm"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            เพิ่มลงตะกร้า
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
