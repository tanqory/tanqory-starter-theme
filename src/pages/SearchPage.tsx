import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { ProductCard } from '../components/product/ProductCard';
import type { Product } from '../apis';

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate search - in real app, this would call an API
  useEffect(() => {
    if (query) {
      setIsLoading(true);
      // Simulate API call
      const timer = setTimeout(() => {
        // Mock results
        setResults([
          {
            id: '1',
            title: 'Product matching "' + query + '"',
            handle: 'product-1',
            description: 'A product matching your search',
            price: 1990,
            images: [],
            productType: 'search-results',
            tags: [],
            availableForSale: true,
            variants: [],
            createdAt: new Date().toISOString(),
          },
          {
            id: '2',
            title: 'Another product for "' + query + '"',
            handle: 'product-2',
            description: 'Another product matching your search',
            price: 2490,
            compareAtPrice: 2990,
            images: [],
            productType: 'search-results',
            tags: [],
            availableForSale: true,
            variants: [],
            createdAt: new Date().toISOString(),
          },
        ]);
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: searchQuery });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Search Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Search</h1>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full px-6 py-4 pr-14 text-lg border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Results */}
        {query && (
          <div>
            <p className="text-gray-600 mb-6">
              {isLoading ? (
                'Searching...'
              ) : (
                <>
                  {results.length} results for "<strong>{query}</strong>"
                </>
              )}
            </p>

            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-square bg-gray-200 rounded-lg mb-4" />
                    <div className="h-4 bg-gray-200 rounded mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : results.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {results.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No products found</p>
                <p className="text-gray-400 mt-2">
                  Try a different search term or browse our collections
                </p>
              </div>
            )}
          </div>
        )}

        {/* Popular Searches (when no query) */}
        {!query && (
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-4">Popular Searches</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {['T-shirt', 'Sneakers', 'Jacket', 'Accessories', 'New Arrivals'].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearchQuery(term);
                    setSearchParams({ q: term });
                  }}
                  className="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
