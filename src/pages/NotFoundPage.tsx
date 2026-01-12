import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { Layout } from '../components/layout/Layout';

export function NotFoundPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-24 text-center">
        {/* 404 Number */}
        <div className="text-9xl font-bold text-gray-200 mb-8">404</div>

        {/* Message */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
          >
            <Home className="w-5 h-5" />
            Go to Homepage
          </Link>
          <Link
            to="/search"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
          >
            <Search className="w-5 h-5" />
            Search Products
          </Link>
        </div>

        {/* Back button */}
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 mt-8 text-gray-600 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>

        {/* Helpful links */}
        <div className="mt-16 pt-8 border-t max-w-md mx-auto">
          <h2 className="text-lg font-semibold mb-4">Popular Pages</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/products"
              className="text-gray-600 hover:text-black transition-colors"
            >
              All Products
            </Link>
            <Link
              to="/collections"
              className="text-gray-600 hover:text-black transition-colors"
            >
              Collections
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-black transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-black transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
