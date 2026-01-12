import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Container } from '../components/layout/Container';
import { ProductGrid } from '../components/product/ProductGrid';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { products as allProducts } from '../data/products';
import { categories } from '../data/categories';
import { useCartStore } from '../stores/cart';
import type { Product } from '../types/product';

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const addItem = useCartStore((state) => state.addItem);

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [showFilters, setShowFilters] = useState(false);

  const selectedCategory = searchParams.get('category');
  const sortBy = searchParams.get('sort') || 'newest';

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (p) =>
          (p.name || p.title).toLowerCase().includes(searchLower) ||
          p.description?.toLowerCase().includes(searchLower)
      );
    }

    // Filter by category
    if (selectedCategory) {
      result = result.filter((p) => p.productType === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => (a.name || a.title).localeCompare(b.name || b.title));
        break;
      default:
        // newest - keep original order
        break;
    }

    return result;
  }, [search, selectedCategory, sortBy]);

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
  };

  const handleCategoryChange = (category: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (category) {
      newParams.set('category', category);
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams);
  };

  const handleSortChange = (sort: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort', sort);
    setSearchParams(newParams);
  };

  return (
    <Layout>
      <Container className="py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">สินค้าทั้งหมด</h1>
            <p className="text-gray-600 mt-1">
              พบ {filteredProducts.length} สินค้า
            </p>
          </div>

          <div className="flex gap-3">
            {/* Search */}
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ค้นหาสินค้า..."
                className="pl-10"
              />
            </div>

            {/* Filter Toggle (Mobile) */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside
            className={`${
              showFilters ? 'block' : 'hidden'
            } md:block w-full md:w-64 flex-shrink-0`}
          >
            <div className="bg-white rounded-lg p-4 border">
              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">หมวดหมู่</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => handleCategoryChange(null)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      !selectedCategory
                        ? 'bg-primary-100 text-primary-700'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    ทั้งหมด
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.name)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === cat.name
                          ? 'bg-primary-100 text-primary-700'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">เรียงตาม</h3>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option value="newest">ใหม่ล่าสุด</option>
                  <option value="price-asc">ราคา: ต่ำ → สูง</option>
                  <option value="price-desc">ราคา: สูง → ต่ำ</option>
                  <option value="name">ชื่อ ก-ฮ</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <ProductGrid
              products={filteredProducts}
              columns={3}
              onAddToCart={handleAddToCart}
            />
          </main>
        </div>
      </Container>
    </Layout>
  );
}
